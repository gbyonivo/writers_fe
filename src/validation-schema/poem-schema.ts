import * as yup from 'yup'

export const PoemSchema = yup.object({
  title: yup.string().required('Title is required'),
  firstStanza: yup.object().shape({
    content: yup.string().required('Content is required'),
  }),
})
