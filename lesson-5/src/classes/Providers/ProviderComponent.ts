import {Place} from '../../types/Place.js';
import {SearchFormData} from '../../types/SearchFormData.js';
import {Provider} from '../../types/Provider.js';

export abstract class ProviderComponent {
  public name: Provider;
  protected constructor(name: Provider) {
    this.name = name;
  }
  public abstract search(criteria: SearchFormData): Promise<Place[]>
}
