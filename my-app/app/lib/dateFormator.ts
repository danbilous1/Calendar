export default function dateFormator(date: Date): string {
  const year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }
  let day: number | string = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let hour: number | string = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minute: number | string = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  return `${year}-${month}-${day}T${hour}:${minute}`;
}
