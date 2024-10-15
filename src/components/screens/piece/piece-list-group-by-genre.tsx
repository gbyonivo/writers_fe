import { useRouter } from 'expo-router'
import random from 'lodash.random'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { PieceType } from 'writers_shared'

import { images } from '../../../assets/images/images'
import { useSearchPieces } from '../../../hooks/apollo/use-search-piece-result'
import { setSearchValue } from '../../../store/slices/search'
import { truncateString } from '../../../utils/common'
import { WriterIcon } from '../../common/writer-icon'
import { WriterIconButton } from '../../common/writer-icon-button'
import { WriterText } from '../../common/writer-text'

interface Props {
  searchValue: string
  userId?: number
  type?: PieceType
  refetchCount: number
}

export const PiecesGroupedByGenre = forwardRef(
  function PiecesGroupedByGenreInner(
    { searchValue, type, userId, refetchCount }: Props,
    ref,
  ) {
    const dispatch = useDispatch()
    const pieceResult = useSearchPieces({ searchValue, type, userId })
    const [displayedResult, setDisplayedResult] = useState([])
    const router = useRouter()
    const theme = useTheme()
    const refetchCountRef = useRef(refetchCount)

    useEffect(() => {
      if (pieceResult.loading) return
      pieceResult.refetch()
    }, [refetchCount, pieceResult.loading, pieceResult.refetch])

    useImperativeHandle(ref, () => {
      return {
        refetch: () => {
          pieceResult.refetch()
        },
      }
    }, [])

    useEffect(() => {
      if (pieceResult.loading || pieceResult.error) return
      setDisplayedResult(pieceResult.pieces?.edges || [])
    }, [pieceResult.pieces])

    const renderItem = ({ item }) => {
      const piece = item.node
      return (
        <TouchableOpacity
          onPress={() =>
            router.push(`/pieces/${piece.id}?name=${piece?.title}`)
          }
        >
          <Image
            source={
              piece.imageUrl ? { uri: piece.imageUrl } : images.icons.poem
            }
            style={[
              styles.item,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          />
          <WriterText size={12} align="center" fontFamily="Bold">
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
          <WriterText size={14} fontFamily="Medium" mt={2}>
            {searchValue.substring(1)}
          </WriterText>
          <TouchableOpacity
            style={{ paddingRight: 8 }}
            onPress={() => {
              dispatch(setSearchValue(searchValue))
              router.navigate('search')
            }}
          >
            <WriterIcon icon="chevron-right" size={24} />
          </TouchableOpacity>
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
  },
)

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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
