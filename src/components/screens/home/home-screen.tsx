import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { PieceType } from 'writers_shared/dist'

import { WriterBackground } from '../../../components/common/writer-background'
import { FontFamily } from '../../../types/font'
import { AppState } from '../../../types/states/AppState'
import { APP_TITLE } from '../../../utils/constants'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { HomeScreenFilter } from '../../common/home/home-screen-filter'
import { PieceListContainer } from '../../common/piece/piece-list-container'
import { WriterHeader } from '../../common/writer-header'
import { PieceListInGenres } from '../piece/piece-list-in-genres'

export function HomeScreen() {
  const { shouldShowTextBasedDesign: shouldShowTextBasedDesgin } = useSelector(
    (state: AppState) => state.settings,
  )
  const [types, setTypes] = useState<PieceType[]>([])
  const [genreIds, setGenreIds] = useState<number[]>([])
  const { colors } = useTheme()

  // todo
  const override = true || shouldShowTextBasedDesgin

  return (
    <WriterBackground isView>
      <WriterHeader
        title={APP_TITLE}
        hideBackButton
        containerStyle={styles.header}
        fontFamily="Light"
        headerTextStyle={{
          fontSize: 24,
          marginTop: 8,
          color: colors.outline,
        }}
      >
        <HomeScreenFilter
          onSetTypes={(types: PieceType[]) => setTypes(types)}
          onSetGenreIds={(genreIds: number[]) => setGenreIds(genreIds)}
        />
      </WriterHeader>
      {override ? (
        <PieceListContainer
          trackedScreen={TrackedScreen.HOME_SCREEN}
          type={types.length === 1 ? types[0] : undefined}
          genreIds={genreIds}
        />
      ) : (
        <PieceListInGenres
          types={types}
          containerStyle={styles.pieceListInGenresContainer}
        />
      )}
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 4,
  },
  pieceListInGenresContainer: {
    paddingBottom: 96,
  },
  header: {
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Bold',
  },
})
