import { PieceType } from 'writers_shared'

import { PieceListContainer } from './piece-list-container'

export function PieceListForUser({
  userId,
  type,
}: {
  userId: number
  type?: PieceType
}) {
  if (!userId) return null
  return <PieceListContainer userId={userId} type={type} />
}
