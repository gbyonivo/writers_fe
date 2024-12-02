import { useMemo, useState } from 'react'
import { StyleProp, ViewStyle, useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { PieceType } from 'writers_shared/dist'

import { WriterTabBar } from '../../common/writer-tab-bar'
import { PieceListInGenres } from './piece-list-in-genres'

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  userId?: number
}

export function PieceListInGenresTabs({ containerStyle }: Props) {
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const routes = useMemo(() => {
    const initialRoutes = [
      { key: 'poems', title: 'Poems' },
      { key: 'stories', title: 'Stories' },
    ]
    return initialRoutes
  }, [])

  const renderScene = SceneMap({
    poems: () => <PieceListInGenres type={PieceType.POEM} />,

    stories: () => <PieceListInGenres type={PieceType.STORY} />,
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
