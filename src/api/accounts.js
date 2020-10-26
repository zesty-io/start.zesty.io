import { client } from './client'
const AccountsAPI = client(__CONFIG__.API_ACCOUNTS)
const Accounts = {
  createAccount: body => AccountsAPI('users', { body }),
  createInstance: body => AccountsAPI('instances', { body }),
  updateBlueprint: (ZUID, blueprintZUID) =>
    AccountsAPI(`instances/${ZUID}/blueprints`, {
      method: 'PUT',
      body: { zuid: blueprintZUID }
    })
}
export default Accounts
