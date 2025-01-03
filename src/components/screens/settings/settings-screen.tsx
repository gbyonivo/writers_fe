import { ScrollView, StyleSheet } from 'react-native'

import { WriterBackground } from '../../common/writer-background'
import { WriterHeader } from '../../common/writer-header'
import { DeleteAccount } from './delete-account'
import { GoPremium } from './go-premium'
import { Logout } from './logout'
import { TermsAndConditions } from './terms-and-conditions'
import { ToggleDesign } from './toggle-design'
import { ToggleNotification } from './toggle-notification'
import { ToggleTheme } from './toggle-theme'
import { ToggleTips } from './toggle-tips'
import { Version } from './version'

export function SettingsScreen() {
  return (
    <WriterBackground style={{ flex: 1 }} isView>
      <WriterHeader title="Settings" />
      <ScrollView style={styles.container}>
        <ToggleTheme />
        <ToggleDesign />
        <ToggleTips />
        <ToggleNotification />
        <TermsAndConditions />
        <GoPremium />
        <Logout />
        <DeleteAccount />
        <Version />
      </ScrollView>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
})
