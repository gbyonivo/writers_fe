import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

import { WriterIcon } from './writer-icon'
import { WriterText } from './writer-text'

interface Props {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  children: JSX.Element | string
  icon?: IconSource
  disabled?: boolean
  textColor?: string
  iconColor?: string
  iconRight?: boolean
}

export function WriterButton({
  onPress,
  style,
  children,
  icon,
  disabled,
  textColor,
  iconRight,
  iconColor,
}: Props) {
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          backgroundColor: colors.scrim,
          flexDirection: iconRight ? 'row' : 'row-reverse',
          justifyContent: 'center',
        },
        style,
        styles.container,
      ]}
      onPress={onPress}
    >
      {typeof children === 'string' ? (
        <View style={{ justifyContent: 'center' }}>
          <WriterText align="center" color={textColor}>
            {children}
          </WriterText>
        </View>
      ) : (
        children
      )}
      {!!icon && (
        <View>
          <WriterIcon icon={icon} color={iconColor} size={24} />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  iconStyle: {
    marginTop: 8,
    alignSelf: 'auto',
    verticalAlign: 'auto',
  },
})
