import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { useAuthContext } from '../../../context/auth-context'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WakeUpServerButton } from '../../common/wake-up-server-button'
import { WriterButton } from '../../common/writer-button'

export interface LogoutBottomSheetProps {
  onClose?: () => void
}

export const LogoutBottomSheet = forwardRef(function LogoutBottomSheet(
  { onClose }: LogoutBottomSheetProps,
  ref,
) {
  const { logout } = useAuthContext()
  const snapPoints = useMemo(() => ['20%'], [])
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
            <WriterButton
              style={{ backgroundColor: theme.colors.scrim }}
              onPress={() => {
                trackEvent({
                  event: TrackedEvent.PRESS,
                  params: {
                    buttonName: 'Confirm_logout_out',
                  },
                })
                bottomsheetRef.current.close()
                logout()
              }}
            >
              Logout
            </WriterButton>
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
})
