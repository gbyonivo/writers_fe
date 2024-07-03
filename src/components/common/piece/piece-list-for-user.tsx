import { PieceListContainer } from './piece-list-container'

export function PieceListForUser({ userId }: { userId: number }) {
  if (!userId) return null

  return <PieceListContainer userId={userId} />
}
