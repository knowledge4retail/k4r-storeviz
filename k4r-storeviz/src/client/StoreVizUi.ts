import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { StoreList } from './store/StoreList'
export class StoreVizUi {
  private gui: GUI
  private options: StoreVizOptions

  public constructor(options: StoreVizOptions) {
    this.gui = new GUI()
    this.options = options
  }

  public withStoreDropdown(callback: (selected: string) => void) {
    if (!this.options.embeddedMode) {
      this.gui
        .add(
          {
            store: this.options.storeList.uiNameFromId(this.options.selectedStore),
          },
          'store',
          this.options.storeList.StoreNameList
        )
        .onChange(callback)
    }
    return this
  }

  public withPositionIndicatorToggle(callback: (val: boolean) => void) {
    this.gui.add(this.options, 'positionIndicators').name('Position Indicators').onChange(callback)
    return this
  }
}

export interface StoreVizOptions {
  storeList: StoreList
  positionIndicators: boolean
  embeddedMode: boolean
  selectedStore: string | null
}
