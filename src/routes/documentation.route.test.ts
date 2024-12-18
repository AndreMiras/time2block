import {
  assertEquals,
  assertObjectMatch,
  assertStringIncludes,
} from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import * as testUtils from "../utils/test-utils.ts";
import app from "../app.ts";
import { OPENAPI_METADATA } from "../config/openapi.config.ts";

describe("Documentation Route", () => {
  const originalEnv = testUtils.snapshotEnv();

  beforeEach(() => testUtils.loadTestEnv());

  afterEach(() => testUtils.restoreEnv(originalEnv));

  describe("GET /openapi.json", () => {
    it("should return the OpenAPI JSON specification", async () => {
      const response = await app.request("/openapi.json");
      const responseJson = await response.json();
      assertEquals(response.status, 200);
      assertEquals(responseJson.openapi, OPENAPI_METADATA.openapi);
      assertObjectMatch(responseJson.info, OPENAPI_METADATA.info);
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
});
