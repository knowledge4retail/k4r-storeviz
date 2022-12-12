import * as THREE from 'three'
import { Vector2 } from 'three'

export namespace MathUtil {
  export function quat2Deg(x: number, y: number, z: number, w: number, eulerOrder: string): number {
    const rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(x, y, z, w), eulerOrder)
    return rad2Deg(rotation.z)
  }

  export function rad2Deg(radians: number) {
    return radians * (180 / Math.PI)
  }

  export function rotateOffset(sizeX: number, sizeY: number, radians: number): Vector2 {
    const result = new Vector2()
    result.x = (-sizeX / 2) * Math.cos(radians) + (sizeY / 2) * Math.sin(radians)
    result.y = (-sizeX / 2) * Math.sin(radians) - (sizeY / 2) * Math.cos(radians)
    return result
  }

  export function bottomLeftCorner(
    centerX: number,
    centerY: number,
    sizeX: number,
    sizeY: number,
    radians: number
  ): Vector2 {
    const result = new Vector2()
    result.x = centerX - (sizeX / 2) * Math.cos(radians) + (sizeY / 2) * Math.sin(radians)
    result.y = centerY - (sizeX / 2) * Math.sin(radians) - (sizeY / 2) * Math.cos(radians)
    return result
  }

  export function bottomRightCorner(
    centerX: number,
    centerY: number,
    sizeX: number,
    sizeY: number,
    radians: number
  ): Vector2 {
    const result = new Vector2()
    result.x = centerX + (sizeX / 2) * Math.cos(radians) + (sizeY / 2) * Math.sin(radians)
    result.y = centerY + (sizeX / 2) * Math.sin(radians) - (sizeY / 2) * Math.cos(radians)
    return result
  }

  export function topLeftCorner(
    centerX: number,
    centerY: number,
    sizeX: number,
    sizeY: number,
    radians: number
  ): Vector2 {
    const result = new Vector2()
    result.x = centerX - (sizeX / 2) * Math.cos(radians) - (sizeY / 2) * Math.sin(radians)
    result.y = centerY - (sizeX / 2) * Math.sin(radians) + (sizeY / 2) * Math.cos(radians)
    return result
  }

  export function topRightCorner(
    centerX: number,
    centerY: number,
    sizeX: number,
    sizeY: number,
    radians: number
  ): Vector2 {
    const result = new Vector2()
    result.x = centerX + (sizeX / 2) * Math.cos(radians) - (sizeY / 2) * Math.sin(radians)
    result.y = centerY + (sizeX / 2) * Math.sin(radians) + (sizeY / 2) * Math.cos(radians)
    return result
  }
}
