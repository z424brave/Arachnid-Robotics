import { IPosition } from "./ISurface";

export interface IRobot {
    version: string;

    execute(commands: string): string;
    move(): void;
    orient(direction: string): void;
}
