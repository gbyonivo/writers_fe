import { useMemo } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { useGenres } from '../../../hooks/apollo/use-genres'
import { setGenreValue } from '../../../store/slices/search'
// import { CommonGenre } from 'writers_shared'
import { WriterText } from '../../common/writer-text'

export function InitialSearchState() {
  const { genres } = useGenres()
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => dispatch(setGenreValue(`#${item.name}`))}
      >
        <WriterText>#{item.name}</WriterText>
        <WriterText size={14} color={colors.secondary}>
          {item.description}
        </WriterText>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={genres}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  separator: {
    height: 16,
  },
})
