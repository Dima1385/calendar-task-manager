import React from "react";
import styled from "styled-components";
import { Task } from "../../types/index.js";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadowHover};
  font-size: 0.78rem;
  font-weight: 500;
  max-width: 180px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  color: ${({ theme }) => theme.colors.text};
  transform: rotate(2deg);
`;

const OverlayLabels = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const OverlayLabel = styled.span<{ $color: string }>`
  width: 36px;
  height: 8px;
  border-radius: 4px;
  background: ${({ $color }) => $color};
  display: block;
`;

interface Props {
  task: Task;
}

export const DragOverlayCard: React.FC<Props> = ({ task }) => (
  <Wrapper>
    {task.labels.length > 0 && (
      <OverlayLabels>
        {task.labels.map((color) => (
          <OverlayLabel key={color} $color={color} />
        ))}
      </OverlayLabels>
    )}
    {task.title}
  </Wrapper>
);
