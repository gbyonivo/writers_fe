import axios from 'axios'
import { useState } from 'react'
import { Alert } from 'react-native'

import { API_URL } from '../../utils/constants'
import { WriterButton } from './writer-button'
import { WriterText } from './writer-text'

export function WakeUpServerButton() {
  const [waking, setWaking] = useState(false)
  const wakeServer = async () => {
    setWaking(true)
    try {
      await axios.get(`${API_URL}/test-server`)
      Alert.alert('Server is up', API_URL)
      setWaking(false)
    } catch (e) {
      Alert.alert('Problems connecting to server', API_URL)
      setWaking(false)
    }
  }

  return (
    <WriterButton onPress={wakeServer} disabled={waking}>
      <WriterText>Wake Server{waking ? '...' : ''}</WriterText>
    </WriterButton>
  )
}
