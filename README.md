# Reflection Studio

`index.html` is the single entry point for designing a complete Reflection page and exporting the real HTML from the same workspace.

The canvas is a 1000px-wide desktop design surface. Add and reorder headings, text, photos, quote panels, image-and-copy layouts, highlight bands, links, two-column sections, and spacing from the grouped, scrollable design-tool rail. Choose an image from its canvas placeholder or the inspector, then drag its handles to resize it while preserving its original aspect ratio. Export real HTML or a full-page PNG; the HTML keeps a minimum width of 1000px and embeds uploaded images. Large raster images are converted to transparent-capable WebP at a resolution suited to the 1000px layout so exports stay responsive. Drafts are stored in IndexedDB to avoid the small localStorage size limit; localStorage remains as a fallback for browsers without IndexedDB.

The Templates gallery contains seven distinct full-page Bangchak Reflections layouts. Audio conversion runs in the browser and exports either MP3 or MP4 in stereo (two channels); its FFmpeg core downloads from jsDelivr on first use (about 31 MB), and selected audio files are not uploaded.

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
