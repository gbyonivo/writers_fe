import axios from 'axios'
import { format } from 'date-fns'
import { useLocalSearchParams } from 'expo-router'
import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { HelperText, Text, TextInput } from 'react-native-paper'
import {
  DatePickerInput,
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
import { useDispatch } from 'react-redux'
import { User, userSchema } from 'writers_shared/dist/index'

import { WriterBackground } from '../../../src/components/writer-background'
import { WriterButton } from '../../../src/components/writer-button'
import { WriterHeader } from '../../../src/components/writer-header'
import { addUser } from '../../../src/store/slices/login'
import { DATE_FORMATS } from '../../../src/utils/date'

registerTranslation('en-GB', enGB)

export default function () {
  const { phone } = useLocalSearchParams()
  const [user, setUser] = useState<Partial<User>>({})
  const [date, setDate] = useState<Date>()
  const [errorMessage, setErrorMessage] = useState<string | null>('')
  const [errors, setErrors] = useState<any>({})
  const dispatch = useDispatch()

  const onChange = (value: string, key: keyof User) => {
    setUser({
      ...user,
      [key]: value,
    })
  }

  const onSubmit = async () => {
    try {
      const createdUser = {
        ...user,
        phone: phone as string,
        dob: format(date, DATE_FORMATS.BIRTHDAY),
      }
      console.log(createdUser)
      await userSchema.validate(createdUser)
      const { data: token } = await axios.post(
        `http://localhost:4000/user`,
        createdUser,
      )
      dispatch(addUser({ user: jwtDecode(token), token }))
    } catch (e) {
      console.log('hello', e)
      setErrors(e)
      setErrorMessage('We encountered an issue. Please try again later')
    }
  }

  return (
    <WriterBackground style={styles.container}>
      <>
        <WriterHeader style={styles.appHeaderContainer} />
        <Text variant="headlineSmall" style={styles.phoneContainer}>
          {phone}
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.formElement}>
            <TextInput
              label="Email"
              value={user.email}
              onChangeText={(value) => onChange(value, 'email')}
              mode="outlined"
              error={!!errors?.email}
            />
          </View>
          <View style={styles.formElement}>
            <TextInput
              label="Name"
              value={user.name}
              onChangeText={(value) => onChange(value, 'name')}
              mode="outlined"
            />
          </View>
          <View style={styles.formElementDate}>
            <DatePickerInput
              locale="en"
              label="Date of Birth"
              value={date}
              onChange={(d) => setDate(d)}
              inputMode="start"
              style={styles.datePicker}
              mode="outlined"
            />
          </View>
        </View>
        <HelperText type="error" visible={!!errorMessage} style={styles.error}>
          {errorMessage}
        </HelperText>
        <View style={styles.buttonContainer}>
          <WriterButton onPress={onSubmit} style={styles.button}>
            Join
          </WriterButton>
        </View>
      </>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  appHeaderContainer: {
    marginVertical: 16,
  },
  container: {
    paddingTop: 8,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  formElement: {
    marginVertical: 8,
  },
  formElementDate: {
    marginTop: 32,
  },
  phoneContainer: {
    textAlign: 'center',
  },
  datePicker: {
    width: 200,
  },
  button: {
    width: 128,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  error: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
})
