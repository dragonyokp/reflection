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
- `รูปภาพ` inserts an inline `<figure class="text-center my-5">` image. Dropping `รูปภาพ` onto an existing Quote card combines the images into a row of up to four columns (col-md-6 / col-md-4 / col-md-3 for 2 / 3 / 4 images). Dropping outside a card creates a separate card. Heading, Text and Blockquote blocks can be dropped onto the left/right insertion areas of a Quote card to add a text column. Quote images are numbered `quote-1.webp`, `quote-2.webp`, and so on in exported order. A paragraph directly before quote imagery gets `mb-0`.
- `รูป Quote ขวา + เนื้อหาซ้าย` and `รูป Quote ซ้าย + หัวข้อและเนื้อหาขวา` use the full-width split quote layout from the supplied Reflection samples. The photo and caption sit on the green half; the copy is on the light half. Their quote image numbering shares the sequence with inline quote images.
- `รูปซ้าย + เนื้อหาขวา` uses the original `bg-split-news-left` treatment: green fills the left half of the image column, with the image crossing onto the light-grey half; an empty `<h4>` and two empty paragraphs sit on the right.
- `หัวข้อและเนื้อหาซ้าย + รูปขวา` mirrors that treatment with `bg-split-news-right`, an empty `<h4>`, two empty paragraphs, and the image crossing the grey/green boundary.
- Both split media patterns are standalone full-width sections and share the sequential `quote-N.webp` numbering with inline and split quote images.
- Consecutive content blocks are grouped in one center-column layout. When text precedes a highlight, the text row is emitted first; when the highlight precedes text, the image row is emitted first.

The canvas uses sample text and visual placeholders to show each layout. Both split media patterns use green image placeholders in the library and canvas previews. No real sample photos are loaded. Exported HTML still contains the quote image path placeholder. Exported subtitle code uses `Lorem....`; content heading and paragraph elements are empty for later editing. Standard audio and image sources use `#####` path placeholders. All highlight variants use `/storage/newsroom/refaction/#####/#####/#####/highlight.webp`; fill in the actual article directory before publishing CMS content.

Additional highlight and content patterns will be added as their source structures are specified. The tool does not analyze Figma or make automatic layout decisions.

## Publish with GitHub Pages

1. Upload `index.html`, `style.css`, and `app.js` to the repository root.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the Pages URL when GitHub reports the deployment is ready.

The builder has no account connection, API token, or external AI requirement. It runs in the user's browser.

## Additional content patterns

- Icon heading: Bootstrap `.media` heading with an icon and paragraph, selectable as one or two columns.
- Quote card: `.card.card--quote.card--quote-green` with quotation icons and an empty bold quotation.
- Portrait quote: quote card with a sequential `quote-N.webp` image and speaker attribution; image can be on either side.
- Details popup: an article button linked to a unique `.modal--reflection` block. Modal markup is appended outside the article containers. The builder preview button opens a local example dialog; exported markup uses the original CMS Bootstrap modal attributes.
- Multiple speakers: two or three quotations and speaker names separated by `.hr-lg-dark-green` dividers.

All new article text fields are empty in exported HTML. Lorem content and green image placeholders appear only in the builder preview.

The final standalone image in a vertical content section uses `mt-5 mb-0`; intermediate images use `my-5`.

## Palette navigation

All library groups, including group 3 (content), are displayed as ordinary expanded sections without accordion controls. On desktop widths above 720px, the left palette is sticky below the top bar and its library scrolls internally. On narrower screens the palette stays in normal document flow. Article export is unchanged.
