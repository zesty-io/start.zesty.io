import { client } from './client'
const AccountsAPI = client(__CONFIG__.API_ACCOUNTS)
const Accounts = {
  createAccount: body => AccountsAPI('users', { body }),
  createInstance: body => AccountsAPI('instances', { body })
}
export default Accounts
