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
