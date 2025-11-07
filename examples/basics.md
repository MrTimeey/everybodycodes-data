# Basics

## Events

Handling for yearly events.

### Complete Data

Returns all data for a given quest in a given event. Contains all currently unlocked parts.

```ts
import { EverybodyCodesClient } from "@mrtimeey/everybodycodes-data";

const sessionCookie = "everybody-codes-session-cookie";

const client = new EverybodyCodesClient(sessionCookie);
const data = await client.getEventData("2025", 1);
console.log(data);
```

### Partial Data

Returns data for a given part in a given quest. Undefined if not unlocked.

```ts
import { EverybodyCodesClient } from "@mrtimeey/everybodycodes-data";

const sessionCookie = "everybody-codes-session-cookie";

const client = new EverybodyCodesClient(sessionCookie);

const part1Data = await client.getEventPartData("2024", 1, 1);
console.log(part1Data);
```

## Stories

Handling for stories.

### Complete Data

Returns all data for a given quest in a given story. Contains all currently unlocked parts.

```ts
import { EverybodyCodesClient } from "@mrtimeey/everybodycodes-data";

const sessionCookie = "everybody-codes-session-cookie";

const client = new EverybodyCodesClient(sessionCookie);
const data = await client.getStoryData("1", 1);
console.log(data);
```

### Partial Data

Returns data for a given part in a given quest. Undefined if not unlocked.

```ts
import { EverybodyCodesClient } from "@mrtimeey/everybodycodes-data";

const sessionCookie = "everybody-codes-session-cookie";

const client = new EverybodyCodesClient(sessionCookie);

const part1Data = await client.getStoryPartData("1", 1, 1);
console.log(part1Data);
```
