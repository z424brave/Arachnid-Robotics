import { IRobot } from "./IRobot";
import { IRobotControl } from "./IRobotControl";
import { IPosition } from "./ISurface";

export class RoboticSpiderMk1 implements IRobot {

    public static version: string = "Mk1";

    private currentPosition: IPosition;
    private commands: string[] = [];
    private validCommands: any = {
        B: (() => {
            --this.currentPosition.y;
        }),
        F: (() => {
            ++this.currentPosition.y;
        }),
        L: (() => {
            --this.currentPosition.x;
        }),
        R: (() => {
            ++this.currentPosition.x;
        }),
    };

    constructor(options: IRobotControl) {
        this.currentPosition = options.position;
    }

    public execute(commandSequence: string): void {
        this.commands = this.translateCommandSequence(commandSequence);
        this.commands.forEach((command: string) => {
            this.validCommands[command]();
        });
    }

    public getCurrentPosition(): IPosition {
        return this.currentPosition;
    }

    private translateCommandSequence(commandSequence: string): string[] {
        const parsedCommandSequence: string[] = commandSequence ? [...commandSequence] : [];
        const filteredCommands: string[] = parsedCommandSequence.filter((command: string) => {
            return (Object.keys(this.validCommands)).includes(command);
        });
        return filteredCommands;
    }
}
