import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CreatePoemButton } from '../../../src/components/common/poem/create-poem-button'
import WriterSearchBar from '../../../src/components/common/writer-search-bar'
import { WriterText } from '../../../src/components/common/writer-text'
import { FontFamily } from '../../../src/types/font'

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

export default function TabLayout() {
  const theme = useTheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.onBackground,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.onBackground,
      }}
      backBehavior="none"
      initialRouteName="home"
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => (
            <WriterText ml={16} fontFamily="Bold">
              Home
            </WriterText>
          ),
          ...commonProps,
        }}
      />
      <Tabs.Screen
        name="new-poem"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-square" color={color} />
          ),
          headerRight: () => <CreatePoemButton />,
          headerLeft: () => (
            <WriterText ml={16} fontFamily="Bold">
              New Poem
            </WriterText>
          ),
          ...commonProps,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          ...commonProps,
          header: () => (
            <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
              <WriterSearchBar />
            </SafeAreaView>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerLeft: () => (
            <WriterText ml={16} fontFamily="Bold">
              Profile
            </WriterText>
          ),
          ...commonProps,
        }}
      />
    </Tabs>
  )
}
