import { useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Checkbox, useTheme } from 'react-native-paper'

import { WriterText } from '../common/writer-text'
import { TermsAndConditionsBottomSheet } from './terms-and-conditions-bottom-sheet'

interface Props {
  value: 'checked' | 'unchecked'
  setValue: (value: 'checked' | 'unchecked') => void
}

export function TermsAndConditionsForm({ value, setValue }: Props) {
  const theme = useTheme()
  const ref = useRef(null)
  const [disabled, setDisabled] = useState(true)

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.checkboxContainer,
          {
            backgroundColor:
              value === 'checked'
                ? theme.colors.onBackground
                : theme.colors.backdrop,
          },
        ]}
      >
        <Checkbox
          status={value}
          onPress={() =>
            value === 'checked' ? setValue('unchecked') : setValue('checked')
          }
          color={theme.colors.background}
          disabled={disabled}
        />
      </View>
      <WriterText>
        Yes, I understand and agree to the{'\n'}
        <TouchableOpacity
          onPress={() => {
            setDisabled(false)
            ref.current?.show()
          }}
        >
          <WriterText style={styles.termsAndConditionLine}>
            Terms and Conditions
          </WriterText>
        </TouchableOpacity>
        .
      </WriterText>
      <TermsAndConditionsBottomSheet ref={ref} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 16,
  },
  checkboxContainer: {
    marginRight: 16,
    borderRadius: 8,
    height: 36,
  },
  termsAndConditionLine: {
    textDecorationLine: 'underline',
  },
})
