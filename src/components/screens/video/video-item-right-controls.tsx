import { useRouter } from 'expo-router'
import { forwardRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { WriterIcon } from '../../common/writer-icon'
import { WriterText } from '../../common/writer-text'

interface Props {
  togglePause: () => void
  paused: boolean
  pieceId: number
  bottomsheetRef: any
}

export function VideoItemRightControls({
  paused,
  togglePause,
  pieceId,
  bottomsheetRef,
}: Props) {
  const router = useRouter()
  const { colors } = useTheme()

  const props = {
    size: 32,
    color: colors.onBackground,
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.playPause, styles.button]}
        onPress={togglePause}
      >
        <View style={styles.iconWrapper}>
          <WriterIcon icon={paused ? 'play' : 'pause'} {...props} />
        </View>
        <WriterText align="center">{`${paused ? 'Play' : 'Pause'}`}</WriterText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.script, styles.button]}
        onPress={() => {
          // @ts-ignore
          bottomsheetRef.current?.expand?.()
        }}
      >
        <View style={styles.iconWrapper}>
          <WriterIcon icon="notebook" {...props} />
        </View>
        <WriterText align="center">Script</WriterText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.piece, styles.button]}
        onPress={() => router.push(`/pieces/${pieceId}`)}
      >
        <View style={styles.iconWrapper}>
          <WriterIcon icon="book" {...props} />
        </View>
        <WriterText align="center">Piece</WriterText>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  script: {
    bottom: 120,
  },
  piece: {
    bottom: 200,
  },
  playPause: {
    bottom: 280,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    justifyContent: 'center',
    right: 16,
    width: 60,
  },
})
