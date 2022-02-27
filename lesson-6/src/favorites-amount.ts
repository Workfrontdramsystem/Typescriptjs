import {getFavorites} from './local-storage-service.js';

export function getFavoritesAmount() {
  return getFavorites().length
}
