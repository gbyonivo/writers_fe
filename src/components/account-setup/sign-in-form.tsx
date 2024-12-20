import axios from 'axios'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { HelperText } from 'react-native-paper'
import PhoneInput from 'react-native-phone-number-input'
import { useToast } from 'react-native-toast-notifications'

import { API_URL } from '../../utils/constants'
import { trackError, trackEvent } from '../../utils/mixpanel'
import { TrackedError } from '../../utils/tracking/tracked-error'
import { TrackedEvent } from '../../utils/tracking/tracked-event'
import { WakeUpServerButton } from '../common/wake-up-server-button'
import { WriterBackground } from '../common/writer-background'
import { WriterButton } from '../common/writer-button'
import { WriterLoginHeader } from '../common/writer-login-header'
import { WriterText } from '../common/writer-text'

export function SignInForm() {
  const [value, setValue] = useState('74352477')
  const [formattedValue, setFormattedValue] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const phoneInput = useRef<PhoneInput>(null)
  const toast = useToast()

  const verifyNumber = async () => {
    try {
      trackEvent({
        event: TrackedEvent.PRESS,
        params: {
          phoneNumber: formattedValue,
        },
      })
      const response = await axios.post(`${API_URL}/verify-phone-number`, {
        phoneNumber: formattedValue,
      })
      if (response.data === 'pending') {
        router.push(`/code-verification/${formattedValue}`)
      } else {
        trackError({
          errorCode: TrackedError.VERIFY_NUMBER_ERROR,
          params: {
            response,
          },
        })
        setMessage('Encountered an issue')
      }
    } catch (e) {
      trackError({
        errorCode: TrackedError.VERIFY_NUMBER_ERROR,
        params: {
          error: e,
        },
      })
      toast.show('We encountered an error')
    }
  }

  return (
    <WriterBackground>
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
