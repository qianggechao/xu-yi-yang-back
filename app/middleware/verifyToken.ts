export default (secret) => {
  return async function verifyToken(ctx, next) {
    // 若是没有 token, 返回的是 null 字符串
    const { url = '', header } = ctx.request;

    const { token } = header || {};
    console.log('token:', token);

    // /public/xxx router not need verify token
    // TODO: need modified

    // /^\/public\//.test(url)
    try {
      if (/^\/public\//.test(url)) {
        await next();
      } else {
        if (token) {
          // 有 token 需要校验
          const { id } = (await ctx.app.jwt.verify(token, secret)) || {};

          const existUser = ctx.service.userService.findById(id);
          if (existUser) {
            await next();
          } else {
            ctx.body = {
              success: false,
              msg: 'have no right',
              status: 403,
            };
          }
        } else {
          // token 不存在
          ctx.body = {
            status: 403,
            desc: 'token不存在',
          };
        }
      }
    } catch (error) {
      console.error('error', error);

      ctx.body = {
        success: false,
        msg: 'Server error',
        status: 501,
      };
    }
  };
};
