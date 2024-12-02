import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

export interface ErrorBottomSheetProps {
  onClose?: () => void
  children: JSX.Element
  bgColor?: string
}

export const ErrorBottomSheet = forwardRef(function LogoutBottomSheet(
  { onClose, children, bgColor }: ErrorBottomSheetProps,
  ref,
) {
  const snapPoints = useMemo(() => ['40%'], [])
  const theme = useTheme()
  const bottomsheetRef = useRef<BottomSheet>(null)

  const bottomSheetIndicator = {
    backgroundColor: theme.colors.backdrop,
  }

  const bottomSheetStyle = {
    backgroundColor: bgColor || theme.colors.background,
  }

  useImperativeHandle(ref, () => ({
    hide: () => bottomsheetRef.current?.close(),
    expand: () => bottomsheetRef.current?.expand(),
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
          {children}
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
