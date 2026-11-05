# Reflection Structure Builder

Static browser tool for assembling Bangchak Reflection CMS HTML structures. The left library is divided into article headings, highlight image patterns, and content patterns. Drag patterns into the right canvas, reorder or remove them, then copy or download the resulting HTML.

## Current heading patterns

- `Subtitle`: heading only.
- `Audio player`: audio only.
- `Subtitle + Audio`: combined heading and audio block.
- If `Subtitle` and `Audio player` are placed next to each other, the exported HTML combines them into the `Subtitle + Audio` wrapper. Either order on the canvas is accepted; the exported code keeps the heading before the audio player.

## Current highlight and content patterns

- `Highlight` is an image-only block. Place it before or after the content blocks on the canvas; export preserves that order and wraps the image and text rows in the shared Reflection container.
- `หัวข้อ` exports an empty `<h4></h4>` element.
- `Text` exports an empty `<p></p>` element. The canvas preview shows Lorem text as a visual guide.
- Consecutive content blocks are grouped in one center-column layout. When text precedes a highlight, the text row is emitted first; when the highlight precedes text, the image row is emitted first.

The canvas uses sample text and visual placeholders to show each layout. Exported subtitle code uses `Lorem....`; content heading and paragraph elements are empty for later editing. Audio and image sources use the requested path patterns with `#####` placeholders. Fill in the real asset paths before using the code.

Additional highlight and content patterns will be added as their source structures are specified. The tool does not analyze Figma or make automatic layout decisions.

## Publish with GitHub Pages

1. Upload `index.html`, `style.css`, and `app.js` to the repository root.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the Pages URL when GitHub reports the deployment is ready.

The builder has no account connection, API token, or external AI requirement. It runs in the user's browser.
