import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "styled-components";
import {
  FormWrapper,
  InlineInput,
  LabelPicker,
  LabelOption,
  FormHint,
} from "./styles.js";

interface Props {
  onSubmit: (title: string, labels: string[]) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const toggleLabel = (color: string) => {
    setSelectedLabels((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (trimmed) {
      onSubmit(trimmed, selectedLabels);
    }
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onCancel();
  };

  return (
    <FormWrapper>
      <InlineInput
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSubmit}
        placeholder="Enter a title..."
      />
      <LabelPicker onMouseDown={(e) => e.preventDefault()}>
        {theme.labels.map((color) => (
          <LabelOption
            key={color}
            $color={color}
            $selected={selectedLabels.includes(color)}
            onClick={() => toggleLabel(color)}
            type="button"
          />
        ))}
      </LabelPicker>
      <FormHint>Enter to save &middot; Esc to cancel</FormHint>
    </FormWrapper>
  );
};
