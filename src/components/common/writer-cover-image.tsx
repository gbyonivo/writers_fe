import { Cloudinary } from '@cloudinary/url-gen'
import { upload } from 'cloudinary-react-native'
import OpenAI from 'openai'
import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { useAlert } from '../../hooks/use-alert'
import { getWidthByRatio } from '../../utils/common'
import { openApiSecret } from '../../utils/constants'
import { WriterTextInput } from './inputs/writer-text-input'
import { WriterButton } from './writer-button'
import { WriterText } from './writer-text'

const openai = new OpenAI({
  apiKey: openApiSecret,
})

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dd5vez9i8',
    apiKey: '998258264741998',
    apiSecret: 'z9d9xLH0QhQAhyn2T5wJGY3x4J4',
  },
})

interface Props {
  title?: string
  handleChange: any
  name: string
  error?: string
  value: string
}

export function WriterCoverImage({
  title,
  error,
  name,
  handleChange,
  value,
}: Props) {
  const [image, setImage] = useState(null)
  const [text, setText] = useState(
    `An animated poster about ${title ? title : ''}`,
  )
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const { show } = useAlert()

  useEffect(() => {
    setText(`An animated poster about ${title ? title : ''}`)
  }, [title])

  // Call the API to generate n images from a prompt
  const generateImage = async () => {
    setLoading(true)
    try {
      const res = await openai.images.generate({
        prompt: text,
        n: 1,
        size: '512x512',
      })
      setLoading(false)
      setResult(res.data)
      await upload(cld, {
        file: res.data[0].url,
        options: {},
        callback: (error: any, response: any) => {
          console.log(response)
          setImage(response)
          handleChange({ target: { name, value: response.secure_url } })
          if (error) {
            show({ message: `${error}`, type: 'danger', placement: 'bottom' })
          }
        },
      })
    } catch (error) {
      setLoading(false)
      show({ message: `${error}`, type: 'danger', placement: 'bottom' })
    }
  }

  return (
    <View>
      <WriterTextInput
        value={text}
        handleChange={(e: any) => setText(e.target.value)}
        name="text"
        style={styles.textInput}
        multiline
        numberOfLines={3}
      />
      <WriterButton
        onPress={generateImage}
        disabled={loading}
        style={styles.button}
      >
        <WriterText>Create a Cover Image</WriterText>
      </WriterButton>
      <WriterText>{value}</WriterText>
      {!!value && (
        <Image
          source={{
            uri: value,
          }}
          style={styles.image}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 16,
    height: 96,
  },
  image: {
    width: getWidthByRatio(0.8),
    height: getWidthByRatio(0.8),
    alignSelf: 'center',
    marginTop: 64,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  button: {
    alignSelf: 'flex-end',
  },
})
