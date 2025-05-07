// src/components/Hero.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RocketIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    "Code Debugging",
    "Code Generation",
    "Code Explanation",
    "Code Review & Optimization",
    "Code Conversion",
    "Test Case Generation",
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4 py-12 md:px-6">
      <Card className="w-full max-w-6xl shadow-2xl border-none rounded-3xl bg-gradient-to-br from-background via-muted to-background">
        <CardContent className="p-8 md:p-14 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-indigo-500 animate-bounce" />
              Your AI Powered Coding Assistant
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Debug, review, generate, and explain code instantly with intelligent AI.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            {features.map((feature) => (
              <div
                key={feature}
                className="bg-secondary/90 text-secondary-foreground rounded-2xl p-4 font-medium text-sm shadow hover:scale-105 hover:bg-accent transition-transform duration-200"
              >
                {feature}
              </div>
            ))}
          </div> 
          <div className="pt-8 space-y-1">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Built using:
            </h3>
            <p className="text-sm text-muted-foreground">
              MongoDB, Express.js, React, Node.js, Tailwind CSS, Gemini API, ShadCN UI
            </p>
          </div> 
          <div className="pt-6">
            <Button
              className="px-8 py-3 text-base gap-2"
              size="lg"
              onClick={() => navigate("/login")}
            >
              <RocketIcon className="w-4 h-4" />
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Hero;
