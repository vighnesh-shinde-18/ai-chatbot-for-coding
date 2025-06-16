import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExplainResponse({ response }) {
  return (
    <Card className="w-full max-h-[80vh] overflow-y-auto">
      <CardHeader>
        <CardTitle>📖 Code Explanation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm leading-relaxed">
        <section>
          <h4 className="font-semibold text-lg mb-1">📝 Summary</h4>
          <p className="whitespace-pre-wrap">{response?.summary || "No summary available."}</p>
        </section>

        <section>
          <h4 className="font-semibold text-lg mb-1">📄 Line-by-Line Explanation</h4>
          <p className="whitespace-pre-wrap">{response?.lineByLineExplanation || "No explanation provided."}</p>
        </section>

        <section>
          <h4 className="font-semibold text-lg mb-1">🔧 Important Functions</h4>
          <ul className="list-disc pl-6 space-y-1">
            {response?.importantFunctions?.length > 0 ? (
              response.importantFunctions.map((fn, i) => <li key={i}>{fn}</li>)
            ) : (
              <li>No important functions mentioned.</li>
            )}
          </ul>
        </section>

        <section>
          <h4 className="font-semibold text-lg mb-1">🔁 Control Flow</h4>
          <p className="whitespace-pre-wrap">{response?.controlFlow || "No control flow analysis."}</p>
        </section>

        <section>
          <h4 className="font-semibold text-lg mb-1">⚠️ Edge Cases</h4>
          <ul className="list-disc pl-6 space-y-1">
            {response?.edgeCases?.length > 0 ? (
              response.edgeCases.map((ec, i) => <li key={i}>{ec}</li>)
            ) : (
              <li>No edge cases mentioned.</li>
            )}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
