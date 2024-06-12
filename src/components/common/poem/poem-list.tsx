import { FlatList, StyleSheet } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { usePoemListContext } from '../../../context/poem-list-context'
import { PoemItem } from './poem-item'

export function PoemList() {
  const theme = useTheme()
  const { poemList, refetch, loading } = usePoemListContext()
  return (
    <FlatList
      data={poemList}
      bounces={false}
      renderItem={({ item }) => <PoemItem poem={item} />}
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
      pagingEnabled
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
})
