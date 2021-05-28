import Position from './position.js';

class Vector {
  /**
   * @param {number} sx 시작점 x 좌표
   * @param {number} sy 시작점 y 좌표
   * @param {number} ex 끝점 x 좌표
   * @param {number} ey 끝점 y 좌표
   */
  constructor(sx, sy, ex, ey) {
    this.start = new Position(sx, sy);
    this.end = new Position(ex, ey);
  }

  /**
   * @param {Position} start 시작점
   * @param {Position} end 끝점
   * @returns {Vector}
   */
  static fromPos(start, end) {
    return new Vector(start.x, start.y, end.x, end.y);
  }

  /**
   * @description 객체를 복제합니다.
   */
  clone() {
    return Vector.fromPos(this.start, this.end);
  }

  /**
   * @description 백터의 길이를 구합니다.
   * @returns {number}
   */
  getDintance() {
    return this.end.getDistanceTo(this.start);
  }

  /**
   * @description 백터의 중점을 구합니다.
   * @returns {Position}
   */
  getMiddlePoint() {
    return this.start.getMiddleTo(this.end);
  }

  /**
   * @description 백터와 좌표의 거리를 구합니다.
   * @param {Position} pos 좌표
   */
  distanceFromVector(pos) {
    const a = this.end.y - this.start.y;
    const b = -(this.end.x - this.start.x);
    const c = -(this.start.x * this.end.y - this.end.x * this.start.y);

    return (a * pos.x + b * pos.y + c) / this.getDintance();
  }
}

export default Vector;
