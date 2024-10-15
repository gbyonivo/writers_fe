import { useSpeaker } from '../../../hooks/use-speaker'

interface Props {
  children: JSX.Element
}

export function WithSpeaker({ children }: Props) {
  useSpeaker()

  return <>{children}</>
}
