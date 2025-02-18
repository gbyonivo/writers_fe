import { useRouter } from 'expo-router'

import { trackEvent } from '../utils/mixpanel'
import { TrackedComponentLocation } from '../utils/tracking/tracked-component-location'
import { TrackedEvent } from '../utils/tracking/tracked-event'

export const usePressAddPart = ({ pieceId, positionMap }) => {
  const router = useRouter()

  const onPressAddToPosition = ({
    position,
    parentPartId,
  }: {
    position: number
    parentPartId: number
  }) => {
    const previousParts = Object.keys(positionMap).reduce((acc, curr) => {
      if (parseInt(curr, 10) === position) return acc
      return [...acc, positionMap[curr]]
    }, [])
    const queryString = [
      `parentPartId=${parentPartId}`,
      `position=${position}`,
      `previousPartId=${previousParts.join(',')}`,
    ].join('&')
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        queryString,
        pieceId,
        position,
        location: TrackedComponentLocation.ADD_PART_BUTTON,
      },
    })
    router.push(`/pieces/${pieceId}/new-part?${queryString}`)
  }

  const onPressAddToNewPosition = ({
    position,
    parentPartId,
  }: {
    position: number
    parentPartId: number
  }) => {
    const previousParts = Object.keys(positionMap).reduce((acc, curr) => {
      return [...acc, positionMap[curr]]
    }, [])
    const queryString = [
      `parentPartId=${parentPartId}`,
      `position=${position}`,
      `previousPartId=${previousParts.join(',')}`,
    ].join('&')
    trackEvent({
      event: TrackedEvent.PRESS,
      params: {
        queryString,
        pieceId,
        position,
        location: TrackedComponentLocation.ADD_PART_BUTTON,
      },
    })
    router.push(`/pieces/${pieceId}/new-part?${queryString}`)
  }

  return {
    onPressAddToPosition,
    onPressAddToNewPosition,
  }
}
