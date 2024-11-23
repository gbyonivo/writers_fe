import React, { forwardRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { GenreMultiSelect } from '../inputs/genre-multi-select'
import { WriterButton } from '../writer-button'

export interface SparkFormProps {
  genres: any[]
  loading: boolean
  onSubmit: (val: { genreIds: number[] }) => void
}

export const SparkForm = forwardRef(function AddPartForm(
  { genres, onSubmit, loading }: SparkFormProps,
  ref,
) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])

  return (
    <View>
      <GenreMultiSelect
        value={selectedGenres}
        genres={genres}
        name="genres"
        handleChange={(e) => {
          setSelectedGenres(e.target.value)
        }}
        hideImage
      />
      <WriterButton
        onPress={() => {
          onSubmit({ genreIds: selectedGenres })
        }}
        style={[styles.button, styles.sparkButton]}
        disabled={loading}
      >
        Find a Spark!
      </WriterButton>
    </View>
  )
})

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  sparkButton: {
    marginBottom: 32,
    alignSelf: 'center',
  },
})
