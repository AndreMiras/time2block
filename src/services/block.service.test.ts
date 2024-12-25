import sinon from "sinon";
import { assertEquals, assertRejects } from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { getBlockByTimestamp } from "./block.service.ts";
import rpcConfig from "../config/rpc.config.ts";

/**
 * Creates a mock Tendermint block with the specified height and timestamp.
 *
 * @param {number} height - The block height to be mocked.
 * @param {Date} date - The block timestamp to be mocked.
 * @returns {object} A mock block object matching the Tendermint block structure.
 */
const createMockBlock = (height: number, date: Date) => ({
  block: {
    header: {
      height,
      time: date,
    },
  },
});

/**
 * Sets up a mocked Tendermint client that returns the specified block.
 *
 * @param {sinon.SinonStub} blockStub - A Sinon stub simulating the `block` method of the Tendermint client.
 * @returns {sinon.SinonStub} A stub for Tendermint34Client.connect.
 */
const mockTendermintClient = (block: sinon.SinonStub) =>
  sinon.stub(Tendermint34Client, "connect").resolves(
    { block },
  );

describe("Block Service", () => {
  describe("getBlockByTimestamp", () => {
    beforeEach(() =>
      sinon.stub(rpcConfig, "getRpcEndpoint").returns("mock-endpoint")
    );

    afterEach(() => sinon.restore());

    it("should handle millisecond timestamps", async () => {
      const expectedHeight = 100;
      const date = new Date("2024-01-01T00:00:00Z");
      const block = sinon.stub().resolves(
        createMockBlock(expectedHeight, date),
      );
      mockTendermintClient(block);
      const msTimestamp = date.getTime();
      const height = await getBlockByTimestamp("cosmos", msTimestamp);
      assertEquals(height, expectedHeight);
    });

    it("should handle second timestamps", async () => {
      const expectedHeight = 100;
      const date = new Date("2024-01-01T00:00:00Z");
      const block = sinon.stub().resolves(
        createMockBlock(expectedHeight, date),
      );
      mockTendermintClient(block);
      const secTimestamp = date.getTime() / 1000;
      const height = await getBlockByTimestamp("cosmos", secTimestamp);
      assertEquals(height, expectedHeight);
    });

    it("should find exact matching block", async () => {
      const expectedHeight = 50;
      const date = new Date("2024-01-01T00:00:00Z");
      const block = sinon.stub().resolves(
        createMockBlock(50, new Date("2024-01-01T00:00:00Z")),
      );
      mockTendermintClient(block);
      const timestamp = date.getTime() / 1000;
      const height = await getBlockByTimestamp("cosmos", timestamp);
      assertEquals(height, expectedHeight);
    });

    it("should find closest block before target timestamp", async () => {
      const block = sinon.stub()
        .onCall(0).resolves(
          createMockBlock(100, new Date("2024-01-01T00:00:00Z")),
        )
        .onCall(1).resolves(
          createMockBlock(50, new Date("2023-12-31T23:00:00Z")),
        )
        .onCall(2).resolves(
          createMockBlock(75, new Date("2023-12-31T23:30:00Z")),
        )
        // default to a more recent date than queried timestamp
        .resolves(createMockBlock(87, new Date("2023-12-31T23:45:00Z")));
      mockTendermintClient(block);
      const timestamp = new Date("2023-12-31T23:40:00Z").getTime() / 1000;
      const height = await getBlockByTimestamp("cosmos", timestamp);
      assertEquals(height, 75);
    });

    it("should throw an error if no block matches the timestamp", async () => {
      // earliest block more recent that the timestamp we're about to query
      const block = sinon.stub().resolves(
        createMockBlock(9, new Date("2024-12-24T22:00:00Z")),
      );
      mockTendermintClient(block);
      const date = new Date("2024-12-24T20:00:00Z");
      const timestamp = date.getTime() / 1000;
      await assertRejects(
        () => getBlockByTimestamp("cosmos", timestamp),
        Error,
        "No block found for the given timestamp.",
      );
    });
  });
});
