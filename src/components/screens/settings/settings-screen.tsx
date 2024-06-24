import { ScrollView, StyleSheet } from 'react-native'

import { WriterBackground } from '../../common/writer-background'
import { WriterText } from '../../common/writer-text'
import { ChooseReader } from './choose-reader'
import { DeleteAccount } from './delete-account'
import { GoPremium } from './go-premium'
import { LockStanzas } from './lock-stanzas'
import { Logout } from './logout'
import { TermsAndConditions } from './terms-and-conditions'
import { ToggleNotification } from './toggle-notification'
import { ToggleTheme } from './toggle-theme'
import { Version } from './version'

export function SettingsScreen() {
  return (
    <WriterBackground style={{ flex: 1 }} isView>
      <ScrollView style={styles.container}>
        <ToggleTheme />
        <ChooseReader />
        <LockStanzas />
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
