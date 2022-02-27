import {SearchFormData} from './types/SearchFormData.js';
import {Place} from './types/Place.js';
import {renderEmptyOrErrorSearchBlock, renderSearchResultsBlock} from './search-results.js';
import {toggleFavoriteItem} from './toggle-favorite-item.js';

export function search(values: SearchFormData) {

  const coordinates = '59.9386,30.3141'

  let url = 'http://localhost:3030/places/?'
  url += 'coordinates=' + coordinates
  url += '&'
  url += 'checkInDate=' + values.checkInDate.getTime()
  url += '&'
  url += 'checkOutDate=' + values.checkOutDate.getTime()
  url += '&'
  url += 'maxPrice=' + (values.maxPrice === 0 ? 1 : values.maxPrice)
  return fetch(url)
    .then(response => response.text())
    .then<Place[]>(text => JSON.parse(text))
    .then(places => {
      if (places.length === 0) {
        renderEmptyOrErrorSearchBlock('не найдено')
        return null
      }
      renderSearchResultsBlock(places)

      const placeElements = document.querySelectorAll('.results-list .favorites')
      placeElements.forEach(element => {
        element.addEventListener('click', toggleFavoriteItem)
      })


      return places
    })
    .catch(error => {renderEmptyOrErrorSearchBlock(`Ошибка api places: ${error}`)})

}
