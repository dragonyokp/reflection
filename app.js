const $ = (selector) => document.querySelector(selector);
let files = [];

const dropzone = $('#dropzone');
const picker = $('#fileInput');
const fileList = $('#fileList');

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function fileKind(file) {
  if (file.type.startsWith('image/')) return 'IMG';
  if (file.type.startsWith('audio/')) return 'AUD';
  if (file.type.startsWith('video/')) return 'VID';
  if (/\.docx?$/i.test(file.name)) return 'DOC';
  return 'TXT';
}

function addFiles(incoming) {
  for (const file of incoming) {
    if (!files.some((item) => item.name === file.name && item.size === file.size)) files.push(file);
  }
  renderFiles();
}

function renderFiles() {
  fileList.replaceChildren();
  files.forEach((file, index) => {
    const row = document.createElement('div');
    row.className = 'file-row';
    row.innerHTML = `<span class="file-type">${fileKind(file)}</span><span class="file-meta"><b></b><small>${formatSize(file.size)}</small></span><button class="remove-file" aria-label="ลบไฟล์">×</button>`;
    row.querySelector('b').textContent = file.name;
    row.querySelector('button').addEventListener('click', () => {
      files.splice(index, 1);
      renderFiles();
    });
    fileList.append(row);
  });
}

$('#browseBtn').addEventListener('click', () => picker.click());
picker.addEventListener('change', (event) => addFiles(event.target.files));
dropzone.addEventListener('click', (event) => {
  if (!event.target.closest('button')) picker.click();
});
dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropzone.classList.add('dragover');
});
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropzone.classList.remove('dragover');
  addFiles(event.dataTransfer.files);
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function safeFileName(name) {
  return name.replace(/[\\/]/g, '').replace(/["<>]/g, '');
}

function cmsPath(file) {
  return `/storage/newsroom/refaction/YYYY/MM/article-slug/${safeFileName(file.name)}`;
}

function imageBlocks(images) {
  return images.map((file, index) => {
    const label = index === 0 ? 'highlight (ภาพแรก)' : `quote-${index} (ตามลำดับไฟล์)`;
    const src = cmsPath(file);
    if (index === 0) {
      return `<!-- ${label} -->\n<div class="bg-split-news-big-image">\n    <div class="container">\n        <div class="row justify-content-center">\n            <div class="col-xl-10 col-xxl-8 mb-5">\n                <img src="${src}" class="w-100">\n            </div>\n        </div>\n    </div>\n</div>`;
    }
    return `<!-- ${label} -->\n<figure class="text-center mb-5"><img class="img-fluid" src="${src}"></figure>`;
  });
}

async function extractDocx(file) {
  if (!window.mammoth) throw new Error('โหลดตัวอ่านไฟล์ Word ไม่สำเร็จ กรุณาตรวจการเชื่อมต่ออินเทอร์เน็ตแล้วรีเฟรชหน้า');
  const result = await window.mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
  return result.value;
}

function paragraphsFromPlainText(text) {
  return text.split(/\r?\n\s*\r?\n/).map((part) => part.trim()).filter(Boolean)
    .map((part) => `<p>${escapeHtml(part).replace(/\r?\n/g, '<br>')}</p>`);
}

async function getArticleHtml() {
  const docxFiles = files.filter((file) => /\.docx$/i.test(file.name));
  const legacyDocs = files.filter((file) => /\.doc$/i.test(file.name));
  if (legacyDocs.length) throw new Error('ไฟล์ .doc รุ่นเก่าอ่านไม่ได้ กรุณาบันทึกเป็น .docx หรือวางข้อความในช่องข้อความบทความ');

  let content = $('#articleText').value.trim();
  if (!content && docxFiles.length) {
    const parts = [];
    for (const file of docxFiles) parts.push(await extractDocx(file));
    content = parts.join('\n');
  }
  if (!content) throw new Error('ยังไม่มีข้อความบทความ: เพิ่มไฟล์ Word .docx หรือวางข้อความที่คัดลอกจาก Figma ในช่อง “ข้อความบทความ” ก่อนสร้าง HTML');

  const looksLikeHtml = /<(p|h[1-6]|ul|ol|blockquote)\b/i.test(content);
  return looksLikeHtml ? content : paragraphsFromPlainText(content).join('\n');
}

function getTitle(articleHtml) {
  const explicit = $('#articleTitle').value.trim();
  if (explicit) return explicit;
  const temporary = document.createElement('div');
  temporary.innerHTML = articleHtml;
  return temporary.querySelector('h1,h2,h3')?.textContent.trim() || '';
}

function mediaMarkup(media) {
  return media.map((file) => {
    const source = cmsPath(file);
    if (file.type.startsWith('audio/')) return `<audio controls="controls" src="${source}"></audio>`;
    if (file.type.startsWith('video/')) return `<video controls class="w-100" src="${source}"></video>`;
    return '';
  }).filter(Boolean).join('\n');
}

function createOutput(title, articleHtml) {
  const pictures = files.filter((file) => file.type.startsWith('image/'));
  const media = files.filter((file) => file.type.startsWith('audio/') || file.type.startsWith('video/'));
  const introMedia = mediaMarkup(media);
  const imageHtml = imageBlocks(pictures);
  const lines = articleHtml.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const paragraphs = [];
  let quoteIndex = 1;
  for (let index = 0; index < lines.length; index++) {
    paragraphs.push(lines[index]);
    const nextImageAt = Math.ceil((quoteIndex * lines.length) / (imageHtml.length || 1));
    if (quoteIndex < imageHtml.length && (index + 1 >= nextImageAt || index === lines.length - 1)) {
      paragraphs.push(imageHtml[quoteIndex]);
      quoteIndex++;
    }
  }
  const content = paragraphs.map((line) => `            ${line}`).join('\n');
  const highlight = imageHtml[0] ? `${imageHtml[0]}\n\n` : '';
  return `<!-- Reflection: ${escapeHtml(title)} -->\n<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6 mb-5">\n            <h2 class="news__subtitle">${escapeHtml(title)}</h2>\n            ${introMedia || '<!-- เพิ่ม audio/video ที่นี่ หากบทความมีไฟล์ -->'}\n        </div>\n    </div>\n</div>\n\n${highlight}<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n${content}\n        </div>\n    </div>\n</div>\n\n<!-- แก้ YYYY/MM/article-slug ในพาธรูปและสื่อให้ตรงกับโฟลเดอร์ CMS ก่อนนำขึ้นเว็บไซต์ -->\n`;
}

async function generate() {
  const button = $('#generateBtn');
  button.disabled = true;
  button.textContent = 'กำลังอ่านไฟล์…';
  try {
    const articleHtml = await getArticleHtml();
    const title = getTitle(articleHtml);
    if (!title) throw new Error('ยังไม่มีชื่อบทความ กรุณากรอกชื่อบทความก่อนสร้าง HTML');

    const imageCount = files.filter((file) => file.type.startsWith('image/')).length;
    const mediaCount = files.filter((file) => file.type.startsWith('audio/') || file.type.startsWith('video/')).length;
    $('#htmlOutput').value = createOutput(title, articleHtml);
    $('#resultSummary').textContent = `มีข้อความบทความแล้ว · ${imageCount} ภาพ (ภาพแรกเป็น highlight) · ${mediaCount} ไฟล์เสียง/วิดีโอ · พาธสื่อยังเป็นตัวอย่าง`;
    $('#resultPanel').hidden = false;
    $('#previewFrame').srcdoc = `<!doctype html><meta charset="utf-8"><style>body{font:16px/1.8 Arial,sans-serif;color:#233;margin:0}p{margin:0 0 1.4em}.container{max-width:900px;margin:auto;padding:24px}.row{display:flex;justify-content:center}.col-md-10{width:78%}.w-100{width:100%}.text-center{text-align:center}figure{margin:2em auto}.img-fluid{max-width:100%}h2{font-size:24px}.bg-split-news-big-image{background:#f3f5f2;padding:30px 0;margin:25px 0}</style>${$('#htmlOutput').value}`;
    $('#resultPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    alert(error.message);
  } finally {
    button.disabled = false;
    button.innerHTML = 'จัดเนื้อหาและสร้าง HTML <span>→</span>';
  }
}

$('#generateBtn').addEventListener('click', generate);
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
document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((item) => item.classList.remove('selected'));
  tab.classList.add('selected');
  $('#codePane').hidden = tab.dataset.pane !== 'codePane';
  $('#previewPane').hidden = tab.dataset.pane !== 'previewPane';
}));
