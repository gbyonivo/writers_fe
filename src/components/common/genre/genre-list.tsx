import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useGenreMap } from '../../../hooks/selectors/use-genre-map'
import { WriterChip } from '../writer-chip'
import { WriterText } from '../writer-text'

interface Props {
  genreIds: number[]
  containerStyle?: StyleProp<ViewStyle>
  chipStyle?: StyleProp<ViewStyle>
}

export function GenreList({ genreIds, containerStyle, chipStyle }: Props) {
  const theme = useTheme()
  const genreMap = useGenreMap()
  return (
    <View style={[styles.container, containerStyle]}>
      {genreIds.map((genreId, index) => (
        <WriterText
          key={genreId}
          style={[styles.chip, chipStyle]}
          fontFamily="Light"
          size={14}
          color={theme.colors.secondary}
        >
          {genreMap[genreId]?.name} {index !== genreIds.length - 1 ? '/' : ''}
        </WriterText>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingRight: 16,
  },
  chip: { margin: 4 },
})
