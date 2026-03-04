import { useState, useMemo, useCallback } from "react";
import { getCalendarDays } from "../utils/date.js";
import { CalendarDay } from "../types/index.js";

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const days: CalendarDay[] = useMemo(
    () => getCalendarDays(year, month),
    [year, month]
  );

  const dateRange = useMemo(() => {
    if (days.length === 0) return { startDate: "", endDate: "" };
    return {
      startDate: days[0].date,
      endDate: days[days.length - 1].date,
    };
  }, [days]);

  const goToPrevMonth = useCallback(() => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }, []);

  return {
    year,
    month,
    days,
    dateRange,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  };
}
