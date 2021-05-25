import Position from './utils/quadratic/position.js';
import BouncingString from './components/bouncing-string.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.strings = [];
    this.movePos = new Position(-5000, -5000);
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

    this.strings = [
      new BouncingString(
        {
          pos1: new Position(50, this.stageHeight / 2),
          pos2: new Position(this.stageWidth - 50, this.stageHeight / 2),
        },
        '#ff5038',
      ),
    ];
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.strings.forEach((string) => {
      string.animate(this.ctx, this.movePos);
    });
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
    this.movePos.moveTo(-5000, -5000);
  }
}

/**
 * @description Application을 Target에 랜더링합니다.
 * @param {HTMLElement} target
 */
export default function render(target) {
  target.appendChild(new App().element);
}
