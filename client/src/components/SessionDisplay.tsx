import { cn } from "@/lib/utils";

interface SessionDisplayProps {
  sessionId: string;
}

const SessionDisplay = ({ sessionId }: SessionDisplayProps) => {
  return (
    <div className="bg-secondary/20 dark:bg-gray-900 py-2 px-4 md:px-6 border-b border-border">
      <div className="max-w-5xl mx-auto flex items-center text-sm text-muted-foreground">
        <span className="mr-2">Session ID:</span>
        <code className={cn(
          "bg-secondary/30 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono",
          !sessionId && "animate-pulse"
        )}>
          {sessionId || "generating..."}
        </code>
      </div>
    </div>
  );
};

export default SessionDisplay;
