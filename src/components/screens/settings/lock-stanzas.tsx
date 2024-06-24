import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Switch } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { useShouldChainStanzas } from '../../../hooks/selectors/use-should-chain-stanzas'
import { StanzaChainToggle } from '../../common/stanza/stanza-chain-toggle'
import { WriterText } from '../../common/writer-text'
import { SettingsItemContainer } from './settings-item-container'

export function LockStanzas() {
  return (
    <SettingsItemContainer>
      <View style={style.container}>
        <WriterText fontFamily="Bold">Lock Stanzas</WriterText>
        <StanzaChainToggle style={{ marginTop: -8 }} />
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
