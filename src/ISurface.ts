export interface IPosition {
  x: number;
  y: number;
}

export interface ISurface {
  height: number;
  width: number;
  isMoveValid(position: IPosition): boolean;
}
