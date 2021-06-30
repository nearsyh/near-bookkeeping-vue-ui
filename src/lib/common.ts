import { Timestamp } from '@/models/common';
import moment from 'moment';
// import moment = require('moment');

export function getImgUrl(name: String) {
  const images = require.context('../assets/', false, /\.png$/);
  return images(`./${name}`);
}

export function timestampToYearMonth(timestamp: Timestamp) {
  const time = moment(timestamp).utcOffset(8);
  return `${time.format('YYYY')}年${time.format('MM')}月`;
}

export function timestampToMonthDay(timestamp: Timestamp) {
  const time = moment(timestamp).utcOffset(8);
  return `${time.format('MM')}月${time.format('DD')}日`;
}
