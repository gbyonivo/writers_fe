import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { images } from '../../../assets/images/images'
import { SelectOption } from '../../../types/common'
import { getWidthByRatio } from '../../../utils/common'
import { WriterImageSegmentedControlItem } from './writer-images-segmented-control-item'

interface GenreSelectProps {
  value: number[]
  name: string
  handleChange: any
  error?: string
  genres: any[]
  hideImage?: boolean
  containerStyle?: StyleProp<ViewStyle>
}

export function GenreMultiSelect({
  value,
  name,
  handleChange,
  genres,
  hideImage,
  containerStyle,
}: GenreSelectProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container, containerStyle, ,]}>
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
            value: genre.id,
            label: genre.name,
          }

          if (hideImage) {
            return (
              <WriterImageSegmentedControlItem
                selected={isSelected}
                key={genre.id}
                onPress={onPress}
                option={option}
                indicatorSize={20}
                imageStyle={{ width: 32, height: 32 }}
                containerStyle={{ flexDirection: 'row', marginBottom: 32 }}
                labelStyle={{ marginLeft: 8 }}
              />
            )
          }

          return (
            <WriterImageSegmentedControlItem
              selected={isSelected}
              key={genre.id}
              onPress={onPress}
              option={option}
              indicatorSize={20}
              imageStyle={{
                width: getWidthByRatio(0.35),
                height: getWidthByRatio(0.35),
              }}
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
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
})
