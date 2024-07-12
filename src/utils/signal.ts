import { Signal } from '../types/signal'

export const createSignal = <T = any>(): Signal<T> => {
  let listeners = []

  const removeListener = (listener) => {
    listeners = listeners.filter((_listener) => _listener !== listener)
  }

  const listen = (listener) => {
    listeners[listeners.length] = listener
    return () => removeListener(listener)
  }

  const emit = (payload) => {
    listeners.forEach((listener) => listener(payload))
  }

  const getNumberOfListeners = () => {
    return listeners.length
  }

  return {
    listen,
    getNumberOfListeners,
    emit,
  }
}

export const onPressCreatePartSignal = createSignal()
export const onChangePartSignal = createSignal()
export const onChangePieceSignal = createSignal()
export const onPressNextOnCreationScreenSignal = createSignal()
