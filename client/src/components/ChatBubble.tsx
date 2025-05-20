import { Message } from "@/types/chat";
import { Bot, UserIcon, AlertTriangleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const { content, isUser, isError } = message;

  if (isUser) {
    return (
      <div className="flex items-start max-w-[80%] mb-4 ml-auto">
        <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-3 shadow-sm">
          <p>{content}</p>
        </div>
        <div className="flex-shrink-0 ml-2">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
            <UserIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start max-w-[80%] mb-4">
      <div className="flex-shrink-0 mr-2">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-white",
          isError ? "bg-destructive" : "bg-primary"
        )}>
          {isError ? <AlertTriangleIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
      </div>
      <div className="bg-card text-card-foreground rounded-lg rounded-tl-none p-3 shadow-sm">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
