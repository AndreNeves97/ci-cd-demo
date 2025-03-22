import type { Config } from "jest";

const config: Config = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "./reports", outputName: "jest-junit.xml" }]
  ]
};

export default config;