import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Poem } from 'writers_shared'

import { WriterText } from '../writer-text'
import { WrittenBy } from '../written-by'
import { PoemLikeButton } from './poem-like-button'

interface Props {
  poem: Poem
}

export function PoemItem({ poem }: Props) {
  const router = useRouter()
  const theme = useTheme()
  const containerStyle = {
    borderBottomColor: theme.colors.backdrop,
  }
  const onPress = () => {
    router.push(`/poems/${poem.id}?name=${poem?.title}`)
  }

  if (!poem) return null
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPress}>
        <WriterText
          color={theme.colors.onSurfaceVariant}
          size={18}
          fontFamily="Bold"
        >
          {poem.title}
        </WriterText>
        {poem.firstStanza && (
          <View style={styles.poemContent}>
            <WriterText
              style={styles.poemContentText}
              fontFamily="SemiBold"
            >{`${poem.firstStanza.content}`}</WriterText>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.poemFooter}>
        <WrittenBy name={poem.user.name} createdAt={poem.createdAt} />
        <View>
          <PoemLikeButton poemId={poem.id} likes={poem.likes} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    borderBottomWidth: 2,
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
