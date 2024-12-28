import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { Part } from 'writers_shared'

import { WriterText } from '../writer-text'
import { PartRatingBottomSheetFooter } from './part-rating-components/part-rating-bottom-sheet-footer'
import { PartRatingBottomSheetHeader } from './part-rating-components/part-rating-bottom-sheet-header'

export interface PartRatingBottomSheetProps {
  onClose?: () => void
  part: Part
  ratePart: (rating: number) => void
}

export const PartRatingBottomSheet = forwardRef(function PartRatingBottomSheet(
  { onClose, part, ratePart }: PartRatingBottomSheetProps,
  ref,
) {
  const snapPoints = useMemo(() => ['80%'], [])
  const theme = useTheme()
  const [newRating, setNewRating] = useState<null | number>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)

  const bottomSheetIndicator: ViewStyle = {
    backgroundColor: theme.colors.outlineVariant,
  }

  const bottomSheetStyle = {
    backgroundColor: theme.colors.background,
  }

  const partInMemo = useMemo(() => part, [part?.id])

  useImperativeHandle(ref, () => {
    return {
      show: () => {
        bottomSheetRef.current.expand()
      },
      hide: () => {
        bottomSheetRef.current.close()
      },
    }
  }, [])

  return (
    <GestureHandlerRootView>
      <Portal>
        <BottomSheet
          snapPoints={snapPoints}
          handleIndicatorStyle={bottomSheetIndicator}
          onClose={onClose}
          ref={bottomSheetRef}
          index={-1}
          backgroundStyle={bottomSheetStyle}
          enablePanDownToClose
          backdropComponent={(backdropProps) => (
            <BottomSheetBackdrop
              {...backdropProps}
              disappearsOnIndex={-1}
              enableTouchThrough
              opacity={0.6}
            />
          )}
        >
          <View style={[styles.contentContainer]}>
            <PartRatingBottomSheetHeader
              part={partInMemo}
              newRating={newRating}
            />
            <ScrollView style={[styles.body]}>
              <WriterText style={styles.text}>{part.content}</WriterText>
            </ScrollView>
            <PartRatingBottomSheetFooter
              userRating={part.userRating}
              ratePart={ratePart}
              setNewRating={(val: number) => setNewRating(val)}
            />
          </View>
        </BottomSheet>
      </Portal>
    </GestureHandlerRootView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 48,
    justifyContent: 'space-between',
  },
  text: {
    lineHeight: 32,
  },
  ratingContainerStyle: {
    backgroundColor: 'green',
  },
  body: {
    flex: 1,
    width: '100%',
    borderTopWidth: 2,
    marginTop: 16,
    paddingHorizontal: 16,
  },
})
