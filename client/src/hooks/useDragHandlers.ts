import { useState, useCallback } from "react";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Task } from "../types/index.js";

interface UseDragHandlersParams {
  tasks: Task[];
  reorderTasks: (
    operations: { id: string; date: string; order: number }[]
  ) => void;
}

function resolveDropTarget(
  event: DragEndEvent,
  tasks: Task[]
): { targetDate: string; overTaskId: string | null } | null {
  const { over } = event;
  if (!over) return null;

  if (over.id.toString().startsWith("droppable-")) {
    return {
      targetDate: over.data.current?.date as string,
      overTaskId: null,
    };
  }

  const overTask = tasks.find((t) => t._id === over.id);
  if (!overTask) return null;

  return { targetDate: overTask.date, overTaskId: overTask._id };
}

function buildReorderOps(
  tasks: Task[],
  draggedTask: Task,
  targetDate: string,
  overTaskId: string | null
): { id: string; date: string; order: number }[] | null {
  const sortByOrder = (a: Task, b: Task) => a.order - b.order;

  const sourceTasks = tasks
    .filter((t) => t.date === draggedTask.date)
    .sort(sortByOrder);

  if (draggedTask.date === targetDate) {
    if (!overTaskId || draggedTask._id === overTaskId) return null;
    const oldIndex = sourceTasks.findIndex((t) => t._id === draggedTask._id);
    const newIndex = sourceTasks.findIndex((t) => t._id === overTaskId);
    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return null;

    return arrayMove(sourceTasks, oldIndex, newIndex).map((t, i) => ({
      id: t._id,
      date: targetDate,
      order: i,
    }));
  }

  const destTasks = tasks
    .filter((t) => t.date === targetDate)
    .sort(sortByOrder);

  const sourceOps = sourceTasks
    .filter((t) => t._id !== draggedTask._id)
    .map((t, i) => ({ id: t._id, date: draggedTask.date, order: i }));

  let insertIndex = destTasks.length;
  if (overTaskId) {
    const idx = destTasks.findIndex((t) => t._id === overTaskId);
    if (idx !== -1) insertIndex = idx;
  }

  const newDest = [...destTasks];
  newDest.splice(insertIndex, 0, draggedTask);
  const destOps = newDest.map((t, i) => ({
    id: t._id,
    date: targetDate,
    order: i,
  }));

  return [...sourceOps, ...destOps];
}

export function useDragHandlers({ tasks, reorderTasks }: UseDragHandlersParams) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const task = tasks.find((t) => t._id === event.active.id);
      setActiveTask(task ?? null);
    },
    [tasks]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null);

      const activeId = event.active.id as string;
      const draggedTask = tasks.find((t) => t._id === activeId);
      if (!draggedTask) return;

      const target = resolveDropTarget(event, tasks);
      if (!target) return;

      const operations = buildReorderOps(
        tasks,
        draggedTask,
        target.targetDate,
        target.overTaskId
      );
      if (operations) reorderTasks(operations);
    },
    [tasks, reorderTasks]
  );

  return { activeTask, handleDragStart, handleDragEnd };
}
