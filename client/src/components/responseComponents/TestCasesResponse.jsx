import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestCasesResponse({ response }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🧪 {response?.title || "Generated Test Cases"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {response?.testCases?.map((test, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 bg-muted/50 shadow-sm transition-all hover:shadow-md"
          >
            <h4 className="font-semibold text-primary mb-2">✅ {test.description}</h4>
            <div className="text-sm md:text-base space-y-2 text-muted-foreground">
              <div>
                <strong>Input:</strong>
                <pre className="bg-background p-2 rounded mt-1 overflow-x-auto text-xs md:text-sm">
                  {JSON.stringify(test.input, null, 2)}
                </pre>
              </div>
              <div>
                <strong>Expected Output:</strong>
                <pre className="bg-background p-2 rounded mt-1 overflow-x-auto text-xs md:text-sm">
                  {JSON.stringify(test.expectedOutput, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
