import { useEffect, useRef } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import { images } from '../../../assets/images/images'
import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { backgroundStyleBeforeAppIsMounted } from '../../../utils/theme'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WakeUpServerButton } from '../../common/wake-up-server-button'
import { WriterBackground } from '../../common/writer-background'
import { WriterButton } from '../../common/writer-button'
import { WriterText } from '../../common/writer-text'
import { ErrorBottomSheet } from './error-bottom-sheet'

interface Props {
  loading: boolean
  error: any
  reinitialise: () => void
}

export function InitialiseScreen({ loading, error, reinitialise }: Props) {
  console.log('error', error, loading)
  const bottomSheetRef = useRef(null)
  const timeout = useRef(null)
  useEffect(() => {
    timeout.current = null
    if (error) {
      timeout.current = setTimeout(() => bottomSheetRef.current?.expand(), 4000)
    }
    return () => clearTimeout(timeout.current)
  }, [error, loading])
  useEffect(() => {
    if (loading) {
      bottomSheetRef.current?.hide()
    }
  }, [loading])
  useEffect(() => {
    if (!error && !loading) {
      bottomSheetRef.current?.hide()
    }
  }, [error, loading])

  return (
    <WriterBackground
      style={backgroundStyleBeforeAppIsMounted.background}
      isView
    >
      <ImageBackground
        source={images.utility.splash}
        style={styles.imageBackground}
      >
        {!!loading && (
          <View style={styles.spinner}>
            <ActivityIndicator size={48} color="white" />
          </View>
        )}
        <ErrorBottomSheet ref={bottomSheetRef}>
          <View>
            <View style={{ paddingHorizontal: 16 }}>
              <WriterText align="center" size={24} mb={48}>
                Sorry we are having issues
              </WriterText>
              <WriterText align="center">
                We are currently working to resolve this,
              </WriterText>
              <WriterText align="center">Thank you.</WriterText>
            </View>
            <View style={styles.buttonContainer}>
              <WriterButton
                onPress={() => {
                  trackEvent({
                    event: TrackedEvent.PRESS,
                    params: {
                      buttonName: 'reinitialize',
                    },
                  })
                  bottomSheetRef.current?.hide()
                  reinitialise()
                }}
              >
                <WriterText>Restart</WriterText>
              </WriterButton>
            </View>
          </View>
        </ErrorBottomSheet>
      </ImageBackground>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    top: getHeighByRatio(0.35),
    justifyContent: 'center',
    flexDirection: 'row',
    width: getWidthByRatio(1),
  },
  imageBackground: {
    height: getHeighByRatio(1),
  },
  textContainer: {
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    marginTop: 48,
    justifyContent: 'space-between',
  },
})
