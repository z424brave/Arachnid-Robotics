import { expect } from "chai";

import { RobotControl } from "../src/RobotControl";
import { Wall } from "../src/Wall";

describe("RobotControl", () => {
    interface ITest {
        command: string;
        finalPosition: string;
        height?: number;
        title: string;
        width?: number;
      }
    const tests: ITest[] = [
        {
            command: "0,0,north,FRFRFRF",
            finalPosition: "(0, 0)",
            title: "start at (0, 0) and move to (0, 0)",
        },
        {
            command: "5,5,east,FLFFF",
            finalPosition: "(6, 8)",
            title: "start at (5, 5) and move to (6, 8)",
        },
        {
            command: "0,7,north,FFFRFFFLF",
            finalPosition: "(3, 11)",
            title: "start at (0, 7) and move to (3, 11)",
        },
        {
            command: "0,0,north,FFFRFFFLF",
            finalPosition: "(3, 4)",
            height: 5,
            title: "start at (0, 0) and move to (3, 4)",
            width: 5,
        },
        {
            command: "0,0,north,FFFRRFFFLF",
            finalPosition: "(1, 0)",
            title: "start at (0, 0) and move to (1, 0)",
        },
        {
            command: "0,0,north,FFFFFFFFFF",
            finalPosition: "(0, 5)",
            height: 5,
            title: "start at (0, 0) and move to (0, 5)",
            width: 5,
        },
        {
            command: "0,5",
            finalPosition: "(0, 0)",
            title: "not move if command does not have 4 valid parts",
        },
        {
            command: "abc",
            finalPosition: "(0, 0)",
            title: "not move if command does not have 4 valid parts",
        },
        {
            command: "a,b,c,d",
            finalPosition: "(0, 0)",
            title: "not move if command does not have numeric coordinates",
        },
        {
            command: undefined,
            finalPosition: "(0, 0)",
            title: "not move if command is undefined",
        },
    ];
    tests.forEach((test: ITest) => {
        it(`should ${test.title}`, () => {
            const robotControl: RobotControl = new RobotControl(
                test.command,
                new Wall(test.height, test.width),
            );
            const result: string = robotControl.executeCommands();
            expect(result).eql(test.finalPosition);
        });
    });
});
