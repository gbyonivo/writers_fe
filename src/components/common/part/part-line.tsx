import { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated from 'react-native-reanimated'
import { Part } from 'writers_shared'

import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { getWidthByRatio } from '../../../utils/common'
import { WriterIconButton } from '../writer-icon-button'
import { WriterText } from '../writer-text'
import { PartItem } from './part-item'

enum OtherItem {
  ADD_BUTTON = 'ADD_BUTTON',
}

type ListItem = Part | OtherItem

interface Props {
  parts: Part[]
  onPressAdd: () => void
  shouldShowAddButton: boolean
  disabled?: boolean
  onSwipeToPart: (val: { partId: number; position: number }) => void
  position: number
  filterParentPieceId?: number
  preselectedPartId?: string
  lineIndex: number
}

export function PartLine({
  parts,
  onPressAdd,
  shouldShowAddButton,
  disabled,
  onSwipeToPart,
  position,
  filterParentPieceId,
  preselectedPartId,
  lineIndex,
}: Props) {
  const shouldChainParts = useShouldChainParts()
  const theme = useTheme()
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const flatlistRef = useRef<Animated.FlatList<Part>>()
  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    setCurrentIndex(changed[0]?.index)
    onSwipeToPart({ partId: viewableItems[0]?.item?.id, position })
  }).current

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item === OtherItem.ADD_BUTTON) {
      return (
        <View style={[styles.partContainer, styles.buttonContainer]}>
          <WriterIconButton
            icon="plus"
            onPress={onPressAdd}
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

  const initialPartIdIndex = useMemo(() => {
    if (!preselectedPartId) return 0
    const index = parts.findIndex(
      ({ id }) => id === parseInt(preselectedPartId, 10),
    )
    return index > -1 ? index : 0
  }, [preselectedPartId, parts])

  useEffect(() => {
    if (!initialPartIdIndex) return
    setTimeout(() => {
      flatlistRef?.current?.scrollToIndex({
        animated: true,
        index: initialPartIdIndex,
      })
    }, 500)
  }, [initialPartIdIndex])

  const filteredParts = useMemo(() => {
    const partsToDisplay =
      !filterParentPieceId || !useShouldChainParts
        ? parts
        : parts.filter((part) => part.partId === filterParentPieceId)
    return shouldShowAddButton && shouldChainParts
      ? [...partsToDisplay, OtherItem.ADD_BUTTON]
      : partsToDisplay
  }, [parts, filterParentPieceId, shouldChainParts, shouldShowAddButton])

  const goToAddButton = () => {
    flatlistRef.current.scrollToEnd()
  }

  return (
    <View>
      <Animated.FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        ref={flatlistRef}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 99,
        }}
        data={filteredParts}
        renderItem={renderItem}
        keyExtractor={(item) => `${(item as Part).id || item}`}
        contentContainerStyle={styles.container}
        horizontal
        scrollEnabled={!disabled}
        scrollsToTop={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum
        pagingEnabled
        snapToAlignment="start"
        onScrollToIndexFailed={(e) => console.log(e)}
        snapToInterval={getWidthByRatio(1)}
        ListFooterComponent={shouldShowAddButton ? null : null}
      />
      {shouldShowAddButton &&
        currentIndex !== null &&
        filteredParts.length - 1 !== currentIndex &&
        shouldChainParts && (
          <TouchableOpacity onPress={goToAddButton}>
            <WriterText
              align="center"
              mt={16}
              color={theme.colors.outlineVariant}
            >
              Swipe Right To Add
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
})
