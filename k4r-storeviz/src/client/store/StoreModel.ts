import { IFloor } from './IFloor'
import { IShelf } from './IShelf'
import { IStore } from './IStore'
import { StoreApiClient } from './StoreApiClient'

export class StoreModel {
  public store: IStore
  public shelves: IShelf[]
  public floor: IFloor

  public constructor(store: IStore) {
    this.store = store
  }

  public async Load() {
    this.shelves = await StoreApiClient.getShelves(this.store.id)
    this.floor = this.calculateFloor()
  }

  private calculateFloor(): IFloor {
    if (this.shelves.length == 0) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0, centerX: 0, centerY: 0 }
    }

    const minX = this.shelves.reduce((p, c) => (p.positionX < c.positionX ? p : c)).positionX
    const maxX = this.shelves.reduce((p, c) => (p.positionX > c.positionX ? p : c)).positionX
    const minY = this.shelves.reduce((p, c) => (p.positionY < c.positionY ? p : c)).positionY
    const maxY = this.shelves.reduce((p, c) => (p.positionY > c.positionY ? p : c)).positionY
    return {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2,
    }
  }
}
