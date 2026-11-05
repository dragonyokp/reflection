# Reflection Structure Builder

Static browser tool for assembling Bangchak Reflection CMS HTML structures. The left library is divided into article headings, highlight image patterns, and content patterns. Drag patterns into the right canvas, reorder or remove them, then copy or download the resulting HTML.

## Current heading patterns

- `Subtitle`: heading only.
- `Audio player`: audio only.
- `Subtitle + Audio`: combined heading and audio block.
- If `Subtitle` and `Audio player` are placed next to each other, the exported HTML combines them into the `Subtitle + Audio` wrapper. Either order on the canvas is accepted; the exported code keeps the heading before the audio player.

## Current highlight pattern

- One `Highlight + text` block is available. In the canvas, select image-before-text or text-before-image. Export creates the corresponding CMS wrapper and leaves a `highlight.webp` path placeholder for the real asset path.

The canvas uses sample text and visual placeholders to show each layout. Exported text elements contain `Lorem....` for the subtitle and empty content slots for future patterns. The audio source uses the requested path pattern with `#####` placeholders. Fill in the real asset path before using the code.

Additional highlight and content patterns will be added as their source structures are specified. The tool does not analyze Figma or make automatic layout decisions.

## Publish with GitHub Pages

1. Upload `index.html`, `style.css`, and `app.js` to the repository root.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the Pages URL when GitHub reports the deployment is ready.

The builder has no account connection, API token, or external AI requirement. It runs in the user's browser.
