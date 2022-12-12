import { Euler, Mesh, Vector2 } from 'three'
import { MathUtil } from '../../util/MathUtil'
import { PositionStrategy } from './PositionStrategy'

export class BottomLeftPositionStrategy extends PositionStrategy {
  public getOffSetPosition(mesh: Readonly<Mesh>, widthSizeX: Readonly<number>, depthSizeY: Readonly<number>): Vector2 {
    const rotation = new Euler().setFromQuaternion(mesh.quaternion, mesh.rotation.order) // Euler angle is shifted by Pi
    const offset = MathUtil.rotateOffset(widthSizeX, depthSizeY, rotation.z)
    return new Vector2(mesh.position.x - offset.x, mesh.position.y - offset.y)
  }
}
