import { FlatList, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { useGenres } from '../../../hooks/apollo/use-genres'
// import { CommonGenre } from 'writers_shared'
import { PiecesGroupedByGenre } from '../piece/piece-list-group-by-genre'

export function InitialSearchState() {
  const { genres } = useGenres()
  const dispatch = useDispatch()

  const renderItem = ({ item }) => {
    return <PiecesGroupedByGenre searchValue={`#${item.name}`} />
    // return (
    //   <TouchableOpacity
    //     onPress={() => {
    //       trackEvent({
    //         event: TrackedEvent.PRESS,
    //         params: {
    //           screen: TrackedScreen.SEARCH_SCREEN,
    //           buttonName: 'Initial Item On Search Screen',
    //           id: item.id,
    //           name: item.name,
    //         },
    //       })
    //       dispatch(setGenreValue(`#${item.name}`))
    //     }}
    //   >
    //     <WriterText>#{item.name}</WriterText>
    //     <WriterText size={14} color={colors.secondary}>
    //       {item.description}
    //     </WriterText>
    //   </TouchableOpacity>
    // )
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={genres}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces
      disableIntervalMomentum
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  separator: {
    height: 16,
  },
})
