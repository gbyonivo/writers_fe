import { useEffect } from 'react'
import { useTheme } from 'react-native-paper'
import Animated, {
  Easing,
  StyleProps,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export type MovingTextProps = {
  text: string
  animationThreshold: number
  style?: StyleProps
  multiplier?: number
}

export const MovingText = ({
  text,
  animationThreshold,
  style,
  multiplier = 5,
}: MovingTextProps) => {
  const translateX = useSharedValue(0)
  const shouldAnimate = text.length >= animationThreshold
  const { colors } = useTheme()
  const textWidth = text.length * multiplier

  useEffect(() => {
    translateX.value = 0
  }, [text])

  useEffect(() => {
    if (!shouldAnimate) return

    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1,
        true,
      ),
    )

    return () => {
      cancelAnimation(translateX)
      translateX.value = 0
    }
  }, [translateX, text, animationThreshold, shouldAnimate, textWidth])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        style,
        animatedStyle,
        shouldAnimate && {
          width: 9999,
          paddingLeft: 16,
        },
      ]}
    >
      {text}
    </Animated.Text>
  )
}
