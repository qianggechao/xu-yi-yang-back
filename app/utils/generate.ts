import crypto from 'crypto';

export const generateCaptcha = (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

export const generateNumber = (length: number) => {
  return Math.random().toFixed(length).slice(-length);
};
