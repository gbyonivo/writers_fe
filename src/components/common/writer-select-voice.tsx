import { BlurView } from 'expo-blur'
import { useMemo, useRef, useState } from 'react'
import {
  FlatList,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { ElevenVoice } from 'writers_shared'

import { AppState } from '../../types/states/AppState'
import { WriterSelect } from './inputs/writer-select'
import { VoiceSetUpBottomSheet } from './voice-set-up-bottom-sheet'
import { WriterText } from './writer-text'

interface WriterSelectVoiceProps {
  containerStyle?: StyleProp<ViewStyle>
  handleChange?: any
  value?: string
}

export function WriterSelectVoice({
  containerStyle,
  handleChange,
  value,
}: WriterSelectVoiceProps) {
  const theme = useTheme()
  const [voice, setVoice] = useState<ElevenVoice>(null)
  const [accent, setAccent] = useState(() => '')
  const [gender, setGender] = useState(() => '')
  const bottomsheetRef = useRef(null)
  const { idToElevenVoice } = useSelector((state: AppState) => state.audio)

  const accentOptions = useMemo(() => {
    const map = Object.values(idToElevenVoice).reduce(
      (acc, curr) => ({
        ...acc,
        [curr.accent.toUpperCase()]: curr.accent.toUpperCase(),
      }),
      {},
    )
    return Object.values(map).map((accentItem) => ({
      label: accentItem as string,
      value: accentItem as string,
    }))
  }, [idToElevenVoice])

  const genderOptions = useMemo(() => {
    const map = Object.values(idToElevenVoice).reduce(
      (acc, curr) => ({
        ...acc,
        [curr.gender.toUpperCase()]: curr.gender.toUpperCase(),
      }),
      {},
    )
    return Object.values(map).map((genderIten) => ({
      label: genderIten as string,
      value: genderIten as string,
    }))
  }, [idToElevenVoice])

  const voiceList = useMemo(() => {
    return Object.values(idToElevenVoice).filter((voice) => {
      const accentMatches =
        !accent || accent.toUpperCase() === voice.accent.toUpperCase()
      const genderMatches =
        !gender || gender.toUpperCase() === voice.gender.toUpperCase()
      return accentMatches && genderMatches
    })
  }, [accent, gender, idToElevenVoice])

  const renderItem = ({ item }: { item: ElevenVoice; index: number }) => {
    const isSelected = item.id === value
    return (
      <View
        style={[
          styles.item,
          isSelected ? styles.selected : {},
          isSelected ? { borderColor: theme.colors.tertiary } : {},
        ]}
      >
        <BlurView
          intensity={10}
          style={[styles.blur, { backgroundColor: theme.colors.onBackground }]}
        />
        <TouchableOpacity
          onPress={() => {
            setVoice(item)
            bottomsheetRef.current.expand()
          }}
        >
          <View style={styles.name}>
            <WriterText>{item.name}</WriterText>
          </View>
          <View style={styles.bottomDescription}>
            <WriterText size={12} fontFamily="Bold">
              {item.description}
            </WriterText>
            <WriterText size={12} fontFamily="Bold" ml={4}>
              {item.age}
            </WriterText>
            <WriterText size={12} fontFamily="Bold" ml={4}>
              {item.accent}
            </WriterText>
            <WriterText size={12} fontFamily="Bold" ml={4}>
              {item.gender}
            </WriterText>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={containerStyle}>
      <View style={styles.filter}>
        <WriterSelect
          value={accent}
          handleChange={(e) => setAccent(e.target.value)}
          name="accent"
          options={accentOptions}
          label="Accent"
          containerStyle={styles.selectContainer}
          style={styles.select}
        />
        <WriterSelect
          value={gender}
          handleChange={(e) => setGender(e.target.value)}
          name="gender"
          options={genderOptions}
          label="Gender"
          containerStyle={styles.selectContainer}
          style={styles.select}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={voiceList}
        renderItem={renderItem}
        keyExtractor={(item: ElevenVoice, index) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <VoiceSetUpBottomSheet
        voice={voice}
        ref={bottomsheetRef}
        selectVoice={(value) => {
          bottomsheetRef.current.hide()
          handleChange({ target: { value } })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 142,
  },
  separator: {},
  item: {
    height: 60,
    marginBottom: 12,
    borderRadius: 12,
    padding: 8,
  },
  bottomDescription: {
    flexDirection: 'row',
  },
  name: {
    marginBottom: 4,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    opacity: 0.05,
    borderRadius: 12,
  },
  filter: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  selectContainer: {
    flex: 0.48,
    marginHorizontal: 4,
  },
  select: {
    borderWidth: 0,
    marginLeft: -8,
  },
  selected: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
})
