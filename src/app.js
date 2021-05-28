import Position from './utils/quadratic/position.js';
import BouncingString from './components/bouncing-string.js';

const INVISIBLE_X = NaN;
const INVISIBLE_Y = NaN;

const PADDING_RIGHT = 50;
const PADDING_LEFT = 50;

const LINE_COLOR = '#ff5038';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.strings = [];
    this.movePos = new Position(INVISIBLE_X, INVISIBLE_Y);
    this.moveFunc = this.onMove.bind(this);

    window.addEventListener('resize', this.resize.bind(this), false);
    document.addEventListener('pointerdown', this.onDown.bind(this), false);
    document.addEventListener('pointerup', this.onUp.bind(this), false);

    this.resize();
    this.animate();
  }

  get element() {
    return this.canvas;
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    const y = this.stageHeight / 2;
    const start = new Position(PADDING_LEFT, y);
    const end = new Position(this.stageWidth - PADDING_RIGHT, y);

    this.strings = [new BouncingString(start, end, LINE_COLOR)];
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    const target = this.movePos.clone();
    this.strings.forEach((string) => string.draw(this.ctx, target));
  }

  onDown(e) {
    this.movePos.moveTo(e.clientX, e.clientY);
    document.addEventListener('pointermove', this.moveFunc, false);
  }

  onMove(e) {
    this.movePos.moveTo(e.clientX, e.clientY);
  }

  onUp() {
    document.removeEventListener('pointermove', this.moveFunc, false);
    this.movePos.moveTo(INVISIBLE_X, INVISIBLE_Y);
  }
}

/**
 * @description Application을 Target에 랜더링합니다.
 * @param {HTMLElement} target
 */
export default function render(target) {
  target.appendChild(new App().element);
}
