import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, LogOut, MessageSquare, ClipboardList } from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/signin");
  };

  const handlePolicyClick = () => {
    navigate("/policy-mode");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              HealthGuard
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold text-foreground">
              Welcome to Your Dashboard
            </h2>
            <p className="text-xl text-muted-foreground">
              Manage your health insurance policies with ease
            </p>
          </div>

          {/* Policy Card */}
          <Card className="shadow-strong border-border/50 hover:shadow-xl transition-all">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-medium">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl">Policy Management</CardTitle>
                <CardDescription className="text-base mt-2">
                  Choose how you'd like to apply for your health insurance
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Form Mode */}
                <Card className="border-2 border-border hover:border-primary transition-all cursor-pointer group">
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-muted group-hover:bg-gradient-primary transition-all rounded-xl flex items-center justify-center">
                      <ClipboardList className="w-8 h-8 text-foreground group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Form Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        Traditional step-by-step form application
                      </p>
                    </div>
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>

                {/* Chatbot Mode */}
                <Card className="border-2 border-primary bg-primary/5 cursor-pointer group hover:shadow-strong transition-all">
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Chatbot Assistant</h3>
                      <p className="text-sm text-muted-foreground">
                        Chat with AI assistant with voice support
                      </p>
                    </div>
                    <Button 
                      onClick={handlePolicyClick}
                      className="w-full bg-gradient-primary hover:opacity-90 shadow-medium"
                    >
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
