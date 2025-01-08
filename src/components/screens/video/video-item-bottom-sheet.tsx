import * as Clipboard from 'expo-clipboard'
import { forwardRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { useVideoUploadUrlMutation } from '../../../hooks/apollo/use-video-upload-url-mutation'
import { AppState } from '../../../types/states/AppState'
import { WriterTextInput } from '../../common/inputs/writer-text-input'
import { WriterBottomSheet } from '../../common/writer-bottom-sheet'
import { WriterButton } from '../../common/writer-button'
import { WriterText } from '../../common/writer-text'

interface Props {
  videoId: number
}

export const VideoItemBottomSheet = forwardRef(
  function VideoItemBottomSheetInner({ videoId }: Props, ref) {
    const { uploadVideoUrl, loading } = useVideoUploadUrlMutation()
    const { isAdmin } = useSelector((state: AppState) => state.settings)
    const [url, setUrl] = useState('')
    const onPressButton = async () => {
      await uploadVideoUrl({ url, id: videoId })
    }
    const { colors } = useTheme()
    return (
      <WriterBottomSheet ref={ref} snapPoints={['80%']}>
        <View style={styles.container}>
          <WriterText size={18} mt={16}>
            Script here and allow users to tweak script so video changes
            accordingly
          </WriterText>
          <WriterText color={colors.scrim} mt={16} mb={32}>
            Coming soon...
          </WriterText>
          {isAdmin && (
            <>
              <WriterTextInput
                value={url}
                handleChange={({ target }) => setUrl(target.value)}
                name="url"
                label="Video URL"
                disabled={loading}
                style={styles.url}
              />
              <View style={styles.buttonContainer}>
                <WriterButton
                  onPress={async () => {
                    setUrl(await Clipboard.getStringAsync())
                  }}
                  disabled={loading}
                >
                  <WriterText>Paste</WriterText>
                </WriterButton>
                <WriterButton
                  onPress={onPressButton}
                  style={styles.uploadButton}
                  disabled={loading || !url}
                >
                  <WriterText>Upload</WriterText>
                </WriterButton>
              </View>
            </>
          )}
        </View>
      </WriterBottomSheet>
    )
  },
)

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
    marginLeft: 16,
  },
  url: {
    flexWrap: 'wrap',
  },
})
