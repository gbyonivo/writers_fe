import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'

import { BottomSheet } from '../types/bottom-sheet'

interface SelectBottomSheetParam {
  bottomSheet: BottomSheet
  params?: { [key: string]: any }
}

interface IBottomSheetContext {
  bottomSheet?: BottomSheet
  selectBottomSheet?: (value: SelectBottomSheetParam) => void
  resetBottomSheet?: () => void
}

export const BottomSheetContext = React.createContext<IBottomSheetContext>(
  {} as IBottomSheetContext,
)

export function useBottomSheetContext(): IBottomSheetContext {
  const context = React.useContext<IBottomSheetContext>(BottomSheetContext)
  return context
}

function BottomSheetContextProvider({ children }) {
  const [bottomSheet, setBottomSheet] = useState<BottomSheet | null>(null)
  const [params, setParams] = useState<{ [key: string]: any } | null>(null)

  const selectBottomSheet = ({
    bottomSheet,
    params,
  }: SelectBottomSheetParam) => {
    setParams(params || null)
    setBottomSheet(bottomSheet)
  }

  const resetBottomSheet = () => {
    setParams(null)
    setBottomSheet(null)
  }

  const value = useMemo(
    () => ({
      bottomSheet,
      params,
      selectBottomSheet,
      resetBottomSheet,
    }),
    [bottomSheet],
  )
  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  )
}

BottomSheetContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default BottomSheetContextProvider
