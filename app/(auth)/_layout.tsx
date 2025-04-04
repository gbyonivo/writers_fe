import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up/[phone]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="code-verification/[phone]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
