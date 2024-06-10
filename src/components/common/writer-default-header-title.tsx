import { APP_TITLE } from '../../utils/constants'
import { WriterText } from './writer-text'

interface Props {
  title?: string
}

export function WriterDefaultHeaderTitle({ title = APP_TITLE }: Props) {
  return <WriterText>{title}</WriterText>
}
