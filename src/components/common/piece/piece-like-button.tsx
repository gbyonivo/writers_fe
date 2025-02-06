import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePieceLikeMutation } from '../../../hooks/apollo/use-piece-like-mutation'
import { usePieceUnlikeMutation } from '../../../hooks/apollo/use-piece-unlike.mutation'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterIcon } from '../writer-icon'

interface Props {
  pieceId: number
  style?: StyleProp<ViewStyle>
  icon?: string
  disabled?: boolean
  liked: boolean
}

export function PieceLikeButton({
  pieceId,
  style,
  icon = 'heart',
  disabled,
  liked,
}: Props) {
  // console.log('hasLikedPiece', hasLikedPiece, likes, pieceId)
  const { colors } = useTheme()
  const { likePiece, loading } = usePieceLikeMutation()
  const { unlikePiece, loading: unlikingPiece } = usePieceUnlikeMutation()

  return (
    <TouchableOpacity
      onPress={() => {
        trackEvent({
          event: TrackedEvent.PRESS,
          params: {
            buttonName: `${liked ? 'Unlike' : 'Like'} Piece`,
          },
        })
        liked ? unlikePiece(pieceId) : likePiece(pieceId)
      }}
      style={[style, styles.container]}
      disabled={disabled || loading || unlikingPiece}
    >
      <View style={styles.buttonStyle}>
        <WriterIcon
          icon={liked ? icon : `${icon}-outline`}
          color={liked ? colors.outlineVariant : colors.onBackground}
          size={24}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  buttonStyle: {
    flexDirection: 'row',
    width: '100%',
  },
  count: {
    marginLeft: 4,
  },
})
