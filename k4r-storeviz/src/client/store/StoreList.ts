import { IStore } from './IStore'
import { StoreApiClient } from './StoreApiClient'

export class StoreList {
  public stores: IStore[]

  public static async load() {
    const storeList = new StoreList()
    storeList.stores = await StoreApiClient.getStores()
    return storeList
  }

  public get StoreNameList(): string[] {
    return this.stores.map(this.mapName)
  }

  public storeFromUiName(guiName: string): IStore {
    return this.findById(guiName.split(' ')[0])
  }

  public uiNameFromId(storeId: string | null): string {
    if (!storeId) return ''
    return this.mapName(this.findById(storeId))
  }

  private findById(storeId: string): IStore {
    const store: IStore | undefined = this.stores.find((s) => s.id == +storeId)
    if (!store) throw new TypeError(`store ${storeId} not found`)
    return store
  }

  private mapName(s: IStore): string {
    return `${s.id} - ${s.storeName}`
  }
}
