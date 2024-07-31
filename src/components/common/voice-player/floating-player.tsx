import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { useSpeaker } from '../../../hooks/use-speaker'
import { AppState } from '../../../types/states/AppState'
import { MovingText } from './moving-text'
import { PlayPauseButton } from './play-pause-button'

export function FloatingPlayer() {
  const router = useRouter()
  const theme = useTheme()
  const { title } = useSelector((state: AppState) => state.player)
  useSpeaker()

  const handlePress = () => {
    router.navigate('/player')
  }

  if (!title) return null

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, { backgroundColor: theme.colors.secondary }]}
    >
      <>
        <View style={styles.trackTitleContainer}>
          <MovingText
            style={{ ...styles.trackTitle, color: theme.colors.onSecondary }}
            text={title ?? ''}
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
    borderRadius: 12,
    paddingVertical: 10,
    position: 'absolute',
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
