import { expect } from "chai";

import { RobotControl } from "../src/RobotControl";

describe("RobotControl", () => {
    const tests: any[] = [
        {
            command: "0,0,FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF",
            finalPosition: "(-1, 21)",
            title: "start at (0, 0) and move to (-1, 21)",
        },
        {
            command: "3,6,FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF",
            finalPosition: "(4, 19)",
            title: "start at (3, 6) and move to (4, 19)",
        },
        {
            command: "0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR",
            finalPosition: "(3, 15)",
            title: "start at (0, 7) and move to (3, 15)",
        },
        {
            command: "0,5",
            finalPosition: "(0, 0)",
            title: "not move if command does not have 3 valid parts",
        },
        {
            command: "abc",
            finalPosition: "(0, 0)",
            title: "not move if command does not have 3 valid parts",
        },
        {
            command: "a,b,c",
            finalPosition: "(0, 0)",
            title: "not move if command does not have numeric coordinates",
        },
        {
            command: undefined,
            finalPosition: "(0, 0)",
            title: "not move if command is undefined",
        },
    ];
    tests.forEach((test: any) => {
        it(`should ${test.title}`, () => {
            const robotControl: RobotControl = new RobotControl(test.command);
            const result: string = robotControl.executeCommands();
            expect(result).eql(test.finalPosition);
        });
    });
});
