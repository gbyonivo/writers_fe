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
