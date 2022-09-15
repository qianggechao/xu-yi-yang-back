import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1662719314913_2123',

    // add your egg config in here
    middleware: [],

    mongoose: {
      client: {
        url: 'mongodb://43.143.101.114:27017/xu-yi-yang',
        options: {},
        // mongoose global plugins, expected a function or an array of function and options
        // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
      },
    },
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
