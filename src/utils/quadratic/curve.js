import Position from './position.js';
import Vector from './vector.js';

class Curve extends Vector {
  /**
   * @param {number} sx 시작점 x 좌표
   * @param {number} sy 시작점 y 좌표
   * @param {number} cx 조절점 x 좌표
   * @param {number} cy 조절점 y 좌표
   * @param {number} ex 끝점 x 좌표
   * @param {number} ey 끝점 y 좌표
   */
  constructor(sx, sy, cx, cy, ex, ey) {
    super(sx, sy, ex, ey);
    this.control = new Position(cx, cy);
  }

  /**
   * @param {Position} start 시작점
   * @param {Position} control 조절점
   * @param {Position} end 끝점
   * @returns {Curve}
   */
  static fromPos(start, control, end) {
    return new Curve(start.x, start.y, control.x, control.y, end.x, end.y);
  }

  clone() {
    return Curve.fromPos(this.start, this.control, this.end);
  }
}

export default Curve;
