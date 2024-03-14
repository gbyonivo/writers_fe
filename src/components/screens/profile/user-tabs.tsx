import { useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'

import { PoemListContainer } from '../../common/poem/poem-list-container'
import { WriterTabBar } from '../../common/writer-tab-bar'
import { WriterText } from '../../common/writer-text'

const SecondRoute = () => (
  <View style={{ flex: 1, padding: 16 }}>
    <WriterText size={24}>Coming Soon...</WriterText>
  </View>
)

const routes = [
  { key: 'poems', title: 'Poems' },
  { key: 'groupPoems', title: 'Stories' },
]

const renderScene = SceneMap({
  poems: PoemListContainer,
  groupPoems: SecondRoute,
})

export function UserTabs() {
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
