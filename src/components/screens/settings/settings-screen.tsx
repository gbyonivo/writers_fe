import { ScrollView, StyleSheet } from 'react-native'

import { WriterBackground } from '../../common/writer-background'
import { WriterText } from '../../common/writer-text'
import { ChooseReader } from './choose-reader'
import { DeleteAccount } from './delete-account'
import { GoPremium } from './go-premium'
import { LockParts } from './lock-parts'
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
      <ScrollView style={styles.container}>
        <ToggleTheme />
        <ToggleDesign />
        <ToggleTips />
        <ChooseReader />
        <ToggleNotification />
        <GoPremium />
        <Logout />
        <DeleteAccount />
        <TermsAndConditions />
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
