import { useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { useSelector } from 'react-redux'

import { useIsPremium } from '../../hooks/use-is-premium'
import { AppState } from '../../types/states/AppState'
import { VoiceSetUp, VoiceSetUpValue } from './voice-set-up'
import { WriterSelectVoice } from './writer-select-voice'
import { WriterTabBar } from './writer-tab-bar'

interface VoiceSetUpProps {
  value: VoiceSetUpValue
  handleChange: any
  prefix?: string
  voiceId?: string
  containerStyle?: StyleProp<ViewStyle>
}

const routes = [
  { key: 'voices', title: 'Voice' },
  { key: 'premium', title: 'Premium', disabled: true },
]

export function VoiceSetUpContainer(props: VoiceSetUpProps) {
  const [index, setIndex] = useState(0)
  const layout = useWindowDimensions()
  const isPremiumAccount = useIsPremium()

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'voices':
        return (
          <VoiceSetUp {...props} containerStyle={styles.voiceSetUpContainer} />
        )
      case 'premium':
        return (
          <WriterSelectVoice
            containerStyle={styles.voiceSetUpContainer}
            handleChange={({ target: { value } }) => {
              props.handleChange({
                target: { name: `${props.prefix || ''}voiceId`, value },
              })
            }}
            value={props.voiceId}
          />
        )
      default:
        return null
    }
  }

  if (!isPremiumAccount) {
    return <VoiceSetUp {...props} containerStyle={styles.voiceSetUpContainer} />
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => <WriterTabBar {...props} />}
      style={[styles.tabStyle, props.containerStyle]}
    />
  )
}

const styles = StyleSheet.create({
  voiceSetUpContainer: {
    marginTop: 32,
  },
  tabStyle: {
    marginTop: -16,
  },
})
