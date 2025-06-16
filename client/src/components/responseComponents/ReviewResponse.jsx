"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";

export default function ReviewResponse({ response }) {

  

  const copyToClipboard = async (code, label) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(`${label} copied to clipboard!`);
    } catch (error) {
      toast.error(`Failed to copy ${label}`);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🔍 Code Review Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm md:text-base">
        <Section title="📝 Summary" content={response?.reviewSummary} />
        <Section title="🚧 Performance Issues" content={response?.performanceIssues} />
        <Section title="🧾 Readability Suggestions" content={response?.readabilitySuggestions} />
        <Section title="⚙️ Optimization Suggestions" content={response?.optimizationSuggestions} />

        <div>
          <h4 className="font-semibold text-primary">💡 Best Practices</h4>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            {response?.bestPractices?.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-primary">⭐ Code Rating</h4>
          <p className="text-muted-foreground">{response?.codeRating} / 10</p>
        </div>

        <Separator />

        {/* Code Sections */}
        <CodeBlock
          title="📜 Original Code"
          code={response?.oldCode}
          label="Original Code"
          onCopy={copyToClipboard}
        />

        <CodeBlock
          title="✅ Optimized Code"
          code={response?.optimizedCode}
          label="Optimized Code"
          onCopy={copyToClipboard}
        />

        {/* Complexity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-primary">📊 Time Complexity</h4>
            <p className="text-muted-foreground">
              <strong>Old:</strong> {response?.oldTimeComplexity}<br />
              <strong>New:</strong> {response?.newTimeComplexity}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary">📦 Space Complexity</h4>
            <p className="text-muted-foreground">
              <strong>Old:</strong> {response?.oldSpaceComplexity}<br />
              <strong>New:</strong> {response?.newSpaceComplexity}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Reusable Section
const Section = ({ title, content }) => (
  <div>
    <h4 className="font-semibold text-primary">{title}</h4>
    <p className="text-muted-foreground">{content}</p>
  </div>
);

// CodeBlock Component with Monaco Editor + Copy Button
const CodeBlock = ({ title, code, label, language = "cpp", onCopy }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-semibold text-primary">{title}</h4>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => onCopy(code, label)}
      >
        <Copy className="w-4 h-4" /> Copy
      </Button>
    </div>
    <ScrollArea className="max-h-[300px] border rounded-md bg-muted">
      <Editor
        height="300px"
        defaultLanguage={language}
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </ScrollArea>
  </div>
);
