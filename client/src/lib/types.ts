// Chat message type
export interface ChatMessage {
  content: string | Record<string, any>;
  isUser: boolean;
}

// API request payload structure
export interface ChatPayload {
  session_id: string;
  table: string;
  message: string;
}

// API response structure
export interface ChatResponse {
  response: string;
}
