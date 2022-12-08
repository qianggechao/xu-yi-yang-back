export default (keys: string[], object: Record<string, any>) => {
  for (const key in object) {
    if (keys.includes(key)) {
      delete object[key];
    }
  }

  return object;
};
