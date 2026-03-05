import { CalendarDay } from "../types/index.js";

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const today = new Date();
  const todayStr = formatDate(today);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days: CalendarDay[] = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const date = new Date(year, month - 1, day);
    days.push({
      date: formatDate(date),
      dayOfMonth: day,
      isCurrentMonth: false,
      isToday: formatDate(date) === todayStr,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push({
      date: formatDate(date),
      dayOfMonth: day,
      isCurrentMonth: true,
      isToday: formatDate(date) === todayStr,
    });
  }

  const remainingCells = 42 - days.length;
  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(year, month + 1, day);
    days.push({
      date: formatDate(date),
      dayOfMonth: day,
      isCurrentMonth: false,
      isToday: formatDate(date) === todayStr,
    });
  }

  return days;
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getMonthName(month: number): string {
  return new Date(2000, month).toLocaleString("en-US", { month: "long" });
}

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getWeekDays(baseDate: Date): CalendarDay[] {
  const today = new Date();
  const todayStr = formatDate(today);

  const dayOfWeek = baseDate.getDay();
  const sunday = new Date(baseDate);
  sunday.setDate(baseDate.getDate() - dayOfWeek);

  const days: CalendarDay[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    days.push({
      date: formatDate(d),
      dayOfMonth: d.getDate(),
      isCurrentMonth: true,
      isToday: formatDate(d) === todayStr,
    });
  }
  return days;
}
