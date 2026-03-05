import React, { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CalendarDay, Task, Holiday } from "../../types/index.js";
import { TaskCard } from "../Task/TaskCard.js";
import { TaskForm } from "../Task/TaskForm.js";
import { HolidayBadge } from "../Holiday/HolidayBadge.js";
import {
  CellContainer,
  DayHeader,
  DayNumber,
  TaskCount,
  TaskList,
  AddTaskButton,
} from "./styles.js";

interface Props {
  day: CalendarDay;
  tasks: Task[];
  holidays: Holiday[];
  searchQuery: string;
  isWeekView?: boolean;
  onAddTask: (title: string, date: string, labels: string[]) => void;
  onEditTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

export const CalendarCell: React.FC<Props> = ({
  day,
  tasks,
  holidays,
  searchQuery,
  isWeekView = false,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-${day.date}`,
    data: { date: day.date },
  });

  const taskIds = tasks.map((t) => t._id);

  const handleAddTask = (title: string, labels: string[]) => {
    onAddTask(title, day.date, labels);
  };

  const showMonthPrefix = !day.isCurrentMonth || day.dayOfMonth === 1;
  const monthShort = new Date(day.date + "T00:00:00").toLocaleString("en-US", {
    month: "short",
  });
  const dayLabel = showMonthPrefix
    ? `${monthShort} ${day.dayOfMonth}`
    : `${day.dayOfMonth}`;

  return (
    <CellContainer
      ref={setNodeRef}
      $isCurrentMonth={day.isCurrentMonth}
      $isToday={day.isToday}
      $isDragOver={isOver}
      $isWeekView={isWeekView}
    >
      <DayHeader>
        <DayNumber $isToday={day.isToday} $isCurrentMonth={day.isCurrentMonth}>
          {dayLabel}
        </DayNumber>
        {tasks.length > 0 && (
          <TaskCount>
            {tasks.length} card{tasks.length !== 1 ? "s" : ""}
          </TaskCount>
        )}
      </DayHeader>

      {holidays.map((h) => (
        <HolidayBadge key={h.name} holiday={h} />
      ))}

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <TaskList>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              searchQuery={searchQuery}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </TaskList>
      </SortableContext>

      {isAddingTask ? (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setIsAddingTask(false)}
        />
      ) : (
        <AddTaskButton onClick={() => setIsAddingTask(true)}>
          + Add card
        </AddTaskButton>
      )}
    </CellContainer>
  );
};
