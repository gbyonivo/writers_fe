/* eslint-disable import/order */
import { StyleSheet, View } from 'react-native'

import { useAuthContext } from '../../../context/auth-context'
import { useUser } from '../../../hooks/apollo/use-user'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterBackground } from '../../common/writer-background'
import { WriterHeader } from '../../common/writer-header'
import { PieceListInTabs } from '../piece/piece-list-in-tabs'
import { UserDetails } from './user-details'

interface Props {
  userId: number
  showLogout?: boolean
}

export function ProfileContent({ userId, showLogout = false }: Props) {
  const { user: loggedInUser } = useAuthContext()
  const { user } = useUser(userId)
  return (
    <WriterBackground style={styles.parentContainer} isView>
      <WriterHeader title={user?.name || ''} hideBackButton />
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <UserDetails userId={userId} />
        </View>
        <PieceListInTabs
          userId={loggedInUser?.id}
          showBookmark
          trackedScreen={TrackedScreen.PROFILE_SCREEN}
        />
      </View>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  button: {
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  avatarImage: {
    alignSelf: 'center',
  },
  detailsContainer: {
    marginBottom: 32,
  },
})
