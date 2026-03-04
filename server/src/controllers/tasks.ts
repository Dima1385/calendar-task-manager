import { Request, Response } from "express";
import { Task } from "../models/Task.js";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export async function getTasks(req: Request, res: Response) {
  try {
    const { startDate, endDate } = req.query;
    const filter: Record<string, unknown> = {};

    if (
      typeof startDate === "string" &&
      typeof endDate === "string" &&
      DATE_REGEX.test(startDate) &&
      DATE_REGEX.test(endDate)
    ) {
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const tasks = await Task.find(filter).sort({ date: 1, order: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const { title, date, labels } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      res.status(400).json({ message: "Title is required" });
      return;
    }
    if (!date || typeof date !== "string" || !DATE_REGEX.test(date)) {
      res.status(400).json({ message: "Valid date (YYYY-MM-DD) is required" });
      return;
    }

    const sanitizedLabels = Array.isArray(labels)
      ? labels.filter((l): l is string => typeof l === "string")
      : [];

    const maxOrderTask = await Task.findOne({ date }).sort({ order: -1 });
    const order = maxOrderTask ? maxOrderTask.order + 1 : 0;

    const task = await Task.create({
      title: title.trim(),
      date,
      order,
      labels: sanitizedLabels,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
}

const ALLOWED_UPDATE_FIELDS = ["title", "date", "order", "labels"] as const;

export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updates: Record<string, unknown> = {};
    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (field in req.body) {
        updates[field] = req.body[field];
      }
    }

    if ("title" in updates) {
      if (typeof updates.title !== "string" || !(updates.title as string).trim()) {
        res.status(400).json({ message: "Title cannot be empty" });
        return;
      }
      updates.title = (updates.title as string).trim();
    }
    if ("date" in updates) {
      if (typeof updates.date !== "string" || !DATE_REGEX.test(updates.date as string)) {
        res.status(400).json({ message: "Valid date (YYYY-MM-DD) is required" });
        return;
      }
    }

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
}

export async function reorderTasks(req: Request, res: Response) {
  try {
    const { operations } = req.body;

    if (!Array.isArray(operations) || operations.length === 0) {
      res.status(400).json({ message: "Operations array is required" });
      return;
    }

    const bulkOps = operations.map(
      (op: { id: string; date: string; order: number }) => ({
        updateOne: {
          filter: { _id: op.id },
          update: { $set: { date: op.date, order: op.order } },
        },
      })
    );

    await Task.bulkWrite(bulkOps);

    res.json({ message: "Tasks reordered" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reorder tasks", error });
  }
}
