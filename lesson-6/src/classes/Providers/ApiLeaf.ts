import {ProviderComponent} from './ProviderComponent.js';
import {SearchFormData} from '../../types/SearchFormData.js';
import {Place} from '../../types/Place.js';
import {Provider} from '../../types/Provider.js';

export class ApiLeaf extends ProviderComponent {
  constructor(name: Provider) {
    super(name);
  }
  search(criteria: SearchFormData): Promise<Place[]> {
    const coordinates = '59.9386,30.3141'

    let url = 'http://localhost:3030/places/?'
    url += 'coordinates=' + coordinates
    url += '&'
    url += 'checkInDate=' + criteria.checkInDate.getTime()
    url += '&'
    url += 'checkOutDate=' + criteria.checkOutDate.getTime()
    url += '&'
    url += 'maxPrice=' + (criteria.maxPrice === 0 ? 1 : criteria.maxPrice)
    return fetch(url)
      .then(response => response.text())
      .then<Place[]>(text => JSON.parse(text))

  }
  
}
