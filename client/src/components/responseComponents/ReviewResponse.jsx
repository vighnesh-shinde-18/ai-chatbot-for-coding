import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewResponse({ response } ) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🔍 Code Review Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{response.reviewSummary}</p>

        <h4 className="font-semibold">🚧 Performance Issues</h4>
        <p>{response.performanceIssues}</p>

        <h4 className="font-semibold">🧾 Readability Suggestions</h4>
        <p>{response.readabilitySuggestions}</p>

        <h4 className="font-semibold">⚙️ Optimization Suggestions</h4>
        <p>{response.optimizationSuggestions}</p>

        <h4 className="font-semibold">💡 Best Practices</h4>
        <ul className="list-disc pl-6">
          {response.bestPractices.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>

        <h4 className="font-semibold">⭐ Code Rating</h4>
        <p>{response.codeRating} / 10</p>
      </CardContent>
    </Card>
  );
}
