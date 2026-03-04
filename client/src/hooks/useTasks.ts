import { useState, useEffect, useCallback, useMemo } from "react";
import * as tasksApi from "../api/tasks.js";
import { Task } from "../types/index.js";

export function useTasks(startDate: string, endDate: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    if (!startDate || !endDate) return;
    setLoading(true);
    try {
      const data = await tasksApi.fetchTasks(startDate, endDate);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = useCallback(
    async (title: string, date: string, labels: string[] = []) => {
      try {
        const task = await tasksApi.createTask({ title, date, labels });
        setTasks((prev) => [...prev, task]);
        return task;
      } catch (error) {
        console.error("Failed to create task:", error);
        return null;
      }
    },
    []
  );

  const editTask = useCallback(
    async (
      id: string,
      updates: Partial<Pick<Task, "title" | "date" | "order" | "labels">>
    ) => {
      try {
        const updated = await tasksApi.updateTask(id, updates);
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
        return updated;
      } catch (error) {
        console.error("Failed to update task:", error);
        return null;
      }
    },
    []
  );

  const removeTask = useCallback(async (id: string) => {
    try {
      await tasksApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }, []);

  const reorderTasks = useCallback(
    async (operations: { id: string; date: string; order: number }[]) => {
      setTasks((prev) => {
        const updated = [...prev];
        for (const op of operations) {
          const idx = updated.findIndex((t) => t._id === op.id);
          if (idx !== -1) {
            updated[idx] = { ...updated[idx], date: op.date, order: op.order };
          }
        }
        return updated;
      });

      try {
        await tasksApi.reorderTasks(operations);
      } catch (error) {
        console.error("Failed to reorder tasks:", error);
        loadTasks();
      }
    },
    [loadTasks]
  );

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>();
    const sorted = [...tasks].sort((a, b) => a.order - b.order);
    for (const task of sorted) {
      const list = map.get(task.date);
      if (list) {
        list.push(task);
      } else {
        map.set(task.date, [task]);
      }
    }
    return map;
  }, [tasks]);

  return {
    tasks,
    loading,
    addTask,
    editTask,
    removeTask,
    reorderTasks,
    tasksByDate,
    reload: loadTasks,
  };
}
