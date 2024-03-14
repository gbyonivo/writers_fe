import { StyleSheet, View } from 'react-native'
import { HelperText } from 'react-native-paper'

import { WriterButton } from '../common/writer-button'
import { WriterText } from '../common/writer-text'

interface Props {
  children: JSX.Element
  label: string
  onPress: () => void
  buttonLabel?: string
  error?: string
  buttonDisabled?: boolean
}

export function PageContainer({
  children,
  label,
  onPress,
  buttonLabel = 'Continue',
  error,
  buttonDisabled,
}: Props) {
  return (
    <View>
      <WriterText style={styles.label}>{label}</WriterText>
      {children}
      <HelperText type="error" visible={!!error} style={styles.error}>
        {error}
      </HelperText>
      <WriterButton
        onPress={onPress}
        style={styles.nextButton}
        disabled={buttonDisabled}
      >
        {buttonLabel}
      </WriterButton>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 32,
    marginTop: 24,
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 32,
  },
  error: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
})
