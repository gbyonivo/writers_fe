import { Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { Piece } from 'writers_shared'

import { useVideoMutation } from '../../../hooks/apollo/use-video-mutation'
import { getWidthByRatio } from '../../../utils/common'
import { WriterButton } from '../../common/writer-button'
import { WriterText } from '../../common/writer-text'
import { WrittenBy } from '../../common/written-by'
import { PieceImageUpdate } from './piece-image-update'

interface Props {
  piece: Piece
  partIds: number[]
}

export function ImageSlide({ piece, partIds }: Props) {
  const { createVideo, loading } = useVideoMutation({ showAlert: true })
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: piece.imageUrl }} style={styles.image} />
        <View>
          <WriterText
            mt={16}
            mb={8}
            fontFamily="Medium"
            size={24}
            color={colors.onBackground}
          >
            {piece.title}
          </WriterText>
          <WrittenBy name={piece.user?.name} createdAt={piece.createdAt} />
        </View>
        <View style={styles.buttonContainer}>
          <WriterButton
            icon="video"
            onPress={() =>
              createVideo({
                partIds,
                pieceId: piece.id,
              })
            }
            iconRight
            disabled={loading}
          >
            Make Video
          </WriterButton>
        </View>
        <PieceImageUpdate pieceId={piece.id} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: 'cover',
    width: getWidthByRatio(0.9),
    borderRadius: 16,
    height: 350,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  uploadButton: {
    marginLeft: 16,
  },
  textContainerStyle: {
    marginTop: 16,
  },
  url: {
    flexWrap: 'wrap',
  },
  imagePreview: {
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
