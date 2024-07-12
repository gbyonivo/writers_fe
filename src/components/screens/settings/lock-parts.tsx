import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Switch } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { useShouldChainParts } from '../../../hooks/selectors/use-should-chain-parts'
import { PartChainToggle } from '../../common/part/part-chain-toggle'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function LockParts() {
  return (
    <SettingsItemContainer>
      <View style={style.container}>
        <WriterText fontFamily="Bold">Lock Parts</WriterText>
        <PartChainToggle style={{ marginTop: -8 }} />
      </View>
    </SettingsItemContainer>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
