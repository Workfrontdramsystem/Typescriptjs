import {KEY_FAVORITE_ITEMS} from './types/LocalStorageKeys.js';
import {Place} from './types/Place.js';

export function localStorageGet(key: string): string {
  return localStorage.getItem(key)
}
export function localStorageSet(key: string, value: string) {
  localStorage.setItem(key, value)
}
export function getFavorites(): Place[] {
  const amount: unknown = localStorageGet(KEY_FAVORITE_ITEMS)
  if (typeof amount === 'string') {
    return JSON.parse(amount)
  }
  return []
}
