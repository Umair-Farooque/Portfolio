export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
  }
  
  export async function sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch response from API");
      }
  
      const data = await res.json();
      return data.reply; // response from API
    } catch (error) {
      console.error("Chat error:", error);
      return "Sorry, something went wrong. Please try again later.";
    }
  }
  