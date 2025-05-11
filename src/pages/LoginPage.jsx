import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Logo from "@/assets/logo/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate('/dashboard')
        }, 4000)

        localStorage.setItem("isLoggedIn", true);
      } else if (response.status === 404) {
        toast.error("User not found.");
      } else if (response.status === 401) {
        toast.error("Incorrect password.");
      } else {
        toast.error("Login failed. Try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };
 
  return (
    <section className="min-h-screen shadow-xl/30 flex items-center justify-center  bg-background px-4 py-10">
      <Card className="w-full max-w-md shadow-xl rounded-3xl border-none">
        <CardHeader className="flex flex-col items-center space-y-4">
          <img src={Logo} alt="Logo" className="size-44 object-contain" />
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Sign in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                required
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 pr-10"
                />
                <div
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </form>
          <p className="mt-6 text-sm text-center text-muted-foreground">
            <span>Don't have an account?{" "}</span>
            <span
              onClick={() => navigate("/register")}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Register Now
            </span>
          </p> </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
