import { Switch, useTheme } from 'react-native-paper'

interface Props {
  value: boolean
  handleChange: () => void
  disabled: boolean
}

export function WriterSwitch({ value, handleChange, disabled }: Props) {
  const theme = useTheme()
  return (
    <Switch
      value={value}
      onValueChange={handleChange}
      ios_backgroundColor={theme.colors.backdrop}
      color={theme.colors.outlineVariant}
      thumbColor={theme.colors.scrim}
      disabled={disabled}
    />
  )
}
