// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo', 'react-native-dotenv'],
//     // plugins: ['react-native-reanimated/plugin'],
//   };
// };