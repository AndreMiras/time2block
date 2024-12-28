import sinon from "sinon";
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { printFunction } from "./logger.ts";
import * as testUtils from "../utils/test-utils.ts";

describe("Logger Middleware", () => {
  const originalEnv = Deno.env.toObject();

  beforeEach(() => testUtils.loadTestEnv());

  afterEach(() => {
    testUtils.restoreEnv(originalEnv);
    sinon.restore();
  });

  it("should log messages when ENABLE_LOGGER is true", () => {
    Deno.env.set("ENABLE_LOGGER", "true");
    const consoleLogStub = sinon.stub(console, "log");
    printFunction("Test message", "arg1", "arg2");
    assertEquals(consoleLogStub.args, [["Test message", "arg1", "arg2"]]);
  });

  it("should not log messages when ENABLE_LOGGER is false", () => {
    Deno.env.set("ENABLE_LOGGER", "false");
    const consoleLogStub = sinon.stub(console, "log");
    printFunction("Test message", "arg1", "arg2");
    assertEquals(consoleLogStub.args, []);
  });

  it("should not log messages when ENABLE_LOGGER is not set", () => {
    const consoleLogStub = sinon.stub(console, "log");
    printFunction("Test message", "arg1", "arg2");
    assertEquals(consoleLogStub.args, []);
  });

  it("should throw an error if ENABLE_LOGGER is not valid JSON", () => {
    Deno.env.set("ENABLE_LOGGER", "invalid-json");
    assertThrows(
      () => printFunction("Test message"),
      SyntaxError,
      "Unexpected token",
    );
  });
});
