/* eslint-disable import/order */
import PoemListContextProvider from '../../../context/poem-list-context'
import { PoemList } from './poem-list'

interface Props {
  userId?: number
}

export const PoemListContainer = ({ userId }: Props) => {
  return (
    <PoemListContextProvider userId={userId}>
      <PoemList />
    </PoemListContextProvider>
  )
}
