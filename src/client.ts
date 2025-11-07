import { http } from "./helper/http";
import { aesDecryptHexWithKey } from "./crypto.js";

const API_BASE = "https://everybody.codes/api";
const CDN_BASE = "https://everybody-codes.b-cdn.net/assets";

enum ChallengeType {
  Event = "event",
  Story = "story",
}

/**
 * Part number for quests.
 * @public
 */
export type PartNumber = 1 | 2 | 3;

/**
 * Client for request against the EverybodyCodes API.
 *
 * @public
 */
export class EverybodyCodesClient {
  private readonly cookie: string;
  private seed?: string;

  /**
   * Creates a new EverybodyCodesClient.
   * @param sessionCookie - Value of the `everybody-codes` cookie.
   */
  constructor(sessionCookie: string) {
    if (!sessionCookie || !sessionCookie.trim()) {
      throw new Error("EverybodyCodesClient: sessionCookie is required.");
    }
    this.cookie = sessionCookie.trim();
  }

  private makeUrl(type: ChallengeType, ...parts: (string | number)[]): string {
    return [
      API_BASE,
      type,
      ...parts.map((p) => encodeURIComponent(String(p))),
    ].join("/");
  }

  private cookieHeader(): HeadersInit {
    return { Cookie: `everybody-codes=${this.cookie}` };
  }

  private async getSeed(): Promise<string> {
    if (this.seed) return this.seed;
    const url = `${API_BASE}/user/me`;
    const data = await http<{ seed?: string }>(url, {
      headers: this.cookieHeader(),
    });
    if (!data?.seed) throw new Error("Kein 'seed' in /user/me Antwort.");
    this.seed = data.seed;
    return data.seed;
  }

  private async getEncryptedInputs(
    event: string | number,
    quest: string | number,
    seed: string,
  ) {
    const url = `${CDN_BASE}/${encodeURIComponent(String(event))}/${encodeURIComponent(
      String(quest),
    )}/input/${encodeURIComponent(seed)}.json`;
    return await http<Record<"1" | "2" | "3", string>>(url, {
      headers: this.cookieHeader(),
    });
  }

  private async getDataInternal(
    type: ChallengeType,
    event: string | number,
    quest: string | number,
  ) {
    const seed = await this.getSeed();
    const encrypted = await this.getEncryptedInputs(event, quest, seed);
    const keys = await this.getKeys(type, event, quest);

    const out: Partial<Record<1 | 2 | 3, string>> = {};
    (["1", "2", "3"] as const).forEach((p) => {
      const hex = encrypted[p];
      const key = keys[p];
      if (hex && key)
        out[Number(p) as 1 | 2 | 3] = aesDecryptHexWithKey(key, hex);
    });
    return out;
  }

  private async getKeys(
    type: ChallengeType,
    event: string | number,
    quest: string | number,
  ) {
    const url = this.makeUrl(type, event, "quest", quest);
    const data = await http<any>(url, { headers: this.cookieHeader() });

    const out: Partial<Record<"1" | "2" | "3", string>> = {};
    for (const p of ["1", "2", "3"] as const) {
      const flat = data?.[`key${p}`];
      if (flat) out[p] = String(flat);
    }
    return out;
  }

  /**
   * Fetches data for a specific event and quest.
   * @param event - Event ID
   * @param quest - Quest ID
   * @returns Data for the event and quest
   */
  async getEventData(event: string | number, quest: string | number) {
    return this.getDataInternal(ChallengeType.Event, event, quest);
  }

  /**
   * Fetches data for a specific story and quest.
   * @param story - Story ID
   * @param quest - Quest ID
   * @returns Data for the story and quest
   */
  async getStoryData(story: string | number, quest: string | number) {
    return this.getDataInternal(ChallengeType.Story, story, quest);
  }

  /**
   * Fetches data for a specific event, quest, and part.
   * @param event - Event ID
   * @param quest - Quest ID
   * @param part - Part number (1, 2, or 3)
   * @returns Data for the event, quest, and part
   */
  async getEventPartData(
    event: string | number,
    quest: string | number,
    part: PartNumber,
  ) {
    const data = await this.getDataInternal(ChallengeType.Event, event, quest);
    return data[part];
  }

  /**
   * Fetches data for a specific story, quest, and part.
   * @param story - Story ID
   * @param quest - Quest ID
   * @param part - Part number (1, 2, or 3)
   * @returns Data for the story, quest, and part
   */
  async getStoryPartData(
    story: string | number,
    quest: string | number,
    part: PartNumber,
  ) {
    const data = await this.getDataInternal(ChallengeType.Story, story, quest);
    return data[part];
  }
}
