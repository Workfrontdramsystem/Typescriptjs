import {search} from './search.js';
import {SearchFormData} from './types/SearchFormData.js';
import {Provider} from './types/Provider.js';

export function searchHandler() {
  const form = document.querySelector('#search-form') as HTMLFormElement
  if (form) {
    const formData = new FormData(form);

    const checkIn = formData?.get('checkin') ?? ''
    const checkOut = formData?.get('checkout') ?? ''
    const price = formData?.get('price') ?? 0

    const sfd: SearchFormData = {
      checkInDate: new Date(checkIn.toString()),
      checkOutDate: new Date(checkOut.toString()),
      maxPrice: +(price),
      providers: formData.getAll('provider').map<Provider>(item => item.toString()),
    }
    search(sfd)
  }
}
