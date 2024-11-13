import axios from 'axios'
import { BlurView } from 'expo-blur'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useTheme } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch } from 'react-redux'

import { WriterBackground } from '../../../src/components/common/writer-background'
import { WriterButton } from '../../../src/components/common/writer-button'
import { WriterText } from '../../../src/components/common/writer-text'
import { useAuthContext } from '../../../src/context/auth-context'
import { addUser } from '../../../src/store/slices/login'
import {
  AddUserParams,
  LoginAttemptStatus,
} from '../../../src/types/states/LoginState'
import { apiUrl } from '../../../src/utils/constants'

const CELL_COUNT = 4

export default function () {
  const toast = useToast()
  const [value, setValue] = useState('')
  const { phone } = useLocalSearchParams()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { login } = useAuthContext()
  const router = useRouter()
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const [message, setMessage] = useState('')

  const verifyNumber = async () => {
    const { userAndToken, status, formattedPhone } = await login({
      value,
      formattedValue: phone as string,
    })

    if (status === LoginAttemptStatus.SUCCESS) {
      dispatch(addUser(userAndToken as AddUserParams))
    } else if (status === LoginAttemptStatus.NOT_FOUND) {
      router.push(`/sign-up/${formattedPhone}`)
    } else if (status === LoginAttemptStatus.INVALID_NUMBER) {
      toast.show('You phone number is invalid')
    } else {
      toast.show('There was an issues')
    }
  }

  const verifyCode = async () => {
    try {
      const response = await axios.post(`${apiUrl}/verify-code`, {
        code: value,
        phoneNumber: phone,
      })
      console.log(response.data)
      if (response.data === 'approved') {
        await verifyNumber()
      } else {
        toast.show(`Your request is ${response.data}`)
      }
    } catch (e) {
      toast.show('There was an issues')
    }
  }

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      verifyCode()
    }
  }, [value.length])

  return (
    <WriterBackground style={styles.root}>
      <>
        <WriterText size={30}>
          Enter the 4-digit code sent to you at {phone as string}
        </WriterText>
        <TouchableOpacity onPress={() => router.push('sign-in')}>
          <WriterText style={styles.changeNumberText}>
            Changed your mobile number
          </WriterText>
        </TouchableOpacity>

        <Text>{message}</Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View style={styles.cellContainer} key={index}>
              <Text
                style={[
                  {
                    ...styles.cell,
                    color: theme.colors.onBackground,
                  },
                  isFocused && { borderColor: theme.colors.primary },
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>

              <BlurView
                intensity={10}
                style={[
                  styles.blur,
                  { backgroundColor: theme.colors.onBackground },
                ]}
              />
            </View>
          )}
        />
        <WriterButton onPress={() => {}} style={styles.resendButton} disabled>
          Resend code via SMS
        </WriterButton>
      </>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  changeNumberText: {
    textDecorationLine: 'underline',
    paddingVertical: 8,
  },
  codeFieldRoot: {
    marginTop: 24,
    justifyContent: 'flex-start',
  },
  cellContainer: {
    borderRadius: 8,
    marginRight: 16,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
  },

  resendButton: {
    alignSelf: 'flex-start',
    marginTop: 48,
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.05,
  },
})
