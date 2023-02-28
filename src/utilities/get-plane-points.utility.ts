import { Point, Trajectories } from "../interfaces/trajectories.types";

export const getFilteredPlanePointsById = (selectedId: string, trajectories: Trajectories[]): Point[] => {
  return trajectories.find(({ id }) => id === selectedId)?.points.sort((a, b) => a.time - b.time) || [];
};
