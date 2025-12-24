import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Dumbbell, Apple, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: Dumbbell, label: "Build muscle", prompt: "What's the best approach to build muscle as a natural lifter?" },
  { icon: Apple, label: "Nutrition tips", prompt: "How should I structure my nutrition for muscle growth?" },
  { icon: Brain, label: "Training mindset", prompt: "How do I develop a strong training mindset?" },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Welcome, Titan. I'm your AI training coach, built on deep knowledge of training science, technique, and programming. Ask me anything about your training, nutrition, or mindset. Let's build something extraordinary.",
    timestamp: new Date(),
  },
];

export default function AICoach() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "muscle": "Building muscle requires three pillars: progressive overload, adequate protein intake (1.6-2.2g/kg), and sufficient recovery. Focus on compound movements with proper technique, train each muscle group 2x per week, and aim for 10-20 hard sets per muscle group weekly. Track your lifts and ensure you're adding weight or reps over time.",
        "nutrition": "For muscle growth, prioritize protein distribution across 4-5 meals daily. Aim for a moderate caloric surplus (200-300 kcal). Carbohydrates fuel training performance—consume them around your workouts. Don't neglect fats for hormonal health (0.5-1g/kg). Stay hydrated and consider creatine monohydrate as a proven supplement.",
        "mindset": "Training mindset is a system, not a feeling. Build identity-based habits: you're someone who trains, period. Detach from daily motivation fluctuations. Focus on the process—showing up, executing technique, progressive overload. Mental fatigue is often a signal to deload, not quit. Train the mind like a muscle.",
        "default": "Great question. To give you the most actionable advice, I need to understand your current training experience, goals, and any constraints you're working with. What specific aspect would you like to dive deeper into?"
      };

      let response = responses.default;
      const lowerText = messageText.toLowerCase();
      if (lowerText.includes("muscle") || lowerText.includes("build")) response = responses.muscle;
      else if (lowerText.includes("nutrition") || lowerText.includes("eat") || lowerText.includes("diet")) response = responses.nutrition;
      else if (lowerText.includes("mindset") || lowerText.includes("mental") || lowerText.includes("discipline")) response = responses.mindset;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl titan-gradient flex items-center justify-center titan-glow">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl tracking-wide text-foreground">
              TITAN X <span className="text-primary">AI COACH</span>
            </h1>
            <p className="text-sm text-muted-foreground">Your personal training intelligence</p>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="p-4 border-b border-border bg-secondary/20">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {quickPrompts.map((item) => (
            <Button
              key={item.label}
              variant="outline"
              className="flex-shrink-0 border-border hover:border-primary hover:text-primary gap-2"
              onClick={() => handleSend(item.prompt)}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-4",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  message.role === "assistant"
                    ? "titan-gradient titan-glow"
                    : "bg-secondary"
                )}
              >
                {message.role === "assistant" ? (
                  <Bot className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <User className="w-5 h-5 text-foreground" />
                )}
              </div>
              <Card
                className={cn(
                  "p-4 max-w-[80%]",
                  message.role === "assistant"
                    ? "glass-card border-border/50"
                    : "bg-primary/10 border-primary/20"
                )}
              >
                <p className="text-foreground leading-relaxed">{message.content}</p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg titan-gradient titan-glow flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <Card className="glass-card border-border/50 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-muted-foreground">Analyzing...</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-6 border-t border-border bg-card/50">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask about training, nutrition, technique, or mindset..."
            className="flex-1 bg-secondary border-border focus:border-primary"
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="titan-gradient text-primary-foreground px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
