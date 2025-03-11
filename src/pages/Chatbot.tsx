
import { useState, useRef } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useScrollAnimation } from '../lib/animations';

const ChatMessage = ({ message, isUser }: { message: string; isUser: boolean }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-neon-purple' : 'bg-neon-blue'
      }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className={`p-4 rounded-xl ${
        isUser 
          ? 'bg-neon-purple/20 border border-neon-purple/30 text-white' 
          : 'glass-panel border border-white/10'
      }`}>
        {message}
      </div>
    </div>
  </div>
);

const sampleResponses = [
  "I can help you understand complex concepts in machine learning. What specific area are you interested in?",
  "Based on your learning history, I would recommend the 'Advanced Data Structures' course to strengthen your programming fundamentals.",
  "The answer to your question involves understanding the principles of quantum computing. Let me break it down for you...",
  "You're making excellent progress! You've completed 85% of the course materials and your quiz scores are improving consistently.",
  "That's a great question about neural networks. Let me explain how backpropagation works in simple terms..."
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean}>>([
    { text: "Hello! I'm your AI learning assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useScrollAnimation();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
      setIsLoading(false);
      
      // Scroll to the bottom
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-on-scroll">
              <h1 className="text-4xl font-bold text-white mb-4">AI Learning Assistant</h1>
              <p className="text-xl text-muted-foreground">
                Get personalized help, explanations, and learning resources from your AI companion.
              </p>
            </div>
            
            <div className="glass-panel rounded-xl p-6 mb-8 animate-on-scroll">
              <div className="h-[500px] overflow-y-auto mb-6 pr-2">
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={index} 
                    message={message.text} 
                    isUser={message.isUser} 
                  />
                ))}
                
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <div className="h-8 w-8 rounded-full bg-neon-blue flex items-center justify-center">
                        <Bot size={16} />
                      </div>
                      <div className="p-4 rounded-xl glass-panel border border-white/10">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <div className="flex gap-3">
                <textarea 
                  className="flex-1 bg-accent/60 backdrop-blur-md border border-white/10 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-neon-purple"
                  placeholder="Ask a question..."
                  rows={3}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="flex flex-col gap-2">
                  <button 
                    className="h-12 w-12 rounded-lg bg-neon-purple flex items-center justify-center text-white hover:bg-neon-purple/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send size={18} />
                  </button>
                  <button 
                    className="h-12 w-12 rounded-lg bg-accent/60 flex items-center justify-center text-white hover:bg-accent/80 transition-colors"
                    onClick={() => {
                      setMessages([
                        { text: "Hello! I'm your AI learning assistant. How can I help you today?", isUser: false }
                      ]);
                    }}
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll">
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Recent Topics</h3>
                <ul className="space-y-2">
                  {["Machine Learning Basics", "Python Programming", "Data Structures", "Quantum Computing", "Web Development"].map((topic, index) => (
                    <li key={index} className="text-muted-foreground hover:text-white cursor-pointer">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Learning Suggestions</h3>
                <ul className="space-y-2">
                  {["Advanced Algorithms Course", "AI Ethics Workshop", "Database Design Practice", "Network Security Basics", "UI/UX Fundamentals"].map((suggestion, index) => (
                    <li key={index} className="text-muted-foreground hover:text-white cursor-pointer">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Study Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Machine Learning</span>
                      <span className="text-white">78%</span>
                    </div>
                    <div className="h-2 bg-accent/60 rounded-full">
                      <div className="h-2 bg-neon-purple rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Web Development</span>
                      <span className="text-white">92%</span>
                    </div>
                    <div className="h-2 bg-accent/60 rounded-full">
                      <div className="h-2 bg-neon-blue rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Data Science</span>
                      <span className="text-white">45%</span>
                    </div>
                    <div className="h-2 bg-accent/60 rounded-full">
                      <div className="h-2 bg-neon-pink rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
