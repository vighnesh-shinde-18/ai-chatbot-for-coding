import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestCasesResponse({ response } ) {
 console.log(response)
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🧪 Generated Test Cases</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {response.testCases.map((test, i) => (
          <div key={i} className="border rounded-md p-4 bg-muted">
            <h4 className="font-semibold mb-1">✅ {test.description}</h4>
            <p><strong>Input:</strong> {test.input}</p>
            <p><strong>Expected Output:</strong> {test.expectedOutput}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
