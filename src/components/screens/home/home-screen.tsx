import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { PieceType } from 'writers_shared/dist'

import { WriterBackground } from '../../../components/common/writer-background'
import { PieceListInTabs } from '../../../components/screens/piece/piece-list-in-tabs'
import { AppState } from '../../../types/states/AppState'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { HomeScreenFilter } from '../../common/home/home-screen-filter'
import { PieceListInGenres } from '../piece/piece-list-in-genres'

export function HomeScreen() {
  const { shouldShowTextBasedDesgin } = useSelector(
    (state: AppState) => state.settings,
  )
  const [types, setTypes] = useState<PieceType[]>([])

  return (
    <WriterBackground isView>
      <HomeScreenFilter
        onSetTypes={(types: PieceType[]) => setTypes(types)}
        hideTypes={shouldShowTextBasedDesgin}
      />
      {shouldShowTextBasedDesgin ? (
        <PieceListInTabs
          containerStyle={[styles.containerStyle]}
          trackedScreen={TrackedScreen.HOME_SCREEN}
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
})
