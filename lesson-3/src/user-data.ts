import {read} from './local-storage-service';

export function getUserData() {
  const userObj: unknown = JSON.stringify(read('user'))
  if (typeof userObj === 'object') {
    console.log('userObj', userObj)
  }

}
