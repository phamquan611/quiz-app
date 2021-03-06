const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@users": path.resolve(__dirname, "src/pages/user-page"),
      "@services": path.resolve(__dirname, "src/services"),
      "@sass": path.resolve(__dirname, "src/sass"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@guards": path.resolve(__dirname, "src/guards"),
      "@store": path.resolve(__dirname, "src/store"),
      "@sagas": path.resolve(__dirname, "src/sagas"),
      "@actions": path.resolve(__dirname, "src/actions"),
      "@reducers": path.resolve(__dirname, "src/reducers"),
      "@middleware": path.resolve(__dirname, "src/middleware"),
    },
  },
};
