import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { Part, Piece } from 'writers_shared/dist'

import { usePartsByIds } from '../../../hooks/apollo/use-parts-by-ids'
import { AppState } from '../../../types/states/AppState'
import { getWidthByRatio } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterText } from '../writer-text'
import { MovingText } from './moving-text'
import { PlayPauseButton } from './play-pause-button'
import { SeekBar } from './seek-bar'

interface FloatingPlayerControlProps {
  durationMillis: number
  positionMillis: number
  currentPartId: number
  isPaused: boolean
  handleStop: () => void
  handlePause: () => void
  handleUnpause: () => void
  handleSeek: (newPosition: number) => void
  piece: Piece
  pieceId: number
  partIds: number[]
}

export function FloatingPlayerControl({
  durationMillis,
  positionMillis,
  currentPartId,
  piece,
  isPaused,
  pieceId,
  partIds,
  handlePause,
  handleSeek,
  handleStop,
  handleUnpause,
}: FloatingPlayerControlProps) {
  const router = useRouter()

  const { colors } = useTheme()
  const { parts: [part] = [] } = usePartsByIds({ partIds: [currentPartId] })

  const handlePress = () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        buttonName: 'Floating_Player',
      },
    })
    router.navigate(`/player/${pieceId}?partIds=${partIds.join(',')}`)
  }

  if (!piece && !part) {
    return null
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.controlContainer]}>
        <LinearGradient
          colors={[
            colors.background,
            // @ts-ignore
            colors.scrim,
            colors.background,
          ]}
          style={[styles.linearGradient]}
          start={{ x: 0.2, y: 0.6 }}
        />
        <View style={styles.playPauseContainer}>
          <View style={styles.imageAndTitleContainer}>
            <Image source={{ uri: piece.imageUrl }} style={styles.image} />
            <View>
              <View style={styles.trackTitleContainer}>
                <MovingText
                  text={piece?.title}
                  animationThreshold={8}
                  style={{ color: colors.onBackground }}
                />
              </View>
              <View style={styles.trackTitleContainer}>
                <WriterText
                  size={12}
                  fontFamily="Medium"
                  color={colors.outlineVariant}
                >
                  {part?.user?.name}
                </WriterText>
              </View>
            </View>
          </View>
          <PlayPauseButton
            playOrPause={isPaused ? handleUnpause : handlePause}
            paused={isPaused}
            stop={handleStop}
          />
        </View>
        <SeekBar
          durationMillis={durationMillis || 1}
          positionMillis={positionMillis || 0}
          onSeek={handleSeek}
          containerStyle={styles.seekBarContainer}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.8,
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 10,
    width: getWidthByRatio(1) - 240,
  },
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -16,
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
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 80,
    borderRadius: 8,
  },
  seekBarContainer: {
    marginTop: -16,
  },
})
