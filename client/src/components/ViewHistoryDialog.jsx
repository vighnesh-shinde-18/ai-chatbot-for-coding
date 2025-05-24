import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import Editor from "@monaco-editor/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import FeatureResponseRenderer from "../components/responseComponents/FeatureResponseRenderer";


const typeToName = {
    codeDebugging: "Debug Code",
    codeReview: "Review Code",
    codeGeneration: "Generate Code",
    explainCode: "Explain Code",
    convertCode: "Convert Code",
    generateTestCases: "Generate Test Cases",
};

export default function ViewHistoryDialog({ open, onClose, itemId }) {
    const [inputCode, setInputCode] = useState("");
    const [response, setResponse] = useState(null);
    const [featureType, setFeatureType] = useState("");

    const handleCopy = () => {
        if (response?.correctedCode) {
            navigator.clipboard.writeText(response.correctedCode);
            toast.success("Copied to clipboard!");
        } else {
            toast.error("Nothing to copy!");
        }
    };

   

    const getInfo = async () => {
        if (!itemId) return;

        setResponse(null);

        try {
            const res = await axios.get(
                `http://localhost:5000/api/ai/conversations/${itemId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const aiOutput = res.data.data.aiOutput;
            const outputStr = typeof aiOutput === "string" ? aiOutput : JSON.stringify(aiOutput);
            const outerCleaned = outputStr.replace(/^```json\n/, "").trim();
            const finalOutput = outerCleaned.replace(/```$/, "").trim();
            const parsed = JSON.parse(finalOutput);

            setResponse(parsed);
            setInputCode(res.data.data.userInput);
            setFeatureType(res.data.data.featureType);

        } catch (err) {
            console.error("Error fetching AI response:", err);
            toast.error("Failed to fetch or parse AI response.");
        }
    };

    useEffect(() => {
        if (open && itemId) {
            getInfo();
        }
    }, [open, itemId]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl sm:min-w-7xl h-[90vh] p-0 overflow-scroll">
                <div className="flex flex-col h-full">
                    <DialogHeader className="p-6 border-b flex items-center justify-between ">
                        <DialogTitle>View History</DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 p-6 overflow-y-auto space-y-6">
                        <h1 className="text-2xl font-bold text-center md:text-left">
                            {typeToName[featureType] || "AI Feature"}
                        </h1>

                        <Editor
                            height="300px"
                            theme="vs-dark"
                            language="javascript"
                            value={inputCode || ""}
                            onChange={(val) => setInputCode(val || "")}
                            options={{
                                minimap: { enabled: false },
                                wordWrap: "on",
                                fontSize: 14,
                            }}
                        />

                        {response && (
                            <div className="mt-6 space-y-4">
                                <FeatureResponseRenderer
                                    feature={featureType}
                                    response={response}
                                />
                                {response.correctedCode && (
                                    <div className="text-right">
                                        <Button onClick={handleCopy} variant="outline">
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copy Output
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}
