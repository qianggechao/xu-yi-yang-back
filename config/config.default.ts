import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGO_USERNAME);
export default (appInfo: EggAppInfo) => {
  if (!process.env?.MONGO_URL) {
    throw new Error('mongodb url unfound');
  }

  const config: PowerPartial<EggAppConfig> = {
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1662719314913_2123',

    // add your egg config in here
    middleware: ['verifyToken'],

    mongoose: {
      client: {
        url: process.env.MONGO_URL,
        options: {
          useUnifiedTopology: true,
          user: process.env.MONGO_USERNAME,
          pass: process.env.MONGO_PASSWORD,
        } as any,
        // mongoose global plugins, expected a function or an array of function and options
        // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
      },
    },

    // TODO: production need remove below option
    security: {
      csrf: {
        enable: false,
      },
      // domainWhiteList: ['http://*', 'https://*'],
    },

    // cors: {
    //   origin: '*',
    //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    // },

    // Configuring the jwt secret
    jwt: {
      secret: process.env.JWT_SECRET,
    },

    // cluster: {
    //   listen: {
    //     port: 7003,
    //     hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    //     // path: '/var/run/egg.sock',
    //   },
    // },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
