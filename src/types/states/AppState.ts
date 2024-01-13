import { LoginState } from './LoginState'
import { SettingsState } from './SettingState'

export interface AppState {
  login: LoginState
  settings: SettingsState
}
