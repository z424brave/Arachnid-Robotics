import { IDirection } from "./IDirection";
import { IRobot } from "./IRobot";
import { IRobotControl } from "./IRobotControl";
import { IPosition, ISurface } from "./ISurface";

export class RoboticSpiderMk3 implements IRobot {

    public version: string;

    private currentPosition: IPosition;
    private orientation: IDirection;
    private surface: ISurface;
    private commands: string[] = [];
    private validCommands: { [key: string]: () => void; } = {
        F: (() => {
           this.move();
        }),
        L: (() => {
            this.orient(this.orientation.left);
        }),
        R: (() => {
            this.orient(this.orientation.right);
        }),
    };

    private directions: { [key: string]: IDirection } = {
        east: {
            left: "north",
            moveX: 1,
            moveY: 0,
            name: "east",
            right: "south",
        },
        north: {
            left: "west",
            moveX: 0,
            moveY: 1,
            name: "north",
            right: "east",
        },
        south: {
            left: "east",
            moveX: 0,
            moveY: -1,
            name: "south",
            right: "west",
        },
        west: {
            left: "south",
            moveX: -1,
            moveY: 0,
            name: "west",
            right: "north",
        },
    };

    constructor(options: IRobotControl) {
        this.currentPosition = options.position;
        this.orientation = this.directions[options.orientation];
        this.surface = options.surface;
        this.version = options.version;
    }

    public move(): void {
        const newPosition: IPosition = {
            x: this.currentPosition.x + this.orientation.moveX,
            y: this.currentPosition.y + this.orientation.moveY,
        };
        if (this.surface.isMoveValid(newPosition)) {
            this.currentPosition = newPosition;
        }
    }

    public orient(newDirection: string): void {
        this.orientation = this.directions[newDirection];
    }

    public execute(commandSequence: string): string {
        this.commands = this.translateCommandSequence(commandSequence);
        this.commands.forEach((command: string) => {
            this.validCommands[command]();
        });
        return `(${this.currentPosition.x}, ${this.currentPosition.y})`;
    }

    private translateCommandSequence(commandSequence: string): string[] {
        const parsedCommandSequence: string[] = commandSequence ? [...commandSequence] : [];
        const filteredCommands: string[] = parsedCommandSequence.filter((command: string) => {
            return (Object.keys(this.validCommands)).includes(command);
        });
        return filteredCommands;
    }
}
