import { client } from './client'
// https://8-xyz-xyzxyz.api.zesty.io/v1/content/models
const InstancesAPI = ZUID => {
  const apiClient = client(`https://${ZUID}${__CONFIG__.API_INSTANCE}`)
  return {
    fetchModels: () => apiClient('content/models'),
    fetchModelItems: modelZUID =>
      apiClient(`content/models/${modelZUID}/items`),
    editHomepage: body => {
      return apiClient(
        `content/models/${body.meta.contentModelZUID}/items/${body.meta.ZUID}`,
        {
          method: 'PUT',
          body
        }
      )
    }
  }
}

export default InstancesAPI
