import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
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
  selectedIndicationStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  imageStyle?: StyleProp<ImageStyle>
}

export function WriterImageSegmentedControlItem({
  option,
  onPress,
  selected,
  indicatorSize = 24,
  selectedIndicationStyle = styles.selectedIndication,
  containerStyle,
  labelStyle,
  imageStyle,
}: Props) {
  const theme = useTheme()
  return (
    <Text>
      <TouchableOpacity
        key={option.value}
        style={[
          styles.segment,
          selected && styles.selectedSegment,
          containerStyle,
        ]}
        onPress={() => onPress(option)}
      >
        <Image source={option.image} style={[styles.image, imageStyle]} />
        {selected && (
          <View
            style={[
              styles.selectedIndicationAbsolute,
              {
                backgroundColor: theme.colors.outlineVariant,
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
        <WriterText style={labelStyle}>{option.label}</WriterText>
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
