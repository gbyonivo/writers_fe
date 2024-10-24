import { useIsFocused } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import { ImageBackground, StyleSheet, View } from 'react-native'
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
  const { loading, error, pieces } = usePieces({ type: pieceType })
  if (loading) return null
  if (error) return null
  return (
    <Carousel
      loop
      width={getWidthByRatio(0.9)}
      height={getHeighByRatio(0.5)}
      autoPlay={isFcoused}
      data={pieces.edges}
      scrollAnimationDuration={1000}
      // onSnapToItem={(index) => console.log('current index:', index, isFcoused)}
      style={{
        marginVertical: 16,
        marginHorizontal: getWidthByRatio(0.05),
        borderRadius: 16,
      }}
      renderItem={({ index, item }) => (
        <ImageBackground
          style={{
            flex: 1,
          }}
          source={{ uri: item.node.imageUrl }}
          resizeMode="cover"
        >
          <View
            style={{
              position: 'absolute',
              height: 100,
              width: '100%',
              bottom: 0,
              justifyContent: 'center',
            }}
          >
            <BlurView
              intensity={10}
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: colors.onBackground,
                overflow: 'hidden',
                opacity: 0.2,
              }}
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
      )}
    />
  )
}
