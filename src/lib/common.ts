import { Timestamp } from '@/models/common';
import moment from 'moment';
import { VueCookieNext } from 'vue-cookie-next';

export function getImgUrl(name: String) {
  const images = require.context('../assets/', false, /\.png$/);
  return images(`./${name}`);
}

export function getUser(): string {
  return VueCookieNext.getCookie('user');
}

export function setUser(user: string) {
  VueCookieNext.setCookie('user', user);
}

export function hasUser(): boolean {
  console.log(getUser());
  return getUser() !== null && getUser() !== '';
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
