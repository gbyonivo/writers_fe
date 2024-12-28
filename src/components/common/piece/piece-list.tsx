import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePieceListContext } from '../../../context/piece-list-context'
import { getWidthByRatio } from '../../../utils/common'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { PieceItem } from './piece-item'

interface Props {
  trackedScreen: TrackedScreen
}

export function PieceList({ trackedScreen }: Props) {
  const theme = useTheme()
  const { pieceList, refetch, loading, loadMore } = usePieceListContext()

  return (
    <FlatList
      data={pieceList}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <PieceItem piece={item} trackedScreen={trackedScreen} />
      )}
      contentContainerStyle={[
        styles.container,
        // { backgroundColor: theme.colors.background },
      ]}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
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
