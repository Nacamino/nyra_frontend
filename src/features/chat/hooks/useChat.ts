
import { useContext } from "react";

import { ChatContext } from "../context/ChatContext";

export function useChat() {
  const context = useContext(ChatContext);

  if (context === null) {
    throw new Error(
      "useChat debe utilizarse dentro de ChatProvider"
    );
  }

  return context;
}
