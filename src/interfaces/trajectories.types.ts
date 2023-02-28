export interface Point {
  x: number;
  y: number;
  time: number;
}

export interface Trajectories {
  id: string;
  points: Point[];
}
