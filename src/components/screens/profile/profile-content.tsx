/* eslint-disable import/order */
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useAuthContext } from '../../../context/auth-context'
import { useUser } from '../../../hooks/apollo/use-user'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterBackground } from '../../common/writer-background'
import { WriterHeader } from '../../common/writer-header'
import { WriterIcon } from '../../common/writer-icon'
import { PieceListInTabs } from '../piece/piece-list-in-tabs'
import { UserDetails } from './user-details'

interface Props {
  userId: number
  showLogout?: boolean
}

export function ProfileContent({ userId, showLogout = false }: Props) {
  const { user: loggedInUser } = useAuthContext()
  const { user } = useUser(userId)
  const router = useRouter()
  const { colors } = useTheme()
  return (
    <WriterBackground style={styles.parentContainer} isView>
      <WriterHeader
        title={user?.name || ''}
        containerStyle={styles.header}
        hideBackButton
      >
        <TouchableOpacity
          style={styles.cogContainer}
          onPress={() => router.push('/settings')}
        >
          <WriterIcon icon="cog" size={32} color={colors.outlineVariant} />
        </TouchableOpacity>
      </WriterHeader>
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
  header: {
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingRight: 16,
  },
  cogContainer: {
    paddingTop: 8,
  },
})
