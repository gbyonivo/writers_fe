import { StyleSheet } from 'react-native'
import { Dialog, Portal } from 'react-native-paper'

interface Props {
  dismissable?: boolean
  visible?: boolean
  children: JSX.Element | JSX.Element[]
  onDismiss?: () => void
}

export function WriterDialog({
  dismissable,
  children,
  onDismiss,
  visible,
}: Props) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} dismissable={dismissable}>
        <Dialog.Content>{children}</Dialog.Content>
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
