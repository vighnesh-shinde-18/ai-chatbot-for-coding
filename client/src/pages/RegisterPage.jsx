import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/assets/logo/logo.png";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, username, password }),
      });

      if (response.status === 201) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else if (response.status === 409) {
        toast.error("User already exists.");
      } else {
        console.log(response)
        toast.error("Registration failed. Try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
    }
  };

  return (
    <section className="min-h-screen shadow-xl/30 flex items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md shadow-xl rounded-3xl border-none">
        <CardHeader className="flex flex-col items-center space-y-4">
          <img src={Logo} alt="Logo" className="size-44 object-contain m-0" />
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                Email
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
              <label htmlFor="username" className="text-sm font-medium text-muted-foreground">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                required
                placeholder="your_username"
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                required
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full gap-2">
              <UserPlus className="w-4 h-4" />
              Register
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
          <p className="my-2 font-medium text-center cursor-pointer underline">Continue Without Register</p>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
