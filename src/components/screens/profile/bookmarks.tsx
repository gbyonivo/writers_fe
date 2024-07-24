import { useRouter } from 'expo-router'
import { useCallback, useMemo } from 'react'
import {
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { FlatList } from 'react-native'
import { Bookmark } from 'writers_shared'

import { useBookmarks } from '../../../hooks/apollo/use-bookmarks'
import { timeAgo } from '../../../utils/date'
import { WriterText } from '../../common/writer-text'

interface Props {
  userId: number
}

export function Bookmarks({ userId }: Props) {
  const { bookmarks, fetchMore, loading, refetch } = useBookmarks({ userId })
  const endCursor = bookmarks?.pageInfo?.endCursor
  const hasNextPage = !!bookmarks?.pageInfo?.hasNextPage
  const edges = bookmarks?.edges || []
  const router = useRouter()

  const loadMore = useCallback(() => {
    if (!hasNextPage) return
    fetchMore({
      variables: {
        first: 6,
        after: endCursor,
      },
    })
  }, [endCursor, fetchMore])

  const items = useMemo(() => edges || [], [edges])

  const renderItem = ({ item }) => {
    const bookmarkItem = item.node as Bookmark
    return (
      <TouchableOpacity
        style={styles.bookmark}
        onPress={() =>
          router.push(
            `/pieces/${bookmarkItem.pieceId}?partIds=${bookmarkItem.partIds.join(',')}&locked=${bookmarkItem.locked}`,
          )
        }
      >
        <WriterText fontFamily="Medium">{`${bookmarkItem.name}`}</WriterText>
        <WriterText fontFamily="ExtraLight" size={12}>
          {timeAgo.format(parseInt(bookmarkItem.createdAt, 10))}
        </WriterText>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={items}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      keyExtractor={(item) => item.node.id}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
      onEndReached={loadMore}
    />
  )
}

const styles = StyleSheet.create({
  bookmark: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  container: {
    paddingVertical: 8,
  },
})
