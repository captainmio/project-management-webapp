import { type ColumnDef } from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"


export type Project = {
  id: string
  status: "Pending" | "In Progress" | "Done"
  name: string
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      const status: string = row.getValue("status")
      
      let badgeCss: string = 'default'
      switch (status.toLocaleLowerCase()) {
        case 'pending':
            badgeCss = "bg-yellow-300 text-black-800"
          break;
        case 'in progress':
            badgeCss = "bg-orange-400 text-black-800"
          break;
        case 'done':
            badgeCss = "bg-green-500 text-black-800"
          break;
        default:
            badgeCss = "default text-white-800"
          break;
      }
      return (<Badge variant={'default'} className={badgeCss}>{status}</Badge>)
    }
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="mt-3">
          Action
        </div>
      )
    },
    cell: () => {
      return (
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="data-[highlighted]:bg-blue-400 data-[highlighted]:text-white">Edit</DropdownMenuItem>
              <DropdownMenuItem className="data-[highlighted]:bg-red-400 data-[highlighted]:text-white">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    meta: {
      className: "flex justify-end w-[10px] text-right",
    },
  },
]