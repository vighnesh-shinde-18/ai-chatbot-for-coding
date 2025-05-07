import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExplainResponse({ response } ) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>📖 Code Explanation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h4 className="font-semibold">📝 Summary</h4>
        <p>{response.summary}</p>

        <h4 className="font-semibold">📄 Line-by-Line Explanation</h4>
        <p>{response.lineByLineExplanation}</p>

        <h4 className="font-semibold">🔧 Important Functions</h4>
        <ul className="list-disc pl-6">
          {response.importantFunctions.map((fn, i) => <li key={i}>{fn}</li>)}
        </ul>

        <h4 className="font-semibold">🔁 Control Flow</h4>
        <p>{response.controlFlow}</p>

        <h4 className="font-semibold">⚠️ Edge Cases</h4>
        <ul className="list-disc pl-6">
          {response.edgeCases.map((ec, i) => <li key={i}>{ec}</li>)}
        </ul>
      </CardContent>
    </Card>
  );
}
