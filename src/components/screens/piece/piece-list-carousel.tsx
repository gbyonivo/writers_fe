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
import { PieceType } from 'writers_shared/dist'

import { usePieces } from '../../../hooks/apollo/use-pieces'
import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { WriterText } from '../../common/writer-text'

interface Props {
  pieceType: PieceType
}

export function PieceListCarousel({ pieceType }: Props) {
  const { colors } = useTheme()
  const isFcoused = useIsFocused()
  const router = useRouter()
  const { loading, error, pieces } = usePieces({ type: pieceType })
  if (loading) return null
  if (error) return null
  return (
    <View>
      <Carousel
        loop
        width={getWidthByRatio(0.9)}
        height={getHeighByRatio(0.5)}
        autoPlay={isFcoused}
        data={pieces.edges}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log('current index:', index, isFcoused)}
        style={styles.carouselStyle}
        renderItem={({ index, item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/pieces/${item.node.id}?name=${item.node.title}`)
            }
            style={styles.container}
          >
            <ImageBackground
              source={{ uri: item.node.imageUrl }}
              resizeMode="cover"
              style={styles.innerContainer}
            >
              <View style={styles.blurContainer}>
                <BlurView
                  intensity={10}
                  style={[
                    styles.blur,
                    { backgroundColor: colors.onBackground },
                  ]}
                />
                <WriterText
                  align="center"
                  size={24}
                  fontFamily="SemiBold"
                  color={colors.background}
                >
                  {item.node.title}
                </WriterText>
              </View>
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
  },
  innerContainer: {
    flex: 1,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.2,
  },
  blurContainer: {
    position: 'absolute',
    height: 100,
    width: '100%',
    bottom: 0,
    justifyContent: 'center',
  },
  carouselStyle: {
    marginVertical: 16,
    marginHorizontal: getWidthByRatio(0.05),
    borderRadius: 16,
  },
})
