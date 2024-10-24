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
import { WriterChip } from '../../common/writer-chip'
import { PieceListCarousel } from './piece-list-carousel'
import { PiecesGroupedByGenre } from './piece-list-group-by-genre'

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
      ListHeaderComponent={() => (
        <View style={{ flex: 1 }}>
          <View style={styles.chipContainer}>
            {Object.values(PieceType).map((pType) => (
              <TouchableOpacity key={pType} onPress={() => setPieceType(pType)}>
                <WriterChip
                  label={pType}
                  style={[
                    styles.chipStyle,
                    {
                      backgroundColor:
                        pieceType === pType
                          ? theme.colors.secondaryContainer
                          : theme.colors.backdrop,
                    },
                  ]}
                />
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
