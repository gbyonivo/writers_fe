import { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

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

export function BecomeAdmin() {
  const bottomsheetRef = useRef(null)
  const [code, setCode] = useState('')
  const dispatch = useDispatch()
  const { isAdmin } = useSelector((state: AppState) => state.settings)

  const onPressBecomeAdmin = () => {
    dispatch(becomeAdmin(code))
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
              buttonName: 'BecomeAdmin',
            },
          })
          bottomsheetRef.current.expand()
        }}
      >
        <SettingsItemContainer>
          <WriterText fontFamily="Bold">
            Become {isAdmin ? 'User' : 'Admin'}
          </WriterText>
        </SettingsItemContainer>
      </TouchableOpacity>
      <WriterBottomSheet ref={bottomsheetRef} snapPoints={['80%']}>
        <View style={styles.container}>
          <WriterTextInput
            value={code}
            handleChange={({ target }) => setCode(target.value)}
            name="url"
            label="Code"
          />
          <View style={styles.buttonContainer}>
            <WriterButton
              onPress={onPressBecomeAdmin}
              style={styles.uploadButton}
            >
              <WriterText>Become {isAdmin ? 'User' : 'Admin'}</WriterText>
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
