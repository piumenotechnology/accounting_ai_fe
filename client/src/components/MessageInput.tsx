import { useState, useRef, useEffect } from "react";

interface MessageInputProps {
  sendMessage: (message: string) => void;
  isLoading: boolean;
  error: string | null;
}

const MessageInput = ({ sendMessage, isLoading, error }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    sendMessage(message);
    setMessage("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <footer className="px-6 py-6 bg-gradient-to-b from-white to-indigo-50 border-t border-indigo-100 shadow-md">
      {/* Loading indicator */}
      {isLoading && (
        <div className="mb-4 max-w-3xl mx-auto">
          <div className="flex items-center text-sm text-indigo-700 bg-indigo-50 p-3 rounded-xl border border-indigo-200 shadow-sm">
            <div className="w-6 h-6 relative mr-3">
              <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <span className="font-medium">Processing your financial inquiry...</span>
          </div>
        </div>
      )}
      
      {/* Error indicator */}
      {error && (
        <div className="mb-4 max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 shadow-sm">
            <i className="fas fa-exclamation-circle text-lg"></i>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}
      
      {/* Message form */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-2xl opacity-50 blur-lg transform -translate-y-1"></div>
          
          <div className="relative flex rounded-xl overflow-hidden bg-white shadow-lg border border-indigo-100">
            <textarea 
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2} 
              placeholder="Ask anything about your financial data..." 
              className="flex-1 p-4 text-gray-700 text-sm focus:outline-none resize-none font-medium"
            />
            <button 
              type="submit"
              disabled={isLoading || !message.trim()}
              className={`${
                isLoading || !message.trim() 
                  ? 'bg-gradient-to-r from-indigo-300 to-purple-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-800'
              } text-white px-7 self-stretch transition-all duration-300 focus:outline-none flex items-center justify-center min-w-[120px] font-medium text-sm`}
            >
              <i className="fas fa-paper-plane mr-2"></i>
              <span>Send</span>
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-3 text-xs text-gray-500 w-full">
          <i className="fas fa-info-circle mr-1 text-indigo-400"></i>
          <span>Your questions are analyzed using AI to retrieve personalized financial insights</span>
        </div>
      </form>
    </footer>
  );
};

export default MessageInput;