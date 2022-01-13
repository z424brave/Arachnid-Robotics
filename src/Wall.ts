import { IBoundedSurface, IPosition } from "./ISurface";

export class Wall implements IBoundedSurface {

    constructor(public width: number = 100, public height: number = width) { }

    public isMoveValid(position: IPosition): boolean {
        const returnValue: boolean = (position.x >= 0)
            && (position.x <= this.width)
            && (position.y >= 0)
            && (position.y <= this.height);
        return returnValue;
    }
}
