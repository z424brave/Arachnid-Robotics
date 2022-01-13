import { IPosition, ISurface } from "./ISurface";

export interface IRobotControl {
    position: IPosition;
    orientation: string;
    surface: ISurface;
    version: string;
}
