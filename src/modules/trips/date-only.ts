import type { DateOnly } from "./types";

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDateOnly(value: string): value is DateOnly {
  if (!DATE_ONLY_PATTERN.test(value)) return false;
  const parsed = toUtcDate(value);
  return formatDateOnly(parsed) === value;
}

export function toUtcDate(value: DateOnly): Date {
  return new Date(`${value}T12:00:00.000Z`);
}

export function formatDateOnly(value: Date): DateOnly {
  return value.toISOString().slice(0, 10);
}

export function compareDateOnly(a: DateOnly, b: DateOnly): number {
  return a.localeCompare(b);
}

export function addDays(value: DateOnly, amount: number): DateOnly {
  const date = toUtcDate(value);
  date.setUTCDate(date.getUTCDate() + amount);
  return formatDateOnly(date);
}

export function enumerateDates(start: DateOnly, end: DateOnly): DateOnly[] {
  const dates: DateOnly[] = [];
  for (let cursor = start; compareDateOnly(cursor, end) <= 0; cursor = addDays(cursor, 1)) {
    dates.push(cursor);
  }
  return dates;
}
