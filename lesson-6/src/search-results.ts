import { renderBlock } from './lib.js'
import {Place} from './types/Place.js';
import {getFavorites} from './local-storage-service.js';
import {FlatsSorting} from './types/FlatsSorting.js';
import {searchHandler} from './search-handler.js';

export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock (places: Place[], sorting: FlatsSorting) {

  const favorites: Place[] = getFavorites()
  const favoriteIds: number[] = favorites.map(item => item.id)

  const selected = (sortValue: FlatsSorting): string => {
    if (sortValue === sorting) {
      return 'selected'
    }
    return ''
  }

  let html = `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <form action="" id="form-sorting">
                <select id="select-sorting" name="sorting">
                    <option value="cheap" ${selected('cheap')}>Сначала дешёвые</option>
                    <option value="expensive" ${selected('expensive')}>Сначала дорогие</option>
                    <option value="close" ${selected('close')}>Сначала ближе</option>
                </select>
            </form>
        </div>
    </div>
    <ul class="results-list">
    `

  const sortCheap = (places: Place[]): Place[] => {
    return places.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    })
  }

  const sortExpensive = (places: Place[]): Place[] => {
    return places.sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    })
  }

  const sortClose = (places: Place[]): Place[] => {
    return places.sort((a, b) => {
      if (a.remoteness > b.remoteness) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    })
  }

  const sort = (places: Place[], sorting: FlatsSorting): Place[] => {
    switch (sorting) {
    case 'cheap':
      return sortCheap(places);
    case 'expensive':
      return sortExpensive(places);
    case 'close':
      return sortClose(places)
    default: return sortCheap(places)
    }
  }
  sort(places, sorting).forEach(place => {

    const active: string = favoriteIds.includes(place.id) ? 'active' : ''

    html += `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites ${active}" data-id="${place.id}"></div>
            <img class="result-img" src="${place.image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p class="name">${place.name}</p>
              <p class="price">${place.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness}км от вас</div>
            <div class="result-info--descr">${place.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    `
  })

  html += '</ul>'

  renderBlock('search-results-block', html)

  const sortingElement = document.querySelector('#select-sorting') as HTMLElement;
  if (sortingElement) {
    sortingElement.addEventListener('change', searchHandler);
  }

}
