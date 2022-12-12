import { IShelfLayer } from './IShelfLayer'

export interface IShelf {
  id: number
  positionX: number
  positionY: number
  positionZ: number
  width: number
  height: number
  depth: number
  orientationX: number
  orientationY: number
  orientationZ: number
  orientationW: number
  externalReferenceId: string
  cadPlanId: string
  shelfLayers: IShelfLayer[]
}
