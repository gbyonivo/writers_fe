import { NativeModules } from 'react-native'
import Reactotron, { asyncStorage } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

export const reactotronConnect = () => {
  const scriptURL = NativeModules.SourceCode.scriptURL
  const scriptHostname = scriptURL.split('://')[1].split(':')[0]
  const reactotron = Reactotron.configure({
    host: scriptHostname,
    port: 9090,
  })
    .useReactNative({
      asyncStorage: true,
      networking: {
        ignoreUrls: /symbolicate/,
      },
      editor: false,
      errors: { veto: (stackFrame) => false },
      overlay: false,
    })
    // .setAsyncStorageHandler(AsyncStorage)
    .use(asyncStorage())
    .use(reactotronRedux())
  const log = console.log
  console.log = (...args) => {
    log(...args)

    Reactotron.display({
      name: 'LOG',
      value: args,
      preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
    })
  }

  const warn = console.warn
  console.warn = (...args) => {
    warn(...args)

    Reactotron.display({
      name: 'WARN',
      value: args,
      preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
    })
  }
  Reactotron.connect()

  return reactotron
}
