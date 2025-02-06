import { ScrollView, StyleSheet } from 'react-native'

import { WriterBackground } from '../../common/writer-background'
import { WriterHeader } from '../../common/writer-header'
import { BecomeAdmin } from './become-admin'
import { DeleteAccount } from './delete-account'
import { GoPremium } from './go-premium'
import { InviteFriend } from './invite-friend'
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
      <WriterHeader title="Settings" containerStyle={{ height: 40 }} />
      <ScrollView style={styles.container}>
        <ToggleTheme />
        <ToggleDesign />
        <ToggleTips />
        <ToggleNotification />
        <TermsAndConditions />
        <InviteFriend />
        <GoPremium />
        <BecomeAdmin />
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
