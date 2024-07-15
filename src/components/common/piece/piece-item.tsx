import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Piece } from 'writers_shared'

import { GenreList } from '../genre/genre-list'
import { WriterText } from '../writer-text'
import { WrittenBy } from '../written-by'
import { PieceLikeButton } from './piece-like-button'

interface Props {
  piece: Piece
}

export function PieceItem({ piece }: Props) {
  const router = useRouter()
  const theme = useTheme()
  const containerStyle = {
    borderBottomColor: theme.colors.backdrop,
  }
  const onPress = () => {
    router.push(`/pieces/${piece.id}?name=${piece?.title}`)
  }

  if (!piece) return null
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPress}>
        <WriterText
          color={theme.colors.onSurfaceVariant}
          size={18}
          fontFamily="Bold"
        >
          {piece.title}
        </WriterText>
        {!!piece.genreIds.length && (
          <GenreList
            genreIds={piece.genreIds}
            containerStyle={styles.genreListContainer}
          />
        )}
        {piece.firstPart && (
          <View style={styles.pieceContent}>
            <WriterText
              style={styles.pieceContentText}
              fontFamily="Medium"
            >{`${piece.firstPart.content}`}</WriterText>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.pieceFooter}>
        <WrittenBy name={piece.user.name} createdAt={piece.createdAt} />
        <View>
          <PieceLikeButton pieceId={piece.id} likes={piece.likes} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    borderBottomWidth: 2,
  },
  pieceContent: {
    marginTop: 20,
  },
  pieceContentText: {
    lineHeight: 28,
    fontStyle: 'italic',
  },
  pieceWriter: {
    marginBottom: 4,
  },
  pieceFooter: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genreListContainer: {
    marginTop: 8,
  },
})
