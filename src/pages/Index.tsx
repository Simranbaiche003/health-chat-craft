import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, MessageSquare, FileCheck, Users, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-strong mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Your Health, Our Priority
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of health insurance with our AI-powered chatbot assistant. Quick, easy, and personalized coverage in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 shadow-strong text-lg px-8"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate("/signin")}
              size="lg"
              variant="outline"
              className="text-lg px-8 hover:bg-muted"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose HealthGuard?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="AI Chatbot Assistant"
              description="Chat naturally with our AI assistant. Get instant answers and personalized recommendations."
            />
            <FeatureCard
              icon={<FileCheck className="w-8 h-8" />}
              title="Smart Document Processing"
              description="Upload your ID once. Our OCR technology extracts all needed information automatically."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Family Coverage"
              description="Easily add family members and customize coverage for each person's unique needs."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-card rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all border border-border/50 group">
    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-soft">
      <div className="text-white">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;
