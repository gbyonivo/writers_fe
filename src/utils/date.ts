import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

export const DATE_FORMATS = {
  BIRTHDAY: 'yyyy-MM-dd',
}

TimeAgo.addDefaultLocale(en)

export const timeAgo = new TimeAgo('en-US')
