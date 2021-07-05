import { Timestamp } from '@/models/common';
import moment from 'moment';
import { VueCookieNext } from 'vue-cookie-next';

export function getImgUrl(name: String) {
  const images = require.context('../assets/', false, /\.png$/);
  return images(`./${name}`);
}

export function getUser(): string {
  return VueCookieNext.getCookie('user') || '';
}

export function setUser(user: string) {
  VueCookieNext.setCookie('user', user);
}

export function hasUser(): boolean {
  return getUser() !== null && getUser() !== '';
}

export function parseTimestamp(timestamp: Timestamp): moment.Moment {
  return moment(timestamp).utcOffset(8);
}

export function currentTime(): moment.Moment {
  return parseTimestamp(moment.now());
}
