import { Mesh } from 'three'
import { IShelf } from '../../store/IShelf'

export abstract class SubRenderer {
  abstract render(baseMesh: Mesh, baseData: IShelf): IterableIterator<Mesh>
}
