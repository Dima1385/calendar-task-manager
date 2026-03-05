import { useState, useMemo, useCallback } from "react";
import { getCalendarDays, getWeekDays, formatDate } from "../utils/date.js";
import { CalendarDay } from "../types/index.js";

export type ViewMode = "month" | "week";

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [weekBase, setWeekBase] = useState<Date>(today);

  const days: CalendarDay[] = useMemo(() => {
    if (viewMode === "week") {
      return getWeekDays(weekBase);
    }
    return getCalendarDays(year, month);
  }, [year, month, viewMode, weekBase]);

  const dateRange = useMemo(() => {
    if (days.length === 0) return { startDate: "", endDate: "" };
    return {
      startDate: days[0].date,
      endDate: days[days.length - 1].date,
    };
  }, [days]);

  const title = useMemo(() => {
    if (viewMode === "week" && days.length > 0) {
      const first = new Date(days[0].date + "T00:00:00");
      const last = new Date(days[6].date + "T00:00:00");

      const sameMonth = first.getMonth() === last.getMonth();
      const sameYear = first.getFullYear() === last.getFullYear();

      const fmtMonth = (d: Date) =>
        d.toLocaleString("en-US", { month: "short" });
      const fmtDay = (d: Date) => d.getDate();

      if (sameMonth) {
        return `${fmtMonth(first)} ${fmtDay(first)}–${fmtDay(last)}, ${first.getFullYear()}`;
      }
      if (sameYear) {
        return `${fmtMonth(first)} ${fmtDay(first)} – ${fmtMonth(last)} ${fmtDay(last)}, ${first.getFullYear()}`;
      }
      return `${fmtMonth(first)} ${fmtDay(first)}, ${first.getFullYear()} – ${fmtMonth(last)} ${fmtDay(last)}, ${last.getFullYear()}`;
    }
    return null;
  }, [viewMode, days]);

  const goToPrev = useCallback(() => {
    if (viewMode === "week") {
      setWeekBase((prev) => {
        const d = new Date(prev);
        d.setDate(d.getDate() - 7);
        return d;
      });
    } else {
      setMonth((prev) => {
        if (prev === 0) {
          setYear((y) => y - 1);
          return 11;
        }
        return prev - 1;
      });
    }
  }, [viewMode]);

  const goToNext = useCallback(() => {
    if (viewMode === "week") {
      setWeekBase((prev) => {
        const d = new Date(prev);
        d.setDate(d.getDate() + 7);
        return d;
      });
    } else {
      setMonth((prev) => {
        if (prev === 11) {
          setYear((y) => y + 1);
          return 0;
        }
        return prev + 1;
      });
    }
  }, [viewMode]);

  const goToToday = useCallback(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setWeekBase(now);
  }, []);

  const switchView = useCallback(
    (mode: ViewMode) => {
      if (mode === viewMode) return;
      if (mode === "week") {
        const ref = new Date(year, month, new Date().getDate());
        setWeekBase(ref);
      } else {
        const refDate = new Date(weekBase);
        setYear(refDate.getFullYear());
        setMonth(refDate.getMonth());
      }
      setViewMode(mode);
    },
    [viewMode, year, month, weekBase]
  );

  const currentMonthForHolidays = useMemo(() => {
    if (viewMode === "week") {
      return weekBase.getMonth();
    }
    return month;
  }, [viewMode, weekBase, month]);

  const currentYearForHolidays = useMemo(() => {
    if (viewMode === "week") {
      return weekBase.getFullYear();
    }
    return year;
  }, [viewMode, weekBase, year]);

  return {
    year: currentYearForHolidays,
    month: currentMonthForHolidays,
    days,
    dateRange,
    viewMode,
    title,
    goToPrev,
    goToNext,
    goToToday,
    switchView,
  };
}
