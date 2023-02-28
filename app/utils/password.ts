import crypto from 'crypto';

export const encryptPassword = (password: string) => {
  const md5 = crypto.createHash('md5');
  md5.update(String(password));

  if (!process.env?.SECRET_KEY) {
    throw new Error('unfound SECRET_KEY');
  }

  md5.update(process.env.SECRET_KEY);

  return md5.digest('hex');
};
