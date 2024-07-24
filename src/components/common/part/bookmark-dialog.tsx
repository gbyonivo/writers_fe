import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Dialog, Portal } from 'react-native-paper'

import { useBookmarkMutation } from '../../../hooks/apollo/use-bookmark-mutation'
import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { onBookmarkPiece } from '../../../utils/signal'
import { WriterTextInput } from '../inputs/writer-text-input'
import { WriterButton } from '../writer-button'

interface Props {
  partIds?: number[]
  pieceId: number
}

export function BookmarkDialog({ partIds = [], pieceId }: Props) {
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const { createBookmark, loading } = useBookmarkMutation({
    onSuccess: () => setVisible(false),
    showAlert: true,
  })
  const locked = useShouldChainParts()

  useEffect(() => {
    let removeListener = null
    if (onBookmarkPiece.getNumberOfListeners() < 1) {
      removeListener = onBookmarkPiece.listen(() => {
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
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        dismissable={!loading}
      >
        <Dialog.Content>
          <WriterTextInput
            value={name}
            handleChange={({ target: { value } }) => setName(value)}
            name="name"
          />
          <View style={styles.bookmarkButtonWrapper}>
            <WriterButton onPress={onPressSubmitBookmark}>Done</WriterButton>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
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
