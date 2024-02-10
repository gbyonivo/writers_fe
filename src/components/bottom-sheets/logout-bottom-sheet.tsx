import BottomSheet from '@gorhom/bottom-sheet'
import React, { useCallback, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useAuthContext } from '../../context/auth-context'
import { WriterButton } from '../common/writer-button'

interface Props {
  bottomSheetRef: any
}

export const LogoutBottomSheet = ({ bottomSheetRef }: Props) => {
  const snapPoints = useMemo(() => ['1%', '20%'], [])
  const theme = useTheme()
  const { logout } = useAuthContext()

  const bottomSheetBg = {
    backgroundColor: theme.colors.background,
  }

  const bottomSheetIndicator = {
    backgroundColor: theme.colors.background,
  }

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={bottomSheetIndicator}
    >
      <View style={[styles.contentContainer, bottomSheetBg]}>
        <WriterButton onPress={logout}>Logout</WriterButton>
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
    alignItems: 'center',
  },
})
