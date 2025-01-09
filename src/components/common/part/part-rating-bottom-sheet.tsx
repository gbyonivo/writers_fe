import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import { useRouter } from 'expo-router'
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

import { useAuthContext } from '../../../context/auth-context'
import { WriterTextInput } from '../inputs/writer-text-input'
import { WriterBottomSheet } from '../writer-bottom-sheet'
import { WriterButton } from '../writer-button'
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
  const { user: loggedInUser } = useAuthContext()
  const snapPoints = useMemo(() => ['80%'], [])
  const [newRating, setNewRating] = useState<null | number>(null)
  const bottomSheetRef = useRef(null)
  const router = useRouter()

  const partInMemo = useMemo(() => part, [part?.id])

  useImperativeHandle(ref, () => {
    return {
      show: () => {
        bottomSheetRef.current.expand()
      },
      hide: () => {
        bottomSheetRef.current.hide()
      },
    }
  }, [])

  const userCreatedPart = part.user.id === loggedInUser?.id

  return (
    <WriterBottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
      <View style={[styles.contentContainer]}>
        <PartRatingBottomSheetHeader part={partInMemo} newRating={newRating} />
        <ScrollView style={[styles.body]}>
          <WriterText style={styles.text}>{part.content}</WriterText>
          {userCreatedPart && (
            <View style={styles.editButtonContainer}>
              <WriterButton
                onPress={() => {
                  bottomSheetRef.current.hide()
                  router.push(`/pieces/${part.pieceId}/parts/${part.id}`)
                }}
              >
                Edit
              </WriterButton>
            </View>
          )}
        </ScrollView>
        {!userCreatedPart && (
          <PartRatingBottomSheetFooter
            userRating={part.userRating}
            ratePart={ratePart}
            setNewRating={(val: number) => setNewRating(val)}
          />
        )}
      </View>
    </WriterBottomSheet>
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
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 8,
  },
})
