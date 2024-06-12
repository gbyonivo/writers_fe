import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { usePoem } from '../../../hooks/apollo/use-poem'
import { StanzaListForPoem } from '../../common/stanza/stanza-list-for-poem'
import { WriterActivityIndicator } from '../../common/writer-activity-indicator'
import { WriterBackground } from '../../common/writer-background'
import { WriterText } from '../../common/writer-text'

interface Props {
  poemId: number
  poemName: string
}

export function PoemScreen({ poemId, poemName }: Props) {
  const theme = useTheme()
  const { loading, poem } = usePoem(poemId)
  return (
    <WriterBackground isView>
      <View style={[styles.container]}>
        <WriterText style={styles.poemNameContainer} mb={8} mt={8}>
          Title: {poem?.title || poemName}
        </WriterText>
        {loading && <WriterActivityIndicator color={theme.colors.onPrimary} />}
        <StanzaListForPoem poemId={poemId} />
      </View>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poemNameContainer: {
    paddingHorizontal: 24,
  },
})
