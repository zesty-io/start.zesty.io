import React, { useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_TYPE':
      return { ...state, buildType: action.payload }
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    default:
      return state
  }
}

const initialState = {
  buildType: '',
  account: {
    message: '',
    submitted: false,
    email: '',
    firstName: '',
    lastName: '',
    pass: '',
    sbmitted: false,
    eula: false
  },
  page: {
    title: '',
    description: '',
    image: []
  }
}

const AppStateContext = React.createContext(initialState)

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

export { AppStateContext, AppProvider }
