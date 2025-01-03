import FontAwesome from '@expo/vector-icons/FontAwesome'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import WriterSearchBar from '../../../src/components/common/writer-search-bar'
import { WriterText } from '../../../src/components/common/writer-text'
import { useIsPremium } from '../../../src/hooks/use-is-premium'
import { FontFamily } from '../../../src/types/font'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />
}

const commonProps: Record<string, any> = {
  headerTitleStyle: {
    fontFamily: 'Medium' as FontFamily,
  },
  tabBarLabelStyle: { display: 'none' },
  headerTitle: '',
}

const headerStyle = {
  ml: 8,
  fontFamily: 'Medium' as FontFamily,
  size: 24,
}

export default function TabLayout() {
  const theme = useTheme()
  const isPremiumAccount = useIsPremium()
  const PREMIUM_COLOR = theme.colors.outlineVariant
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
          name="video"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="video-camera"
                color={isPremiumAccount && focused ? PREMIUM_COLOR : color}
              />
            ),
            headerShown: false,
            ...commonProps,
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="home"
                color={isPremiumAccount && focused ? PREMIUM_COLOR : color}
              />
            ),
            headerLeft: () => <WriterText {...headerStyle}>Narate</WriterText>,
            headerShadowVisible: false,
            headerShown: false,
            ...commonProps,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="search"
                color={isPremiumAccount && focused ? PREMIUM_COLOR : color}
              />
            ),
            ...commonProps,
            header: () => (
              <SafeAreaView
                style={{ backgroundColor: theme.colors.background }}
              >
                <WriterSearchBar />
              </SafeAreaView>
            ),
          }}
        />
        <Tabs.Screen
          name="new-piece"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="plus-square"
                color={isPremiumAccount && focused ? PREMIUM_COLOR : color}
              />
            ),
            ...commonProps,
            header: () => <></>,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="user"
                color={isPremiumAccount && focused ? PREMIUM_COLOR : color}
              />
            ),
            headerLeft: () => <WriterText {...headerStyle}>Profile</WriterText>,
            headerShown: false,
            ...commonProps,
          }}
        />
      </Tabs>
    </>
  )
}
