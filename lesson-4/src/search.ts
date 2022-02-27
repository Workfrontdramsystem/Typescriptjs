import {SearchFormData} from './types/SearchFormData.js';
import {Place} from './types/Place.js';
import {renderEmptyOrErrorSearchBlock, renderSearchResultsBlock} from './search-results.js';
import {toggleFavoriteItem} from './toggle-favorite-item.js';
import {Flat, FlatRentSdk, SearchParameters} from './lib/flat-rent-sdk/flat-rent-sdk.js';


const searchApi3030 = (values: SearchFormData): Promise<Place[]> => {
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
}

const searchSdk = (values: SearchFormData): Promise<Place[]> => {
  const sdk = new FlatRentSdk()

  const params: SearchParameters = {
    checkInDate: values.checkInDate,
    checkOutDate: values.checkOutDate,
    city: 'Санкт-Петербург',
    priceLimit: values.maxPrice,
  }

  return sdk.search(params)
    .then<Place[]>(flats => {

      const places: Place[] = []

      let p = Promise.resolve(null)

      flats.forEach(flat => {
        p = p.then(() => {
          return sdk.get(flat.id.toString())
            .then<Place>(flatItem => {
              const place: Place = {
                id: flat.id,
                image: flat.photos[0],
                name: flat.title,
                description: flat.details,
                remoteness: 0,
                bookedDates: flat.bookDates,
                price: flatItem.price
              }
              return place
            })
            .then(place => places.push(place))
        })
      })
      p = p.then(() => places)
      return p
    })
}

export function search(values: SearchFormData): Promise<void | Place[]> {

  const promises = [];

  if (values.providers.includes('homy')) {
    promises.push(searchApi3030(values));
  }
  if (values.providers.includes('flat-rent')) {
    promises.push(searchSdk(values));
  }

  return Promise.all(promises)
    .then(results => {
      let list = []
      results.forEach(places => {
        list = [...list, ...places]
      })
      if (list.length === 0) {
        renderEmptyOrErrorSearchBlock('не найдено')
        return null
      }
      renderSearchResultsBlock(list)
      const placeElements = document.querySelectorAll('.results-list .favorites')
      placeElements.forEach(element => {
        element.addEventListener('click', toggleFavoriteItem)
      })
    })
    .catch(error => {renderEmptyOrErrorSearchBlock(`Ошибка api places: ${error}`)})
}
