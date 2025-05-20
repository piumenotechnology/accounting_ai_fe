import { useMemo } from "react";

interface ChatMessageProps {
  message: string | Record<string, any>;
  isUser: boolean;
}

const ChatMessage = ({ message, isUser }: ChatMessageProps) => {
  // Process the message content based on type
  const processedContent = useMemo(() => {
    if (typeof message === 'object') {
      // Format the response object for display
      if ('response' in message) {
        return {
          text: message.response as string,
          raw: JSON.stringify(message, null, 2)
        };
      }
      return {
        text: "Response data",
        raw: JSON.stringify(message, null, 2)
      };
    }
    return {
      text: message as string,
      raw: null
    };
  }, [message]);

  return (
    <div className={`flex items-start ${isUser ? 'justify-end' : ''} mb-8 max-w-3xl mx-auto`}>
      {/* Bot icon on left side for bot messages */}
      {!isUser && (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center mr-4 flex-shrink-0 shadow-md border-2 border-white">
          <i className="fas fa-robot text-white text-sm"></i>
        </div>
      )}

      {/* Message bubble */}
      <div className="relative">
        {/* Subtle glow effect for messages */}
        {!isUser && (
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl opacity-20 blur-md transform -translate-y-1"></div>
        )}
        {isUser && (
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl opacity-20 blur-md transform -translate-y-1"></div>
        )}
        
        <div 
          className={`relative ${
            isUser 
              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100' 
              : 'bg-white border border-blue-100'
          } rounded-2xl p-5 max-w-[85%] shadow-md`}
        >
          {/* Message content */}
          <div className={`text-gray-800 leading-relaxed whitespace-pre-line mb-2 ${!isUser ? 'font-medium' : ''}`}>
            {processedContent.text}
          </div>
          
          {/* Timestamp for messages */}
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-gray-400 flex items-center">
              <i className={`fas ${isUser ? 'fa-user' : 'fa-robot'} mr-1 text-indigo-300`}></i>
              <span>{isUser ? 'You' : 'Financial AI'}</span>
            </div>
            <div className="text-xs text-gray-400">
              {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
          
          {/* If there's raw JSON, show it in a collapsible section */}
          {processedContent.raw && (
            <div className="mt-4 border-t border-indigo-50 pt-4">
              <details className="text-xs">
                <summary className="text-indigo-600 cursor-pointer font-medium flex items-center hover:text-indigo-800 transition-colors">
                  <i className="fas fa-code mr-2 text-xs"></i> View API Response Data
                </summary>
                <div className="bg-gray-900 p-4 rounded-xl overflow-x-auto mt-3 text-xs border border-indigo-900 shadow-inner">
                  <pre className="text-green-400 font-mono whitespace-pre">
                    {processedContent.raw}
                  </pre>
                </div>
              </details>
            </div>
          )}
        </div>
      </div>

      {/* User icon on right side for user messages */}
      {isUser && (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center ml-4 flex-shrink-0 shadow-md border-2 border-white">
          <i className="fas fa-user text-white text-sm"></i>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
