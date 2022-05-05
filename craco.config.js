const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@sass": path.resolve(__dirname, "src/sass"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@guards": path.resolve(__dirname, "src/guards"),
      "@store": path.resolve(__dirname, "src/store"),
      "@middleware": path.resolve(__dirname, "src/middleware"),
    },
  },
};
