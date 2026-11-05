# Reflection Structure Builder

Static browser tool for assembling Bangchak Reflection CMS HTML structures. The left library is divided into article headings, highlight image patterns, and content patterns. Drag patterns into the right canvas, reorder or remove them, then copy or download the resulting HTML.

## Current heading patterns

- `Subtitle`: heading only.
- `Audio player`: audio only.
- `Subtitle + Audio`: combined heading and audio block.
- If `Subtitle` and `Audio player` are placed next to each other, the exported HTML combines them into the `Subtitle + Audio` wrapper. Either order on the canvas is accepted; the exported code keeps the heading before the audio player.

## Current highlight and content patterns

- `Highlight` is an image-only block. Place it before or after the content blocks on the canvas; export preserves that order and wraps the image and text rows in the shared Reflection container.
- `Highlight + พื้นหลังเขียว + ข้อความ` exports the wide image followed by a green gradient band with an empty white-text paragraph.
- `Highlight + พื้นหลังเขียว` exports the same wide image and green background band without a paragraph.
- `หัวข้อ` exports an empty `<h4></h4>` element.
- `Text` exports an empty `<p></p>` element. The canvas preview shows Lorem text as a visual guide.
- `รูป Quote` inserts an inline `<figure class="text-center my-5">` image. Consecutive `รูป Quote` blocks automatically appear side by side in the canvas and export as one row of two or three columns. Quote images are numbered `quote-1.webp`, `quote-2.webp`, and so on in exported order. A paragraph directly before quote imagery gets `mb-0`.
- `รูป Quote ขวา + เนื้อหาซ้าย` and `รูป Quote ซ้าย + หัวข้อและเนื้อหาขวา` use the full-width split quote layout from the supplied Reflection samples. The photo and caption sit on the green half; the copy is on the light half. Their quote image numbering shares the sequence with inline quote images.
- `รูปซ้าย + เนื้อหาขวา` outputs the full-width split media layout with a quote image on the left green panel and two empty paragraphs on the right.
- `หัวข้อและเนื้อหาซ้าย + รูปขวา` outputs the mirrored split media layout with an empty `<h4>`, two empty paragraphs, and a quote image on the right green panel.
- Both split media patterns are standalone full-width sections and share the sequential `quote-N.webp` numbering with inline and split quote images.
- Consecutive content blocks are grouped in one center-column layout. When text precedes a highlight, the text row is emitted first; when the highlight precedes text, the image row is emitted first.

The canvas uses sample text and visual placeholders to show each layout. Exported subtitle code uses `Lorem....`; content heading and paragraph elements are empty for later editing. Standard audio and image sources use `#####` path placeholders. The two green-background highlight patterns retain the supplied `/storage/newsroom/refaction/2026/10/green-miles/highlight.webp` path; change it when using a different article.

Additional highlight and content patterns will be added as their source structures are specified. The tool does not analyze Figma or make automatic layout decisions.

## Publish with GitHub Pages

1. Upload `index.html`, `style.css`, and `app.js` to the repository root.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the Pages URL when GitHub reports the deployment is ready.

The builder has no account connection, API token, or external AI requirement. It runs in the user's browser.
