import SkeletonLoader from 'expo-skeleton-loader'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'

export function PieceListInGenreSkeleton() {
  const theme = useTheme()
  return (
    <SkeletonLoader
      highlightColor="transparent"
      duration={1000}
      boneColor={theme.colors.background}
    >
      <SkeletonLoader.Container>
        <SkeletonLoader.Item style={styles.carouselHolder} />
        <SkeletonLoader.Container style={styles.container}>
          <SkeletonLoader.Item style={styles.genreRows} />
          <SkeletonLoader.Item style={styles.genreRows} />
        </SkeletonLoader.Container>
      </SkeletonLoader.Container>
    </SkeletonLoader>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  carouselHolder: {
    alignSelf: 'center',
    width: getWidthByRatio(0.9),
    height: getHeighByRatio(0.5),
    borderRadius: 16,
    backgroundColor: 'green',
  },
  genreRows: {
    width: getWidthByRatio(1),
    height: 100,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: 'blue',
  },
})
