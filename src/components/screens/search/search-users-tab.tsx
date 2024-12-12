import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { User } from 'writers_shared'

import { useSearchUserResults } from '../../../hooks/apollo/use-search-user-results'
import { AppState } from '../../../types/states/AppState'
import { truncateString } from '../../../utils/common'
import { trackEvent } from '../../../utils/mixpanel'
import { TrackedEvent } from '../../../utils/tracking/tracked-event'
import { TrackedScreen } from '../../../utils/tracking/tracked-screen'
import { WriterText } from '../../common/writer-text'

export function SearchUsersTab() {
  const searchValue = useSelector((state: AppState) => state.search.searchValue)
  const result = useSearchUserResults(searchValue)
  const [displayedResult, setDisplayedResult] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (result.loading || result.error) return
    setDisplayedResult(result.users?.edges || [])
  }, [result.users])

  const renderItem = ({ item }) => {
    const user = item.node as User
    return (
      <TouchableOpacity
        onPress={() => {
          trackEvent({
            event: TrackedEvent.PRESS,
            params: {
              screen: TrackedScreen.SEARCH_SCREEN,
              buttonName: 'View User',
              id: user.id,
            },
          })
          router.push(`/users/${user.id}`)
        }}
      >
        <View style={{ paddingVertical: 8 }}>
          <WriterText>
            {truncateString({ text: user.name, maxLength: 40 })}
          </WriterText>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={displayedResult}
      renderItem={renderItem}
      keyExtractor={(item) => item.node.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  separator: {
    height: 8,
  },
})
