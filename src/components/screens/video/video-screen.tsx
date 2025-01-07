import { useIsFocused } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useVideos } from '../../../hooks/apollo/use-videos'
import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { WriterError } from '../../common/writer-error'
import { WriterSpinner } from '../../common/writer-spinner'
import { VideoItem } from './video-item'

const videoUrl =
  'https://res.cloudinary.com/dd5vez9i8/video/upload/v1735873051/invideo-ai-480_Vampire_Murders_in_Los_Angeles__Detectiv_2025-01-03_iv8z66.mp4'

export function VideoScreen() {
  const { colors } = useTheme()
  const { videos, loading, error } = useVideos()
  const videoItemRefs = useRef({})
  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((item) => {
      const video = videoItemRefs.current[item.key]
      if (video) {
        if (item.isViewable) {
          video.play()
        } else {
          video.pause()
        }
      }
    })
  }).current
  const renderItem = ({ item, index }) => {
    console.log(item.node)
    return (
      <VideoItem
        url={item.node.url || videoUrl}
        pieceId={item.node.pieceId}
        index={index}
        ref={(ref) => {
          videoItemRefs.current = {
            ...videoItemRefs.current,
            [item.node.id]: ref,
          }
        }}
      />
    )
  }

  if (loading) {
    return <WriterSpinner />
  }
  if (error || !videos) {
    return <WriterError />
  }

  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
        },
        styles.container,
      ]}
    >
      <FlashList
        data={videos.edges}
        estimatedItemSize={getHeighByRatio(1)}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.node.id
        }}
        viewabilityConfig={{
          waitForInteraction: false,
          itemVisiblePercentThreshold: 100,
        }}
        bounces
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        onEndReachedThreshold={4}
        onEndReached={() => {
          console.log('who tf are')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: getHeighByRatio(1),
    width: getWidthByRatio(1),
  },
})
