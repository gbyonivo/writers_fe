/* eslint-disable import/order */
import { PieceType } from 'writers_shared'

import PieceListContextProvider from '../../../context/piece-list-context'
import { PieceList } from './piece-list'

interface Props {
  userId?: number
  type?: PieceType
}

export function PieceListContainer({ userId, type }: Props) {
  return (
    <PieceListContextProvider userId={userId} type={type}>
      <PieceList />
    </PieceListContextProvider>
  )
}
