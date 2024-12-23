export const OPENAPI_SPEC_PATH = "/openapi.json";

export const getOpenAPIMetadata = (version: string) => ({
  info: {
    title: "Time to Block API",
    version,
    description: "Retrieve blockchain block numbers based on timestamps.",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  externalDocs: {
    description: "GitHub Repository",
    url: "https://github.com/AndreMiras/time2block",
  },
  openapi: "3.1.0",
});
