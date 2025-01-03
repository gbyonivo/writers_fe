import { useIsFocused } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { VideoItem } from './video-item'

const videoUrl =
  'https://res.cloudinary.com/dd5vez9i8/video/upload/v1735873051/invideo-ai-480_Vampire_Murders_in_Los_Angeles__Detectiv_2025-01-03_iv8z66.mp4'

const data = [
  { id: 1, url: videoUrl },
  { id: 2, url: videoUrl },
  { id: 3, url: videoUrl },
]

export function VideoScreen() {
  const { colors } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(null)
  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    setCurrentIndex(changed[0]?.index)
  }).current
  const isFocused = useIsFocused()
  const renderItem = ({ item, index }) => {
    return (
      <VideoItem
        url={item.url}
        index={index}
        paused={currentIndex !== index || !isFocused}
      />
    )
  }

  return (
    <View style={{ backgroundColor: colors.background }}>
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.id
        }}
        viewabilityConfig={{
          waitForInteraction: false,
          itemVisiblePercentThreshold: 75,
        }}
        bounces
        initialNumToRender={1}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
      /> */}
      <VideoItem url={videoUrl} paused={!isFocused} index={1} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})
