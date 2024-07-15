import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { useGenreMap } from '../../../hooks/selectors/use-genre-map'
import { WriterChip } from '../writer-chip'

interface Props {
  genreIds: number[]
  containerStyle?: StyleProp<ViewStyle>
  chipStyle?: StyleProp<ViewStyle>
}

export function GenreList({ genreIds, containerStyle, chipStyle }: Props) {
  const genreMap = useGenreMap()
  return (
    <View style={[styles.container, containerStyle]}>
      {genreIds.map((genreId) => (
        <WriterChip
          label={genreMap[genreId]?.name}
          key={genreId}
          style={[styles.chip, chipStyle]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  chip: { marginRight: 8 },
})
