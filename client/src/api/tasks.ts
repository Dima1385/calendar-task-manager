import axios from "axios";
import { Task } from "../types/index.js";

const api = axios.create({ baseURL: "/api/tasks" });

export async function fetchTasks(
  startDate: string,
  endDate: string
): Promise<Task[]> {
  const { data } = await api.get<Task[]>("/", {
    params: { startDate, endDate },
  });
  return data;
}

export async function createTask(
  task: Pick<Task, "title" | "date" | "labels">
): Promise<Task> {
  const { data } = await api.post<Task>("/", task);
  return data;
}

export async function updateTask(
  id: string,
  updates: Partial<Pick<Task, "title" | "date" | "order" | "labels">>
): Promise<Task> {
  const { data } = await api.put<Task>(`/${id}`, updates);
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/${id}`);
}

export async function reorderTasks(
  operations: { id: string; date: string; order: number }[]
): Promise<void> {
  await api.patch("/reorder", { operations });
}
