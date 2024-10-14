import { useRef, useState } from 'react'
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { PieceType } from 'writers_shared'

import { useGenres } from '../../../hooks/apollo/use-genres'
import { PiecesGroupedByGenre } from './piece-list-group-by-genre'

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  userId?: number
  type?: PieceType
}

export function PieceListInGenres({ containerStyle, userId, type }: Props) {
  const { loading, error, genres } = useGenres()
  const [refetchCount, setRefetchCount] = useState(0)

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

  if (loading || error) {
    return <View />
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
})
