import { StyleSheet, View } from 'react-native'
import { Chip } from 'react-native-paper'

import { useGenres } from '../../../hooks/apollo/use-genres'
import { Option } from '../../../types/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterText } from '../writer-text'

interface ChipsSingleSelectProps {
  value?: number | string | null
  name: string
  handleChange: any
  error?: string
  options: Option[]
  label?: string
}

export function ChipsSingleSelect({
  value,
  name,
  handleChange,
  options,
  label,
}: ChipsSingleSelectProps) {
  return (
    <View>
      {!!label && (
        <WriterText mb={8} fontFamily="Medium">
          {label}
        </WriterText>
      )}
      <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {options.map((option) => {
          const isSelected = option.value === value
          const onPress = () => {
            handleChange({
              target: { name, value: isSelected ? null : option.value },
            })
          }

          return (
            <Chip
              selected={isSelected}
              key={option.value}
              style={styles.container}
              mode="outlined"
              onPress={onPress}
            >
              {option.label}
            </Chip>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 24, marginRight: 12 },
})
