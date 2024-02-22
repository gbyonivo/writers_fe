import { useMemo } from 'react'

import { usePoemStanzas } from '../../../hooks/apollo/use-poem-stanzas'
import { StanzaList } from './stanza-list'

interface Props {
  poemId: number
}

export const StanzaListForPoem = ({ poemId }: Props) => {
  const {
    loading: loadingPoemStanzas,
    stanzas,
    error: errorFetchingPoemStanzas,
    refetch: refetchPoemStanzas,
  } = usePoemStanzas(poemId)

  const memoedStanza = useMemo(() => stanzas, [stanzas])

  return (
    <StanzaList
      error={errorFetchingPoemStanzas}
      stanzas={memoedStanza}
      refetch={refetchPoemStanzas}
      loading={loadingPoemStanzas}
    />
  )
}
