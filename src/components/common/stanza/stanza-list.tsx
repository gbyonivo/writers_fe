import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Stanza } from 'writers_shared'

import { WriterText } from '../writer-text'
import { StanzaLine } from './stanza-line'

interface Props {
  refetch: any
  error: any
  stanzas?: Stanza[]
  loading: boolean
}

export const StanzaList = ({ stanzas = [] }: Props) => {
  const groupedStanzas = useMemo(() => {
    return stanzas.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.position]: !acc[curr.position]
          ? [curr]
          : [...acc[curr.position], curr],
      }),
      {},
    )
  }, [stanzas])

  const renderItem = ({ item, index }) => {
    return <StanzaLine stanzas={item} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={Object.values(groupedStanzas)}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item[0] ? item[0].id : index)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
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
