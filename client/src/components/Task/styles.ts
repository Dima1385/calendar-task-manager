import styled, { css } from "styled-components";

export const TaskCardWrapper = styled.div<{
  $isDragging: boolean;
  $isMatch: boolean;
  $isFiltering: boolean;
}>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 6px 8px;
  cursor: grab;
  border: 1px solid transparent;
  box-shadow: 0 1px 2px ${({ theme }) => theme.colors.shadow};
  transition: all 0.2s ease;
  position: relative;

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      opacity: 0.4;
    `}

  ${({ $isFiltering, $isMatch, theme }) =>
    $isFiltering &&
    ($isMatch
      ? css`
          border-color: ${theme.colors.primary};
          box-shadow: 0 0 0 1px ${theme.colors.primary},
            0 2px 8px ${theme.colors.primary}33;
        `
      : css`
          opacity: 0.15;
          pointer-events: none;
          filter: grayscale(100%);
        `)}

  &:hover {
    box-shadow: 0 2px 6px ${({ theme }) => theme.colors.shadowHover};
    border-color: ${({ theme }) => theme.colors.borderLight};
  }

  &:active {
    cursor: grabbing;
  }
`;

export const Labels = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

export const Label = styled.span<{ $color: string }>`
  width: 36px;
  height: 8px;
  border-radius: 4px;
  background: ${({ $color }) => $color};
  display: block;
`;

export const TaskTitle = styled.span`
  font-size: 0.78rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;
  display: block;
  padding-right: 16px;
`;

export const HighlightMark = styled.mark`
  background: #fff3b0;
  color: inherit;
  border-radius: 2px;
  padding: 0 1px;
`;

export const TaskActions = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  display: none;
  gap: 2px;

  ${TaskCardWrapper}:hover & {
    display: flex;
  }
`;

export const ActionButton = styled.button`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceHover};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  padding: 0;
  transition: all 0.1s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceActive};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const InlineInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.78rem;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const LabelPicker = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  padding: 6px 0 2px;
`;

export const LabelOption = styled.button<{
  $color: string;
  $selected: boolean;
}>`
  width: 28px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid
    ${({ $selected, $color }) => ($selected ? $color : "transparent")};
  background: ${({ $color }) => $color};
  opacity: ${({ $selected }) => ($selected ? 1 : 0.4)};
  transition: all 0.1s ease;
  outline-offset: 1px;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

export const FormWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 6px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const FormHint = styled.p`
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
  line-height: 1.3;
`;
