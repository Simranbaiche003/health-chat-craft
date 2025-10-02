import { Card } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? "bg-gradient-primary shadow-soft"
              : "bg-muted border border-border"
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-foreground" />
          )}
        </div>

        {/* Message Content */}
        <Card
          className={`px-4 py-3 rounded-2xl shadow-soft border-border/50 ${
            isUser
              ? "bg-chat-user text-chat-user-foreground rounded-tr-sm"
              : "bg-chat-bot text-chat-bot-foreground rounded-tl-sm"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          <p className={`text-xs mt-2 ${isUser ? "text-chat-user-foreground/70" : "text-chat-bot-foreground/70"}`}>
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
