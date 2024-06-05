import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from 'expo-router'
import { useMemo, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Stanza } from 'writers_shared'

import { WriterBackground } from '../../common/writer-background'
import { WriterText } from '../../common/writer-text'

export function StanzaCreationScreen() {
  const previousStanzas = []
  // const router = useRouter()
  // const { id } = useGlobalSearchParams()
  // const { name } = useLocalSearchParams()
  const ref = useRef(null)
  const stanzas = useMemo(() => {
    return [...previousStanzas, null]
  }, [])

  const renderItem = ({ item }: { item: Stanza }) => {
    if (!item) {
      return <></>
      // return (
      //   <AddStanzaForm
      //     position={position}
      //     poemId={poemId}
      //     parentStanzaId={parentStanzaId}
      //   />
      // )
    }
    return (
      <View pointerEvents="none">
        <WriterText key={item.id} size={18} style={styles.previousText}>
          {item.content}
        </WriterText>
      </View>
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
        initialScrollIndex={previousStanzas.length}
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
