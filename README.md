# Hanabi

Hanabi is a Next.js portfolio site built with Tailwind CSS and Bun. The homepage presents the studio story, services, why-us section, recent works, and contact flow.

## Development

Install dependencies:

```bash
bun install
```

Run the local development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production:

```bash
bun run build
```

Start the production server:

```bash
bun run start
```

## Project Structure

- `app/page.tsx` composes the homepage sections and mounts the works section.
- `data/work-projects.ts` is the source of truth for work project titles, categories, descriptions, and image sets.
- `components/work-projects-list.tsx` owns the works list client interaction. It shows the first three projects initially, renders a blurred, non-interactive peek of the next project behind the rounded white "See more" button, and mounts the remaining projects on click.
- `components/work-card.tsx` renders each work project shell and description.
- `components/work-card-gallery.tsx` handles project image layouts based on image count.
- `components/reveal.tsx` provides the viewport reveal/fade behavior used across the page and by newly mounted work projects.

## Updating Works

Add or edit projects in `data/work-projects.ts`. Project images should live under `public/projects` and be referenced with root-relative paths such as `/projects/example.png`.

The first three projects in `workProjects` are visible immediately. In the collapsed state, the next project appears only as a blurred, non-interactive peek behind "See more"; full additional projects stay unmounted until visitors click the button, so their existing `Reveal` viewport animation runs when they appear.

## Notes

- Use Bun for all package and script commands.
- Keep UI styling in Tailwind classes.
- Update this README when feature changes affect project structure or expected workflows.
