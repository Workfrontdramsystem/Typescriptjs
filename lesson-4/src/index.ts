import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import {searchHandler} from './search-handler.js';
import {getFavoritesAmount} from './favorites-amount.js';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Wade Warren', '/img/avatar.png', getFavoritesAmount())
  renderSearchFormBlock(null, null)
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )

  const searchButton = document.querySelector('#search-button')
  searchButton.addEventListener('click', searchHandler)


})
