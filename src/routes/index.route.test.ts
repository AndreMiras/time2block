import { assertEquals, assertStringIncludes } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { createApp } from "../app.ts";

describe("Index Route", () => {
  const app = createApp();
  describe("GET /", () => {
    it("should return the landing page with title", async () => {
      const response = await app.request("/");
      const responseText = await response.text();
      assertEquals(response.status, 200);
      assertStringIncludes(responseText, "<title>Time to Block API</title>");
      assertStringIncludes(responseText, "<h1>Time to Block API</h1>");
    });
  });

  describe("GET /public/styles.css", () => {
    it("should return the CSS file", async () => {
      const response = await app.request("/public/styles.css");
      const responseText = await response.text();
      assertEquals(response.status, 200);
      assertStringIncludes(responseText, "body {");
      assertStringIncludes(responseText, "font-family: Arial, sans-serif;");
    });
  });
});
