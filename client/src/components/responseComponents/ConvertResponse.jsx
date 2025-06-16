import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function ConvertResponse({ response, targetLanguage }) {
  const copyCode = () => {
    navigator.clipboard.writeText(response.convertedCode);
    toast.success("Code copied successfully!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{response.title || "🌐 Code Conversion"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">🔁 Converted Code</h4>
          <Button size="sm" variant="outline" onClick={copyCode}>
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
        </div>

        <Editor
          height="300px"
          defaultLanguage={targetLanguage}
          value={response.convertedCode}
          theme="vs-dark"
          options={{ readOnly: true }}
        />

        <h4 className="font-semibold">📓 Conversion Notes</h4>
        <p>{response.conversionNotes}</p>

        <h4 className="font-semibold">💡 Language Tips</h4>
        <ul className="list-disc pl-6">
          {response.languageTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
