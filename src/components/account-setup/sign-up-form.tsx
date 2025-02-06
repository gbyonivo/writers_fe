import axios from 'axios'
import { format } from 'date-fns'
import { router, useLocalSearchParams } from 'expo-router'
import jwtDecode from 'jwt-decode'
import React, { useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProgressBar, TextInput, useTheme } from 'react-native-paper'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch } from 'react-redux'
import { User, userSchema } from 'writers_shared/dist/index'

import { PageContainer } from '../../../src/components/account-setup/page-container'
import { WriterBackground } from '../../../src/components/common/writer-background'
import { WriterIconButton } from '../../../src/components/common/writer-icon-button'
import { AnimatedPager } from '../../../src/components/containers/page-scroller'
import { addUser } from '../../../src/store/slices/login'
import { API_URL } from '../../../src/utils/constants'
import { DATE_FORMATS } from '../../../src/utils/date'
import { handleAppErrors } from '../../../src/utils/errors'
import { useAlert } from '../../hooks/use-alert'
import { identifyUser, trackEvent } from '../../utils/mixpanel'
import { TrackedComponentLocation } from '../../utils/tracking/tracked-component-location'
import { TrackedEvent } from '../../utils/tracking/tracked-event'
import { WriterTextInput } from '../common/inputs/writer-text-input'
import { TermsAndConditionsForm } from './terms-and-conditions-form'

type ScreenName = 'name' | 'email' | 'dob' | 'terms'

const screenNames: ScreenName[] = ['name', 'email', 'dob', 'terms']

export function SignUpForm() {
  const pagerViewRef = useRef<any>(null)
  const toast = useToast()
  const { phone } = useLocalSearchParams()
  const [pageIndex, setPageIndex] = useState(0)
  const [user, setUser] = useState<Partial<User>>({})
  const [date, setDate] = useState<Date>(new Date())
  const [invitationCode, setInvitationCode] = useState<string>('')
  const [openDateModal, setOpenDateModal] = useState(false)
  const [termsChecked, setTermsChecked] = useState<'checked' | 'unchecked'>(
    'unchecked',
  )
  const [errorMessage, setErrorMessage] = useState<string | null>('')
  const [submittingForm, setSubmittingForm] = useState(false)
  const showHeader = [0, 1, 2, 3].includes(pageIndex)
  const theme = useTheme()
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
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        location: TrackedComponentLocation.SIGN_UP_FORM,
        buttonName: 'Submit Sign Up Form',
      },
    })
    try {
      // await userSchema.validateSyncAt(screenNames[pageIndex], createdUser)
      setSubmittingForm(true)
      const { data } = await axios.post(`${API_URL}/user`, {
        ...createdUser,
        invitationCode,
      })
      pagerViewRef.current.setPage(pageIndex + 1)
      identifyUser({ user: jwtDecode(data) })
      dispatch(addUser({ user: jwtDecode(data), token: data }))
      trackEvent({ event: TrackedEvent.REGISTER, params: { ...user } })
      setSubmittingForm(false)
    } catch (e) {
      setSubmittingForm(false)
      setErrorMessage(handleAppErrors(e, true))
      toast.show("We've encounted an error", { type: 'danger' })
    }
  }

  const onPressContinue = async () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        location: TrackedComponentLocation.SIGN_UP_FORM,
        from: screenNames[pageIndex],
        to: screenNames[pageIndex - 1],
      },
    })
    try {
      await userSchema.validateSyncAt(screenNames[pageIndex], createdUser)
      pagerViewRef.current.setPage(pageIndex + 1)
    } catch (e) {
      setErrorMessage(handleAppErrors(e, true))
    }
  }

  const onPressBack = () => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        location: TrackedComponentLocation.SIGN_UP_FORM,
        from: screenNames[pageIndex],
        to: screenNames[pageIndex - 1],
      },
    })
    if (submittingForm) return
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
      {showHeader && (
        <View style={styles.headerContainer}>
          <WriterIconButton
            icon="keyboard-backspace"
            onPress={onPressBack}
            style={{ marginRight: 8, backgroundColor: 'transparent' }}
            disabled={submittingForm}
          />
          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={(pageIndex + 1) / 5}
              color={theme.colors.onBackground}
              style={{ backgroundColor: theme.colors.backdrop }}
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
            label="Enter the email address you would like to use."
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
            label="Tell us your date of birth so we can send you cards"
            onPress={onPressContinue}
            error={errorMessage}
            buttonLabel="Terms and Conditions"
          >
            <View>
              <TouchableOpacity onPress={() => setOpenDateModal(true)}>
                <WriterTextInput
                  disabled
                  value={format(date, 'dd/MM/yyyy')}
                  name=""
                  handleChange={() => {}}
                />
              </TouchableOpacity>
              <DatePicker
                locale="en"
                open={openDateModal}
                date={date}
                onDateChange={setDate}
                mode="date"
                modal
                maximumDate={new Date()}
                onCancel={() => setOpenDateModal(false)}
                onConfirm={(newDate: any) => {
                  setOpenDateModal(false)
                  setDate(newDate)
                }}
              />
            </View>
          </PageContainer>
        </View>
        <View key={3} style={styles.formElement}>
          <PageContainer
            label="Terms and Conditions"
            onPress={onSubmit}
            buttonLabel="Start"
            buttonDisabled={submittingForm || termsChecked === 'unchecked'}
            footerContainerStyle={styles.termsAndConditionsFooter}
            leftComponent={
              <WriterTextInput
                value={invitationCode}
                handleChange={(e) => setInvitationCode(e.target.value)}
                name="invitationCode"
                containerStyle={{ flex: 1, marginRight: 8, marginTop: 32 }}
                label="Invitation Code"
              />
            }
          >
            <TermsAndConditionsForm
              value={termsChecked}
              setValue={setTermsChecked}
            />
          </PageContainer>
        </View>
      </AnimatedPager>
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
    marginVertical: 32,
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
  progressBarContainer: {
    flex: 1,
    paddingTop: 24,
  },
  termsAndConditionsFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
