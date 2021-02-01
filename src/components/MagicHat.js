import { Container, Sprite, Text } from 'pixi.js';
import { random } from '../core/utils';

import gsap from 'gsap';

export default class MagicHat extends Container {
  constructor() {
    super();
    this.name = 'magic-hat';

    this._body = new Sprite.from('hat');
    this._item = new Text('', { fontSize: 200 });
    this._itemMask = new Sprite.from('mask');
    this._emojis = ['👻', '💩', '😷', '😇', '🤖', '😂'];

    this._setBody();
    this._setMask();
    this._setItem();

    this.addChild(this._body);
    this.addChild(this._item);
    this.addChild(this._itemMask);

    this._addEventListeners();
  }

  animate() {
    this._item.text = this._emojis[Math.floor(random(0, 5))];

    gsap.to(this._body.scale, {
      y: 0.9,
      yoyo: true,
      repeat: 1,
      duration: 0.1,
    });

    gsap.fromTo(
      this._item,
      { y: 300 },
      {
        y: -100,
        ease: 'bounce',
        duration: 1,
      }
    );
  }

  /**
   * @private
   */
  _addEventListeners() {
    this._body.on('click', () => this.animate());
  }

  /**
   * @private
   */
  _setBody() {
    this._body.anchor.set(1);
    this._body.interactive = true;
    this._body.buttonMode = true;
    this._body.y = 450;
    this._body.x = 250;
  }

  /**
   * @private
   */
  _setMask() {
    this._itemMask.anchor.set(0.5);
    this._itemMask.x = 35;
    this._itemMask.y = -30;
  }

  /**
   * @private
   */
  _setItem() {
    this._item.anchor.set(0.5);
    this._item.x = 35;
    this._item.y = 300;
    this._item.mask = this._itemMask;
  }
}
