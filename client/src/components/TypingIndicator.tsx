import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex items-start max-w-[80%] mb-4">
      <div className="flex-shrink-0 mr-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
          <Bot className="h-4 w-4" />
        </div>
      </div>
      <div className="bg-card text-card-foreground rounded-lg rounded-tl-none p-3 shadow-sm">
        <div className="flex space-x-1 items-center h-6">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:0ms]"></span>
          <span className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:200ms]"></span>
          <span className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:400ms]"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
