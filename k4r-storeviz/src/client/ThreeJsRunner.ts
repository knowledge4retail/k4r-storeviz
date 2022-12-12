import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { StoreList } from './store/StoreList'
import { StoreRenderer } from './renderer/StoreRenderer'
import { Config } from './config/Config'
import { StoreModel } from './store/StoreModel'
import { StoreVizOptions, StoreVizUi } from './StoreVizUi'

export class ThreeJsRunner {
  // threejs
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private controls: OrbitControls
  private stats: Stats
  private raycaster: THREE.Raycaster
  private mouse = new THREE.Vector2()

  // domain
  private storeList: StoreList
  private storeRenderer: StoreRenderer

  public constructor(storeList: StoreList, embeddedMode: boolean, initialStore: string | null) {
    this.initialize({
      storeList: storeList,
      positionIndicators: false,
      embeddedMode: embeddedMode,
      selectedStore: initialStore,
    })
  }

  private initialize(options: StoreVizOptions) {
    this.storeList = options.storeList

    // set up scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(Config.backgroundColor())

    // set up camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)

    // set up renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    window.addEventListener('resize', this.onWindowResize, false)

    // set up raycaster
    this.raycaster = new THREE.Raycaster()
    window.addEventListener('pointerdown', this.onPointerDown)

    // set up controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // set up fps counter
    this.stats = Stats()
    document.body.appendChild(this.stats.dom)

    // set up axesHelper
    this.axesHelper()

    // set up gui
    new StoreVizUi(options)
      .withStoreDropdown(this.onStoreSelected)
      .withPositionIndicatorToggle(this.onTogglePositionIndicators)

    if (options.selectedStore) {
      this.onStoreSelected(options.storeList.uiNameFromId(options.selectedStore))
    }

    // trigger rendering loop
    this.animate()
  }

  private onPointerDown = (event: { which: number; clientX: number; clientY: number }) => {
    if (event.which != 2)
      // only consider middle mouse button (1=left, 2=middle, 3=right)
      return
    const intersects = this.onPointerDownFindIntersections(event)
    if (intersects.length == 0)
      // mouse didn't hit any object
      return
    const clickedMesh = intersects[0].object as THREE.Mesh
    this.storeRenderer.highlightObject(clickedMesh)
  }

  private onPointerDownFindIntersections(event: { clientX: number; clientY: number }): THREE.Intersection[] {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouse, this.camera)
    return this.raycaster.intersectObjects(this.scene.children)
  }

  private animate = () => {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
    this.stats.update()
  }

  private onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private onStoreSelected = (storeGuiName: string) => {
    this.scene.clear()
    const storeModel = new StoreModel(this.storeList.storeFromUiName(storeGuiName))
    storeModel.Load().then(() => {
      this.storeRenderer = new StoreRenderer(storeModel, this.scene)
      this.storeRenderer.render()
      this.addLight(storeModel.floor.centerX, storeModel.floor.centerY)
      this.centerCamera(storeModel.floor.centerX, storeModel.floor.centerY)
    })
    this.axesHelper()
  }

  private onTogglePositionIndicators = () => {
    this.camera.layers.toggle(3)
  }

  private addLight(x: number, y: number) {
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const pointLight = new THREE.PointLight(0xffffff, 1)
    const pos: THREE.Vector3 = new THREE.Vector3(x, y, 200)
    pointLight.position.set(pos.x, pos.y, pos.z)
    this.scene.add(pointLight)
  }

  private centerCamera(x: number, y: number) {
    const pos = new THREE.Vector3(x, y, 30)
    const dir = new THREE.Vector3(pos.x, pos.y, 0)
    this.camera.position.set(pos.x, pos.y, pos.z)
    this.camera.lookAt(dir)
    this.controls.target.set(dir.x, dir.y, dir.z)
    this.controls.update()
  }

  private axesHelper() {
    const axesHelper = new THREE.AxesHelper(5)
    this.scene.add(axesHelper)
  }
}
