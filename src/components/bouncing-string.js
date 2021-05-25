import Position from '../utils/quadratic/position.js';

class BouncingString {
  /**
   * @param {{ [prop: string]: Position}} pos
   * @param {string} color
   */
  constructor(pos, color) {
    const midX = (pos.pos2.x - pos.pos1.x) / 2 + pos.pos1.x;
    const midY = (pos.pos2.y - pos.pos1.y) / 2 + pos.pos1.y;

    this.points = [
      {
        pos: new Position(pos.pos1.x, pos.pos1.x),
        opos: new Position(pos.pos1.x, pos.pos1.x),
        vpos: new Position(0, 0),
      },
      {
        pos: new Position(midX, midY),
        opos: new Position(midX, midY),
        vpos: new Position(0, 0),
      },
      {
        pos: new Position(pos.pos2.x, pos.pos2.x),
        opos: new Position(pos.pos2.x, pos.pos2.x),
        vpos: new Position(0, 0),
      },
    ];

    this.detect = 10;
    this.color = color;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Position} pos
   */
  animate(ctx, pos) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

export default BouncingString;
