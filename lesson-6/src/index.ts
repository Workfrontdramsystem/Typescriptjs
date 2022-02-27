import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import {searchHandler} from './search-handler.js';
import {getFavoritesAmount} from './favorites-amount.js';
import {Toast} from './types/Toast.js';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Wade Warren', '/img/avatar.png', getFavoritesAmount())

  const checkInDefault = new Date()
  checkInDefault.setHours(0, 0, 0, 0)
  checkInDefault.setDate(checkInDefault.getDate() + 1)

  const checkOutDefault = new Date(checkInDefault.getTime())
  checkOutDefault.setDate(checkOutDefault.getDate() + 2)

  renderSearchFormBlock(checkInDefault, checkOutDefault)
  renderSearchStubBlock()

  const toast = new Toast(
    'Это пример уведомления. Используйте его при необходимости',
    'success',
    'Понял',
    () => {console.log('Уведомление закрыто')}
  )

  renderToast(toast)

  const searchButton = document.querySelector('#search-button')
  if (searchButton) {
    searchButton.addEventListener('click', searchHandler)
  }


})
