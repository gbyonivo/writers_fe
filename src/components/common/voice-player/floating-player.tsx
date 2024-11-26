import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { usePiece } from '../../../hooks/apollo/use-piece'
import { useSpeaker } from '../../../hooks/use-speaker'
import { startPlayer } from '../../../store/slices/player'
import { POSITION_MAP, PlayerPostion } from '../../../types/player-position'
import { AppState } from '../../../types/states/AppState'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { MovingText } from './moving-text'
import { PlayPauseButton } from './play-pause-button'

export function FloatingPlayer() {
  const router = useRouter()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { pieceId, partIds } = useSelector((state: AppState) => state.player)
  const { piece, loading } = usePiece(pieceId)
  const [partsOnScreen, setPartsOnScreen] = useState({
    pieceId: null,
    partIds: [],
    piece: null,
  })
  const { currentScreen } = useSelector(
    (state: AppState) => state.screenMonitor,
  )
  const position = POSITION_MAP[currentScreen]

  useEffect(() => {
    if (!pieceId || partIds.length === 0 || !piece) return
    setPartsOnScreen({
      partIds,
      pieceId,
      piece,
    })
  }, [partIds, pieceId, piece])

  const restart = useCallback(() => {
    dispatch(
      startPlayer({
        partIds: partsOnScreen.partIds,
        title: partsOnScreen.piece.title,
        pieceId: partsOnScreen.pieceId,
      }),
    )
  }, [partsOnScreen])

  const handlePress = () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        buttonName: 'Floating_Player',
      },
    })
    router.navigate(
      `/player/${partsOnScreen.piece.id}?partIds=${partsOnScreen.partIds.join(',')}`,
    )
  }

  if ((loading || !piece?.title) && position === PlayerPostion.ABOVE_BOTTOM) {
    return null
  }

  if (!partsOnScreen.piece) return null

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        { backgroundColor: theme.colors.tertiary },
        position === PlayerPostion.ABOVE_BOTTOM
          ? styles.aboveBottomPosition
          : styles.bottomPosition,
      ]}
    >
      <>
        <View style={styles.trackTitleContainer}>
          <MovingText
            style={{ ...styles.trackTitle, color: theme.colors.onSecondary }}
            text={partsOnScreen?.piece?.title ?? ''}
            animationThreshold={25}
          />
        </View>

        <View style={styles.trackControlsContainer}>
          <PlayPauseButton restart={restart} />
        </View>
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
})
