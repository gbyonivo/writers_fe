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

  return (
    <FlatList
      data={pieceList}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <PieceItem
          piece={item}
          trackedScreen={trackedScreen}
          liked={likedPieceIdMap[item.id]}
        />
      )}
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
