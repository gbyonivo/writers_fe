import { SplashScreen, router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { HelperText } from 'react-native-paper'
import PhoneInput from 'react-native-phone-number-input'
import { useDispatch } from 'react-redux'

import { WriterBackground } from '../../src/components/common/writer-background'
import { WriterButton } from '../../src/components/common/writer-button'
import { WriterLoginHeader } from '../../src/components/common/writer-login-header'
import { WriterText } from '../../src/components/common/writer-text'
import { useAuthContext } from '../../src/context/auth-context'
import { addUser } from '../../src/store/slices/login'
import {
  AddUserParams,
  LoginAttemptStatus,
} from '../../src/types/states/LoginState'

export default function Index() {
  const [value, setValue] = useState('743521334')
  const [formattedValue, setFormattedValue] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const phoneInput = useRef<PhoneInput>(null)
  const dispatch = useDispatch()
  const { login } = useAuthContext()

  const verifyNumber = async () => {
    const { userAndToken, status, formattedPhone } = await login({
      value,
      formattedValue,
      isValidNumber: phoneInput.current?.isValidNumber,
    })

    if (status === LoginAttemptStatus.SUCCESS) {
      dispatch(addUser(userAndToken as AddUserParams))
    } else if (status === LoginAttemptStatus.NOT_FOUND) {
      router.push(`/sign-up/${formattedPhone}`)
    } else if (status === LoginAttemptStatus.INVALID_NUMBER) {
      setMessage('Your number is invalid')
    } else {
      setMessage('We encounted an error')
    }
  }

  return (
    <WriterBackground>
      <>
        <WriterLoginHeader style={styles.appHeaderContainer} />
        <WriterText variant="bodyLarge" style={styles.appDescription}>
          Enter your number to start writing
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
            icon="script"
            onPress={verifyNumber}
            style={styles.button}
            disabled={!formattedValue}
          >
            Verify
          </WriterButton>
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
})
