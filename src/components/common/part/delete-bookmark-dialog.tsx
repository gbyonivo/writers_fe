import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { useBookmarkDeleteMutation } from '../../../hooks/apollo/use-bookmark-delete-mutation'
import { WriterButton } from '../writer-button'
import { WriterDialog } from '../writer-dialog'
import { WriterText } from '../writer-text'

interface Props {
  bookmarkId?: number
  bookmarkName?: string
  onDismiss?: () => void
  onSuccess?: () => void
}

export function DeleteBookmarkDialog({
  bookmarkId,
  bookmarkName,
  onDismiss,
  onSuccess,
}: Props) {
  const { deleteBookmark, loading } = useBookmarkDeleteMutation({
    onSuccess: () => {
      onSuccess?.()
    },
    showAlert: true,
  })

  return (
    <WriterDialog
      dismissable={!loading}
      onDismiss={onDismiss}
      visible={!!bookmarkId}
    >
      <WriterText>Delete {bookmarkName}</WriterText>
      <WriterText>Are you sure?</WriterText>
      <View style={styles.bookmarkButtonWrapper}>
        <WriterButton onPress={() => deleteBookmark(bookmarkId)}>
          Yes
        </WriterButton>
      </View>
    </WriterDialog>
  )
}

const styles = StyleSheet.create({
  bookmarkButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 8,
  },
})
