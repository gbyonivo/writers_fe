import { FlatList, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePoemListContext } from '../../../context/poem-list-context'
import { PoemItem } from './poem-item'

export const PoemList = () => {
  const theme = useTheme()
  const { poemIds } = usePoemListContext()
  return (
    <FlatList
      data={poemIds}
      renderItem={({ item }) => <PoemItem poemId={item} />}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
