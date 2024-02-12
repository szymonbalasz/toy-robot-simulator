import { Direction } from './enums';

/**
 * This class represents a toy robot that can be placed on a grid and moved around.
 * The grid is a square with a size of gridSize x gridSize.
 * The robot is placed on the grid using the place method, and can be moved with the move, rotateLeft, and rotateRight methods.
 * The current position and direction of the robot can be reported using the report method.
 *
 * The grid is represented as follows:
 * 0,4  1,4  2,4  3,4  4,4
 * 0,3  1,3  2,3  3,3  4,3
 * 0,2  1,2  2,2  3,2  4,2
 * 0,1  1,1  2,1  3,1  4,1
 * 0,0  1,0  2,0  3,0  4,0
 */
export class Robot {
  x: number = -1;
  y: number = -1;
  f: Direction = Direction.EAST;
  static gridSize: number = 5;

  place(x: number, y: number, f: Direction): void {
    if (!this.validPosition(x, y)) return;

    this.x = x;
    this.y = y;
    this.f = f;
  }

  move(): void {
    let newX: number = this.x;
    let newY: number = this.y;

    switch (this.f) {
      case Direction.NORTH:
        newY += 1;
        break;
      case Direction.SOUTH:
        newY -= 1;
        break;
      case Direction.EAST:
        newX += 1;
        break;
      case Direction.WEST:
        newX -= 1;
        break;
    }

    if (!this.validPosition(newX, newY)) return;

    this.x = newX;
    this.y = newY;
  }

  rotateLeft(): void {
    this.f = (this.f + 3) % 4;
  }

  rotateRight(): void {
    this.f = (this.f + 1) % 4;
  }

  report(): void {
    if (!this.isPlaced()) return;

    console.log(`${this.x},${this.y},${Direction[this.f]}`);
  }

  isPlaced(): boolean {
    return this.x !== -1 && this.y !== -1;
  }

  private validPosition(x: number, y: number): boolean {
    return x >= 0 && x < Robot.gridSize && y >= 0 && y < Robot.gridSize;
  }
}
