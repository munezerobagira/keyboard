import * as THREE from 'three';
interface KeyOptions {
  keyCode: string;
  xOffset: number;
  yOffset: number;
  size: keyof typeof sizes;
}

// up
export class Key {
  private _keyGroup: THREE.Group;
  constructor({ xOffset, yOffset, size, keyCode }: KeyOptions) {
    console.log('Key class created');
    if (!sizes[size]) throw new Error('Invalid size');

    const keyGeometry = new THREE.BoxGeometry(sizes[size], 2, 2);
    const keyMaterial = new THREE.MeshNormalMaterial();
    const newKey = new THREE.Mesh(keyGeometry, keyMaterial);
    newKey.position.x = xOffset;
    newKey.position.y = yOffset;
    console.log('key position', newKey.position.x);
    this._keyGroup = new THREE.Group();
    this._keyGroup.add(newKey);
  }
  get keyGroup(): THREE.Group {
    return this._keyGroup;
  }
}
