# Toy Robot Simulator

This is a Toy Robot Simulator project written in TypeScript for the MrYum technical challenge.

## Personal Notes

Fun exercise, was nice to brush up on TS testing, especially for mutation testing. Appreciate the opportunity to work on this.

## Prerequisites

- Node.js
- npm

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/szymonbalasz/toy-robot-simulator.git
cd robot-simulator
npm install
```

## Usage

To run the application, use the following command:

```bash
npm start
```

This will start the Robot Simulator. You can interact with the robot using the following commands:

- PLACE X,Y,F - Places the robot on the table at position X,Y and facing F (NORTH, SOUTH, EAST, WEST).
- MOVE - Moves the robot one unit forward in the direction it is currently facing.
- LEFT - Rotates the robot 90 degrees to the left without changing the position of the robot.
- RIGHT - Rotates the robot 90 degrees to the right without changing the position of the robot.
- REPORT - Announces the X,Y and F of the robot.

You can also use the following commands to exit the application:

- EXIT - Exits the application.

All move commands can be placed into a newline separated .txt file and passed as an argument to the application. The application will then execute the commands from the file and print the final position of the robot.

```bash
npm start path/to/commands.txt`
```

E.g.

```bash
npm start move_01.txt
```

### Windows

To run the application on Windows and have it exit as expected, use the following command:

```powershell
npx ts-node src/index.ts
```

### Docker
To run in docker, use docker compose then exec into the container

```bash
docker-compose up -d
docker exec -it toy-robot-simulator-app bash
npm start
```

After exiting: `docker-compose down`

## Tests

### Unit tests

`npm test`

### Mutation tests

`npx stryker run`
