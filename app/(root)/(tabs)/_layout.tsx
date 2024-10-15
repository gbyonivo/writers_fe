import FontAwesome from '@expo/vector-icons/FontAwesome'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import WriterSearchBar from '../../../src/components/common/writer-search-bar'
import { WriterText } from '../../../src/components/common/writer-text'
import { FontFamily } from '../../../src/types/font'
import { getHeighByRatio } from '../../../src/utils/common'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />
}

const commonProps: Record<string, any> = {
  headerTitleStyle: {
    fontFamily: 'Light' as FontFamily,
  },
  tabBarLabelStyle: { display: 'none' },
  headerTitle: '',
}

const headerStyle = {
  ml: 16,
  fontFamily: 'Bold' as FontFamily,
  size: 24,
}

export default function TabLayout() {
  const theme = useTheme()
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
          headerTintColor: theme.colors.onBackground,
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
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerLeft: () => <WriterText {...headerStyle}>Narate</WriterText>,
            headerShadowVisible: false,
            // header: () => (
            //   <View style={{ width: getHeighByRatio(1) }}>
            //     <BlurView
            //       intensity={30}
            //       style={{
            //         ...StyleSheet.absoluteFillObject,
            //         backgroundColor: 'transparent',
            //         overflow: 'hidden',
            //       }}
            //     />
            //   </View>
            // ),
            ...commonProps,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="search" color={color} />
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
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="plus-square" color={color} />
            ),
            ...commonProps,
            header: () => <></>,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            headerLeft: () => <WriterText {...headerStyle}>Profile</WriterText>,
            ...commonProps,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
            headerLeft: () => (
              <WriterText {...headerStyle}>Settings</WriterText>
            ),
            ...commonProps,
          }}
        />
      </Tabs>
    </>
  )
}
