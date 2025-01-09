import { useRouter } from 'expo-router'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { PieceType } from 'writers_shared'

import { useSearchPieces } from '../../../hooks/apollo/use-search-piece-result'
import { setSearchValue } from '../../../store/slices/search'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterText } from '../../common/writer-text'
import { PieceListGroupedByGenreItem } from './piece-list-group-by-genre-item'

interface Props {
  searchValue: string
  userId?: number
  type?: PieceType
  refetchCount?: number
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
    const { colors } = useTheme()

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
      return <PieceListGroupedByGenreItem piece={item.node} />
    }

    if (displayedResult.length === 0) {
      return null
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => {
            trackEvent({
              event: TrackedEvent.PRESS,
              params: {
                screen: TrackedScreen.HOME_SCREEN,
                buttonName: 'Press Genre',
                searchValue,
              },
            })
            dispatch(setSearchValue(searchValue))
            router.navigate('search')
          }}
        >
          <WriterText
            size={18}
            fontFamily="Light"
            mb={8}
            mt={8}
            color={colors.outlineVariant}
          >
            {searchValue.substring(1)}
          </WriterText>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={[styles.listContainer]}
          data={displayedResult}
          renderItem={renderItem}
          keyExtractor={(item) => item.node.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          bounces
          disableIntervalMomentum
        />
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 16,
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
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})
