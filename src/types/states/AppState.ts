import { AudioState } from './AudioState'
import { GenreState } from './GenreState'
import { LoginState } from './LoginState'
import { PieceState } from './PieceState'
import { PlayerState } from './PlayerState'
import { SearchState } from './SearchState'
import { SettingsState } from './SettingState'
import { SuggestionState } from './SuggestionState'
import { ScreenMonitorState } from './screen-monitor-state'

export interface AppState {
  login: LoginState
  settings: SettingsState
  piece: PieceState
  search: SearchState
  genre: GenreState
  player: PlayerState
  suggestion: SuggestionState
  screenMonitor: ScreenMonitorState
  audio: AudioState
}
