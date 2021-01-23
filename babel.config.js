const path = require("path");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            src: path.resolve(__dirname, "src/"),
          },
        },
      ],
    ],
  };
};

// module.exports = {
//   presets: ["module:metro-react-native-babel-preset"],
//   plugins: [
//     [
//       "module-resolver",
//       {
//         alias: {
//           src: path.resolve(__dirname, "src/"),
//         },
//       },
//     ],
//   ],
// };
