import { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { useInvitationMutation } from '../../../hooks/apollo/use-invitation-mutation'
import { becomeAdmin } from '../../../store/slices/settings'
import { AppState } from '../../../types/states/AppState'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterTextInput } from '../../common/inputs/writer-text-input'
import { WriterBottomSheet } from '../../common/writer-bottom-sheet'
import { WriterButton } from '../../common/writer-button'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function InviteFriend() {
  const bottomsheetRef = useRef(null)
  const [email, setEmail] = useState('')
  const { createInvitation } = useInvitationMutation()

  const onPressInviteFriend = () => {
    createInvitation(email)
    bottomsheetRef.current.hide()
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              screen: TrackedScreen.SETTINGS_SCREEN,
              buttonName: 'InviteFriend',
            },
          })
          bottomsheetRef.current.expand()
        }}
      >
        <SettingsItemContainer>
          <WriterText fontFamily="Bold">Invite Friend</WriterText>
        </SettingsItemContainer>
      </TouchableOpacity>
      <WriterBottomSheet ref={bottomsheetRef} snapPoints={['40%']}>
        <View style={styles.container}>
          <WriterTextInput
            value={email}
            handleChange={({ target }) => setEmail(target.value)}
            name="url"
            label="Email"
          />
          <View style={styles.buttonContainer}>
            <WriterButton
              onPress={onPressInviteFriend}
              style={styles.uploadButton}
            >
              <WriterText>Invite Friend</WriterText>
            </WriterButton>
          </View>
        </View>
      </WriterBottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  uploadButton: {
    marginTop: 16,
    marginLeft: 16,
  },
})
