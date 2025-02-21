import { StyleSheet, View } from 'react-native'

import { OtherFeedItem } from '../../../types/feed'
import { getWidthByRatio } from '../../../utils/common'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { PieceItem } from '../../common/piece/piece-item'
import { WriterText } from '../../common/writer-text'
import { PieceListCarousel } from '../piece/piece-list-carousel'
import { PiecesGroupedByGenre } from '../piece/piece-list-group-by-genre'
import { PieceListInGenres } from '../piece/piece-list-in-genres'
import { AdItem } from './ad-item'

interface Props {
  item: any
  likedPieceIdMap: Record<number, boolean>
  trackedScreen: TrackedScreen
}

export function FeedItem({ item, likedPieceIdMap, trackedScreen }: Props) {
  if (item.name === OtherFeedItem.CAROUSEL) {
    return <PieceListCarousel />
  }
  if (item.name === OtherFeedItem.AD) {
    return <AdItem />
  }
  if (item.name === OtherFeedItem.FOR_YOU) {
    return (
      <View style={styles.sectionStyle}>
        <WriterText style={styles.sectionHeader} fontFamily="Medium">
          For You
        </WriterText>
        <PiecesGroupedByGenre searchValue={`#Thriller`} hideHeader />
      </View>
    )
  }
  if (item.name === OtherFeedItem.MOST_LIKED) {
    return (
      <View style={styles.sectionStyle}>
        <WriterText style={styles.sectionHeader} fontFamily="Medium">
          Most Liked
        </WriterText>
        <PiecesGroupedByGenre searchValue={`#Comedy`} hideHeader />
      </View>
    )
  }
  return (
    <PieceItem
      piece={item}
      trackedScreen={trackedScreen}
      liked={likedPieceIdMap[item.id]}
    />
  )
}

const styles = StyleSheet.create({
  sectionStyle: {
    paddingVertical: 12,
    width: getWidthByRatio(1),
  },
  sectionHeader: {
    paddingLeft: 12,
  },
})
