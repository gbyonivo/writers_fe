import get from 'lodash.get'
import { StyleSheet, View } from 'react-native'
import { PieceType } from 'writers_shared/dist/index'

import { WriterActivityIndicator } from '../writer-activity-indicator'
import { WriterHeaderButton } from '../writer-header-button'
import { WriterText } from '../writer-text'

interface Props {
  loading: boolean
  formErrors?: any
  onPressNext: () => void
  onPressPrevious: () => void
  pageIndex: number
  errorKey: string
  previousBtnLabel: string
  nextBtnLabel: string
  type: PieceType
}

export function PieceCreateFormHeader({
  loading,
  formErrors,
  pageIndex,
  onPressNext,
  onPressPrevious,
  errorKey,
  previousBtnLabel,
  nextBtnLabel,
  type,
}: Props) {
  return (
    <>
      {!loading ? (
        <View style={styles.header}>
          <WriterHeaderButton
            label={previousBtnLabel || 'Previous'}
            onPress={onPressPrevious}
            enableButton={pageIndex > 0}
            icon="arrow-left"
            style={pageIndex === 0 ? { display: 'none' } : {}}
          />
          <WriterHeaderButton
            label={nextBtnLabel || 'Next'}
            onPress={onPressNext}
            enableButton={!get(formErrors, errorKey)}
            iconRight
            icon="arrow-right"
          />
        </View>
      ) : (
        <View style={[styles.header, { justifyContent: 'center' }]}>
          <WriterText align="center" mr={4}>
            Creating Your {type}
          </WriterText>
          <WriterActivityIndicator size={12} />
        </View>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    width: '100%',
  },
})
