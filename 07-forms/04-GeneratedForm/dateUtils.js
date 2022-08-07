/**
 * Creates new Meetup object with temp negative id
 * @param value : String Time format '10:00'
 * @return Number
 */
export function getUTCTime(value) {
  const valueArr = value.split(':');
  return new Date().setUTCHours(Number.parseInt(valueArr[0]), Number.parseInt(valueArr[1]), 0, 0);
}
