import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { Piece } from 'writers_shared/dist'

import { images } from '../../../assets/images/images'
import { AppState } from '../../../types/states/AppState'
import { truncateString } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterAgeRating } from '../../common/writer-age-rating'
import { WriterText } from '../../common/writer-text'

interface Props {
  piece: Piece
}

export function PieceListGroupedByGenreItem({ piece }: Props) {
  const router = useRouter()
  const theme = useTheme()
  const isAdmin = useSelector((appState: AppState) => appState.settings.isAdmin)

  return (
    <TouchableOpacity
      onPress={() => {
        trackEvent({
          event: TrackedEvent.PRESS,
          params: {
            screen: TrackedScreen.HOME_SCREEN,
            buttonName: 'Press Piece',
            id: piece.id,
          },
        })
        router.push(`/pieces/${piece.id}?name=${piece?.title}`)
      }}
    >
      <Image
        source={piece.imageUrl ? { uri: piece.imageUrl } : images.icons.poem}
        style={[styles.item, { backgroundColor: theme.colors.backdrop }]}
      />
      <View style={styles.titleContainer}>
        <BlurView
          intensity={10}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: theme.colors.background,
            overflow: 'hidden',
          }}
        />
        {!isAdmin && (
          <WriterText
            size={14}
            align="center"
            fontFamily="Medium"
            color={theme.colors.onBackground}
          >
            {truncateString({ text: piece.title, maxLength: 17 })}
          </WriterText>
        )}
      </View>
      {!!piece?.firstPart?.ageRating && (
        <WriterAgeRating
          ageRating={piece?.firstPart?.ageRating}
          small
          style={styles.ageRating}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  listContainer: {
    paddingHorizontal: 8,
    marginTop: 8,
  },
  separator: {
    width: 8,
  },
  item: {
    height: 160,
    width: 128,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  header: {
    paddingLeft: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ageRating: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
})
