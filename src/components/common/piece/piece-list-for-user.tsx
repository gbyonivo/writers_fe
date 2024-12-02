import { PieceType } from 'writers_shared'

import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { PieceListContainer } from './piece-list-container'

export function PieceListForUser({
  userId,
  type,
}: {
  userId: number
  type?: PieceType
}) {
  if (!userId) return null
  return (
    <PieceListContainer
      userId={userId}
      type={type}
      trackedScreen={TrackedScreen.USER_SCREEN}
    />
  )
}
