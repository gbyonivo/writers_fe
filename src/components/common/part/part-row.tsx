import { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { Part } from 'writers_shared'

import { AppState } from '../../../types/states/AppState'
import { getWidthByRatio } from '../../../utils/common'
import { MAX_NUMBER_OF_PARTS_PER_LINE } from '../../../utils/constants'
import { WriterIconButton } from '../writer-icon-button'
import { WriterText } from '../writer-text'
import { PartItem } from './part-item'

interface Props {
  lineIndex: number
  parts: Part[]
  onSwipeToPart: (val: Record<number, number>) => void
  parentPartId?: number
  onPressAddToPosition: (val: {
    position: number
    parentPartId: number
  }) => void
  iniitialPartId?: number
  // this just means an ending already exists for the piece
  isEndOfPiece?: boolean
}

enum OtherItem {
  ADD_BUTTON = 'ADD_BUTTON',
}

type ListItem = Part | OtherItem

export function PartRow({
  lineIndex,
  parts,
  onSwipeToPart,
  parentPartId,
  onPressAddToPosition,
  iniitialPartId,
  isEndOfPiece,
}: Props) {
  const [current, setCurrent] = useState({ position: null, partId: null })
  const position = parts[0]?.position
  const theme = useTheme()
  const flatlistRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { shouldChainParts } = useSelector((state: AppState) => state.settings)
  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    const key = viewableItems[0]?.item?.position || changed[0]?.item?.position
    setCurrentIndex(viewableItems[0]?.index)
    setCurrent({
      position: key,
      partId: viewableItems[0]?.item?.id,
    })
  }).current

  useEffect(() => {
    onSwipeToPart(current)
  }, [current])

  useEffect(() => {
    if (!iniitialPartId) return
    const index = parts.findIndex((part) => part.id === iniitialPartId)
    setTimeout(() => {
      flatlistRef?.current?.scrollToIndex({
        animated: true,
        index: index,
      })
    }, 500)
  }, [iniitialPartId])

  const partsDisplayed = useMemo(() => {
    if (shouldChainParts && parentPartId) {
      const filtered = parts.filter((part) => part.partId === parentPartId)
      return filtered.length < MAX_NUMBER_OF_PARTS_PER_LINE
        ? [...filtered, OtherItem.ADD_BUTTON]
        : filtered
    }
    return parts
  }, [shouldChainParts, parts, parentPartId])

  const hasSlotToAdd =
    partsDisplayed[partsDisplayed.length - 1] === OtherItem.ADD_BUTTON

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item === OtherItem.ADD_BUTTON) {
      return (
        <View style={[styles.partContainer, styles.buttonContainer]}>
          <WriterIconButton
            icon="plus"
            onPress={() => onPressAddToPosition({ position, parentPartId })}
            style={styles.buttonStyle}
          />
        </View>
      )
    }
    return (
      <PartItem
        part={item as Part}
        containerStyle={styles.partContainer}
        lineIndex={lineIndex}
      />
    )
  }

  return (
    <View>
      <Animated.FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        data={partsDisplayed}
        renderItem={renderItem}
        keyExtractor={(item) => `${(item as Part).id || item}`}
        horizontal
        disableIntervalMomentum
        pagingEnabled
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef}
      />
      {hasSlotToAdd && currentIndex !== partsDisplayed.length - 1 && (
        <TouchableOpacity
          style={styles.leftRightControls}
          onPress={() => flatlistRef.current.scrollToEnd()}
        >
          <WriterText align="center" color={theme.colors.outlineVariant}>
            Swipe Right To Add Your {isEndOfPiece ? 'End' : 'Part'}
          </WriterText>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  partContainer: {
    width: getWidthByRatio(0.9),
    marginHorizontal: getWidthByRatio(0.05),
    justifyContent: 'center',
  },
  buttonStyle: {
    alignSelf: 'center',
  },
  buttonContainer: {
    paddingTop: 24,
  },
  position: {
    width: 48,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  leftRightControls: {
    height: 48,
    width: getWidthByRatio(0.8),
    marginLeft: getWidthByRatio(0.1),
    paddingTop: 8,
    marginTop: 16,
  },
})
