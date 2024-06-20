import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

import { useSearchPoems } from '../../../hooks/apollo/use-search-poem-result'
import { AppState } from '../../../types/states/AppState'
import { truncateString } from '../../../utils/common'
import { WriterText } from '../../common/writer-text'

export function SearchPoemsTab() {
  const searchValue = useSelector((state: AppState) => state.search.searchValue)
  const poemResult = useSearchPoems(searchValue)
  const [displayedResult, setDisplayedResult] = useState([])

  useEffect(() => {
    if (poemResult.loading || poemResult.error) return
    setDisplayedResult(poemResult.poems?.edges || [])
  }, [poemResult.poems])

  const renderItem = ({ item }) => {
    console.log(item.node.title)
    return (
      <View style={{ paddingVertical: 8 }}>
        <WriterText>
          {truncateString({ text: item.node.title, maxLength: 40 })}
        </WriterText>
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={displayedResult}
      renderItem={renderItem}
      keyExtractor={(item) => item.node.id}
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
