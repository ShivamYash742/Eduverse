
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock user data - ensure role is properly typed as "student" | "recruiter"
      const userData = {
        id: "user-1",
        name: userType === "student" ? "John Doe" : "Jane Smith",
        email,
        // Fix the type error by explicitly setting the role as UserRole
        role: userType === "student" ? "student" as const : "recruiter" as const,
        field: userType === "student" ? "Computer Science" : undefined,
        points: userType === "student" ? 1250 : undefined,
        company: userType === "recruiter" ? "Tech Innovations Inc." : undefined,
      };
      
      // Update context
      login(userData);
      
      toast({
        title: "Logged in successfully!",
        description: "Welcome back to Eduverse.",
      });
      
      // Redirect based on user type
      if (userType === "student") {
        navigate("/");
      } else {
        navigate("/leaderboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="text-2xl font-bold flex items-center justify-center gap-2 text-white">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-neon-purple animate-pulse opacity-60 absolute -inset-0.5 blur-md"></div>
                <div className="h-8 w-8 rounded-full bg-dark flex items-center justify-center relative z-10">
                  <span className="text-neon-purple font-bold text-lg">E</span>
                </div>
              </div>
              <span>Eduverse</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-6 text-white">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <Tabs defaultValue="student" onValueChange={setUserType} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-8">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
          </TabsList>

          <Card className="border-accent bg-card/60 backdrop-blur-sm">
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Sign in as {userType === "student" ? "Student" : "Recruiter"}</CardTitle>
                <CardDescription>
                  {userType === "student" 
                    ? "Access your courses, quizzes, and learning materials" 
                    : "Find and connect with top talent for your organization"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="flex justify-end">
                  <Link to="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
