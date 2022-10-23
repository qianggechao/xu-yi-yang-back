export default (secret) => {
  return async function verifyToken(ctx, next) {
    // 若是没有 token, 返回的是 null 字符串
    const { url = '', header } = ctx.request;

    const { authorization: token } = header;
    console.log('ctx.request: ', ctx.request);

    // /public/xxx router not need verify token
    // TODO: need modified
    try {
      if (/^\/public\//.test(url)) {
        await next();
      } else {
        if (token) {
          // 有 token 需要校验
          let decode = ctx.app.jwt.verify(token, secret);
          console.log('token 需要校验', decode);

          await next();
        } else {
          // token 不存在
          await next();
          // ctx.status = 200;
          // ctx.body = {
          //   status: 401,
          //   desc: 'token不存在',
          // };
        }
      }
    } catch (error) {
      console.log('error', error);
      ctx.status = 200;

      ctx.body = {
        success: false,
        error,
      };
    }
  };
};
