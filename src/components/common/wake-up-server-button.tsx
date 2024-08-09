import axios from 'axios'
import { useState } from 'react'
import { Alert } from 'react-native'

import { apiUrl } from '../../utils/constants'
import { WriterButton } from './writer-button'
import { WriterText } from './writer-text'

export function WakeUpServerButton() {
  const [waking, setWaking] = useState(false)
  const wakeServer = async () => {
    setWaking(true)
    try {
      await axios.get(`${apiUrl}/test-server`)
      Alert.alert('Server is up', apiUrl)
      setWaking(false)
    } catch (e) {
      Alert.alert('', 'Problems connecting to server')
      setWaking(false)
    }
  }

  return (
    <WriterButton onPress={wakeServer} disabled={waking}>
      <WriterText>Wake Server{waking ? '...' : ''}</WriterText>
    </WriterButton>
  )
}
