import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import FeatureResponseRenderer from "./responseComponents/FeatureResponseRenderer";

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

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const AI_INTERACTIONS_URL = `${BASE_URL}/api/ai/interactions`;

    const getInfo = async () => {
        if (!itemId) return;

        setResponse(null);
        try {
            const res = await axios.get(`${AI_INTERACTIONS_URL}/${itemId}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            const { userInput, aiOutput, featureType } = res.data.data;
            setInputCode(userInput);
            setResponse(aiOutput);
            setFeatureType(featureType);
        } catch (err) {
            console.error("Error fetching AI response:", err);
            toast.error("Failed to fetch AI response.");
        }
    };

    useEffect(() => {
        if (open && itemId) {
            getInfo();
        }
    }, [open, itemId]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="w-full max-w-[95vw] sm:max-w-3xl lg:min-w-5xl h-[90vh] p-0 overflow-scroll"
            >
                <div className="flex flex-col h-full"> 
                    <DialogHeader className="p-4 sm:p-6 border-b">
                        <DialogTitle className="text-lg sm:text-xl md:text-2xl">
                            View History
                        </DialogTitle>
                    </DialogHeader>
 
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-6">
                        {/* Feature Type */}
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <h2 className="text-base sm:text-lg font-semibold text-primary">
                                {typeToName[featureType] || "AI Feature"}
                            </h2>
                        </div>

                        {/* User Prompt */}
                        <div>
                            <p className="text-sm font-medium mb-2 text-muted-foreground">
                                User Prompt
                            </p>
                            <div className="border rounded-md p-4 bg-muted text-sm whitespace-pre-wrap">
                                {inputCode}
                            </div>
                        </div>

                        {/* AI Output */}
                        <FeatureResponseRenderer feature={featureType} response={response} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
