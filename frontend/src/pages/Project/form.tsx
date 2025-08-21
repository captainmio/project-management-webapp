import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea";

interface ProjectForm {
  className?: string
}

const formSchema = z.object({
    name: z.string().min(2, {
      message: "project name must be at least 2 characters"
    }).max(50),
    description: z.string()
})

const ProjectForm: React.FC<ProjectForm> = ({className}): React.ReactElement => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: ""
    },
  })

  return (
    <div className={className}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input {...field} className="border-black"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-4">Project Description</FormLabel>
              <FormControl>
                <Textarea {...field}  className="border-black min-h-0 field-sizing-fixed resize-none" rows={6}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export {ProjectForm};
