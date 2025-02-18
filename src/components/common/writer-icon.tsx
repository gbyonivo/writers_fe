import {
  Book,
  CogIcon,
  CopyIcon,
  DeleteIcon,
  DoorOpen,
  HeartIcon,
  MessageCircleQuestion,
  Notebook,
  PauseIcon,
  PlayIcon,
  ShareIcon,
  SlidersHorizontal,
  Square,
  TrashIcon,
} from 'lucide-react-native'

const icons = {
  heart: HeartIcon,
  'exit-to-app': DoorOpen,
  book: Book,
  pause: PauseIcon,
  play: PlayIcon,
  notebook: Notebook,
  copy: CopyIcon,
  cog: CogIcon,
  bin: TrashIcon,
  share: ShareIcon,
  delete: DeleteIcon,
  stop: Square,
  filter: SlidersHorizontal,
}

export type Icon = keyof typeof icons

interface Props {
  icon: Icon
  color?: string
  size: number
  fillColor?: string
}

export const WriterIcon = ({ icon, color, size, fillColor }: Props) => {
  const LucideIcon = icons[icon]
  if (!LucideIcon) {
    return <MessageCircleQuestion color={color} size={size} />
  }

  return <LucideIcon color={color} size={size} fill={fillColor} />
}
