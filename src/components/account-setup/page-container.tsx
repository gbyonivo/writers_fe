import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { HelperText } from 'react-native-paper'

import { WriterButton } from '../common/writer-button'
import { WriterText } from '../common/writer-text'

interface Props {
  children: JSX.Element
  label: string
  onPress: () => void
  buttonLabel?: string
  error?: string | null
  buttonDisabled?: boolean
  leftComponent?: JSX.Element
  footerContainerStyle?: StyleProp<ViewStyle>
}

export function PageContainer({
  children,
  label,
  onPress,
  buttonLabel = 'Continue',
  error,
  buttonDisabled,
  leftComponent,
  footerContainerStyle,
}: Props) {
  return (
    <View>
      <View>
        <WriterText style={styles.label}>{label}</WriterText>
        {children}
        {error && (
          <HelperText type="error" visible={!!error} style={styles.error}>
            {error}
          </HelperText>
        )}
      </View>
      <View style={footerContainerStyle}>
        {!!leftComponent && <>{leftComponent}</>}
        <WriterButton
          onPress={onPress}
          style={styles.nextButton}
          disabled={buttonDisabled}
        >
          {buttonLabel}
        </WriterButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 32,
    marginTop: 24,
    fontSize: 24,
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 32,
  },
  error: {
    marginTop: 32,
    fontSize: 16,
    marginLeft: -8,
  },
})
