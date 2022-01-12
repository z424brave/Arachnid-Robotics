import { expect } from "chai";

import { IPosition, ISurface } from "../src/ISurface";
import { RoboticSpider } from "../src/RoboticSpider";
import { Wall } from "../src/Wall";

describe("RoboticSpider", () => {
  interface ITest {
    commandSequence: string;
    finalPosition: string;
    startOrientation: string;
    startPosition: IPosition;
    height?: number;
    title: string;
    width?: number;
  }
  const tests: ITest[] = [
    {
      commandSequence: "FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF",
      finalPosition: "(0, 0)",
      startOrientation: "north",
      startPosition: {
        x: 0,
        y: 0,
      },
      title: "start at (0, 0) and move to (0, 0)",
    },
    {
      commandSequence: "FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF",
      finalPosition: "(3, 14)",
      startOrientation: "north",
      startPosition: {
        x: 3,
        y: 6,
      },
      title: "start at (3, 6) and move to (3, 14)",
    },
    {
      commandSequence: "RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR",
      finalPosition: "(0, 18)",
      startOrientation: "north",
      startPosition: {
        x: 0,
        y: 7,
      },
      title: "start at (0, 7) and move to (0, 18)",
    },
    {
      commandSequence: "XY",
      finalPosition: "(0, 7)",
      startOrientation: "north",
      startPosition: {
        x: 0,
        y: 7,
      },
      title: "not move from the start position if all commands are invalid",
    },
    {
      commandSequence: undefined,
      finalPosition: "(3, 8)",
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
      const robot: RoboticSpider = new RoboticSpider({
        orientation: test.startOrientation,
        position: test.startPosition,
        surface: new Wall(test.height, test.width),
      });
      const result: string = robot.execute(test.commandSequence);
      expect(result).eql(test.finalPosition);
    });
  });
});
