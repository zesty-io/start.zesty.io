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
    },
    fetchInstantJSONPreview: contentZUID => {
      return request(
        `${__CONFIG__.URL_PREVIEW_PROTOCOL}${hash}${__CONFIG__.URL_PREVIEW}/-/instant/${contentZUID}.json`
      )
    }
  }
}
export default Manager
