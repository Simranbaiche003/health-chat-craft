import { useState, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type FlowStep = "welcome" | "country" | "id_upload" | "otp" | "personal" | "health" | "family" | "plan" | "summary";

interface ChatState {
  step: FlowStep;
  data: Record<string, any>;
}

export const useChatFlow = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! 👋 Welcome to HealthGuard Insurance. I'm your personal AI assistant, here to help you apply for health insurance.\n\nI'll guide you through the process step by step. You can type your responses, upload documents, or even use voice input!\n\nType 'Start' when you're ready to begin.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    step: "welcome",
    data: {},
  });

  const addMessage = useCallback((role: "user" | "assistant", content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const getNextStep = useCallback((currentStep: FlowStep, userInput: string): FlowStep => {
    const input = userInput.toLowerCase();
    
    switch (currentStep) {
      case "welcome":
        return input.includes("start") ? "country" : "welcome";
      case "country":
        return "id_upload";
      case "id_upload":
        return "otp";
      case "otp":
        return "personal";
      case "personal":
        return "health";
      case "health":
        return "family";
      case "family":
        return "plan";
      case "plan":
        return "summary";
      default:
        return currentStep;
    }
  }, []);

  const getResponse = useCallback((step: FlowStep, userInput: string): string => {
    const input = userInput.toLowerCase();

    switch (step) {
      case "welcome":
        if (input.includes("start")) {
          return "Great! Let's begin with your country selection. Please choose your country from the list below:\n\n🇮🇳 India (Aadhaar)\n🇦🇪 UAE (Emirates ID)\n🇸🇦 KSA (Iqama/National ID)\n🇶🇦 Qatar (QID)\n🇰🇼 Kuwait (Civil ID)\n🇧🇭 Bahrain (CPR)\n🇴🇲 Oman (Resident Card)\n\nPlease type your country name.";
        }
        return "I'm ready when you are! Just type 'Start' to begin your application.";

      case "country":
        const countries = ["india", "uae", "ksa", "qatar", "kuwait", "bahrain", "oman"];
        const selectedCountry = countries.find((c) => input.includes(c));
        
        if (selectedCountry) {
          return `Perfect! You've selected ${selectedCountry.toUpperCase()}.\n\nNow, please upload your ID proof document. You can:\n\n📎 Click the '+' button to upload a PDF or image\n📷 Or describe your document and I'll guide you through the process\n\nOnce uploaded, I'll extract your details automatically using OCR technology.`;
        }
        return "I didn't catch that. Please select one of the listed countries: India, UAE, KSA, Qatar, Kuwait, Bahrain, or Oman.";

      case "id_upload":
        return "Great! I've received your ID document. Processing...\n\n✅ Document validated\n✅ OCR extraction complete\n\nExtracted details:\n• Full Name: John Doe\n• Date of Birth: 01/01/1990\n• Gender: Male\n• Address: 123 Main St, City, 12345\n\nFor verification, I'll send an OTP to your registered mobile number. Please enter the OTP code (Demo: use 1234).";

      case "otp":
        if (input.includes("1234")) {
          return "✅ OTP verified successfully!\n\nNow, let's collect your personal information. I'll need:\n\n1. Your occupation\n2. Marital status\n3. Annual income\n4. Nominee details\n\nLet's start with your occupation. Are you in:\n• Desk Work\n• Industry Work\n• Other (please specify)";
        }
        return "That OTP doesn't match. Please try again. (Demo code: 1234)";

      case "personal":
        return "Thank you for that information! Let me calculate your profile...\n\n📊 Profile Summary:\n• Age: 34 years\n• Occupation: Desk Work\n• BMI will be calculated in next step\n\nNow let's move to your health assessment. I'll need to know:\n\n1. Your height and weight (for BMI)\n2. Lifestyle habits (smoking, alcohol)\n3. Any pre-existing conditions\n\nLet's start with your height (in cm) and weight (in kg). Example: '175cm, 70kg'";

      case "health":
        return "Based on your health information:\n\n📊 Health Profile:\n• BMI: 23.5 (Normal)\n• Lifestyle: Active\n• Pre-existing conditions: None detected\n\nExcellent! Since you have no pre-existing conditions, you can add family members to your policy.\n\nWould you like to:\n1. Add family members\n2. Continue to plan selection\n\nPlease respond with '1' or '2'.";

      case "family":
        if (input.includes("1")) {
          return "Great! Let's add your family members.\n\nFor each family member, I'll need:\n• Name\n• Age\n• Relationship\n• Health status\n\nPlease provide details for your first family member. Example: 'Jane Doe, 32, Spouse, Healthy'";
        }
        return "Perfect! Moving to plan selection.\n\n💼 Based on your profile, I recommend:\n\n🥉 **Bronze Plan** - ₹5,000/year\n• Basic hospitalization coverage\n• Annual health check-up\n• Emergency care\n\n🥈 **Silver Plan** - ₹10,000/year\n• Everything in Bronze\n• Pre and post hospitalization\n• Daycare procedures\n\n🥇 **Gold Plan** - ₹15,000/year (⭐ Recommended)\n• Everything in Silver\n• Critical illness cover\n• Worldwide emergency coverage\n\n💎 **Premium Plan** - ₹25,000/year\n• Everything in Gold\n• Zero waiting period\n• Unlimited hospitalization\n\nWhich plan interests you? Reply with: Bronze, Silver, Gold, or Premium";

      case "plan":
        const plans = ["bronze", "silver", "gold", "premium"];
        const selectedPlan = plans.find((p) => input.includes(p));
        
        if (selectedPlan) {
          return `Excellent choice! You've selected the **${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan**.\n\n📋 **Application Summary**\n\n👤 Personal Details:\n• Name: John Doe\n• Age: 34 years\n• Occupation: Desk Work\n\n🏥 Health Profile:\n• BMI: 23.5 (Normal)\n• No pre-existing conditions\n\n💼 Selected Plan: ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}\n• Coverage: As per plan details\n\n📄 Your Policy ID: POL-2025-${Math.random().toString(36).substr(2, 9).toUpperCase()}\n📅 Date: ${new Date().toLocaleDateString()}\n\n✅ Your application is complete!\n\nWould you like to:\n1. Download policy document (PDF)\n2. Add another family member\n3. Return to dashboard\n\nType 1, 2, or 3.`;
        }
        return "Please select one of the available plans: Bronze, Silver, Gold, or Premium.";

      case "summary":
        if (input.includes("1")) {
          return "🎉 Your policy document is being generated!\n\n(In production, a PDF would be downloaded here)\n\nThank you for choosing HealthGuard Insurance. Is there anything else I can help you with?";
        }
        if (input.includes("2")) {
          return "Let's add another family member! Please provide their details: Name, Age, Relationship, Health status";
        }
        if (input.includes("3")) {
          return "Thank you for using HealthGuard Insurance! Feel free to come back anytime. Have a great day! 👋";
        }
        return "Please choose an option: 1 (Download PDF), 2 (Add family member), or 3 (Return to dashboard).";

      default:
        return "I'm here to help! Could you please rephrase that?";
    }
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim()) return;

      setIsLoading(true);
      addMessage("user", content);

      // Simulate processing delay
      setTimeout(() => {
        const nextStep = getNextStep(chatState.step, content);
        const response = getResponse(chatState.step, content);

        setChatState((prev) => ({
          ...prev,
          step: nextStep,
          data: { ...prev.data, lastInput: content },
        }));

        addMessage("assistant", response);
        setIsLoading(false);
      }, 1000);
    },
    [chatState.step, addMessage, getNextStep, getResponse]
  );

  return {
    messages,
    isLoading,
    sendMessage,
    currentStep: chatState.step,
  };
};
