import { useLocalSearchParams } from 'expo-router'
import { useMemo, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Stanza } from 'writers_shared'

import { usePoemStanzas } from '../../../hooks/apollo/use-poem-stanzas'
import { AddStanzaForm } from '../../common/stanza/add-stanza-form'
import { WriterBackground } from '../../common/writer-background'
import { WriterText } from '../../common/writer-text'

export function StanzaCreationScreen() {
  const localSearchParams = useLocalSearchParams()
  const ref = useRef(null)

  const position = parseInt(localSearchParams.position as string, 10)
  const poemId = parseInt(localSearchParams.id as string, 10)
  const parentStanzaId = parseInt(
    localSearchParams.parentStanzaId as string,
    10,
  )
  const joinPreviousStanzaIds = (localSearchParams.previousStanzaId ||
    '') as string
  const { stanzas: allPoemStanzas, loading, error } = usePoemStanzas(poemId)

  const stanzas = useMemo(() => {
    const previousStanzas = joinPreviousStanzaIds
      .split(',')
      .reduce((acc, curr) => {
        const stanza = allPoemStanzas.find(
          (stanza) => stanza.id === parseInt(curr, 10),
        )
        if (!stanza) return acc
        return [...acc, stanza]
      }, [])
    return [...previousStanzas, undefined]
  }, [joinPreviousStanzaIds, allPoemStanzas])

  const renderItem = ({ item }: { item: Stanza }) => {
    if (!item) {
      return (
        <AddStanzaForm
          position={position}
          poemId={poemId}
          parentStanzaId={parentStanzaId}
        />
      )
    }
    return (
      <View pointerEvents="none">
        <WriterText key={item.id} size={18} style={styles.previousText}>
          {item.content}
        </WriterText>
      </View>
    )
  }

  if (loading || error) {
    return (
      <WriterBackground isView>
        <WriterText>Dance with me</WriterText>
      </WriterBackground>
    )
  }

  return (
    <WriterBackground isView style={styles.container}>
      <Animated.FlatList
        ref={ref}
        style={{ flex: 1, marginBottom: 100 }}
        data={stanzas}
        renderItem={renderItem}
        keyExtractor={(item) => `${item?.id || 'my-key'}`}
        scrollsToTop={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={stanzas.length ? stanzas.length - 1 : 0}
        onScrollToIndexFailed={() => {}}
      />
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  previousText: {
    lineHeight: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
})
