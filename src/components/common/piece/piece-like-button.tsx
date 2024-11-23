import millify from 'millify'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { usePieceLikeMutation } from '../../../hooks/apollo/use-piece-like-mutation'
import { toggleLike } from '../../../store/slices/piece'
import { AppState } from '../../../types/states/AppState'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterIcon } from '../writer-icon'
import { WriterText } from '../writer-text'

interface Props {
  pieceId: number
  style?: StyleProp<ViewStyle>
  icon?: any
  disabled?: boolean
  likes: number
}

export function PieceLikeButton({
  pieceId,
  style,
  icon = 'heart',
  disabled,
  likes,
}: Props) {
  const dispatch = useDispatch()
  const hasLikedPiece = useSelector(
    (state: AppState) => state.piece.likes[pieceId],
  )
  const { colors } = useTheme()
  const togglePieceLike = () => {
    dispatch(toggleLike({ pieceId }))
  }
  const { likePiece, loading } = usePieceLikeMutation({
    onSuccess: togglePieceLike,
  })
  return (
    <TouchableOpacity
      onPress={() => {
        trackEvent({
          event: TrackedEvent.PRESS,
          params: {
            buttonName: `${hasLikedPiece ? 'Unlike' : 'Like'} Piece`,
          },
        })
        likePiece(pieceId)
      }}
      style={[style, styles.container, { backgroundColor: colors.onSecondary }]}
      disabled={disabled || loading}
    >
      <View style={styles.buttonStyle}>
        <WriterIcon
          icon="heart"
          color={hasLikedPiece ? colors.errorContainer : ''}
          size={18}
        />
        <WriterText style={styles.count}>
          {millify(likes + hasLikedPiece ? 1 : 0)}
        </WriterText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
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
