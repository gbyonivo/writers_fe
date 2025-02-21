import omit from 'lodash.omit'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { Part } from 'writers_shared'

import { usePieceParts } from '../../../hooks/apollo/use-piece-parts'
import { usePartsGroupedInPosition } from '../../../hooks/use-parts-grouped-in-position'
import { usePressAddPart } from '../../../hooks/use-press-add-part'
import { useRegisterSignalsForPartList } from '../../../hooks/use-register-signals-for-part-list'
import { setShouldChainPart } from '../../../store/slices/settings'
import { AppState } from '../../../types/states/AppState'
import {
  MAX_NUMBER_OF_PARTS_PER_LINE,
  ROW_LIMITS_PER_PIECE,
} from '../../../utils/constants'
import { WriterButton } from '../writer-button'
import { WriterSpinner } from '../writer-spinner'
import { WriterText } from '../writer-text'
import { BookmarkDialog } from './bookmark-dialog'
import { PartRow } from './part-row'

interface Props {
  pieceId: number
  preselectedPartIds?: string
}

export function PartList({ pieceId, preselectedPartIds }: Props) {
  const {
    loading,
    parts,
    error: errorFetchingPieceParts,
    refetch: refetchPieceParts,
  } = usePieceParts(pieceId)
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const groupedParts = usePartsGroupedInPosition({ parts })
  const [positionMap, setPositionMap] = useState({})
  const shouldChainParts = useSelector(
    (state: AppState) => state.settings.shouldChainParts,
  )

  const groupedPartsInSections = useMemo(() => {
    return Object.values(groupedParts)
  }, [groupedParts])
  useRegisterSignalsForPartList({
    pieceId,
    positionMap,
  })

  const lineCount = useMemo(() => {
    return Object.keys(groupedParts).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: (groupedParts[curr] || []).filter(
          (part: Part) => part.partId === positionMap[parseInt(curr, 10) - 1],
        ).length,
      }),
      {},
    )
  }, [groupedParts, positionMap])

  const isEndOfPiece = Object.keys(positionMap).length >= ROW_LIMITS_PER_PIECE
  const highestPosition = parseInt(Object.keys(groupedParts).sort().pop(), 10)
  const shouldAddToNewPostion =
    (highestPosition === 1 ||
      lineCount[highestPosition] >= MAX_NUMBER_OF_PARTS_PER_LINE) &&
    shouldChainParts &&
    !isEndOfPiece

  const onSwipeToPart = useCallback(
    (val: { position?: number; partId?: number }) => {
      if (val.position === null || val.position === undefined) return
      if (val.partId === null || val.partId === undefined) {
        setPositionMap(omit(positionMap, val.position))
        return
      }
      setPositionMap({ ...positionMap, [val.position]: val.partId })
    },
    [positionMap],
  )

  const { onPressAddToPosition, onPressAddToNewPosition } = usePressAddPart({
    pieceId,
    positionMap,
  })

  useEffect(() => {
    if (preselectedPartIds) {
      dispatch(setShouldChainPart(false))
    }
  }, [preselectedPartIds])

  const renderItem = ({ item, index }) => {
    const [part] = item
    const parentPartId = positionMap[part.position - 1]
    const preselectedPartIdsArr = preselectedPartIds
      ? preselectedPartIds.split(',')
      : []
    const selectedPartId = preselectedPartIdsArr[index]
      ? parseInt(preselectedPartIdsArr[index], 10)
      : null
    return (
      <PartRow
        parts={item}
        lineIndex={index}
        onSwipeToPart={onSwipeToPart}
        parentPartId={parentPartId}
        onPressAddToPosition={onPressAddToPosition}
        iniitialPartId={selectedPartId}
        isEndOfPiece={isEndOfPiece}
      />
    )
  }

  return (
    <View style={styles.container}>
      {loading && <WriterSpinner />}
      <BookmarkDialog pieceId={pieceId} partIds={Object.values(positionMap)} />
      <FlatList
        keyExtractor={(item, index) => {
          return `${index}`
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        data={groupedPartsInSections}
        ListFooterComponent={
          <>
            {shouldAddToNewPostion && (
              <View style={styles.addBtn}>
                <WriterButton
                  onPress={() =>
                    onPressAddToNewPosition({
                      position: highestPosition + 1,
                      parentPartId: positionMap[highestPosition],
                    })
                  }
                >
                  Start New Line
                </WriterButton>
              </View>
            )}
            {isEndOfPiece && (
              <View style={styles.end}>
                <WriterText color={colors.onSecondary}>~The End~</WriterText>
              </View>
            )}
          </>
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
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
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
  addBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  end: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})
