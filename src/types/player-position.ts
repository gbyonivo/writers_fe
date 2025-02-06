import { TrackedScreen } from '../utils/tracking/tracked-screen'

export enum PlayerPosition {
  BOTTOM = 'BOTTOM',
  ABOVE_BOTTOM = 'ABOVE_BOTTOM',
  NONE = 'NONE',
}

export const POSITION_MAP: Record<TrackedScreen, PlayerPosition> = {
  [TrackedScreen.ADD_PART_SCREEN]: PlayerPosition.BOTTOM,
  [TrackedScreen.PIECE_SCREEN]: PlayerPosition.BOTTOM,
  [TrackedScreen.PLAYER_SCREEN]: PlayerPosition.BOTTOM,
  [TrackedScreen.PROFILE_SCREEN]: PlayerPosition.ABOVE_BOTTOM,
  [TrackedScreen.NEW_PART_SCREEN]: PlayerPosition.ABOVE_BOTTOM,
  [TrackedScreen.NEW_PIECE_SCREEN]: PlayerPosition.ABOVE_BOTTOM,
  [TrackedScreen.USER_SCREEN]: PlayerPosition.BOTTOM,
  [TrackedScreen.SETTINGS_SCREEN]: PlayerPosition.ABOVE_BOTTOM,
  [TrackedScreen.HOME_SCREEN]: PlayerPosition.ABOVE_BOTTOM,
  [TrackedScreen.SEARCH_SCREEN]: PlayerPosition.ABOVE_BOTTOM,
  [TrackedScreen.VIDEO_SCREEN]: PlayerPosition.NONE,
  [TrackedScreen.EDIT_PART_SCREEN]: PlayerPosition.NONE,
  [TrackedScreen.SCRIPT_SCREEN]: PlayerPosition.NONE,
}
