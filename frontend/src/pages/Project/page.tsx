import { columns, type Project } from "./columns"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { IconEdit } from "@tabler/icons-react"
import { PageLayout } from "@/components/page-layout"
import PageSheet from "@/components/page-sheet"
import { ProjectForm } from "./form"

function getData(): Project[] {
  return [
    {
      id: "728ed52f",
      name: "Project Alpha",
      status: "Pending",
    },
    {
      id: "728ed5s2",
      name: "Project Beta",
      status: "Done",
    },
    {
      id: "728ed52f",
      name: "Project Gamma",
      status: "In Progress",
    },
  ]
}

export const Page = () => {
  const data =  getData()

  return (<>
   <PageLayout
      title="Projects"
      actions={
        <>
          <PageSheet
            button={
              <Button variant="outline" size="sm" className="bg-green-700 hover:bg-green-500 text-white text-right ml-auto cursor-pointer">
                <IconEdit /> New Project
              </Button>
            }
            title="Create New Project"
            description="Fill in the details to create a new project."
            >
              <ProjectForm className="mt-4" />
          </PageSheet>
        </>
      }
    >
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <DataTable columns={columns} data={data} filterColumn="name" filterColumnLabel="Name"/>
      </div>
    </PageLayout>
  
  </>);

  // return (

  //   <div className="grid grid-cols-1 gap-4 mt-6">
  //     <div className="bg-gray-100 p-4 rounded-lg shadow-md px-50 pt-10 pb-20">
  //       <div className="flex justify-between items-center mb-8">
  //       <h2 className="text-lg font-semibold text-left">Projects</h2> 
  //         <Sheet>
  //           <SheetTrigger asChild>
  //             <Button variant="outline" size="sm" className="bg-green-700 hover:bg-green-500 text-white text-right ml-auto">
  //               <IconEdit /> New Project
  //             </Button>
  //           </SheetTrigger>
  //           <SheetContent>
  //             <SheetHeader>
  //               <SheetTitle>Are you absolutely sure?</SheetTitle>
  //               <SheetDescription>
  //                 This action cannot be undone. This will permanently delete your account
  //                 and remove your data from our servers.
  //               </SheetDescription>
  //             </SheetHeader>
  //           </SheetContent>
  //         </Sheet>
  //       </div>
  //       <DataTable columns={columns} data={data} />
  //     </div>
  //   </div>
  // )
}

export default Page;
