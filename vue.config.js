const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        data: `@import "~@/scss/global.scss";`
      }
    }
  }
};
