import { PoemListContainer } from './poem-list-container'

export function PoemListForUser({ userId }: { userId: number }) {
  if (!userId) return null

  return <PoemListContainer userId={userId} />
}
