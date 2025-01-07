import { useNavigation } from 'expo-router'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { FontFamily } from '../../types/font'
import { truncateString } from '../../utils/common'
import { MovingText } from './voice-player/moving-text'
import { WriterIconButton } from './writer-icon-button'
import { WriterText } from './writer-text'

interface Props {
  title?: string
  children?: JSX.Element
  containerStyle?: StyleProp<ViewStyle>
  movingTextStyle?: StyleProp<ViewStyle>
  movingTextContainerStyle?: StyleProp<ViewStyle>
  headerTextStyle?: StyleProp<TextStyle>
  maxTitleLength?: number
  isMoving?: boolean
  hideBackButton?: boolean
  fontFamily?: FontFamily
  onPressHeaderTitle?: () => void
}

export function WriterHeader({
  title,
  children,
  containerStyle,
  maxTitleLength = 24,
  isMoving,
  movingTextStyle,
  movingTextContainerStyle,
  hideBackButton,
  headerTextStyle,
  fontFamily,
  onPressHeaderTitle,
}: Props) {
  const { top } = useSafeAreaInsets()
  const { colors } = useTheme()
  const { goBack } = useNavigation()
  return (
    <View
      style={[
        { marginTop: top, marginLeft: hideBackButton ? 16 : 0 },
        style.container,
        containerStyle,
      ]}
    >
      {!hideBackButton && (
        <WriterIconButton
          icon="chevron-left"
          size={48}
          iconColor={colors.outlineVariant}
          bacgroundColor="transparent"
          style={{ backgroundColor: 'transparent', top: -12 }}
          onPress={() => goBack()}
        />
      )}
      {!!title && (
        <TouchableOpacity onPress={() => onPressHeaderTitle?.()}>
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
            <WriterText
              mt={16}
              color={colors.outlineVariant}
              style={headerTextStyle}
              fontFamily={fontFamily}
            >
              {truncateString({ text: title, maxLength: maxTitleLength })}
            </WriterText>
          )}
        </TouchableOpacity>
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
