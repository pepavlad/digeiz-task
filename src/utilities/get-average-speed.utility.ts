import { AverageSpeed } from "../interfaces/metrics.types";
import { Point } from "../interfaces/trajectories.types";

export const getAverageSpeed = (points: Point[]): string => {
  const totalTime = points[points.length - 1].time - points[0].time;

  const { totalDistance } = points.reduce<AverageSpeed>(
    (acc, point) => {
      if (acc.prevPoint) {
        const dx = point.x - acc.prevPoint.x;
        const dy = point.y - acc.prevPoint.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        return {
          totalDistance: acc.totalDistance + distance,
          prevPoint: point,
        };
      }
      return { ...acc, prevPoint: point };
    },
    { totalDistance: 0, prevPoint: null }
  );

  const averageSpeed = (totalDistance / totalTime).toFixed(4);
  return averageSpeed;
};
