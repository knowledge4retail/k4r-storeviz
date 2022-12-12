import { Config } from './config/Config'
import { StoreList } from './store/StoreList'
import { ThreeJsRunner } from './ThreeJsRunner'

const initialStore: string | null = new URL(window.location.href).searchParams.get('store')
const embeddedMode: boolean = new URL(window.location.href).searchParams.get('embed')?.toLowerCase() == 'true'
console.log(embeddedMode)
Config.fetch().then(() => {
  StoreList.load().then((storeList) => {
    const threeJsRunner = new ThreeJsRunner(storeList, embeddedMode, initialStore)
  })
})
