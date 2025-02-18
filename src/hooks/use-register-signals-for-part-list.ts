import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'

import {
  onGoToPlayerSignal,
  onPlayPieceSignal,
  onSharePieceSignal,
  onStartPlayingSignal,
} from '../utils/signal'
import { useCopyParts } from './use-copy-parts'

export const useRegisterSignalsForPartList = ({ pieceId, positionMap }) => {
  const router = useRouter()
  const positionMapRef = useRef(positionMap)
  const { writeToClipboard } = useCopyParts({
    partIds: Object.values(positionMap),
  })

  useEffect(() => {
    positionMapRef.current = positionMap
  }, [positionMap])

  useEffect(() => {
    let removeListener = null
    if (onPlayPieceSignal.getNumberOfListeners() < 1) {
      removeListener = onPlayPieceSignal.listen(() => {
        onStartPlayingSignal.emit({
          partIds: Object.values(positionMapRef.current),
          pieceId,
        })
        router.navigate(
          `/player/${pieceId}?partIds=${Object.values(positionMapRef.current).join(',')}`,
        )
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  useEffect(() => {
    let removeListener = null
    if (onGoToPlayerSignal.getNumberOfListeners() < 1) {
      removeListener = onGoToPlayerSignal.listen(() => {
        router.navigate(
          `/player/${pieceId}?partIds=${Object.values(positionMapRef.current).join(',')}`,
        )
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  useEffect(() => {
    let removeListener = null
    if (onSharePieceSignal.getNumberOfListeners() < 1) {
      removeListener = onSharePieceSignal.listen(() => {
        writeToClipboard()
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])
}
