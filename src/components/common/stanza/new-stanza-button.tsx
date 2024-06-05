import { useRouter } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { WriterButton } from '../writer-button'

interface Props {
  poemId: number
  parentStanzaId: number
  shouldShowToggleButton: boolean
  newStanzaPosition: number
}

const id = 2

export function NewStanzaButton({
  shouldShowToggleButton,
  parentStanzaId,
  poemId,
  newStanzaPosition,
}: Props) {
  const router = useRouter()
  return (
    <View style={styles.container}>
      {shouldShowToggleButton && (
        <WriterButton
          onPress={() => {
            router.push(
              `/poem/${poemId}/new-stanza?parentStanzaId=${parentStanzaId}&position=${newStanzaPosition}`,
            )
          }}
          icon="plus"
          style={styles.showFormButton}
        >
          <>Add Stanza</>
        </WriterButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  showFormButton: {
    alignSelf: 'flex-start',
  },
})
