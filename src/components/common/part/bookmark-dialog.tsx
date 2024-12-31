import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { useBookmarkMutation } from '../../../hooks/apollo/use-bookmark-mutation'
import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { onBookmarkPieceSignal } from '../../../utils/signal'
import { WriterTextInput } from '../inputs/writer-text-input'
import { WriterButton } from '../writer-button'
import { WriterDialog } from '../writer-dialog'

interface Props {
  partIds?: number[]
  pieceId: number
}

export function BookmarkDialog({ partIds = [], pieceId }: Props) {
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const locked = useShouldChainParts()
  const { createBookmark, loading } = useBookmarkMutation({
    onSuccess: () => setVisible(false),
    showAlert: true,
  })

  useEffect(() => {
    let removeListener = null
    if (onBookmarkPieceSignal.getNumberOfListeners() < 1) {
      removeListener = onBookmarkPieceSignal.listen(() => {
        setVisible(true)
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  const onPressSubmitBookmark = () =>
    createBookmark({
      pieceId,
      partIds,
      name,
      locked,
    })

  return (
    <WriterDialog
      dismissable={!loading}
      onDismiss={() => setVisible(false)}
      visible={visible}
    >
      <WriterTextInput
        value={name}
        handleChange={({ target: { value } }) => setName(value)}
        name="name"
      />
      <View style={styles.bookmarkButtonWrapper}>
        <WriterButton onPress={onPressSubmitBookmark}>Done</WriterButton>
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
