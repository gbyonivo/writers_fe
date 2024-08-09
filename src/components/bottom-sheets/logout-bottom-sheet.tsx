import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { WakeUpServerButton } from '../common/wake-up-server-button'
import { WriterButton } from '../common/writer-button'

export interface LogoutBottomSheetProps {
  onClose: () => void
  onPressLogout: () => void
}

export function LogoutBottomSheet({
  onClose,
  onPressLogout,
}: LogoutBottomSheetProps) {
  const snapPoints = useMemo(() => ['20%'], [])
  const theme = useTheme()

  const bottomSheetIndicator = {
    backgroundColor: theme.colors.background,
  }

  const bottomSheetStyle = {
    backgroundColor: theme.colors.primary,
  }

  return (
    <GestureHandlerRootView>
      <BottomSheet
        snapPoints={snapPoints}
        handleIndicatorStyle={bottomSheetIndicator}
        onClose={onClose}
        backgroundStyle={bottomSheetStyle}
        enablePanDownToClose
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
          <WakeUpServerButton />
        </View>
        <View style={[styles.contentContainer]}>
          <WriterButton onPress={onPressLogout}>Logout</WriterButton>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}

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
