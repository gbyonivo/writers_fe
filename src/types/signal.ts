export type SignalListen<T = any> = (
  listener: (payload?: T) => void,
) => () => void

export type SignalEmit<T = any> = (payload?: T) => void

export interface Signal<T = any> {
  listen: SignalListen<T>
  emit: SignalEmit<T>
  getNumberOfListeners: () => number
}
