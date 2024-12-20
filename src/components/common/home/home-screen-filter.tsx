import { BlurView } from 'expo-blur'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { PieceType } from 'writers_shared/dist'

import { AppState } from '../../../types/states/AppState'
import { WriterBottomSheet } from '../writer-bottom-sheet'
import { WriterText } from '../writer-text'

const typeLabelReplacement: Record<PieceType, string> = {
  POEM: 'Poem',
  STORY: 'Story',
}

interface Props {
  onSetTypes: (value: PieceType[]) => void
  hideTypes?: boolean
}

export function HomeScreenFilter({ onSetTypes, hideTypes }: Props) {
  const { colors } = useTheme()
  const [types, setTypes] = useState<PieceType[]>([])
  const [genres, setGenres] = useState([])
  const { genreIdToGenre } = useSelector((state: AppState) => state.genre)

  const bottomsheetRef = useRef(null)

  const selectPieceType = (type: PieceType) => {
    const selectedTypes = types.includes(type)
      ? types.filter((t) => t !== type)
      : [...types, type]
    setTypes(selectedTypes)
    onSetTypes(selectedTypes)
  }

  const selectGenre = (genre: string) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((t) => t !== genre))
    } else {
      setGenres([...genres, genre])
    }
  }

  const combinedFilter = [
    ...types.map((type) => typeLabelReplacement[type] || type),
    ...genres.map((genre) => genre.name),
  ]
  const firstThree = combinedFilter.slice(0, 5)
  const remainingLength = combinedFilter.length - 5

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdown, { borderColor: colors.primary }]}
        onPress={() => {
          bottomsheetRef.current?.expand?.()
        }}
      >
        {combinedFilter.length === 0 ? (
          <WriterText fontFamily="SemiBold" color={colors.outlineVariant}>
            Filter
          </WriterText>
        ) : (
          firstThree.map((item, index) => (
            <WriterText
              fontFamily="SemiBold"
              key={item}
              color={colors.outlineVariant}
            >
              {`${item}${index < firstThree.length - 1 ? ' / ' : ''}`}
            </WriterText>
          ))
        )}
        {remainingLength > 0 && (
          <WriterText
            color={colors.outlineVariant}
            ml={8}
          >{`${remainingLength}+`}</WriterText>
        )}
        {/* <View style={styles.icon}>
          <WriterIcon icon="chevron-down" size={22} />
        </View> */}
      </TouchableOpacity>
      <WriterBottomSheet
        ref={bottomsheetRef}
        snapPoints={['92%']}
        backgroundColor="transparent"
        indicatorColor="transparent"
      >
        <View style={styles.bottomSheetWrapper}>
          <BlurView
            intensity={50}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'transparent',
              position: 'absolute',
            }}
          />
          {!hideTypes && (
            <>
              {Object.keys(PieceType).map((pieceType) => {
                const isSelected = types.includes(pieceType as PieceType)
                return (
                  <TouchableOpacity
                    key={pieceType}
                    style={styles.item}
                    onPress={() => selectPieceType(pieceType as PieceType)}
                  >
                    <WriterText
                      fontFamily="SemiBold"
                      color={isSelected ? colors.outlineVariant : ''}
                    >
                      {typeLabelReplacement[pieceType] || pieceType}
                    </WriterText>
                  </TouchableOpacity>
                )
              })}
            </>
          )}
          {Object.values(genreIdToGenre).map((genre) => {
            const isSelected = genres.includes(genre)
            return (
              <TouchableOpacity
                key={genre.id}
                style={styles.item}
                onPress={() => selectGenre(genre)}
              >
                <WriterText
                  fontFamily="SemiBold"
                  color={isSelected ? colors.outlineVariant : ''}
                >
                  {genre.name}
                </WriterText>
              </TouchableOpacity>
            )
          })}
        </View>
      </WriterBottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginHorizontal: 0,
    paddingVertical: 2,
  },
  dropdown: {
    // borderWidth: 1,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 9,
  },
  item: {
    marginVertical: 8,
    padding: 8,
  },
  bottomSheetWrapper: {
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    paddingTop: 16,
  },
})
