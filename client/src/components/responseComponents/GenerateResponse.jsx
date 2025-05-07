import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function GenerateResponse({ response } ) {
  const copyCode = () => navigator.clipboard.writeText(response.generatedCode);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>⚒️ Generated Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">📄 Code</h4>
          <Button size="sm" variant="outline" onClick={copyCode}>
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
        </div>
        <Editor height="300px" defaultLanguage="javascript" value={response.generatedCode} theme="vs-dark" options={{ readOnly: true }} />

        <h4 className="font-semibold">📘 Code Explanation</h4>
        <p>{response.codeExplanation}</p>

        <h4 className="font-semibold">🔑 Important Steps</h4>
        <ul className="list-disc pl-6">
          {response.importantSteps.map((step, i) => <li key={i}>{step}</li>)}
        </ul>
      </CardContent>
    </Card>
  );
}
