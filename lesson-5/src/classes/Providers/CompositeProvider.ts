import {ProviderComponent} from './ProviderComponent.js';
import {Place} from '../../types/Place.js';
import {SdkLeaf} from './SdkLeaf.js';
import {ApiLeaf} from './ApiLeaf.js';
import {SearchFormData} from '../../types/SearchFormData.js';
import { Provider } from '../../types/Provider.js';

export class CompositeProvider extends ProviderComponent {
  public name: Provider = 'provider';
  private providerLeaves: ProviderComponent[] = [];
  constructor(name: Provider) {
    super(name);
    this.providerLeaves.push(new SdkLeaf('flat-rent'));
    this.providerLeaves.push(new ApiLeaf('homy'));
  }
  search(criteria: SearchFormData): Promise<Place[]> {
    const promises = [];
    this.providerLeaves.forEach(provider => {
      if (criteria.providers.includes(provider.name)) {
        promises.push(provider.search(criteria))
      }
    })


    return Promise.all(promises)
      .then(results => {
        let list: Place[] = []
        results.forEach(places => {
          list = [...list, ...places]
        })
        return list
      })
  }

}
