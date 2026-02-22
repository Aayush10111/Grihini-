# Grihini

Grihini is a mobile app for households in Nepal to quickly book trusted workers for everyday home services.

This repository now includes an initial Expo + TypeScript starter app and a first customer booking flow.

## Product Vision

Grihini should feel:

- Warm and welcoming
- Trustworthy and safe
- Simple for first-time smartphone users
- Clean and professional

The visual direction uses soft cream backgrounds with burgundy and maroon accents.

## Current Build (V0)

Implemented in this first version:

- Home screen with greeting and service category chips
- Worker listing cards with rating, jobs completed, price, and availability
- Simple booking form flow (date/time, address, note)
- Theme and UI components aligned with the brand direction
- Local mock data for fast iteration

## Tech Stack

- React Native
- Expo
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run

```bash
npm run start
```

Then open on:

- Android emulator or device (`a`)
- iOS simulator or device (`i`)
- Web (`w`)

## Project Structure

```text
.
|-- App.tsx
|-- src
|   |-- components
|   |   `-- WorkerCard.tsx
|   |-- data
|   |   `-- workers.ts
|   |-- theme
|   |   `-- colors.ts
|   `-- types.ts
|-- app.json
|-- babel.config.js
`-- tsconfig.json
```

## Next Milestones

1. Add proper navigation and dedicated screens.
2. Add customer auth and worker auth flows.
3. Connect to backend APIs for workers and bookings.
4. Add booking history and status tracking.
5. Add ratings/reviews and saved workers.

## Long-Term Goal

Build Nepal's most trusted household service network where workers can grow reliable digital reputations and customers can book with confidence in a few taps.
