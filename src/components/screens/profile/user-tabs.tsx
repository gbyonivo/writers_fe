import { useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'

import { PieceListForUser } from '../../common/piece/piece-list-for-user'
import { WriterTabBar } from '../../common/writer-tab-bar'
import { WriterText } from '../../common/writer-text'

const SecondRoute = () => (
  <View style={{ flex: 1, padding: 16 }}>
    <WriterText size={24}>Coming Soon...</WriterText>
  </View>
)

const routes = [
  { key: 'pieces', title: 'Pieces' },
  { key: 'groupPieces', title: 'Stories' },
]

export function UserTabs({ userId }: { userId: number }) {
  const layout = useWindowDimensions()

  const renderScene = SceneMap({
    pieces: () => <PieceListForUser userId={userId} />,
    groupPieces: SecondRoute,
  })

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
