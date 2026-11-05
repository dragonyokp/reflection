const $ = (selector) => document.querySelector(selector);

const BLOCKS = [
  { id: 'subtitle', group: 'heading', name: 'Subtitle', note: 'หัวข้อ Reflection', mini: 'subtitle', make: () => `<div class="container">\n    <div class="row justify-content-center mb-5">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n            <h2 class="news__subtitle">Lorem....</h2>\n        </div>\n    </div>\n</div>` },
  { id: 'audio', group: 'heading', name: 'Audio player', note: 'มีเฉพาะคลิปเสียง', mini: 'audio', make: () => `<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8 col-xxl-6 mb-5">\n\n            <audio controls="controls" src="/storage/newsroom/refaction/#####/#####/#####/Reflection-#####.mp4"></audio>\n\n        </div>\n    </div>\n</div>` },
  { id: 'subtitleAudio', group: 'heading', name: 'Subtitle + Audio', note: 'หัวข้อและเสียงในโครงเดียว', mini: 'subtitleAudio', make: () => `<div class="container">\n    <div class="row justify-content-center mb-5">\n        <div class="col-md-10 col-xl-8 col-xxl-6">\n            <h2 class="news__subtitle mb-4">Lorem....</h2>\n\n            <audio controls="controls" src="/storage/newsroom/refaction/#####/#####/#####/Reflection-#####.mp4"></audio>\n        </div>\n    </div>\n</div>` },
  { id: 'highlightImage', group: 'highlight', name: 'Highlight', note: 'รูปใหญ่ ไม่มีพื้นหลัง', mini: 'highlightImage', make: () => makeHighlightRow() },
  { id: 'highlightGreenText', group: 'highlight', name: 'Highlight + พื้นหลังเขียว + ข้อความ', note: 'รูปใหญ่และแถบข้อความสีขาว', mini: 'highlightGreenText', make: () => makeGreenHighlight(true) },
  { id: 'highlightGreenEmpty', group: 'highlight', name: 'Highlight + พื้นหลังเขียว', note: 'รูปใหญ่และพื้นหลัง ไม่มีข้อความ', mini: 'highlightGreenEmpty', make: () => makeGreenHighlight(false) },
  { id: 'contentHeading', group: 'content', name: 'หัวข้อ', note: 'h4', mini: 'contentHeading', make: () => `<h4></h4>` },
  { id: 'contentText', group: 'content', name: 'Text', note: 'p', mini: 'contentText', make: () => `<p></p>` },
  { id: 'contentQuoteImage', group: 'content', name: 'รูป Quote', note: 'ลากซ้ำติดกันเพื่อจัดเป็นแถว 2–3 รูป', mini: 'contentQuoteImage', make: () => makeQuoteImage(++quoteImageCounter) },
  { id: 'contentSplitQuoteRight', group: 'content', name: 'รูป Quote ขวา + เนื้อหาซ้าย', note: 'พื้นหลังเขียว · รูปและคำบรรยายอยู่ขวา', mini: 'contentSplitQuoteRight', make: () => makeSplitQuoteBlock('right', ++quoteImageCounter, false) },
  { id: 'contentSplitQuoteLeft', group: 'content', name: 'รูป Quote ซ้าย + หัวข้อและเนื้อหาขวา', note: 'พื้นหลังเขียว · รูปและคำบรรยายอยู่ซ้าย', mini: 'contentSplitQuoteLeft', make: () => makeSplitQuoteBlock('left', ++quoteImageCounter, true) },
  { id: 'contentSplitImageLeft', group: 'content', name: 'รูปครึ่งซ้ายพื้นหลังเขียว + เนื้อหาขวา', note: 'แบ่งครึ่งหน้า · รูปอยู่บนพื้นหลังเขียวซ้าย · 2 ย่อหน้า', mini: 'contentSplitImageLeft', make: () => makeSplitMediaBlock('left', ++quoteImageCounter, false) },
  { id: 'contentSplitImageRight', group: 'content', name: 'หัวข้อและเนื้อหาซ้าย + รูปครึ่งขวาพื้นหลังเขียว', note: 'แบ่งครึ่งหน้า · รูปอยู่บนพื้นหลังเขียวขวา · 2 ย่อหน้า', mini: 'contentSplitImageRight', make: () => makeSplitMediaBlock('right', ++quoteImageCounter, true) }
];

const BLOCK_GROUPS = [
  { id: 'heading', title: '1. รูปแบบหัวข้อ', help: 'ลาก Subtitle และ Audio มาติดกันได้ ระบบจะประกอบเป็นโครงรวมให้อัตโนมัติ' },
  { id: 'highlight', title: '2. รูปแบบรูป highlight', help: 'เลือกแบบปกติหรือพื้นหลังเขียว โดยแบบพื้นหลังเขียวมีทั้งแบบมีและไม่มีข้อความ' },
  { id: 'content', title: '3. รูปแบบเนื้อหา', help: 'ลากหัวข้อและ Text มาวางตามลำดับ · เพิ่มรูป Quote เข้าแถวได้สูงสุด 3 รูป · มี layout รูปสลับด้านพร้อมเนื้อหา' }
];

let structure = [];
let nextId = 1;
let dragging = null;
let codeIsVisible = false;
let quoteImageCounter = 0;

const loremHighlight = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at sapien facilisis varius. Sed non augue eget erat consequat posuere.';

function makeHighlightRow() {
  return `<div class="row justify-content-center mb-5">\n    <div class="col-md-12 col-xl-10 col-xxl-8">\n        <img class="img-fluid" src="/storage/newsroom/refaction/#####/#####/#####/highlight.webp">\n    </div>\n</div>`;
}

function makeGreenHighlight(withText) {
  const imageSection = `<div class="bg-split-news-big-image">\n    <div class="container">\n        <div class="row justify-content-center">\n            <div class="col-xl-10 col-xxl-8 mb-5">\n                <img src="/storage/newsroom/refaction/2026/10/green-miles/highlight.webp" class="w-100">\n            </div>\n        </div>\n    </div>\n</div>`;
  const textSection = withText
    ? `<div class="bg-green-gradient-vertical mb-md-6 mb-5 pb-md-6 pb-5">\n    <div class="container">\n        <div class="row justify-content-center">\n            <div class="col-md-10 col-xl-8 col-xxl-6">\n                <p class="text-white"></p>\n            </div>\n        </div>\n    </div>\n</div>`
    : `<div class="bg-green-gradient-vertical mb-md-6 mb-5 pb-md-6 pb-5"></div>`;
  return `${imageSection}\n\n${textSection}`;
}

function makeQuoteImage(number) {
  return `<figure class="text-center my-5"><img class="img-fluid" src="/storage/newsroom/refaction/#####/#####/#####/quote-${number}.webp"></figure>`;
}

function makeQuoteRow(images) {
  if (!images.length) return '';
  const columnClass = images.length === 1 ? 'col-md-12' : images.length === 2 ? 'col-md-6' : 'col-md-4';
  const columns = images.map(() => {
    const imageNumber = ++quoteImageCounter;
    return `    <div class="${columnClass}">\n        <figure class="text-center my-5"><img class="img-fluid" src="/storage/newsroom/refaction/#####/#####/#####/quote-${imageNumber}.webp"></figure>\n    </div>`;
  });
  return `<div class="row">\n${columns.join('\n')}\n</div>`;
}

function makeSplitQuoteBlock(imageSide, number, withHeading) {
  const imageOrder = imageSide === 'right' ? ' order-lg-12' : '';
  const textOrder = imageSide === 'right' ? ' order-lg-1' : '';
  const rowClass = imageSide === 'right' ? 'row no-gutters justify-content-end' : 'row no-gutters';
  const captionLines = withHeading ? 2 : 3;
  const caption = Array.from({ length: captionLines }, () => '<span class="d-block"></span>').join('\n                    ');
  const textMarkup = withHeading ? '<h4></h4>\n                    <p></p>' : '<p></p>';
  return `<div class="container-fluid px-0 my-5 bg-light-grey">\n    <div class="${rowClass}">\n        <div class="col-lg-5 bg-green-gradient-vertical${imageOrder}">\n            <div class="h-100 align-items-center justify-content-center p-5">\n                <figure class="text-center my-5"><img src="/storage/newsroom/refaction/#####/#####/#####/quote-${number}.webp" alt="" width="450" class="img-fluid"></figure>\n                <div class="font-italic text-center small text-white mt-3">\n                    ${caption}\n                </div>\n            </div>\n        </div>\n        <div class="col-lg-7 align-self-center${textOrder}">\n            <div class="py-5 px-3 px-md-7">\n                ${textMarkup}\n            </div>\n        </div>\n    </div>\n</div>`;
}

function makeSplitMediaBlock(imageSide, number, withHeading) {
  const imagePath = `/storage/newsroom/refaction/#####/#####/#####/quote-${number}.webp`;
  if (imageSide === 'left') {
    return `<div class="container-fluid px-0 my-5 bg-light-grey">\n    <div class="row justify-content-lg-start justify-content-center no-gutters">\n        <div class="col-lg-6 col-xl-5 bg-split-news-left mb-md-0 mb-4">\n            <div class="d-flex h-100 align-items-center justify-content-center p-4 p-md-6">\n                <img src="${imagePath}" alt="" width="600" class="img-fluid">\n            </div>\n        </div>\n        <div class="col-md-10 col-lg-6 col-xl-6 align-self-center">\n            <div class="py-5 px-3 px-md-5 pl-xl-0">\n                <p></p>\n                <p></p>\n            </div>\n        </div>\n    </div>\n</div>`;
  }
  const heading = withHeading ? '                <h4></h4>\n' : '';
  return `<div class="container-fluid px-0 my-5 bg-light-grey">\n    <div class="row no-gutters justify-content-end">\n        <div class="col-lg-6 col-xl-5 order-lg-2 bg-split-news-right py-5">\n            <div class="d-flex h-100 align-items-center justify-content-center p-5">\n                <img src="${imagePath}" alt="" width="800" class="img-fluid">\n            </div>\n        </div>\n        <div class="col-lg-6 col-xl-5 align-self-center order-lg-1">\n            <div class="py-5 px-3 px-md-5 pl-xl-0">\n${heading}                <p></p>\n                <p></p>\n            </div>\n        </div>\n    </div>\n</div>`;
}

function blockInfo(id) {
  return BLOCKS.find((block) => block.id === id);
}

function makeMini(type) {
  const mini = document.createElement('span');
  mini.className = `mini mini-${type}`;
  mini.setAttribute('aria-hidden', 'true');
  const add = (className) => {
    const part = document.createElement('i');
    part.className = className;
    mini.append(part);
  };
  if (type === 'subtitle') { add('title-line'); add('short-line'); }
  if (type === 'subtitleAudio') { add('title-line'); add('audio-line'); }
  if (type === 'highlightImage') { add('highlight-mini-image'); }
  if (type === 'highlightGreenText' || type === 'highlightGreenEmpty') { add('green-highlight-image'); add('green-highlight-band'); }
  if (type === 'contentHeading') { add('title-line'); }
  if (type === 'contentText') { add('text-line'); add('text-line'); add('short-line'); }
  if (type === 'contentQuoteImage') { add('quote-image'); }
  if (type === 'contentSplitQuoteRight' || type === 'contentSplitQuoteLeft') { add('split-quote-image'); add('split-quote-copy'); }
  if (type === 'contentSplitImageLeft' || type === 'contentSplitImageRight') { add('split-quote-image'); add('split-quote-copy'); }
  if (type === 'audio' || type === 'video') { add('play-dot'); add('control-line'); add('control-dot'); }
  if (type === 'textBlock') { add('text-line'); add('text-line'); add('short-line'); }
  if (type === 'headingSection') { add('title-line'); add('text-line'); add('short-line'); }
  if (type === 'centerImage') { add('image-box'); }
  if (type === 'wideBanner') { add('banner-box'); }
  if (type === 'greenBand') { add('green-lines'); }
  if (type === 'splitImage') { add('split-copy'); add('split-image'); }
  if (type === 'twoColumnMedia' || type === 'imagePair') { add('column-block'); add('column-block'); }
  if (type === 'quote') { add('quote-box'); }
  return mini;
}

function renderLibrary() {
  const library = $('#blockLibrary');
  library.replaceChildren();
  $('#paletteCount').textContent = `${BLOCKS.length} แบบ`;
  for (const group of BLOCK_GROUPS) {
    const section = document.createElement('section');
    section.className = 'block-group';
    const heading = document.createElement('div');
    heading.className = 'block-group-heading';
    const title = document.createElement('h3');
    title.textContent = group.title;
    const help = document.createElement('p');
    help.textContent = group.help;
    heading.append(title, help);
    section.append(heading);
    const items = BLOCKS.filter((block) => block.group === group.id);
    if (!items.length) {
      const placeholder = document.createElement('div');
      placeholder.className = 'group-placeholder';
      placeholder.textContent = 'เพิ่มรูปแบบได้เมื่อมี code ตัวอย่าง';
      section.append(placeholder);
    } else {
      const cards = document.createElement('div');
      cards.className = 'block-group-cards';
      for (const block of items) {
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
        cards.append(card);
      }
      section.append(cards);
    }
    library.append(section);
  }
}

function insertBlock(blockId, index = structure.length) {
  if (!blockInfo(blockId)) return;
  const item = { id: `block-${nextId++}`, type: blockId };
  structure.splice(index, 0, item);
  renderStructure();
}

function previewText(text, className = '') {
  const node = document.createElement('p');
  node.className = className;
  node.textContent = text;
  return node;
}

function imagePlaceholder(label = 'พื้นที่รูปภาพ') {
  const box = document.createElement('div');
  box.className = 'preview-image-placeholder';
  const icon = document.createElement('span');
  icon.className = 'placeholder-icon';
  icon.textContent = '▧';
  const caption = document.createElement('span');
  caption.textContent = label;
  box.append(icon, caption);
  return box;
}

function previewParagraphs(parent, count = 2) {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at sapien facilisis varius. Sed non augue eget erat consequat posuere.';
  for (let i = 0; i < count; i++) parent.append(previewText(lorem, 'preview-lorem'));
}

function makePreview(type) {
  const preview = document.createElement('div');
  preview.className = `block-preview preview-${type}`;
  preview.setAttribute('aria-label', `${blockInfo(type).name} — ตัวอย่างหน้าตาโดยประมาณ`);
  if (type === 'subtitle') {
    const inner = document.createElement('div'); inner.className = 'preview-narrow';
    const title = document.createElement('h3'); title.textContent = 'Lorem....';
    inner.append(title); preview.append(inner);
  } else if (type === 'highlightImage') {
    const inner = document.createElement('div'); inner.className = 'highlight-preview-layout';
    const image = imagePlaceholder('highlight.webp · เติม path จริงใน HTML');
    image.classList.add('highlight-preview-image');
    inner.append(image); preview.append(inner);
  } else if (type === 'highlightGreenText' || type === 'highlightGreenEmpty') {
    const frame = document.createElement('div'); frame.className = `green-highlight-preview ${type === 'highlightGreenEmpty' ? 'is-empty' : ''}`;
    const image = imagePlaceholder('highlight.webp · รูปอยู่บนพื้นหลังเขียว');
    image.classList.add('green-highlight-preview-image');
    frame.append(image);
    if (type === 'highlightGreenText') {
      const copy = document.createElement('div'); copy.className = 'green-highlight-preview-copy';
      const lorem = previewText(loremHighlight, 'preview-lorem text-white');
      copy.append(lorem); frame.append(copy);
    }
    preview.append(frame);
  } else if (type === 'audio' || type === 'video') {
    const player = document.createElement('div'); player.className = `mock-player ${type === 'video' ? 'mock-video' : ''}`;
    if (type === 'video') player.append(imagePlaceholder('พื้นที่วิดีโอ'));
    const controls = document.createElement('div'); controls.className = 'mock-controls';
    const play = document.createElement('span'); play.className = 'mock-play'; play.textContent = '▶';
    const track = document.createElement('span'); track.className = 'mock-track';
    const duration = document.createElement('small'); duration.textContent = '0:00 / 0:00';
    controls.append(play, track, duration); player.append(controls); preview.append(player);
  } else if (type === 'subtitleAudio') {
    const inner = document.createElement('div'); inner.className = 'preview-narrow preview-combined';
    const title = document.createElement('h3'); title.textContent = 'Lorem....';
    const player = document.createElement('div'); player.className = 'mock-player';
    const controls = document.createElement('div'); controls.className = 'mock-controls';
    const play = document.createElement('span'); play.className = 'mock-play'; play.textContent = '▶';
    const track = document.createElement('span'); track.className = 'mock-track';
    const duration = document.createElement('small'); duration.textContent = '0:00 / 0:00';
    controls.append(play, track, duration); player.append(controls);
    inner.append(title, player); preview.append(inner);
  } else if (type === 'contentHeading') {
    const inner = document.createElement('div'); inner.className = 'preview-narrow';
    const heading = document.createElement('h4'); heading.textContent = 'Lorem....';
    inner.append(heading); preview.append(inner);
  } else if (type === 'contentText') {
    const inner = document.createElement('div'); inner.className = 'preview-narrow'; previewParagraphs(inner, 1); preview.append(inner);
  } else if (type === 'contentQuoteImage') {
    const figure = document.createElement('div'); figure.className = 'quote-image-preview-figure';
    figure.append(imagePlaceholder('quote-1.webp · รูปแทรกในเนื้อหา'));
    preview.append(figure);
  } else if (type === 'contentSplitQuoteRight' || type === 'contentSplitQuoteLeft') {
    const split = document.createElement('div');
    split.className = `split-quote-preview ${type === 'contentSplitQuoteRight' ? 'image-on-right' : 'image-on-left'}`;
    const imageSide = document.createElement('div'); imageSide.className = 'split-quote-preview-image';
    imageSide.append(imagePlaceholder('quote-1.webp'));
    const caption = document.createElement('div'); caption.className = 'split-quote-preview-caption';
    caption.innerHTML = '<span>Lorem ipsum dolor sit amet</span><span>Consectetur adipiscing elit</span>';
    imageSide.append(caption);
    const copy = document.createElement('div'); copy.className = 'split-quote-preview-copy';
    if (type === 'contentSplitQuoteLeft') {
      const heading = document.createElement('h4'); heading.textContent = 'Lorem ipsum dolor sit amet'; copy.append(heading);
    }
    previewParagraphs(copy, 1);
    split.append(imageSide, copy); preview.append(split);
  } else if (type === 'contentSplitImageLeft' || type === 'contentSplitImageRight') {
    const imageOnLeft = type === 'contentSplitImageLeft';
    const split = document.createElement('div');
    split.className = `split-quote-preview ${imageOnLeft ? 'image-on-left' : 'image-on-right'}`;
    const imageSide = document.createElement('div'); imageSide.className = 'split-quote-preview-image';
    imageSide.append(imagePlaceholder('quote-1.webp · รูปประกอบ'));
    const copy = document.createElement('div'); copy.className = 'split-quote-preview-copy';
    if (!imageOnLeft) {
      const heading = document.createElement('h4'); heading.textContent = 'Lorem ipsum dolor sit amet'; copy.append(heading);
    }
    previewParagraphs(copy, 2);
    split.append(imageSide, copy); preview.append(split);
  } else if (type === 'textBlock') {
    const inner = document.createElement('div'); inner.className = 'preview-narrow'; previewParagraphs(inner, 2); preview.append(inner);
  } else if (type === 'headingSection') {
    const inner = document.createElement('div'); inner.className = 'preview-narrow';
    const heading = document.createElement('h4'); heading.textContent = 'หัวข้อย่อยของบทความ';
    inner.append(heading); previewParagraphs(inner, 2); preview.append(inner);
  } else if (type === 'centerImage') {
    const inner = document.createElement('div'); inner.className = 'preview-narrow'; inner.append(imagePlaceholder('รูปภาพจัดกลาง')); preview.append(inner);
  } else if (type === 'wideBanner') {
    const frame = document.createElement('div'); frame.className = 'wide-banner-frame';
    const inner = document.createElement('div'); inner.className = 'wide-banner-inner'; inner.append(imagePlaceholder('รูปใหญ่ / highlight หรือภาพหลัก'));
    frame.append(inner); preview.append(frame);
  } else if (type === 'greenBand') {
    const inner = document.createElement('div'); inner.className = 'green-band-inner';
    inner.append(previewText('ตัวอย่างข้อความสีขาวบนแถบไล่สีเขียว', 'preview-lorem')); preview.append(inner);
  } else if (type === 'splitImage') {
    const split = document.createElement('div'); split.className = 'split-preview-layout';
    const copy = document.createElement('div'); copy.className = 'split-preview-copy'; previewParagraphs(copy, 2);
    const image = imagePlaceholder('รูปอยู่ด้านขวา'); image.classList.add('split-preview-image');
    split.append(copy, image); preview.append(split);
  } else if (type === 'twoColumnMedia') {
    const grid = document.createElement('div'); grid.className = 'media-preview-grid';
    for (let i = 0; i < 2; i++) {
      const col = document.createElement('div'); col.className = 'media-preview-col';
      const head = document.createElement('div'); head.className = 'media-preview-head';
      const icon = document.createElement('span'); icon.className = 'media-preview-icon'; icon.textContent = '＋';
      const title = document.createElement('h4'); title.textContent = `หัวข้อคอลัมน์ ${i + 1}`;
      head.append(icon, title); col.append(head); previewParagraphs(col, i === 0 ? 2 : 1); grid.append(col);
    }
    preview.append(grid);
  } else if (type === 'imagePair') {
    const grid = document.createElement('div'); grid.className = 'image-pair-preview';
    grid.append(imagePlaceholder('รูปที่ 1'), imagePlaceholder('รูปที่ 2')); preview.append(grid);
  } else if (type === 'quote') {
    const inner = document.createElement('div'); inner.className = 'preview-narrow';
    const quote = document.createElement('blockquote'); quote.textContent = '“ตัวอย่างข้อความอ้างอิงจากบทความ”'; inner.append(quote); preview.append(inner);
  }
  return preview;
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

function makeStructureCard(item, index) {
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

    const toolbar = document.createElement('div');
    toolbar.className = 'structure-toolbar';
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
    const actions = document.createElement('div');
    actions.className = 'structure-actions';
    const controls = document.createElement('div');
    controls.className = 'structure-controls';
    controls.append(
      makeControl('เลื่อนขึ้น', '↑', '', () => moveBlock(index, -1), index === 0),
      makeControl('เลื่อนลง', '↓', '', () => moveBlock(index, 1), index === structure.length - 1),
      makeControl('ลบส่วนนี้', '×', 'remove', () => { structure.splice(index, 1); renderStructure(); })
    );
    actions.append(controls);
    toolbar.append(handle, name, actions);
    const preview = makePreview(item.type);
    card.append(toolbar, preview);
    return card;
}

function renderStructure() {
  const canvas = $('#canvas');
  canvas.querySelectorAll('.structure-card,.quote-image-group').forEach((card) => card.remove());
  $('#emptyState').hidden = structure.length > 0;
  for (let index = 0; index < structure.length;) {
    if (structure[index].type === 'contentQuoteImage') {
      let end = index + 1;
      while (end < structure.length && structure[end].type === 'contentQuoteImage' && end - index < 3) end++;
      if (end - index > 1) {
        const group = document.createElement('div');
        group.className = 'quote-image-group';
        group.style.setProperty('--quote-image-columns', end - index);
        for (let quoteIndex = index; quoteIndex < end; quoteIndex++) group.append(makeStructureCard(structure[quoteIndex], quoteIndex));
        canvas.append(group);
        index = end;
        continue;
      }
    }
    canvas.append(makeStructureCard(structure[index], index));
    index++;
  }
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
  clearDropMarks();
  $('#canvas').classList.add('is-over');
  event.dataTransfer.dropEffect = dragging.kind === 'library' ? 'copy' : 'move';
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
  quoteImageCounter = 0;
  const output = [];
  for (let index = 0; index < structure.length; index++) {
    const current = structure[index];
    const next = structure[index + 1];
    const formsPair = next && ((current.type === 'subtitle' && next.type === 'audio') || (current.type === 'audio' && next.type === 'subtitle'));
    if (formsPair) {
      output.push(blockInfo('subtitleAudio').make());
      index++;
    } else if (['subtitle', 'audio', 'subtitleAudio'].includes(current.type)) {
      output.push(blockInfo(current.type).make(current.variant));
    } else {
      const bodyBlocks = [];
      while (index < structure.length && !['subtitle', 'audio', 'subtitleAudio'].includes(structure[index].type)) {
        bodyBlocks.push(structure[index]);
        index++;
      }
      index--;
      output.push(composeBodyBlocks(bodyBlocks));
    }
  }
  $('#htmlOutput').value = output.filter(Boolean).join('\n\n');
}

function composeBodyBlocks(items) {
  const sections = [];
  let regularItems = [];
  for (const item of items) {
    if (['highlightGreenText', 'highlightGreenEmpty', 'contentSplitQuoteRight', 'contentSplitQuoteLeft', 'contentSplitImageLeft', 'contentSplitImageRight'].includes(item.type)) {
      if (regularItems.length) {
        const regularSection = composeRegularBodyBlocks(regularItems);
        if (regularSection) sections.push(regularSection);
      }
      sections.push(blockInfo(item.type).make());
      regularItems = [];
    } else {
      regularItems.push(item);
    }
  }
  if (regularItems.length) {
    const regularSection = composeRegularBodyBlocks(regularItems);
    if (regularSection) sections.push(regularSection);
  }
  return sections.join('\n\n');
}

function composeRegularBodyBlocks(items) {
  const rows = [];
  const hasHighlight = items.some((item) => item.type === 'highlightImage');
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.type === 'highlightImage') {
      rows.push(makeHighlightRow());
      continue;
    }
    const textItems = [];
    while (index < items.length && items[index].type !== 'highlightImage') textItems.push(items[index++]);
    index--;
    const nextIsHighlight = items[index + 1]?.type === 'highlightImage';
    const rowClasses = ['row', 'justify-content-center'];
    if (!hasHighlight || nextIsHighlight) rowClasses.push('mb-5');
    const innerParts = [];
    for (let textIndex = 0; textIndex < textItems.length; textIndex++) {
      const textItem = textItems[textIndex];
      if (textItem.type === 'contentQuoteImage') {
        let quoteCount = 1;
        while (textItems[textIndex + quoteCount]?.type === 'contentQuoteImage' && quoteCount < 3) quoteCount++;
        if (quoteCount > 1) {
          innerParts.push(makeQuoteRow(Array.from({ length: quoteCount })));
          textIndex += quoteCount - 1;
          continue;
        }
      }
      let markup = blockInfo(textItem.type).make(textItem);
      if (!markup) continue;
      // Leave space before a new heading; close a paragraph before inline quote imagery.
      const nextTextItem = textItems[textIndex + 1];
      const nextIsQuoteImage = nextTextItem?.type === 'contentQuoteImage';
      const paragraphBeforeQuoteImage = textItem.type === 'contentText' && nextIsQuoteImage;
      const paragraphBeforeHeading = textItem.type === 'contentText' && nextTextItem?.type === 'contentHeading';
      if (paragraphBeforeQuoteImage) markup = markup.replace('<p>', '<p class="mb-0">');
      else if (paragraphBeforeHeading) markup = markup.replace('<p>', '<p class="mb-5">');
      innerParts.push(markup);
    }
    if (!innerParts.length) continue;
    const inner = innerParts.join('\n            ');
    rows.push(`<div class="${rowClasses.join(' ')}">\n    <div class="col-md-10 col-xl-8 col-xxl-6">\n        ${inner}\n    </div>\n</div>`);
  }
  if (!rows.length) return '';
  const containerClass = hasHighlight ? 'container mb-5 mb-xl-mb-6' : 'container';
  const content = rows.map((row) => row.split('\n').map((line) => `    ${line}`).join('\n')).join('\n\n');
  return `<div class="${containerClass}">\n${content}\n</div>`;
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
