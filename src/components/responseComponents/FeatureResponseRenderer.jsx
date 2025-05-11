// src/components/aiResponses/FeatureResponseRenderer.tsx
import DebugResponse from "./DebugResponse";
import ReviewResponse from "./ReviewResponse";
import GenerateResponse from "./GenerateResponse";
import ExplainResponse from "./ExplainResponse";
import ConvertResponse from "./ConvertResponse";
import TestCasesResponse from "./TestCasesResponse";

 
export default function FeatureResponseRenderer({ feature, response, language }) {
  if (!response) return null;

  switch (feature) {
    case "codeDebugging":
      return <DebugResponse response={response} />;
    case "codeReview":
      return <ReviewResponse response={response} />;
    case "codeGeneration":
      return <GenerateResponse response={response} />;
    case "explainCode":
      return <ExplainResponse response={response} />;
    case "convertCode":
      return <ConvertResponse response={response} targetLanguage={language || "python"} />;
    case "generateTestCases":
      return <TestCasesResponse response={response} />;
    default:
      return <p className="text-sm text-muted-foreground">Unknown feature selected.</p>;
  }
}
