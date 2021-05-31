import Position from '../utils/quadratic/position.js';
import BouncingString from './bouncing-string.js';

/**
 * @description BouncingString Option
 * @typedef {object} Option
 * @property {number} bounce 튕김 강도
 * @property {number} moveMin 최소한의 움직임 감도
 * @property {number} detectBefore 줄이 포인터를 만나기 전에 민감도
 * @property {number} detectAfter 줄이 포인터와 접촉한 후 민감도
 * @property {string} color 색상
 * @property {number} lienWidth 두꼐
 */

class StringController {
  /**
   * @param {number} verticalSpacing
   * @param {number} horizontalSpacing
   * @param {Option} opts
   */
  constructor(verticalSpacing, horizontalSpacing, opts) {
    this.vs = verticalSpacing;
    this.hs = horizontalSpacing;
    this.opts = opts;

    this.strings = [];

    this.stageWidth = 0;
    this.stageHeight = 0;
  }

  /**
   * @param {number} stageWidth
   * @param {number} stageHeight
   */
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    const padding = (this.stageHeight % this.vs) / 2;
    const newStrings = [];
    const prevCnt = this.strings.length;
    let prevIndex = 0;

    for (let top = padding; top < this.stageHeight; top += this.vs) {
      const start = new Position(this.hs, top);
      const end = new Position(this.stageWidth - this.hs, top);

      if (prevIndex < prevCnt) {
        this.strings[prevIndex].relocation(start, end);
        newStrings.push(this.strings[prevIndex]);
        prevIndex += 1;
      } else {
        const string = new BouncingString(start, end, this.opts);
        newStrings.push(string);
      }
    }

    this.strings = newStrings;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Position} target 포인터 좌표
   */
  draw(ctx, target) {
    this.strings.forEach((string) => string.draw(ctx, target));
  }
}

export default StringController;
