import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'

import { PoemScreen } from '../../../src/components/screens/poem/poem-screen'

export default function Poem() {
  const { id } = useGlobalSearchParams()
  const { name } = useLocalSearchParams()
  return (
    <PoemScreen poemId={parseInt(id as string, 10)} poemName={name as string} />
  )
}
