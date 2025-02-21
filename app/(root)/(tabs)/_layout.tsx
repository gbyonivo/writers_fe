import FontAwesome from '@expo/vector-icons/FontAwesome'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import { WriterIcon } from '../../../src/components/common/writer-icon'
import { WriterText } from '../../../src/components/common/writer-text'
import { useIsPremium } from '../../../src/hooks/use-is-premium'
import { FontFamily } from '../../../src/types/font'
import { APP_TITLE } from '../../../src/utils/constants'

/**
 * Remember to to check position map after adding new screen
 */

export default function TabLayout() {
  const theme = useTheme()
  const isPremiumAccount = useIsPremium()
  const PREMIUM_COLOR = theme.colors.outlineVariant
  const iconProps = ({
    focused,
    color,
  }: {
    focused: boolean
    color: string
  }) => ({
    size: 30,
    color: isPremiumAccount && focused ? PREMIUM_COLOR : color,
    style: styles.tabBarIcon,
  })
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.onBackground,
          tabBarStyle: {
            position: 'absolute',
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.background,
          headerShadowVisible: false,
          tabBarBackground: () => (
            <BlurView
              intensity={30}
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'transparent',
                overflow: 'hidden',
              }}
            />
          ),
        }}
        backBehavior="none"
        initialRouteName="home"
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <WriterIcon icon="puzzle" {...iconProps({ focused, color })} />
            ),
            headerLeft: () => (
              <WriterText style={styles.headerStyle}>{APP_TITLE}</WriterText>
            ),
            ...commonProps,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <WriterIcon icon="search" {...iconProps({ focused, color })} />
            ),
            ...commonProps,
          }}
        />

        <Tabs.Screen
          name="video"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <WriterIcon icon="film" {...iconProps({ focused, color })} />
            ),
            ...commonProps,
          }}
        />
        <Tabs.Screen
          name="new-piece"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <WriterIcon icon="plus" {...iconProps({ focused, color })} />
            ),
            ...commonProps,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <WriterIcon icon="user" {...iconProps({ focused, color })} />
            ),
            ...commonProps,
          }}
        />
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    marginLeft: 8,
    fontFamily: 'Medium' as FontFamily,
    fontSize: 24,
  },
  tabBarLabel: {
    display: 'none',
  },
  tabBarIcon: {
    marginTop: 8,
  },
})

const commonProps = {
  headerShown: false,
  tabBarLabelStyle: styles.tabBarLabel,
}
