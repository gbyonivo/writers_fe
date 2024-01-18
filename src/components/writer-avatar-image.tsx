import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Avatar, Button } from 'react-native-paper'

import { WriterBackground } from '../../src/components/writer-background'
import { WriterButton } from '../../src/components/writer-button'
import { useAuthContext } from '../../src/context/auth-context'
import { useUser } from '../../src/hooks/apollo/use-user'

const eagleImgUri =
  'https://images.pexels.com/photos/36846/bald-eagle-adler-bird-of-prey-raptor.jpg'

interface Props {
  imageUri?: string
  size?: number
  style?: StyleProp<ViewStyle>
}

export const WriterAvatarImage = ({
  imageUri = eagleImgUri,
  size = 128,
  style,
}: Props) => {
  return (
    <Avatar.Image
      source={{ uri: imageUri }}
      style={[styles.avatarImage, style]}
      size={size}
    />
  )
}

const styles = StyleSheet.create({
  avatarImage: {
    alignSelf: 'center',
  },
})
