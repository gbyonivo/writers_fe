import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Stanza } from 'writers_shared'

import { useBottomSheetContext } from '../../../context/bottom-sheet-context'
import { useStanzaMutation } from '../../../hooks/apollo/use-stanza-mutation'
import { BottomSheet } from '../../../types/bottom-sheet'
import { NewStanza } from './new-stanza'
import { StanzaLine } from './stanza-line'

interface Props {
  refetch: any
  error: any
  stanzas?: Stanza[]
  loading: boolean
  poemId: number
}

interface OnSwipeToStanzaParams {
  stanzaId: number
  position: number
}

export function StanzaList({ stanzas = [], poemId, refetch }: Props) {
  const { selectBottomSheet } = useBottomSheetContext()
  const { createStanza } = useStanzaMutation()
  const positionToStanzaIdMapRef = useRef({})
  const [positionToStanzaIdMap, setPositionToStanzaIdMap] = useState(() => ({}))
  const stanzaMap = useMemo(
    () => stanzas.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
    [],
  )
  const map = useMemo(
    () =>
      stanzas.reduce(
        (acc, stanza) => ({
          ...acc,
          [stanza.position]: acc[stanza.position]
            ? [stanza, ...acc[stanza.position]]
            : [stanza],
        }),
        {},
      ),
    [],
  )
  const onSwipeToStanza = ({ stanzaId, position }: OnSwipeToStanzaParams) => {
    if (!stanzaId) return
    const newValue = {
      ...positionToStanzaIdMapRef.current,
      [position]: stanzaId,
    }
    setPositionToStanzaIdMap(newValue)
    positionToStanzaIdMapRef.current = newValue
  }

  const onPressAddStanza = useCallback(() => {
    const positions = Object.keys(positionToStanzaIdMap)
    const highestPosition = positions[positions.length - 1]
    const numberOfStanzasInHighestPosition = map[highestPosition].length
    const shouldGoNextLine = numberOfStanzasInHighestPosition === 1

    let newStanzaPosition =
      parseInt(highestPosition, 10) === 1 ? 2 : highestPosition
    if (shouldGoNextLine) {
      newStanzaPosition = highestPosition + 1
    }

    const previousStanzas = Object.keys(positionToStanzaIdMap)
      .filter((pos) => pos !== newStanzaPosition)
      .map((pos) => {
        console.log(positionToStanzaIdMap[pos])
        return stanzaMap[positionToStanzaIdMap[pos]]
      })

    const parentStanzaId = previousStanzas[previousStanzas.length - 1]?.id

    selectBottomSheet({
      bottomSheet: BottomSheet.ADD_STANZA,
      params: {
        poemId,
        position: newStanzaPosition,
        parentStanzaId,
        previousStanzas,
        createStanza,
        onSuccess: refetch,
      },
    })
  }, [poemId, map, positionToStanzaIdMap, stanzaMap])

  const renderItem = ({ item, index }) => {
    const stanzaListForPosition = map[item]
    return (
      <StanzaLine
        stanzas={stanzaListForPosition}
        onPressAdd={onPressAddStanza}
        shouldShowAddButton={false}
        setStanzaIdForPosition={onSwipeToStanza}
        position={item}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={Object.keys(map)}
        renderItem={renderItem}
        keyExtractor={(item, index) => (map[item][0] ? map[item][0].id : index)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          <NewStanza onPressAdd={onPressAddStanza} shouldShowToggleButton />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  separator: {
    height: 8,
  },
})
