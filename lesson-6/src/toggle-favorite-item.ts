import {localStorageGet, localStorageSet,} from './local-storage-service.js';
import {KEY_FAVORITE_ITEMS} from './types/LocalStorageKeys.js';
import {Favorite} from './types/Favorite.js';


export function toggleFavoriteItem(event: Event) {

  const target: HTMLElement = (event.target as HTMLElement)

  const id = +(target?.dataset?.id ?? 0)
  const result = (target as HTMLElement).closest('.result')


  let image = ''
  let name = ''
  if (result) {
    const nameElement = result.querySelector('.name') as HTMLElement
    name = nameElement.innerText
    const resultImgElement = result.querySelector('.result-img') as HTMLElement
    image = resultImgElement.getAttribute('src') ?? ''
  }

  const value: unknown = localStorageGet(KEY_FAVORITE_ITEMS)

  let favorites: Favorite[] = []

  if (typeof value == 'string') {
    favorites = JSON.parse(value)
  }

  const index = favorites.findIndex(item => item.id === id)
  if (index > -1) {
    favorites.splice(index, 1)
  } else {

    const favorite: Favorite = {
      id,
      name,image
    }

    favorites.push(favorite)
  }
  localStorageSet(KEY_FAVORITE_ITEMS, JSON.stringify(favorites))
}
