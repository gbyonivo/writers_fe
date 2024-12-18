import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { stopPlayer } from '../../../store/slices/player'
import { AppState } from '../../../types/states/AppState'
import { PlayingStatus } from '../../../types/states/PlayerState'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterIcon } from '../writer-icon'

interface Props {
  playOrPause: () => void
  stop: () => void
  paused: boolean
}

export const PlayPauseButton = ({ playOrPause, stop, paused }: Props) => {
  const { status, partIds, pieceId } = useSelector(
    (state: AppState) => state.player,
  )
  const theme = useTheme()
  const additionButtonStyle = {
    // backgroundColor: theme.colors.backdrop,
  }

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              partIds,
              pieceId,
              buttonName: `${!paused ? 'Pause_Piece_Audio' : 'Play_Piece_Audio'}`,
            },
          })
          playOrPause()
        }}
        style={[styles.button, additionButtonStyle]}
      >
        <WriterIcon
          icon={!paused ? 'pause' : 'play'}
          size={22}
          color={theme.colors.onBackground}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              partIds,
              pieceId,
              buttonName: 'Stop Piece Audio',
            },
          })
          stop()
        }}
        style={[styles.stopButton, styles.button, additionButtonStyle]}
      >
        <WriterIcon icon="stop" size={22} color={theme.colors.onBackground} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
  },
  button: {
    padding: 8,
    borderRadius: 12,
  },
  stopButton: {
    marginLeft: 16,
  },
})
