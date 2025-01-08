import { useIsFocused } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Video, { VideoRef } from 'react-native-video'

import { usePiece } from '../../../hooks/apollo/use-piece'
import { useOnFocus } from '../../../hooks/use-on-focus'
import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { WriterBottomSheet } from '../../common/writer-bottom-sheet'
import { WriterIcon } from '../../common/writer-icon'
import { WriterText } from '../../common/writer-text'
import { VideoItemBottomSheet } from './video-item-bottom-sheet'
import { VideoItemRightControls } from './video-item-right-controls'

interface Props {
  url: string
  index: number
  pieceId: number
  videoId: number
}

export const VideoItem = forwardRef(function VideoItemInner(
  { url, pieceId, videoId }: Props,
  ref,
) {
  const videoRef = useRef<VideoRef>(null)
  const router = useRouter()
  const [paused, setPaused] = useState(true)
  const isFocused = useIsFocused()
  const { colors } = useTheme()
  const { piece } = usePiece(pieceId)
  const { top } = useSafeAreaInsets()
  const bottomsheetRef = useRef()

  useImperativeHandle(ref, () => ({
    play: () => {
      setPaused(false)
    },
    pause: () => {
      setPaused(true)
    },
  }))

  const props = {
    size: 32,
    color: colors.onBackground,
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={() => setPaused(true)}
        onPressOut={() => setPaused(false)}
        style={styles.container}
      >
        <Video
          source={{ uri: url }}
          ref={videoRef}
          onError={(error) => {
            console.log('video-error', error)
          }}
          style={styles.backgroundVideo}
          paused={paused || !isFocused}
          repeat
        />
      </TouchableOpacity>
      <View style={[styles.title, { top: top + 16 }]}>
        <WriterText align="center" fontFamily="Medium">
          {piece?.title}
        </WriterText>
      </View>
      <VideoItemRightControls
        pieceId={pieceId}
        togglePause={() => setPaused(!paused)}
        paused={paused}
        bottomsheetRef={bottomsheetRef}
      />
      <VideoItemBottomSheet ref={bottomsheetRef} videoId={videoId} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    height: getHeighByRatio(1),
    width: getWidthByRatio(1),
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  video: {
    width: 350,
    height: 275,
  },
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
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
})
