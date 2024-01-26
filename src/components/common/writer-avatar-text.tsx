import { Avatar } from 'react-native-paper'

interface Props {
  label: string
  size?: number
}

export const WriterAvatarText = ({ label, size = 24 }: Props) => (
  <Avatar.Text size={size} label={label} />
)
