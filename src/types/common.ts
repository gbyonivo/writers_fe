import { ImageSourcePropType } from 'react-native'

export enum PROCESSING_STAGE {
  PRE_PROCESSING = 'PRE_PROCESSING',
  PROCESSING = 'PROCESSING',
  ERROR_PROCESSING = 'ERROR_PROCESSING',
  DONE_PROCESSING = 'DONE_PROCESSING',
}

export interface Option {
  label: string
  value: string | number
}

export interface CommonFormTarget {
  name: string
  value: any
}

export type OnChangeParams = { target: CommonFormTarget }

export type OnChange = (val: OnChangeParams) => void

export interface SelectOption {
  value: string
  label: string
  extraLabel?: string
  disabled?: boolean
  image?: ImageSourcePropType
}
