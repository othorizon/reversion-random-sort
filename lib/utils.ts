import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, format: string) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  format = format.replace('yyyy', year + "");
  format = format.replace('MM', month);
  format = format.replace('dd', day);
  format = format.replace('HH', hours);
  format = format.replace('mm', minutes);
  format = format.replace('ss', seconds);

  return format;
}

export function timeDifference(timestamp1:number, timestamp2:number) {
  const timeDifferenceInMillis = Math.abs(timestamp1 - timestamp2);

  // 将毫秒差转换为秒
  const timeDifferenceInSeconds = timeDifferenceInMillis / 1000;

  // 计算天数
  const days = Math.floor(timeDifferenceInSeconds / (60 * 60 * 24));

  // 计算剩余秒数
  const remainingSeconds = timeDifferenceInSeconds % (60 * 60 * 24);

  return { days: days, seconds: remainingSeconds };
}