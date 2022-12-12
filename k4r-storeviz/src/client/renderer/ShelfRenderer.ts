import { BoxGeometry, Mesh, Vector2, Vector3 } from 'three'
import { IShelf } from '../store/IShelf'
import { PositionStrategy } from './positionstrategy/PositionStrategy'
import { PositionStrategyProvider } from './positionstrategy/PositionStrategyProvider'
import { BoxRenderer } from './subrenderer/BoxRenderer'
import { SubRenderer } from './subrenderer/SubRenderer'

export class ShelfRenderer {
  private data: IShelf[]
  private subRenderers: SubRenderer[] = []
  private positionStrategy: PositionStrategy

  constructor(shelves: IShelf[]) {
    this.data = shelves
    this.positionStrategy = PositionStrategyProvider.get()
    this.subRenderers.push(new BoxRenderer())
    //this.subRenderers.push(new ShelfLayerRenderer())
  }

  public render = (): Mesh[] => {
    const meshes: Mesh[] = []
    this.data.forEach((shelf) => {
      const baseMesh = this.constructBaseMesh(shelf)
      this.offSetPosition(baseMesh, shelf.width, shelf.depth)
      this.subRenderers.forEach((subrenderer) => {
        meshes.push(...subrenderer.render(baseMesh, shelf))
      })
    })
    return meshes
  }

  private constructBaseMesh(shelf: IShelf): Mesh {
    const geometry = new BoxGeometry(shelf.width, shelf.depth, shelf.height)
    const position = new Vector3(shelf.positionX, shelf.positionY, shelf.positionZ + shelf.height / 2)
    const baseMesh = new Mesh(geometry)
    baseMesh.position.set(position.x, position.y, position.z)
    baseMesh.quaternion.set(shelf.orientationX, shelf.orientationY, shelf.orientationZ, shelf.orientationW)
    baseMesh.userData['shelf'] = shelf
    return baseMesh
  }

  private offSetPosition(mesh: THREE.Mesh, sizeX: number, sizeY: number) {
    const newPosition: Vector2 = this.positionStrategy.getOffSetPosition(mesh, sizeX, sizeY)
    mesh.position.x = newPosition.x
    mesh.position.y = newPosition.y
  }
}
