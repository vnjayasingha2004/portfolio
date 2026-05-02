# Vinira Jayasingha Portfolio - Premium dark redesign

This is the refined version of the portfolio redesign.

## What changed

- Intro now reveals the full name: `Vinira Jayasingha`.
- Navigation uses `Home` instead of `Index`.
- Removed the extra direction/philosophy section from the landing page.
- Added LinkedIn to the hero and contact information.
- Reworked the stack animation into a darker, galaxy-backed, logo-only constellation.
- Removed the small white moving balls from the stack animation.
- Project routes still work as full case-study pages.
- Every project page has its own connected stack animation using only logos; hovering a logo shows the name, role, and project-specific note.

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/projects
```

## Replacing the generated project pictures with your real screenshots

All project images are defined in `lib/projects.ts`.

Example:

```ts
images: [
  { src: "/projects/sprintflow-dashboard.svg", alt: "SprintFlow AI dashboard mockup" },
  { src: "/projects/sprintflow-planner.svg", alt: "SprintFlow AI planner mockup" },
],
```

To use your real images:

1. Put your screenshots in `public/projects/`.
2. Use simple web-friendly names, for example:

```text
public/projects/sprintflow-dashboard.png
public/projects/sprintflow-task-page.png
public/projects/lawpoint-home.png
```

3. Update the matching `src` values in `lib/projects.ts`:

```ts
images: [
  { src: "/projects/sprintflow-dashboard.png", alt: "SprintFlow AI dashboard" },
  { src: "/projects/sprintflow-task-page.png", alt: "SprintFlow AI task detail page" },
],
```

Recommended image sizes:

- Web dashboards: `1600 x 1000` or `1440 x 900`
- Mobile screenshots: `900 x 1600` or `1080 x 1920`
- Export as `.png`, `.jpg`, or `.webp`

You do not need to import images in the code. Anything inside `public/` can be referenced with a path starting with `/`.

## Updating contact links

Contact data is centralized in:

```text
lib/profile.ts
```

Edit your email, GitHub, LinkedIn, location, or CV path there.

## Stack logos

The stack constellation uses monochrome Simple Icons CDN logos where a matching logo exists. Items that are workflow concepts, such as `Barcode Flow` or `IPC Bridge`, use a clean fallback symbol based on their stack group.
