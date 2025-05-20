import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-border py-4 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your accounting data..."
              className="w-full px-4 py-3 bg-card"
              disabled={isLoading}
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !message.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <span className="mr-1">Send</span>
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
