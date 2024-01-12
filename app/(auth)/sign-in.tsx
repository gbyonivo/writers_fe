import { StyleSheet, View } from 'react-native'
import { Button, HelperText, Text } from 'react-native-paper'
import { useRef, useState } from 'react'
import PhoneInput from 'react-native-phone-number-input'
import { Background } from '../../src/components/background'
import { useDispatch } from 'react-redux'
import { addUser } from '../../src/store/slices/login'
import { useAuthContext } from '../../src/context/auth-context'
import {
  AddUserParams,
  LoginAttemptStatus,
} from '../../src/types/states/LoginState'

export default function Index() {
  const [value, setValue] = useState('')
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
      console.log('Go to registration', formattedPhone)
    } else if (status === LoginAttemptStatus.INVALID_NUMBER) {
      setMessage('Your number is invalid')
    } else {
      setMessage('We encounted an error')
    }
  }

  return (
    <Background>
      <>
        <Text variant="displayMedium" style={styles.appName}>
          Writers
        </Text>
        <Text variant="bodyLarge" style={styles.appDescription}>
          Enter your number to start writing
        </Text>
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
          <Button
            icon="script"
            mode="outlined"
            onPress={verifyNumber}
            style={styles.button}
          >
            Verify
          </Button>
        </View>
      </>
    </Background>
  )
}

const styles = StyleSheet.create({
  appName: {
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 64,
  },
  appDescription: {
    textAlign: 'center',
    marginBottom: 24,
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
    alignItems: 'center',
    width: '100%',
  },
})
