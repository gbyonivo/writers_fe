import axios from 'axios'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { HelperText } from 'react-native-paper'
import PhoneInput from 'react-native-phone-number-input'
import { useToast } from 'react-native-toast-notifications'

import { WakeUpServerButton } from '../../src/components/common/wake-up-server-button'
import { WriterBackground } from '../../src/components/common/writer-background'
import { WriterButton } from '../../src/components/common/writer-button'
import { WriterLoginHeader } from '../../src/components/common/writer-login-header'
import { WriterText } from '../../src/components/common/writer-text'
import { apiUrl } from '../../src/utils/constants'

export default function Index() {
  const [value, setValue] = useState('74352477')
  const [formattedValue, setFormattedValue] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const phoneInput = useRef<PhoneInput>(null)
  const toast = useToast()

  const verifyNumber = async () => {
    // router.push(`/sign-up/${formattedValue}`)
    // return
    try {
      const response = await axios.post(`${apiUrl}/verify-phone-number`, {
        phoneNumber: formattedValue,
      })
      if (response.data === 'pending') {
        router.push(`/code-verification/${formattedValue}`)
      } else {
        setMessage('Encountered an issue')
      }
    } catch (e) {
      toast.show('We encountered an error')
    }
  }

  return (
    <WriterBackground>
      <>
        <WriterLoginHeader style={styles.appHeaderContainer} />
        <WriterText variant="bodyLarge" style={styles.appDescription}>
          Enter your number
        </WriterText>
        <View style={styles.phoneInput}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="GB"
            layout="second"
            onChangeText={(text) => {
              setValue(text)
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text)
            }}
            autoFocus
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneTextInputContainer}
            textInputStyle={styles.phoneTextInput}
          />
        </View>
        <HelperText
          type="error"
          visible={!!message}
          style={{ textAlign: 'center', marginBottom: 16 }}
        >
          {message}
        </HelperText>

        <View style={styles.buttonContainer}>
          <WriterButton
            onPress={verifyNumber}
            style={styles.button}
            disabled={!formattedValue}
          >
            Verify
          </WriterButton>
        </View>

        <View style={styles.wakeUpServerButtonContainer}>
          <WakeUpServerButton />
        </View>
      </>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  appHeaderContainer: {
    marginVertical: 64,
  },
  appDescription: {
    textAlign: 'center',
    marginBottom: 8,
  },
  phoneInput: {
    marginTop: 24,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  phoneInputContainer: {
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  phoneTextInputContainer: {
    borderRadius: 8,
  },
  phoneTextInput: {
    letterSpacing: 4,
  },
  button: {
    width: 128,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: 40,
  },
  wakeUpServerButtonContainer: {
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 24,
  },
})
