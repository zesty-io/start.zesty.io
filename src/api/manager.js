import { request } from './client'
const Manager = hash => {
  return {
    get: () => {
      return window.fetch(
        `${__CONFIG__.URL_MANAGER_PROTOCOL}${hash}${__CONFIG__.URL_MANAGER}`,
        {
          mode: 'no-cors',
          credentials: 'include'
        }
      )
    }
  }
}
export default Manager
