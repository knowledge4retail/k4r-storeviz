import * as THREE from 'three'
import { StoreModel } from '../store/StoreModel'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { Vector2 } from 'three'
import { ShelfRenderer } from './ShelfRenderer'

type materialList = {
  [key: string]: THREE.Material | THREE.Material[]
}

export class StoreRenderer {
  private scene: THREE.Scene
  private materials: materialList = {}
  private model: StoreModel
  private shelfRenderer: ShelfRenderer

  public constructor(model: StoreModel, scene: THREE.Scene) {
    this.model = model
    this.scene = scene
    this.shelfRenderer = new ShelfRenderer(this.model.shelves)
  }

  public render() {
    this.scene.add(...this.shelfRenderer.render())
    this.addPositionIndicators()
    this.addFloor()
  }

  public highlightObject(mesh: THREE.Mesh) {
    if (this.isFloor(mesh))
      // ignore floor
      return
    if (this.materials[mesh.uuid]) {
      mesh.material = this.materials[mesh.uuid]
      delete this.materials[mesh.uuid]
    } else {
      this.materials[mesh.uuid] = mesh.material
      mesh.material = new THREE.MeshBasicMaterial({ wireframe: true })
    }
    console.dir(mesh.userData['shelf'])
  }

  private addPositionIndicators() {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
    for (let shelf of this.model.shelves) {
      const points = []
      points.push(new THREE.Vector3(shelf.positionX, shelf.positionY, 0))
      points.push(new THREE.Vector3(shelf.positionX, shelf.positionY, shelf.height * 1.2))
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(lineGeometry, lineMaterial)
      line.userData['isLine'] = true
      line.layers.set(3)
      this.scene.add(line)
    }
  }

  private addFloor() {
    const floorWidth = Math.abs(this.model.floor.minX) + Math.abs(this.model.floor.maxX)
    const floorHeight = Math.abs(this.model.floor.minY) + Math.abs(this.model.floor.maxY)
    const offsetWidth = floorWidth * 0.2
    const offsetHeight = floorHeight * 0.2
    const geometry = new THREE.PlaneGeometry(floorWidth + offsetWidth, floorHeight + offsetHeight, 1, 1),
      groundMirror = new Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x777777,
      })
    groundMirror.position.set(this.model.floor.centerX, this.model.floor.centerY, -0.003)
    this.scene.add(groundMirror)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(floorWidth + offsetWidth, floorHeight + offsetHeight, 1, 1),
      new THREE.MeshPhongMaterial({
        color: '#252a34',
        opacity: 0.6,
        transparent: true,
      })
    )
    floor.material.side = THREE.DoubleSide
    floor.position.set(this.model.floor.centerX, this.model.floor.centerY, -0.001)
    this.scene.add(floor)
  }

  private isFloor(mesh: THREE.Mesh): boolean {
    return mesh.geometry instanceof THREE.PlaneGeometry
  }

  private helperVisualizePoint(point: Vector2, scene: THREE.Scene) {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
    const points = []
    points.push(new THREE.Vector3(point.x, point.y, 0))
    points.push(new THREE.Vector3(point.x, point.y, 2.5))
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(lineGeometry, lineMaterial)
    scene.add(line)
  }
}
