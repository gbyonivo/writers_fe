import { useMemo } from 'react'
import { Part } from 'writers_shared'

export const usePartsGroupedInPosition = ({ parts }: { parts: Part[] }) => {
  return useMemo(() => {
    return parts.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.position]: [...(acc[curr.position] || []), curr],
      }
    }, {})
  }, [parts])
}
