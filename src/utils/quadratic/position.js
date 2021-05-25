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
