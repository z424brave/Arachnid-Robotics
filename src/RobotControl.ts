import { IRobot } from "./IRobot";
import { IRobotControl } from "./IRobotControl";
import { IPosition, ISurface } from "./ISurface";
import { RoboticSpiderMk1 } from "./RoboticSpiderMk1";
import { RoboticSpiderMk2 } from "./RoboticSpiderMk2";
import { RoboticSpiderMk3 } from "./RoboticSpiderMk3";
export class RobotControl {

    private static defaultCoordValue: number = 0;
    private validDirections: string[] = ["east", "north", "south", "west"];

    private robot: IRobot;
    private startPosition: IPosition = {
        x: RobotControl.defaultCoordValue,
        y: RobotControl.defaultCoordValue,
    };
    private startOrientation: string;
    private surface: ISurface;

    private commandSequence: string;

    constructor(commandString: string, version: string = "Mk1", surface?: ISurface) {
        const parsedCommands: string[] = commandString ? commandString.split(",") : [];
        switch (version) {
            case "Mk1":
                if (parsedCommands.length === 3) {
                    this.startPosition.x = this.validateCoordinate(parsedCommands[0]);
                    this.startPosition.y = this.validateCoordinate(parsedCommands[1]);
                    this.commandSequence = parsedCommands[2];
                    this.startOrientation = "north";
                } else {
                    this.startPosition.x = 0;
                    this.startPosition.y = 0;
                    this.commandSequence = "";
                    this.startOrientation = "north";
                }
                break;
            default:
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
                break;
        }
        this.surface = surface;
        const robotControl: IRobotControl = {
            orientation: this.startOrientation,
            position: this.startPosition,
            surface: this.surface,
        };
        this.robot = this.getRobotInstance(version, robotControl);
    }

    public executeCommands(): string {
        this.robot.execute(this.commandSequence);
        const finalPosition: IPosition = this.robot.getCurrentPosition();
        return `(${finalPosition.x}, ${finalPosition.y})`;
    }

    private validateCoordinate(coord: string): number {
        return isNaN(parseInt(coord, 10)) ? RobotControl.defaultCoordValue : parseInt(coord, 10);
    }

    private validateOrientation(direction: string): string {
        return this.validDirections.includes(direction) ? direction : "north";
    }

    private getRobotInstance(version: string, robotControl: IRobotControl): IRobot {
        let instance: IRobot;
        switch (version) {
            case "Mk1":
                instance = new RoboticSpiderMk1(robotControl);
                break;
            case "Mk2":
                instance = new RoboticSpiderMk2(robotControl);
                break;
            case "Mk3":
                instance = new RoboticSpiderMk3(robotControl);
                break;
            default:
                instance = new RoboticSpiderMk1(robotControl);
                break;
        }
        return instance;
    }
}
