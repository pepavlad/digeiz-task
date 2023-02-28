import { NumberOfStops } from "../interfaces/metrics.types";
import { Point } from "../interfaces/trajectories.types";

export const getNumberOfStops = (points: Point[]): number => {
  const { stopsNumber } = points.reduce<NumberOfStops>(
    (acc, point) => {
      if (acc.prevPoint?.x === point.x && acc.prevPoint?.y === point.y) {
        return {
          stopsNumber: acc.stopsNumber + 1,
          prevPoint: point,
        };
      }

      return { ...acc, prevPoint: point };
    },
    { stopsNumber: 0, prevPoint: null }
  );
  return stopsNumber;
};
