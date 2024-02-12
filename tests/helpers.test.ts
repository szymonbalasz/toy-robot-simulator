import { getDirection, isValidPlaceCommand } from '../src/helpers';
import { Direction } from '../src/enums';

describe('isValidPlaceCommand', () => {
  test.each([
    ['0,0,NORTH', true],
    ['0,0,EAST', true],
    ['5,5,NORTH', false],
    ['1,2,SOUTH', true],
    ['1,2,LEFT', false],
  ])('isValidPlaceCommand("%s") should return %s', (input, expected) => {
    expect(isValidPlaceCommand(input)).toBe(expected);
  });
});

describe('getDirection', () => {
  test.each([
    ['NORTH', Direction.NORTH],
    ['SOUTH', Direction.SOUTH],
    ['EAST', Direction.EAST],
    ['WEST', Direction.WEST],
    ['north', Direction.NORTH],
    ['south', Direction.SOUTH],
    ['east', Direction.EAST],
    ['west', Direction.WEST],
    ['INVALID', undefined],
    ['', undefined],
    [null, undefined],
    [undefined, undefined],
  ])('getDirection("%s") should return %s', (input, expected) => {
    expect(getDirection(input)).toBe(expected);
  });
});

describe('isValidPlaceCommand Boundary and Invalid Inputs', () => {
  test.each([
    ['4,4,NORTH', true],
    ['-1,0,EAST', false],
    ['0,-1,WEST', false],
    ['5,0,SOUTH', false],
    ['0,5,NORTH', false],
    ['0.5,0,NORTH', false],
    ['0,0.5,SOUTH', false],
    ['0,0,NOTADIRECTION', false],
    ['0,0,', false],
    [',,', false],
    ['NORTH,0,0', false],
  ])('isValidPlaceCommand("%s") should return %s', (input, expected) => {
    expect(isValidPlaceCommand(input)).toBe(expected);
  });
});

describe('getDirection Edge Cases', () => {
  test.each([
    ['north', Direction.NORTH],
    ['SOUTH', Direction.SOUTH],
    ['East', Direction.EAST],
    ['wEsT', Direction.WEST],
    ['INVALID', undefined],
    ['', undefined],
    [null, undefined],
    [undefined, undefined],
    ['0', undefined],
    ['NORTHEAST', undefined],
  ])('getDirection("%s") should return %s', (input, expected) => {
    expect(getDirection(input)).toBe(expected);
  });
});
