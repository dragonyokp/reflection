const $ = (selector) => document.querySelector(selector);

const BLOCKS = [
  { id: 'articleTitle', name: 'หัวข้อบทความ', note: 'หัวเรื่อง Reflection', mini: 'title', make: () => `<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6 mb-5">\n            <h2 class="news__subtitle mb-4"></h2>\n        </div>\n    </div>\n</div>` },
  { id: 'audio', name: 'เสียงประกอบ', note: 'Audio player', mini: 'audio', make: () => `<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6 mb-5">\n            <audio controls="controls" src="###"></audio>\n        </div>\n    </div>\n</div>` },
  { id: 'video', name: 'วิดีโอประกอบ', note: 'Video player', mini: 'audio', make: () => `<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6 mb-5">\n            <video controls="controls" src="###"></video>\n        </div>\n    </div>\n</div>` },
  { id: 'textBlock', name: 'ข้อความในคอลัมน์กลาง', note: 'ย่อหน้าใน container', mini: 'text', make: () => `<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n            <p></p>\n            <p></p>\n        </div>\n    </div>\n</div>` },
  { id: 'headingSection', name: 'หัวข้อย่อยและเนื้อหา', note: 'หัวข้อ h4 พร้อมย่อหน้า', mini: 'title', make: () => `<div class="container">\n    <div class="row justify-content-center mb-5">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n            <h4></h4>\n            <p></p>\n            <p></p>\n            <p class="mb-0"></p>\n        </div>\n    </div>\n</div>` },
  { id: 'centerImage', name: 'รูปภาพจัดกลาง', note: 'Figure · img-fluid · my-5', mini: 'image', make: () => `<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n            <figure class="text-center my-5"><img class="img-fluid" src="###"></figure>\n        </div>\n    </div>\n</div>` },
  { id: 'wideBanner', name: 'รูปใหญ่บนแถบพื้นหลัง', note: 'bg-split-news-big-image', mini: 'banner', make: () => `<div class="bg-split-news-big-image">\n    <div class="container">\n        <div class="row justify-content-center">\n            <div class="col-xl-10 col-xxl-8 mb-5">\n                <img src="###" class="w-100">\n            </div>\n        </div>\n    </div>\n</div>` },
  { id: 'greenBand', name: 'แถบไล่สีเขียวพร้อมข้อความ', note: 'bg-green-gradient-vertical', mini: 'green', make: () => `<div class="bg-green-gradient-vertical mb-md-6 mb-5 pb-md-6 pb-5">\n    <div class="container">\n        <div class="row justify-content-center">\n            <div class="col-md-10 col-xl-8 col-xxl-6">\n                <p class="text-white"></p>\n            </div>\n        </div>\n    </div>\n</div>` },
  { id: 'splitImage', name: 'ข้อความคู่กับรูปด้านขวา', note: 'แถบเทา · ข้อความซ้าย · รูปขวา', mini: 'split', make: () => `<div class="bg-light-grey container-fluid my-5 px-0">\n    <div class="row justify-content-end no-gutters">\n        <div class="bg-split-news-right col-lg-6 col-xl-5 order-lg-2 py-5">\n            <div class="align-items-center d-flex h-100 justify-content-center p-2 p-lg-5">\n                <img class="img-fluid" src="###">\n            </div>\n        </div>\n        <div class="align-self-center col-lg-6 order-lg-1">\n            <div class="pl-xl-0 px-3 px-md-5 py-5">\n                <p class="mb-0"></p>\n            </div>\n        </div>\n    </div>\n</div>` },
  { id: 'twoColumnMedia', name: 'สองคอลัมน์พร้อมหัวข้อและไอคอน', note: 'row · col-md-6 · media', mini: 'columns', make: () => `<div class="container">\n    <div class="row justify-content-center mb-5">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n            <div class="row">\n                <div class="col-md-6">\n                    <div class="media align-items-center mb-4">\n                        <img src="###" width="50" class="mr-3">\n                        <div class="media-body"><h4 class="mt-0 mb-0"></h4></div>\n                    </div>\n                    <p></p>\n                    <p class="mb-0"></p>\n                </div>\n                <div class="col-md-6">\n                    <div class="media align-items-center mb-4">\n                        <img src="###" width="50" class="mr-3">\n                        <div class="media-body"><h4 class="mt-0 mb-0"></h4></div>\n                    </div>\n                    <p class="mb-0"></p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>` },
  { id: 'imagePair', name: 'รูปภาพสองคอลัมน์', note: 'รูปคู่ใน row · col-md-6', mini: 'pair', make: () => `<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n            <div class="row">\n                <div class="col-md-6">\n                    <figure class="text-center my-5"><img class="img-fluid" src="###"></figure>\n                </div>\n                <div class="col-md-6">\n                    <figure class="text-center my-5"><img class="img-fluid" src="###"></figure>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>` },
  { id: 'quote', name: 'ข้อความอ้างอิง', note: 'blockquote', mini: 'quote', make: () => `<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n            <blockquote></blockquote>\n        </div>\n    </div>\n</div>` }
];

let structure = [];
let nextId = 1;
let dragging = null;
let codeIsVisible = false;

function blockInfo(id) {
  return BLOCKS.find((block) => block.id === id);
}

function makeMini(type) {
  const mini = document.createElement('span');
  mini.className = `mini mini-${type}`;
  mini.setAttribute('aria-hidden', 'true');
  const count = type === 'columns' || type === 'pair' || type === 'split' ? 2 : type === 'audio' ? 3 : type === 'quote' ? 1 : 3;
  for (let i = 0; i < count; i++) mini.append(document.createElement('i'));
  return mini;
}

function renderLibrary() {
  const library = $('#blockLibrary');
  library.replaceChildren();
  $('#paletteCount').textContent = `${BLOCKS.length} แบบ`;
  for (const block of BLOCKS) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'library-card';
    card.draggable = true;
    card.dataset.blockId = block.id;
    const text = document.createElement('span');
    text.innerHTML = '<span class="library-title"></span><span class="library-desc"></span>';
    text.querySelector('.library-title').textContent = block.name;
    text.querySelector('.library-desc').textContent = block.note;
    const add = document.createElement('span');
    add.className = 'add-block';
    add.setAttribute('aria-hidden', 'true');
    add.textContent = '+';
    card.append(makeMini(block.mini), text, add);
    card.addEventListener('click', () => insertBlock(block.id));
    card.addEventListener('dragstart', (event) => {
      dragging = { kind: 'library', blockId: block.id };
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData('text/plain', block.id);
    });
    card.addEventListener('dragend', () => { dragging = null; clearDropMarks(); });
    library.append(card);
  }
}

function insertBlock(blockId, index = structure.length) {
  if (!blockInfo(blockId)) return;
  structure.splice(index, 0, { id: `block-${nextId++}`, type: blockId });
  renderStructure();
}

function makeVisual(type) {
  const visual = document.createElement('div');
  visual.className = 'structure-visual';
  visual.dataset.type = type;
  visual.setAttribute('aria-hidden', 'true');
  const count = type === 'twoColumnMedia' || type === 'imagePair' || type === 'splitImage' ? 2 : type === 'audio' || type === 'video' ? 3 : 4;
  for (let i = 0; i < count; i++) {
    const block = document.createElement('i');
    block.className = 'visual-block';
    visual.append(block);
  }
  return visual;
}

function makeControl(label, symbol, className, onClick, disabled = false) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `icon-button ${className || ''}`.trim();
  button.setAttribute('aria-label', label);
  button.title = label;
  button.textContent = symbol;
  button.disabled = disabled;
  button.addEventListener('click', (event) => { event.stopPropagation(); onClick(); });
  return button;
}

function renderStructure() {
  const canvas = $('#canvas');
  canvas.querySelectorAll('.structure-card').forEach((card) => card.remove());
  $('#emptyState').hidden = structure.length > 0;
  structure.forEach((item, index) => {
    const info = blockInfo(item.type);
    const card = document.createElement('article');
    card.className = 'structure-card';
    card.draggable = true;
    card.dataset.instanceId = item.id;
    card.addEventListener('dragstart', (event) => {
      dragging = { kind: 'canvas', instanceId: item.id };
      card.classList.add('is-dragging');
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', item.id);
    });
    card.addEventListener('dragend', () => { dragging = null; card.classList.remove('is-dragging'); clearDropMarks(); });

    const handle = document.createElement('span');
    handle.className = 'drag-handle';
    handle.textContent = '⠿';
    handle.setAttribute('aria-hidden', 'true');
    const name = document.createElement('span');
    name.className = 'structure-name';
    name.append(document.createTextNode(info.name));
    const subtitle = document.createElement('small');
    subtitle.className = 'structure-subtitle';
    subtitle.textContent = info.note;
    name.append(subtitle);
    const controls = document.createElement('div');
    controls.className = 'structure-controls';
    controls.append(
      makeControl('เลื่อนขึ้น', '↑', '', () => moveBlock(index, -1), index === 0),
      makeControl('เลื่อนลง', '↓', '', () => moveBlock(index, 1), index === structure.length - 1),
      makeControl('ลบส่วนนี้', '×', 'remove', () => { structure.splice(index, 1); renderStructure(); })
    );
    card.append(handle, name, makeVisual(item.type), controls);
    canvas.append(card);
  });
  $('#structureCount').textContent = `${structure.length} ส่วน`;
  $('#canvasStatus').textContent = structure.length ? `มี ${structure.length} ส่วน · ลากเพื่อเรียงลำดับ หรือใช้ปุ่มลูกศร` : 'ยังไม่มีส่วนประกอบ';
  $('#clearBtn').disabled = structure.length === 0;
  $('#exportBtn').disabled = structure.length === 0;
  if (codeIsVisible) updateCode();
}

function moveBlock(index, direction) {
  const destination = index + direction;
  if (destination < 0 || destination >= structure.length) return;
  [structure[index], structure[destination]] = [structure[destination], structure[index]];
  renderStructure();
}

function clearDropMarks() {
  document.querySelectorAll('.drop-before,.drop-after').forEach((card) => card.classList.remove('drop-before', 'drop-after'));
  $('#canvas').classList.remove('is-over');
}

function dropIndex(event) {
  const card = event.target.closest('.structure-card');
  if (!card) return structure.length;
  const rect = card.getBoundingClientRect();
  const idx = structure.findIndex((item) => item.id === card.dataset.instanceId);
  return idx + (event.clientY > rect.top + rect.height / 2 ? 1 : 0);
}

$('#canvas').addEventListener('dragover', (event) => {
  if (!dragging) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = dragging.kind === 'library' ? 'copy' : 'move';
  $('#canvas').classList.add('is-over');
  clearDropMarks();
  $('#canvas').classList.add('is-over');
  const card = event.target.closest('.structure-card');
  if (card) {
    const rect = card.getBoundingClientRect();
    card.classList.add(event.clientY > rect.top + rect.height / 2 ? 'drop-after' : 'drop-before');
  }
});

$('#canvas').addEventListener('dragleave', (event) => {
  if (!$('#canvas').contains(event.relatedTarget)) clearDropMarks();
});

$('#canvas').addEventListener('drop', (event) => {
  if (!dragging) return;
  event.preventDefault();
  const targetIndex = dropIndex(event);
  if (dragging.kind === 'library') {
    insertBlock(dragging.blockId, targetIndex);
  } else {
    const from = structure.findIndex((item) => item.id === dragging.instanceId);
    if (from >= 0) {
      const [item] = structure.splice(from, 1);
      const adjustedIndex = targetIndex > from ? targetIndex - 1 : targetIndex;
      structure.splice(Math.max(0, Math.min(adjustedIndex, structure.length)), 0, item);
      renderStructure();
    }
  }
  dragging = null;
  clearDropMarks();
});

function updateCode() {
  $('#htmlOutput').value = structure.map((item) => blockInfo(item.type).make()).join('\n\n');
}

$('#exportBtn').addEventListener('click', () => {
  codeIsVisible = true;
  updateCode();
  $('#outputPanel').hidden = false;
  $('#outputPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$('#clearBtn').addEventListener('click', () => {
  structure = [];
  codeIsVisible = false;
  $('#outputPanel').hidden = true;
  renderStructure();
});

$('#copyBtn').addEventListener('click', async () => {
  const button = $('#copyBtn');
  try {
    await navigator.clipboard.writeText($('#htmlOutput').value);
    button.textContent = 'คัดลอกแล้ว ✓';
  } catch {
    $('#htmlOutput').select();
    document.execCommand('copy');
    button.textContent = 'คัดลอกแล้ว ✓';
  }
  window.setTimeout(() => { button.textContent = 'คัดลอก HTML'; }, 1600);
});

$('#downloadBtn').addEventListener('click', () => {
  const blob = new Blob([$('#htmlOutput').value], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'reflection-structure.html';
  link.click();
  URL.revokeObjectURL(url);
});

renderLibrary();
renderStructure();
