import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Stanza } from 'writers_shared'

import { useBottomSheetContext } from '../../../context/bottom-sheet-context'
import { useRateStanzaMutation } from '../../../hooks/apollo/use-rate-stanza-mutation'
import { BottomSheet } from '../../../types/bottom-sheet'
import { PROCESSING_STAGE } from '../../../types/common'
import { WriterText } from '../writer-text'

interface Props {
  stanza: Stanza
  containerStyle?: StyleProp<ViewStyle>
}

export function StanzaItem({ stanza, containerStyle }: Props) {
  const { selectBottomSheet } = useBottomSheetContext()
  const { rateStanza } = useRateStanzaMutation()
  return (
    <TouchableOpacity
      onPress={() => {
        selectBottomSheet({
          bottomSheet: BottomSheet.STANZA_RATING,
          params: {
            stanza,
            rateStanza: (rating: number) => {
              rateStanza({ stanzaId: stanza.id, rating })
            },
          },
        })
      }}
    >
      <View style={[styles.poemContentContainer, containerStyle]}>
        <WriterText style={styles.poemContentText}>
          {stanza.content} - {`${stanza.id}`} - {`${stanza.stanzaId || 'none'}`}
        </WriterText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  poemContentText: {
    lineHeight: 28,
  },
  poemContentContainer: {
    paddingVertical: 8,
  },
})
