import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { Stanza } from 'writers_shared'

import { getWidthByRatio } from '../../../utils/common'
import { WriterText } from '../writer-text'
import { StanzaItem } from './stanza-item'

interface Props {
  stanzas: Stanza[]
}

export const StanzaLine = ({ stanzas }: Props) => {
  const renderItem = ({ item }: { item: Stanza }) => {
    return <StanzaItem stanza={item} containerStyle={styles.stanzaContainer} />
  }

  return (
    <Animated.FlatList
      data={stanzas}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={styles.container}
      horizontal
      // bounces={false}
      scrollEnabled={stanzas.length > 1}
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
        <View style={[styles.stanzaContainer, { backgroundColor: 'red' }]}>
          <WriterText>hello</WriterText>
        </View>
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
  },
})
