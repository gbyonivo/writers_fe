import { View } from 'react-native'
import { Chip } from 'react-native-paper'
import { CommonGenre } from 'writers_shared/dist/index'

const genreOptions = Object.keys(CommonGenre).map((val) => ({
  label: val,
  value: val,
}))

interface GenreSelectProps {
  value: CommonGenre
  name: string
  handleChange: any
}

export function GenreSelect({ value, name, handleChange }: GenreSelectProps) {
  return (
    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
      {genreOptions.map((option) => (
        <Chip
          selected={value === option.value}
          key={option.value}
          style={{ marginBottom: 24, marginRight: 12 }}
          mode="outlined"
          onPress={() =>
            handleChange({ target: { name, value: option.value } })
          }
        >
          {option.label}
        </Chip>
      ))}
    </View>
  )
}
