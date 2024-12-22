import { assertEquals, assertObjectMatch } from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import sinon from "sinon";
import blockService from "../../services/block.service.ts";
import * as testUtils from "../../utils/test-utils.ts";

describe("Block Router", () => {
  describe("GET /v1/:chain/timestamp/:timestamp", () => {
    const originalEnv = testUtils.snapshotEnv();
    const chains = {
      cosmos: "https://rpc.cosmos.network",
      osmosis: "https://rpc.osmosis.zone",
    };
    const chain = "cosmos";
    const timestamp = 1765432100;
    const blockNumber = 123456;
    const urlPrefix = "/v1";
    const url = `${urlPrefix}/${chain}/timestamp/${timestamp}`;

    beforeEach(() => testUtils.loadTestEnv());

    afterEach(() => {
      testUtils.restoreEnv(originalEnv);
      sinon.restore();
    });

    it("should return the block number for a valid chain and timestamp", async () => {
      Deno.env.set("CHAINS", JSON.stringify(chains));
      const app = (await import("../../app.ts")).default;
      const getBlockByTimestampStub = sinon.stub(
        blockService,
        "getBlockByTimestamp",
      ).resolves(blockNumber);
      const response = await app.request(url);
      assertEquals(response.status, 200);
      const responseJson = await response.json();
      assertObjectMatch(responseJson, {
        blockNumber,
        chain,
        timestamp,
      });
      assertEquals(getBlockByTimestampStub.args, [[chain, timestamp]]);
    });

    it("should return an error for an unsupported chain", async () => {
      const app = (await import("../../app.ts")).default;
      const response = await app.request(url);
      assertEquals(response.status, 500);
      const responseJson = await response.json();
      assertObjectMatch(responseJson, {
        "error": "Unsupported chain: 'cosmos'. Supported chains are: ",
      });
    });

    it("should return an error on invalid timestamp", async () => {
      Deno.env.set("CHAINS", JSON.stringify(chains));
      const app = (await import("../../app.ts")).default;
      const timestamp = "invalid";
      const url = `${urlPrefix}/${chain}/timestamp/${timestamp}`;
      const response = await app.request(url);
      assertEquals(response.status, 400);
      const responseJson = await response.json();
      assertObjectMatch(responseJson, {
        error: {
          issues: [
            {
              code: "invalid_string",
              message: "Must be a valid Unix timestamp",
              path: [
                "timestamp",
              ],
              validation: "regex",
            },
          ],
          name: "ZodError",
        },
      });
    });
  });
});
