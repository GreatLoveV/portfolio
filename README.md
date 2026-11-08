# Wael Ettazi portfolio

A personal developer portfolio with its own admin CMS.

**Stack:** Next.js (App Router) and strict TypeScript, Drizzle with Neon Postgres, Auth.js with GitHub sign-in, Vercel Blob for images, CSS Modules with CSS variables, Framer Motion.

Public pages are static and rebuild when you save in `/admin`. Only the GitHub account set in `ADMIN_GITHUB_ID` can sign in.

## Run it locally

You need Node 20.9 or newer, plus the accounts set up in the next section.

```bash
npm install
```

Copy `.env.example` to `.env.local`, fill it in using the table below, then create the tables and the placeholder content:

```bash
npm run db:migrate
```

```bash
npm run db:seed
```

```bash
npm run dev
```

The site runs at <http://localhost:3000> and the admin at <http://localhost:3000/admin>. A development-only style reference lives at `/styleguide`.

## Services to set up

### Neon (database)

Neon projects are created through Vercel's integration:

1. In Vercel, open **Storage**, choose **Create Database**, then **Neon**.
2. Copy the **pooled** connection string into `DATABASE_URL`.

### GitHub OAuth app (admin sign-in)

Create one at **GitHub, Settings, Developer settings, OAuth Apps**. An OAuth app holds one callback URL, so make one for local work and a second for production.

| Field                      | Local                                            | Production                                     |
| -------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| Homepage URL               | `http://localhost:3000`                          | `https://your-domain`                          |
| Authorization callback URL | `http://localhost:3000/api/auth/callback/github` | `https://your-domain/api/auth/callback/github` |

Copy the **Client ID** into `AUTH_GITHUB_ID`, then generate a **client secret** for `AUTH_GITHUB_SECRET`.

`ADMIN_GITHUB_ID` is your numeric **user** ID, not the OAuth app's ID. Find it in the `"id"` field at `https://api.github.com/users/YOUR_USERNAME`.

### Vercel Blob (image uploads)

In Vercel, open **Storage**, choose **Create**, then **Blob**, using public access. Connect it to the project and copy `BLOB_READ_WRITE_TOKEN`.

## Environment variables

| Variable                | What it is                                                    |
| ----------------------- | ------------------------------------------------------------- |
| `DATABASE_URL`          | Neon pooled connection string                                 |
| `AUTH_SECRET`           | Session signing key. Generate with `npx auth secret`          |
| `AUTH_GITHUB_ID`        | OAuth app client ID                                           |
| `AUTH_GITHUB_SECRET`    | OAuth app client secret                                       |
| `ADMIN_GITHUB_ID`       | Numeric GitHub user ID of the only admin                      |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token                                             |
| `NEXT_PUBLIC_SITE_URL`  | Public site address with no trailing slash, used by SEO files |

Never commit `.env.local`. Only `.env.example` belongs in git.

## Deploy to Vercel

Work through these in order. Public pages read the database while building, so **the tables must exist before the first deploy**.

- [ ] Push this repository to a private or public GitHub repository.
- [ ] Run `npm run db:migrate` and `npm run db:seed` against the database production will use. If that is the one in `.env.local`, this is already done.
- [ ] In Vercel, choose **Add New, Project** and import the repository. The defaults detect Next.js.
- [ ] Add all seven environment variables for **Production**, with a new `AUTH_SECRET` and the production OAuth app's ID and secret. Set `NEXT_PUBLIC_SITE_URL` to the final address.
- [ ] Deploy.
- [ ] Add your domain under **Settings, Domains**, if you have one. Then update `NEXT_PUBLIC_SITE_URL` and the production OAuth app's two URLs to match, and redeploy.

### Check after deploying

- [ ] `/admin` redirects to the login page, and your GitHub account gets in.
- [ ] Save a change in `/admin` and see it on the public site.
- [ ] Upload an image and see it appear.
- [ ] Send a test message at `/contact`, read it in the inbox, then delete it.
- [ ] `/styleguide` returns a 404.
- [ ] `/sitemap.xml` and `/robots.txt` show your real address.
- [ ] Paste a page link into a [social preview tool](https://www.opengraph.xyz) to check the share image.

### Replace the placeholders before sharing the link

All of these are edited in `/admin`:

- [ ] Project text, which still says "Placeholder", and the fictional sample projects
- [ ] Real project cover images and gallery images
- [ ] Experience dates and entries
- [ ] Email and social links in Site settings, which still say `you@example.com` and `your-username`
- [ ] Your CV, so the download button appears
- [ ] The "Unfinished idea" draft, which you can delete

## Useful commands

| Command               | What it does                                 |
| --------------------- | -------------------------------------------- |
| `npm run lint`        | Check code with ESLint                       |
| `npm run typecheck`   | Check types                                  |
| `npm run format`      | Format with Prettier                         |
| `npm run db:generate` | Create a migration after changing the schema |
| `npm run db:migrate`  | Apply migrations                             |
| `npm run db:studio`   | Browse the database                          |

## Where to find things

| Path                | Contents                         |
| ------------------- | -------------------------------- |
| `src/app/(site)`    | Public pages                     |
| `src/app/admin`     | Admin pages and Server Actions   |
| `src/components/ui` | Design system components         |
| `src/styles`        | Design tokens as CSS variables   |
| `src/db`            | Schema, connection and seed data |
| `docs/design`       | Design notes and contrast table  |
