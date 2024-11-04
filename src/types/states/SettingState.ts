import { Theme } from '../Theme'

export interface SettingsState {
  theme: Theme | null
  shouldChainParts: boolean
  shouldShowTextBasedDesgin: boolean
  shouldUseAiForOnlyTips: boolean
}
