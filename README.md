# Reflection Studio

`index.html` is the single entry point for the Reflection tool. The editor combines blank-page creation, full-page article templates, canvas editing, and HTML export in one workspace. Add and reorder headings, text, images, quotes, split image-and-text sections, and dividers; edit the preview directly; then copy or download the generated HTML from the same editor.

The Templates gallery shows seven distinct full-page Bangchak Reflections layouts. Category filters and card metadata have been removed. The editor interface uses a minimum 18px size for readable text; only the tiny article-page mockups inside template previews stay scaled down to show a full page.

MP3-to-MP4 audio conversion runs in the browser. The FFmpeg core downloads from jsDelivr on first use (about 31 MB); selected audio files are not uploaded.

## Files to publish on GitHub Pages

Upload these files and folders to the repository root:

- `index.html` — main page
- `studio.html` — direct entry to the same tool
- `studio.css`
- `studio.js`
- `structure-builder.html` — sends old bookmarks to `index.html`
- `vendor/ffmpeg/ffmpeg.js`
- `vendor/ffmpeg/814.ffmpeg.js`

Keep the `vendor/ffmpeg/` folder structure. The old standalone structure builder scripts (`app.js` and `style.css`) are no longer needed for the unified tool.

In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
