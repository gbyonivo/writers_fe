import { useMemo, useState } from 'react'
import { StyleProp, ViewStyle, useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { PieceType } from 'writers_shared/dist'

import { PieceListContainer } from '../../common/piece/piece-list-container'
import { WriterTabBar } from '../../common/writer-tab-bar'
import { Bookmarks } from '../profile/bookmarks'

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  userId?: number
  showBookmark?: boolean
}

export function PieceListInTabs({
  userId,
  containerStyle,
  showBookmark,
}: Props) {
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const routes = useMemo(() => {
    const initialRoutes = [
      { key: 'poems', title: 'Poems' },
      { key: 'stories', title: 'Stories' },
    ]
    if (showBookmark) {
      return initialRoutes.concat({ key: 'bookmarks', title: 'Bookmarks' })
    }
    return initialRoutes
  }, [showBookmark])

  const renderScene = SceneMap({
    poems: () => <PieceListContainer userId={userId} type={PieceType.POEM} />,
    stories: () => (
      <PieceListContainer userId={userId} type={PieceType.STORY} />
    ),
    bookmarks: () => <Bookmarks userId={userId} />,
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
