import { useState } from 'react'
import { StyleSheet } from 'react-native'
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
  const { shouldShowTextBasedDesgin } = useSelector(
    (state: AppState) => state.settings,
  )
  const [types, setTypes] = useState<PieceType[]>([])

  // todo
  const override = true || shouldShowTextBasedDesgin

  return (
    <WriterBackground isView>
      <WriterHeader
        title={APP_TITLE}
        hideBackButton
        containerStyle={styles.header}
        fontFamily="Bold"
      >
        <HomeScreenFilter
          onSetTypes={(types: PieceType[]) => setTypes(types)}
        />
      </WriterHeader>
      {override ? (
        <PieceListContainer
          trackedScreen={TrackedScreen.HOME_SCREEN}
          type={types.length === 1 ? types[0] : undefined}
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
