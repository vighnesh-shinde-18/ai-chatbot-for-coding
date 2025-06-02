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
import { MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import ViewHistoryDialog from "./ViewHistoryDialog";


const typeToName = {
  "codeDebugging": "Debug Code",
  "codeReview": "Review Code",
  "codeGeneration": "Generate Code",
  "explainCode": "Explain Code",
  "convertCode": "Convert Code",
  "generateTestCases": "Generate Test Cases"
};

export default function HistoryDialog({ open, setOpen }) {
  const [conversations, setConversations] = useState([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const AI_CONVERSATIONS_URL = `${BASE_URL}/api/ai/conversations`;

  const fetchConversations = async () => {
    try {
      const res = await fetch(AI_CONVERSATIONS_URL, {
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


  const handleView = (item) => {
    setSelectedId(item._id);
    setViewDialogOpen(true);
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(AI_CONVERSATIONS_URL, {
        withCredentials: true,
      });
      toast.success("All history deleted!");
      const updatedConversations = await fetchConversations();
      setConversations(updatedConversations);
    } catch (error) {
      console.error("Error deleting all history:", error);
      toast.error("Failed to delete history.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${AI_CONVERSATIONS_URL}/${id}`, {
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
        <DialogContent className=" w-full max-w-[95vw] sm:max-w-4xl px-2 sm:px-6 py-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Feature History</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              View and manage your previous feature conversations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-x-auto max-h-[60vh] mt-2 sm:mt-4">
            <Table className="min-w-[600px] sm:min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap text-xs sm:text-sm max-w-7 sm:max-w-10">Feature</TableHead>
                  <TableHead className="whitespace-nowrap text-xs sm:text-sm max-w-14 sm:max-w-20">Title</TableHead>
                  <TableHead className="whitespace-nowrap text-xs sm:text-sm hidden sm:max-w-20 sm:table-cell">Date</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm sm:max-w-1">Actions</TableHead>
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
                      <TableCell className="text-xs sm:text-sm max-w-7 sm:max-w-10">
                        {typeToName[item.featureType]}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm truncate max-w-14 sm:max-w-10">
                        {parsedData.title || "No title found"}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden max-w-14 sm:max-w-5 sm:table-cell">
                        {item.createdAt?.slice(0, 10)}
                      </TableCell>
                      <TableCell className="text-right m-0 max-w-0.5">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-1 h-8">
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

          <div className="flex justify-end mt-4">
            <Button
              onClick={handleDeleteAll}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash className="w-4 h-4" />
              Delete All
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ViewHistoryDialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)} 
        itemId={selectedId} 
      />
    </>
  );
}