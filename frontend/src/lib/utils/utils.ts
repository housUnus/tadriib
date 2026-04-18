import { clsx, type ClassValue } from "clsx"
import moment from "moment";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMinutes(minutes: number) {
  const d = moment.duration(minutes, "minutes");

  const hours = Math.floor(d.asHours());
  const mins = d.minutes();

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export const isInstructorRoute = (pathname: string) => {
  return pathname.startsWith("/instructor");
}

export const isStudentRoute = (pathname: string) => {
  return pathname.startsWith("/student");
}