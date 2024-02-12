import { Robot } from '../src/robot';
import { Direction } from '../src/enums';

describe('Robot', () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  describe('place', () => {
    it('should place the robot at a valid position', () => {
      robot.place(1, 1, Direction.NORTH);
      expect(robot.x).toEqual(1);
      expect(robot.y).toEqual(1);
      expect(robot.f).toEqual(Direction.NORTH);
    });

    it('should not place the robot at an invalid position', () => {
      robot.place(-1, -1, Direction.NORTH);
      expect(robot.x).toEqual(-1);
      expect(robot.y).toEqual(-1);
    });
  });

  describe('move', () => {
    it('should move the robot one step to the north when facing north', () => {
      robot.place(1, 1, Direction.NORTH);
      robot.move();
      expect(robot.x).toEqual(1);
      expect(robot.y).toEqual(2);
    });

    it('should move the robot one step to the south when facing south', () => {
      robot.place(1, 1, Direction.SOUTH);
      robot.move();
      expect(robot.x).toEqual(1);
      expect(robot.y).toEqual(0);
    });

    it('should move the robot one step to the east when facing east', () => {
      robot.place(1, 1, Direction.EAST);
      robot.move();
      expect(robot.x).toEqual(2);
      expect(robot.y).toEqual(1);
    });

    it('should move the robot one step to the west when facing west', () => {
      robot.place(1, 1, Direction.WEST);
      robot.move();
      expect(robot.x).toEqual(0);
      expect(robot.y).toEqual(1);
    });

    it('should not move the robot if it is at the edge and facing the edge', () => {
      robot.place(0, 0, Direction.SOUTH);
      robot.move();
      expect(robot.x).toEqual(0);
      expect(robot.y).toEqual(0);
    });

    it('should not move the robot if it is not placed on the grid', () => {
      robot.move();
      expect(robot.x).toEqual(-1);
      expect(robot.y).toEqual(-1);
    });
  });

  describe('Robot', () => {
    let robot: Robot;

    beforeEach(() => {
      robot = new Robot();
    });

    describe('rotateLeft', () => {
      it('should rotate the robot 90 degrees to the left', () => {
        robot.place(1, 1, Direction.NORTH);
        robot.rotateLeft();
        expect(robot.f).toEqual(Direction.WEST);
      });
    });

    describe('rotateRight', () => {
      it('should rotate the robot 90 degrees to the right', () => {
        robot.place(1, 1, Direction.NORTH);
        robot.rotateRight();
        expect(robot.f).toEqual(Direction.EAST);
      });
    });

    describe('report', () => {
      it('should report the current position and direction of the robot', () => {
        robot.place(1, 1, Direction.NORTH);
        const consoleSpy = jest.spyOn(console, 'log');
        robot.report();
        expect(consoleSpy).toHaveBeenCalledWith('1,1,NORTH');
      });
    });

    describe('isPlaced', () => {
      it('should return true if the robot is placed on the grid', () => {
        robot.place(1, 1, Direction.NORTH);
        expect(robot.isPlaced()).toEqual(true);
      });

      it('should return false if the robot is not placed on the grid', () => {
        expect(robot.isPlaced()).toEqual(false);
      });
    });
  });

  describe('Robot Boundary Movement', () => {
    test.each([
      ['North Boundary', 2, 4, Direction.NORTH, 2, 4],
      ['South Boundary', 2, 0, Direction.SOUTH, 2, 0],
      ['East Boundary', 4, 2, Direction.EAST, 4, 2],
      ['West Boundary', 0, 2, Direction.WEST, 0, 2],
    ])(
      'should not move beyond the %s',
      (desc, x, y, f, expectedX, expectedY) => {
        robot.place(x, y, f);
        robot.move();
        expect(robot.x).toEqual(expectedX);
        expect(robot.y).toEqual(expectedY);
      },
    );
  });

  describe('Robot Rotation Validity', () => {
    const directions = [
      Direction.NORTH,
      Direction.EAST,
      Direction.SOUTH,
      Direction.WEST,
    ];
    const testCases = directions.map((direction, index) => [direction, index]);

    test.each(testCases)(
      'should correctly rotate from %s',
      (initialDirection, index) => {
        robot.place(2, 2, initialDirection);
        robot.rotateRight();
        expect(robot.f).toEqual(directions[(index + 1) % 4]);
        robot.rotateLeft();
        robot.rotateLeft();
        expect(robot.f).toEqual(directions[(index + 3) % 4]);
      },
    );
  });
});
