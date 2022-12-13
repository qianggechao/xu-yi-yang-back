export default (object: Record<string, any>) => {
  for (const key in object) {
    if (object[key] === '') {
      delete object[key];
    }
  }

  return object;
};
