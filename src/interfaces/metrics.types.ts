export interface AverageSpeed {
  totalDistance: number;
  prevPoint: { x: number; y: number; time: number } | null;
}

export interface NumberOfStops {
  stopsNumber: number;
  prevPoint: { x: number; y: number; time: number } | null;
}
