import { useNavigation } from 'expo-router'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { truncateString } from '../../utils/common'
import { MovingText } from './voice-player/moving-text'
import { WriterIcon } from './writer-icon'
import { WriterIconButton } from './writer-icon-button'
import { WriterText } from './writer-text'

interface Props {
  title: string
  children?: JSX.Element
  containerStyle?: StyleProp<ViewStyle>
  movingTextStyle?: StyleProp<ViewStyle>
  movingTextContainerStyle?: StyleProp<ViewStyle>
  maxTitleLength?: number
  isMoving?: boolean
}

export function WriterHeader({
  title,
  children,
  containerStyle,
  maxTitleLength = 24,
  isMoving,
  movingTextStyle,
  movingTextContainerStyle,
}: Props) {
  const { top } = useSafeAreaInsets()
  const { colors } = useTheme()
  const { goBack } = useNavigation()
  return (
    <View style={[{ marginTop: top }, style.container, containerStyle]}>
      <WriterIconButton
        icon="chevron-left"
        size={48}
        iconColor={colors.outlineVariant}
        bacgroundColor="transparent"
        style={{ backgroundColor: 'transparent', top: -12 }}
        onPress={() => goBack()}
      />
      {!!title && (
        <>
          {isMoving ? (
            <View style={[style.movingTextContainer, movingTextContainerStyle]}>
              <MovingText
                text={title}
                multiplier={8}
                animationThreshold={8}
                style={[
                  style.movingText,
                  { color: colors.outlineVariant },
                  movingTextStyle,
                ]}
              />
            </View>
          ) : (
            <WriterText mt={16} color={colors.outlineVariant}>
              {truncateString({ text: title, maxLength: maxTitleLength })}
            </WriterText>
          )}
        </>
      )}
      {children}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  movingTextContainer: {
    overflow: 'hidden',
  },
  movingText: {
    fontSize: 20,
    paddingTop: 16,
  },
})
