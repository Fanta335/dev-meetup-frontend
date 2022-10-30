const DEFAULT_VAL = false;

export const parsePreferDarkmode = (item: string) => {
  const result: unknown = JSON.parse(item);
  if (typeof result === 'boolean') {
    return result;
  } else {
    return DEFAULT_VAL;
  }
};
