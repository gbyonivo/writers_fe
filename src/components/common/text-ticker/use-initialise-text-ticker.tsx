import { useEffect } from 'react'

export const useInitializeTextTicker = ({
  invalidateMetrics,
  disabled,
  marqueeDelay,
  marqueeOnMount,
  startAnimation,
  prevPropsRef,
  resetScroll,
  children,
  clearTimeout,
  stopAnimation,
  calculateMetricsPromise,
}) => {
  useEffect(() => {
    invalidateMetrics()
    if (!disabled && marqueeOnMount) {
      startAnimation(marqueeDelay)
    }
  }, [disabled, marqueeDelay, marqueeOnMount])

  useEffect(() => {
    if (children !== prevPropsRef.current.children) {
      resetScroll()
    } else if (disabled !== prevPropsRef.current.disabled) {
      if (!disabled && marqueeOnMount) {
        startAnimation(marqueeDelay)
      } else if (disabled) {
        // Cancel any promises
        if (calculateMetricsPromise !== null) {
          calculateMetricsPromise.cancel()
          calculateMetricsPromise = null
        }
        stopAnimation()
        clearTimeout()
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      if (calculateMetricsPromise !== null) {
        calculateMetricsPromise.cancel()
        calculateMetricsPromise = null
      }
      stopAnimation()
      // always stop timers when unmounting, common source of crash
      clearTimeout()
    }
  }, [])
}
