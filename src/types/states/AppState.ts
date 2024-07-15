import { GenreState } from './GenreState'
import { LoginState } from './LoginState'
import { PieceState } from './PieceState'
import { SearchState } from './SearchState'
import { SettingsState } from './SettingState'

export interface AppState {
  login: LoginState
  settings: SettingsState
  piece: PieceState
  search: SearchState
  genre: GenreState
}
