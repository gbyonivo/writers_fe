import { StyleSheet, View } from 'react-native'
import { Chip } from 'react-native-paper'

import { useGenres } from '../../../hooks/apollo/use-genres'

interface GenreSelectProps {
  value: number[]
  name: string
  handleChange: any
  error?: string
}

export function GenreMultiSelect({
  value,
  name,
  handleChange,
}: GenreSelectProps) {
  const { genres } = useGenres()

  return (
    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
      {genres.map((option) => {
        const isSelected = value.includes(option.id)
        const onPress = () => {
          const newValue = isSelected
            ? value.filter((id) => id !== option.id)
            : [...value, option.id]
          handleChange({ target: { name, value: newValue } })
        }

        return (
          <Chip
            selected={isSelected}
            key={option.id}
            style={styles.container}
            mode="outlined"
            onPress={onPress}
          >
            {option.name}
          </Chip>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 24, marginRight: 12 },
})
