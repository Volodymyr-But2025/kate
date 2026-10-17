# KATYA.EXE — Birthday Protocol

A personalized, responsive birthday microsite for Katya, built with Next.js.

## Run locally

Requirements: Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

### Option A — GitHub (recommended)
1. Create a GitHub repository named `katya-exe`.
2. Upload/push all files in this folder to the repository.
3. Sign in to https://vercel.com using GitHub.
4. Select **Add New → Project**, then import `katya-exe`.
5. Keep the detected Next.js settings and click **Deploy**.
6. When the deployment finishes, copy the generated `*.vercel.app` URL and send it to Katya.

### Option B — Vercel CLI
Install Node.js, then run these commands in the project directory:

```bash
npm install
npx vercel
```

Follow the prompts. To deploy a production build, run:

```bash
npx vercel --prod
```

## Customize
- Letter cards, hints, and page flow: `app/page.tsx`
- Card UI: `app/components/LetterCards.tsx`
- Birthday banner and “replay salute” button: `app/components/FinaleBanner.tsx`
- Sounds: `app/lib/sounds.ts`
- Colors, typography, card flip, animations: `app/globals.css`
- Browser title and description: `app/layout.tsx`

The page does not need a database, API keys, or environment variables.
