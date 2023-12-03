import * as THREE from 'three';
import { layoutKeys } from '@/config/layout';
import { Key, sizes } from './key';
export class Keyboard {
  private _keyboardGroup: THREE.Group;
  private _keys: Array<Key>;
  constructor() {
    console.log('Keyboard class created');
    this._keyboardGroup = new THREE.Group();
    this._keys = [];
    let xOffset = 0;
    layoutKeys.map((row, rowIndex) => {
      xOffset = 0;
      return row.map((key, keyIndex) => {
        this._keys.push(
          new Key({
            xOffset: xOffset,
            yOffset: rowIndex * 2.1,
            keyCode: key.code,
            size: key.size as keyof typeof sizes,
          })
        );
        xOffset += sizes[key.size as keyof typeof sizes] + 1;
      });
    });
    this._keys.map(key => {
      this._keyboardGroup.add(key.keyGroup);
    });
  }

  get keyboardGroup(): THREE.Group {
    return this._keyboardGroup;
  }
}
