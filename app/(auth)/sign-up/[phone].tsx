import axios from 'axios'
import { format } from 'date-fns'
import { router, useLocalSearchParams } from 'expo-router'
import jwtDecode from 'jwt-decode'
import React, { useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { MD3Colors, ProgressBar, TextInput } from 'react-native-paper'
import {
  DatePickerInput,
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
import { useDispatch } from 'react-redux'
import { User, userSchema } from 'writers_shared/dist/index'

import { PageContainer } from '../../../src/components/account-setup/page-container'
import { WriterBackground } from '../../../src/components/common/writer-background'
import { WriterIconButton } from '../../../src/components/common/writer-icon-button'
import { WriterText } from '../../../src/components/common/writer-text'
import { AnimatedPager } from '../../../src/components/containers/page-scroller'
import { addUser } from '../../../src/store/slices/login'
import { apiUrl } from '../../../src/utils/constants'
import { DATE_FORMATS } from '../../../src/utils/date'
import { handleAppErrors } from '../../../src/utils/errors'

registerTranslation('en-GB', enGB)

type ScreenName = keyof User

const screenNames: ScreenName[] = ['name', 'email', 'dob']

export default function () {
  const pagerViewRef = useRef(null)
  const { phone } = useLocalSearchParams()
  const [pageIndex, setPageIndex] = useState(0)
  const [user, setUser] = useState<Partial<User>>({})
  const [date, setDate] = useState<Date>()
  const [errorMessage, setErrorMessage] = useState<string | null>('')
  const [token, setToken] = useState<null | string>(null)
  const [submittingForm, setSubmittingForm] = useState(false)
  const showHeader = [0, 1, 2].includes(pageIndex) && !token
  const dispatch = useDispatch()

  const onChange = (value: string, key: keyof User) => {
    setUser({
      ...user,
      [key]: value,
    })
    setErrorMessage('')
  }

  const createdUser = useMemo(
    () => ({
      ...user,
      phone: phone as string,
      dob: date ? format(date, DATE_FORMATS.BIRTHDAY) : '',
    }),
    [phone, user, date],
  )

  const onSubmit = async () => {
    await userSchema.validateSyncAt(screenNames[pageIndex], createdUser)
    setSubmittingForm(true)
    try {
      const { data } = await axios.post(`${apiUrl}/user`, createdUser)
      setToken(data)
      pagerViewRef.current.setPage(pageIndex + 1)
      setSubmittingForm(false)
    } catch (e) {
      setErrorMessage(handleAppErrors(e, true))
    }
  }

  const onComplete = () => {
    dispatch(addUser({ user: jwtDecode(token), token }))
  }

  const onPressContinue = async () => {
    try {
      await userSchema.validateSyncAt(screenNames[pageIndex], createdUser)
      pagerViewRef.current.setPage(pageIndex + 1)
    } catch (e) {
      setErrorMessage(handleAppErrors(e, true))
    }
  }

  const onPressBack = () => {
    if (pageIndex > 0) {
      pagerViewRef.current.setPage(pageIndex - 1)
      return
    }
    if (router.canGoBack()) {
      router.back()
    }
  }

  return (
    <WriterBackground style={styles.container}>
      <>
        {showHeader && (
          <View style={styles.headerContainer}>
            <WriterIconButton
              icon="keyboard-backspace"
              onPress={onPressBack}
              style={{ marginRight: 8 }}
              disabled={submittingForm}
            />
            <View style={{ flex: 1, paddingTop: 24 }}>
              <ProgressBar
                progress={(pageIndex + 1) / 5}
                color={MD3Colors.primary40}
              />
            </View>
          </View>
        )}
        <AnimatedPager
          style={styles.pagerView}
          initialPage={0}
          ref={pagerViewRef}
          onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
          scrollEnabled={false}
        >
          <View key={0} style={styles.formElement}>
            <PageContainer
              label="What's your name so we know what to call you?"
              onPress={onPressContinue}
              error={errorMessage}
            >
              <TextInput
                label="Name"
                value={user.name}
                onChangeText={(value) => onChange(value, 'name')}
                mode="outlined"
              />
            </PageContainer>
          </View>
          <View key={1} style={styles.formElement}>
            <PageContainer
              label="What's your Email?"
              onPress={onPressContinue}
              error={errorMessage}
            >
              <TextInput
                label="Email"
                value={user.email}
                onChangeText={(value) => onChange(value, 'email')}
                mode="outlined"
              />
            </PageContainer>
          </View>
          <View key={2} style={styles.formElement}>
            <PageContainer
              label="Tell us you date of birth so we can send you cards"
              onPress={onSubmit}
              error={errorMessage}
              buttonLabel="Join Narate"
            >
              <View>
                <DatePickerInput
                  locale="pl"
                  label="Date of Birth"
                  value={date}
                  onChange={(d) => setDate(d)}
                  inputMode="start"
                  style={styles.datePicker}
                  mode="outlined"
                />
              </View>
            </PageContainer>
          </View>
          <View key={3} style={styles.formElement}>
            <PageContainer
              label="Tell us you date of birth so we can send you cards"
              onPress={onComplete}
              buttonLabel="Start"
              buttonDisabled={submittingForm}
            >
              <WriterText>Welcome Buddy</WriterText>
            </PageContainer>
          </View>
        </AnimatedPager>
      </>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  container: {
    paddingTop: 8,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  formElement: {
    marginVertical: 8,
    paddingHorizontal: 24,
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
  pagerView: {
    flex: 1,
  },
})
