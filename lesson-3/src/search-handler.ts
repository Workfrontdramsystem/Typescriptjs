import {search} from './search.js';
import {SearchFormData} from './types/SearchFormData.js';

export function searchHandler() {
  const form: HTMLFormElement = document.querySelector('#search-form')
  const formData = new FormData(form);

  const sfd: SearchFormData = {
    checkInDate: new Date(formData.getAll('checkin').toString()),
    checkOutDate: new Date(formData.getAll('checkout').toString()),
    maxPrice: +(formData.getAll('price')),
  }

  search(sfd)

}
