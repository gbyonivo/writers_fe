import { useRouter } from 'expo-router'
import { useCallback, useMemo, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Part } from 'writers_shared'

import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { NewPartButton } from './new-part-button'
import { PartLine } from './part-line'

interface Props {
  refetch: any
  error: any
  parts?: Part[]
  loading: boolean
  pieceId: number
}

interface OnSwipeToPartParams {
  partId: number
  position: number
}

export function PartList({ parts = [], pieceId, refetch }: Props) {
  const router = useRouter()
  const shouldChainParts = useShouldChainParts()
  // the ref is needed coz the state keeps resetting
  const positionToPartIdMapRef = useRef({})
  const [positionToPartIdMap, setPositionToPartIdMap] = useState(() => ({}))
  const map = useMemo(() => {
    return parts.reduce(
      (acc, part) => ({
        ...acc,
        [part.position]: acc[part.position]
          ? [part, ...acc[part.position]]
          : [part],
      }),
      {},
    )
  }, [parts])
  const onSwipeToPart = ({ partId, position }: OnSwipeToPartParams) => {
    if (!partId) return
    const newValue = {
      ...positionToPartIdMapRef.current,
      [position]: partId,
    }
    setPositionToPartIdMap(newValue)
    positionToPartIdMapRef.current = newValue
  }

  const onPressAddPart = useCallback(() => {
    const positions = Object.keys(positionToPartIdMap)
    const highestPosition = positions[positions.length - 1]
    const numberOfPartsInHighestPosition = map[highestPosition].length
    const shouldGoNextLine = numberOfPartsInHighestPosition === 3

    let newPartPosition =
      parseInt(highestPosition, 10) === 1 ? 2 : parseInt(highestPosition, 10)
    if (shouldGoNextLine) {
      newPartPosition = parseInt(highestPosition, 10) + 1
    }

    const previousParts = Object.keys(positionToPartIdMap)
      .filter((pos) => parseInt(pos, 10) !== newPartPosition)
      .map((pos) => positionToPartIdMap[pos])

    const parentPartId = previousParts[previousParts.length - 1]
    const queryString = [
      `parentPartId=${parentPartId}`,
      `position=${newPartPosition}`,
      `previousPartId=${previousParts.join(',')}`,
    ].join('&')
    router.push(`/pieces/${pieceId}/new-part?${queryString}`)
  }, [pieceId, map, positionToPartIdMap])

  const renderItem = ({ item }) => {
    const partListForPosition = map[item]
    return (
      <PartLine
        parts={partListForPosition}
        onPressAdd={onPressAddPart}
        shouldShowAddButton={false}
        setPartIdForPosition={onSwipeToPart}
        position={item}
        filterParentPieceId={positionToPartIdMap[item - 1]}
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
          <NewPartButton
            onPressAddPart={onPressAddPart}
            showAddPartToLineButton={shouldChainParts}
          />
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
