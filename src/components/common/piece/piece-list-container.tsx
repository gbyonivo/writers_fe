/* eslint-disable import/order */
import PieceListContextProvider from '../../../context/piece-list-context'
import { PieceList } from './piece-list'

interface Props {
  userId?: number
}

export function PieceListContainer({ userId }: Props) {
  return (
    <PieceListContextProvider userId={userId}>
      <PieceList />
    </PieceListContextProvider>
  )
}
