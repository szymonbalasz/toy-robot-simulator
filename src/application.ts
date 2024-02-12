import { Robot } from './robot';
import { COMMANDS, getDirection, isValidPlaceCommand } from './helpers';
import { Direction } from './enums';
import readline from 'readline';

export function parseCommand(input: string): {
  command: string;
  args: string[];
} {
  const args: string[] = input.split(' ');
  const command: string = args[0].toUpperCase();
  return { command, args };
}

export function checkRobotStateAndExecute(
  {
    command,
    args,
  }: {
    command: string;
    args: string[];
  },
  robot: Robot,
  rl: readline.Interface | null,
) {
  if (!robot.isPlaced() && command !== COMMANDS.PLACE) {
    console.log(
      'Robot is not placed yet. Please use the PLACE command to place the robot on the grid.',
    );
    if (rl) rl.prompt();
    return;
  }

  executeCommand(command, args, robot);

  if (rl) rl.prompt();
}

export function executeCommand(command: string, args: string[], robot: Robot) {
  switch (command) {
    case COMMANDS.PLACE:
      if (args.length === 2 && isValidPlaceCommand(args[1])) {
        const [x, y, f] = args[1].split(',');
        const direction = getDirection(f);
        robot.place(parseInt(x, 10), parseInt(y, 10), <Direction>direction);
      }
      break;
    case COMMANDS.MOVE:
      robot.move();
      break;
    case COMMANDS.LEFT:
      robot.rotateLeft();
      break;
    case COMMANDS.RIGHT:
      robot.rotateRight();
      break;
    case COMMANDS.REPORT:
      robot.report();
      break;
    default:
      console.log('Invalid command.');
  }
}
