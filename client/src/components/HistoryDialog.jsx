// import { ColumnDef } from "@tanstack/react-table"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { MoreHorizontal } from "lucide-react"

// export const columns: ColumnDef<AIHistory>[] = [
//   {
//     accessorKey: "feature",
//     header: "Feature",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("feature")}</div>,
//   },
//   {
//     accessorKey: "prompt",
//     header: "Prompt",
//     cell: ({ row }) => (
//       <div className="line-clamp-2 max-w-[300px]">{row.getValue("prompt")}</div>
//     ),
//   },
//   {
//     accessorKey: "response",
//     header: "Response",
//     cell: ({ row }) => (
//       <div className="line-clamp-2 max-w-[300px]">{row.getValue("response")}</div>
//     ),
//   },
//   {
//     accessorKey: "date",
//     header: "Date",
//     cell: ({ row }) => <div className="text-muted-foreground text-sm">{row.getValue("date")}</div>,
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const history = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={() => alert(`Show ${history.id}`)}>Show</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => alert(`Delete ${history.id}`)}>Delete</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]
