# MMD EXCLUSIVE — VER 5

A dark, cinematic entertainment website built with React 19, TypeScript, Vite 6, GSAP and Lucide React.

## What's new in VER 5
- Replaced the header emblem with a clean typographic **MMD** site logo.
- Removed the oversized footer banner and illuminated footer emblem; retained a compact text-and-social footer.
- Added researched film dossiers to all five individual film pages: release date, genres, language, formats, runtime/certificate where published, synopsis, cast and crew.
- Added direct BookMyShow detail links for each title.
- Compressed supplied movie posters from PNG to WebP, substantially reducing image payload size.
- Reduced background particle count and canvas pixel ratio, capped the animation at approximately 30fps, and paused it when the browser tab is hidden.
- Removed the continuously moving grain overlay to reduce unnecessary repainting and visual jitter.
- Updated favicon to an MMD monogram.
- Preserved hash-based routes for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The GitHub Pages deployment workflow is included in `.github/workflows/deploy.yml`. Set the repository's Pages source to **GitHub Actions**.

## Film routes
- `#/film/king`
- `#/film/ramayana`
- `#/film/yeh-prem-mol-liya`
- `#/film/avengers-doomsday`
- `#/film/dune-part-three`

## Film information sources
The following official BookMyShow listings were used for film metadata and linked from the corresponding film pages:
- King: https://in.bookmyshow.com/movies/mumbai/king/ET00455480
- Ramayana: https://in.bookmyshow.com/movies/mumbai/ramayana/ET00451914
- Avengers: Doomsday: https://in.bookmyshow.com/movies/mumbai/avengers-doomsday/ET00439706
- Yeh Prem Mol Liya: https://in.bookmyshow.com/movies/mumbai/yeh-prem-mol-liya/ET00496261
- Dune: Part Three: https://in.bookmyshow.com/movies/national-capital-region-ncr/dune-part-three/ET00491771

Dune's 2h 30m runtime and PG-13 label are included as shown in the user-provided reference image; BookMyShow's published listing is used for its release, genre, languages, synopsis, cast and crew. For King and Yeh Prem Mol Liya, runtime and certificate are marked "Not announced" because the referenced listings do not publish them.
