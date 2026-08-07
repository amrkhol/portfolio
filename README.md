# Portfolio — Amr El-Kholy

Personal portfolio site built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Geist Sans + Geist Mono |
| Deployment | Vercel |

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx               # Root layout, metadata, dark-mode flash prevention
│   ├── page.tsx                 # Home page (all sections)
│   └── projects/[slug]/page.tsx # Project detail pages (statically generated)
├── components/
│   ├── layout/   Navbar, Footer
│   ├── sections/ Hero, About, Experience, Skills, Projects, Contact
│   └── ui/       ProjectCard, TechTag, ThemeToggle
├── content/
│   ├── meta.ts        ← site-wide name, links, tagline — edit this first
│   ├── experience.ts  ← work history (mirrors the resume)
│   ├── projects.ts    ← add / edit projects here
│   └── skills.ts      ← add / edit skill categories here
└── lib/
    ├── theme.ts     # useTheme hook (dark/light + localStorage)
    └── utils.ts     # cn() class helper
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating content

**Personal info** → `content/meta.ts`
Update your name, email, GitHub, LinkedIn, resume URL, and deployed site URL.

**Projects** → `content/projects.ts`
Add a new object to the `projects` array. Required fields:
- `slug` — URL path (`/projects/<slug>`)
- `title`, `description` — shown on the project card
- `problem`, `approach`, `results[]` — shown on the case study detail page
- `tags[]` — tech stack pills
- `github` / `demo` — optional external links
- `architectureDiagram: true` — shows a placeholder slot on the detail page

**Skills** → `content/skills.ts`
Add or remove categories and skill names in the `skillCategories` array.

**Work history** → `content/experience.ts`
Mirrors the PDF at `public/resume.pdf` — keep the two in sync. Each role needs
`company`, `title`, `location`, `period`, `summary`, `highlights[]`, and `tags[]`.
The Experience timeline shows the first 3 highlights and collapses the rest.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Next.js — click **Deploy**. No extra configuration needed.
4. After deploying, update `siteUrl` in `content/meta.ts` to your Vercel domain.

## Before going live checklist

- [ ] Update `content/meta.ts` (real name, links, deployed URL)
- [ ] Fill in real project content in `content/projects.ts`
- [ ] Add `public/resume.pdf`
- [ ] Create OG image at `public/og-image.png` (1200 × 630 px)
- [ ] Update GitHub links to real repo URLs
- [ ] Connect custom domain in Vercel (optional)
