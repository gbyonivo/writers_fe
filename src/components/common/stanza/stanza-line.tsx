import { useMemo, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { Stanza } from 'writers_shared'

import { AppState } from '../../../types/states/AppState'
import { getWidthByRatio } from '../../../utils/common'
import { WriterIconButton } from '../writer-icon-button'
import { StanzaItem } from './stanza-item'

interface Props {
  stanzas: Stanza[]
  onPressAdd: () => void
  shouldShowAddButton: boolean
  disabled?: boolean
  setStanzaIdForPosition: (val: { stanzaId: number; position: number }) => void
  position: number
  filterParentPoemId?: number
}

export function StanzaLine({
  stanzas,
  onPressAdd,
  shouldShowAddButton,
  disabled,
  setStanzaIdForPosition,
  position,
  filterParentPoemId,
}: Props) {
  const { shouldChainStanzas } = useSelector(
    (state: AppState) => state.settings,
  )
  const flatlistRef = useRef<Animated.FlatList<Stanza>>()
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setStanzaIdForPosition({ stanzaId: viewableItems[0]?.item?.id, position })
  }).current

  const renderItem = ({ item }: { item: Stanza }) => {
    return <StanzaItem stanza={item} containerStyle={styles.stanzaContainer} />
  }

  const filteredStanzas = useMemo(() => {
    if (!filterParentPoemId || !shouldChainStanzas) return stanzas
    return stanzas.filter((stanza) => stanza.stanzaId === filterParentPoemId)
  }, [stanzas, filterParentPoemId, shouldChainStanzas])

  return (
    <Animated.FlatList
      onViewableItemsChanged={onViewableItemsChanged}
      ref={flatlistRef}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 99,
      }}
      data={filteredStanzas}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={styles.container}
      horizontal
      // bounces={false}
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
      snapToInterval={getWidthByRatio(1)}
      // ListHeaderComponent={
      //   <View style={[styles.position, { backgroundColor: colors.backdrop }]}>
      //     <WriterText size={64} align="center">
      //       {position}
      //     </WriterText>
      //   </View>
      // }
      ListFooterComponent={
        shouldShowAddButton ? (
          <View style={[styles.stanzaContainer, styles.buttonContainer]}>
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
  stanzaContainer: {
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
