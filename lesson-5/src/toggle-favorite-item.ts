import {localStorageGet, localStorageSet,} from './local-storage-service.js';
import {KEY_FAVORITE_ITEMS} from './types/LocalStorageKeys.js';


export function toggleFavoriteItem(event) {

  const result = event.target.closest('.result')
  const id: number = +(event.target.dataset.id)
  const name: string = result.querySelector('.name').innerText
  const image: string = result.querySelector('.result-img').getAttribute('src')

  const value: unknown = localStorageGet(KEY_FAVORITE_ITEMS)

  let favorites = []

  if (typeof value == 'string') {
    favorites = JSON.parse(value)
  }

  const index = favorites.findIndex(item => item.id === id)
  if (index > -1) {
    favorites.splice(index, 1)
  } else {
    favorites.push({
      id,
      name,
      image
    })
  }
  localStorageSet(KEY_FAVORITE_ITEMS, JSON.stringify(favorites))
}
