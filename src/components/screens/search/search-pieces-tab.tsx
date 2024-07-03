import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'

import { useSearchPieces } from '../../../hooks/apollo/use-search-piece-result'
import { AppState } from '../../../types/states/AppState'
import { truncateString } from '../../../utils/common'
import { WriterText } from '../../common/writer-text'

export function SearchPiecesTab() {
  const searchValue = useSelector((state: AppState) => state.search.searchValue)
  const pieceResult = useSearchPieces(searchValue)
  const [displayedResult, setDisplayedResult] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (pieceResult.loading || pieceResult.error) return
    setDisplayedResult(pieceResult.pieces?.edges || [])
  }, [pieceResult.pieces])

  const renderItem = ({ item }) => {
    const piece = item.node
    return (
      <TouchableOpacity
        onPress={() => router.push(`/pieces/${piece.id}?name=${piece?.title}`)}
      >
        <View style={{ paddingVertical: 8 }}>
          <WriterText>
            {truncateString({ text: piece.title, maxLength: 40 })}
          </WriterText>
        </View>
      </TouchableOpacity>
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
