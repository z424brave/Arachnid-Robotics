import { expect } from "chai";

import { Ground } from "../src/Ground";
import { IPosition } from "../src/ISurface";
import { RoboticSpiderMk1 } from "../src/RoboticSpiderMk1";

describe("RoboticSpiderMk1", () => {
  interface ITest {
    commandSequence: string;
    finalPosition: IPosition;
    startPosition: IPosition;
    title: string;
  }
  const tests: ITest[] = [
    {
      commandSequence: "FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF",
      finalPosition: {
        x: -1,
        y: 21,
      },
      startPosition: {
        x: 0,
        y: 0,
      },
      title: "start at (0, 0) and move to (-1, 21)",
    },
    {
      commandSequence: "FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF",
      finalPosition: {
        x: 4,
        y: 19,
      },
      startPosition: {
        x: 3,
        y: 6,
      },
      title: "start at (3, 6) and move to (4, 19)",
    },
    {
      commandSequence: "RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR",
      finalPosition: {
        x: 3,
        y: 15,
      },
      startPosition: {
        x: 0,
        y: 7,
      },
      title: "start at (0, 7) and move to (3, 15)",
    },
    {
      commandSequence: "XY",
      finalPosition: {
        x: 0,
        y: 7,
      },
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
      startPosition: {
        x: 3,
        y: 8,
      },
      title: "not move from the start position if commands are undefined",
    },
  ];
  tests.forEach((test: ITest) => {
    it(`should ${test.title}`, () => {
      const robot: RoboticSpiderMk1 = new RoboticSpiderMk1({
        position: test.startPosition,
        surface: new Ground(),
      });
      robot.execute(test.commandSequence);
      const finalPosition: IPosition = robot.getCurrentPosition();
      expect(finalPosition).eql(test.finalPosition);
    });
  });
});
