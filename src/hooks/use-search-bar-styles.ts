import { useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import { useTheme } from 'react-native-paper'
import {
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export const springConfig = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
}

export const timingConfig = {
  duration: 250,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
}

export const useSearchBarStyles = ({
  cancelButton,
  cancelButtonWidth,
  isFocus,
  clearButton,
}) => {
  const dimensions = useWindowDimensions()
  const inputStyle = useAnimatedStyle(() => {
    if (!cancelButton) {
      return {}
    }

    return {
      marginRight: withSpring(
        isFocus.value ? cancelButtonWidth.value + 8 : 0,
        springConfig,
      ),
    }
  })

  const clearButtonStyle = useAnimatedStyle(() => {
    const isShowClearButton = isFocus.value && clearButton.value

    return {
      opacity: withTiming(isShowClearButton ? 1 : 0, timingConfig),
      transform: [
        { scale: withTiming(isShowClearButton ? 1 : 0, timingConfig) },
      ],
    }
  })

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isFocus.value ? 1 : 0, timingConfig),
      transform: [
        { scale: withTiming(isFocus.value ? 1 : 0, timingConfig) },
        {
          translateX: isFocus.value
            ? withTiming(0, { duration: 0 })
            : withTiming(dimensions.width, { duration: 650 }),
        },
      ],
    }
  })

  const theme = useTheme()

  const themeStyle = useMemo(
    () => ({
      backgroundColor: 'transparent',
      placeholderColor: theme.colors.surfaceVariant,
      textInputBackground: theme.colors.backdrop,
      textColor: theme.colors.onBackground,
      selectionColor: '#2979ff', // blue
      clearIconColor: '#c7c7cc',
      searchIconColor: theme.colors.secondary,
      textButtonColor: '#2979ff', // blue
    }),
    [],
  )

  return {
    textStyle,
    clearButtonStyle,
    inputStyle,
    themeStyle,
  }
}
