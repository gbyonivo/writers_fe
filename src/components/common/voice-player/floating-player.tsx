import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { usePiece } from '../../../hooks/apollo/use-piece'
import { useSpeaker } from '../../../hooks/use-speaker'
import { POSITION_MAP, PlayerPostion } from '../../../types/player-position'
import { AppState } from '../../../types/states/AppState'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { MovingText } from './moving-text'
import { PlayPauseButton } from './play-pause-button'

export function FloatingPlayer() {
  const router = useRouter()
  const theme = useTheme()
  const { pieceId } = useSelector((state: AppState) => state.player)
  const { piece, loading } = usePiece(pieceId)
  const { currentScreen } = useSelector(
    (state: AppState) => state.screenMonitor,
  )
  const position = POSITION_MAP[currentScreen]

  const handlePress = () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        buttonName: 'Floating_Player',
      },
    })
    router.navigate(`/player/${pieceId}`)
  }

  if (loading || !piece?.title) return null

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
            text={piece.title ?? ''}
            animationThreshold={25}
          />
        </View>

        <View style={styles.trackControlsContainer}>
          <PlayPauseButton />
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
