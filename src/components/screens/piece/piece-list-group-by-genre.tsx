import { useRouter } from 'expo-router'
import random from 'lodash.random'
import { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { PieceType } from 'writers_shared'

import { useSearchPieces } from '../../../hooks/apollo/use-search-piece-result'
import { truncateString } from '../../../utils/common'
import { WriterText } from '../../common/writer-text'

interface Props {
  searchValue: string
  userId?: number
  type?: PieceType
}

const defaultImages = [
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1724269663/samples/woman-on-a-football-field.jpg',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1724269663/samples/man-on-a-street.jpg',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1724269663/samples/man-portrait.jpg',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1724269661/samples/balloons.jpg',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1724269657/samples/food/spices.jpg',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1724269657/samples/ecommerce/car-interior-design.jpg',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1724269655/samples/animals/cat.jpg',
]

export function PiecesGroupedByGenre({ searchValue, type, userId }: Props) {
  const pieceResult = useSearchPieces({ searchValue, type, userId })
  const [displayedResult, setDisplayedResult] = useState([])
  const router = useRouter()
  const theme = useTheme()

  useEffect(() => {
    if (pieceResult.loading || pieceResult.error) return
    setDisplayedResult(pieceResult.pieces?.edges || [])
  }, [pieceResult.pieces])

  const renderItem = ({ item }) => {
    const piece = item.node
    return (
      <TouchableOpacity
        onPress={() => router.push(`/pieces/${piece.id}?name=${piece?.title}`)}
      >
        <Image
          source={{ uri: piece.imageUrl || defaultImages[random(0, 6)] }}
          style={[
            styles.item,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        />
        <WriterText>
          {truncateString({ text: piece.title, maxLength: 17 })}
        </WriterText>
      </TouchableOpacity>
    )
  }

  if (displayedResult.length === 0) {
    return null
  }

  return (
    <View>
      <View style={styles.header}>
        <WriterText size={18} fontFamily="Medium">
          {searchValue.substring(1)}
        </WriterText>
      </View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={displayedResult}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        bounces
        disableIntervalMomentum
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  separator: {
    width: 8,
  },
  item: {
    height: 160,
    width: 128,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  header: {
    paddingLeft: 16,
  },
})
