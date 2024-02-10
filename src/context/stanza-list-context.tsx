import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

interface IStanzaListContext {
  getStanza: () => null
}

export const StanzaListContext = React.createContext<IStanzaListContext>(
  {} as IStanzaListContext,
)

export function useStanzaListContext(): IStanzaListContext {
  return React.useContext<IStanzaListContext>(StanzaListContext)
}

function StanzaListContextProvider({ children }) {
  const value: IStanzaListContext = useMemo(
    () => ({ getStanza: () => null }),
    [],
  )
  return (
    <StanzaListContext.Provider value={value}>
      {children}
    </StanzaListContext.Provider>
  )
}

StanzaListContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default StanzaListContextProvider
