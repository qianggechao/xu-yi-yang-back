import { Context } from 'egg';
import getErrorInfo from '../utils/getErrorInfo';
import filterEmptyObject from '../utils/filterEmptyObject';

export default () => {
  return async function verifyToken(ctx: Context, next: any) {
    // 若是没有 token, 返回的是 null 字符串
    const { url = '', headers, header, body, query } = ctx.request;
    const { token } = headers || header || {};

    // /public/xxx router not need verify token
    // TODO: need modified

    ctx.request.body = filterEmptyObject(body);
    ctx.request.query = filterEmptyObject(query);

    try {
      if (/^\/public\//.test(url)) {
        await next();
      } else {
        if (token) {
          // 有 token 需要校验
          const { id } = ((await ctx.app.jwt.verify(
            token as string,
            ctx.app.config.jwt.secret,
          )) || {}) as Record<string, any>;

          const existUser = await ctx.service.userService.findById(id);
          ctx.state.user = existUser ?? {};

          if (/^\/admin\//.test(url)) {
            if (
              existUser?.type === 'admin' ||
              existUser?.type === 'superAdmin'
            ) {
              await next();
            } else {
              ctx.body = {
                success: false,
                msg: 'You not the administrator',
                status: 403,
              };
            }
          } else {
            if (existUser) {
              await next();
            } else {
              ctx.body = {
                success: false,
                msg: 'have no right',
                status: 403,
              };
            }
          }
        } else {
          // token 不存在
          ctx.body = {
            status: 403,
            msg: 'token不存在',
          };
        }
      }
    } catch (error: any) {
      console.error('error', error);

      ctx.body = getErrorInfo(error);
    }
  };
};
