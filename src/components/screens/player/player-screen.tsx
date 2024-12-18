import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useDispatch, useSelector } from 'react-redux'

import { usePartsByIds } from '../../../hooks/apollo/use-parts-by-ids'
import { usePiece } from '../../../hooks/apollo/use-piece'
import { useOnFocus } from '../../../hooks/use-on-focus'
import { setCurrentScreen } from '../../../store/slices/screen-monitor'
import { AppState } from '../../../types/states/AppState'
import { getWidthByRatio } from '../../../utils/common'
import { trackScreenView } from '../../../utils/mixpanel'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterActivityIndicator } from '../../common/writer-activity-indicator'
import { WriterBackground } from '../../common/writer-background'
import { WriterText } from '../../common/writer-text'
import { PartListCarousel } from '../part/part-list-carousel'

export default function PlayerScreen() {
  const { id } = useGlobalSearchParams()
  const { partIds } = useLocalSearchParams()
  const dispatch = useDispatch()
  const [partsOnScreen, setPartsOnScreen] = useState([])
  const response = usePartsByIds({
    partIds:
      (partIds as string).split(',').map((partId) => parseInt(partId, 10)) ||
      [],
  })
  useOnFocus(() => {
    dispatch(setCurrentScreen(TrackedScreen.PLAYER_SCREEN))
    trackScreenView({
      screenName: TrackedScreen.PLAYER_SCREEN,
      params: {
        id,
      },
    })
  })

  useEffect(() => {
    if (response.parts?.length > 0) {
      setPartsOnScreen(response.parts)
    }
  }, [response.parts])

  const { loading, piece, error } = usePiece(parseInt(id as string, 10))
  if (loading) {
    return (
      <WriterBackground>
        <WriterActivityIndicator />
      </WriterBackground>
    )
  }
  if (error) {
    return (
      <WriterBackground>
        <WriterText>Error has happened</WriterText>
      </WriterBackground>
    )
  }
  return (
    <WriterBackground isView>
      <View style={styles.upper}>
        <PartListCarousel
          data={[piece.imageUrl, ...partsOnScreen]}
          piece={piece}
        />
      </View>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  upper: {
    marginTop: 16,
  },
})
