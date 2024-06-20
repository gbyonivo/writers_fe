import { useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { CommonGenre } from 'writers_shared'

import { WriterText } from '../../common/writer-text'

export function InitialSearchState() {
  const genreList = useMemo(() => {
    return Object.values(CommonGenre)
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View>
        <WriterText>{item}</WriterText>
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={genreList}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  separator: {
    height: 8,
  },
})
