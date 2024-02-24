import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { WriterButton } from '../common/writer-button'

export interface LogoutBottomSheetProps {
  onClose: () => void
  onPressLogout: () => void
}

export const LogoutBottomSheet = ({
  onClose,
  onPressLogout,
}: LogoutBottomSheetProps) => {
  const snapPoints = useMemo(() => ['20%'], [])
  const theme = useTheme()

  const bottomSheetIndicator = {
    backgroundColor: theme.colors.onBackground,
  }

  const bottomSheetStyle = {
    backgroundColor: theme.colors.tertiaryContainer,
  }

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleIndicatorStyle={bottomSheetIndicator}
      onClose={onClose}
      backgroundStyle={bottomSheetStyle}
      enablePanDownToClose
      backdropComponent={(backfdropProps) => (
        <BottomSheetBackdrop {...backfdropProps} />
      )}
    >
      <View style={[styles.contentContainer]}>
        <WriterButton onPress={onPressLogout}>Logout</WriterButton>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
  },
})
