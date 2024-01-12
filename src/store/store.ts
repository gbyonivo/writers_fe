import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from '@redux-devtools/extension'
import login from './slices/login'

const loginPersistConfig = {
  key: 'login',
  storage: AsyncStorage,
}

export const createStore = () => {
  const reducer = combineReducers({
    login: persistReducer(loginPersistConfig, login),
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
