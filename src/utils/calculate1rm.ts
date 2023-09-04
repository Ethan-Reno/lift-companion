export interface Calcutated1RMValues {
  epley1rm: number,
  brzycki1rm: number,
  wathan1rm: number,
}

export const calculate1rm = (weight: number, reps: number): Calcutated1RMValues => {
  const epley1rm = weight * (1 + 0.0333 * reps);
  const brzycki1rm = weight * (36 / (37 - reps));
  const wathan1rm = weight * (48.8 + 53.8 * Math.exp(-0.075 * reps));

  return {
    epley1rm,
    brzycki1rm,
    wathan1rm,
  };
};