import * as yup from 'yup'

export const StanzaSchema = yup.object({
  content: yup.string().required('Content is required'),
})
