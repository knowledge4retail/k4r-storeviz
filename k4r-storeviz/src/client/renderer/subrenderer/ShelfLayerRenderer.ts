import { Mesh, BoxGeometry, MeshLambertMaterial } from 'three'
import { IShelf } from '../../store/IShelf'
import { SubRenderer } from './SubRenderer'

export class ShelfLayerRenderer extends SubRenderer {
  public *render(baseMesh: Mesh, baseData: IShelf): IterableIterator<Mesh> {
    const Material = new MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    })
    for (let layer of baseData.shelfLayers) {
      const geometry = new BoxGeometry(layer.width, layer.depth, 0.01)
      const theMesh = baseMesh.clone()
      theMesh.position.z = layer.positionZ
      theMesh.geometry = geometry
      theMesh.material = Material
      yield theMesh
    }
  }
}
