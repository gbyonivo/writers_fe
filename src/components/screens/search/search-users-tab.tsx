import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import { useSearchUserResults } from '../../../hooks/apollo/use-search-user-results'
import { AppState } from '../../../types/states/AppState'
import { truncateString } from '../../../utils/common'
import { WriterText } from '../../common/writer-text'

export function SearchUsersTab() {
  const searchValue = useSelector((state: AppState) => state.search.searchValue)
  const result = useSearchUserResults(searchValue)
  const [displayedResult, setDisplayedResult] = useState([])

  useEffect(() => {
    if (result.loading || result.error) return
    setDisplayedResult(result.users?.edges || [])
  }, [result.users])

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingVertical: 8 }}>
        <WriterText>
          {truncateString({ text: item.node.name, maxLength: 40 })}
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
