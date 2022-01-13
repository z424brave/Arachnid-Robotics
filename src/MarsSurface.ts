import { IPosition, ISurface } from "./ISurface";

export class MarsSurface implements ISurface {

    public isMoveValid(position: IPosition): boolean {
        return true;
    }
}
