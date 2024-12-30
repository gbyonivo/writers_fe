import { BlurView } from 'expo-blur'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { usePartsByIds } from '../../../hooks/apollo/use-parts-by-ids'
import { usePiece } from '../../../hooks/apollo/use-piece'
import { useOnFocus } from '../../../hooks/use-on-focus'
import { setCurrentScreen } from '../../../store/slices/screen-monitor'
import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { trackScreenView } from '../../../utils/mixpanel'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterActivityIndicator } from '../../common/writer-activity-indicator'
import { WriterBackground } from '../../common/writer-background'
import { WriterButton } from '../../common/writer-button'
import { WriterHeader } from '../../common/writer-header'
import { WriterText } from '../../common/writer-text'
import { PartListCarousel } from '../part/part-list-carousel'

export default function PlayerScreen() {
  const { id } = useGlobalSearchParams()
  const { colors } = useTheme()
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
    <WriterBackground>
      <ImageBackground
        source={{ uri: piece.imageUrl }}
        style={styles.imageBackground}
      >
        <BlurView
          intensity={90}
          style={[styles.blur, { backgroundColor: colors.background }]}
        />
        <WriterHeader title={piece.title} isMoving />
        <View style={styles.upper}>
          <PartListCarousel
            data={[piece.imageUrl, ...partsOnScreen]}
            piece={piece}
          />
        </View>
      </ImageBackground>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  upper: {
    // marginTop: 16,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.95,
  },
  imageBackground: {
    position: 'absolute',
    height: getHeighByRatio(1),
    width: getWidthByRatio(1),
    resizeMode: 'stretch',
    backgroundColor: 'red',
  },
})
