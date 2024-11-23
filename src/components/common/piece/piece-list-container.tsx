/* eslint-disable import/order */
import { PieceType } from 'writers_shared'

import PieceListContextProvider from '../../../context/piece-list-context'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { PieceList } from './piece-list'

interface Props {
  userId?: number
  type?: PieceType
  trackedScreen: TrackedScreen
}

export function PieceListContainer({ userId, type, trackedScreen }: Props) {
  return (
    <PieceListContextProvider userId={userId} type={type}>
      <PieceList trackedScreen={trackedScreen} />
    </PieceListContextProvider>
  )
}
