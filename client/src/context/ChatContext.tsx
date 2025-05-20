import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ChatMessage, ChatPayload, ChatResponse } from "@/lib/types";

interface ChatContextType {
  messages: ChatMessage[];
  configOpen: boolean;
  sessionId: string;
  table: string;
  isLoading: boolean;
  error: string | null;
  setConfigOpen: (open: boolean) => void;
  setSessionId: (id: string) => void;
  setTable: (table: string) => void;
  sendMessage: (message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  // State for messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Hello! I'm your API assistant. How can I help you today?",
      isUser: false,
    },
  ]);

  // State for config panel
  const [configOpen, setConfigOpen] = useState(false);
  
  // State for payload configuration
  const [sessionId, setSessionId] = useState("test-session-0123");
  const [table, setTable] = useState("closed_deal");
  
  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to send message
  const sendMessage = useCallback(async (message: string) => {
    // Add user message to chat
    setMessages((prev) => [...prev, { content: message, isUser: true }]);
    
    // Reset error state
    setError(null);
    
    // Set loading state
    setIsLoading(true);
    
    // Create payload
    const payload: ChatPayload = {
      session_id: sessionId,
      table: table,
      message: message,
    };
    
    try {
      // In a real implementation, this would make an actual API call
      // For the frontend-only implementation, we'll simulate a response
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Log the payload to console for debugging
      console.log("Sending payload:", payload);
      
      // Create mock response based on the example
      let responseObj: ChatResponse = {
        response: "The latest sponsorship deal is with Denodo, valued at $15,000. It was closed on April 4, 2025, and is associated with the \"Big Data 2025 (Live)\" conference. The deal is marked as successfully closed."
      };
      
      // If message contains revenue comparison (as in the example)
      if (message.toLowerCase().includes("revenue") && message.toLowerCase().includes("compare")) {
        responseObj = {
          response: "Comparing revenue for Q1 and Q3 in 2024, Q1 had $245,000 in closed sponsor deals while Q3 had $310,000, showing a 26.5% increase in revenue."
        };
      }
      
      // Add response to chat
      setMessages((prev) => [...prev, { content: responseObj, isUser: false }]);
    } catch (err) {
      // Handle errors
      const errorMessage = err instanceof Error ? err.message : "An error occurred while processing your request.";
      setError(errorMessage);
    } finally {
      // Set loading state to false
      setIsLoading(false);
    }
  }, [sessionId, table]);

  const value = {
    messages,
    configOpen,
    sessionId,
    table,
    isLoading,
    error,
    setConfigOpen,
    setSessionId,
    setTable,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
