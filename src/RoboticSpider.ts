export interface IPosition {
    x: number;
    y: number;
}

export interface IRobotControl {
    position: IPosition;
    commandSequence: string;
}
export class RoboticSpider {

    private currentPosition: IPosition;
    private commands: string[] = [];
    private validCommands: { [key: string]: () => void; } = {
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
        this.commands = this.translateCommandSequence(options.commandSequence);
    }

    public execute(): string {
        this.commands.forEach((command: string) => {
            this.validCommands[command]();
        });
        return this.formatPosition(this.currentPosition);
    }

    private formatPosition(position: IPosition): string {
        return `(${position.x}, ${position.y})`;
    }

    private translateCommandSequence(commandSequence: string): string[] {
        const parsedCommandSequence: string[] = commandSequence ? [...commandSequence] : [];
        const filteredCommands: string[] = parsedCommandSequence.filter((command: string) => {
            return Object.keys(this.validCommands).includes(command);
        });
        return filteredCommands;
    }
}
