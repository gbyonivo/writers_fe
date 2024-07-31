import { useCallback, useMemo, useState } from 'react'
import { RefreshControl, StyleSheet } from 'react-native'
import { FlatList } from 'react-native'
import { Bookmark } from 'writers_shared'

import { useBookmarks } from '../../../hooks/apollo/use-bookmarks'
import { DeleteBookmarkDialog } from '../../common/part/delete-bookmark-dialog'
import { BookmarkItem } from './bookmark-item'

interface Props {
  userId: number
}

export function Bookmarks({ userId }: Props) {
  const { bookmarks, fetchMore, loading, refetch } = useBookmarks({ userId })
  const endCursor = bookmarks?.pageInfo?.endCursor
  const hasNextPage = !!bookmarks?.pageInfo?.hasNextPage
  const edges = bookmarks?.edges || []
  const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>()

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
      <BookmarkItem
        bookmark={bookmarkItem}
        setBookmarkToDelete={setBookmarkToDelete}
      />
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
  container: {
    paddingVertical: 8,
  },
})
