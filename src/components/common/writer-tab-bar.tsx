import { Icon, useTheme } from 'react-native-paper'
import { SceneRendererProps, TabBar } from 'react-native-tab-view'

import { WriterText } from './writer-text'

interface Props extends SceneRendererProps {
  icon?: string
  [key: string]: any
}

export const WriterTabBar = ({ icon, ...props }: Props) => {
  const theme = useTheme()
  return (
    // @ts-ignore
    <TabBar
      {...props}
      style={{ backgroundColor: theme.colors.background }}
      indicatorStyle={{ backgroundColor: 'white' }}
      renderIcon={({ route, focused, color }) =>
        icon ? (
          <Icon
            source={focused ? 'account' : 'album'}
            color={color}
            size={12}
          />
        ) : null
      }
      renderLabel={({ route }) => <WriterText>{route.title}</WriterText>}
    />
  )
}
