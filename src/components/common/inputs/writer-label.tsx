import * as React from 'react'

import { WriterText } from '../writer-text'

interface Props {
  label: string
}

export function WriterLabel({ label }: Props) {
  return (
    <WriterText mb={4} size={14}>
      {label}
    </WriterText>
  )
}
