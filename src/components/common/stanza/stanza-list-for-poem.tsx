import { useMemo } from 'react'
import { View } from 'react-native'

import { usePoemStanzas } from '../../../hooks/apollo/use-poem-stanzas'
import { StanzaList } from './stanza-list'

interface Props {
  poemId: number
}

export function StanzaListForPoem({ poemId }: Props) {
  const {
    loading: loadingPoemStanzas,
    stanzas,
    error: errorFetchingPoemStanzas,
    refetch: refetchPoemStanzas,
  } = usePoemStanzas(poemId)

  const memoedStanza = useMemo(() => (stanzas ? stanzas : []), [stanzas])

  return !!memoedStanza && memoedStanza.length > 0 ? (
    <StanzaList
      error={errorFetchingPoemStanzas}
      stanzas={memoedStanza}
      refetch={refetchPoemStanzas}
      loading={loadingPoemStanzas}
      poemId={poemId}
    />
  ) : (
    <View />
  )
}
