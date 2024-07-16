import { useState } from 'react'
import { StyleProp, ViewStyle, useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { PieceType } from 'writers_shared/dist'

import { PieceListContainer } from '../../common/piece/piece-list-container'
import { WriterTabBar } from '../../common/writer-tab-bar'

const routes = [
  { key: 'poems', title: 'Poems' },
  { key: 'stories', title: 'Stories' },
]

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  userId?: number
}

export function PieceListInTabs({ userId, containerStyle }: Props) {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)

  const renderScene = SceneMap({
    poems: () => <PieceListContainer userId={userId} type={PieceType.POEM} />,
    stories: () => (
      <PieceListContainer userId={userId} type={PieceType.STORY} />
    ),
  })
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => <WriterTabBar {...props} />}
      style={[containerStyle]}
    />
  )
}
