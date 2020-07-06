import { client } from './client'
const AuthAPI = client(__CONFIG__.SERVICE_AUTH)
const Auth = {
  login: body => {
    const formData = new FormData()
    formData.append('email', body.email)
    formData.append('password', body.password)
    return AuthAPI('login', {
      body: formData
    })
  }
}
export default Auth
