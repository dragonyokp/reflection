# Reflection Structure Builder

Static browser tool for assembling Bangchak Reflection CMS HTML structures. Choose blocks from the left library, drag them into the canvas, view a page-like preview with sample Lorem text and image placeholders, reorder or remove blocks, then copy or download the combined HTML.

## Included structure blocks

- Reflection article title
- Audio and video player slots
- Center-column paragraphs and section heading groups
- Centered image figures
- Wide image banner using `bg-split-news-big-image`
- Green gradient text band using `bg-green-gradient-vertical`
- Text-left and image-right split section
- Two-column `.media` heading and icon layout
- Two images in a two-column row
- Blockquote

The on-screen previews use sample Lorem text and image placeholders so the layout is visible. The exported HTML contains empty text elements and `###` media/image source placeholders. Fill in article text and real CMS asset paths after export. The tool does not analyze Figma or place content automatically; it is an explicit structure builder.

## Publish with GitHub Pages

1. Upload `index.html`, `style.css`, and `app.js` to the repository root.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the Pages URL when GitHub reports the deployment is ready.

The builder has no account connection, API token, or external AI requirement. It runs in the user's browser.
