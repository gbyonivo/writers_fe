import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import equals from 'react-fast-compare'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Icon } from 'react-native-paper'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'

import { useSearchValue } from '../../hooks/selectors/use-search-value'
import {
  SearchBarControls,
  useSearchBarControls,
} from '../../hooks/use-search-bar-controls'
import { useSearchBarStyles } from '../../hooks/use-search-bar-styles'
import {
  onDoneTyping,
  setGenreValue,
  setSearchValue,
} from '../../store/slices/search'
import { AppState } from '../../types/states/AppState'
import { getWidthByRatio, isIos } from '../../utils/common'

const hitSlop = {
  top: 8,
  bottom: 8,
  left: 8,
  right: 8,
}

interface SearchBarProps extends SearchBarControls {
  containerStyle?: StyleProp<ViewStyle>
  width?: number | string
  height?: number
  borderRadius?: number
  textInputStyle?: StyleProp<TextStyle>
  cancelButton?: boolean
  cancelTitle?: string
  cancelTitleStyle?: StyleProp<TextStyle>
  clearIcon?: React.ReactNode
  searchIcon?: React.ReactNode
  value?: string
}

function SearchBarComponent(props: SearchBarProps, ref: React.Ref<any>) {
  const {
    containerStyle,
    height = 40,
    borderRadius = 12,
    textInputStyle,
    cancelButton = true,
    cancelTitle = 'Cancel',
    cancelTitleStyle,
    onFocus,
    onBlur,
    onSubmitEditing,
    onChangeText,
    clearIcon,
    searchIcon,
  } = props
  const genreValue = useSelector((state: AppState) => state.search.genreValue)
  const initialSearchValue = useRef(useSearchValue())
  const refInput = useRef<TextInput>(null)
  const isFocus = useSharedValue(false)
  const clearButton = useSharedValue((props.value?.length as number) > 0)
  const cancelButtonWidth = useSharedValue(40)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setSearchValue(initialSearchValue.current)
  }, [])

  useEffect(() => {
    if (genreValue) {
      setValue(genreValue)
      dispatch(setSearchValue(genreValue))
      dispatch(setGenreValue(''))
    }
  }, [genreValue])

  const {
    onCancel,
    onCancelLayout,
    onClear,
    onTextInputBlur,
    onTextInputFocus,
    onChangeTextInput,
    onTextInputSubmitEditing,
  } = useSearchBarControls({
    refInput,
    cancelButtonWidth,
    clearButton,
    isFocus,
    onChangeText: (value) => {
      setValue(value)
      dispatch(setSearchValue(value))
      onChangeText?.(value)
    },
    onSubmitEditing: () => {
      dispatch(onDoneTyping())
      onSubmitEditing?.()
    },
    onBlur,
    onFocus,
  })

  const { themeStyle, inputStyle, textStyle, clearButtonStyle } =
    useSearchBarStyles({
      cancelButton,
      cancelButtonWidth,
      clearButton,
      isFocus,
    })

  useImperativeHandle(ref, () => ({
    clear: () => {
      onClear()
    },
    focus: () => {
      refInput.current?.focus()
    },
    blur: () => {
      refInput.current?.blur()
    },
  }))

  return (
    <View
      style={[
        {
          width: getWidthByRatio(1),
          backgroundColor: themeStyle.backgroundColor,
        },
        containerStyle,
      ]}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.viewTextInput,
            {
              height,
              borderRadius,
              backgroundColor: themeStyle.textInputBackground,
            },
            inputStyle,
          ]}
        >
          <TextInput
            value={value}
            returnKeyType="search"
            autoCorrect={false}
            multiline={false}
            underlineColorAndroid="transparent"
            clearButtonMode="never"
            style={[
              styles.textInput,
              textInputStyle,
              { color: themeStyle.textColor },
            ]}
            placeholderTextColor={themeStyle.placeholderColor}
            selectionColor={themeStyle.selectionColor}
            onFocus={onTextInputFocus}
            onBlur={onTextInputBlur}
            onSubmitEditing={onTextInputSubmitEditing}
            onChangeText={onChangeTextInput}
            ref={refInput}
          />
          <Animated.View style={[styles.viewClear, clearButtonStyle]}>
            <TouchableOpacity
              style={[
                styles.clearButton,
                { backgroundColor: themeStyle.clearIconColor },
              ]}
              onPress={onClear}
              hitSlop={hitSlop}
            >
              {clearIcon ?? (
                <Icon source="close" color="rgba(0, 0, 0, 0.6)" size={14} />
              )}
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <View style={styles.searchIcon}>
          {searchIcon ?? (
            <Icon
              source="magnify"
              color={themeStyle.searchIconColor}
              size={18}
            />
          )}
        </View>
        {cancelButton && (
          <Animated.View style={[styles.viewCancelButton, textStyle]}>
            <TouchableOpacity
              hitSlop={hitSlop}
              onPress={onCancel}
              onLayout={onCancelLayout}
            >
              <Text
                style={[
                  styles.cancel,
                  { color: themeStyle.textButtonColor },
                  cancelTitleStyle,
                ]}
              >
                {cancelTitle}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  viewTextInput: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 32,
  },
  textInput: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.5,
    textAlignVertical: 'center',
    padding: 0,
    margin: 0,
    paddingBottom: !isIos ? 2 : 0,
  },
  searchIcon: {
    position: 'absolute',
    paddingLeft: 8,
  },
  viewClear: {
    position: 'absolute',
    right: 8,
  },
  clearButton: {
    backgroundColor: '#C7C7CC',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCancelButton: {
    position: 'absolute',
    right: 0,
  },
  cancel: {
    fontSize: 17,
    fontWeight: '500',
  },
})

const SearchBar = React.forwardRef(SearchBarComponent)

export default React.memo(SearchBar, equals)
