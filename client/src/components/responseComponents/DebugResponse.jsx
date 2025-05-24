import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function DebugResponse({ response } ) {
  const copyCode = () =>{
    navigator.clipboard.writeText(response.correctedCode);
    toast.success("Code Copy Succesfully...");
    }

  console.log(response.data)
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🐞 Error Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{response.errorSummary}</p>

        <h4 className="font-semibold">❌ Error Explanation</h4>
        <p>{response.errorExplanation}</p>

        <div className="flex justify-between items-center">
          <h4 className="font-semibold">✅ Corrected Code</h4>
          <Button size="sm" variant="outline" onClick={copyCode}>
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
        </div>
        <Editor height="300px" defaultLanguage="javascript" value={response.correctedCode} theme="vs-dark" options={{ readOnly: true }} />

        <h4 className="font-semibold">📘 Code Explanation</h4>
        <p>{response.codeExplanation}</p>

        <h4 className="font-semibold">💡 Best Practices</h4>
        <ul className="list-disc pl-6">
          {response.bestPractices}
          {/* {response.bestPractices[0].map((tip, i) => <li key={i}>{tip}</li>)} */}
        </ul>
      </CardContent>
    </Card>
  );
}

