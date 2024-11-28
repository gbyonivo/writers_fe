import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import { Audio } from 'expo-av'
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { ElevenVoice } from 'writers_shared'

import { trackEvent } from '../../utils/mixpanel'
import { TrackedEvent } from '../../utils/tracking/tracked-event'
import { WriterButton } from '../common/writer-button'
import { WriterText } from './writer-text'

export interface VoiceSetUpBottomSheetProps {
  onClose?: () => void
  voice?: ElevenVoice
  selectVoice: (voiceId: string) => void
}

export const VoiceSetUpBottomSheet = forwardRef(function VoiceSetUpBottomSheet(
  { onClose, voice, selectVoice }: VoiceSetUpBottomSheetProps,
  ref,
) {
  const [playing, setPlaying] = useState<boolean>()
  const snapPoints = useMemo(() => ['50%'], [])
  const theme = useTheme()
  const bottomsheetRef = useRef<BottomSheet>(null)

  const bottomSheetIndicator = {
    backgroundColor: theme.colors.backdrop,
  }

  const bottomSheetStyle = {
    backgroundColor: theme.colors.background,
  }

  useImperativeHandle(ref, () => ({
    hide: () => bottomsheetRef.current.close(),
    expand: () => bottomsheetRef.current.expand(),
  }))

  const playSample = async (url: string) => {
    setPlaying(true)
    const { sound } = await Audio.Sound.createAsync({ uri: url })
    await sound.playAsync()

    await new Promise<void>((resolve) => {
      sound.setOnPlaybackStatusUpdate((status) => {
        // @ts-ignore
        if (status.didJustFinish) {
          resolve()
          setPlaying(false)
        }
      })
    })
    await sound.unloadAsync()
  }

  return (
    <GestureHandlerRootView>
      <Portal>
        <BottomSheet
          snapPoints={snapPoints}
          ref={bottomsheetRef}
          handleIndicatorStyle={bottomSheetIndicator}
          onClose={onClose}
          backgroundStyle={bottomSheetStyle}
          enablePanDownToClose
          index={-1}
          backdropComponent={(backdropProps) => (
            <BottomSheetBackdrop
              {...backdropProps}
              disappearsOnIndex={-1}
              enableTouchThrough
              opacity={0.6}
            />
          )}
        >
          <View style={[styles.contentContainer]}>
            {!!voice && (
              <View>
                <WriterText>{voice.name}</WriterText>
                <WriterText mt={8}>{voice.description}</WriterText>
                <WriterText mt={8}>{voice.age}</WriterText>
                <WriterText mt={8}>{voice.accent}</WriterText>
                <WriterText mt={8}>{voice.gender}</WriterText>
                <WriterText mt={8}>Mostly used for {voice.useCase}</WriterText>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <WriterButton
                onPress={() => {
                  trackEvent({
                    event: TrackedEvent.PRESS,
                    params: {
                      buttonName: `Sample_Voice_${voice?.id}`,
                    },
                  })
                  playSample(voice.previewUrl)
                }}
                style={styles.button}
                disabled={playing}
              >
                Test Voice
              </WriterButton>
              <WriterButton
                onPress={() => {
                  selectVoice(voice.id)
                }}
                style={styles.button}
              >
                Use Voice
              </WriterButton>
            </View>
          </View>
        </BottomSheet>
      </Portal>
    </GestureHandlerRootView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
  },
  button: {
    marginTop: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})
