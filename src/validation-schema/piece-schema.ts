import * as yup from 'yup'

export const PieceSchema = yup.object({
  title: yup.string().required('Title is required'),
  firstPart: yup.object().shape({
    content: yup.string().required('Content is required'),
  }),
})
