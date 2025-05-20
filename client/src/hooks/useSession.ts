import { useState, useEffect } from "react";
import { generateSessionId } from "@/lib/utils";

export function useSession() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // Generate a new session ID on component mount
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    
    // Persist to localStorage
    localStorage.setItem("accountingai_session", newSessionId);
  }, []);

  return { sessionId };
}
