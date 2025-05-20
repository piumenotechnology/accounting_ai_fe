export type TableType = "closed_deal" | "payment" | "invoice" | "ar" | "ap";

export interface ChatRequest {
  session_id: string;
  table: TableType;
  message: string;
}

export interface ChatResponse {
  response: string;
}

export interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}
