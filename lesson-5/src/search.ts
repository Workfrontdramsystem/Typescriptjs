import {SearchFormData} from './types/SearchFormData.js';
import {Place} from './types/Place.js';
import {renderEmptyOrErrorSearchBlock, renderSearchResultsBlock} from './search-results.js';
import {toggleFavoriteItem} from './toggle-favorite-item.js';
import {CompositeProvider} from './classes/Providers/CompositeProvider.js';
import {FlatsSorting} from './types/FlatsSorting.js';

export function search(values: SearchFormData): Promise<void | Place[]> {
  const compositeProvider: CompositeProvider = new CompositeProvider('providers')

  let sorting: FlatsSorting = 'cheap'
  const form: HTMLFormElement = document.querySelector('#form-sorting')
  if (form) {
    const formData = new FormData(form);
    sorting = formData.get('sorting').toString()
  }

  return compositeProvider.search(values)
    .then(list => {
      if (list.length === 0) {
        renderEmptyOrErrorSearchBlock('не найдено')
        return null
      }
      renderSearchResultsBlock(list, sorting)
      const placeElements = document.querySelectorAll('.results-list .favorites')
      placeElements.forEach(element => {
        element.addEventListener('click', toggleFavoriteItem)
      })
    })
    .catch(error => {renderEmptyOrErrorSearchBlock(`Ошибка api places: ${error}`)})
}
