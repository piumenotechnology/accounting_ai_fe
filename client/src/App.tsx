import { useRef, useEffect, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ConfigPanel from "./components/ConfigPanel";
import ChatMessage from "./components/ChatMessage";
import MessageInput from "./components/MessageInput";
import { ChatMessage as ChatMessageType, ChatPayload, ChatResponse } from "./lib/types";

function App() {
  // State for messages
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      content: "Hello! I'm your API assistant. How can I help you today?",
      isUser: false,
    },
  ]);

  // State for config panel
  const [configOpen, setConfigOpen] = useState(false);
  
  // State for payload configuration
  // Session ID is fixed and not editable by the user
  const sessionId = "test-session-0123";
  
  // Table options for dropdown 
  const tableOptions = [
    "ClosedDeal",
    "Payment",
    "Invoice",
    "AR",
    "AP"
  ];
  
  // State for selected table
  const [table, setTable] = useState(tableOptions[0]);
  
  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to send message
  const sendMessage = async (message: string) => {
    // Add user message to chat
    setMessages((prev) => [...prev, { content: message, isUser: true }]);
    
    // Reset error state
    setError(null);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Create payload
      const payload: ChatPayload = {
        session_id: sessionId,
        table: table,
        message: message,
      };
      
      // Make API call to the real endpoint
      const response = await fetch("https://accountingai-production.up.railway.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse response
      const responseData: ChatResponse = await response.json();
      
      // Add response to chat
      setMessages((prev) => [...prev, { content: responseData, isUser: false }]);
    } catch (err) {
      // Handle errors
      const errorMessage = err instanceof Error ? err.message : "An error occurred while processing your request.";
      setError(errorMessage);
      
      // Log error for debugging
      console.error("Error sending message:", err);
    } finally {
      // Set loading state to false
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto bg-gray-50 font-sans text-gray-800 shadow-xl">
      <ChatHeader configOpen={configOpen} setConfigOpen={setConfigOpen} />
      
      {configOpen && (
        <ConfigPanel 
          sessionId={sessionId}
          table={table} 
          tableOptions={tableOptions}
          setTable={setTable} 
        />
      )}
      
      {/* Welcome message if no messages */}
      {messages.length <= 1 && (
        <div className="text-center mt-8 mx-auto max-w-2xl px-4">
          <div className="relative">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-2xl opacity-40 blur-xl transform -translate-y-2"></div>
            
            <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 backdrop-blur-sm">
              <div className="relative">
                {/* Decorative circles */}
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-blue-100 opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-purple-100 opacity-50"></div>
                
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg">
                  <i className="fas fa-robot text-white text-3xl"></i>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Financial Insights AI</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Get instant answers about your {table === "ClosedDeal" ? "closed deals" : 
                              table === "Payment" ? "payments" : 
                              table === "Invoice" ? "invoices" : 
                              table === "AR" ? "accounts receivable" : 
                              "accounts payable"} data
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <div onClick={() => sendMessage("What was our largest payment last month?")} 
                       className="text-left text-indigo-800 space-y-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all border border-indigo-100">
                    <p className="font-semibold flex items-center">
                      <i className="fas fa-chart-bar mr-2 text-indigo-500"></i>
                      Example Question
                    </p>
                    <p className="text-sm text-gray-700">"What was our largest payment last month?"</p>
                  </div>
                  
                  <div onClick={() => sendMessage("Compare revenue for Q1 and Q3 in 2024")} 
                       className="text-left text-indigo-800 space-y-1 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all border border-indigo-100">
                    <p className="font-semibold flex items-center">
                      <i className="fas fa-chart-line mr-2 text-indigo-500"></i>
                      Example Question
                    </p>
                    <p className="text-sm text-gray-700">"Compare revenue for Q1 and Q3 in 2024"</p>
                  </div>
                  
                  <div onClick={() => sendMessage("Show overdue invoices from March")} 
                       className="text-left text-indigo-800 space-y-1 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all border border-indigo-100">
                    <p className="font-semibold flex items-center">
                      <i className="fas fa-file-invoice-dollar mr-2 text-indigo-500"></i>
                      Example Question
                    </p>
                    <p className="text-sm text-gray-700">"Show overdue invoices from March"</p>
                  </div>
                  
                  <div onClick={() => sendMessage("Summarize accounts receivable status")} 
                       className="text-left text-indigo-800 space-y-1 bg-gradient-to-r from-pink-50 to-blue-50 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all border border-indigo-100">
                    <p className="font-semibold flex items-center">
                      <i className="fas fa-chart-pie mr-2 text-indigo-500"></i>
                      Example Question
                    </p>
                    <p className="text-sm text-gray-700">"Summarize accounts receivable status"</p>
                  </div>
                </div>
                
                <p className="text-center text-xs text-gray-500 mt-6">
                  Click on any example or type your own question below
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Chat Area */}
      <main 
        className="flex-1 p-4 overflow-y-auto" 
        id="chatContainer"
        ref={chatContainerRef}
      >
        <div className="space-y-6" id="messagesContainer">
          {messages.slice(messages.length > 1 ? 1 : 0).map((message, index) => (
            <ChatMessage
              key={index}
              message={message.content}
              isUser={message.isUser}
            />
          ))}
        </div>
      </main>

      <MessageInput 
        sendMessage={sendMessage}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default App;