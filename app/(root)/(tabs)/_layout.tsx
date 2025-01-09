import FontAwesome from '@expo/vector-icons/FontAwesome'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import { WriterText } from '../../../src/components/common/writer-text'
import { useIsPremium } from '../../../src/hooks/use-is-premium'
import { FontFamily } from '../../../src/types/font'
import { APP_TITLE } from '../../../src/utils/constants'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />
}

/**
 * Remember to to check position map after adding new screen
 */

export default function TabLayout() {
  const theme = useTheme()
  const isPremiumAccount = useIsPremium()
  const PREMIUM_COLOR = theme.colors.outlineVariant
  const getColor = ({
    focused,
    color,
  }: {
    focused: boolean
    color: string
  }) => {
    return isPremiumAccount && focused ? PREMIUM_COLOR : color
  }
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
              <TabBarIcon name="tree" color={getColor({ color, focused })} />
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
              <TabBarIcon
                name="search"
                color={isPremiumAccount && focused ? PREMIUM_COLOR : color}
              />
            ),
            ...commonProps,
          }}
        />

        <Tabs.Screen
          name="video"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="film" color={getColor({ color, focused })} />
            ),
            ...commonProps,
          }}
        />
        <Tabs.Screen
          name="new-piece"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="plus-square"
                color={getColor({ color, focused })}
              />
            ),
            ...commonProps,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="user" color={getColor({ color, focused })} />
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
})

const commonProps = {
  headerShown: false,
  tabBarLabelStyle: styles.tabBarLabel,
}
