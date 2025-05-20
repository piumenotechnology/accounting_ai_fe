import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TableSelector from "./TableSelector";
import SessionDisplay from "./SessionDisplay";
import TypingIndicator from "./TypingIndicator";
import { sendChatMessage } from "@/lib/api";
import { useSession } from "@/hooks/useSession";
import { Message, TableType } from "@/types/chat";
import { Bot } from "lucide-react";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your AccountingAI assistant. You can ask me questions about your accounting data, and I'll provide insights based on the selected table.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [tableType, setTableType] = useState<TableType>("closed_deal");
  const { sessionId } = useSession();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle table type change
  const handleTableChange = (newTable: TableType) => {
    setTableType(newTable);
    // Add system message about table change
    setMessages((prev) => [
      ...prev,
      {
        content: `Now querying the "${getTableDisplayName(newTable)}" table. How can I help you?`,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const getTableDisplayName = (table: TableType): string => {
    const displayNames: Record<TableType, string> = {
      "closed_deal": "Closed Deal",
      "payment": "Payment",
      "invoice": "Invoice",
      "ar": "Accounts Receivable",
      "ap": "Accounts Payable",
    };
    return displayNames[table];
  };

  // API mutation
  const sendMessageMutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      // Add AI response to messages
      setMessages((prev) => [
        ...prev,
        {
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    },
    onError: (error) => {
      console.error("API Error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          content: "Sorry, I encountered an error processing your request. Please try again later.",
          isUser: false,
          timestamp: new Date(),
          isError: true,
        },
      ]);
    },
  });

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setMessages((prev) => [
      ...prev, 
      {
        content: message,
        isUser: true,
        timestamp: new Date(),
      }
    ]);

    // Send to API
    sendMessageMutation.mutate({
      session_id: sessionId,
      table: tableType,
      message: message
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-4 md:px-6 border-b border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center mb-3 sm:mb-0">
            <Bot className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-xl font-semibold">AccountingAI Chat</h1>
          </div>
          <TableSelector value={tableType} onChange={handleTableChange} />
        </div>
      </header>

      {/* Session ID Display */}
      <SessionDisplay sessionId={sessionId} />

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
          <div 
            ref={chatContainerRef}
            className="h-[calc(100vh-180px)] md:h-[calc(100vh-180px)] overflow-y-auto scroll-smooth pb-4"
          >
            <div className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <ChatBubble 
                  key={index} 
                  message={message}
                />
              ))}
              {sendMessageMutation.isPending && <TypingIndicator />}
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={sendMessageMutation.isPending}
      />
    </div>
  );
};

export default ChatInterface;
