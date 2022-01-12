import { IPosition, ISurface } from "./ISurface";
import { IRobotControl, RoboticSpider } from "./RoboticSpider";
export class RobotControl {

    private static defaultCoordValue: number = 0;
    private validDirections: string[] = ["east", "north", "south", "west"];

    private robot: RoboticSpider;
    private startPosition: IPosition = {
        x: RobotControl.defaultCoordValue,
        y: RobotControl.defaultCoordValue,
    };
    private startOrientation: string;
    private surface: ISurface;

    private commandSequence: string;

    constructor(commandString: string, surface: ISurface) {
        const parsedCommands: string[] = commandString ? commandString.split(",") : [];
        if (parsedCommands.length === 4) {
            this.startPosition.x = this.validateCoordinate(parsedCommands[0]);
            this.startPosition.y = this.validateCoordinate(parsedCommands[1]);
            this.startOrientation = this.validateOrientation(parsedCommands[2]);
            this.commandSequence = parsedCommands[3];
        } else {
            this.startPosition.x = 0;
            this.startPosition.y = 0;
            this.startOrientation = "north";
            this.commandSequence = "";
        }
        this.surface = surface;
        const robotControl: IRobotControl = {
            orientation: this.startOrientation,
            position: this.startPosition,
            surface: this.surface,
        };
        this.robot = new RoboticSpider(robotControl);
    }

    public executeCommands(): string {
        return this.robot.execute(this.commandSequence);
    }

    private validateCoordinate(coord: string): number {
        return isNaN(parseInt(coord, 10)) ? RobotControl.defaultCoordValue : parseInt(coord, 10);
    }

    private validateOrientation(direction: string): string {
        return this.validDirections.includes(direction) ? direction : "north";
    }
}
