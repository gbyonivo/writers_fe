import { Country, Sex, SpeakerStyle } from 'writers_shared/dist'

import { createOptionsFromEnum } from './common'

const sexLabelReplacementMap: Record<Sex, string> = {
  [Sex.MALE]: 'Male',
  [Sex.FEMALE]: 'Female',
}

export const sexOptions = createOptionsFromEnum({
  enumObject: Sex,
  labelReplacements: sexLabelReplacementMap,
})

const countryLabelReplacementMap: Record<Country, string> = {
  [Country.AU]: 'Australian',
  [Country.CA]: 'Canadian',
  [Country.NG]: 'Nigerian',
  [Country.HK]: 'Hong Kong',
  [Country.IE]: 'Irish',
  [Country.US]: 'American',
  [Country.UK]: 'English',
  [Country.IN]: 'Indian',
}

export const countryOptions = createOptionsFromEnum({
  enumObject: Country,
  labelReplacements: countryLabelReplacementMap,
})

const speakerStyleLabelReplacementMap: Record<SpeakerStyle, string> = {
  [SpeakerStyle.advertisement_upbeat]: 'Upbeat Advertisement',
  [SpeakerStyle.affectionate]: 'Affectionate',
  [SpeakerStyle.angry]: 'Angry',
  [SpeakerStyle.assistant]: 'Assistant',
  [SpeakerStyle.calm]: 'Calm',
  [SpeakerStyle.chat]: 'Chat',
  [SpeakerStyle.cheerful]: 'Upbeat Advertisement',
  [SpeakerStyle.customerservice]: 'Affectionate',
  [SpeakerStyle.depressed]: 'Angry',
  [SpeakerStyle.disgruntled]: 'Assistant',
  [SpeakerStyle['documentary-narration']]: 'Documentary',
  [SpeakerStyle.embarrassed]: 'Calm',
  [SpeakerStyle.empathetic]: 'Chat',
  [SpeakerStyle.envious]: 'Upbeat Advertisement',
  [SpeakerStyle.excited]: 'Affectionate',
  [SpeakerStyle.fearful]: 'Angry',
  [SpeakerStyle.friendly]: 'Assistant',
  [SpeakerStyle.gentle]: 'Calm',
  [SpeakerStyle.hopeful]: 'Chat',
  [SpeakerStyle.lyrical]: 'Upbeat Advertisement',
  [SpeakerStyle.newscast]: 'Newscast',
  [SpeakerStyle['narration-professional']]: 'Professional Narration',
  [SpeakerStyle['narration-relaxed']]: 'Relaxed Narration',
  [SpeakerStyle['newscast-casual']]: 'Casual Newscast',
  [SpeakerStyle['newscast-formal']]: 'Formal Newscast',
  [SpeakerStyle['poetry-reading']]: 'Poetry Reading',
  [SpeakerStyle.sad]: 'Sad',
  [SpeakerStyle.serious]: 'Serious',
  [SpeakerStyle.shouting]: 'Shouting',
  [SpeakerStyle.sports_commentary]: 'Sport Commentary',
  [SpeakerStyle.sports_commentary_excited]: 'Exciting Sport Commentary',
  [SpeakerStyle.terrified]: 'Terrified',
  [SpeakerStyle.unfriendly]: 'Unfriendly',
  [SpeakerStyle.whispering]: 'Whispering',
}

export const styleOptions = createOptionsFromEnum({
  enumObject: SpeakerStyle,
  labelReplacements: speakerStyleLabelReplacementMap,
})
