import { IPosition, ISurface } from "./ISurface";

export class Ground implements ISurface {

    public isMoveValid(position: IPosition): boolean {
        return true;
    }
}
