import * as Clipboard from 'expo-clipboard'
import { useEffect, useRef, useState } from 'react'

import { usePartsByIds } from './apollo/use-parts-by-ids'
import { useAlert } from './use-alert'

export const useCopyParts = ({ partIds }: { partIds: number[] }) => {
  const [combinedContent, setCombinedContent] = useState('')
  const combinedContentRef = useRef('')
  const [copying, setCopying] = useState(false)
  const { parts } = usePartsByIds({ partIds })
  const { show } = useAlert()
  useEffect(() => {
    if (parts?.length) {
      setCombinedContent(parts.map((part) => part.content).join('\n'))
      combinedContentRef.current = parts.map((part) => part.content).join('\n')
    } else {
      setCombinedContent('')
    }
  }, [parts])

  const writeToClipboard = () => {
    const copy = async () => {
      try {
        setCopying(true)
        await Clipboard.setStringAsync(combinedContentRef.current)
        setCopying(false)
        show({ message: 'Copied to clipboard' })
      } catch (e) {
        setCopying(false)
        console.log(e)
      }
    }
    copy()
  }

  return {
    writeToClipboard,
    isReady: !!combinedContentRef.current,
    copying,
  }
}
