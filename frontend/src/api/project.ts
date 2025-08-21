import { format } from "date-fns";
import { apiBase } from "./base";
import { protectedApi } from "./api";

interface CreateProjectResponse {
  data: unknown;
  success: boolean;
  message?: string;
}

interface createProjectProp {
  name: string
  description: string
  startDate: Date
  endDate: Date
}

export const createProject = async (values: createProjectProp): Promise<CreateProjectResponse> => {
  const startDate = format(values.startDate, 'yyyy-MM-dd')
  const endDate = format(values.endDate, 'yyyy-MM-dd')

  const response = await protectedApi(`${apiBase}/api/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...values, startDate, endDate }),
  });

  const data = await response.json();

  console.log(data)
  return data;
}