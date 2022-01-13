import { expect } from "chai";

import { IRobot } from "../src/IRobot";
import { IPosition } from "../src/ISurface";
import { RoboticSpiderMk2 } from "../src/RoboticSpiderMk2";
import { Wall } from "../src/Wall";

describe("RoboticSpiderMk2", () => {
  interface ITest {
    commandSequence: string;
    finalPosition: IPosition;
    startOrientation: string;
    startPosition: IPosition;
    height?: number;
    title: string;
    width?: number;
  }
  const tests: ITest[] = [
    {
      commandSequence: "FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF",
      finalPosition: {
        x: 0,
        y: 0,
      },
      startOrientation: "north",
      startPosition: {
        x: 0,
        y: 0,
      },
      title: "start at (0, 0) and move to (0, 0)",
    },
    {
      commandSequence: "FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF",
      finalPosition: {
        x: 3,
        y: 14,
      },
      startOrientation: "north",
      startPosition: {
        x: 3,
        y: 6,
      },
      title: "start at (3, 6) and move to (3, 14)",
    },
    {
      commandSequence: "RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR",
      finalPosition: {
        x: 0,
        y: 18,
      },
      startOrientation: "north",
      startPosition: {
        x: 0,
        y: 7,
      },
      title: "start at (0, 7) and move to (0, 18)",
    },
    {
      commandSequence: "XY",
      finalPosition: {
        x: 0,
        y: 7,
      },
      startOrientation: "north",
      startPosition: {
        x: 0,
        y: 7,
      },
      title: "not move from the start position if all commands are invalid",
    },
    {
      commandSequence: undefined,
      finalPosition: {
        x: 3,
        y: 8,
      },
      startOrientation: "north",
      startPosition: {
        x: 3,
        y: 8,
      },
      title: "not move from the start position if commands are undefined",
    },
  ];
  tests.forEach((test: ITest) => {
    it(`should ${test.title}`, () => {
      const robot: IRobot = new RoboticSpiderMk2({
        orientation: test.startOrientation,
        position: test.startPosition,
        surface: new Wall(test.height, test.width),
      });
      robot.execute(test.commandSequence);
      const result: IPosition = robot.getCurrentPosition();
      expect(result).eql(test.finalPosition);
    });
  });
});
