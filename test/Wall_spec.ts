import { expect } from "chai";
import { IPosition } from "../src/ISurface";

import { Wall } from "../src/Wall";

describe("Wall", () => {
    interface ITest {
        height?: number;
        moveValid: boolean;
        newPosition: IPosition;
        title: string;
        width?: number;
      }
    const tests: ITest[] = [
        {   height: 10,
            moveValid: false,
            newPosition: {
                x: 5,
                y: 11,
            },
            title: "not allow a move beyond y limit",
            width: 10,
        },
        {   height: 10,
            moveValid: false,
            newPosition: {
                x: 12,
                y: 6,
            },
            title: "not allow a move beyond x limit",
            width: 10,
        },
        {   height: 10,
            moveValid: true,
            newPosition: {
                x: 3,
                y: 7,
            },
            title: "allow a move when within x and y limits",
            width: 10,
        },
        {   height: 10,
            moveValid: true,
            newPosition: {
                x: 10,
                y: 10,
            },
            title: "allow a move when on the x and y limits",
            width: 10,
        },
    ];

    tests.forEach((test: ITest) => {
        it(`should ${test.title}`, () => {
            const wall: Wall = new Wall(test.height, test.width);
            const result: boolean = wall.isMoveValid(test.newPosition);
            expect(result).eql(test.moveValid);
        });
    });
});
