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
    .connect()

  return reactotron
}
