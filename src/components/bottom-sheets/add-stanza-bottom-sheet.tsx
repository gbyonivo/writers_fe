import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated from 'react-native-reanimated'
import { Stanza } from 'writers_shared'

import {
  onChangeStanzaSignal,
  onPressCreateStanzaSignal,
} from '../../utils/signal'
import { AddStanzaForm } from '../common/stanza/add-stanza-form'
import { WriterIconButton } from '../common/writer-icon-button'
import { WriterText } from '../common/writer-text'

export interface AddStanzaBottomSheetProps {
  onClose: () => void
  poemId: number
  position: number
  parentStanzaId: number
  createStanza: (val: any) => Promise<void>
  previousStanzas: Stanza[]
}

export function AddStanzaBottomSheet({
  onClose,
  parentStanzaId,
  position,
  poemId,
  createStanza,
  previousStanzas,
}: AddStanzaBottomSheetProps) {
  const snapPoints = useMemo(() => ['100%'], [])
  const theme = useTheme()
  const ref = useRef(null)
  const [hasContent, setHasContent] = useState(false)

  const stanzas = useMemo(() => {
    return [...previousStanzas, null]
  }, [])

  const bottomSheetIndicator = {
    backgroundColor: theme.colors.background,
  }

  const bottomSheetStyle = {
    backgroundColor: theme.colors.background,
  }

  useEffect(() => {
    if (onPressCreateStanzaSignal.getNumberOfListeners() < 1) {
      onPressCreateStanzaSignal.listen((values) => {
        console.log(values, 'it could be huge')
      })
      onChangeStanzaSignal.listen((values) => {
        console.log(values)
      })
    }
  }, [])

  const renderItem = ({ item }: { item: Stanza }) => {
    if (!item) {
      return (
        <AddStanzaForm
          position={position}
          poemId={poemId}
          parentStanzaId={parentStanzaId}
        />
      )
    }
    return (
      <View pointerEvents="none">
        <WriterText key={item.id} size={18} style={styles.previousText}>
          {item.content}
        </WriterText>
      </View>
    )
  }

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleIndicatorStyle={bottomSheetIndicator}
      onClose={onClose}
      backgroundStyle={bottomSheetStyle}
      enablePanDownToClose={!hasContent}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          enableTouchThrough
          opacity={0.6}
        />
      )}
    >
      {/* <SafeAreaView style={styles.bottomSheetHeader}>
        <WriterIconButton
          onPress={() => {
            onClose()
          }}
          icon="minus"
        />
        <WriterIconButton onPress={() => {}} icon="plus" />
      </SafeAreaView> */}
      <Animated.FlatList
        ref={ref}
        style={{ flex: 1, marginBottom: 100 }}
        data={stanzas}
        renderItem={renderItem}
        keyExtractor={(item) => `${item?.id || 'my-key'}`}
        scrollsToTop={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={previousStanzas.length}
      />
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    borderColor: 'transparent',
    borderWidth: 0,
  },

  bottomSheetInnerContainer: {
    marginTop: 16,
  },

  previousContetnContainer: {
    marginHorizontal: 24,
  },

  previousText: {
    lineHeight: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  inputOutlineStyle: {
    borderWidth: 0,
  },
})
