import { clsx, type ClassValue } from "clsx";
import { randomInt } from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function partialEmail(email: string) {
  return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2");
}

export function generateOTP() {
  return randomInt(1000, 9999).toString();
}