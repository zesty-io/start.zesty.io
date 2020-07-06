// adapted from https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import Cookies from 'js-cookie'
export default function client(baseUrl) {
  return (endpoint, { body, ...customConfig } = {}) => {
    const token = Cookies.get(__CONFIG__.COOKIE_NAME)
    const headers =
      body instanceof FormData ? {} : { 'content-type': 'application/json' }
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
      config.body = body instanceof FormData ? body : JSON.stringify(body)
    }
    console.log(config)
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
