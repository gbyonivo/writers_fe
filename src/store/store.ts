import AsyncStorage from '@react-native-async-storage/async-storage'
import { composeWithDevTools } from '@redux-devtools/extension'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { registerTranslation } from 'react-native-paper-dates'
import Reactotron from 'reactotron-react-native'
import { persistReducer, persistStore } from 'redux-persist'

import login from './slices/login'
import poem from './slices/poem'
import settings from './slices/settings'

Reactotron.configure({ host: '192.168.1.150', port: 8081 })
  .useReactNative()
  .connect()

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

const loginPersistConfig = {
  key: 'login',
  storage: AsyncStorage,
}

const settingsPersistConfig = {
  key: 'settings',
  storage: AsyncStorage,
}

export const createStore = () => {
  const reducer = combineReducers({
    login: persistReducer(loginPersistConfig, login),
    settings: persistReducer(settingsPersistConfig, settings),
    poem,
  })
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    enhancers: (getDefaultEnhancers) =>
      // @ts-ignore
      getDefaultEnhancers({
        autoBatch: false,
      }).concat(composeWithDevTools),
  })

  const persistor = persistStore(store)

  return { store, persistor }
}
