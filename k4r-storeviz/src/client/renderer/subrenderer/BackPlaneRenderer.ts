import { Mesh } from 'three'
import { IShelf } from '../../store/IShelf'
import { SubRenderer } from './SubRenderer'

export class BackPlaneRenderer extends SubRenderer {
  public *render(baseMesh: Mesh, baseData: IShelf): IterableIterator<Mesh> {
    throw new Error('Method not implemented.')
  }
}
