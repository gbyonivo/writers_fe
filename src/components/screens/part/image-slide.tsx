import { Image, StyleSheet, View } from 'react-native'
import { Piece } from 'writers_shared'

import { getWidthByRatio } from '../../../utils/common'
import { WriterText } from '../../common/writer-text'
import { WrittenBy } from '../../common/written-by'

interface Props {
  piece: Piece
}

export function ImageSlide({ piece }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: piece.imageUrl }} style={styles.image} />
      <View>
        <WriterText align="center" mt={16} fontFamily="ExtraLight" size={18}>
          {piece.title}
        </WriterText>
        <WrittenBy name={piece.user?.name} createdAt={piece.createdAt} />
      </View>
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
})
