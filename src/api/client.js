// adapted from https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import Cookies from 'js-cookie'
export default function client(endpoint, { body, ...customConfig } = {}) {
  const token = Cookies.get(CONFIG.COOKIE_NAME)
  const headers = { 'content-type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }
  if (body) {
    config.body = JSON.stringify(body)
  }
  return window
    .fetch(`${CONFIG.API_ACCOUNTS}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}
