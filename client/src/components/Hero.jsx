import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RocketIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    "DSA Code Debugging",
    "DSA Code Generation",
    "Solution Explanation",
    "Code Conversion (Lang-to-Lang)",
    "Test Case Generation",
    "DSA Code Review & Optimization"
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4 py-8 md:px-6">
      <Card className="w-full max-w-6xl shadow-2xl border rounded-3xl bg-white">
        <CardContent className="p-6 sm:p-10 md:p-14 space-y-8"> 
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight flex items-center justify-center gap-2">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-primary animate-bounce" />
              Your AI-Powered DSA Problem-Solving Assistant
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
              Debug, generate, convert, and optimize DSA code with AI assistance—featuring solution explanations, test case generation, and performance analysis.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="bg-gray-100 text-gray-800 rounded-xl p-4 font-medium text-sm shadow hover:scale-105 hover:bg-gray-200 transition-transform duration-200 text-center"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="text-center space-y-1 pt-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700">
              Built using:
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              MongoDB, Express.js, React, Node.js, Tailwind CSS, Gemini API, ShadCN UI
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center pt-2">
            <Button
              className="px-6 py-3 text-sm sm:text-base gap-2"
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
