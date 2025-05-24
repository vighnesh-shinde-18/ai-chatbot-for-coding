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
import ViewHistoryDialog from "./ViewHistoryDialog";
import { Trash } from "lucide-react";

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



// const handleCloseView = () => {
//     setViewDialogOpen(false);
//     setSelectedId(null); // Cleanup
// };
export default function HistoryDialog({ open, setOpen }) {
    const [conversations, setConversations] = useState([]);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


    const handleView = (item) => {
        setSelectedId(item._id); // set the selected item's ID
        setViewDialogOpen(true);
    };


    const handleDeleteAll = async () => {
        try {
            await axios.delete("http://localhost:5000/api/ai/conversations/", {
                withCredentials: true,
            });
            toast.success("All history deleted!");
            onClose(); // Close the dialog after deletion
        } catch (error) {
            console.error("Error deleting all history:", error);
            toast.error("Failed to delete history.");
        }
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
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-full max-w-6xl sm:max-w-4xl px-4 sm:px-6 py-6">
                    <DialogHeader >
                        <DialogTitle className="text-lg sm:text-xl">Feature History</DialogTitle>
                        <DialogDescription className="text-sm sm:text-base">
                            View and manage your previous feature conversations.
                        </DialogDescription>

                    </DialogHeader>
                    <div className="overflow-x-auto max-h-[60vh] mt-4">

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="whitespace-nowrap text-xs sm:text-sm">Feature</TableHead>
                                    <TableHead className="whitespace-nowrap text-xs sm:text-sm">Title</TableHead>
                                    <TableHead className="whitespace-nowrap hidden sm:flex text-xs sm:text-sm">Date</TableHead>
                                    <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {conversations.map((item) => {
                                    let parsedData = {};
                                    try {
                                        const rawOutputStr = item.aiOutput || "";
                                        const outerCleaned = rawOutputStr.replace(/^```json\n?/, "").trim();
                                        const finalOutput = outerCleaned.replace(/```$/, "").trim();
                                        parsedData = JSON.parse(finalOutput);
                                    } catch (err) {
                                        console.error("Error parsing AI output:", err);
                                    }

                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell className="text-xs sm:text-sm">{typeToName[item.featureType]}</TableCell>
                                            <TableCell className="text-xs sm:text-sm truncate max-w-[150px] sm:max-w-[300px]">
                                                {parsedData.title || "No title found"}
                                            </TableCell>
                                            <TableCell className="text-xs hidden sm:flex sm:text-sm">{item.createdAt?.slice(0, 10)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="p-1 h-8 w-8">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleView(item)}>View</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(item._id)}>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                <Button
                                    onClick={handleDeleteAll}
                                    variant="destructive"
                                    className="flex items-center gap-2 my-5"
                                >
                                    <Trash className="w-4 h-4" />
                                    Delete All
                                </Button>
                            </TableBody>

                        </Table>
                    </div>
                </DialogContent>
            </Dialog>

            <ViewHistoryDialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} itemId={selectedId} />

        </>
    );
}
// onClose={handleCloseView}
