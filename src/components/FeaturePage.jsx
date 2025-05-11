// src/components/FeaturePage.jsx

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";
import { Copy, Loader2 } from "lucide-react";

const featureMap = {
  codeDebugging: "Code Debugging",
  codeReview: "Code Review",
  codeGeneration: "Code Generation",
  convertCode: "Code Conversion",
  explainCode: "Code Explanation",
  generateTestCases: "Test Case Generation",
};

const languageOptions = [
  "C",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "Rust",
];

function FeaturePage({ requiredFeature, outputResponse, userInput }) {
  const navigate = useNavigate();
  const [codePrompt, setCodePrompt] = useState(userInput);
  const [aiResponse, setAiResponse] = useState(outputResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState("Python");
  const [targetLang, setTargetLang] = useState("JavaScript");

  const featureTitle = featureMap[requiredFeature] || "Feature";

  useEffect(() => {
    if (!featureMap[requiredFeature]) {
      toast.error("Invalid Feature");
      navigate("/dashboard");
    }
  }, [requiredFeature]);

  const handleCopy = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse);
      toast.success("Copied to clipboard!");
    }
  };

  const handleSubmit = async () => {
    if (!codePrompt.trim()) {
      toast.warning("Please enter your code.");
      return;
    }

    setIsLoading(true);
    setAiResponse("");

    try {
      const payload = {
        prompt: codePrompt,
        feature: requiredFeature,
      };

      if (requiredFeature === "convertCode") {
        payload.sourceLang = sourceLang;
        payload.targetLang = targetLang;
      }

      const res = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong.");

      setAiResponse(
        data?.structuredResponse?.code ||
          data?.structuredResponse?.message ||
          "No response."
      );
    } catch (err) {
      toast.error(err.message || "AI Request failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar selectedFeature={requiredFeature} />
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <h1 className="text-3xl font-semibold">{featureTitle}</h1>
        {requiredFeature === "convertCode" && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col">
              <Label htmlFor="sourceLang">Source Language</Label>
              <select
                id="sourceLang"
                className="border border-input rounded-md px-3 py-2 mt-1 bg-background"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="targetLang">Target Language</Label>
              <select
                id="targetLang"
                className="border border-input rounded-md px-3 py-2 mt-1 bg-background"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Input Code Editor */}
        <div>
          <Editor
            height="300px"
            defaultLanguage="javascript"
            value={codePrompt}
            onChange={(value) => setCodePrompt(value)}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              fontSize: 14,
            }}
            theme="vs-dark"
          />
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
          Run
        </Button>

        {/* AI Response Editor */}
        {aiResponse && (
          <div className="relative mt-6 border rounded-lg overflow-hidden shadow-md">
            <div className="absolute top-2 right-2 z-10">
              <Button size="icon" variant="ghost" onClick={handleCopy}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <Editor
              height="400px"
              defaultLanguage="javascript"
              value={aiResponse}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                wordWrap: "on",
              }}
              theme="vs-dark"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturePage;
