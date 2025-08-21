import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { createProject } from "@/api/project";

interface ProjectForm {
  className?: string
}

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Project Name must be at least 2 characters" })
      .max(50, { message: "Project Name must not exceed 50 characters" }),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((data) => data.startDate && data.endDate, {
    message: "Please select both start and end dates",
    path: ["startDate"],
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })

const ProjectForm: React.FC<ProjectForm> = ({className}): React.ReactElement => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: undefined,
      endDate: undefined
    },
  })

   function onSubmit(values: z.infer<typeof formSchema>) {
    createProject(values)
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input {...field} className="border-black" />
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
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea {...field}  className="border-black min-h-0 field-sizing-fixed resize-none" rows={6}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="hover:bg-green-700 bg-green-700 float-right mt-6 cursor-pointer">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export {ProjectForm};
