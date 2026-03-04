import React, { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../types/index.js";
import {
  TaskCardWrapper,
  Labels,
  Label,
  TaskTitle,
  TaskActions,
  ActionButton,
  InlineInput,
  HighlightMark,
} from "./styles.js";

interface Props {
  task: Task;
  searchQuery: string;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);

  if (idx === -1) return text;

  return (
    <>
      {text.slice(0, idx)}
      <HighlightMark>{text.slice(idx, idx + query.length)}</HighlightMark>
      {text.slice(idx + query.length)}
    </>
  );
}

export const TaskCard: React.FC<Props> = ({
  task,
  searchQuery,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const query = searchQuery.toLowerCase();
  const isMatch = !query || task.title.toLowerCase().includes(query);
  const isFiltering = !!query;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== task.title) {
      onEdit(task._id, trimmed);
    }
    setIsEditing(false);
    setEditValue(task.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(task.title);
    }
  };

  if (isEditing) {
    return (
      <InlineInput
        ref={inputRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <TaskCardWrapper
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
      $isMatch={isMatch}
      $isFiltering={isFiltering}
      {...attributes}
      {...listeners}
    >
      {task.labels.length > 0 && (
        <Labels>
          {task.labels.map((color) => (
            <Label key={color} $color={color} />
          ))}
        </Labels>
      )}
      <TaskTitle>
        {isFiltering ? highlightText(task.title, searchQuery) : task.title}
      </TaskTitle>
      <TaskActions>
        <ActionButton onClick={() => setIsEditing(true)} title="Edit">
          &#9998;
        </ActionButton>
        <ActionButton onClick={() => onDelete(task._id)} title="Delete">
          &times;
        </ActionButton>
      </TaskActions>
    </TaskCardWrapper>
  );
};
