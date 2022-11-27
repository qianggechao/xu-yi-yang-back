export default (kyes: string[], object: Record<string, any>) => {
  for (const key in object) {
    if (kyes.includes(key)) {
      delete object[key];
    }
  }

  return object;
};
