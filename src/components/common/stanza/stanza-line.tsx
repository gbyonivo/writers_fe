import { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Stanza } from 'writers_shared'

import { getWidthByRatio } from '../../../utils/common'
import { WriterIconButton } from '../writer-icon-button'
import { StanzaItem } from './stanza-item'

interface Props {
  stanzas: Stanza[]
  onPressAdd: () => void
  shouldShowAddButton: boolean
  disabled: boolean
  setStanzaIdForPosition: (stanzaId: number) => void
}

export const StanzaLine = ({
  stanzas,
  onPressAdd,
  shouldShowAddButton,
  disabled,
  setStanzaIdForPosition,
}: Props) => {
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setStanzaIdForPosition(viewableItems[0]?.item?.id)
  }).current

  const renderItem = ({ item }: { item: Stanza }) => {
    return <StanzaItem stanza={item} containerStyle={styles.stanzaContainer} />
  }

  return (
    <Animated.FlatList
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 80,
      }}
      data={stanzas}
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
})
