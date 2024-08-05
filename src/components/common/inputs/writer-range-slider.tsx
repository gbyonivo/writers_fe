import { useCallback } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import RangeSlider from 'rn-range-slider'

import { WriterText } from '../writer-text'
import { Label } from './range-slider-components/label'
import { Notch } from './range-slider-components/notch'
import { Rail } from './range-slider-components/rail'
import { RailSelected } from './range-slider-components/rail-selected'
import { Thumb } from './range-slider-components/thumb'

interface WriterRangeSliderProps {
  handleChange: any
  label?: string
  name: string
  multiplier?: number
  containerStyle?: StyleProp<ViewStyle>
  value: number
  valueMultiplier?: number
}

export function WriterRangeSlider({
  handleChange,
  label,
  name,
  multiplier = 1,
  valueMultiplier = 1,
  containerStyle,
  value,
}: WriterRangeSliderProps) {
  const renderThumb = useCallback(() => <Thumb />, [])
  const renderRail = useCallback(() => <Rail />, [])
  const renderRailSelected = useCallback(() => <RailSelected />, [])
  const renderLabel = useCallback(
    (value: number) => (
      <Label text={`${label} ${`${value * multiplier}`.substring(0, 3)}`} />
    ),
    [],
  )
  const renderNotch = useCallback(() => <Notch />, [])
  const handleValueChange = useCallback(
    (val: number) => {
      handleChange({
        target: { name, value: multiplier * val },
      })
    },
    [handleChange],
  )

  return (
    <View style={containerStyle}>
      {!!label && (
        <WriterText mb={8} fontFamily="Medium">
          {label}
        </WriterText>
      )}
      <RangeSlider
        min={0}
        max={100}
        step={10}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
        disableRange
        low={(value || 0) * valueMultiplier}
      />
    </View>
  )
}
