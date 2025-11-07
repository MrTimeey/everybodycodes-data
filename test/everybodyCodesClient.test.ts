import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { MockAgent, setGlobalDispatcher } from "undici";
import { EverybodyCodesClient } from "../src";

const API_BASE = "https://everybody.codes";
const CDN_BASE = "https://everybody-codes.b-cdn.net";

const DUMMY_KEY_1 = "1234567890123456";
const DUMMY_KEY_2 = "1234567890123898";
const ENCRYPTED_PART_1 = "c40ccb96465a6a2c1ed054e6f38a0390";
const ENCRYPTED_PART_2 = "634ebde6ec5b1053c91530d42231f83d";

describe("EverybodyCodesClient", () => {
  const mockAgent = new MockAgent();
  beforeAll(() => {
    setGlobalDispatcher(mockAgent);
    mockAgent.disableNetConnect();
  });
  afterAll(async () => {
    await mockAgent.close();
  });

  it("events", async () => {
    mockAgent.disableNetConnect();

    const api = mockAgent.get(API_BASE);
    const cdn = mockAgent.get(CDN_BASE);

    api
      .intercept({ path: "/api/user/me", method: "GET" })
      .reply(200, JSON.stringify({ seed: "55" }), {
        headers: { "content-type": "application/json" },
      })
      .persist();

    api
      .intercept({ path: "/api/event/2024/quest/1", method: "GET" })
      .reply(200, JSON.stringify({ key1: DUMMY_KEY_1, key2: DUMMY_KEY_2 }), {
        headers: { "content-type": "application/json" },
      })
      .persist();

    cdn
      .intercept({ path: "/assets/2024/1/input/55.json", method: "GET" })
      .reply(
        200,
        JSON.stringify({ "1": ENCRYPTED_PART_1, "2": ENCRYPTED_PART_2 }),
        { headers: { "content-type": "application/json" } },
      )
      .persist();

    const client = new EverybodyCodesClient("mock-cookie");

    const data = await client.getEventData("2024", 1);
    expect(data).toEqual({ 1: "42", 2: "1447" });

    const part1Data = await client.getEventPartData("2024", 1, 1);
    expect(part1Data).toBe("42");

    const part2Data = await client.getEventPartData("2024", 1, 2);
    expect(part2Data).toBe("1447");

    const part3Data = await client.getEventPartData("2024", 1, 3);
    expect(part3Data).toBe(undefined);
  });

  it("stories", async () => {
    mockAgent.disableNetConnect();

    const api = mockAgent.get(API_BASE);
    const cdn = mockAgent.get(CDN_BASE);

    api
      .intercept({ path: "/api/user/me", method: "GET" })
      .reply(200, JSON.stringify({ seed: "55" }), {
        headers: { "content-type": "application/json" },
      })
      .persist();

    api
      .intercept({ path: "/api/story/1/quest/1", method: "GET" })
      .reply(200, JSON.stringify({ key1: DUMMY_KEY_1, key2: DUMMY_KEY_2 }), {
        headers: { "content-type": "application/json" },
      })
      .persist();

    cdn
      .intercept({ path: "/assets/1/1/input/55.json", method: "GET" })
      .reply(
        200,
        JSON.stringify({ "1": ENCRYPTED_PART_1, "2": ENCRYPTED_PART_2 }),
        { headers: { "content-type": "application/json" } },
      )
      .persist();

    const client = new EverybodyCodesClient("mock-cookie-two");

    const data = await client.getStoryData("1", 1);
    expect(data).toEqual({ 1: "42", 2: "1447" });

    const part1Data = await client.getStoryPartData("1", 1, 1);
    expect(part1Data).toBe("42");

    const part2Data = await client.getStoryPartData("1", 1, 2);
    expect(part2Data).toBe("1447");

    const part3Data = await client.getStoryPartData("1", 1, 3);
    expect(part3Data).toBe(undefined);
  });
});
