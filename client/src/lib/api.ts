import { ChatRequest } from "@/types/chat";

const API_URL = "https://accountingai-production.up.railway.app/chat";

export const sendChatMessage = async (request: ChatRequest) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
};
