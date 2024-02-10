import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { useUser } from '../../../hooks/apollo/use-user'
import { getInitials } from '../../../utils/common'
import { WriterActivityIndicator } from '../../common/writer-activity-indicator'
import { WriterAvatarText } from '../../common/writer-avatar-text'
import { WriterText } from '../../common/writer-text'

interface Props {
  userId: number
  openLogoutBottomSheet?: () => void
}

export const UserDetails = ({ userId, openLogoutBottomSheet }: Props) => {
  const { loading, user } = useUser(userId)

  return (
    <View style={[styles.avatarImageWrapper]}>
      {loading ? (
        <WriterActivityIndicator />
      ) : (
        <TouchableOpacity onPress={openLogoutBottomSheet}>
          <WriterAvatarText label={getInitials(user?.name || '')} size={64} />
        </TouchableOpacity>
      )}
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <WriterText>{user?.name}</WriterText>
          <WriterText>@{user?.username}</WriterText>
          <WriterText style={{ marginTop: 8 }}>{user?.email}</WriterText>
        </View>
        <View>
          <WriterText
            align="right"
            mr={4}
            mb={8}
          >{`Poems: ${user?.poemCount}`}</WriterText>
          <WriterText
            align="right"
            mr={4}
          >{`Stanzas: ${user?.stanzaCount}`}</WriterText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarImageWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  details: {
    marginLeft: 16,
    marginVertical: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
})
