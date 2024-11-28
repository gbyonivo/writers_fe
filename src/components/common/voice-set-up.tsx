import {
  KeyboardAvoidingView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { Country, Sex, SpeakerStyle } from 'writers_shared/dist'

import { isIos } from '../../utils/common'
import { countryOptions, sexOptions, styleOptions } from '../../utils/options'
import { WriterSelect } from './inputs/writer-select'
import { WriterTextInput } from './inputs/writer-text-input'

export interface VoiceSetUpValue {
  sex: Sex
  country: Country
  style: SpeakerStyle
  preDelay: number
  postDelay: number
}

interface VoiceSetUpProps {
  value: VoiceSetUpValue
  handleChange: any
  prefix?: string
  containerStyle?: StyleProp<ViewStyle>
}

const defaultValue: VoiceSetUpValue = {
  sex: Sex.FEMALE,
  country: Country.NG,
  style: SpeakerStyle.calm,
  preDelay: 1,
  postDelay: 1,
}

export function VoiceSetUp({
  value = defaultValue,
  handleChange,
  prefix = '',
  containerStyle,
}: VoiceSetUpProps) {
  const onChange = ({ target: { value } }, fieldName: string) => {
    handleChange({ target: { value, name: `${prefix}${fieldName}` } })
  }
  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      style={[styles.parentContainer, containerStyle]}
      keyboardVerticalOffset={isIos ? 100 : 75}
      enabled
    >
      <View>
        <WriterSelect
          value={value.style}
          handleChange={(e) => onChange(e, 'voiceSetup.style')}
          name="voiceSetup.style"
          options={styleOptions}
          label="Style"
          containerStyle={styles.container}
        />
        <View style={styles.row}>
          <WriterSelect
            value={value.country}
            handleChange={(e) => onChange(e, 'voiceSetup.country')}
            name="voiceSetup.country"
            options={countryOptions}
            label="Accent"
            containerStyle={[styles.container, styles.select]}
          />
          <WriterSelect
            value={value.sex}
            handleChange={(e) => onChange(e, 'voiceSetup.sex')}
            name="voiceSetup.sex"
            options={sexOptions}
            label="Sex"
            containerStyle={[styles.container, styles.select]}
          />
        </View>
        <View style={styles.row}>
          <WriterTextInput
            value={value.preDelay}
            handleChange={(e) => onChange(e, 'voiceSetup.preDelay')}
            name="preDelay"
            label="Pre Delay (seconds)"
            containerStyle={[styles.container]}
            keyboardType="numeric"
          />
          <WriterTextInput
            value={value.postDelay}
            handleChange={(e) => onChange(e, 'voiceSetup.postDelay')}
            name="postDelay"
            label="Post Delay (seconds)"
            containerStyle={styles.container}
            keyboardType="numeric"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  parentContainer: {
    paddingBottom: 80,
    // flex: 1,
  },
  container: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  select: {
    width: '48%',
  },
})
