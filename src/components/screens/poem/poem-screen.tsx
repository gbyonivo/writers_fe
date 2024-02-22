import { StyleSheet, View } from 'react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
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

export const PoemScreen = ({ poemId, poemName }: Props) => {
  const theme = useTheme()
  const { loading, poem, refetch } = usePoem(poemId)
  return (
    <WriterBackground isView>
      <View style={[styles.container]}>
        <WriterText
          align="center"
          style={styles.poemNameContainer}
          mb={8}
          mt={8}
        >
          {poem?.title || poemName}
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
    paddingHorizontal: 2,
  },
})
