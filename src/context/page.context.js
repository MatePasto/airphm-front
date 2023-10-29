import React, { useMemo } from 'react'
import { Navigate } from 'react-router-dom'

const pageContext = React.createContext()

export const PageProvider = (props) => {
  const [pageName, setPageName] = React.useState('AirPHM')

  const value = useMemo(() => {
    return { pageName, setPageName }
  }, [Navigate])

  return <pageContext.Provider value={value} {...props} />
}

export const usePage = () => {
  const context = React.useContext(pageContext)
  if (!context) {
    throw new Error(`usePage must be used within a pageProvider`)
  }
  return context
}
