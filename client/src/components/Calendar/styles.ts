import styled, { css, keyframes } from "styled-components";

export const CalendarWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
`;

/* ─── Header ─── */

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: 0 2px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const MonthTitle = styled.h1`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  min-width: 200px;
  text-align: center;
  letter-spacing: -0.01em;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  &:active {
    background: ${({ theme }) => theme.colors.surfaceActive};
  }
`;

export const TodayButton = styled.button`
  padding: 7px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;



export const ViewToggle = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

export const ViewToggleButton = styled.button<{ $active: boolean }>`
  padding: 7px 16px;
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  transition: all 0.15s ease;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? "#fff" : theme.colors.textSecondary};

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.text : theme.colors.surfaceHover};
  }
`;

export const CountrySelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}22;
  }
`;

/* ─── Grid ─── */

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.border};
  gap: 1px;
  box-shadow: 0 1px 3px ${({ theme }) => theme.colors.shadow};
`;

export const WeekdayHeader = styled.div`
  background: #f8f9fa;
  padding: 10px ${({ theme }) => theme.spacing.md};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: capitalize;
  text-align: center;
  letter-spacing: 0.02em;
`;

/* ─── Cell ─── */

export const CellContainer = styled.div<{
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $isDragOver: boolean;
  $isWeekView?: boolean;
}>`
  background: ${({ theme, $isCurrentMonth, $isToday, $isDragOver }) => {
    if ($isDragOver) return "#f0f7ff";
    if ($isToday) return theme.colors.todayBg;
    if (!$isCurrentMonth) return "#f8f9fa";
    return theme.colors.surface;
  }};
  min-height: ${({ $isWeekView }) => ($isWeekView ? "180px" : "130px")};
  padding: 6px 8px 8px;
  display: flex;
  flex-direction: column;
  transition: background 0.2s ease;
  position: relative;
  overflow: hidden;

  ${({ $isDragOver }) =>
    $isDragOver &&
    css`
      box-shadow: inset 0 0 0 2px #0079bf44;
    `}
`;

export const DayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  min-height: 24px;
`;

export const DayNumber = styled.span<{
  $isToday: boolean;
  $isCurrentMonth: boolean;
}>`
  font-size: 0.82rem;
  font-weight: ${({ $isToday, $isCurrentMonth }) =>
    $isToday ? 700 : $isCurrentMonth ? 600 : 400};
  color: ${({ theme, $isCurrentMonth, $isToday }) => {
    if ($isToday) return "#fff";
    if (!$isCurrentMonth) return theme.colors.textMuted;
    return theme.colors.text;
  }};
  padding: 1px 6px;
  line-height: 1.5;

  ${({ $isToday, theme }) =>
    $isToday &&
    css`
      background: ${theme.colors.todayAccent};
      color: #fff;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      font-size: 0.78rem;
    `}
`;

export const TaskCount = styled.span`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.cardCountText};
  font-weight: 500;
  white-space: nowrap;
`;

export const TaskList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-height: 10px;
`;

export const AddTaskButton = styled.button`
  width: 100%;
  padding: 4px 6px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 500;
  text-align: left;
  margin-top: auto;
  opacity: 0;
  transition: all 0.15s ease;

  ${CellContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;


const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

export const LoadingBar = styled.div`
  height: 3px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  animation: ${pulse} 1.2s ease-in-out infinite;
`;
