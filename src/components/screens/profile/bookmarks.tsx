import { useRouter } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
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
import { DeleteBookmarkDialog } from '../../common/part/delete-bookmark-dialog'
import { WriterIcon } from '../../common/writer-icon'
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
  const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>()

  console.log(`bookmarks length ${bookmarks?.edges?.length} ${loading}`)

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
      <View style={styles.bookmark}>
        <TouchableOpacity
          style={styles.description}
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
        <TouchableOpacity style={styles.buttonWrapper}>
          <WriterIcon icon="share" size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => setBookmarkToDelete(bookmarkItem)}
        >
          <WriterIcon icon="delete" size={22} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
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
      <DeleteBookmarkDialog
        bookmarkId={bookmarkToDelete?.id}
        bookmarkName={bookmarkToDelete?.name}
        onDismiss={() => setBookmarkToDelete(null)}
        onSuccess={() => {
          refetch()
          setBookmarkToDelete(null)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  bookmark: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    paddingVertical: 8,
  },
  description: {
    flex: 1,
  },
  buttonWrapper: {
    padding: 4,
    marginLeft: 8,
  },
})
