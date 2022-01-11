import { expect } from "chai";
import { IPosition, RoboticSpider } from "../src/RoboticSpider";

describe("RoboticSpider", () => {
  interface ITest {
    commandSequence: string;
    finalPosition: string;
    startPosition: IPosition;
    title: string;
  }
  const tests: ITest[] = [
    {
      commandSequence: "FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF",
      finalPosition: "(-1, 21)",
      startPosition: {
        x: 0,
        y: 0,
      },
      title: "start at (0, 0) and move to (-1, 21)",
    },
    {
      commandSequence: "FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF",
      finalPosition: "(4, 19)",
      startPosition: {
        x: 3,
        y: 6,
      },
      title: "start at (3, 6) and move to (4, 19)",
    },
    {
      commandSequence: "RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR",
      finalPosition: "(3, 15)",
      startPosition: {
        x: 0,
        y: 7,
      },
      title: "start at (0, 7) and move to (3, 15)",
    },
    {
      commandSequence: "XY",
      finalPosition: "(0, 7)",
      startPosition: {
        x: 0,
        y: 7,
      },
      title: "not move from the start position if all commands are invalid",
    },
    {
      commandSequence: undefined,
      finalPosition: "(3, 8)",
      startPosition: {
        x: 3,
        y: 8,
      },
      title: "not move from the start position if commands are undefined",
    },
  ];
  tests.forEach((test: any) => {
    it(`should ${test.title}`, () => {
      const robot: RoboticSpider = new RoboticSpider({
        commandSequence: test.commandSequence,
        position: test.startPosition,
      });
      const result: string = robot.execute();
      expect(result).eql(test.finalPosition);
    });
  });
});
