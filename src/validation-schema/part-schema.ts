import * as yup from 'yup'

export const PartSchema = yup.object({
  content: yup.string().required('Content is required'),
})
