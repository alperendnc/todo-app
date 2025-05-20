"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ContinuousCalendarProps {
  onClick?: (_day: number, _month: number, _year: number) => void;
}

const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({ onClick }) => {
  const today = useMemo(() => new Date(), []);
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [year, setYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [isUserSelectingMonth, setIsUserSelectingMonth] = useState(false);

  const scrollToDay = (monthIndex: number, dayIndex: number) => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) =>
        ref &&
        ref.getAttribute("data-month") === `${monthIndex}` &&
        ref.getAttribute("data-day") === `${dayIndex}`
    );

    const targetElement = dayRefs.current[targetDayIndex];

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.getElementById("calendar-container");
      const elementRect = targetElement.getBoundingClientRect();
      const offsetFactor = window.matchMedia("(min-width: 1536px)").matches
        ? 3
        : 2.5;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset =
          elementRect.top -
          containerRect.top -
          containerRect.height / offsetFactor +
          elementRect.height / 2;

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: "smooth",
        });
      }
    }
  };

  const handleMonthChange = (event: any) => {
    const monthIndex = parseInt(event.target.value, 10);
    setIsUserSelectingMonth(true);
    setSelectedMonth(monthIndex);
  };

  useEffect(() => {
    if (!isUserSelectingMonth) return;
    const firstDayIndex = dayRefs.current.findIndex(
      (ref) =>
        ref &&
        ref.getAttribute("data-month") === `${selectedMonth}` &&
        ref.getAttribute("data-day") === "1"
    );
    const targetElement = dayRefs.current[firstDayIndex];
    if (targetElement) {
      const container = document.getElementById("calendar-container");
      const elementRect = targetElement.getBoundingClientRect();
      const offsetFactor = window.matchMedia("(min-width: 1536px)").matches
        ? 3
        : 2.5;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset =
          elementRect.top -
          containerRect.top -
          containerRect.height / offsetFactor +
          elementRect.height / 2;
        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: "smooth",
        });
      }
    }
    const timeout = setTimeout(() => setIsUserSelectingMonth(false), 500);
    return () => clearTimeout(timeout);
  }, [selectedMonth, isUserSelectingMonth]);

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    scrollToDay(today.getMonth(), today.getDate());
  };

  const handleDayClick = React.useCallback(
    (day: number, month: number, year: number) => {
      if (onClick) {
        if (month < 0) {
          onClick(day, 11, year - 1);
        } else {
          onClick(day, month, year);
        }
      }
    },
    [onClick]
  );

  const generateCalendar = useMemo(() => {
    const daysInYear = (): { month: number; day: number }[] => {
      const days = [];
      const startDayOfWeek = new Date(year, 0, 1).getDay();

      if (startDayOfWeek < 6) {
        for (let i = 0; i < startDayOfWeek; i++) {
          days.push({ month: -1, day: 32 - startDayOfWeek + i });
        }
      }

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          days.push({ month, day });
        }
      }

      const lastWeekDayCount = days.length % 7;
      if (lastWeekDayCount > 0) {
        const extraDaysNeeded = 7 - lastWeekDayCount;
        for (let day = 1; day <= extraDaysNeeded; day++) {
          days.push({ month: 0, day });
        }
      }

      return days;
    };

    const calendarDays = daysInYear();
    const calendarWeeks = [];

    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    return calendarWeeks.map((week, weekIndex) => (
      <Box key={`week-${weekIndex}`} display="flex" width="100%">
        {week.map(({ month, day }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex;
          const isNewMonth =
            index === 0 || calendarDays[index - 1].month !== month;
          const isToday =
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;

          return (
            <Box
              key={`${month}-${day}`}
              ref={(el) => {
                dayRefs.current[index] = el as HTMLDivElement | null;
              }}
              data-month={month}
              data-day={day}
              onClick={() => handleDayClick(day, month, year)}
              sx={{
                position: "relative",
                aspectRatio: "1 / 1",
                width: "100%",
                flexGrow: 1,
                border: "1px solid #ccc",
                borderRadius: 2,
                cursor: "pointer",
                m: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  fontSize: 12,
                  fontWeight: isToday ? "bold" : "normal",
                  backgroundColor: isToday ? "blue" : "transparent",
                  color: isToday ? "#fff" : month < 0 ? "gray" : "black",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {day}
              </Typography>
              {isNewMonth && month >= 0 && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    position: "absolute",
                    bottom: 4,
                    left: 8,
                    color: "#bbb",
                  }}
                >
                  {monthNames[month]}
                </Typography>
              )}
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  opacity: 0.5,
                  "&:hover": { opacity: 1 },
                }}
              >
                <AddCircleIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    ));
  }, [year, handleDayClick, today]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isUserSelectingMonth) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const month = parseInt(
              entry.target.getAttribute("data-month") || "0",
              10
            );
            setSelectedMonth(month);
          }
        }
      },
      {
        root: document.getElementById("calendar-container"),
        rootMargin: "-75% 0px -25% 0px",
        threshold: 0,
      }
    );

    dayRefs.current.forEach((ref) => {
      if (ref?.getAttribute("data-day") === "15") {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [isUserSelectingMonth]);

  return (
    <Box
      id="calendar-container"
      sx={{
        maxHeight: "90vh",
        overflowY: "scroll",
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 4,
        p: 2,
      }}
    >
      <Box
        position="sticky"
        top={0}
        zIndex={10}
        bgcolor="white"
        p={2}
        borderBottom="1px solid #eee"
      >
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Select
            value={`${selectedMonth}`}
            onChange={handleMonthChange}
            size="small"
          >
            {monthNames.map((month, index) => (
              <MenuItem key={index} value={`${index}`}>
                {month}
              </MenuItem>
            ))}
          </Select>
          <Button variant="outlined" size="small" onClick={handleTodayClick}>
            Today
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "none" }}
          >
            + Add Event
          </Button>
        </Box>
      </Box>
      <Box mt={2}>{generateCalendar}</Box>
    </Box>
  );
};

export default ContinuousCalendar;
