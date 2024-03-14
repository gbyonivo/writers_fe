import { Avatar } from 'react-native-paper'

interface Props {
  label: string
  size?: number
}

export function WriterAvatarText({ label, size = 24 }: Props) {
  return <Avatar.Text size={size} label={label} />
}
