import { Mesh, Vector2 } from 'three'
import { PositionStrategy } from './PositionStrategy'

export class DefaultPositionStrategy extends PositionStrategy {
  public getOffSetPosition(mesh: Readonly<Mesh>, widthSizeX: Readonly<number>, depthSizeY: Readonly<number>): Vector2 {
    return new Vector2(mesh.position.x, mesh.position.y)
  }
}
