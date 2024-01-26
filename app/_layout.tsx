import { Slot, SplashScreen } from 'expo-router'
import { Suspense, useEffect } from 'react'
import { Text } from 'react-native'
import { registerTranslation } from 'react-native-paper-dates'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { Apollo } from '../src/components/containers/apollo'
import { Paper } from '../src/components/containers/paper'
import AuthContextProvider from '../src/context/auth-context'
import SelectedColorSchemeContextProvider from '../src/context/selected-color-scheme-context'
import { createStore } from '../src/store/store'

export const unstable_settings = {
  initialRouteName: '(auth)/sign-in',
}

registerTranslation('pl', {
  save: 'Done',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
  hour: '',
  minute: '',
})

export default function AppLayout() {
  const { store, persistor } = createStore()

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SelectedColorSchemeContextProvider>
          <Paper>
            <Suspense fallback={<Text>Loading...</Text>}>
              <AuthContextProvider>
                <Apollo>
                  <Slot />
                </Apollo>
              </AuthContextProvider>
            </Suspense>
          </Paper>
        </SelectedColorSchemeContextProvider>
      </PersistGate>
    </Provider>
  )
}
