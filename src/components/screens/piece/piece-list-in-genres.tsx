import { useState } from 'react'
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { PieceType } from 'writers_shared/dist'

import { useGenres } from '../../../hooks/apollo/use-genres'
import { getWidthByRatio } from '../../../utils/common'
import { PieceListCarousel } from './piece-list-carousel'
import { PiecesGroupedByGenre } from './piece-list-group-by-genre'
import { PieceListInGenreSkeleton } from './piece-list-in-genre-skeleton'

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  userId?: number
  types?: PieceType[]
}

export function PieceListInGenres({ containerStyle, userId, types }: Props) {
  const { loading, error, genres } = useGenres()
  const [refetchCount, setRefetchCount] = useState(0)
  const type = types.length === 1 ? types[0] : null

  const renderItem = ({ item }) => {
    return (
      <PiecesGroupedByGenre
        searchValue={`#${item.name}`}
        userId={userId}
        type={type}
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
          <PieceListCarousel pieceType={type} />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  separator: {
    height: 3,
  },
  chipContainer: {
    marginHorizontal: getWidthByRatio(0.05),
    flexDirection: 'row',
  },
})
