import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import TimeAgo from 'javascript-time-ago'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePoemListContext } from '../../../context/poem-list-context'
import { WriterIconButton } from '../writer-icon-button'
import { WriterText } from '../writer-text'
import { PoemLikeButton } from './poem-like-button'

interface Props {
  poemId: number
}

const timeAgo = new TimeAgo('en-US')

export const PoemItem = ({ poemId }: Props) => {
  const { getPoem } = usePoemListContext()
  const router = useRouter()
  const theme = useTheme()
  const poem = getPoem(poemId)
  const containerStyle = {
    borderBottomColor: theme.colors.backdrop,
  }
  const onPress = () => {
    router.replace(`/poem/${poemId}?name=${poem?.title}`)
  }
  if (!poem) return null
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.poemTitle}>
          <WriterText color={theme.colors.onSurfaceVariant} size={18}>
            {poem.title}
          </WriterText>
        </View>
        <View style={styles.poemContent}>
          <WriterText
            style={styles.poemContentText}
          >{`${poem.firstStanza.content}`}</WriterText>
        </View>
        <View style={styles.poemFooter}>
          <View>
            <WriterText style={styles.poemWriter}>
              by {poem.user.name}
            </WriterText>
            <WriterText>
              {timeAgo.format(parseInt(poem.createdAt, 10))}
            </WriterText>
          </View>
          <View>
            <PoemLikeButton poemId={poem.id} likes={poem.likes} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 16,
    borderBottomWidth: 2,
  },
  poemTitle: {
    flex: 1,
    fontWeight: '500',
  },
  poemContent: {
    marginTop: 20,
  },
  poemContentText: {
    lineHeight: 28,
    fontStyle: 'italic',
  },
  poemWriter: {
    marginBottom: 4,
  },
  poemFooter: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
