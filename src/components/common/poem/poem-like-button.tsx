import millify from 'millify'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { usePoemLikeMutation } from '../../../hooks/apollo/use-poem-like-mutation'
import { toggleLike } from '../../../store/slices/poem'
import { AppState } from '../../../types/states/AppState'
import { WriterIcon } from '../writer-icon'
import { WriterText } from '../writer-text'

interface Props {
  poemId: number
  style?: StyleProp<ViewStyle>
  icon?: any
  disabled?: boolean
  likes: number
}

export function PoemLikeButton({
  poemId,
  style,
  icon = 'heart',
  disabled,
  likes,
}: Props) {
  const dispatch = useDispatch()
  const hasLikedPoem = useSelector(
    (state: AppState) => state.poem.likes[poemId],
  )
  const { colors } = useTheme()
  const togglePoemLike = () => {
    dispatch(toggleLike({ poemId }))
  }
  const { likePoem, loading } = usePoemLikeMutation({
    onSuccess: togglePoemLike,
  })
  return (
    <TouchableOpacity
      onPress={() => likePoem(poemId)}
      style={[style, styles.container, { backgroundColor: colors.onSecondary }]}
      disabled={disabled || loading}
    >
      <View style={styles.buttonStyle}>
        <WriterIcon
          icon="heart"
          color={hasLikedPoem ? colors.errorContainer : ''}
          size={18}
        />
        <WriterText style={styles.count}>
          {millify(likes + hasLikedPoem ? 1 : 0)}
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
