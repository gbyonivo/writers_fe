import { useIsFocused } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import Carousel from 'react-native-reanimated-carousel'
import { Piece, PieceType } from 'writers_shared/dist'

import { usePieces } from '../../../hooks/apollo/use-pieces'
import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedComponentLocation } from '../../../utils/tracking/tracked-component-location'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { GenreList } from '../../common/genre/genre-list'
import { WriterAgeRating } from '../../common/writer-age-rating'
import { WriterText } from '../../common/writer-text'

interface Props {
  pieceType: PieceType
}

export function PieceListCarousel({ pieceType }: Props) {
  const { colors } = useTheme()
  const router = useRouter()
  const focused = useIsFocused()
  const { loading, error, pieces } = usePieces({ type: pieceType })
  const onPress = (item: { node: Piece }) => {
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        id: item.node.id,
        title: item.node.title,
        location: TrackedComponentLocation.PIECE_CAROUSEL,
      },
    })
    router.push(`/pieces/${item.node.id}?name=${item.node.title}`)
  }
  if (loading) return null
  if (error) return null
  return (
    <View>
      <Carousel
        loop
        width={getWidthByRatio(1)}
        height={getHeighByRatio(0.5)}
        autoPlay={focused}
        data={pieces.edges}
        scrollAnimationDuration={4000}
        style={styles.carouselStyle}
        mode="parallax"
        autoPlayInterval={3000}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ index, item }) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={[styles.container]}
          >
            <ImageBackground
              source={{ uri: item.node.imageUrl }}
              resizeMode="cover"
              style={styles.innerContainer}
            >
              <View style={styles.blurContainer}>
                <BlurView
                  intensity={10}
                  style={[styles.blur, { backgroundColor: colors.backdrop }]}
                />
                <WriterText
                  align="left"
                  size={18}
                  ml={8}
                  fontFamily="SemiBold"
                  color={colors.onBackground}
                >
                  {item.node.title}
                </WriterText>
                <GenreList
                  genreIds={item.node.genreIds}
                  containerStyle={styles.genreListContainer}
                />
              </View>
              <WriterAgeRating
                ageRating={item.node.firstPart.ageRating}
                style={styles.ageRating}
              />
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.8,
  },
  blurContainer: {
    position: 'absolute',
    height: 120,
    width: '100%',
    bottom: 0,
    paddingTop: 8,
  },
  carouselStyle: {
    marginVertical: 8,
    borderRadius: 8,
  },
  genreListContainer: {
    marginLeft: 4,
  },
  ageRating: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
})
