/* eslint-disable import/order */
import { StyleSheet, View } from 'react-native'

import { useAuthContext } from '../../../context/auth-context'
import { WriterBackground } from '../../common/writer-background'
import { WriterButton } from '../../common/writer-button'
import { UserDetails } from './user-details'
import { UserTabs } from './user-tabs'

interface Props {
  userId: number
  showLogout?: boolean
}

export const ProfileContent = ({ userId, showLogout = false }: Props) => {
  const { logout, user: loggedInUser } = useAuthContext()
  const isLoggedInUserProfile = userId === loggedInUser?.id
  return (
    <WriterBackground style={{ flex: 1 }} isView>
      <>
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <UserDetails userId={userId} />
          </View>
          <UserTabs />
          {showLogout && isLoggedInUserProfile && (
            <WriterButton icon="logout" onPress={logout} style={styles.button}>
              Log out
            </WriterButton>
          )}
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
