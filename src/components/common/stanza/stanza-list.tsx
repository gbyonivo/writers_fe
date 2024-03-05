import { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Stanza } from 'writers_shared'

import { NewStanza } from './new-stanza'
import { StanzaLine } from './stanza-line'

interface Props {
  refetch: any
  error: any
  stanzas?: Stanza[]
  loading: boolean
  poemId: number
}

const getPosition = ({
  groupedStanzas,
  stanzasLength,
}: {
  stanzasLength: number
  groupedStanzas: { [key: number]: Stanza }
}) => {
  const keys = Object.keys(groupedStanzas)
  const highestKey = keys[keys.length - 1]
  const shouldGoToNextPosition =
    (groupedStanzas[highestKey]?.length || 0) >= 4 || stanzasLength === 1
  return {
    shouldGoToNextPosition,
    position: shouldGoToNextPosition
      ? parseInt(highestKey, 10) + 1
      : parseInt(highestKey, 10),
  }
}

export const StanzaList = ({ stanzas = [], poemId, refetch }: Props) => {
  const [shouldShowAddStanzaForm, setShouldShowAddStanzaForm] = useState(false)
  const [positionToStanzaIdMap, setPositionToStanzaIdMap] = useState({})

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

  const { position, shouldGoToNextPosition } = useMemo(
    () => getPosition({ groupedStanzas, stanzasLength: stanzas.length }),
    [groupedStanzas, stanzas.length],
  )

  const onPressShowForm = () => {
    setShouldShowAddStanzaForm(true)
  }

  const onPressHideForm = () => {
    setShouldShowAddStanzaForm(false)
  }

  const renderItem = ({ item, index }) => {
    return (
      <StanzaLine
        stanzas={item}
        onPressAdd={onPressShowForm}
        shouldShowAddButton={position === index + 1}
        disabled={shouldShowAddStanzaForm || index === 0}
        setStanzaIdForPosition={(stanzaId: number) => {
          setPositionToStanzaIdMap({
            ...positionToStanzaIdMap,
            [index + 1]: stanzaId,
          })
        }}
      />
    )
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
        ListFooterComponent={
          <NewStanza
            poemId={poemId}
            position={position}
            onSuccess={refetch}
            hideForm={onPressHideForm}
            showForm={onPressShowForm}
            shouldShowForm={shouldShowAddStanzaForm}
            shouldShowToggleButton={shouldGoToNextPosition}
            parentStanzaId={positionToStanzaIdMap[position - 1]}
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
