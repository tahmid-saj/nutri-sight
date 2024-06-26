// regex constants

export const REGEX_PATTERNS = {
  names: /^[a-zA-Z0-9_.-]+$/,
  descriptions: /^[a-zA-Z0-9_.\- ]+[a-zA-Z0-9_.\-]*[a-zA-Z0-9_.\- ]+$|^[a-zA-Z0-9_.\-]+$/,
  search: /\S/,
  floatNumbers: /^(?!0\d)\d*(\.\d{1,2})?$/,
  integerNumbers: /^[0-9]*$/,
  currency: /^[A-Z]*$/
}