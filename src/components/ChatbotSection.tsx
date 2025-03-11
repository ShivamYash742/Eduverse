
import { useRef, useState } from 'react';
import { MessageCircle, Send, Bot, Info, User } from 'lucide-react';

const ChatbotSection = () => {
  const [message, setMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Sample chat messages
  const [messages] = useState([
    { sender: 'bot', content: 'Hello! How can I help with your learning journey today?', timestamp: '10:30 AM' },
    { sender: 'user', content: 'I\'m having trouble with machine learning concepts.', timestamp: '10:31 AM' },
    { sender: 'bot', content: 'I understand. Machine learning can be challenging. Would you like me to recommend some resources or explain a specific concept?', timestamp: '10:31 AM' },
    { sender: 'user', content: 'Can you explain neural networks simply?', timestamp: '10:32 AM' },
    { sender: 'bot', content: 'Neural networks are computing systems inspired by the human brain. They consist of layers of nodes (neurons) that process information. Input data passes through these layers, with each node applying transformations until it reaches the output layer providing a result. The network "learns" by adjusting the connections between neurons based on training data, allowing it to recognize patterns and make predictions on new data.', timestamp: '10:33 AM' }
  ]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the message to the AI
    setMessage('');
  };

  return (
    <section className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-glow-purple opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm text-neon-purple font-semibold uppercase tracking-wider mb-2">AI Assistant</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Learning Companion</h3>
          <p className="text-muted-foreground">
            Get personalized help, study guidance, and answers to your questions 24/7 with our advanced AI chatbot.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Chatbot features */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                icon: <MessageCircle className="h-6 w-6 text-neon-blue" />,
                title: "Instant Answers",
                description: "Get immediate responses to your academic questions across all subjects."
              },
              {
                icon: <Bot className="h-6 w-6 text-neon-purple" />,
                title: "Personalized Learning",
                description: "The AI adapts to your learning style and provides tailored recommendations."
              },
              {
                icon: <Info className="h-6 w-6 text-neon-pink" />,
                title: "Concept Explanations",
                description: "Complex topics broken down into easy-to-understand explanations."
              }
            ].map((feature, index) => (
              <div key={index} className="glass-panel rounded-xl p-6 hover-scale">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-lg glass-effect flex items-center justify-center mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="glass-panel rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Available 24/7</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI chatbot is always ready to help you with your learning journey, 
                whenever inspiration strikes or questions arise.
              </p>
              <button className="w-full py-3 rounded-lg bg-neon-purple hover:bg-neon-purple/90 transition-all text-white font-medium">
                Start Chatting
              </button>
            </div>
          </div>
          
          {/* Chat interface */}
          <div className="lg:col-span-3 glass-panel rounded-xl overflow-hidden flex flex-col h-[600px]">
            {/* Chat header */}
            <div className="p-4 border-b border-white/5 flex items-center">
              <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-neon-purple" />
              </div>
              <div>
                <h4 className="text-white font-medium">EduBot</h4>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-xl p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-neon-purple text-white rounded-tr-none' 
                        : 'glass-effect text-white rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 inline-block">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
            
            {/* Chat input */}
            <div className="p-4 border-t border-white/5">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-accent rounded-lg px-4 py-2 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-neon-purple/50"
                />
                <button 
                  type="submit"
                  className="p-2 rounded-lg bg-neon-purple text-white hover:bg-neon-purple/90 transition-all"
                  disabled={!message.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
