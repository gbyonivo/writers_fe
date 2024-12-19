import { View } from 'react-native'
import { Piece } from 'writers_shared/dist/index'

import { useGenres } from '../../../hooks/apollo/use-genres'
import { GenreMultiSelect } from '../inputs/genre-multi-select'
import { WriterText } from '../writer-text'

interface Props {
  genreIds: number[]
  handleChange: any
  error?: any
}

export function PieceCreateFormGenres({
  genreIds,
  handleChange,
  error,
}: Props) {
  const { genres } = useGenres()

  return (
    <View>
      <WriterText align="center" mb={32}>
        Select genres that best describe what you want to create
      </WriterText>
      <View>
        <GenreMultiSelect
          genres={genres}
          value={genreIds}
          handleChange={handleChange}
          name="genreIds"
          error={error}
          hideImage
        />
      </View>
    </View>
  )
}
