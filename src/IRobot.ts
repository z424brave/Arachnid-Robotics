import { IPosition } from "./ISurface";

export interface IRobot {
    execute(commands: string): void;
    getCurrentPosition(): IPosition;
}
