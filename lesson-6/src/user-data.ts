import {localStorageGet} from './local-storage-service.js';

export function getUserData() {
  const userObj: unknown = JSON.stringify(localStorageGet('user'))
  if (typeof userObj === 'object') {
    console.log('userObj', userObj)
  }

}
