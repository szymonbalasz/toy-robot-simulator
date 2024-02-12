module.exports = {
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "jest",
    jest: {
        configFile: "jest.config.ts",
    },
    coverageAnalysis: "off",
    mutate: [
        "src/**/*.ts",
        "!src/**/*.test.ts",
    ],
};
