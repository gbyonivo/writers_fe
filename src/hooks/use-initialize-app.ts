import * as Speech from 'expo-speech'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setVoices } from '../store/slices/player'
import { useGenres } from './apollo/use-genres'

export const useInitializeApp = () => {
  const { loading, error } = useGenres()
  const [fetchingVoices, setFetchingVoices] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchVoices = async () => {
      setFetchingVoices(true)
      try {
        const availableVoices = await Speech.getAvailableVoicesAsync()
        dispatch(setVoices(availableVoices))
        setFetchingVoices(false)
      } catch (e) {
        setFetchingVoices(false)
      }
    }
    fetchVoices()
  }, [])

  return {
    loading: loading || fetchingVoices,
    error,
  }
}
