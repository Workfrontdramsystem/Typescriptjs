import {Provider} from './Provider.js';

export interface SearchFormData {
  checkInDate: Date,
  checkOutDate: Date,
  maxPrice: number,
  providers: Provider[]
}
