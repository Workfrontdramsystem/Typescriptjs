import {SearchFormData} from './types/SearchFormData.js';
import {Place} from './types/Place.js';
import {renderEmptyOrErrorSearchBlock, renderSearchResultsBlock} from './search-results.js';
import {toggleFavoriteItem} from './toggle-favorite-item.js';
import {CompositeProvider} from './classes/Providers/CompositeProvider.js';
import {FlatsSorting} from './types/FlatsSorting.js';

export function search(values: SearchFormData): Promise<Place[]> {
  const compositeProvider: CompositeProvider = new CompositeProvider('providers')

  let sorting: FlatsSorting = 'cheap'
  const form = document.querySelector('#form-sorting') as HTMLFormElement
  if (form) {
    const formData = new FormData(form);
    sorting = formData.get('sorting')?.toString() ?? ''
  }

  return compositeProvider.search(values)
    .then(list => {
      if (list.length === 0) {
        renderEmptyOrErrorSearchBlock('не найдено')
        return list
      }
      renderSearchResultsBlock(list, sorting)
      const placeElements = document.querySelectorAll('.results-list .favorites')
      placeElements.forEach(element => {
        element.addEventListener('click', toggleFavoriteItem)
      })
      return list
    })
    .catch(error => {
      renderEmptyOrErrorSearchBlock(`Ошибка api places: ${error}`)
      return []
    })
}
