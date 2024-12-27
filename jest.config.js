module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|@testing-library))',
    ],
    setupFiles: ['./jest-setup.js'],

    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  };
  