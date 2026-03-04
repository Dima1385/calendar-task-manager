import styled from "styled-components";

export const HolidayBadgeWrapper = styled.div<{ $expanded: boolean }>`
  font-size: 0.67rem;
  color: ${({ theme }) => theme.colors.holidayText};
  font-weight: 600;
  padding: 2px 6px;
  background: ${({ theme }) => theme.colors.holidayBg};
  border-radius: 4px;
  margin-bottom: 3px;
  line-height: 1.3;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;

  ${({ $expanded }) =>
    $expanded
      ? `
        white-space: normal;
        word-break: break-word;
        z-index: 10;
        position: relative;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      `
      : `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `}

  &:hover {
    filter: brightness(0.95);
  }
`;
