
export default function calcTime(date) {
  date = new Date(date);
  let milliseconds = Date.now() - date.getTime();
  let seconds = Math.ceil(milliseconds / 1000);
  if (seconds < 60) {
    return `${seconds} секунд${
      seconds % 100 !== 11 && seconds % 10 === 1 ? 'у' :
      (seconds % 100 < 11 || seconds % 100 > 19) && seconds % 10 > 1 && seconds < 5 ? 'и' : ''} назад`;
  }
  let minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} хвилин${
      minutes % 100 !== 11 && minutes % 10 === 1 ? 'у' :
      (minutes % 100 < 11 || minutes % 100 > 19) && minutes % 10 > 1 && minutes < 5 ? 'и' : ''} назад`;
  }
  let hours = Math.floor(minutes / 60);
  if (hours <  24) {
    return `${hours} годин${
      hours % 100 !== 11 && hours % 10 === 1 ? 'у' :
      (hours % 100 < 11 || hours % 100 > 19) && hours % 10 > 1 && hours < 5 ? 'и' : ''} назад`;
  }
  let days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} ${
      days % 100 !== 11 && days % 10 === 1 ? 'день' :
      (days % 100 < 11 || days % 100 > 19) && days % 10 > 1 && days % 10 < 5 ? 'дні' : 'днів'} назад`;
  }
  let months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${
      months % 100 !== 11 && months % 10 === 1 ? 'місяць' :
      (months % 100 < 11 || months % 100 > 19) && months % 10 > 1 && months % 10 < 5 ? 'місяці' : 'місяців'} назад`;
  }
  let years = Math.floor(months / 12);
  return `${years} ${
    years % 100 !== 11 && years % 10 === 1 ? 'місяць' :
    (years % 100 < 11 || years % 100 > 19) && years % 10 > 1 && years % 10 < 5 ? 'місяці' : 'місяців'} назад`;
}