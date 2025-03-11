
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedCourses from '../components/FeaturedCourses';
import QuizSection from '../components/QuizSection';
import ChatbotSection from '../components/ChatbotSection';
import CommunitySection from '../components/CommunitySection';
import { useScrollAnimation } from '../lib/animations';
import { ChevronUp, Github, Twitter } from 'lucide-react';

const Index = () => {
  useScrollAnimation();
  
  // Fade in animations on load
  useEffect(() => {
    const animateOnLoad = () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 100);
      });
    };
    
    setTimeout(animateOnLoad, 100);
  }, []);
  
  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <div className="animate-on-scroll">
          <FeaturedCourses />
        </div>
        <div className="animate-on-scroll">
          <QuizSection />
        </div>
        <div className="animate-on-scroll">
          <ChatbotSection />
        </div>
        <div className="animate-on-scroll">
          <CommunitySection />
        </div>
      </main>
      
      <footer className="py-16 border-t border-white/5 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="text-2xl font-bold flex items-center gap-2 text-white mb-4">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-neon-purple animate-pulse opacity-60 absolute -inset-0.5 blur-md"></div>
                  <div className="h-8 w-8 rounded-full bg-dark flex items-center justify-center relative z-10">
                    <span className="text-neon-purple font-bold text-lg">E</span>
                  </div>
                </div>
                <span>Eduverse</span>
              </div>
              <p className="text-muted-foreground mb-6">
                The future of education through immersive learning experiences.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent/70 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent/70 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Learning</h4>
              <ul className="space-y-3">
                {['Courses', 'Quizzes', 'Tutorials', 'Webinars', 'Resources'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Subscribe</h4>
              <p className="text-muted-foreground mb-4">
                Stay updated with our latest courses and features.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-accent rounded-l-lg px-4 py-2 text-white placeholder:text-muted-foreground focus:outline-none"
                />
                <button className="px-4 py-2 rounded-r-lg bg-neon-purple text-white hover:bg-neon-purple/90 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Eduverse. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-neon-purple flex items-center justify-center text-white shadow-lg hover:bg-neon-purple/90 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </footer>
    </div>
  );
};

export default Index;
