# Reflection Studio

Static browser app intended for GitHub Pages. It accepts a Word document, images, audio/video, and a Figma URL or screenshot; it prepares editable CMS HTML and a preview in the browser.

## Publish with GitHub Pages

1. Create a GitHub repository named `reflection-studio` (or use your team's existing repository).
2. Upload `index.html`, `style.css`, and `app.js` to the repository root.
3. In the repository, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. GitHub will show the published `https://<account>.github.io/reflection-studio/` URL in the Pages settings.

This app is client-side only. The Word file is read in the browser; the Figma URL is currently retained as a reference input and is not fetched or inspected automatically. A screenshot can be uploaded as reference. The generated HTML uses placeholder CMS paths (`YYYY/MM/article-slug`) that must be replaced with the final Reflection asset directory before publishing.

## Current prototype limits

- DOCX text/paragraphs are read with Mammoth.js from jsDelivr.
- Media are sorted by `highlight`, then `quote-N`; unnamed photos follow their selected order.
- This prototype does not call an AI service, parse Figma files, or upload assets to Bangchak CMS.
- Review layout and asset paths before publishing the HTML.
