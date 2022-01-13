import { IDirection } from "./IDirection";
import { IRobot } from "./IRobot";
import { IRobotControl } from "./IRobotControl";
import { IPosition, ISurface } from "./ISurface";

export class RoboticSpiderMk3 implements IRobot {

    public static version: string = "Mk3";
    public static FuelCapacity: number = 30;

    public version: string;

    private currentPosition: IPosition;
    private fuelTankLoad: number;
    private orientation: IDirection;
    private surface: ISurface;
    private commands: string[] = [];

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
        this.fuelTankLoad = RoboticSpiderMk3.FuelCapacity;
    }

    public execute(commandSequence: string): void {
        this.commands = this.translateCommandSequence(commandSequence || "");
        this.commands.forEach((command: string) => {
            switch (command) {
                case "F":
                    this.move(1);
                    break;
                case command.match(/[2345][F]/)?.input:
                    const parts: string[] = command.match(/[2345][F]/);
                    this.move(parseInt(parts[0], 10));
                    break;
                case "L":
                    this.orient(this.orientation.left);
                    break;
                case "R":
                    this.orient(this.orientation.right);
                    break;
                default:
                    break;
            }
        });
    }

    public getCurrentPosition(): IPosition {
        return this.currentPosition;
    }

    private move(moves: number): void {
        if ((moves > 1) && (this.fuelTankLoad - moves) >= 0) {
            this.fuelTankLoad = this.fuelTankLoad - moves;
        } else {
            moves = 1;
        }
        const newPosition: IPosition = {
            x: this.currentPosition.x + this.orientation.moveX * moves,
            y: this.currentPosition.y + this.orientation.moveY * moves,
        };
        if (this.surface.isMoveValid(newPosition)) {
            this.currentPosition = newPosition;
        }
    }

    private orient(newDirection: string): void {
        this.orientation = this.directions[newDirection];
    }

    private translateCommandSequence(commandSequence: string): string[] {
        const filteredCommands: string[] = commandSequence.match(/[2345][F]|[FLR]/g) || [];
        return filteredCommands;
    }
}
