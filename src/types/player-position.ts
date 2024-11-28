import { TrackedScreen } from '../utils/tracking/tracked-screen'

export enum PlayerPostion {
  BOTTOM = 'BOTTOM',
  ABOVE_BOTTOM = 'ABOVE_BOTTOM',
}

export const POSITION_MAP: Record<TrackedScreen, PlayerPostion> = {
  [TrackedScreen.ADD_PART_SCREEN]: PlayerPostion.BOTTOM,
  [TrackedScreen.PIECE_SCREEN]: PlayerPostion.BOTTOM,
  [TrackedScreen.PLAYER_SCREEN]: PlayerPostion.BOTTOM,
  [TrackedScreen.PROFILE_SCREEN]: PlayerPostion.ABOVE_BOTTOM,
  [TrackedScreen.NEW_PART_SCREEN]: PlayerPostion.ABOVE_BOTTOM,
  [TrackedScreen.NEW_PIECE_SCREEN]: PlayerPostion.ABOVE_BOTTOM,
  [TrackedScreen.USER_SCREEN]: PlayerPostion.BOTTOM,
  [TrackedScreen.SETTINGS_SCREEN]: PlayerPostion.ABOVE_BOTTOM,
  [TrackedScreen.HOME_SCREEN]: PlayerPostion.ABOVE_BOTTOM,
  [TrackedScreen.SEARCH_SCREEN]: PlayerPostion.ABOVE_BOTTOM,
}
