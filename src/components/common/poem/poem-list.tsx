import { FlatList } from 'react-native'

import { usePoemListContext } from '../../../context/poem-list-context'
import { PoemItem } from './poem-item'

export const PoemList = () => {
  const { poemIds } = usePoemListContext()
  return (
    <FlatList
      data={poemIds}
      renderItem={({ item }) => <PoemItem poemId={item} />}
    />
  )
}
