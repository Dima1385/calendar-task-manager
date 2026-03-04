export interface Task {
  _id: string;
  title: string;
  date: string;
  order: number;
  labels: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  types: string[];
}

export interface CalendarDay {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}
