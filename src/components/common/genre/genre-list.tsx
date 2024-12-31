import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { useGenreMap } from '../../../hooks/selectors/use-genre-map'
import { MovingText } from '../voice-player/moving-text'
import { WriterChip } from '../writer-chip'
import { WriterText } from '../writer-text'

interface Props {
  genreIds: number[]
  containerStyle?: StyleProp<ViewStyle>
  chipStyle?: StyleProp<ViewStyle>
  isMoving?: boolean
}

export function GenreList({
  genreIds,
  containerStyle,
  chipStyle,
  isMoving,
}: Props) {
  const theme = useTheme()
  const genreMap = useGenreMap()
  const text = genreIds.map((genreId) => genreMap[genreId]?.name).join(' / ')
  return (
    <View style={[styles.container, containerStyle]}>
      {isMoving ? (
        <MovingText
          text={text}
          animationThreshold={8}
          style={{ color: theme.colors.onBackground }}
        />
      ) : (
        <ScrollView
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <WriterText
            style={[styles.chip, chipStyle]}
            fontFamily="Light"
            size={14}
            color={theme.colors.secondary}
          >
            {text}
          </WriterText>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  chip: { margin: 4 },
})
