# @mrtimeey/everybodycodes-data

[![npm version](https://img.shields.io/npm/v/@mrtimeey/everybodycodes-data?color=brightgreen&label=npm)](https://www.npmjs.com/package/@mrtimeey/everybodycodes-data)
[![npm provenance](https://provenancebadge.vercel.app/npm/@mrtimeey/everybodycodes-data)](https://provenancebadge.vercel.app)
[![build](https://github.com/mrtimeey/everybodycodes-data/actions/workflows/ci.yml/badge.svg)](https://github.com/mrtimeey/everybodycodes-data/actions/workflows/ci.yml)
[![release](https://github.com/mrtimeey/everybodycodes-data/actions/workflows/release.yml/badge.svg)](https://github.com/mrtimeey/everybodycodes-data/actions/workflows/release.yml)
[![license](https://img.shields.io/github/license/mrtimeey/everybodycodes-data?color=blue)](LICENSE)

> 🧩 A lightweight Node.js client for fetching and decrypting **Everybody Codes** inputs automatically.

---

## ✨ Features

- Fetch and decrypt puzzle input data from [everybody.codes](https://everybody.codes/)
- Fully typed API (TypeScript)
- Built-in test mocks via `undici.MockAgent`
- Automatically validated examples and README code blocks in CI
- API-stable and documented via [API Extractor](https://api-extractor.com/)

---

## 🚀 Installation

```bash
npm install @mrtimeey/everybodycodes-data
# or
pnpm add @mrtimeey/everybodycodes-data
```

---

## 📘 Usage

```ts
import { EverybodyCodesClient } from "@mrtimeey/everybodycodes-data";

const client = new EverybodyCodesClient("your-everybody-codes-session-cookie");

// Fetch and decrypt full quest data
const data = await client.getEventData("2025", 1);
console.log(data); // { 1: "input text part 1", 2: "...", 3: "..." }

// Fetch only a single part
const part1 = await client.getEventPartData("2025", 1, 1);
console.log(part1);
```

> 💡 Your `session-cookie` must match the `everybody-codes` cookie from your logged-in browser.

---

## 🧩 API Reference

The public API surface is automatically tracked by [API Extractor](https://api-extractor.com/).  
See [`etc/everybodycodes-data.api.md`](./etc/everybodycodes-data.api.md) for the latest exported types.

---

## 🧱 Development

### Prerequisites

- Node.js ≥ 18.17
- npm ≥ 9 or pnpm ≥ 8

### Setup

```bash
npm ci
```

### Run all checks

```bash
npm test
npm run build
```

### Lint & Format

```bash
npm run lint
npm run format
```

---

## 🔄 Release Workflow

This repository uses [release-please](https://github.com/google-github-actions/release-please-action):

1. Conventional commits (`fix:`, `feat:`) update changelog and version bump via PR.
2. Merge the release PR → Git tag is created.
3. GitHub Actions publish the package to npm with provenance.

---

## 🛡️ Security

See [SECURITY.md](./SECURITY.md) for responsible disclosure guidelines.

---

## 🤝 Contributing

Contributions, issues, and pull requests are welcome!  
See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📄 License

MIT © [Tim Kruse](https://github.com/mrtimeey)
