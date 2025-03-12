import { ChatBot } from "@/components/ChatBot";

export default function Chatbot() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Learning Assistant
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Ask me anything about computer science, mathematics, or any other
        subject!
      </p>
      <ChatBot />
    </div>
  );
}
