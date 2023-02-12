export const validateTown = (town: string) => {
  if (town.length < 15 || !town.length) return true;
  return false;
}
