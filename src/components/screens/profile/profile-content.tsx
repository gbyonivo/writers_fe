/* eslint-disable import/order */
import { StyleSheet, View } from 'react-native'

import { useAuthContext } from '../../../context/auth-context'
import { WriterBackground } from '../../common/writer-background'
import { PieceListInTabs } from '../piece/piece-list-in-tabs'
import { UserDetails } from './user-details'

interface Props {
  userId: number
  showLogout?: boolean
}

export function ProfileContent({ userId, showLogout = false }: Props) {
  const { user: loggedInUser } = useAuthContext()
  return (
    <WriterBackground style={{ flex: 1 }} isView>
      <>
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <UserDetails userId={userId} />
          </View>
          <PieceListInTabs userId={loggedInUser?.id} showBookmark />
        </View>
      </>
    </WriterBackground>
  )
}

const styles = StyleSheet.create({
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
