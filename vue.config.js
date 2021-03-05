module.exports = {
  publicPath: '',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = 'js/bannery.js';
      delete config.output.chunkFilename;
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.delete('splitChunks');
    }
  },
  css: {
    extract: false,
  },
};
