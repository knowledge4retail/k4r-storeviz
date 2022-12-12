import { Mesh, TextureLoader, MeshBasicMaterial } from 'three'
import { IShelf } from '../../store/IShelf'
import { SubRenderer } from './SubRenderer'
import { Config } from '../../config/Config'

export class BoxRenderer extends SubRenderer {
  public *render(baseMesh: Mesh, baseData: IShelf): IterableIterator<Mesh> {
    const mesh = baseMesh.clone()
    //const texture = new TextureLoader().load('/texture/fig626280.jpg');
    const texture = new TextureLoader().load('/texture/regal_demo.png')

    const boxColor = Math.random() * 0xffffff
    var cubeMaterialArray = []

    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push(new MeshBasicMaterial({ color: boxColor }))
    cubeMaterialArray.push(new MeshBasicMaterial({ color: boxColor }))
    cubeMaterialArray.push(new MeshBasicMaterial({ color: boxColor }))
    if (Config.renderTexture()) {
      cubeMaterialArray.push(new MeshBasicMaterial({ map: texture }))
    } else {
      cubeMaterialArray.push(new MeshBasicMaterial({ color: boxColor }))
    }
    cubeMaterialArray.push(new MeshBasicMaterial({ color: boxColor }))
    cubeMaterialArray.push(new MeshBasicMaterial({ color: boxColor }))

    mesh.material = cubeMaterialArray

    //mesh.material = new MeshLambertMaterial({ color: Math.random() * 0xffffff })
    //mesh.material = new MeshStandardMaterial( {map: texture} );
    yield mesh
  }
}
