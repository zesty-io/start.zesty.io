import React, { useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 }
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 }
    default:
      return state
  }
}

const initialState = {
  step: 0
}

const AppStateContext = React.createContext(initialState)
const AppDispatchContext = React.createContext()

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export { AppStateContext, AppProvider }
