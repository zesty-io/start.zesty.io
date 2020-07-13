import React, { useState } from 'react'
import Cookies from 'js-cookie'

import { WithLoader } from '@zesty-io/core/WithLoader'

import { Wizard, WizardStep } from '../Wizard'
import { AppError } from '../AppError'
import { AppStateContext } from '../../context'

import { BuildType } from './components/BuildType'
import { CreateAccount } from './components/CreateAccount'
import Login from './components/Login'
import { SiteCreated } from './components/SiteCreated'
import { ContentPage } from './components/ContentPage'
import { Preview } from './components/Preview'
// import { notify } from '../Notifications'

import Auth from '../../api/auth'
import Accounts from '../../api/accounts'
import Manager from '../../api/manager'
import InstancesAPI from '../../api/instances'

import styles from './GettingStarted.less'

export default function GettingStarted() {
  const [authType, setAuthType] = useState('createAccount')
  const [step, setStep] = useState(0)
  const [build, setBuild] = useState('')
  const [hasError, setHasError] = useState(false)

  const buildNames = {
    landingpage: 'Landing Page',
    corporate: 'Corporate Blog',
    api: 'API'
  }
  const [account, setAccount] = useState({
    ZUID: '',
    message: '',
    submitted: false,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    eula: false
  })
  const [instance, setInstance] = useState({
    instanceZUID: '',
    instanceHash: '',
    instanceReady: false
  })

  const [page, setPage] = useState({
    title: '',
    content: '',
    image: []
  })

  const [homepageContent, setHomepageContent] = useState({})
  const [contentJSON, setContentJSON] = useState({})

  async function createAccount() {
    // 1) Create Account
    const userResponse = await Accounts.createAccount({
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      password: account.password
    })
    setAccount({ ...account, ZUID: userResponse.ZUID })
    console.log('created account')
  }

  async function login() {
    const {
      meta: { token }
    } = await Auth.login({ email: account.email, password: account.password })

    Cookies.set(__CONFIG__.COOKIE_NAME, token, {
      path: '/',
      domain: __CONFIG__.COOKIE_DOMAIN
    })
    console.log('logged in')
  }

  async function createInstanceWorkflow() {
    // 1) Create Instance
    const instanceResponse = await Accounts.createInstance({
      name: buildNames[build]
    })
    const instanceZUID = instanceResponse.data.ZUID
    const instanceHash = instanceResponse.data.randomHashID
    console.log('created instance')

    // 2) Set Blueprint
    await Accounts.updateBlueprint(instanceZUID, 37)
    console.log('blueprint set')

    // 3) Populate Instance
    await Manager(instanceHash).get()
    console.log('instance populated')

    // 4) Fetch Content Models
    const Instance = InstancesAPI(instanceZUID)
    const models = await Instance.fetchModels()
    const homepageModel = models.data.find(model => model.name === 'homepage')
    console.log('homepageModelZUID: ', homepageModel.ZUID)

    // 5) Fetch Homepage Content
    const itemsResponse = await Instance.fetchModelItems(homepageModel.ZUID)
    setHomepageContent(itemsResponse.data[0])
    console.log('set homepage content')
    setInstance({
      ...instance,
      instanceZUID,
      instanceHash,
      instanceReady: true,
      modelZUID: homepageModel.ZUID
    })
  }

  async function saveContent() {
    setPage({
      ...page,
      submitted: true
    })
    const Instance = InstancesAPI(instance.instanceZUID)
    const body = {
      ...homepageContent,
      data: {
        title: page.title,
        content: page.content
      }
    }
    await Instance.editHomepage(body)
    console.log('edited homepage')
  }

  async function updateJSONSettings() {
    const Instance = InstancesAPI(instance.instanceZUID)
    const res = await Instance.fetchSettings()
    const contentJSONSetting = res.data.find(
      setting => setting.key === 'basic_content_api_enabled'
    )
    const contentCORSSetting = res.data.find(
      setting => setting.key === 'basic_content_api_cors_allow_any_origin'
    )
    await Promise.all([
      Instance.updateSetting({ ...contentJSONSetting, value: '1' }),
      Instance.updateSetting({ ...contentCORSSetting, value: '1' })
    ])
  }

  async function fetchJSONPreview() {
    setContentJSON(
      await Manager(instance.instanceHash).fetchInstantJSONPreview(
        homepageContent.meta.ZUID
      )
    )
  }

  if (hasError) {
    return <AppError />
  }

  return (
    <Wizard defaultStep={step}>
      <WizardStep
        labelButtonNext="Create your free account"
        style={{ width: '960px' }}
        locked={build === ''}>
        <BuildType buildType={build} setBuildType={type => setBuild(type)} />
      </WizardStep>

      <WizardStep style={{ width: '600px' }} buttons={false}>
        {authType === 'createAccount' && (
          <CreateAccount
            account={account}
            switchToLogin={() => setAuthType('login')}
            setAccount={(type, value) =>
              setAccount({ ...account, [type]: value })
            }
            createAccount={async e => {
              e.preventDefault()
              setAccount({
                ...account,
                submitted: true
              })
              await createAccount()
              setStep(2)
              await login()
              createInstanceWorkflow()
            }}
          />
        )}
        {authType === 'login' && (
          <Login
            account={account}
            switchToCreateAccount={() => setAuthType('createAccount')}
            setAccount={(type, value) =>
              setAccount({ ...account, [type]: value })
            }
            login={async e => {
              e.preventDefault()
              setAccount({
                ...account,
                submitted: true
              })
              await login()
              setStep(2)
              createInstanceWorkflow()
            }}
          />
        )}
      </WizardStep>

      <WizardStep style={{ width: '960px' }} showPrevButton={false}>
        <SiteCreated
          video="https://www.youtube.com/embed/aD0iVpQwONw"
          title="What are Content Model?"
          description="Content Models contain instructions (options and fields) that determine the format of the content items that can be created and stored in them. For example, let's pretend we created a content model called Person, and Person has two fields: name and date of birth. Person now serves as a model to follow when entering or editing content in the Person content model."
        />
      </WizardStep>
      <WizardStep style={{ width: '960px' }} showPrevButton={false}>
        <SiteCreated
          image="https://i.ytimg.com/vi/1qjPIMfD7_M/maxresdefault.jpg"
          title="What are Content Item?"
          description="Content Items are created from a Content Model. Which then have content added specific to that items purpose."
        />
      </WizardStep>
      <WizardStep style={{ width: '960px' }} showPrevButton={false}>
        <SiteCreated
          image="https://cdn0.capterra-static.com/screenshots/2101737/18986.png"
          title="What are Content Views?"
          description="Content Views are where you can author code which determines the visual aspect of a Content Item. By referencing the Content Model fields in your Content Views you can dynamically link a Content Item data to the visual display."
        />
      </WizardStep>

      <WizardStep
        style={{ width: '960px' }}
        labelButtonNext="Preview landing page"
        buttons={false}>
        <WithLoader
          className={styles.Loading}
          condition={instance.instanceReady}
          message="We are creating your sandbox, thanks for waiting.">
          <ContentPage
            page={page}
            setPage={(type, value) => {
              setPage({ ...page, [type]: value })
            }}
            saveContent={async e => {
              e.preventDefault()
              await saveContent()
              if (build === 'api') {
                await updateJSONSettings()
                await fetchJSONPreview()
              }
              setStep(6)
            }}
          />
        </WithLoader>
      </WizardStep>
      <WizardStep>
        <Preview
          type={build === 'api' ? 'api' : 'website'}
          json={contentJSON}
          managerURL={`${__CONFIG__.URL_MANAGER_PROTOCOL}${instance.instanceHash}${__CONFIG__.URL_MANAGER}/`}
          previewURL={`${__CONFIG__.URL_PREVIEW_PROTOCOL}${instance.instanceHash}${__CONFIG__.URL_PREVIEW}`}
        />
      </WizardStep>
    </Wizard>
  )
}
