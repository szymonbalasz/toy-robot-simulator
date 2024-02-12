import * as readline from 'readline';
import { Robot } from './robot';
import { checkRobotStateAndExecute, parseCommand } from './application';
import * as process from 'process';
import { readFile } from './helpers';

let robot: Robot = new Robot();

if (process.argv.length > 2) {
    const fileName = process.argv[2];
    readFile(fileName)
        .then((data) => {
            const lines = data.split('\n');
            lines.forEach((line) => {
                line = line.replace(/(\r\n|\n|\r)/gm, '');
                if (line === '') return;

                const command = parseCommand(line);
                checkRobotStateAndExecute(command, robot, null);
            });
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
} else {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.setPrompt('Enter command (or type "exit" to quit): ');
    rl.prompt();

    rl.on('line', (input) => {
        if (input.trim().toUpperCase() === 'EXIT') {
            console.log('Goodbye!');
            rl.close();
            return;
        }

        const command = parseCommand(input);
        checkRobotStateAndExecute(command, robot, rl);
    }).on('close', () => {
        process.exit(0);
    });
}
