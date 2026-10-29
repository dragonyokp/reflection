const $ = (selector) => document.querySelector(selector);
let images = [];
let documents = [];

function sizeLabel(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function appendUnique(target, incoming) {
  for (const file of incoming) {
    if (!target.some((item) => item.name === file.name && item.size === file.size)) target.push(file);
  }
}

function renderList(target, container, type) {
  container.replaceChildren();
  target.forEach((file, index) => {
    const name = type === 'image' ? (index === 0 ? 'highlight.webp' : `quote-${index}.webp`) : file.name;
    const row = document.createElement('div');
    row.className = 'file-row';
    row.innerHTML = `<span class="file-type">${type === 'image' ? 'IMG' : 'DOC'}</span><span class="file-meta"><b></b><small>${sizeLabel(file.size)}</small></span>${type === 'image' ? '<span class="file-output-name"></span>' : ''}<button class="remove-file" aria-label="ลบไฟล์">×</button>`;
    row.querySelector('.file-meta b').textContent = file.name;
    row.querySelector('.file-output-name')?.replaceChildren(document.createTextNode(name));
    row.querySelector('.remove-file').addEventListener('click', () => {
      target.splice(index, 1);
      renderList(target, container, type);
    });
    container.append(row);
  });
}

function setupDropzone(zone, input, target, container, type) {
  const browse = zone.querySelector('button');
  browse.addEventListener('click', (event) => { event.stopPropagation(); input.click(); });
  zone.addEventListener('click', () => input.click());
  input.addEventListener('change', (event) => {
    appendUnique(target, event.target.files);
    renderList(target, container, type);
    input.value = '';
  });
  zone.addEventListener('dragover', (event) => { event.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (event) => {
    event.preventDefault();
    zone.classList.remove('dragover');
    const accepted = [...event.dataTransfer.files].filter((file) => type === 'image' ? file.type.startsWith('image/') : /\.(docx|doc|txt|mp3|mp4|m4a|wav)$/i.test(file.name));
    appendUnique(target, accepted);
    renderList(target, container, type);
  });
}

setupDropzone($('#imageDropzone'), $('#imageInput'), images, $('#imageList'), 'image');
setupDropzone($('#docDropzone'), $('#docInput'), documents, $('#docList'), 'doc');

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

async function readDocument(file) {
  if (/\.docx$/i.test(file.name)) {
    if (!window.mammoth) throw new Error('ไฟล์ Word reader โหลดไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วรีเฟรชหน้า');
    return (await window.mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() })).value;
  }
  if (/\.(txt|rtf)$/i.test(file.name)) {
    const text = await file.text();
    return text.split(/\r?\n\s*\r?\n/).filter((paragraph) => paragraph.trim()).map((paragraph) => `<p>${escapeHtml(paragraph.trim()).replace(/\r?\n/g, '<br>')}</p>`).join('\n');
  }
  if (/\.doc$/i.test(file.name)) throw new Error('ไฟล์ .doc รุ่นเก่าอ่านไม่ได้ กรุณาบันทึกเป็น .docx');
  return '';
}

function imagePath(index) {
  const name = index === 0 ? 'highlight.webp' : `quote-${index}.webp`;
  return `/storage/newsroom/refaction/###/###/###/${name}`;
}

function imageMarkup(index) {
  const src = imagePath(index);
  if (index === 0) return `<div class="bg-split-news-big-image">\n    <div class="container">\n        <div class="row justify-content-center">\n            <div class="col-xl-10 col-xxl-8 mb-5">\n                <img src="${src}" class="w-100">\n            </div>\n        </div>\n    </div>\n</div>`;
  return `<!-- quote-${index} -->\n<figure class="text-center my-5"><img class="img-fluid" src="${src}"></figure>`;
}

function normalizeSpacing(html) {
  let output = html.replace(/<figure\b([^>]*)class=(['"])([^'"]*\btext-center\b[^'"]*)\2([^>]*)>/gi, (tag, before, quote, classNames, after) => {
    const classes = classNames.split(/\s+/).filter(Boolean);
    if (!classes.includes('my-5')) classes.push('my-5');
    return `<figure${before}class=${quote}${classes.join(' ')}${quote}${after}>`;
  });
  output = output.replace(/(<p\b[^>]*class=(['"])([^'"]*\bmy-5\b[^'"]*)\2[^>]*>[\s\S]*?<\/p\s*>\s*)(<figure\b[^>]*class=(['"])[^'"]*\btext-center\b[^'"]*\5[^>]*>)/gi, (match, paragraph, quote, classNames, figureTag) => {
    const classes = classNames.split(/\s+/).filter(Boolean);
    if (!classes.includes('mb-0')) classes.push('mb-0');
    return `${paragraph.replace(`${quote}${classNames}${quote}`, `${quote}${classes.join(' ')}${quote}`)}${figureTag}`;
  });
  return output;
}

function weaveQuotes(articleHtml) {
  const parsed = new DOMParser().parseFromString(articleHtml, 'text/html');
  const blocks = [...parsed.body.childNodes]
    .filter((node) => node.nodeType === Node.ELEMENT_NODE || node.textContent.trim())
    .map((node) => node.nodeType === Node.ELEMENT_NODE ? node.outerHTML : `<p>${escapeHtml(node.textContent.trim())}</p>`)
    .filter(Boolean);
  if (!images.length) return blocks.join('\n');
  const result = [];
  const quoteCount = images.length - 1;
  let quote = 1;
  blocks.forEach((block, index) => {
    result.push(block);
    if (quote <= quoteCount) {
      const target = Math.ceil((quote * blocks.length) / (quoteCount + 1));
      if (index + 1 >= target) result.push(imageMarkup(quote++));
    }
  });
  while (quote <= quoteCount) result.push(imageMarkup(quote++));
  return result.join('\n');
}

async function generateHtml() {
  const button = $('#generateBtn');
  const docx = documents.filter((file) => /\.(docx|doc|txt|rtf)$/i.test(file.name));
  if (!docx.length) {
    alert('เพิ่มไฟล์ Word (.docx) ก่อนครับ ช่อง Figma ใช้เก็บลิงก์อ้างอิง แต่ยังดึงข้อความอัตโนมัติไม่ได้');
    return;
  }
  button.disabled = true;
  button.textContent = 'กำลังอ่านเอกสาร…';
  try {
    const parts = [];
    for (const file of docx) parts.push(await readDocument(file));
    const article = parts.filter(Boolean).join('\n');
    if (!article.trim()) throw new Error('ไม่พบข้อความในเอกสาร Word ที่เลือก');
    const media = documents.filter((file) => /\.(mp3|mp4|m4a|wav)$/i.test(file.name));
    const video = media.some((file) => /\.mp4$/i.test(file.name)) ? '<video controls="controls" src="###"></video>' : '';
    const audio = media.some((file) => /\.(mp3|m4a|wav)$/i.test(file.name)) ? '<audio controls="controls" src="###"></audio>' : '';
    const imagesHtml = images.length ? `${imageMarkup(0)}\n` : '';
    const body = weaveQuotes(article);
    const topMedia = [audio, video].filter(Boolean).join('\n');
    const output = `<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6 mb-5">\n            ${topMedia}\n        </div>\n    </div>\n</div>\n\n${imagesHtml}<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n${body.split(/\r?\n/).map((line) => `            ${line}`).join('\n')}\n        </div>\n    </div>\n</div>`;
    $('#htmlOutput').value = normalizeSpacing(output);
    $('#resultSummary').textContent = `${docx.length} ไฟล์ Word · ${images.length} ภาพ (highlight${images.length > 1 ? `, quote-1 ถึง quote-${images.length - 1}` : ''}) · ${media.length} ไฟล์เสียง/วิดีโอ`;
    $('#outputEmpty').hidden = true;
    $('#outputReady').hidden = false;
    $('#previewFrame').srcdoc = `<!doctype html><meta charset="utf-8"><style>body{font:16px/1.8 Arial,sans-serif;color:#25362b;margin:0}p{margin:0 0 1.4em}.container{max-width:900px;margin:auto;padding:24px}.row{display:flex;justify-content:center}.col-md-10{width:78%}.w-100{width:100%}.text-center{text-align:center}figure{margin:2em auto}.img-fluid{max-width:100%}.bg-split-news-big-image{background:#f4f8f3;padding:30px 0;margin:25px 0}</style>${$('#htmlOutput').value}`;
  } catch (error) {
    alert(error.message);
  } finally {
    button.disabled = false;
    button.innerHTML = 'สร้าง HTML <span>↗</span>';
  }
}

$('#generateBtn').addEventListener('click', generateHtml);
$('#copyBtn').addEventListener('click', async () => {
  await navigator.clipboard.writeText($('#htmlOutput').value);
  $('#copyBtn').textContent = 'คัดลอกแล้ว ✓';
  setTimeout(() => { $('#copyBtn').textContent = 'คัดลอก HTML'; }, 1700);
});
$('#downloadBtn').addEventListener('click', () => {
  const blob = new Blob([$('#htmlOutput').value], { type: 'text/html;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'reflection-content.html';
  link.click();
  URL.revokeObjectURL(link.href);
});
$('#downloadImagesBtn').addEventListener('click', async () => {
  if (!window.JSZip) {
    alert('ตัวสร้าง ZIP โหลดไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วรีเฟรชหน้า');
    return;
  }
  if (!images.length) {
    alert('ยังไม่มีรูปภาพให้ดาวน์โหลด');
    return;
  }
  const button = $('#downloadImagesBtn');
  button.disabled = true;
  button.textContent = 'กำลังจัดชื่อรูปภาพ…';
  try {
    const zip = new window.JSZip();
    for (let index = 0; index < images.length; index++) {
      const bitmap = await createImageBitmap(images[index]);
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      canvas.getContext('2d').drawImage(bitmap, 0, 0);
      const blob = await new Promise((resolve, reject) => canvas.toBlob((result) => result ? resolve(result) : reject(new Error('แปลงรูปภาพไม่สำเร็จ')), 'image/webp', 0.92));
      zip.file(index === 0 ? 'highlight.webp' : `quote-${index}.webp`, blob);
      bitmap.close();
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reflection-images.zip';
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (error) {
    alert(error.message || 'จัดไฟล์ภาพไม่สำเร็จ');
  } finally {
    button.disabled = false;
    button.textContent = 'ดาวน์โหลดรูปตามชื่อมาตรฐาน (.zip)';
  }
});
document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((item) => item.classList.remove('selected'));
  tab.classList.add('selected');
  $('#codePane').hidden = tab.dataset.pane !== 'codePane';
  $('#previewPane').hidden = tab.dataset.pane !== 'previewPane';
}));
