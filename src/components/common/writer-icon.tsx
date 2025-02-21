import {
  Book,
  CogIcon,
  CopyIcon,
  DeleteIcon,
  DoorOpen,
  Film,
  HeartIcon,
  Home,
  Lightbulb,
  MessageCircleQuestion,
  Notebook,
  PauseIcon,
  PlayIcon,
  Plus,
  Puzzle,
  Search,
  ShareIcon,
  SlidersHorizontal,
  Square,
  TrashIcon,
  User,
  Video,
} from 'lucide-react-native'
import { StyleProp, ViewStyle } from 'react-native'

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
  search: Search,
  film: Film,
  puzzle: Puzzle,
  plus: Plus,
  user: User,
  home: Home,
  lightbulb: Lightbulb,
  video: Video,
}

export type Icon = keyof typeof icons

interface Props {
  icon: Icon
  color?: string
  size?: number
  fillColor?: string
  style?: StyleProp<ViewStyle>
}

export const WriterIcon = ({
  icon,
  color,
  size = 18,
  fillColor = 'transparent',
  style,
}: Props) => {
  const LucideIcon = icons[icon]
  if (!LucideIcon) {
    return <MessageCircleQuestion color={color} size={size} />
  }

  return <LucideIcon color={color} size={size} fill={fillColor} style={style} />
}
