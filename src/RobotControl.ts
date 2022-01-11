import { IPosition, IRobotControl, RoboticSpider } from "./RoboticSpider";

export class RobotControl {

    private static defaultCoordValue: number = 0;

    private robot: RoboticSpider;
    private startPosition: IPosition = {
        x: RobotControl.defaultCoordValue,
        y: RobotControl.defaultCoordValue,
    };
    private commandSequence: string;

    constructor(commandString: string) {
        const parsedCommands: string[] = commandString ? commandString.split(",") : [];
        if (parsedCommands.length === 3) {
            this.startPosition.x = this.validateCoordinate(parsedCommands[0]);
            this.startPosition.y = this.validateCoordinate(parsedCommands[1]);
            this.commandSequence = parsedCommands[2];
        } else {
            this.startPosition.x = 0;
            this.startPosition.y = 0;
            this.commandSequence = "";
        }
        const robotControl: IRobotControl = {
            commandSequence: this.commandSequence,
            position: this.startPosition,

        };
        this.robot = new RoboticSpider(robotControl);
    }

    public executeCommands(): string {
        return this.robot.execute();
    }

    private validateCoordinate(coord: string): number {
        return isNaN(parseInt(coord, 10)) ? RobotControl.defaultCoordValue : parseInt(coord, 10);
    }
}
