import { Mixpanel } from 'mixpanel-react-native'
import { Alert } from 'react-native'
import { User } from 'writers_shared/dist'

import { ENVIRONMENT } from './constants'
import { log } from './log'
import { TrackedComponentLocation } from './tracking/tracked-component-location'
import { TrackedError } from './tracking/tracked-error'
import { TrackedEvent } from './tracking/tracked-event'
import { TrackedScreen } from './tracking/tracked-screen'

const trackAutomaticEvents = false
const mixpanel = new Mixpanel(
  'fb074e5fdaf10ac1a1a7a4588b4fa1c5',
  trackAutomaticEvents,
)
mixpanel.init()

export const identifyUser = ({ user }: { user: User }) => {
  mixpanel.identify(`${user.id}`)

  mixpanel.getPeople().set('$username', user.username)
  mixpanel.getPeople().set('$name', user.name)
  mixpanel.getPeople().set('$email', user.email)
  mixpanel.getPeople().set('$phone', user.phone)
}

export const trackEvent = ({
  event,
  params,
}: {
  event: TrackedEvent
  params?: {
    [key: string]: any
    location?: TrackedComponentLocation
    screen?: TrackedScreen
  }
}) => {
  if (ENVIRONMENT === 'development') {
    log('Event tracking ----------')
    log('event', event)
    log('params', params)
    log('Event tracking ----------')
    return
  }
  mixpanel.track(event, params)
}

export const trackError = ({
  errorCode,
  params,
}: {
  errorCode: TrackedError
  params?: { [key: string]: any }
}) => {
  if (ENVIRONMENT === 'development') {
    log('Error tracking ----------')
    log('Error Code', errorCode)
    log('params', params)
    log('Error tracking ----------')
    return
  }
  mixpanel.track(errorCode)
}

export const trackScreenView = ({
  params = {},
  screenName,
}: {
  params?: { [key: string]: any }
  screenName: TrackedScreen
}) => {
  trackEvent({
    event: TrackedEvent.SCREEN_VIEW,
    params: {
      screenName,
      ...params,
    },
  })
}
