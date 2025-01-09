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
import { WriterBottomSheet } from '../../common/writer-bottom-sheet'
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
  const bottomsheetRef = useRef(null)

  useImperativeHandle(ref, () => ({
    hide: () => bottomsheetRef.current.hide(),
    expand: () => bottomsheetRef.current.expand(),
  }))

  return (
    <WriterBottomSheet ref={bottomsheetRef} snapPoints={snapPoints}>
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
            bottomsheetRef.current.hide()
            logout()
          }}
        >
          Logout
        </WriterButton>
      </View>
    </WriterBottomSheet>
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
