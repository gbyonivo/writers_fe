import { useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { Part } from 'writers_shared'

import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { useCopyParts } from '../../../hooks/use-copy-parts'
import { setShouldChainPart } from '../../../store/slices/settings'
import { trackEvent } from '../../../utils/mixpanel'
import {
  onGoToPlayerSignal,
  onPlayPieceSignal,
  onSharePieceSignal,
  onStartPlayingSignal,
} from '../../../utils/signal'
import { TrackedComponentLocation } from '../../../utils/tracking/tracked-component-location'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { WriterText } from '../writer-text'
import { BookmarkDialog } from './bookmark-dialog'
import { NewPartButton } from './new-part-button'
import { PartLine } from './part-line'

interface Props {
  refetch: any
  error: any
  parts?: Part[]
  loading: boolean
  pieceId: number
  preselectedPartIds?: string
}

interface OnSwipeToPartParams {
  partId: number
  position: number
}

export function PartList({ parts = [], pieceId, preselectedPartIds }: Props) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { colors } = useTheme()
  const shouldChainParts = useShouldChainParts()
  const partIds = useMemo(() => {
    if (!!preselectedPartIds) {
      dispatch(setShouldChainPart(false))
    }
    return !!preselectedPartIds ? preselectedPartIds.split(',') : []
  }, [preselectedPartIds])

  // the ref is needed coz the state keeps resetting
  const positionToPartIdMapRef = useRef({})
  const [positionToPartIdMap, setPositionToPartIdMap] = useState(() => ({}))
  const { writeToClipboard } = useCopyParts({
    partIds: Object.values(positionToPartIdMap),
  })

  const map = useMemo(() => {
    return parts.reduce((acc, part) => {
      return {
        ...acc,
        [part.position]: acc[part.position]
          ? [part, ...acc[part.position]]
          : [part],
      }
    }, {})
  }, [parts, shouldChainParts])

  useEffect(() => {
    let removeListener = null
    if (onPlayPieceSignal.getNumberOfListeners() < 1) {
      removeListener = onPlayPieceSignal.listen(() => {
        onStartPlayingSignal.emit({
          partIds: Object.values(positionToPartIdMapRef.current),
          pieceId,
        })
        router.navigate(
          `/player/${pieceId}?partIds=${Object.values(positionToPartIdMapRef.current).join(',')}`,
        )
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  useEffect(() => {
    let removeListener = null
    if (onGoToPlayerSignal.getNumberOfListeners() < 1) {
      removeListener = onGoToPlayerSignal.listen(() => {
        router.navigate(
          `/player/${pieceId}?partIds=${Object.values(positionToPartIdMapRef.current).join(',')}`,
        )
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  useEffect(() => {
    let removeListener = null
    if (onSharePieceSignal.getNumberOfListeners() < 1) {
      removeListener = onSharePieceSignal.listen(() => {
        writeToClipboard()
      })
    }

    return () => {
      removeListener?.()
    }
  }, [])

  const onSwipeToPart = ({ partId, position }: OnSwipeToPartParams) => {
    if (!partId) return
    const newValue = {
      ...positionToPartIdMapRef.current,
      [position]: partId,
    }
    setPositionToPartIdMap(newValue)
    positionToPartIdMapRef.current = newValue
  }

  const getShouldGoNextLine = useCallback(() => {
    const positions = Object.keys(positionToPartIdMap)
    if (positions.length === 1) {
      return true
    }
    const highestPosition = positions[positions.length - 1]
    const positionBeforeHighest = positionToPartIdMap[positions.length - 2]
    const numberOfPartsInHighestPosition = (map[highestPosition] || []).filter(
      (part: Part) => part.partId === positionBeforeHighest,
    ).length

    return numberOfPartsInHighestPosition === 2 || positions.length === 1
  }, [map, positionToPartIdMap])

  const onPressAddPart = useCallback(() => {
    const positions = Object.keys(positionToPartIdMap)
    const highestPosition = positions[positions.length - 1]
    const shouldGoNextLine = getShouldGoNextLine()

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
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        queryString,
        pieceId,
        location: TrackedComponentLocation.ADD_PART_BUTTON,
      },
    })
    router.push(`/pieces/${pieceId}/new-part?${queryString}`)
  }, [pieceId, map, positionToPartIdMap, getShouldGoNextLine])

  const renderItem = ({ item, index }) => {
    const partListForPosition = map[item]
    return (
      <PartLine
        parts={partListForPosition}
        onPressAdd={onPressAddPart}
        shouldShowAddButton={
          !getShouldGoNextLine() && index === Object.keys(map).length - 1
        }
        onSwipeToPart={onSwipeToPart}
        position={item}
        filterParentPieceId={positionToPartIdMap[item - 1]}
        preselectedPartId={partIds[index]}
        lineIndex={index}
      />
    )
  }

  return (
    <View style={styles.container}>
      <BookmarkDialog
        pieceId={pieceId}
        partIds={Object.values(positionToPartIdMapRef.current)}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={Object.keys(map)}
        renderItem={renderItem}
        keyExtractor={(item, index) => (map[item][0] ? map[item][0].id : index)}
        ItemSeparatorComponent={(props) => {
          return (
            <View style={styles.separator}>
              <View
                style={[
                  styles.separatorLine,
                  { backgroundColor: colors.backdrop },
                ]}
              />
              <WriterText
                size={24}
                color={colors.scrim}
                style={styles.separatorNumber}
              >
                {parseInt(props.leadingItem, 10) + 1}
              </WriterText>
              <View
                style={[
                  styles.separatorLine,
                  { backgroundColor: colors.backdrop },
                ]}
              />
            </View>
          )
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          getShouldGoNextLine() && (
            <>
              <NewPartButton
                onPressAddPart={onPressAddPart}
                showAddPartToLineButton={
                  shouldChainParts && Object.keys(map).length < 3
                }
              />
            </>
          )
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
    paddingBottom: 96,
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  separatorLine: {
    height: 1,
    flex: 1,
    marginTop: 16,
  },
  bookmarkButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 8,
  },
  separatorNumber: { paddingHorizontal: 8 },
})
