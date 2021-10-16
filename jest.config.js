module.exports = {
    // preset: 'ts-jest',
    transform: {
        "^.+\\.(js|jsx|mjs)$": "babel-jest",
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    // "moduleFileExtensions": [
    //     "ts",
    //     "tsx",
    //     "js",
    //     "jsx",
    //     "json"
    // ],
    // "testPathIgnorePatterns": [
    //     "/node_modules/"
    // ],
    globals: {
        "global": {}
    },
    testEnvironment: 'jsdom',
    verbose: true
};