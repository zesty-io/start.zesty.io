import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import randomWords from 'random-words'

import { WithLoader } from '@zesty-io/core/WithLoader'

import { Wizard, WizardStep } from '../Wizard'

import { BuildType } from './components/BuildType'
import { CreateAccount } from './components/CreateAccount'
import Login from './components/Login'
import { SiteCreated } from './components/SiteCreated'
import { ContentPage } from './components/ContentPage'
import { SitePreview } from './components/SitePreview'
// import { notify } from '../Notifications'

import Auth from '../../api/auth'
import Accounts from '../../api/accounts'
import Manager from '../../api/manager'
import InstancesAPI from '../../api/instances'

import styles from './GettingStarted.less'

export default function GettingStarted() {
  const [authType, setAuthType] = useState('createAccount')
  const [step, setStep] = useState(null)
  const [build, setBuild] = useState('')
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
      name: randomWords({ exactly: 3, join: ' ' })
    })
    const instanceZUID = instanceResponse.data.ZUID
    const instanceHash = instanceResponse.data.randomHashID
    console.log('created instance')
    setInstance(instance => {
      return {
        ...instance,
        instanceZUID,
        instanceHash
      }
    })

    // 2) Set Blueprint
    await Accounts.updateBlueprint(instanceZUID, 37)
    console.log('blueprint set')

    // 3) Populate Instance
    await Manager(instanceHash).get()
    setInstance(instance => {
      return { ...instance, instanceReady: true }
    })
    console.log('instance populated')

    // 4) Fetch Content Models
    const Instance = InstancesAPI(instanceZUID)
    const models = await Instance.fetchModels()
    const homepageModel = models.data.find(model => model.name === 'homepage')
    setInstance(instance => {
      return { ...instance, modelZUID: homepageModel.ZUID }
    })
    console.log('homepageModelZUID: ', homepageModel.ZUID)

    // 5) Fetch Homepage Content
    const itemsResponse = await Instance.fetchModelItems(homepageModel.ZUID)
    setHomepageContent(itemsResponse.data[0])
    console.log('set homepage content')
  }

  async function saveContent() {
    const Instance = InstancesAPI(instance.instanceZUID)
    const body = {
      ...homepageContent,
      data: {
        title: page.title,
        content: page.content
      }
    }
    const content = await Instance.editHomepage(body)
    console.log('edited homepage')
  }

  return (
    <Wizard defaultStep={step}>
      <WizardStep
        onNext={() => setBuild(build)}
        labelButtonNext="Create your free account"
        style={{ width: '960px' }}>
        <BuildType buildType={build} setBuildType={type => setBuild(type)} />
      </WizardStep>

      <WizardStep style={{ width: '750px' }} buttons={false}>
        {authType === 'createAccount' && (
          <CreateAccount
            account={account}
            switchToLogin={() => setAuthType('login')}
            setAccount={(type, value) =>
              setAccount({ ...account, [type]: value })
            }
            createAccount={async e => {
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
              await login()
              setStep(2)
              createInstanceWorkflow()
            }}
          />
        )}
      </WizardStep>

      <WizardStep style={{ width: '960px' }}>
        <SiteCreated
          image="https://i.ytimg.com/vi/1qjPIMfD7_M/maxresdefault.jpg"
          title="Schema"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
      </WizardStep>
      <WizardStep style={{ width: '960px' }}>
        <SiteCreated
          image="https://madewithnetwork.ams3.cdn.digitaloceanspaces.com//spatie-space-production/3212/zesty-io-2.jpg"
          title="Content"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
      </WizardStep>
      <WizardStep style={{ width: '960px' }}>
        <SiteCreated
          image="https://cdn0.capterra-static.com/screenshots/2101737/18986.png"
          title="Code"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
      </WizardStep>

      <WizardStep
        onNext={() => saveContent()}
        style={{ width: '960px' }}
        labelButtonNext="Preview landing page"
        buttons={instance.instanceReady}>
        <WithLoader
          className={styles.Loading}
          condition={instance.instanceReady}
          message="Creating Instance">
          <ContentPage
            page={page}
            setPage={(type, value) => {
              setPage(page => {
                return { ...page, [type]: value }
              })
            }}
          />
        </WithLoader>
      </WizardStep>
      <WizardStep>
        <SitePreview
          previewPage={`https://${instance.instanceHash}-dev.preview.stage.zesty.io/`}
          dashboardPage={`https://${instance.instanceHash}.stage-manage.zesty.io/`}
        />
      </WizardStep>
    </Wizard>
  )
}
