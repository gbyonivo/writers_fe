import { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Video, { VideoRef } from 'react-native-video'

import { useOnFocus } from '../../../hooks/use-on-focus'
import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'

interface Props {
  url: string
  index: number
  paused: boolean
}

export function VideoItem({ url, index, paused }: Props) {
  useOnFocus(() => {
    console.log(index, url)
  })
  const videoRef = useRef<VideoRef>(null)
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: url }}
        ref={videoRef}
        onError={(error) => {
          console.log('video -error', error)
        }}
        style={styles.backgroundVideo}
        paused={paused}
      />
    </View>
  )
}

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
})
