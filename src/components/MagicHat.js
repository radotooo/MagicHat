import { Container, Sprite, Text } from 'pixi.js';
import { random } from '../core/utils';
import gsap from 'gsap';

/**
 * Initializes a new instance of MagicHat
 * @class
 * @extends {PIXI.Container}
 */
export default class MagicHat extends Container {
  constructor() {
    super();
    this.name = 'magic-hat';
    this._emojis = ['👻', '💩', '😷', '😇', '🤖', '😂'];

    this._init();
  }

  /**
   * @private
   */
  _init() {
    this._setBody();
    this._setItemMask();
    this._setItem();
    this._addEventListeners();
  }

  /**
   * @private
   */
  async _animate() {
    this._item.text = this._emojis[Math.floor(random(0, 5))];
    const tl = new gsap.timeline();

    await tl
      .fromTo(
        this._body.scale,
        { y: 1 },
        {
          y: 0.9,
          yoyo: true,
          repeat: 1,
          duration: 0.1,
        }
      )
      .fromTo(
        this._item,
        { y: 300 },
        {
          y: -100,
          ease: 'bounce',
          duration: 1,
        },
        '<'
      );
  }

  /**
   * @private
   */
  _addEventListeners() {
    this._body.on('click', () => this._animate());
  }

  /**
   * @private
   */
  _setBody() {
    const body = new Sprite.from('hat');

    body.anchor.set(1);
    body.interactive = true;
    body.buttonMode = true;
    body.y = 450;
    body.x = 250;

    this._body = body;
    this.addChild(this._body);
  }

  /**
   * @private
   */
  _setItemMask() {
    const itemMask = new Sprite.from('mask');

    itemMask.anchor.set(0.5);
    itemMask.x = 35;
    itemMask.y = -30;

    this._itemMask = itemMask;
    this.addChild(this._itemMask);
  }

  /**
   * @private
   */
  _setItem() {
    const item = new Text('', { fontSize: 200 });

    item.anchor.set(0.5);
    item.x = 35;
    item.y = 300;
    item.mask = this._itemMask;

    this._item = item;
    this.addChild(this._item);
  }
}
