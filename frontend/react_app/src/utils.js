export let isHandheldDevice =
  navigator.maxTouchPoints || "ontouchstart" in document.documentElement;

export let isSafariBrowser =
  window.navigator.userAgent.includes("(Macintosh; ");

export function isValidBirthday(dateString) {
  if (!/^\d{1,2}\-\d{1,2}\-\d{4}$/.test(dateString)) return false;

  var parts = dateString.split("-");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
    monthLength[1] = 29;

  return day > 0 && day <= monthLength[month - 1];
}

export const makeArray = (arg) => (Array.isArray(arg) ? arg : [arg]);

export const isEmpty = (arg) => {
  if (typeof arg === "number" || typeof arg === "boolean") {
    return false;
  }
  if (typeof arg === "undefined" || arg === null) {
    return true;
  }
  if (typeof arg.length !== "undefined") {
    return arg.length === 0;
  }
  return Object.entries(arg).length === 0;
};

export const omit = (obj, key) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};

export const getNested = (obj, ...args) =>
  args.reduce((o, level) => o && o[level], obj);

export const reduceById = (arr) =>
  arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

export const reduceToIds = (arr) =>
  arr.reduce((acc, item) => [...acc, item.id], []);

export const pluralize = (number, text) => (number === 1 ? text : `${text}s`);

export const truncate = (string, maxLength) =>
  string.length > maxLength ? `${string.slice(0, maxLength)}...` : string;
