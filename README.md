# MMD EXCLUSIVE — VER 17

A dark, cinematic entertainment website built with React, TypeScript, Vite and GSAP.

## Current updates — VER 17

- Removed **Yeh Prem Mol Liya** from the moving home hero poster rail and added **Jailer 2** instead. The hero now features five titles and its collection counter reflects five.
- Limited **01 — THE UNIVERSE** to the five dated cinema releases; **Jailer 2** remains exclusively in **02 — BLOCKBUSTERS**. All five Universe posters retain their individual film-page links and release-date order.
- Centered the Universe heading and supporting copy to create a clear visual focal point above the five-poster rail.
- Added stronger vertical rhythm, fine divider rules and more deliberate spacing between the numbered homepage chapters (01–04).
- Removed blur filters from the individual film-page background artwork and banner image layer. Contrast and text readability are now handled by gradients and overlays while the source artwork remains sharp.
- Added a new **02 — BLOCKBUSTERS** section immediately after **01 — THE UNIVERSE**.
- Added five blockbuster slots: Jailer 2 is the first live, clickable title; four designed placeholders are ready for future movie posters.
- Added a dedicated **Jailer 2** movie page using the supplied poster and the details visible in the supplied reference screenshots.
- Renumbered the following homepage sections to **03 — OUR WORLD** and **04 — STAY IN THE FRAME**.
- Added a Blockbusters navigation link and optimized the new poster asset as WebP.


- Rebuilt every individual movie page around a full-width, premium cinematic banner. The movie poster, title, tagline, release details and primary play control now sit together as one layered hero composition.
- Added a stronger bottom fade and left-to-right contrast overlay so the banner content remains readable over varied movie artwork.
- Reworked the trailer screening room into a correctly proportioned 16:9 player with a dedicated side library. The side panel keeps the current official video visible and provides YouTube search shortcuts for teasers, songs, behind-the-scenes material, cast interviews and promos.
- Constrained the player to the available viewport height, preventing the video from being cropped; the video library stacks beneath the player on mobile.
- Kept the iframe lazy-mounted until play is pressed, and retained click-outside/Escape/close controls.

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

The existing GitHub Actions workflow in `.github/workflows/deploy.yml` is retained. Configure the repository's Pages source to **GitHub Actions**.

## Movie details note

Jailer 2 details are based on the supplied poster and screenshots. The reference screenshots show 2026, 2h 43m, Tamil +3, 16+, director Nelson Dilipkumar, and the synopsis/cast displayed in the movie overview. The poster does not show a specific calendar release date, so the page labels it as 2026 with date to be confirmed rather than inventing one.


## VER 11 update
- Reduced the Blockbusters section vertical whitespace substantially (compact ~80% spacing treatment).
- Reworked the section into a bold editorial composition inspired by the supplied reference: centered oversized headline above a centered five-title poster row.
- Added subtle diagonal graphic strokes behind the poster gallery.
- Preserved the Jailer 2 detail page and four ready-for-content placeholder slots.


## VER 12 — Precision cursor update

- Added a custom MMD precision cursor for desktop devices with a fine pointer.
- The cursor uses a crisp center point, a subtle luminous ring, and a small glint.
- The ring expands over links, buttons, cards, and form controls, and compresses on click.
- Uses pointer events and transform-only movement for a lightweight interaction.
- Native cursors and the custom cursor remain unchanged on touch devices.
- Respects reduced-motion preferences.


## VER 14 — Release-date ordering

All movie poster listings now use one shared chronological order based on the release dates already recorded in the project. Films with no confirmed calendar date are placed after dated releases. The hero poster rail and The Universe film collection both use this same sorted list; individual movie routes and content remain unchanged.

Current order:
1. Ramayana — 5 November 2026
2. Yeh Prem Mol Liya — 27 November 2026
3. Avengers: Doomsday — 17 December 2026
4. Dune: Part Three — 18 December 2026
5. King — 24 December 2026
6. Jailer 2 — 2026, exact date not confirmed in the project data


## VER 14 changes
- Reduced large vertical gaps between the Universe, Blockbusters, Our World and Stay in the Frame sections by approximately 80%.
- Tightened the internal spacing of the manifesto, topics and contact layouts on desktop, tablet and mobile.
- Reworked the custom cursor to follow pointer events directly without a requestAnimationFrame queue or easing delay.
- Added a crisp mouse-arrow glyph inside the halo while retaining the MMD blue-white ring.


## VER 15 — Cinematic film video player

- Added a large cinematic preview header to every individual movie page, using the selected film's YouTube thumbnail when available and its supplied poster as a fallback.
- Added a prominent play control. Clicking it opens a theatre-style overlay player with YouTube playback, close button, Escape-key support, and an external YouTube link.
- The YouTube iframe is only mounted after the visitor presses play, keeping initial movie pages lighter.
- Added film video references for Jailer 2 (Sun Pictures), Ramayana (T-Series), Yeh Prem Mol Liya (Rajshri), Avengers: Doomsday (Marvel Studios), Dune: Part Three (Warner Bros. India), and KING (Red Chillies title reveal). KING is labelled as a title reveal/preview rather than misrepresented as a full trailer.
- Preserved the existing movie details, cast and crew sections, homepage collections, chronological ordering, cursor, and GitHub Pages workflow.

Video references are embedded from the respective publisher/channel uploads. YouTube playback availability and regional restrictions remain controlled by YouTube and the rights holders.


## VER 16 — Premium film banners and screening-room library

All individual film pages now share a full-bleed banner treatment with a softened cinematic background, a lower-edge fade, poster and film information overlaid in the same hero, and a prominent play control. The player overlay uses a responsive 16:9 frame with a side panel of YouTube discovery shortcuts for additional film material. The side shortcuts open YouTube search results for the selected film; only the currently mapped official video is embedded directly because additional video IDs have not been configured in the project data.


## VER 18 — cinematic overview transition and ticket booking actions

- Added a deeper bottom fade to each individual film banner so the background image transitions smoothly into the Overview section instead of ending abruptly.
- Added layered radial lighting and a subtle top wash to the Overview/story area for a more cinematic transition.
- Replaced the single “View Film Details” action with two dedicated ticket actions: Book on BookMyShow and Book on District.
- BookMyShow buttons open each film's configured BookMyShow listing; Jailer 2 falls back to the BookMyShow movie discovery page because a film-specific listing is not configured.
- District buttons open District's official movie-ticket page.
- Kept the Explore More Films action and added compact two-column booking controls on mobile.
