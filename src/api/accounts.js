import { client } from './client'
const AccountsAPI = client(__CONFIG__.API_ACCOUNTS)
const Accounts = {
  createAccount: body => AccountsAPI('users', { body }),
  createInstance: body => AccountsAPI('instances', { body }),
  updateBlueprint: (ZUID, blueprintID) =>
    AccountsAPI(`instances/${ZUID}?action=updateBlueprint`, {
      method: 'PUT',
      body: { blueprintID }
    })
}
export default Accounts
