import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { useCalendar } from "../../hooks/useCalendar.js";
import { useTasks } from "../../hooks/useTasks.js";
import { useHolidays } from "../../hooks/useHolidays.js";
import { useDragHandlers } from "../../hooks/useDragHandlers.js";
import { fetchAvailableCountries } from "../../api/holidays.js";
import { CalendarCell } from "./CalendarCell.js";
import { DragOverlayCard } from "./DragOverlayCard.js";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { getMonthName, WEEKDAYS } from "../../utils/date.js";
import {
  CalendarWrapper,
  Header,
  HeaderLeft,
  HeaderRight,
  MonthTitle,
  NavButton,
  TodayButton,
  CountrySelect,
  Grid,
  WeekdayHeader,
  LoadingBar,
} from "./styles.js";

export const Calendar: React.FC = () => {
  const {
    year,
    month,
    days,
    dateRange,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  const { tasks, loading, addTask, editTask, removeTask, reorderTasks, tasksByDate } =
    useTasks(dateRange.startDate, dateRange.endDate);

  const [countryCode, setCountryCode] = useState("US");
  const [countries, setCountries] = useState<
    { countryCode: string; name: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { getHolidaysForDate } = useHolidays(year, month, countryCode);

  const { activeTask, handleDragStart, handleDragEnd } = useDragHandlers({
    tasks,
    reorderTasks,
  });

  const searchResultCount = useMemo(() => {
    if (!searchQuery) return 0;
    const q = searchQuery.toLowerCase();
    return tasks.filter((t) => t.title.toLowerCase().includes(q)).length;
  }, [tasks, searchQuery]);

  useEffect(() => {
    fetchAvailableCountries().then(setCountries).catch(console.error);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleAddTask = useCallback(
    (title: string, date: string, labels: string[]) => {
      addTask(title, date, labels);
    },
    [addTask]
  );

  const handleEditTask = useCallback(
    (id: string, title: string) => {
      editTask(id, { title });
    },
    [editTask]
  );

  return (
    <CalendarWrapper>
      <Header>
        <HeaderLeft>
          <NavButton onClick={goToPrevMonth} aria-label="Previous month">
            &#9664;
          </NavButton>
          <MonthTitle>
            {getMonthName(month)} {year}
          </MonthTitle>
          <NavButton onClick={goToNextMonth} aria-label="Next month">
            &#9654;
          </NavButton>
          <TodayButton onClick={goToToday}>Today</TodayButton>
        </HeaderLeft>
        <HeaderRight>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={searchResultCount}
          />
          <CountrySelect
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            aria-label="Select country for holidays"
          >
            {countries.map((c) => (
              <option key={c.countryCode} value={c.countryCode}>
                {c.name}
              </option>
            ))}
          </CountrySelect>
        </HeaderRight>
      </Header>

      {loading && <LoadingBar />}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Grid>
          {WEEKDAYS.map((day) => (
            <WeekdayHeader key={day}>{day}</WeekdayHeader>
          ))}
          {days.map((day) => (
            <CalendarCell
              key={day.date}
              day={day}
              tasks={tasksByDate.get(day.date) ?? []}
              holidays={getHolidaysForDate(day.date)}
              searchQuery={searchQuery}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={removeTask}
            />
          ))}
        </Grid>
        <DragOverlay dropAnimation={null}>
          {activeTask ? <DragOverlayCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </CalendarWrapper>
  );
};
