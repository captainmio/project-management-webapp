import MainMenu from "@/components/menu";
import { IconEdit } from "@tabler/icons-react"
import { Button } from "@/components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Main = () => {


  const projects = [
  {
    id: "INV001",
    name: "Project Alpha",
  },
  {
    id: "INV002",
    name: "Project Beta",
  },
  {
    id: "INV003",
    name: "Project Gamma",
  },
]

  return (
    <>
    <MainMenu />
    <div className="grid grid-cols-1 gap-4 mt-6">
      <div className="bg-gray-200 p-4 rounded-lg shadow-md px-30 pt-10">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-left">Projects</h2> 
          <Button variant="outline" size="sm" className="bg-green-700 hover:bg-green-500 text-white text-right ml-auto">
          <IconEdit /> New Project
        </Button>
        </div>
        <Table className="mt-4">
          <TableCaption>A list of your recent projects.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium"></TableHead>
              <TableHead className="text-center font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="text-left">{project.name}</TableCell>
                <TableCell className="text-center">
                  <Button variant="outline" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <IconEdit /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                    <IconEdit /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    </>
  );
};

export default Main;
