
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Award, Star, Zap, Brain, Trophy, Activity, Timer, CheckCircle, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useScrollAnimation } from '../lib/animations';

// Quiz categories
const quizCategories = [
  { 
    id: 1,
    title: "Technology", 
    icon: <Zap className="h-6 w-6 text-neon-blue" />,
    color: "from-neon-blue/20 to-transparent",
    quizCount: 248,
    description: "From AI and blockchain to cybersecurity",
    popularTags: ["AI", "Programming", "Web3"]
  },
  { 
    id: 2,
    title: "Science", 
    icon: <Brain className="h-6 w-6 text-neon-purple" />,
    color: "from-neon-purple/20 to-transparent",
    quizCount: 175,
    description: "Physics, chemistry, biology and more",
    popularTags: ["Physics", "Chemistry", "Space"]
  },
  { 
    id: 3,
    title: "Mathematics", 
    icon: <Activity className="h-6 w-6 text-neon-pink" />,
    color: "from-neon-pink/20 to-transparent",
    quizCount: 324,
    description: "From algebra to advanced calculus",
    popularTags: ["Algebra", "Calculus", "Statistics"]
  },
  { 
    id: 4,
    title: "Language", 
    icon: <Award className="h-6 w-6 text-neon-teal" />,
    color: "from-neon-teal/20 to-transparent",
    quizCount: 196,
    description: "English, Hindi, Spanish and more",
    popularTags: ["Grammar", "Vocabulary", "Literature"]
  }
];

// Trending quizzes
const trendingQuizzes = [
  {
    id: 1,
    title: "Artificial Intelligence Fundamentals",
    category: "Technology",
    difficulty: "Intermediate",
    questions: 25,
    timeLimit: "20 min",
    participants: 12845,
    rating: 4.8
  },
  {
    id: 2,
    title: "Quantum Physics Basics",
    category: "Science",
    difficulty: "Advanced",
    questions: 30,
    timeLimit: "25 min",
    participants: 8972,
    rating: 4.7
  },
  {
    id: 3,
    title: "Web Development Quiz",
    category: "Technology",
    difficulty: "Beginner",
    questions: 20,
    timeLimit: "15 min",
    participants: 21568,
    rating: 4.9
  },
  {
    id: 4,
    title: "Advanced Calculus Challenge",
    category: "Mathematics",
    difficulty: "Advanced",
    questions: 35,
    timeLimit: "30 min",
    participants: 5421,
    rating: 4.6
  }
];

// Featured quiz
const featuredQuiz = {
  title: "Astrophysics Trivia Challenge",
  description: "Test your knowledge of stars, galaxies, and the cosmos in this challenging quiz about our universe.",
  difficulty: "Intermediate",
  questions: 20,
  timeLimit: "15 min",
  category: "Science",
  image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop",
  participants: 7845,
  leaderboard: [
    { rank: 1, name: "Alexander", score: 98, avatar: "https://i.pravatar.cc/150?img=1" },
    { rank: 2, name: "Emma", score: 95, avatar: "https://i.pravatar.cc/150?img=5" },
    { rank: 3, name: "Michael", score: 92, avatar: "https://i.pravatar.cc/150?img=3" }
  ]
};

const QuizCard = ({ quiz }: { quiz: typeof trendingQuizzes[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Simple hover effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      card.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 5}deg) rotateY(${(x - 0.5) * -5}deg)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className="glass-panel rounded-xl overflow-hidden transition-all duration-300 transform hover:shadow-lg border border-white/5 hover:border-white/10"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            quiz.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
            quiz.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {quiz.difficulty}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-white text-sm">{quiz.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">{quiz.title}</h3>
        
        <p className="text-muted-foreground text-sm mb-4">
          Category: <span className="text-white">{quiz.category}</span>
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Target className="w-4 h-4 text-neon-purple" />
            {quiz.questions} Questions
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Timer className="w-4 h-4 text-neon-blue" />
            {quiz.timeLimit}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Trophy className="w-4 h-4 text-neon-pink" />
            50 XP
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Award className="w-4 h-4 text-yellow-400" />
            2 Badges
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-white/5 flex justify-between items-center">
        <button className="px-4 py-1.5 rounded-lg bg-neon-purple text-white text-sm font-medium hover:bg-neon-purple/90 transition-colors">
          Start Quiz
        </button>
        <div className="text-muted-foreground text-xs">
          {quiz.participants.toLocaleString()} participants
        </div>
      </div>
    </div>
  );
};

const Quizzes = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const navigate = useNavigate();
  
  useScrollAnimation();
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero section */}
        <div className="relative bg-hero-pattern py-16 mb-12">
          <div className="absolute inset-0 bg-glow-purple opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="animate-on-scroll">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Test Your Knowledge
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Challenge yourself with interactive quizzes, earn points, and climb the leaderboards.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Popular", "New", "Trending", "Challenging", "Quick"].map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full text-sm bg-accent/60 text-white cursor-pointer hover:bg-accent/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="px-6 py-3 bg-neon-purple rounded-lg text-white font-medium flex items-center gap-2 hover:bg-neon-purple/90 transition-colors neon-glow neon-glow-purple"
                  onClick={() => setShowQuizModal(true)}
                >
                  <Zap className="w-5 h-5" />
                  Start a Random Quiz
                </button>
              </div>
              
              <div className="relative animate-on-scroll">
                <div className="perspective-container">
                  <div className="relative glass-panel p-6 rounded-xl border border-white/10 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">Your Stats</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-accent/40 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-white mb-1">24</div>
                        <div className="text-muted-foreground text-sm">Quizzes Taken</div>
                      </div>
                      <div className="bg-accent/40 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-neon-purple mb-1">1,250</div>
                        <div className="text-muted-foreground text-sm">Total XP</div>
                      </div>
                      <div className="bg-accent/40 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-neon-blue mb-1">8</div>
                        <div className="text-muted-foreground text-sm">Badges Earned</div>
                      </div>
                      <div className="bg-accent/40 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-neon-pink mb-1">87%</div>
                        <div className="text-muted-foreground text-sm">Avg. Score</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button className="text-neon-purple hover:underline transition-all">
                        View Full Stats
                      </button>
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-accent flex items-center justify-center text-white text-xs font-medium">
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Quiz categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Quiz Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quizCategories.map((category) => (
                <div 
                  key={category.id}
                  className={`glass-panel rounded-xl overflow-hidden hover-scale cursor-pointer transition-all duration-300 ${
                    activeCategory === category.id ? 'border border-neon-purple/50 shadow-lg shadow-neon-purple/20' : 'border border-white/5'
                  }`}
                  onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
                >
                  <div className={`bg-gradient-to-b ${category.color} p-6`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-12 w-12 rounded-lg glass-effect flex items-center justify-center">
                        {category.icon}
                      </div>
                      <span className="text-white font-semibold">{category.quizCount} Quizzes</span>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-white mb-2">{category.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.popularTags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                      <button className="text-sm font-medium text-white hover:text-neon-purple transition-colors">
                        Browse Quizzes
                      </button>
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-accent border-2 border-dark-card"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Featured quiz */}
          <div className="mb-16 animate-on-scroll">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Featured Quiz</h2>
              <button className="text-neon-purple text-sm font-medium hover:underline">
                See all featured
              </button>
            </div>
            
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={featuredQuiz.image} 
                    alt={featuredQuiz.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block ${
                      featuredQuiz.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      featuredQuiz.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {featuredQuiz.difficulty}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{featuredQuiz.title}</h3>
                    <p className="text-white/80 text-sm">
                      {featuredQuiz.questions} Questions • {featuredQuiz.timeLimit} • {featuredQuiz.participants.toLocaleString()} Participants
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">
                    {featuredQuiz.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      Leaderboard
                    </h4>
                    
                    <div className="space-y-3">
                      {featuredQuiz.leaderboard.map((leader) => (
                        <div key={leader.rank} className="flex items-center p-2 bg-accent/40 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium mr-3">
                            {leader.rank}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-accent mr-3">
                            <img 
                              src={leader.avatar} 
                              alt={leader.name} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{leader.name}</div>
                          </div>
                          <div className="text-neon-purple font-bold">{leader.score} pts</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-neon-purple rounded-lg text-white font-medium hover:bg-neon-purple/90 transition-colors">
                    Take This Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trending quizzes */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Trending Quizzes</h2>
              <button className="text-neon-purple text-sm font-medium hover:underline">
                View all
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingQuizzes.map((quiz) => (
                <div key={quiz.id} className="animate-on-scroll">
                  <QuizCard quiz={quiz} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Quick start quiz modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-panel rounded-xl w-full max-w-lg transform transition-all animate-fade-in">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Quick Start Quiz</h3>
              <button 
                className="text-muted-foreground hover:text-white transition-colors"
                onClick={() => setShowQuizModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Choose your difficulty:</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <button 
                      key={level}
                      className={`p-3 rounded-lg border text-center ${
                        level === 'Intermediate'
                          ? 'border-neon-purple bg-neon-purple/10 text-white'
                          : 'border-white/10 bg-accent/40 text-muted-foreground hover:bg-accent/60 hover:text-white'
                      } transition-colors`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Select category:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {quizCategories.map((category) => (
                    <button 
                      key={category.id}
                      className={`p-3 rounded-lg border text-center flex items-center justify-center gap-2 ${
                        category.id === 2
                          ? 'border-neon-purple bg-neon-purple/10 text-white'
                          : 'border-white/10 bg-accent/40 text-muted-foreground hover:bg-accent/60 hover:text-white'
                      } transition-colors`}
                    >
                      {category.icon}
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Quiz length:</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['10 questions', '20 questions', '30 questions'].map((length, index) => (
                    <button 
                      key={index}
                      className={`p-3 rounded-lg border text-center ${
                        index === 1
                          ? 'border-neon-purple bg-neon-purple/10 text-white'
                          : 'border-white/10 bg-accent/40 text-muted-foreground hover:bg-accent/60 hover:text-white'
                      } transition-colors`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 py-3 bg-accent/60 rounded-lg text-white hover:bg-accent/80 transition-colors"
                  onClick={() => setShowQuizModal(false)}
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-neon-purple rounded-lg text-white hover:bg-neon-purple/90 transition-colors">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
