import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { PieceType } from 'writers_shared/dist'

import { WriterBackground } from '../../../components/common/writer-background'
import { APP_TITLE } from '../../../utils/constants'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { HomeScreenFilter } from '../../common/home/home-screen-filter'
import { WriterHeader } from '../../common/writer-header'
import { Feed } from './feed'

export function HomeScreen() {
  const [types, setTypes] = useState<PieceType[]>([])
  const [genreIds, setGenreIds] = useState<number[]>([])
  const { colors } = useTheme()

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
      <Feed
        trackedScreen={TrackedScreen.HOME_SCREEN}
        type={types.length === 1 ? types[0] : undefined}
        genreIds={genreIds}
      />
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
