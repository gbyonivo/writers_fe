import { useEffect, useMemo, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Part } from 'writers_shared'

import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { getWidthByRatio } from '../../../utils/common'
import { WriterIconButton } from '../writer-icon-button'
import { PartItem } from './part-item'

interface Props {
  parts: Part[]
  onPressAdd: () => void
  shouldShowAddButton: boolean
  disabled?: boolean
  setPartIdForPosition: (val: { partId: number; position: number }) => void
  position: number
  filterParentPieceId?: number
  preselectedPartId?: string
}

export function PartLine({
  parts,
  onPressAdd,
  shouldShowAddButton,
  disabled,
  setPartIdForPosition,
  position,
  filterParentPieceId,
  preselectedPartId,
}: Props) {
  const shouldChainParts = useShouldChainParts()
  const flatlistRef = useRef<Animated.FlatList<Part>>()
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setPartIdForPosition({ partId: viewableItems[0]?.item?.id, position })
  }).current

  const renderItem = ({ item }: { item: Part }) => {
    return <PartItem part={item} containerStyle={styles.partContainer} />
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
    if (!filterParentPieceId || !shouldChainParts) return parts
    return parts.filter((part) => part.partId === filterParentPieceId)
  }, [parts, filterParentPieceId, shouldChainParts])

  return (
    <Animated.FlatList
      onViewableItemsChanged={onViewableItemsChanged}
      ref={flatlistRef}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 99,
      }}
      data={filteredParts}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={styles.container}
      horizontal
      scrollEnabled={!disabled}
      scrollsToTop={false}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={7}
      onScroll={() => {}}
      showsHorizontalScrollIndicator={false}
      disableIntervalMomentum
      pagingEnabled
      snapToAlignment="start"
      onScrollToIndexFailed={(e) => console.log(e)}
      snapToInterval={getWidthByRatio(1)}
      ListFooterComponent={
        shouldShowAddButton ? (
          <View style={[styles.partContainer, styles.buttonContainer]}>
            <WriterIconButton
              icon="plus"
              onPress={onPressAdd}
              style={styles.buttonStyle}
            />
          </View>
        ) : null
      }
    />
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
