import SkeletonLoader from 'expo-skeleton-loader'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { WriterText } from '../../common/writer-text'

export function PieceListInGenreSkeleton() {
  return (
    <SkeletonLoader>
      <SkeletonLoader.Container>
        <SkeletonLoader.Item style={styles.carouselHolder} />
        <SkeletonLoader.Container style={{ paddingVertical: 10 }}>
          <SkeletonLoader.Item style={styles.genreRows} />
          <SkeletonLoader.Item style={styles.genreRows} />
        </SkeletonLoader.Container>
      </SkeletonLoader.Container>
    </SkeletonLoader>
  )
}

const styles = StyleSheet.create({
  carouselHolder: {
    alignSelf: 'center',
    width: getWidthByRatio(0.9),
    height: getHeighByRatio(0.5),
    borderRadius: 16,
  },
  genreRows: {
    width: getWidthByRatio(1),
    height: 100,
    marginVertical: 8,
    borderRadius: 16,
  },
})
