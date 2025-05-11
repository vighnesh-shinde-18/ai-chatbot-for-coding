import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import FeaturePage from "./FeaturePage";

const fetchConversations = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/ai/conversations/', {
            method: 'GET',
            credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
            return data.data;
        }
    } catch (err) {
        console.error('Error fetching conversations:', err);
    }
    return [];
};

const typeToName = {
    "codeDebugging": "Debug Code",
    "codeReview": "Review Code",
    "codeGeneration": "Generate Code",
    "explainCode": "Explain Code",
    "convertCode": "Convert Code",
    "generateTestCases": "Generate Test Cases"
}

export default function HistoryDialog({ open, setOpen }) {
    const [conversations, setConversations] = useState([]);

    const handleView = (item) => {
     console.log(item)
    };
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/ai/conversations/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Deleted history entry");

                const updatedConversations = await fetchConversations();
                setConversations(updatedConversations);
            }
        } catch (err) {
            console.error('Error deleting conversation:', err);
        }
    };

    useEffect(() => {
        const loadConversations = async () => {
            const data = await fetchConversations();
            setConversations(data);
        };
        if (open) {
            loadConversations();
        }
    }, [open]);

    return (
        <Dialog open={open} className="mx-5" onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl sm:min-w-4xl">
                <DialogHeader>
                    <DialogTitle>Feature History</DialogTitle>
                    <DialogDescription>
                        View and manage your previous feature conversations.
                    </DialogDescription>
                </DialogHeader>

                <div className="overflow-auto max-h-[400px]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Feature</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {conversations.map((item) => {
                                let parsedData = {};
                                try {
                                    const rawOutputStr = item.aiOutput || "";
                                    const outerCleaned = rawOutputStr
                                        .replace(/^```json\n?/, "")
                                        .trim();

                                    const finalOutput = outerCleaned.replace(/```$/, "").trim();
                                    parsedData = JSON.parse(finalOutput);
                                } catch (err) {
                                    console.error("Error parsing AI output:", err);
                                }

                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>{typeToName[item.featureType]}</TableCell>
                                        <TableCell>{parsedData.title || "No title found"}</TableCell>
                                        <TableCell>{item.createdAt?.slice(0, 10)}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="p-1 h-8 w-8">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleView(item)}>
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(item._id)}>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
}
