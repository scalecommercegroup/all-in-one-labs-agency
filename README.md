# All-in-One Labs

Swedish-first bilingual agency website for SEO, AEO, website development,
AI chatbots, and AI phone agents.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run check
npm run test:e2e
```

## Required production configuration

- Register and verify `all-in-one-labs.com`.
- Create `hello@all-in-one-labs.com`.
- Configure Resend and Cloudflare Turnstile.
- Replace the temporary booking URL with a Labs-branded Calendly event.
- Add the deployed domain to Plausible, Google Search Console, and Bing
  Webmaster Tools.

See `.env.example` for environment variables.

## Deployment

The source repository is owned by the `scalecommercegroup` GitHub account.
Connect the repository to Vercel, add the production environment variables,
and attach the custom domain only after the launch gates in the project plan
have passed.
