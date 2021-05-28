class Position {
  /**
   * @param {number} x 좌표의 x값
   * @param {number} y 좌표의 y값
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @description 객체를 복제합니다.
   */
  clone() {
    return new Position(this.x, this.y);
  }

  /**
   * @description 두 위치 좌표의 거리를 구합니다.
   * @param {Position} pos
   * @returns {number}
   */
  getDistanceTo(pos) {
    const a = this.x - pos.x;
    const b = this.y - pos.y;

    return Math.sqrt(a ** 2 + b ** 2);
  }

  /**
   * @description 두 위치 좌표의 중간 좌표를 구합니다.
   * @param {Position} pos
   * @returns {Position}
   */
  getMiddleTo(pos) {
    const x = (this.x + pos.x) / 2;
    const y = (this.y + pos.y) / 2;

    return new Position(x, y);
  }

  /**
   * @description 좌표를 이동시킵니다.
   * @param {number} x
   * @param {number} y
   */
  move(x = 0, y = 0) {
    this.x += x;
    this.y += y;
  }

  /**
   * @description 좌표를 이동시킵니다.
   * @param {number} x
   * @param {number} y
   */
  moveTo(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
  }
}

export default Position;
