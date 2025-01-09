import { Dimensions, Platform } from 'react-native'
import { PieceType } from 'writers_shared'

import { SelectOption } from '../types/common'

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.substring(0, 1))
    .join('')
    .toUpperCase()

export const getWidthByRatio = (ratio: number): number =>
  Dimensions.get('screen').width * ratio
export const getHeighByRatio = (ratio: number): number =>
  Dimensions.get('screen').height * ratio

export const getRatingDefaultConfig = (theme) => ({
  type: 'star',
  tintColor: theme.colors.background,
  ratingColor: theme.colors.error,
  ratingBackgroundColor: theme.colors.primary,
  ratingTextColor: theme.colors.onBackground,
  ratingCount: 5,
})

export const isIos = Platform.OS === 'ios'

export const truncateString = ({
  text = '',
  maxLength,
  ellipsis = '...',
}: {
  text: string
  maxLength: number
  ellipsis?: string
}) => {
  if (text.length <= maxLength) {
    return text
  }
  const truncatedStr = text.slice(0, maxLength - ellipsis.length)
  return `${truncatedStr}${ellipsis}`
}

export const createOptionsFromEnum = ({
  enumObject,
  defaultInitialOption,
  labelReplacements = {},
  disabledMap,
  extraLabelMap,
}: {
  enumObject: { [key: string]: string }
  defaultInitialOption?: SelectOption
  labelReplacements?: { [key: string]: string }
  disabledMap?: { [key: string]: boolean }
  extraLabelMap?: { [key: string]: string }
}): SelectOption[] => {
  return Object.values(enumObject).map((code) => ({
    value: code === 'NotSet' ? defaultInitialOption?.value : code,
    label:
      code === 'NotSet'
        ? labelReplacements[code] || defaultInitialOption?.label
        : labelReplacements[code] || code,
    disabled: !!disabledMap?.[code],
    extraLabel: extraLabelMap?.[code] || '',
  }))
}

export const createKeyForSuggestions = ({
  partIds = [],
  pieceId = '',
  genreIds = [],
  title = '',
  isSuggestion,
  type = '',
}: {
  partIds?: number[]
  pieceId?: number | string
  title?: string
  genreIds?: number[]
  isSuggestion: boolean
  type?: PieceType | string
}): string => {
  return [
    pieceId,
    ...partIds,
    ...genreIds,
    title,
    `${isSuggestion}`,
    type,
  ].join('-')
}

export const TYPE_LABEL_REPLACEMENTS: Record<PieceType, string> = {
  POEM: 'Poem',
  STORY: 'Story',
}

export const USABLE_IMAGE_URLS: string[] = [
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736452439/u7955934184_Poem_--v_6.1_f87ce1c5-29e4-451c-ba90-73cc87d7fd83_0_1_c8khm6.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736452441/paradox_zeneu_expressionism_painting_in_the_style_of_Mads_Berg__1a0ef88a-7229-460d-9bac-c94a74c23f74_xnueow.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736452439/u7955934184_cartoon_image_of_someone_reading_--v_6.1_8c11ad17-a48c-4225-a3ab-87fa3178865f_0_pexwi9.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736452437/aitattooer_two_snakes_coiled_together__one_white_one_black_back_396038b0-8397-41c6-bb7d-1099be14070f_2_dd5wys.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736452312/Satoru-Gojo_lyzcxg.jpg',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736452112/annabeloglovsky_woman_with_flowers_Motion_blur_effect_film_shot_5d47fc52-a58c-4c64-9cb4-27dac46cf02d_bd7vtr.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455454/comedy-icon_vdc0kv.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455454/poem-icon_dwlvgl.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455452/fantasy-icon_fnlmzi.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455451/folklore-icon_i6bjau.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455450/horror-icon_mnb0tx.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455449/story-icon_leo23h.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455447/thriller-icon_iu9lxn.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455447/diverse-icon_sqjwql.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455447/romance-icon_v1v6kv.png',
  'https://res.cloudinary.com/dd5vez9i8/image/upload/v1736455443/crime-icon_gb68fu.png',
]
