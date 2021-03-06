/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1624344903422_7148";

  // add your middleware config here
  config.middleware = ["errorHandler"];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1/youtube-clone",
      options: {
        useUnifiedTopology: true,
      },
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.jwt = {
    secret: "ba0343c0-4f42-40f7-aa81-2adb413866eb",
    expiresIn: "1d",
  };
  config.cors = {
    origin: "*",
  };

  return {
    ...config,
    ...userConfig,
  };
};
