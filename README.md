# Reflection Studio

`index.html` is the single entry point for designing a complete Reflection page and exporting the real HTML from the same workspace.

The canvas is a 1000px-wide desktop design surface. Add and reorder headings, text, photos, quote panels, image-and-copy layouts, highlight bands, links, two-column sections, and spacing. Select an image and drag its corner or side handles to resize it; the inspector shows the resulting width in pixels. Exported HTML keeps the canvas width at a minimum of 1000px and writes image widths and original aspect ratios as pixel values to preserve the selected scale. Text size, alignment, color, section background, spacing, image fit, and corner radius can be adjusted before export. Large raster images are converted to transparent-capable WebP at a resolution suited to the 1000px layout so exports stay responsive. Drafts are stored in IndexedDB to avoid the small localStorage size limit; localStorage remains as a fallback for browsers without IndexedDB.

The Templates gallery contains seven distinct full-page Bangchak Reflections layouts. MP3-to-MP4 conversion runs in the browser; its FFmpeg core downloads from jsDelivr on first use (about 31 MB), and selected audio files are not uploaded.

## Files to publish on GitHub Pages

Upload these files and folders to the repository root:

- `index.html` — main page
- `studio.html` — redirects older bookmarks to the main tool
- `studio.css`
- `studio.js`
- `structure-builder.html` — redirects older bookmarks to `index.html`
- `vendor/ffmpeg/ffmpeg.js`
- `vendor/ffmpeg/814.ffmpeg.js`

Keep the `vendor/ffmpeg/` folder structure. The old standalone structure builder scripts (`app.js` and `style.css`) are not used by the unified tool.

In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
