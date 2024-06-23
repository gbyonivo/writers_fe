import { LoginState } from './LoginState'
import { PoemState } from './PoemState'
import { SearchState } from './SearchState'
import { SettingsState } from './SettingState'

export interface AppState {
  login: LoginState
  settings: SettingsState
  poem: PoemState
  search: SearchState
}
