import { Robot } from './robot';
import { Direction } from './enums';
import fs from 'fs';

export const COMMANDS = {
  PLACE: 'PLACE',
  MOVE: 'MOVE',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  REPORT: 'REPORT',
};

/**
 *
 * @param args
 */
/**
 * This function checks if the provided command string is a valid place command.
 * A valid place command is a string that can be split into three parts by a comma.
 * The first two parts must be numbers that are within the grid size of the Robot.
 * The third part must be a valid direction in the Direction enum.
 *
 * @param args - The command string to validate.
 * @returns true if the command string is valid, false otherwise.
 */
export function isValidPlaceCommand(args: string): boolean {
  const parts = args.split(',');
  if (parts.length !== 3) return false;

  const x = Number(parts[0]);
  const y = Number(parts[1]);

  // If either part is not a number, or if they are not integers, or if they are not within the grid size of the Robot, the command string is invalid
  if (
    isNaN(x) ||
    isNaN(y) ||
    !Number.isInteger(x) ||
    !Number.isInteger(y) ||
    x < 0 ||
    x >= Robot.gridSize ||
    y < 0 ||
    y >= Robot.gridSize
  )
    return false;

  // The third part of the command string must be a valid direction in the Direction enum
  const f = parts[2].toUpperCase().trim();
  const validDirections = Object.keys(Direction).filter((k) =>
    isNaN(Number(k)),
  );

  if (!validDirections.includes(f)) return false;

  return true;
}

/**
 * This function converts a string to a Direction enum value.
 *
 * @param direction - The string to convert to a Direction enum value.
 * @returns The Direction enum value that corresponds to the provided string.
 */
export function getDirection(
  direction: string | null | undefined,
): Direction | undefined {
  if (!direction) return undefined;
  if (!isNaN(Number(direction))) return undefined;

  return (Direction as never)[direction.toUpperCase()];
}

/**
 * This function reads the contents of a file and returns it as a string.
 * @param fileName
 */
export async function readFile(fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading file ${fileName}: ${err}`);
      } else {
        resolve(data);
      }
    });
  });
}
