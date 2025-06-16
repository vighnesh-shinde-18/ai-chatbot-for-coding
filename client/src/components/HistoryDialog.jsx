import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import ViewHistoryDialog from "./ViewHistoryDialog";

const typeToName = {
  codeDebugging: "Debug Code",
  codeReview: "Review Code",
  codeGeneration: "Generate Code",
  explainCode: "Explain Code",
  convertCode: "Convert Code",
  generateTestCases: "Generate Test Cases",
};

export default function HistoryDialog({ open, setOpen }) {
  const [interactions, setInteractions] = useState([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const AI_INTERACTIONS_URL = `${BASE_URL}/api/ai/interactions`;

  const fetchInteraction = async () => {
    try {
      const res = await fetch(AI_INTERACTIONS_URL, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) return data.data;
    } catch (err) {
      console.error("Error fetching interaction:", err);
    }
    return [];
  };

  const handleView = (item) => {
    setSelectedId(item._id);
    setViewDialogOpen(true);
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(AI_INTERACTIONS_URL, {
        withCredentials: true,
      });
      toast.success("All history deleted!");
      const updated = await fetchInteraction();
      setInteractions(updated);
    } catch (error) {
      console.error("Error deleting all history:", error);
      toast.error("Failed to delete history.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${AI_INTERACTIONS_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Deleted history entry");
        const updated = await fetchInteraction();
        setInteractions(updated);
      }
    } catch (err) {
      console.error("Error deleting conversation:", err);
      toast.error("Failed to delete entry.");
    }
  };

  useEffect(() => {
    if (open) {
      fetchInteraction().then(setInteractions);
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-4xl px-2 sm:px-6 py-4">
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
                  <TableHead>Feature</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interactions.map((item) => {
                  const aiOutput = item.aiOutput || {};
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{typeToName[item.featureType] || "Unknown"}</TableCell>
                      <TableCell className="truncate">
                        {aiOutput.title || "No title"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item.createdAt?.slice(0, 10) || "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
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
              <Trash className="w-4 h-4" /> Delete All
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
