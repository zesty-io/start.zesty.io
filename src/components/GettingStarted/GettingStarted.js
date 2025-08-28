import React, { useState } from 'react'
import Cookies from 'js-cookie'
import * as Sentry from '@sentry/react'

import { WithLoader } from '@zesty-io/core/WithLoader'

import { Wizard, WizardStep } from '../Wizard'

import { BuildType } from './components/BuildType'
import { CreateAccount } from './components/CreateAccount'
// import Login from './components/Login'
import { SelectRole } from './components/SelectRole'
import { SiteCreated } from './components/SiteCreated'
import { ContentPage } from './components/ContentPage'
import { Preview } from './components/Preview'

import { client } from '../../api/client'
import Auth from '../../api/auth'
import Accounts from '../../api/accounts'
import Manager from '../../api/manager'
import InstancesAPI from '../../api/instances'

import styles from './GettingStarted.less'
export default function GettingStarted() {
  const [authType, setAuthType] = useState('createAccount')
  const [step, setStep] = useState(0)
  const [build, setBuild] = useState('')

  const buildNames = {
    landingpage: 'Landing Page',
    corporate: 'Corporate Website',
    api: 'Headless'
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

  const [role, setRole] = useState('')

  async function createAccount() {
    try {
      const userResponse = await Accounts.createAccount({
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        password: account.password
      })
      setAccount({ ...account, ZUID: userResponse.ZUID })
    } catch (err) {
      if (err.error.includes('Duplicate entry')) {
        setAccount({
          ...account,
          submitted: false,
          message: 'Email address is already registered.'
        })
      }
      return false
    }
    return true
  }

  async function login() {
    const {
      meta: { token }
    } = await Auth.login({ email: account.email, password: account.password })

    Cookies.set(__CONFIG__.COOKIE_NAME, token, {
      path: '/',
      domain: __CONFIG__.COOKIE_DOMAIN
    })
  }

  async function createInstanceWorkflow() {
    // 1) Create Instance
    const instanceResponse = await Accounts.createInstance({
      name: buildNames[build]
    })
    const instanceZUID = instanceResponse.data.ZUID
    const instanceHash = instanceResponse.data.randomHashID
    const blueprintZUID = '14-64329e0-555677'

    // 2) Set Blueprint
    await Accounts.updateBlueprint(instanceZUID, blueprintZUID)

    // 3) Fetch Content Models
    const Instance = InstancesAPI(instanceZUID)
    const models = await Instance.fetchModels()
    const homepageModel = models.data.find(model => model.name === 'homepage')

    // 4) Fetch Homepage Content
    const itemsResponse = await Instance.fetchModelItems(homepageModel.ZUID)
    setHomepageContent(itemsResponse.data[0])
    setInstance({
      ...instance,
      instanceZUID,
      instanceHash,
      instanceReady: true,
      modelZUID: homepageModel.ZUID,
      itemZUID: itemsResponse.data[0].meta.ZUID
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

  async function captureRole() {
    return client('https://us-central1-zesty-prod.cloudfunctions.net')(
      'onboardQuestion',
      {
        body: {
          question: 'What is your Role?',
          answer: role,
          path: window.location.href,
          email: account.email
        }
      }
    )
  }

  async function captureWebsiteType() {
    return client('https://us-central1-zesty-prod.cloudfunctions.net')(
      'onboardQuestion',
      {
        body: {
          question: 'Where is your content going?',
          answer: build === 'api' ? 'headless' : 'website',
          path: window.location.href,
          email: account.email
        }
      }
    )
  }

  function attachUserToSentry() {
    Sentry.setUser({
      id: account.ZUID,
      email: account.email,
      username: `${account.firstName} ${account.lastName}`
    })
  }

  return (
    <Wizard defaultStep={step} style={{ width: '960px' }}>
      <WizardStep
        labelButtonNext="1/7 Create your free account"
        locked={build === ''}>
        <BuildType buildType={build} setBuildType={type => setBuild(type)} />
      </WizardStep>

      <WizardStep buttons={false} labelButtonNext="2/7 Select your role">
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
              const created = await createAccount()
              if (created) {
                setStep(2)
                await login()
                attachUserToSentry()
                captureWebsiteType()
                createInstanceWorkflow()
              }
            }}
          />
        )}
        {/* {authType === 'login' && (
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
        )} */}
      </WizardStep>

      <WizardStep
        labelButtonNext="3/7 Learn about Content Models"
        showPrevButton={false}
        locked={role === ''}
        onNext={captureRole}>
        <SelectRole role={role} setRole={setRole} />
      </WizardStep>

      <WizardStep
        showPrevButton={false}
        labelButtonNext="4/7 Learn about Content Items">
        <SiteCreated
          video="https://www.youtube.com/embed/aD0iVpQwONw"
          title="What are Content Models?"
          description="Content Models contain instructions (options and fields) that determine the format of the content items that can be created and stored in them. For example, let's pretend we created a content model called Person, and Person has two fields: name and date of birth. Person now serves as a model to follow when entering or editing content in the Person content model."
        />
      </WizardStep>

      <WizardStep
        showPrevButton={false}
        labelButtonNext="5/7 Learn about Content Views">
        <SiteCreated
          image="https://i.ytimg.com/vi/1qjPIMfD7_M/maxresdefault.jpg"
          title="What are Content Items?"
          description="Content Items are created from a Content Model. Which then have content added specific to that items purpose."
        />
      </WizardStep>
      <WizardStep showPrevButton={false} labelButtonNext="6/7 Add content">
        <SiteCreated
          image="https://cdn0.capterra-static.com/screenshots/2101737/18986.png"
          title="What are Content Views?"
          description="Content Views are where you can author code which determines the visual aspect of a Content Item. By referencing the Content Model fields in your Content Views you can dynamically link a Content Item data to the visual display."
        />
      </WizardStep>

      <WizardStep buttons={false}>
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
              setStep(7)
            }}
          />
        </WithLoader>
      </WizardStep>
      <WizardStep>
        <Preview
          type={build === 'api' ? 'api' : 'website'}
          json={contentJSON}
          managerURL={`${__CONFIG__.URL_MANAGER_PROTOCOL}${instance.instanceZUID}${__CONFIG__.URL_MANAGER}/content/${instance.modelZUID}/${instance.itemZUID}`}
          previewURL={`${__CONFIG__.URL_PREVIEW_PROTOCOL}${instance.instanceHash}${__CONFIG__.URL_PREVIEW}`}
          instantApiURL={`${__CONFIG__.URL_PREVIEW_PROTOCOL}${instance.instanceHash}${__CONFIG__.URL_PREVIEW}/-/instant/${instance.modelZUID}.json`}
        />
      </WizardStep>
    </Wizard>
  )
}
