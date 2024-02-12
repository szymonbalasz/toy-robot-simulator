import { Robot } from '../src/robot';
import { checkRobotStateAndExecute, executeCommand, parseCommand } from '../src/application';
import { Direction } from '../src/enums';

jest.mock('readline');
jest.mock('../src/robot');

describe('handleCommand', () => {
    let mockRobot: jest.Mocked<Robot>;

    beforeEach(() => {
        mockRobot = new Robot() as jest.Mocked<Robot>;
    });

    it('places the robot correctly when PLACE command is valid', () => {
        executeCommand('PLACE', ['PLACE', '1,2,NORTH'], mockRobot);
        expect(mockRobot.place).toHaveBeenCalledWith(1, 2, Direction.NORTH);
    });

    it('does not place the robot when PLACE command is invalid', () => {
        executeCommand('PLACE', ['PLACE', 'invalid'], mockRobot);
        expect(mockRobot.place).not.toHaveBeenCalled();
    });

    it('moves the robot when MOVE command is issued', () => {
        executeCommand('MOVE', ['MOVE'], mockRobot);
        expect(mockRobot.move).toHaveBeenCalled();
    });

    it('rotates the robot left when LEFT command is issued', () => {
        executeCommand('LEFT', ['LEFT'], mockRobot);
        expect(mockRobot.rotateLeft).toHaveBeenCalled();
    });

    it('rotates the robot right when RIGHT command is issued', () => {
        executeCommand('RIGHT', ['RIGHT'], mockRobot);
        expect(mockRobot.rotateRight).toHaveBeenCalled();
    });

    it('reports the robot position when REPORT command is issued', () => {
        executeCommand('REPORT', ['REPORT'], mockRobot);
        expect(mockRobot.report).toHaveBeenCalled();
    });

    it('does not execute any command when an invalid command is issued', () => {
        executeCommand('INVALID', ['INVALID'], mockRobot);
        expect(mockRobot.place).not.toHaveBeenCalled();
        expect(mockRobot.move).not.toHaveBeenCalled();
        expect(mockRobot.rotateLeft).not.toHaveBeenCalled();
        expect(mockRobot.rotateRight).not.toHaveBeenCalled();
        expect(mockRobot.report).not.toHaveBeenCalled();
    });
});

describe('parseCommand', () => {
    it('parses the command and arguments correctly', () => {
        const { command, args } = parseCommand('PLACE 1,2,NORTH');
        expect(command).toEqual('PLACE');
        expect(args).toEqual(['PLACE', '1,2,NORTH']);
    });

    it('returns an empty array when there are no arguments', () => {
        const { command, args } = parseCommand('MOVE');
        expect(command).toEqual('MOVE');
        expect(args).toEqual(['MOVE']);
    });

    it('converts the command to uppercase', () => {
        const { command } = parseCommand('move');
        expect(command).toEqual('MOVE');
    });
});

describe('checkRobotStateAndExecute', () => {
    let mockRobot: jest.Mocked<Robot>;

    beforeEach(() => {
        mockRobot = new Robot() as jest.Mocked<Robot>;
    });

    it('executes the command when the robot is placed', () => {
        mockRobot.isPlaced.mockReturnValue(true);
        checkRobotStateAndExecute({ command: 'MOVE', args: ['MOVE'] }, mockRobot, null);
        expect(mockRobot.move).toHaveBeenCalled();
    });

    it('does not execute the command when the robot is not placed', () => {
        mockRobot.isPlaced.mockReturnValue(false);
        checkRobotStateAndExecute({ command: 'MOVE', args: ['MOVE'] }, mockRobot, null);
        expect(mockRobot.move).not.toHaveBeenCalled();
    });

    it('places the robot when the PLACE command is issued and the robot is not placed', () => {
        mockRobot.isPlaced.mockReturnValue(false);
        checkRobotStateAndExecute({ command: 'PLACE', args: ['PLACE', '1,2,NORTH'] }, mockRobot, null);
        expect(mockRobot.place).toHaveBeenCalledWith(1, 2, Direction.NORTH);
    });
});
