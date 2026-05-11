# Hanabi

Hanabi is a Next.js portfolio site built with Tailwind CSS and Bun. The homepage presents the studio story, seamless hero marquee, services, why-us section, recent works, and contact flow.

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

- `app/page.tsx` composes the homepage sections, owns section-level spacing such as the larger services top padding before Why Us, and mounts the works section.
- `data/work-projects.ts` is the source of truth for work project titles, categories, descriptions, and image sets.
- `components/marquee-component.tsx` renders the homepage hero project marquee with `components/seamless-marquee.tsx`.
- `components/seamless-marquee.tsx` provides the package-free, duplicated-track marquee used by the hero and inline service marquees.
- `components/work-projects-list.tsx` owns the works list client interaction. It shows the first three projects initially, renders a blurred, non-interactive peek of the next project behind the rounded-full "See more" button with a `#E3E3E3/80` fill, light vertical gradient stroke, subtle layered shadows, and active scale feedback, then mounts the remaining projects on click.
- `components/work-card.tsx` renders each work project shell, description, and clipped media area for decorative paper-crane garlands.
- `components/work-card-gallery.tsx` handles project image layouts based on image count.
- `components/reveal.tsx` provides the viewport reveal/fade behavior used across the page and by newly mounted work projects.
- `components/why-us-cards.tsx` renders the Why Us cards, with separated mobile spacing for the Quality and Clean Code cards so they do not attach on narrow screens.
- `components/studios-quote-section.tsx` renders the Studios/Who We Are quote and team list. Team avatar gradients fill the full rounded circle while retaining their ring, inset highlight, and shadow depth, and team banners preload as their cards approach the viewport while still revealing on hover, focus, or touch.
- The footer transition artwork section is currently disabled, so the footer renders only the base footer artwork.

## Updating Works

Add or edit projects in `data/work-projects.ts`. Project images should live under `public/projects` and be referenced with root-relative paths such as `/projects/example.png`.

The first three projects in `workProjects` are visible immediately. In the collapsed state, the next project appears only as a blurred, non-interactive peek behind "See more"; full additional projects stay unmounted until visitors click the button, so their existing `Reveal` viewport animation runs when they appear. Paper-crane garlands are anchored inside each project media box, clipped by that project box, with the left and right strings inset from the box sides and spanning top-to-bottom.

## Notes

- Use Bun for all package and script commands.
- Keep UI styling in Tailwind classes.
- Update this README when feature changes affect project structure or expected workflows.
