import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Shield, Send, Mic, Plus, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ChatMessage from "@/components/chat/ChatMessage";
import { useChatFlow } from "@/hooks/useChatFlow";

const PolicyMode = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, isLoading, sendMessage } = useChatFlow();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }
      toast.success(`Uploaded: ${file.name}`);
      // In production, process the file here
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          setIsRecording(true);
          toast.info("Recording started... (Demo mode)");
          // In production, implement actual voice recording
          setTimeout(() => {
            setIsRecording(false);
            toast.success("Recording stopped");
          }, 3000);
        })
        .catch(() => {
          toast.error("Microphone access denied");
        });
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Health Insurance Assistant</h1>
              <p className="text-xs text-muted-foreground">AI-powered support</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="bg-chat-bot border-border/50 px-4 py-3 rounded-2xl max-w-[80%] shadow-soft">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-chat-bot-foreground">Thinking...</span>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleFileUpload}
              className="shrink-0 hover:bg-muted transition-all"
              title="Upload file"
            >
              <Plus className="w-5 h-5" />
            </Button>
            <div className="flex-1 flex items-end gap-2 bg-muted rounded-2xl p-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isLoading}
              />
              <Button
                variant={isRecording ? "destructive" : "ghost"}
                size="icon"
                onClick={toggleRecording}
                className={`shrink-0 transition-all ${
                  isRecording ? "animate-pulse" : ""
                }`}
                title={isRecording ? "Stop recording" : "Start voice recording"}
              >
                <Mic className="w-5 h-5" />
              </Button>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="shrink-0 bg-gradient-primary hover:opacity-90 shadow-medium transition-all"
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Supported formats: PDF, JPG, PNG (Max 10MB)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PolicyMode;
