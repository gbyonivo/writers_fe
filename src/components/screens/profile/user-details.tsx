import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { useAuthContext } from '../../../context/auth-context'
import { useBottomSheetContext } from '../../../context/bottom-sheet-context'
import { useUser } from '../../../hooks/apollo/use-user'
import { BottomSheet } from '../../../types/bottom-sheet'
import { getInitials } from '../../../utils/common'
import { WriterActivityIndicator } from '../../common/writer-activity-indicator'
import { WriterAvatarText } from '../../common/writer-avatar-text'
import { WriterText } from '../../common/writer-text'

interface Props {
  userId: number
}

export function UserDetails({ userId }: Props) {
  const { loading, user } = useUser(userId)
  const { selectBottomSheet, resetBottomSheet } = useBottomSheetContext()
  const { logout } = useAuthContext()

  return (
    <View style={[styles.avatarImageWrapper]}>
      {loading ? (
        <WriterActivityIndicator />
      ) : (
        <TouchableOpacity
          onPress={() =>
            selectBottomSheet({
              bottomSheet: BottomSheet.LOGOUT,
              params: {
                onPressLogout: () => {
                  logout()
                  resetBottomSheet()
                },
              },
            })
          }
        >
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
          >{`Pieces: ${user?.pieceCount}`}</WriterText>
          <WriterText
            align="right"
            mr={4}
          >{`Parts: ${user?.partCount}`}</WriterText>
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
