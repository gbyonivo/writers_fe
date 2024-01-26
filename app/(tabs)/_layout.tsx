import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { useTheme } from 'react-native-paper'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />
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
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user-o" color={color} />,
          title: 'Profile',
        }}
      />
    </Tabs>
  )
}
