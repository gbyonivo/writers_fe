import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import {
  pausePlayer,
  playPlayer,
  stopPlayer,
} from '../../../store/slices/player'
import { AppState } from '../../../types/states/AppState'
import { PlayingStatus } from '../../../types/states/PlayerState'
import { WriterIcon } from '../writer-icon'

export const PlayPauseButton = () => {
  const { status } = useSelector((state: AppState) => state.player)
  const playing = status === PlayingStatus.PLAYING
  const dispatch = useDispatch()
  const stop = () => dispatch(stopPlayer())
  const theme = useTheme()
  const additionButtonStyle = {
    backgroundColor: theme.colors.backdrop,
  }

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          playing ? dispatch(pausePlayer()) : dispatch(playPlayer())
        }}
        style={[styles.button, additionButtonStyle]}
      >
        <WriterIcon
          icon={playing ? 'pause' : 'play'}
          size={22}
          color={theme.colors.onSecondary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={stop}
        style={[styles.stopButton, styles.button, additionButtonStyle]}
      >
        <WriterIcon icon="stop" size={22} color={theme.colors.onSecondary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    borderRadius: 12,
  },
  stopButton: {
    marginLeft: 16,
  },
})
