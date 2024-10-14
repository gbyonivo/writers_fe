import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from 'react-native-paper'

import { SelectOption } from '../../../types/common'
import { getHeighByRatio, getWidthByRatio } from '../../../utils/common'
import { WriterText } from '../writer-text'

interface Props {
  option: SelectOption
  onPress: (option: SelectOption) => void
  selected: boolean
  indicatorSize?: number
  imageWidth?: number
  imageHeight?: number
  selectedIndicationStyle?: StyleProp<ViewStyle>
}

export function WriterImageSegmentedControlItem({
  option,
  onPress,
  selected,
  indicatorSize = 24,
  imageHeight = getHeighByRatio(0.2),
  imageWidth = getWidthByRatio(0.4),
  selectedIndicationStyle = styles.selectedIndication,
}: Props) {
  const theme = useTheme()
  return (
    <Text>
      <TouchableOpacity
        key={option._id}
        style={[styles.segment, selected && styles.selectedSegment]}
        onPress={() => onPress(option)}
      >
        <Image
          source={option.image}
          style={[
            styles.image,
            {
              width: imageWidth,
              height: imageHeight,
            },
          ]}
        />
        {selected && (
          <View
            style={[
              styles.selectedIndicationAbsolute,
              {
                backgroundColor: theme.colors.tertiary,
              },
              {
                height: indicatorSize,
                width: indicatorSize,
                borderRadius: indicatorSize,
              },
              selectedIndicationStyle,
            ]}
          />
        )}
        <WriterText>{option.value}</WriterText>
      </TouchableOpacity>
    </Text>
  )
}

const styles = StyleSheet.create({
  segment: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderRadius: 16,
    opacity: 0.4,
  },
  selectedSegment: {
    opacity: 1,
  },
  selectedIndicationAbsolute: {
    position: 'absolute',
  },
  selectedIndication: {
    top: 8,
    left: 8,
  },
  image: {
    resizeMode: 'contain',
  },
})
