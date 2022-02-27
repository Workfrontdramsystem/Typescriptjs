import { renderBlock } from "./lib.js";
import { Place } from "./types/Place.js";
import { getFavorites } from "./local-storage-service.js";

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function renderSearchResultsBlock(places: Place[]) {
  const favorites: Place[] = getFavorites();
  const favoriteIds: number[] = favorites.map((item) => item.id);

  let html = `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
    `;
  places.forEach((place) => {
    const active: string = favoriteIds.includes(place.id) ? "active" : "";

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
    `;
  });

  html += "</ul>";

  renderBlock("search-results-block", html);
}
