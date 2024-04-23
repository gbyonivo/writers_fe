import { Dimensions, Platform } from 'react-native'

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
