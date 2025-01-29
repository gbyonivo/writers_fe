import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SceneRendererProps, TabBar } from 'react-native-tab-view'

import { getWidthByRatio } from '../../utils/common'
import { trackEvent } from '../../utils/mixpanel'
import { TrackedEvent } from '../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../utils/tracking/tracked-screen'
import { WriterText } from './writer-text'

interface Props extends SceneRendererProps {
  icon?: string
  [key: string]: any
}

export function WriterTabBar({ icon, ...props }: Props) {
  const theme = useTheme()
  return (
    // @ts-ignore
    <TabBar
      {...props}
      scrollEnabled
      style={{
        backgroundColor: 'transparent',
      }}
      indicatorStyle={{ backgroundColor: 'transparent' }}
      activeColor="red"
      renderLabel={({ route, focused }) => (
        <WriterText
          color={
            focused ? theme.colors.outlineVariant : theme.colors.onBackground
          }
          align="left"
        >
          {route.title}
        </WriterText>
      )}
      onTabPress={(tab) => {
        trackEvent({
          event: TrackedEvent.PRESS,
          params: {
            screen: TrackedScreen.HOME_SCREEN,
            buttonName: `Select Tab - ${tab.route.key}`,
          },
        })
      }}
    />
  )
}
