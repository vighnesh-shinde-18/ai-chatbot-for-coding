import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import FeatureResponseRenderer from "@/components/responseComponents/FeatureResponseRenderer";
import { useNavigate } from "react-router-dom";

const languageOptions = [
  "javascript", "python", "c++", "java", "typescript", "go", "rust", "php", "c#", "kotlin"
];

const typeToName = {
  codeDebugging: "Debug Code",
  codeReview: "Review Code",
  codeGeneration: "Generate Code",
  explainCode: "Explain Code",
  convertCode: "Convert Code",
  generateTestCases: "Generate Test Cases",
};

const typeToComment = {
  codeDebugging: "// Enter code for debugging",
  codeReview: "// Enter code for review",
  codeGeneration: "// Describe what code to generate",
  explainCode: "// Enter code to explain",
  convertCode: "// Enter code to convert to another language",
  generateTestCases: "// Enter code to generate test cases",
};

const FeaturePage = ({ requiredFeature }) => {
  const [inputCode, setInputCode] = useState(typeToComment[requiredFeature] || "// Enter your code");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState(languageOptions[0]);

  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const AI_RESPONSE_URL = `${BASE_URL}/api/ai/generate`;

  useEffect(() => {
    setInputCode(typeToComment[requiredFeature] || "// Enter your code");
  }, [requiredFeature]);

  const handleSubmit = async () => {
    if (!inputCode.trim()) {
      return toast.error("Please enter your code or prompt.");
    }

    setLoading(true);
    setResponse(null);

    const payload = {
      userInput: inputCode,
      featureType: requiredFeature,
      ...(requiredFeature === "convertCode" && { targetLanguage: targetLang }),
    };

    try {
      const res = await axios.post(AI_RESPONSE_URL, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const rawOutput = res.data.data;
      const rawOutputStr = typeof rawOutput === "string" ? rawOutput : JSON.stringify(rawOutput);
      const outerCleaned = rawOutputStr.replace(/^```json\n/, "").trim();
      const finalOutput = outerCleaned.replace(/```$/, "").trim();

      try {
        const parsed = JSON.parse(finalOutput);
        setResponse(parsed);
      } catch (parseErr) {
        console.error("JSON Parse Error:", parseErr);
        toast.error("AI returned invalid JSON format.");
        setResponse({ error: "Failed to parse AI response." });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to fetch AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar  selectedFeature={requiredFeature} />

      <div className="flex-1 p-6 overflow-auto space-y-6 bg-gray-50 rounded-tl-2xl shadow-inner">
        <h1 className="text-3xl font-semibold text-center md:text-left text-gray-800">
          {typeToName[requiredFeature] || "AI Feature"}
        </h1>

        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Editor
            height="300px"
            theme="vs-dark"
            language={requiredFeature === "codeGeneration" ? "text" : "javascript"}
            value={inputCode}
            onChange={(val) => setInputCode(val || "")}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              fontSize: 14,
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {requiredFeature === "convertCode" && (
          <div className="flex items-center gap-3">
            <label className="font-medium text-sm text-gray-700">Target Language:</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="px-3 py-2 rounded border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>

        {response && (
          <div className="mt-6 p-4 bg-white border rounded-lg shadow-md">
            <FeatureResponseRenderer
              feature={requiredFeature}
              response={response}
              language={targetLang}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturePage;
