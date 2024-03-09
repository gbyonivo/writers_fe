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
  params?: { [key: string]: any }
}

export const BottomSheetContext = React.createContext<IBottomSheetContext>(
  {} as IBottomSheetContext,
)

export function useBottomSheetContext(): IBottomSheetContext {
  const context = React.useContext<IBottomSheetContext>(BottomSheetContext)
  return context
}

interface BottomSheetAndParams {
  bottomSheet: BottomSheet | null
  params: { [key: string]: any } | null
}

function BottomSheetContextProvider({ children }) {
  const [bottomSheetAndParams, setBottomSheetAndParams] =
    useState<BottomSheetAndParams>({ bottomSheet: null, params: null })

  const selectBottomSheet = ({
    bottomSheet,
    params,
  }: SelectBottomSheetParam) => {
    setBottomSheetAndParams({ bottomSheet, params })
  }

  const resetBottomSheet = () => {
    setBottomSheetAndParams({ bottomSheet: null, params: null })
  }

  const value = useMemo(
    () => ({
      ...bottomSheetAndParams,
      selectBottomSheet,
      resetBottomSheet,
    }),
    [bottomSheetAndParams.bottomSheet, bottomSheetAndParams.params],
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
