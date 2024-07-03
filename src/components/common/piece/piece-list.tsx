import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePieceListContext } from '../../../context/piece-list-context'
import { PieceItem } from './piece-item'

export function PieceList() {
  const theme = useTheme()
  const { pieceList, refetch, loading, loadMore } = usePieceListContext()
  return (
    <FlatList
      data={pieceList}
      renderItem={({ item }) => <PieceItem piece={item} />}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
      style={{ backgroundColor: theme.colors.background }}
      scrollsToTop={false}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={7}
      onScroll={() => {}}
      showsHorizontalScrollIndicator={false}
      disableIntervalMomentum
      onEndReached={loadMore}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
})
