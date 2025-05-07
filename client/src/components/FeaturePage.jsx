import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
// import HistoryDialog from "@/components/HistoryDialog";
import FeatureResponseRenderer from "@/components/responseComponents/FeatureResponseRenderer";

const languageOptions = ["javascript", "python", "c++", "java", "typescript", "go", "rust", "php", "c#", "kotlin"];

const typeToName = {
  "codeDebugging": "Debug Code",
  "codeReview": "Review Code",
  "codeGeneration": "Generate Code",
  "explainCode": "Explain Code",
  "convertCode": "Convert Code",
  "generateTestCases": "Generate Test Cases"
}

const typeToComment = {
  "codeDebugging": "// Enter Code for Debugging",
  "codeReview": "// Enter Code for Review",
  "codeGeneration": "// Enter requirements for generating code ",
  "explainCode": "// Enter Code for Explanation",
  "convertCode": "// Enter Code for Converting to other language",
  "generateTestCases": "// Enter Code for Test Cases Generation"
}

const FeaturePage = ({ selectedFeature }) => {
  const [inputCode, setInputCode] = useState(typeToComment[selectedFeature]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState(languageOptions[0]); 

  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    setInputCode(typeToComment[selectedFeature]); // Set this instead of using separate 'comment'
  }, [selectedFeature]);
  

  const handleSubmit = async () => {
    if (!inputCode.trim()) {
      return toast.error("Please enter some code or prompt");
    }

    setLoading(true);
    setResponse(null);

    const payload = {
      userInput: inputCode,
      featureType: selectedFeature,
      ...(selectedFeature === "Convert" && { targetLanguage: targetLang }),
    };

    const res = await axios.post(
      "http://localhost:5000/api/ai/generate",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const rawOutput = res.data.data;

    const rawOutputStr = typeof rawOutput === "string" ? rawOutput : JSON.stringify(rawOutput);

    const outerCleaned = rawOutputStr
      .replace(/^```json\n/, "")
      .trim();

    const finalOutput = outerCleaned.replace(/```$/, "").trim();

    try {
      const parsed = JSON.parse(finalOutput);
      setResponse(parsed);
    } catch (jsonErr) {
      console.error("JSON Parse Error:", jsonErr);
      toast.error("Failed to parse AI response");
    } finally {
      setLoading(false);
    }

  };



  return (
    <div className="flex h-screen">
      <Sidebar  selectedFeature={selectedFeature} />
      <div className="flex-1 p-6 bg-gray-100 dark:bg-black text-black dark:text-white overflow-auto">
        <h1 className="text-2xl text-center md:text-left font-bold mb-4">{typeToName[selectedFeature]}</h1>
        <div className="mb-4">
          <Editor
            height="300px"
            value={inputCode}
            theme="vs-dark"
            onChange={(value) => setInputCode(value || "")}
          />
        </div>
        {(selectedFeature === "convertCode" || selectedFeature === "codeGeneration") && (
          <div className="mb-4">
            <label className="font-medium mr-2">Target Language:</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="px-3 py-1 rounded border bg-white text-black"
            >
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        )}
        <Button onClick={handleSubmit} disabled={loading} className="bg-blue-500">
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Processing...
            </>
          ) : (
            "Submit"
          )}
        </Button>
        <div className="mt-6">
          {response && (
            <FeatureResponseRenderer
              feature={selectedFeature}
              response={response}
              language={targetLang}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;
