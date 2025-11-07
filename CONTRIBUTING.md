# Contributing to @mrtimeey/everybodycodes-data

Thanks for taking the time to contribute! 💙  
This guide will help you get started quickly and keep contributions consistent.

---

## 🧰 Development Setup

```bash
git clone https://github.com/mrtimeey/everybodycodes-data.git
cd everybodycodes-data
npm ci
```

### Run Tests

```bash
npm test
```

### Lint, Format & Type Check

```bash
npm run lint
npm run build
```

### Build & Check Public API

```bash
npm run build
npm run api:check
```

---

## 🧩 Commit Conventions

This project uses **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)**  
to automate changelog generation and releases.

Examples:
```
feat: add AES decryption helper
fix: incorrect key mapping for quest parts
chore: update dependencies
```

---

## 🧪 Testing

All tests use [Vitest](https://vitest.dev/).  
Mocked API calls rely on `undici.MockAgent` for zero-network testing.

---

## 🧱 Code Style

- TypeScript (ES2022 target)
- ESM-first build
- Prettier + ESLint enforce formatting
- All public exports must have TSDoc comments with `@public` tags

---

## 🚀 Release Process

1. Create a PR using Conventional Commit messages.
2. Once merged into `main`, [release-please](https://github.com/google-github-actions/release-please-action) opens a release PR automatically.
3. Merging that PR publishes the new version to npm.

---

## ❤️ Community

If you have questions, ideas, or just want to chat,  
open a discussion or reach out on [GitHub Discussions](https://github.com/mrtimeey/everybodycodes-data/discussions).
