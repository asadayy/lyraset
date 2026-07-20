# LYRASET — International Marketing Agency Website

A production, **fully CMS-driven** marketing website built with Next.js (App
Router), Bootstrap 5 (SCSS), MongoDB Atlas (Mongoose), Cloudinary, and NextAuth.
Every piece of public content — headlines, paragraphs, stats, images, videos,
services, case studies, team, testimonials, jobs, offices, socials, SEO tags —
is stored in the database and editable from `/admin` without touching code.

> **Runs out of the box.** With no `MONGODB_URI` configured, the public site
> renders from bundled seed content so you can develop immediately. Point it at
> an Atlas cluster and run the seed script to make everything editable.

---

## Tech stack

| Concern         | Choice                                                       |
| --------------- | ------------------------------------------------------------ |
| Framework       | Next.js 15 (App Router, RSC), JavaScript                     |
| Styling         | Bootstrap 5 via **SCSS** (trimmed modules) + design tokens   |
| Database        | MongoDB Atlas + Mongoose                                     |
| Media           | Cloudinary (images, video, PDF) with signed uploads          |
| Auth            | NextAuth (Credentials, bcrypt, JWT sessions)                 |
| Animation       | Framer Motion + GSAP/ScrollTrigger (lazy, reduced-motion)    |
| Validation      | Zod                                                          |
| Deploy target   | Vercel (region `bom1`)                                       |

---

## Quick start

```bash
# 1. Install
npm install --legacy-peer-deps

# 2. Configure environment (optional for first run)
cp .env.example .env.local

# 3. Develop — works immediately from seed content
npm run dev        # http://localhost:3000
```

### Enable the database + CMS

1. Create a **MongoDB Atlas** cluster, a database user, and allow-list your IP
   (or `0.0.0.0/0` for Vercel). Copy the `mongodb+srv://…` string into
   `MONGODB_URI` in `.env.local`.
2. Create a **Cloudinary** account. Copy the cloud name, API key, and API secret
   into the `CLOUDINARY_*` vars (and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`).
3. Generate admin credentials:
   ```bash
   node scripts/hash-password.js "your-strong-password"
   # paste the printed ADMIN_PASSWORD_HASH into .env.local, set ADMIN_EMAIL
   ```
4. Set `NEXTAUTH_SECRET` (`openssl rand -base64 32`) and `REVALIDATE_SECRET`.
5. Seed the database with the full starter content:
   ```bash
   npm run seed
   ```
6. Visit `/admin/login` and sign in.

---

## Scripts

| Command            | Purpose                                       |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Local dev server                              |
| `npm run build`    | Production build                              |
| `npm run start`    | Serve the production build                    |
| `npm run seed`     | Seed MongoDB with starter content             |
| `npm run lint`     | ESLint                                        |
| `npm run format`   | Prettier                                      |
| `npm run analyze`  | Bundle analysis (`@next/bundle-analyzer`)     |

---

## Project structure

```
app/            App Router routes
  (site)/       Public site (route group — shared navbar/footer chrome)
  admin/        Admin CMS (protected by middleware)
  api/          Route handlers (REST per entity + upload, leads, revalidate)
components/      Public UI components
  admin/        Admin-only UI components
lib/            db, auth, cloudinary, validation, motion tokens, data access
models/         Mongoose schemas
scripts/        seed + password hashing
styles/         globals.scss (Bootstrap build + tokens) + per-component SCSS
```

Environment variables are documented in [`.env.example`](.env.example).

Deployment steps are at the end of this file (see **Deploy to Vercel**).
