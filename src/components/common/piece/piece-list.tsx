import { useMemo } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePieceListContext } from '../../../context/piece-list-context'
import { useLikedPieceIds } from '../../../hooks/apollo/use-get-liked-piece-ids'
import { getWidthByRatio } from '../../../utils/common'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { PieceItem } from './piece-item'

interface Props {
  trackedScreen: TrackedScreen
}

enum OtherItem {
  AD = 'AD',
  FOR_YOU = 'FOR_YOU',
  MOST_LIKED = 'MOST_LIKED',
}

export function PieceList({ trackedScreen }: Props) {
  const theme = useTheme()
  const { pieceList, refetch, loading, loadMore } = usePieceListContext()
  const { refetch: refetchLikedPeicesId, loading: l } = useLikedPieceIds()
  const { likedPieceIds } = useLikedPieceIds()

  const likedPieceIdMap = useMemo(() => {
    return (likedPieceIds || []).reduce(
      (acc, pieceId) => ({
        ...acc,
        [pieceId]: true,
      }),
      {},
    )
  }, [loading, likedPieceIds])

  const data = useMemo(() => {
    return pieceList
      .map((piece, index) => {
        if (index === 0) return piece
        if (index % 4 === 0)
          return [
            { id: `${piece.id}-${OtherItem.FOR_YOU}`, name: OtherItem.FOR_YOU },
            piece,
          ]
        if (index % 2 === 0)
          return [
            { id: `${piece.id}-${OtherItem.AD}`, name: OtherItem.AD },
            piece,
          ]
        return piece
      })
      .flat()
  }, [pieceList])

  const renderItem = ({ item }) => {
    if (item.name === OtherItem.AD) {
      return (
        <View
          style={{
            height: 40,
            width: getWidthByRatio(1),
            backgroundColor: 'red',
          }}
        ></View>
      )
    }
    if (item.name === OtherItem.FOR_YOU) {
      return (
        <View
          style={{
            height: 40,
            width: getWidthByRatio(1),
            backgroundColor: 'blue',
          }}
        ></View>
      )
    }
    if (item.name === OtherItem.MOST_LIKED) {
      return (
        <View
          style={{
            height: 40,
            width: getWidthByRatio(1),
            backgroundColor: 'green',
          }}
        ></View>
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

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.container,
        // { backgroundColor: theme.colors.background },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            refetch()
            refetchLikedPeicesId()
          }}
        />
      }
      // style={{ backgroundColor: theme.colors.background }}
      scrollsToTop={false}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={7}
      onScroll={() => {}}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      disableIntervalMomentum
      onEndReached={loadMore}
      ItemSeparatorComponent={() => (
        <View
          style={[
            {
              backgroundColor: theme.colors.scrim,
            },
            styles.separator,
          ]}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    paddingBottom: 96,
  },
  separator: {
    height: 2,
    width: getWidthByRatio(0.7),
    marginLeft: getWidthByRatio(0.15),
  },
})
