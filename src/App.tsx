import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Quizzes from "./pages/Quizzes";
import Chatbot from "./pages/Chatbot";
import Community from "./pages/Community";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import CourseDetails from "./pages/CourseDetails";
import QuizDetails from "./pages/QuizDetails";
import QuantumPhysicsQuiz from "./pages/QuizDetails/QuantumPhysicsQuiz";
import WebDevelopmentQuiz from "./pages/QuizDetails/WebDevelopmentQuiz";
import AdvancedCalculusQuiz from "./pages/QuizDetails/AdvancedCalculusQuiz";
import MachineLearningCourse from "./pages/CourseDetails/MachineLearningCourse";
import QuantumComputingCourse from "./pages/CourseDetails/QuantumComputingCourse";
import CybersecurityCourse from "./pages/CourseDetails/CybersecurityCourse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route
              path="/courses/machine-learning"
              element={<MachineLearningCourse />}
            />
            <Route
              path="/courses/quantum-computing"
              element={<QuantumComputingCourse />}
            />
            <Route
              path="/courses/cybersecurity"
              element={<CybersecurityCourse />}
            />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/:id" element={<QuizDetails />} />
            <Route
              path="/quizzes/quantum-physics"
              element={<QuantumPhysicsQuiz />}
            />
            <Route
              path="/quizzes/web-development"
              element={<WebDevelopmentQuiz />}
            />
            <Route
              path="/quizzes/advanced-calculus"
              element={<AdvancedCalculusQuiz />}
            />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/community" element={<Community />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
