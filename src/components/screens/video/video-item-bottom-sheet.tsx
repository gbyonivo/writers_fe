import { BlurView } from 'expo-blur'
import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { WriterBottomSheet } from '../../common/writer-bottom-sheet'
import { WriterText } from '../../common/writer-text'

interface Props {}

export const VideoItemBottomSheet = forwardRef(
  function VideoItemBottomSheetInner({}: Props, ref) {
    const { colors } = useTheme()
    return (
      <WriterBottomSheet ref={ref} snapPoints={['80%']}>
        <View style={styles.container}>
          <WriterText size={18} mt={16}>
            Script here and allow users to tweak script so video changes
            accordingly
          </WriterText>
          <WriterText color={colors.scrim} mt={16}>
            Coming soon...
          </WriterText>
        </View>
      </WriterBottomSheet>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
})
