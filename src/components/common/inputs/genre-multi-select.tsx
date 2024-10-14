import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { images } from '../../../assets/images/images'
import { useGenres } from '../../../hooks/apollo/use-genres'
import { SelectOption } from '../../../types/common'
import { getWidthByRatio } from '../../../utils/common'
import { WriterImageSegmentedControlItem } from './writer-images-segmented-control-item'

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {genres.map((genre) => {
          const isSelected = value.includes(genre.id)
          const onPress = () => {
            const newValue = isSelected
              ? value.filter((id) => id !== genre.id)
              : [...value, genre.id]
            handleChange({ target: { name, value: newValue } })
          }
          const option: SelectOption = {
            image: images.icons[genre.name.toLowerCase()] || images.icons.poem,
            _id: genre.id,
            value: genre.name,
          }

          return (
            <WriterImageSegmentedControlItem
              selected={isSelected}
              key={genre.id}
              onPress={onPress}
              option={option}
              indicatorSize={20}
              imageWidth={getWidthByRatio(0.35)}
              selectedIndicationStyle={{ top: 24, left: 8 }}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 96,
  },
})
