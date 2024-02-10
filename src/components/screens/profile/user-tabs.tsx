import { useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'

import { PoemListContainer } from '../../common/poem/poem-list-container'
import { WriterTabBar } from '../../common/writer-tab-bar'

const SecondRoute = () => <View style={{ flex: 1 }} />

const routes = [
  { key: 'poems', title: 'Poems' },
  { key: 'groupPoems', title: 'Group Poems' },
]

const renderScene = SceneMap({
  poems: PoemListContainer,
  groupPoems: SecondRoute,
})

export const UserTabs = () => {
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
