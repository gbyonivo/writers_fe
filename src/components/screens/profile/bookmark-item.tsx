import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Bookmark } from 'writers_shared'

import { setAudio } from '../../../store/slices/audio'
import { timeAgo } from '../../../utils/date'
import { trackEvent } from '../../../utils/mixpanel'
import { onStartPlaying } from '../../../utils/signal'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterIcon } from '../../common/writer-icon'
import { WriterText } from '../../common/writer-text'

interface Props {
  bookmark: Bookmark
  setBookmarkToDelete: (bookmark: Bookmark) => void
}

export function BookmarkItem({ bookmark, setBookmarkToDelete }: Props) {
  const router = useRouter()
  const dispatch = useDispatch()
  return (
    <View style={styles.bookmark}>
      <TouchableOpacity
        style={styles.description}
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              screen: TrackedScreen.PROFILE_SCREEN,
              buttonName: 'View Bookmark',
              id: bookmark.id,
            },
          })
          router.push(
            `/pieces/${bookmark.pieceId}?partIds=${bookmark.partIds.join(',')}&locked=${bookmark.locked}`,
          )
        }}
      >
        <WriterText fontFamily="Medium">{`${bookmark.name}`}</WriterText>
        <WriterText fontFamily="ExtraLight" size={12}>
          {timeAgo.format(parseInt(bookmark.createdAt, 10))}
        </WriterText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              screen: TrackedScreen.PROFILE_SCREEN,
              buttonName: 'Play Bookmark',
              id: bookmark.id,
            },
          })
          onStartPlaying.emit({
            partIds: bookmark.partIds,
            pieceId: bookmark.pieceId,
          })
        }}
      >
        <WriterIcon icon="play" size={22} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper}>
        <WriterIcon icon="share" size={22} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              screen: TrackedScreen.PROFILE_SCREEN,
              buttonName: 'Delete Bookmark',
              id: bookmark.id,
            },
          })
          setBookmarkToDelete(bookmark)
        }}
      >
        <WriterIcon icon="delete" size={22} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bookmark: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  description: {
    flex: 1,
  },
  buttonWrapper: {
    padding: 4,
    marginLeft: 8,
  },
})
