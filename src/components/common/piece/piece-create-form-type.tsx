import { StyleSheet, View } from 'react-native'
import { PieceType } from 'writers_shared/dist/index'

import { images } from '../../../assets/images/images'
import { SelectOption } from '../../../types/common'
import { getWidthByRatio } from '../../../utils/common'
import { WriterImageSegmentedControl } from '../inputs/writer-image-segmented-control'
import { WriterText } from '../writer-text'

const typeOptions: SelectOption[] = [
  {
    label: PieceType.POEM,
    value: PieceType.POEM,
    image: images.icons.poem,
  },
  {
    label: PieceType.STORY,
    value: PieceType.STORY,
    image: images.icons.story,
  },
]

const poemDescription =
  'A poem is a form of literary art that uses rhythmic and often metaphorical language to evoke emotions, convey ideas, or tell a story. It can take various forms, including sonnets, haikus, free verse, and more.'
const storyDescription =
  'A story is a structured narrative that conveys a series of events, whether real or imaginary, designed to engage the reader or listener. It typically includes characters, a plot, and a setting, and can be expressed through various forms such as written text, oral tradition, or performance.'

interface Props {
  type: PieceType
  handleChange: any
}

export function PieceCreateFormType({ type, handleChange }: Props) {
  return (
    <View key={0} style={styles.formElement}>
      <View>
        <WriterText mb={16}>What do you want to create?</WriterText>
        <WriterImageSegmentedControl
          handleChange={handleChange}
          name="type"
          options={typeOptions}
          value={type}
          imageStyle={{
            width: getWidthByRatio(0.35),
            height: getWidthByRatio(0.35),
          }}
        />
        <WriterText mt={24}>
          {type === PieceType.POEM ? poemDescription : storyDescription}
        </WriterText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formElement: {
    paddingHorizontal: 24,
  },
})
