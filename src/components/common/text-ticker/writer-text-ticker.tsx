import React, { PureComponent, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NativeModules,
  findNodeHandle,
  I18nManager
} from 'react-native'

const { UIManager } = NativeModules

export const TextTickAnimationType = Object.freeze({
  auto: 'auto',
  scroll: 'scroll',
  bounce: 'bounce'
})

export function TextMarquee = ({
  style =             {},
  loop =              true,
  bounce=             true,
  scroll=            true,
  marqueeOnMount=    true,
  marqueeDelay=      0,
  isInteraction=     true,
  useNativeDriver=   true,
  repeatSpacer=      50,
  easing=            Easing.ease,
  animationType=     'auto',
  bounceSpeed=       50,
  scrollSpeed=       150,
  bouncePadding=     undefined,
  bounceDelay= 0,
  shouldAnimateTreshold= 0,
  disabled=          false,
  isRTL=             undefined,
  children,
  onScrollStart,
  shouldBounce
}) =>  {
  const timer = useRef(null)
  const [calculateMetricsPromise, setCalculateMetricsPromise] = useState(null)
  const [distance, setDistance] = useState(null)
  // const [textRef, setTextRef] = useState(null)
  // const [containerRef, setContainerRef] = useState(null)
  const textRef = useRef(null)
  const containerRef = useRef(null)
  const [animationState, setAnimationState] = useState({
    animating:    false,
    contentFits:  true,
    shouldBounce: false,
    isScrolling:  false
  })
  const  animatedValue = new Animated.Value(0)

  const makeCancelable = (promise: any) => {
    let cancel = () => {}
    const wrappedPromise = new Promise((resolve, reject) => {
      cancel = () => {
        resolve = null
        reject = null
      };
      promise.then(
        value => {
          if (resolve) {
            resolve(value)
          }
        }, 
        error => {
          if (reject) {
            reject(error)
          }
        }
      );
    });
    wrappedPromise.cancel = cancel
    return wrappedPromise
  };

  const startAnimation = () => {
    if (animationState.animating) {
      return
    }
    start()
  }

  const animateScroll = () => {
    this.setTimeout(() => {
      const scrollToValue = isRTL ?? I18nManager.isRTL ? animationState.textWidth + repeatSpacer : -this.textWidth - repeatSpacer
      if(!isNaN(scrollToValue)) {
        Animated.timing(animatedValue, {
          toValue:         scrollToValue,
          duration:        duration || this.textWidth * scrollSpeed,
          easing:          easing,
          isInteraction:   isInteraction,
          useNativeDriver: useNativeDriver
        }).start(({ finished }) => {
          if (finished) {
            if (onMarqueeComplete) {
              onMarqueeComplete()
            }
            if (loop) {
              animatedValue.setValue(0)
              animateScroll()
            }
          }
        })} else {
          start()
        }
    }, marqueeDelay)
  }

  const animateBounce = () => {
    const {duration, marqueeDelay, loop, isInteraction, useNativeDriver, easing, bounceSpeed, bouncePadding, bounceDelay, isRTL} = this.props
    const rtl = isRTL ?? I18nManager.isRTL;
    const bounceEndPadding = rtl ? bouncePadding?.left : bouncePadding?.right;
    const bounceStartPadding = rtl ? bouncePadding?.right : bouncePadding?.left;
    this.setTimeout(() => {
      Animated.sequence([
        Animated.timing(this.animatedValue, {
          toValue:         rtl ? this.distance + (bounceEndPadding ?? 10) : -this.distance - (bounceEndPadding ?? 10),
          duration:        duration || (this.distance) * bounceSpeed,
          easing:          easing,
          isInteraction:   isInteraction,
          useNativeDriver: useNativeDriver
        }),
        Animated.timing(this.animatedValue, {
          toValue:         rtl ? -(bounceStartPadding ?? 10) : bounceStartPadding ?? 10,
          duration:        duration || (this.distance) * bounceSpeed,
          easing:          easing,
          isInteraction:   isInteraction,
          useNativeDriver: useNativeDriver,
          delay: bounceDelay
        })
      ]).start(({finished}) => {
        if (finished) {
          this.hasFinishedFirstLoop = true
        }
        if (loop) {
          this.animateBounce()
        }
      })
    }, this.hasFinishedFirstLoop ? bounceDelay > 0 ? bounceDelay : 0 : marqueeDelay)
  }

  const start = async () => {
    setAnimationState({ ...animationState, animating: true })
    setAnimationTimeout(async () => {
      await calculateMetrics()
      if (!animationState.contentFits) {
        onScrollStart?.()
        if (animationType === 'auto') {
          if (shouldBounce && bounce) {
            animateBounce()
          } else {
            animateScroll()
          }
        } else if (animationType === 'bounce') {
          animateBounce()
        } else if (animationType === 'scroll') {
          animateScroll()
        }
      }
    }, 100)
  }

  const stopAnimation = () => {
    animatedValue.setValue(0)
    setAnimationState({
      ...animationState,
      animating: false,
      shouldBounce: false,
    })
  }

  const calculateMetrics = () => {
    const calculateMetricsPromise = makeCancelable(new Promise(async (resolve, reject) => {
      try {
        const measureWidth = node =>
          new Promise(async (resolve, reject) => {
            // nodehandle is not always there, causes crash. modified to check..
            const nodeHandle = findNodeHandle(node);
            if (nodeHandle) {
              UIManager.measure(nodeHandle, (x, y, w) => {
                // console.log('Width: ' + w)
                return resolve(w)
              })
            } else {
              return reject('nodehandle_not_found');
            }
          });
        const [containerWidth, textWidth] = await Promise.all([
          measureWidth(containerRef.current),
          measureWidth(textRef.current)
        ]);

        setDistance(distance)
      

        this.containerWidth = containerWidth
        this.textWidth = textWidth
        this.distance = textWidth - containerWidth + shouldAnimateTreshold

        // console.log(`distance: ${this.distance}, contentFits: ${this.state.contentFits}`)
        resolve({
          // Is 1 instead of 0 to get round rounding errors from:
          // https://github.com/facebook/react-native/commit/a534672
          contentFits:  this.distance <= 1,
          shouldBounce: this.distance < this.containerWidth / 8
        })
      } catch (error) {
        console.warn('react-native-text-ticker: could not calculate metrics', error);
      }
    }))
    setCalculateMetricsPromise(calculateMetricsPromise)
    await calculateMetricsPromise.then((result) => {
      setAnimationState({
        ...animationState,
        contentFits: result.contentFits,
        shouldBounce: result.shouldBounce,
      })
      return []
    })
  }

  const invalidateMetrics = () => {
    setDistance(null)
    setAnimationState({ ...animationState,contentFits: true })
  }

  const clearAnimationTimeout = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  const setAnimationTimeout = (fn, time = 0) => {
    clearAnimationTimeout()
    timer.current = setTimeout(fn, time)
  }

  const scrollBegin = () => {
    setAnimationState({ ...animationState, isScrolling: true })
    animatedValue.setValue(0)
  }

  const scrollEnd = () => {
    setTimeout(() => {
      setAnimationState({ ...animationState,isScrolling: false })
      start()
    }, marqueeDelay >= 0 ? marqueeDelay : 3000)
  }

  const resetScroll = () => {
    scrollBegin()
    scrollEnd()
  }

  const { animating, contentFits, isScrolling } = animationState
  const additionalContainerStyle = {
    flex: shouldAnimateTreshold ? 1 : undefined
  }
   
  return disabled ? null : (
    <ScrollView
      ref={c => (containerRef.current = c)}
      horizontal
      scrollEnabled={scroll ? !animationState.contentFits : false}
      scrollEventThrottle={16}
      onScrollBeginDrag={scrollBegin}
      onScrollEndDrag={scrollEnd}
      showsHorizontalScrollIndicator={false}
      style={[StyleSheet.absoluteFillObject, (isRTL ?? I18nManager.isRTL) && { flexDirection: 'row-reverse' } ]}
      // display={animating ? 'flex' : 'none'}
      onContentSizeChange={() => calculateMetrics()}
    >
      <Animated.Text
        ref={c => (textRef.current = c)}
        numberOfLines={1}
        {...props}
        style={[style, { transform: [{ translateX: animatedValue }], width: null }]}
      >
        {children}
      </Animated.Text>
      {!contentFits && !isScrolling
        ? <View style={{ paddingLeft: repeatSpacer }}>
          <Animated.Text
            numberOfLines={1}
            {...props}
            style={[style, { transform: [{ translateX: animatedValue }], width: null }]}
          >
            {children}
          </Animated.Text>
        </View> : null }
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
})