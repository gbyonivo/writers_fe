import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePiece } from '../../../hooks/apollo/use-piece'
import { GenreList } from '../../common/genre/genre-list'
import { PartListForPiece } from '../../common/part/part-list-for-piece'
import { WriterActivityIndicator } from '../../common/writer-activity-indicator'
import { WriterBackground } from '../../common/writer-background'
import { WriterText } from '../../common/writer-text'

interface Props {
  pieceId: number
  pieceName: string
}

export function PieceScreen({ pieceId, pieceName }: Props) {
  const theme = useTheme()
  const { loading, piece } = usePiece(pieceId)
  return (
    <WriterBackground isView>
      <View style={[styles.container]}>
        <WriterText style={styles.pieceNameContainer} mb={8} mt={8}>
          Title: {piece?.title || pieceName}
        </WriterText>
        {!!piece.genreIds.length && (
          <GenreList
            genreIds={piece.genreIds}
            containerStyle={styles.genreListContainer}
          />
        )}
        {loading && <WriterActivityIndicator color={theme.colors.onPrimary} />}
        <PartListForPiece pieceId={pieceId} />
      </View>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pieceNameContainer: {
    paddingHorizontal: 24,
  },
  genreListContainer: {
    paddingHorizontal: 24,
  },
})
