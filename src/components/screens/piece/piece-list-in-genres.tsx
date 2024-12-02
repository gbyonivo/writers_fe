import { useState } from 'react'
import {
  FlatList,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { PieceType } from 'writers_shared/dist'

import { useGenres } from '../../../hooks/apollo/use-genres'
import { getWidthByRatio } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterChip } from '../../common/writer-chip'
import { WriterText } from '../../common/writer-text'
import { PieceListCarousel } from './piece-list-carousel'
import { PiecesGroupedByGenre } from './piece-list-group-by-genre'
import { PieceListInGenreSkeleton } from './piece-list-in-genre-skeleton'

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  userId?: number
  type?: PieceType
}

export function PieceListInGenres({ containerStyle, userId, type }: Props) {
  const { loading, error, genres } = useGenres()
  const [refetchCount, setRefetchCount] = useState(0)
  const [pieceType, setPieceType] = useState(() => type)
  const theme = useTheme()

  const renderItem = ({ item }) => {
    return (
      <PiecesGroupedByGenre
        searchValue={`#${item.name}`}
        userId={userId}
        type={pieceType}
        refetchCount={refetchCount}
      />
    )
  }
  if (error) {
    return <View />
  }

  if (loading) {
    return <PieceListInGenreSkeleton />
  }

  return (
    <FlatList
      data={genres}
      renderItem={renderItem}
      keyExtractor={(item) => {
        return item?.id
      }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => setRefetchCount(refetchCount + 1)}
        />
      }
      contentContainerStyle={containerStyle}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={() => (
        <View style={{ flex: 1 }}>
          <View style={styles.chipContainer}>
            {Object.values(PieceType).map((pType) => (
              <TouchableOpacity
                key={pType}
                onPress={() => {
                  trackEvent({
                    event: TrackedEvent.PRESS,
                    params: {
                      screen: TrackedScreen.HOME_SCREEN,
                      buttonName: `Select Tab - ${pType}`,
                    },
                  })
                  setPieceType(pType)
                }}
              >
                <View
                  style={[
                    styles.chipStyle,
                    {
                      borderColor:
                        pieceType === pType
                          ? theme.colors.primary
                          : 'transparent',
                      borderBottomWidth: 1,
                      paddingVertical: 2,
                      borderRadius: 8,
                    },
                  ]}
                >
                  <WriterText
                    color={pieceType === pType ? theme.colors.primary : ''}
                  >
                    {pType}
                  </WriterText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <PieceListCarousel pieceType={pieceType} />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  separator: {
    height: 3,
  },
  genreListContainerStyle: {},
  chipStyle: {
    marginRight: 16,
  },
  chipContainer: {
    marginHorizontal: getWidthByRatio(0.05),
    flexDirection: 'row',
  },
})
