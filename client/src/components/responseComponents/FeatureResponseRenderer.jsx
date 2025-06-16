import DebugResponse from "./DebugResponse";
import ReviewResponse from "./ReviewResponse";
import GenerateResponse from "./GenerateResponse";
import ExplainResponse from "./ExplainResponse";
import ConvertResponse from "./ConvertResponse";
import TestCasesResponse from "./TestCasesResponse";

export default function FeatureResponseRenderer({ feature, response, language }) {
  if (!response) return null;

  const renderComponent = () => {
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
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
      {response.error ? (
        <p className="text-red-600 font-medium">Error: {response.error}</p>
      ) : (
        renderComponent()
      )}
    </div>
  );
}
