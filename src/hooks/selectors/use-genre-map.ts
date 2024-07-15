import { useSelector } from 'react-redux'

import { AppState } from '../../types/states/AppState'

export const useGenreMap = () => {
  return useSelector((state: AppState) => state.genre.genreIdToGenre)
}
