import Position from './utils/quadratic/position.js';
import Ball from './components/ball.js';
import StringController from './components/string-controller.js';

const AUTO = false;

const INVISIBLE_X = NaN;
const INVISIBLE_Y = NaN;

const MARGIN_X = 20;
const MARGIN_Y = 20;

const LINE_COLOR = '#ff5038';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.ball = new Ball(20, 6, '#ffdd1c');
    this.strings = new StringController(MARGIN_Y, MARGIN_X, LINE_COLOR);

    this.movePos = new Position(INVISIBLE_X, INVISIBLE_Y);
    this.moveFunc = this.onMove.bind(this);

    window.addEventListener('resize', this.resize.bind(this), false);
    if (!AUTO) {
      document.addEventListener('pointerdown', this.onDown.bind(this), false);
      document.addEventListener('pointerup', this.onUp.bind(this), false);
    }

    this.stageWidth = 0;
    this.stageHeight = 0;

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

    this.strings.resize(this.stageWidth, this.stageHeight);
    if (AUTO) this.ball.resize(this.stageWidth, this.stageHeight);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    if (AUTO) {
      const target = this.ball.drawAuto(this.ctx);
      this.strings.draw(this.ctx, target);
    } else {
      const target = this.movePos.clone();
      this.ball.draw(this.ctx, target);
      this.strings.draw(this.ctx, target);
    }
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
