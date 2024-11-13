import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { TERMS_AND_CONDITIONS } from '../../utils/terms-and-conditions'
import { WriterIcon } from '../common/writer-icon'
import { WriterText } from '../common/writer-text'

const snapPoints = ['70%']

interface Props {
  onClose?: () => void
}

export const TermsAndConditionsBottomSheet = forwardRef(
  function TermsAndConditionsBottomSheetComp({ onClose }: Props, ref) {
    const theme = useTheme()
    const bottomSheetRef = useRef<BottomSheet>(null)

    const bottomSheetIndicator = {
      backgroundColor: theme.colors.background,
    }

    const bottomSheetStyle = {
      backgroundColor: theme.colors.background,
    }

    useImperativeHandle(ref, () => {
      return {
        show: () => {
          bottomSheetRef.current.expand()
        },
        hide: () => {
          bottomSheetRef.current.collapse()
        },
      }
    }, [])

    return (
      <GestureHandlerRootView>
        <Portal>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            handleIndicatorStyle={bottomSheetIndicator}
            onClose={() => onClose?.()}
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
            <BottomSheetScrollView style={styles.bottomSheetContainer}>
              <View style={styles.bottomSheetHeader}>
                <WriterText>Terms and Conditions</WriterText>
                <TouchableOpacity>
                  <WriterIcon icon="exit-to-app" size={24} />
                </TouchableOpacity>
              </View>
              <WriterText size={12} mt={16} mb={16}>
                {TERMS_AND_CONDITIONS}
              </WriterText>
            </BottomSheetScrollView>
          </BottomSheet>
        </Portal>
      </GestureHandlerRootView>
    )
  },
)

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingHorizontal: 16,
  },
  bottomSheetHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
