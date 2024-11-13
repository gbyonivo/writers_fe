import { useLocalSearchParams } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Part } from 'writers_shared'

import { usePieceParts } from '../../../hooks/apollo/use-piece-parts'
import { WriterFloatingButton } from '../../common/buttons/writer-floating-button'
import { AddPartForm } from '../../common/part/add-part-form'
import { WriterBackground } from '../../common/writer-background'
import { WriterText } from '../../common/writer-text'

export function PartCreationScreen() {
  const localSearchParams = useLocalSearchParams()
  const ref = useRef(null)
  const aiButtonRef = useRef(null)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [initialText, setInitialText] = useState('')

  const position = parseInt(localSearchParams.position as string, 10)
  const pieceId = parseInt(localSearchParams.id as string, 10)
  const parentPartId = parseInt(localSearchParams.parentPartId as string, 10)
  // ids concatted with string
  const joinedPreviousPartIds = (localSearchParams.previousPartId ||
    '') as string
  const { parts: allPieceParts, loading, error } = usePieceParts(pieceId)

  const parts = useMemo(() => {
    const previousParts = joinedPreviousPartIds
      .split(',')
      .reduce((acc, curr) => {
        const part = allPieceParts.find(
          (part) => part.id === parseInt(curr, 10),
        )
        if (!part) return acc
        return [...acc, part]
      }, [])
    return [...previousParts, undefined]
  }, [joinedPreviousPartIds, allPieceParts])

  const renderItem = ({ item }: { item: Part }) => {
    if (!item) {
      return (
        <AddPartForm
          position={position}
          pieceId={pieceId}
          parentPartId={parentPartId}
          ref={aiButtonRef}
          joinedPreviousPartIds={joinedPreviousPartIds}
          setInitialText={setInitialText}
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
      <>
        <Animated.FlatList
          ref={ref}
          style={{ flex: 1, marginBottom: 100 }}
          data={parts}
          renderItem={renderItem}
          keyExtractor={(item) => `${item?.id || 'my-key'}`}
          scrollsToTop={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={parts.length ? parts.length - 1 : 0}
          onScrollToIndexFailed={() => {}}
        />

        <WriterFloatingButton
          onPress={() => aiButtonRef.current?.showAiHelp(aiSuggestion)}
          icon="plus"
        />
        {/* <WriterFloatingButton
          onPress={() => aiButtonRef.current?.undo(initialText)}
          icon="backup-restore"
          style={styles.undoBtn}
        /> */}
      </>
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
  undoBtn: {
    right: 100,
  },
})
