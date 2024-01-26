import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Avatar } from 'react-native-paper'

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
