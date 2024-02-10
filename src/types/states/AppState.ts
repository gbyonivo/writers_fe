import { LoginState } from './LoginState'
import { PoemState } from './PoemState'
import { SettingsState } from './SettingState'

export interface AppState {
  login: LoginState
  settings: SettingsState
  poem: PoemState
}
