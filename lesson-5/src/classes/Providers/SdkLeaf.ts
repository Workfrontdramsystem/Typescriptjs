import {ProviderComponent} from './ProviderComponent.js';
import {Place} from '../../types/Place.js';
import {Flat, FlatRentSdk, SearchParameters} from '../../lib/flat-rent-sdk/flat-rent-sdk.js';
import {SearchFormData} from '../../types/SearchFormData.js';
import {Provider} from '../../types/Provider.js';

export class SdkLeaf extends ProviderComponent {
  constructor(name: Provider) {
    super(name);
  }
  search(criteria: SearchFormData): Promise<Place[]> {
    const sdk = new FlatRentSdk()

    const params: SearchParameters = {
      checkInDate: criteria.checkInDate,
      checkOutDate: criteria.checkOutDate,
      city: 'Санкт-Петербург',
      priceLimit: criteria.maxPrice,
    }

    return sdk.search(params)
      .then<Place[]>(formattedFlats => {

        const promises = []

        formattedFlats.forEach(formattedFlat => {
          const p = sdk.get(formattedFlat.id.toString())
            .then<Place>(flat => {
              const place: Place = {
                id: flat.id,
                image: flat.photos[0],
                name: flat.title,
                description: flat.details,
                remoteness: 0,
                bookedDates: flat.bookedDates,
                price: flat.price
              }
              return place
            })
          promises.push(p)
        })

        return Promise.all<Place[]>(promises)
      })

  }

}
