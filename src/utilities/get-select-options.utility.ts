import { Trajectories } from "../interfaces/trajectories.types";

export const getSelectOptions = (trajectories: Trajectories[]) => {
  return trajectories.reduce<{ value: string; label: string }[]>((acc, curr, index) => {
    return [...acc, { value: curr.id, label: `Plane #${index + 1}` }];
  }, []);
};
