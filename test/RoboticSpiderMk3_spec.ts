import { expect } from "chai";

import { IRobot } from "../src/IRobot";
import { IPosition } from "../src/ISurface";
import { MarsSurface } from "../src/MarsSurface";
import { RoboticSpiderMk3 } from "../src/RoboticSpiderMk3";

describe("RoboticSpiderMk3", () => {
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
      commandSequence: "FFRFRF",
      finalPosition: {
        x: 1,
        y: 1,
      },
      startOrientation: "north",
      startPosition: {
        x: 0,
        y: 0,
      },
      title: "start at (0, 0) and move to (1, -1)",
    },
    {
      commandSequence: "FFRRRL",
      finalPosition: {
        x: 3,
        y: 8,
      },
      startOrientation: "north",
      startPosition: {
        x: 3,
        y: 6,
      },
      title: "start at (3, 6) and move to (3, 8)",
    },
    {
      commandSequence: "RFFLFF",
      finalPosition: {
        x: 2,
        y: 9,
      },
      startOrientation: "north",
      startPosition: {
        x: 0,
        y: 7,
      },
      title: "start at (0, 7) and move to (2, 9)",
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
      const robot: IRobot = new RoboticSpiderMk3({
        orientation: test.startOrientation,
        position: test.startPosition,
        surface: new MarsSurface(),
      });
      robot.execute(test.commandSequence);
      const result: IPosition = robot.getCurrentPosition();
      expect(result).eql(test.finalPosition);
    });
  });
});
