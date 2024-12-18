import { BlurView } from 'expo-blur'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Part } from 'writers_shared/dist'

import { WriterText } from '../writer-text'

interface Props {
  partIds: number[]
  handlePressIndexControl: (index: number) => void
}

export function FloatingPlayerIndexControl({
  partIds,
  handlePressIndexControl,
}: Props) {
  const { colors } = useTheme()
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.indexItem}
        onPress={() => handlePressIndexControl(index)}
      >
        <BlurView
          intensity={50}
          // @ts-ignore
          style={[styles.blur, { backgroundColor: colors.linearGradient }]}
        />
        <View>
          <WriterText>{`Part ${index + 1}`}</WriterText>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={partIds}
      renderItem={renderItem}
      keyExtractor={(item) => `part-${item}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.indexContainer}
    />
  )
}

const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.8,
    borderRadius: 12,
  },
  indexContainer: {
    marginBottom: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  indexItem: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 80,
    borderRadius: 8,
  },
})
