import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'

import { useSearchValue } from '../../../hooks/selectors/use-search-value'
import { WriterTabBar } from '../../common/writer-tab-bar'
import { SearchPiecesTab } from './search-pieces-tab'
import { SearchUsersTab } from './search-users-tab'

const routes = [
  { key: 'pieces', title: 'Pieces' },
  { key: 'writers', title: 'Writers' },
]

const renderScene = SceneMap({
  pieces: SearchPiecesTab,
  writers: SearchUsersTab,
})

export function DoneSearchValueState() {
  const isGenreSearch = useSearchValue().includes('#')
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)

  if (isGenreSearch) {
    return <SearchPiecesTab />
  }
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => <WriterTabBar {...props} />}
    />
  )
}
