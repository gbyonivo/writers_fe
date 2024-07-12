import * as yup from 'yup'

export const PieceSchema = yup.object({
  title: yup.string().required('Title is required'),
  type: yup.string().required('Type is required'),
  genreIds: yup.array().min(1),
  firstPart: yup.object().shape({
    content: yup.string().required('Content is required'),
  }),
})
