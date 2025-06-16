import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function GenerateResponse({ response }) {
  const copyCode = () => {
    navigator.clipboard.writeText(response.generatedCode);
    toast.success("Code copied successfully!");
  };

  return (
    <Card className="w-full max-h-[80vh] overflow-y-auto">
      <CardHeader>
        <CardTitle>⚒️ Generated Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm leading-relaxed">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-lg">📄 Code</h4>
          <Button size="sm" variant="outline" onClick={copyCode}>
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
        </div>
        <Editor
          height="300px"
          defaultLanguage="javascript"
          value={response.generatedCode}
          theme="vs-dark"
          options={{ readOnly: true, minimap: { enabled: false } }}
        />

        <section>
          <h4 className="font-semibold text-lg mb-1">📘 Code Explanation</h4>
          <p className="whitespace-pre-wrap">{response?.codeExplanation || "No explanation available."}</p>
        </section>

        <section>
          <h4 className="font-semibold text-lg mb-1">🔑 Important Steps</h4>
          <ul className="list-disc pl-6 space-y-1">
            {response?.importantSteps?.length > 0 ? (
              response.importantSteps.map((step, i) => <li key={i}>{step}</li>)
            ) : (
              <li>No important steps found.</li>
            )}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
