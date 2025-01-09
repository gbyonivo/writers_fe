import { Theme } from '../Theme'

export interface SettingsState {
  theme: Theme | null
  shouldChainParts: boolean
  shouldShowTextBasedDesign: boolean
  shouldUseAiForOnlyTips: boolean
  isAdmin: boolean
  images: string[]
}
