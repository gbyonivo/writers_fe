import { StyleSheet, View } from 'react-native'
import { Country, Sex, SpeakerStyle } from 'writers_shared/dist'

import { createOptionsFromEnum } from '../../utils/common'
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
}

const sexOptions = createOptionsFromEnum({
  enumObject: Sex,
})

const countryOptions = createOptionsFromEnum({
  enumObject: Country,
})

const styleOptions = createOptionsFromEnum({
  enumObject: SpeakerStyle,
})

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
}: VoiceSetUpProps) {
  const onChange = ({ target: { value } }, fieldName: string) => {
    handleChange({ target: { value, name: fieldName } })
  }
  return (
    <View>
      <WriterSelect
        value={value.country}
        handleChange={handleChange}
        name="voiceSetup.country"
        options={countryOptions}
        label="Country"
        containerStyle={styles.container}
      />
      <WriterSelect
        value={value.sex}
        handleChange={handleChange}
        name="voiceSetup.sex"
        options={sexOptions}
        label="Sex"
        containerStyle={styles.container}
      />
      <WriterSelect
        value={value.style}
        handleChange={handleChange}
        name="voiceSetup.style"
        options={styleOptions}
        label="Style"
        containerStyle={styles.container}
      />
      <WriterTextInput
        value={value.preDelay}
        handleChange={(e) => onChange(e, 'voiceSetup.preDelay')}
        name="preDelay"
        label="Pre Delay"
        containerStyle={styles.container}
      />
      <WriterTextInput
        value={value.postDelay}
        handleChange={(e) => onChange(e, 'voiceSetup.postDelay')}
        name="postDelay"
        label="Post Delay"
        containerStyle={styles.container}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
})
