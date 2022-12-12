import { Mesh, Vector2 } from 'three'

export abstract class PositionStrategy {
  abstract getOffSetPosition(mesh: Readonly<Mesh>, widthSizeX: Readonly<number>, depthSizeY: Readonly<number>): Vector2
}
