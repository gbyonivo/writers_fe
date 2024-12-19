import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

export interface WriterBottomSheetProps {
  onClose?: () => void
  children: JSX.Element | JSX.Element[]
  snapPoints?: string[]
  containerStyle?: StyleProp<ViewStyle>
  backgroundColor?: string
  indicatorColor?: string
}

export const WriterBottomSheet = forwardRef(function WriterBottomSheet(
  {
    onClose,
    children,
    snapPoints = ['50%'],
    containerStyle,
    backgroundColor,
    indicatorColor,
  }: WriterBottomSheetProps,
  ref,
) {
  const sps = useMemo(() => snapPoints, [])
  const theme = useTheme()
  const bottomsheetRef = useRef<BottomSheet>(null)

  const bottomSheetIndicator = {
    backgroundColor: indicatorColor || theme.colors.backdrop,
  }

  const bottomSheetStyle = {
    backgroundColor: backgroundColor || theme.colors.background,
  }

  useImperativeHandle(ref, () => ({
    hide: () => bottomsheetRef.current.close(),
    expand: () => bottomsheetRef.current.expand(),
  }))

  return (
    <GestureHandlerRootView>
      <Portal>
        <BottomSheet
          snapPoints={sps}
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
          {children}
        </BottomSheet>
      </Portal>
    </GestureHandlerRootView>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
  },
})
