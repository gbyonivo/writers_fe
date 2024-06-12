import { truncateString } from '../../utils/common'
import { APP_TITLE } from '../../utils/constants'
import { WriterText } from './writer-text'

interface Props {
  title?: string
}

export function WriterDefaultHeaderTitle({ title = APP_TITLE }: Props) {
  return (
    <WriterText fontFamily="Bold">
      {truncateString({ text: title, maxLength: 20 })}
    </WriterText>
  )
}
