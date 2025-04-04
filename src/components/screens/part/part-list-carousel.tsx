import { StyleSheet } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { Part, Piece } from 'writers_shared'

import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { ImageSlide } from './image-slide'
import { PartSlide } from './part-slide'

interface Props {
  parts: Part[]
  piece: Piece
}

export function PartListCarousel({ parts, piece }: Props) {
  return (
    <Carousel
      loop={false}
      width={getWidthByRatio(0.9)}
      height={getHeighByRatio(0.8)}
      data={[piece.imageUrl, ...parts]}
      scrollAnimationDuration={1000}
      style={styles.carouselStyle}
      renderItem={({ index, item }) => {
        const itemAsPart = item as Part
        return itemAsPart.id ? (
          <PartSlide
            part={itemAsPart}
            indexLabel={`${index} of ${parts.length}`}
          />
        ) : (
          <ImageSlide piece={piece} partIds={parts.map((part) => part.id)} />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  carouselStyle: {
    marginVertical: 8,
    marginHorizontal: getWidthByRatio(0.05),
    borderRadius: 16,
  },
})
