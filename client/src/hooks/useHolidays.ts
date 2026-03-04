import { useState, useEffect, useCallback, useRef } from "react";
import { fetchHolidays } from "../api/holidays.js";
import { Holiday } from "../types/index.js";

export function useHolidays(
  year: number,
  month: number,
  countryCode: string
) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const cacheRef = useRef<Map<string, Holiday[]>>(new Map());

  useEffect(() => {
    if (!countryCode) return;

    const yearsToFetch = new Set<number>([year]);
    if (month === 0) yearsToFetch.add(year - 1);
    if (month === 11) yearsToFetch.add(year + 1);

    let cancelled = false;

    const fetchAll = async () => {
      const results: Holiday[] = [];
      const uncached: number[] = [];

      for (const y of yearsToFetch) {
        const key = `${y}-${countryCode}`;
        const cached = cacheRef.current.get(key);
        if (cached) {
          results.push(...cached);
        } else {
          uncached.push(y);
        }
      }

      if (uncached.length === 0) {
        if (!cancelled) setHolidays(results);
        return;
      }

      setLoading(true);
      try {
        const fetched = await Promise.all(
          uncached.map((y) => fetchHolidays(y, countryCode))
        );
        for (let i = 0; i < uncached.length; i++) {
          const key = `${uncached[i]}-${countryCode}`;
          cacheRef.current.set(key, fetched[i]);
          results.push(...fetched[i]);
        }
        if (!cancelled) setHolidays(results);
      } catch (error) {
        console.error("Failed to load holidays:", error);
        if (!cancelled) setHolidays(results);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [year, month, countryCode]);

  const getHolidaysForDate = useCallback(
    (date: string) => {
      const matched = holidays.filter((h) => h.date === date);
      const seen = new Set<string>();
      return matched.filter((h) => {
        if (seen.has(h.localName)) return false;
        seen.add(h.localName);
        return true;
      });
    },
    [holidays]
  );

  return { holidays, loading, getHolidaysForDate };
}
