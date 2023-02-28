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
      const user = token
        ? ((ctx.app.jwt.verify(token as string, ctx.app.config.jwt.secret) ||
            {}) as Record<string, any>)
        : {};

      const existUser = await ctx.service.userService.findById(user?.id);

      if (/^\/public\//.test(url)) {
        return await next();
      }

      if (/^\/admin\//.test(url)) {
        if (!existUser || !token) {
          return ctx.throw(403, 'token 不存在');
        }

        if (!['admin', 'superAdmin'].includes(existUser?.type)) {
          return ctx.throw(403, 'You not the administrator');
        }

        return await next();
      }

      if (!existUser) {
        return ctx.throw(401, '未登陆');
      }

      return await next();
    } catch (error: any) {
      ctx.body = getErrorInfo(error);
    }
  };
};
