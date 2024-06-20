import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'

import { WriterTabBar } from '../../common/writer-tab-bar'
import { SearchPoemsTab } from './search-poems-tab'
import { SearchUsersTab } from './search-users-tab'

const routes = [
  { key: 'poems', title: 'Poems' },
  // { key: 'stanzas', title: 'Stanzas' },
  { key: 'writers', title: 'Writers' },
]

const renderScene = SceneMap({
  poems: SearchPoemsTab,
  // stanzas: SearchPoemsTab,
  writers: SearchUsersTab,
})

export function DoneSearchValueState() {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
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
