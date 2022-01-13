export interface IPosition {
  x: number;
  y: number;
}
export interface ISurface {
  isMoveValid(position: IPosition): boolean;
}
export interface IBoundedSurface extends ISurface {
  height: number;
  width: number;
}
