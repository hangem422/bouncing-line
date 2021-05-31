// eslint-disable-next-line no-unused-vars
import Position from '../utils/quadratic/position.js';
import Curve from '../utils/quadratic/curve.js';

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

const DEFUALT_BOUNCE = 0.92;
const DEFUALT_MOVE_MIN = 0.01;
const DEFAULT_DETECT_BEFORE = 10;
const DEFAULT_DETECT_AFTER = 300;
const DEFAULT_COLOR = '#ff5038';
const DEFAULT_LINE_WIDTH = 4;

class BouncingString {
  /**
   * @param {Position} start 시작점
   * @param {Position} end 끝점
   * @param {Option} opts BouncingString Option
   */
  constructor(start, end, opts) {
    this.bounce = opts.bounce ?? DEFUALT_BOUNCE;
    this.moveMin = opts.moveMin ?? DEFUALT_MOVE_MIN;
    this.detectBefore = opts.detectBefore ?? DEFAULT_DETECT_BEFORE;
    this.detectAfter = opts.detectAfter ?? DEFAULT_DETECT_AFTER;
    this.color = opts.color ?? DEFAULT_COLOR;
    this.lineWidth = opts.lienWidth ?? DEFAULT_LINE_WIDTH;

    const mid = start.getMiddleTo(end);

    this.currnet = Curve.fromPos(start, mid, end);
    this.origin = Curve.fromPos(start, mid, end);
    this.variable = new Curve(0, 0, 0, 0, 0, 0);

    this.detect = this.detectBefore;
    this.prevDist = 0;
  }

  /**
   * @param {Position} start 시작점
   * @param {Position} end 끝점
   */
  relocation(start, end) {
    const mid = start.getMiddleTo(end);

    const startX = start.x - this.origin.start.x;
    const startY = start.y - this.origin.start.y;
    const controlX = mid.x - this.origin.control.x;
    const controlY = mid.y - this.origin.control.y;
    const endX = end.x - this.origin.end.x;
    const endY = end.y - this.origin.end.y;

    this.currnet.start.move(startX, startY);
    this.currnet.control.move(controlX, controlY);
    this.currnet.end.move(endX, endY);
    this.origin.start.move(startX, startY);
    this.origin.control.move(controlX, controlY);
    this.origin.end.move(endX, endY);
    this.variable.control.move(controlX, controlY);
  }

  /**
   * @description 초기화합니다.
   */
  init() {
    const { x, y } = this.origin.control;
    this.currnet.control.moveTo(x, y);
    this.variable.control.moveTo(0, 0);
  }

  /**
   * @description 줄 튕김에 영향을 받는 거리인지 검증합니다.
   * @param {number} dist 거리
   * @returns {boolean}
   */
  isValid(dist) {
    if (Number.isNaN(dist)) return false;
    const abs = Math.abs(dist);

    if (this.prevDist * dist < 0) return abs < this.detectAfter;
    return abs < this.detect;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Position} target 포인터 좌표
   */
  draw(ctx, target) {
    // String과 Target 사이의 거리를 구합니다.
    const dist = this.currnet.distanceFromVector(target);
    const curCon = this.currnet.control;
    const origCon = this.origin.control;
    const varCon = this.variable.control;

    if (this.isValid(dist)) {
      // Traget의 좌표에 기반하여 Current Curve의 Control 포인트를 이동시킵니다.
      // X 좌표는 기본 위치와 Target의 중간 지점으로 이동합니다.
      // Y 좌표는 Target과 동일하게 이동합니다.
      this.detect = this.detectAfter;

      const midX = (origCon.x + target.x) / 2;
      varCon.moveTo(midX - curCon.x, target.y - curCon.y);
    } else {
      // Origin Cureve와 Current Curve 간격에 기반하여 Current Curve의 포인트를 이동시킵니다.
      this.detect = this.detectBefore;

      const x = (varCon.x + origCon.x - curCon.x) * this.bounce;
      const y = (varCon.y + origCon.y - curCon.y) * this.bounce;

      varCon.moveTo(x, y);
    }

    const notMove = Math.abs(varCon.x) + Math.abs(varCon.y) < this.moveMin;
    const notCurve = curCon.getDistanceTo(origCon) < 0;

    if (notMove && notCurve) this.init();
    else curCon.move(varCon.x, varCon.y);

    this.prevDist = dist;
    this.animate(ctx);
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  animate(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;

    const { start, control, end } = this.currnet;
    const sc = start.getMiddleTo(control);
    const ce = control.getMiddleTo(end);

    ctx.moveTo(start.x, start.y);
    ctx.lineTo(sc.x, sc.y);
    ctx.quadraticCurveTo(control.x, control.y, ce.x, ce.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }
}

export default BouncingString;
