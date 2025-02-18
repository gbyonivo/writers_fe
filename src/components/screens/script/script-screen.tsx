import { TouchableOpacity } from '@gorhom/bottom-sheet'
import * as Clipboard from 'expo-clipboard'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { useScript } from '../../../hooks/apollo/use-script'
import { WriterBackground } from '../../common/writer-background'
import { WriterHeader } from '../../common/writer-header'
import { WriterIcon } from '../../common/writer-icon'
import { WriterText } from '../../common/writer-text'

export function ScriptScreen() {
  const all = useGlobalSearchParams()
  const { scriptId, id: pieceId } = useLocalSearchParams()

  const { loading, script, error } = useScript(
    parseInt(scriptId as unknown as string, 10),
  )
  return (
    <WriterBackground style={{ flex: 1 }} isView>
      <WriterHeader title="Script">
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            paddingRight: 16,
            paddingTop: 12,
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={async () => {
              await Clipboard.setStringAsync(script?.script)
            }}
          >
            <WriterIcon icon="copy" size={22} />
          </TouchableOpacity>
        </View>
      </WriterHeader>
      {loading || !!error ? (
        <></>
      ) : (
        <ScrollView style={styles.textContainer}>
          <WriterText>{script?.script || ''}</WriterText>
        </ScrollView>
      )}
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 8,
  },
  buttonContainer: {},
})
