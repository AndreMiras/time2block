import {
  assertEquals,
  assertObjectMatch,
  assertStringIncludes,
} from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { createApp } from "../app.ts";

describe("Documentation Route", () => {
  const version = "1.2.3";
  const app = createApp(version);

  describe("GET /openapi.json", () => {
    it("should return the OpenAPI JSON specification", async () => {
      const { getOpenAPIMetadata } = await import(
        "../config/openapi.config.ts"
      );
      const openAPIMetadata = getOpenAPIMetadata(version);
      const response = await app.request("/openapi.json");
      const responseJson = await response.json();
      assertEquals(response.status, 200);
      assertEquals(responseJson.openapi, openAPIMetadata.openapi);
      assertObjectMatch(responseJson.info, openAPIMetadata.info);
      assertEquals(responseJson.info.version, version);
      const expectedPaths = [
        "/v1/supported-chains",
        "/v1/{chain}/timestamp/{timestamp}",
      ];
      const actualPaths = Object.keys(responseJson.paths);
      assertEquals(actualPaths.sort(), expectedPaths.sort());
    });
  });

  describe("GET /swagger", () => {
    it("should return the Swagger UI HTML page", async () => {
      const response = await app.request("/swagger");
      const responseText = await response.text();
      assertEquals(response.status, 200);
      assertStringIncludes(responseText, '<html lang="en">');
      assertStringIncludes(responseText, "<title>SwaggerUI</title>");
    });
  });

  describe("GET /redoc", () => {
    it("should return the Redoc HTML page", async () => {
      const response = await app.request("/redoc");
      const responseText = await response.text();
      assertEquals(response.status, 200);
      assertStringIncludes(
        responseText,
        "<title>Redoc - Time to Block API</title>",
      );
    });
  });
});
