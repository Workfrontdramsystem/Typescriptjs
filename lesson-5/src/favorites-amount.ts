import {getFavorites, localStorageGet} from './local-storage-service.js';
import {KEY_FAVORITE_ITEMS} from './types/LocalStorageKeys.js';

export function getFavoritesAmount() {
  return getFavorites().length
}
