// adapted from https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import Cookies from 'js-cookie'
function client(baseUrl) {
  return (endpoint, { body, ...customConfig } = {}) => {
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
      .fetch(`${baseUrl}/${endpoint}`, config)
      .then(async response => {
        const data = await response.json()
        if (response.ok) {
          return data
        } else {
          return Promise.reject(data)
        }
      })
  }
}

export const AccountsAPI = client(__CONFIG__.API_ACCOUNTS)
export const AuthAPI = client(__CONFIG__.SERVICE_AUTH)
