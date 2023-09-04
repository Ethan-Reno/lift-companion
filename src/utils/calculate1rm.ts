export const calculateEpely1rm = (weight: number, reps: number): number => {
  return Math.round(weight * (1 + 0.0333 * reps));
};

export const calculateBrzycki1rm = (weight: number, reps: number): number => {
  return Math.round(weight * (36 / (37 - reps)));
};

export const calculateWathen1rm = (weight: number, reps: number): number => {
  return Math.round(weight * 100) / (48.8 + 53.8 * Math.exp(-0.075 * reps));
};

export interface Calcutated1RMValues {
  epley1rm: number,
  brzycki1rm: number,
  wathen1rm: number,
}

export const calculateAll1rm = (weight: number, reps: number): Calcutated1RMValues => {
  return {
    epley1rm: calculateEpely1rm(weight, reps),
    brzycki1rm: calculateBrzycki1rm(weight, reps),
    wathen1rm: calculateWathen1rm(weight, reps),
  };
};