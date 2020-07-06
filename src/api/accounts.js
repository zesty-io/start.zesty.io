import client from './client'
const AccountsAPI = client(__CONFIG__.API_ACCOUNTS)
const Accounts = {
  createUser: body => AccountsAPI('users', { body })
}
export default Accounts
