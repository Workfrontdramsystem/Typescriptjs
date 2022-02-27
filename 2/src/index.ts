import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast, getUserData, getFavoritesAmount, saveUserDataInLocalStorage } from './lib.js'


window.addEventListener('DOMContentLoaded', () => {

  saveUserDataInLocalStorage('Bill Gates','https://picsum.photos/id/237/200/300');

  const user = getUserData();
  console.log(user);
  renderUserBlock(user.username, user.avatarUrl, 0)
  renderSearchFormBlock(new Date)
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
})
/////////////////////////////////////////////
