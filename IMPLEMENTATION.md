# Sprint 1 local setup

Sprint 1 runs on the `sprint-1-foundation` branch.

## Requirements

- Node.js 22.13+
- npm
- PostgreSQL (or Docker)

## Quick start

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL. With Docker: `docker compose up -d postgres`.
3. Install dependencies: `npm install`.
4. Apply migrations: `npm run db:migrate`.
5. Optional demo data: `npm run db:seed`.
6. Start the app: `npm run dev`.

## Quality commands

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`

The deterministic Japan development seed uses demonstration dates and does not contain private trip dates or personal spending information.
