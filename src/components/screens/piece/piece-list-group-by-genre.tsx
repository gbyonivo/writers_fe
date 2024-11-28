import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { PieceType } from 'writers_shared'

import { images } from '../../../assets/images/images'
import { useSearchPieces } from '../../../hooks/apollo/use-search-piece-result'
import { setSearchValue } from '../../../store/slices/search'
import { truncateString } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterAgeRating } from '../../common/writer-age-rating'
import { WriterIcon } from '../../common/writer-icon'
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
          onPress={() => {
            trackEvent({
              event: TrackedEvent.PRESS,
              params: {
                screen: TrackedScreen.HOME_SCREEN,
                buttonName: 'Press Piece',
                id: piece.id,
              },
            })
            router.push(`/pieces/${piece.id}?name=${piece?.title}`)
          }}
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
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              width: '100%',
            }}
          >
            <BlurView
              intensity={20}
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'transparent',
                overflow: 'hidden',
              }}
            />
            <WriterText
              size={14}
              align="center"
              fontFamily="Bold"
              color={theme.colors.error}
            >
              {truncateString({ text: piece.title, maxLength: 17 })}
            </WriterText>
          </View>
          {!!piece?.firstPart?.ageRating && (
            <WriterAgeRating
              ageRating={piece?.firstPart?.ageRating}
              small
              style={styles.ageRating}
            />
          )}
        </TouchableOpacity>
      )
    }

    if (displayedResult.length === 0) {
      return null
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <WriterText size={18} fontFamily="Medium" mt={2}>
            {searchValue}
          </WriterText>
          <TouchableOpacity
            style={{ paddingRight: 8 }}
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
            <WriterIcon icon="chevron-right" size={36} />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={[
            styles.listContainer,
            {
              backgroundColor: theme.colors.backdrop,
              paddingVertical: 16,
              borderRadius: 16,
            },
          ]}
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
  container: {
    marginTop: 16,
  },
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
  ageRating: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
})
