import { Timestamp } from '@/models/common';
import moment from 'moment';
// import moment = require('moment');

export function getImgUrl(name: String) {
  const images = require.context('../assets/', false, /\.png$/);
  return images(`./${name}`);
}

export function parseTimestamp(timestamp: Timestamp): moment.Moment {
  return moment(timestamp).utcOffset(8);
}

export function timestampToYear(timestamp: Timestamp): number {
  return parseTimestamp(timestamp).year();
}

export function timestampToMonth(timestamp: Timestamp): number {
  return parseTimestamp(timestamp).month();
}

export function timestampToDay(timestamp: Timestamp): number {
  return parseTimestamp(timestamp).day();
}
