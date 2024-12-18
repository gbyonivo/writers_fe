import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import TrackPlayer, { Event } from 'react-native-track-player'
import { useSelector } from 'react-redux'

import { usePiece } from '../../../hooks/apollo/use-piece'
import { useAudioHelpers } from '../../../hooks/use-audio-funcs'
import { useAudioPermissionRequest } from '../../../hooks/use-audio-permission-request'
import { POSITION_MAP, PlayerPostion } from '../../../types/player-position'
import { AppState } from '../../../types/states/AppState'
import { onStartPlaying } from '../../../utils/signal'
import { FloatingPlayerControl } from './floating-player-control'
import { FloatingPlayerIndexControl } from './floating-player-index-control'

interface CurrentPieceAndParts {
  partIds: number[]
  pieceId: number | null
}

const DEFAULT_PIECE_AND_PART: CurrentPieceAndParts = {
  pieceId: null,
  partIds: [],
}

export function FloatingPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [trackPosition, setTrackPosition] = useState(0)
  const [trackDuration, setTrackDuration] = useState(1)
  const [positionToSeek, setPositionToSeek] = useState(-1)
  const positionToSeekTimeoutRef = useRef(null)
  const [currentPieceAndPart, setCurrentPieceAndPart] =
    useState<CurrentPieceAndParts>(DEFAULT_PIECE_AND_PART)
  const [urls, setUrls] = useState([])
  const askForPermission = useAudioPermissionRequest()
  const position = useSelector(
    (state: AppState) => POSITION_MAP[state.screenMonitor.currentScreen],
  )
  const currentPieceAndPartRef = useRef<CurrentPieceAndParts>(
    DEFAULT_PIECE_AND_PART,
  )
  const { piece } = usePiece(currentPieceAndPart.pieceId)
  const urlsRef = useRef<string[]>([])
  const { fetchUrlsForParts } = useAudioHelpers({
    ...currentPieceAndPart,
    onDoneFetchingUrls: setUrls,
  })
  const hasChanged = !(
    currentPieceAndPart.pieceId === currentPieceAndPartRef.current.pieceId &&
    JSON.stringify(currentPieceAndPart.partIds) ===
      JSON.stringify(currentPieceAndPartRef.current.partIds)
  )
  const resetPlayer = () => {
    currentPieceAndPartRef.current = DEFAULT_PIECE_AND_PART
    setCurrentPieceAndPart(DEFAULT_PIECE_AND_PART)
    setUrls([])
    urlsRef.current = []
    setPositionToSeek(-1)
  }

  useEffect(() => {
    if (!hasChanged) {
      return
    }
    if (currentPieceAndPart.partIds && currentPieceAndPart.pieceId) {
      fetchUrlsForParts(currentPieceAndPart)
    }

    currentPieceAndPartRef.current = currentPieceAndPart
  }, [currentPieceAndPart, hasChanged])

  useEffect(() => {
    if (JSON.stringify(urlsRef.current) === JSON.stringify(urls)) {
      return
    }
    TrackPlayer.reset()
    urls.forEach((url) => {
      TrackPlayer.add({ url })
    })
    TrackPlayer.play()
    urlsRef.current = urls
  }, [urls])

  useEffect(() => {
    TrackPlayer.updateOptions({
      progressUpdateEventInterval: 1,
    })
    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
      resetPlayer()
    })
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, (e) => {
      setCurrentIndex(e.index)
    })
    TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
      setIsPaused(state === 'paused')
    })
    TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, (progress) => {
      setTrackDuration(progress.duration)
      setTrackPosition(progress.position)
    })
  }, [])

  useEffect(() => {
    let removeListener = null
    if (onStartPlaying.getNumberOfListeners() < 1) {
      removeListener = onStartPlaying.listen(({ pieceId, partIds }) => {
        setCurrentPieceAndPart({ partIds, pieceId })
      })
    }
    return () => {
      removeListener?.()
    }
  }, [])

  useEffect(() => {
    positionToSeekTimeoutRef.current = setTimeout(async () => {
      if (positionToSeek < 0) {
        return
      }
      await TrackPlayer.seekTo(positionToSeek)
    }, 100)
    return () => clearTimeout(positionToSeekTimeoutRef.current)
  }, [positionToSeek])

  return (
    <View
      style={[
        styles.container,
        // { backgroundColor: colors.background },
        position === PlayerPostion.ABOVE_BOTTOM
          ? styles.aboveBottomPosition
          : styles.bottomPosition,
      ]}
    >
      <FloatingPlayerIndexControl
        partIds={currentPieceAndPart.partIds}
        handlePressIndexControl={async (index: number) => {
          await TrackPlayer.skip(index)
        }}
      />
      <FloatingPlayerControl
        durationMillis={trackDuration}
        positionMillis={trackPosition}
        currentPartId={currentPieceAndPart.partIds[currentIndex]}
        handlePause={() => TrackPlayer.pause()}
        handleUnpause={() => TrackPlayer.play()}
        handleStop={() => {
          TrackPlayer.stop()
          resetPlayer()
        }}
        handleSeek={async (position: number) => {
          setPositionToSeek(position)
        }}
        piece={piece}
        isPaused={isPaused}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.8,
    borderRadius: 12,
  },
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    padding: 8,
    paddingVertical: 10,
    position: 'absolute',
    zIndex: 900,
    borderRadius: 12,
  },
  bottomPosition: {
    left: 4,
    right: 4,
    bottom: 24,
  },
  aboveBottomPosition: {
    left: 8,
    right: 8,
    bottom: 84,
  },
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 10,
  },
  trackTitle: {
    fontSize: 18,
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: -16,
  },
  image: { height: 44, width: 44, borderRadius: 4 },
  controlContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  imageAndTitleContainer: {
    flexDirection: 'row',
  },
  playPauseContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  indexContainer: {
    marginBottom: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  indexItem: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 80,
    borderRadius: 8,
  },
})
