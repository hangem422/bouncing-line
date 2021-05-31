import Position from '../utils/quadratic/position.js';

class Ball {
  /**
   * @param {number} radius
   * @param {number} speed
   * @param {string} color
   */
  constructor(radius, speed, color) {
    this.radius = radius;
    this.color = color;
    this.pos = new Position(radius, radius);
    this.var = new Position(speed, speed);

    this.min = new Position(this.radius, this.radius);
    this.max = new Position(this.radius, this.radius);
  }

  /**
   * @param {number} stageWidth
   * @param {number} stageHeight
   */
  resize(stageWidth, stageHeight) {
    this.max.moveTo(stageWidth - this.radius, stageHeight - this.radius);
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Position} position 현재 위치
   */
  draw(ctx, position) {
    if (position.isValid()) {
      this.pos.moveTo(position.x, position.y);
      this.animate(ctx);
    }
  }

  /**
   * @description 공의 위치를 자동으로 변경하여 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   * @returns {Position} 현재 위치
   */
  drawAuto(ctx) {
    this.pos.move(this.var.x, this.var.y);

    // Ball이 좌우 밖으로 나가지 않고 튕깁니다.
    if (this.pos.x < this.min.x) {
      this.pos.moveTo(this.min.x - this.pos.x + this.min.x);
      this.var.x *= -1;
    } else if (this.pos.x > this.max.x) {
      this.pos.moveTo(this.max.x - this.pos.x + this.max.x);
      this.var.x *= -1;
    }

    // Ball이 상하 밖으로 나가지 않고 튕깁니다.
    if (this.pos.y < this.min.y) {
      this.pos.moveTo(this.pos.x, this.min.y - this.pos.y + this.min.y);
      this.var.y *= -1;
    } else if (this.pos.y > this.max.y) {
      this.pos.moveTo(this.pos.x, this.max.y - this.pos.y + this.max.y);
      this.var.y *= -1;
    }

    this.animate(ctx);

    return this.pos.clone();
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  animate(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

export default Ball;
