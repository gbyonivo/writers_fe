import * as Clipboard from 'expo-clipboard'
import { useMemo, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { usePieceImageUrlMutation } from '../../../hooks/apollo/use-piece-image-url-mutation'
import { SelectOption } from '../../../types/common'
import { AppState } from '../../../types/states/AppState'
import { USABLE_IMAGE_URLS } from '../../../utils/common'
import { WriterSelect } from '../../common/inputs/writer-select'
import { WriterTextInput } from '../../common/inputs/writer-text-input'
import { WriterButton } from '../../common/writer-button'
import { WriterText } from '../../common/writer-text'

interface Props {
  pieceId: number
}

export function PieceImageUpdate({ pieceId }: Props) {
  const { updatePieceImageUrl, loading: updatingPieceImageUrl } =
    usePieceImageUrlMutation({
      pieceId,
      showAlert: true,
    })
  const { isAdmin, images } = useSelector((state: AppState) => state.settings)
  const existingImageUrls = images.length > 0 ? images : USABLE_IMAGE_URLS
  const { colors } = useTheme()
  const [imageUrl, setImageUrl] = useState('')
  const [isSelectMode, setIsSelectMode] = useState(false)
  const onPressButton = () => {
    updatePieceImageUrl({ id: pieceId, imageUrl })
  }
  const imagesOptions = useMemo<SelectOption[]>(() => {
    return USABLE_IMAGE_URLS.map((url) => {
      return {
        value: url,
        label: url.substring(61, 90),
      }
    })
  }, [existingImageUrls])
  return isAdmin ? (
    <>
      {isSelectMode ? (
        <WriterSelect
          value={imageUrl}
          handleChange={(e) => setImageUrl(e.target.value)}
          name="voiceSetup.style"
          options={imagesOptions}
          label="Select Image"
          containerStyle={styles.select}
        />
      ) : (
        <WriterTextInput
          value={imageUrl}
          handleChange={({ target }) => setImageUrl(target.value)}
          name="url"
          label="New Image URL"
          disabled={updatingPieceImageUrl}
          style={styles.url}
          containerStyle={styles.textContainerStyle}
        />
      )}
      <View style={styles.buttonContainer}>
        {!isSelectMode && (
          <WriterButton
            onPress={async () => {
              setImageUrl(await Clipboard.getStringAsync())
            }}
            disabled={updatingPieceImageUrl}
          >
            <WriterText>Paste</WriterText>
          </WriterButton>
        )}
        <WriterButton
          onPress={() => setIsSelectMode(!isSelectMode)}
          style={styles.uploadButton}
          disabled={updatingPieceImageUrl}
        >
          <WriterText>Switch</WriterText>
        </WriterButton>
        <WriterButton
          onPress={onPressButton}
          style={styles.uploadButton}
          disabled={updatingPieceImageUrl}
        >
          <WriterText>Upload</WriterText>
        </WriterButton>
      </View>

      {!!imageUrl && imageUrl !== 'null' && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
        </View>
      )}
    </>
  ) : (
    <View />
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  uploadButton: {},
  textContainerStyle: {
    marginTop: 16,
  },
  url: {
    flexWrap: 'wrap',
  },
  imagePreview: {
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  select: {
    marginTop: 16,
  },
})
