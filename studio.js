(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const galleryView = $('#galleryView');
  const editorView = $('#editorView');
  const templateGrid = $('#templateGrid');
  const cmsPatternGrid = $('#cmsPatternGrid');
  const structureFrame = $('#structureFrame');
  const artboard = $('#artboard');
  const layerList = $('#layerList');
  const inspector = $('#inspector');
  const imageFile = $('#imageFile');
  const exportDialog = $('#exportDialog');
  const exportCode = $('#exportCode');
  const DRAFT_KEY = 'reflectionStudioDraftV1';

  const templates = [
    { id:'editorial', title:'เล่าเรื่องแบบ Editorial', category:'บทความ', tag:'EDITORIAL', description:'เปิดด้วยหัวข้อเด่น ตามด้วยภาพและเนื้อหาเป็นจังหวะ', tone:'', blocks:[
      {type:'heading',text:'ทุกเรื่องราว\nเริ่มต้นจากการลงมือทำ'},
      {type:'text',text:'บางครั้งการเปลี่ยนแปลงที่ยิ่งใหญ่ เริ่มจากความตั้งใจเล็ก ๆ ของใครบางคน เรื่องราวนี้จะพาคุณไปรู้จักผู้คนที่กำลังสร้างความหมายให้กับวันพรุ่งนี้'},
      {type:'image',alt:'ภาพเปิดเรื่อง',width:100},
      {type:'heading',text:'แรงบันดาลใจที่ส่งต่อได้'},
      {type:'text',text:'เบื้องหลังทุกความสำเร็จ คือการเรียนรู้ ความร่วมมือ และความมุ่งมั่นที่ไม่หยุดนิ่ง มาทำความรู้จักอีกมุมหนึ่งของเรื่องราวนี้ไปด้วยกัน'}
    ]},
    { id:'visual', title:'เล่าเรื่องด้วยภาพ', category:'ภาพถ่าย', tag:'VISUAL STORY', description:'ให้ภาพนำสายตา สลับกับข้อความสั้นที่อ่านสบาย', tone:'thumb-orange', blocks:[
      {type:'heading',text:'หนึ่งวัน\nที่มีความหมาย'},
      {type:'text',text:'บันทึกช่วงเวลาเล็ก ๆ ที่บอกเล่าเรื่องราวได้มากกว่าคำพูด'},
      {type:'image',alt:'ภาพบรรยากาศ',width:100},
      {type:'text',text:'จากภาพหนึ่งภาพ สู่ความทรงจำที่เราอยากส่งต่อ'},
      {type:'image',alt:'ภาพช่วงเวลาสำคัญ',width:78},
      {type:'quote',text:'“ความเปลี่ยนแปลงเริ่มได้จากสิ่งที่เราทำในทุกวัน”'}
    ]},
    { id:'quote', title:'เรื่องเล่าจากคำพูด', category:'สัมภาษณ์', tag:'QUOTE FIRST', description:'ดึงประโยคสำคัญขึ้นมาเป็นจุดเด่น แล้วเล่าที่มา', tone:'thumb-dark', blocks:[
      {type:'heading',text:'เสียงของคนทำงาน'},
      {type:'quote',text:'“เราอยากให้สิ่งที่ทำในวันนี้ ส่งผลดีไปถึงคนรุ่นต่อไป”'},
      {type:'text',text:'ประโยคสั้น ๆ ที่สะท้อนความตั้งใจของทีมงาน ผู้ขับเคลื่อนการเปลี่ยนแปลงจากภายในทุกวัน'},
      {type:'image',alt:'ภาพผู้ให้สัมภาษณ์',width:86},
      {type:'heading',text:'จากความคิด สู่การลงมือทำ'},
      {type:'text',text:'ทุกไอเดียจะมีความหมาย เมื่อเราได้ร่วมกันทำให้เกิดขึ้นจริง'}
    ]},
    { id:'interview', title:'บทสัมภาษณ์', category:'สัมภาษณ์', tag:'CONVERSATION', description:'จัดบทสัมภาษณ์ให้อ่านง่าย พร้อมภาพและช่วง Quote', tone:'', blocks:[
      {type:'heading',text:'ชวนคุยเรื่อง\nการเติบโตไปด้วยกัน'},
      {type:'image',alt:'ภาพผู้ให้สัมภาษณ์',width:90},
      {type:'text',text:'พบกับเรื่องราวและมุมมองจากผู้คนที่อยู่เบื้องหลังการเดินทางครั้งนี้'},
      {type:'quote',text:'“ทีมที่แข็งแรง คือทีมที่เติบโตไปด้วยกัน”'},
      {type:'heading',text:'จุดเริ่มต้นของเรื่องราว'},
      {type:'text',text:'เล่าคำถามและคำตอบได้ที่นี่ เพิ่มรายละเอียดตามบทสัมภาษณ์จริง และจัดลำดับช่วงสนทนาได้ตามต้องการ'}
    ]},
    { id:'split', title:'ภาพคู่กับเนื้อหา', category:'ภาพถ่าย', tag:'IMAGE + STORY', description:'วางภาพและข้อความเคียงกัน เหมาะกับเล่าเรื่องเป็นช่วง', tone:'thumb-dark', blocks:[
      {type:'heading',text:'คน สถานที่\nและความทรงจำ'},
      {type:'text',text:'จัดวางภาพคู่กับเนื้อหา เพื่อพาผู้อ่านไปสัมผัสบรรยากาศและความหมายของแต่ละช่วง'},
      {type:'split',imageSide:'left',alt:'ภาพประกอบเรื่อง',title:'จุดเริ่มต้น',text:'เล่าที่มาและความสำคัญของช่วงเวลานี้ได้อย่างกระชับ'},
      {type:'split',imageSide:'right',alt:'ภาพอีกมุมหนึ่ง',title:'ก้าวต่อไป',text:'ปิดท้ายด้วยสิ่งที่กำลังทำ และความหวังที่อยากส่งต่อ'}
    ]},
    { id:'highlight', title:'เปิดเรื่องด้วย Highlight', category:'ไฮไลต์', tag:'HIGHLIGHT', description:'เริ่มด้วยภาพเด่น แล้วพาผู้อ่านเข้าสู่เนื้อหา', tone:'thumb-orange', blocks:[
      {type:'image',alt:'ภาพ Highlight เปิดเรื่อง',width:100},
      {type:'heading',text:'เบื้องหลังความตั้งใจ\nที่อยากส่งต่อ'},
      {type:'text',text:'เริ่มต้นเรื่องด้วยประโยคที่ชวนติดตาม แล้วเติมรายละเอียดเกี่ยวกับผู้คนและแนวคิดที่อยู่เบื้องหลัง'},
      {type:'quote',text:'“ทุกก้าวเล็ก ๆ พาเราเข้าใกล้เป้าหมายร่วมกัน”'},
      {type:'split',imageSide:'right',alt:'ภาพประกอบเนื้อหา',title:'สิ่งที่เราเรียนรู้',text:'สรุปประเด็นสำคัญด้วยภาพและข้อความที่อ่านง่าย'}
    ]},
    { id:'journey', title:'เส้นทางและความเปลี่ยนแปลง', category:'บทความ', tag:'JOURNEY', description:'เล่าเป็นลำดับช่วง จากจุดเริ่มต้นสู่ก้าวถัดไป', tone:'thumb-dark', blocks:[
      {type:'heading',text:'เส้นทางของเรา\nตลอดการเดินทาง'},
      {type:'text',text:'ทุกการเดินทางมีจุดเริ่มต้น นี่คือช่วงเวลาที่ทำให้เราเห็นว่าอะไรสำคัญ และอะไรที่อยากเปลี่ยนแปลง'},
      {type:'image',alt:'ภาพช่วงเริ่มต้น',width:100},
      {type:'heading',text:'ก้าวแรก'},
      {type:'text',text:'บอกเล่าจุดเริ่มต้นและความตั้งใจที่ทำให้เรื่องราวนี้เกิดขึ้น'},
      {type:'divider'},
      {type:'image',alt:'ภาพการเปลี่ยนแปลง',width:84},
      {type:'heading',text:'ก้าวต่อไป'},
      {type:'text',text:'ปิดท้ายด้วยเป้าหมายหรือสิ่งที่อยากชวนผู้อ่านร่วมเดินไปด้วยกัน'}
    ]}
  ];
  const categories = ['ทั้งหมด','บทความ','ภาพถ่าย','สัมภาษณ์','ไฮไลต์'];
  let activeCategory = 'ทั้งหมด';
  let elements = [];
  let selectedId = null;
  let nextId = 1;
  let zoom = 1;
  let undoStack = [];
  let redoStack = [];
  let draggedId = null;
  let draggedType = null;
  let toastTimer = 0;
  let editBaseline = null;
  let audioFileObject = null;
  let audioFileUrl = null;
  let audioResultUrl = null;
  let audioEngine = null;
  let audioEngineBusy = false;
  let audioBusy = false;
  let audioCoreObjectUrl = null;
  let audioWasmObjectUrl = null;

  const clone = value => JSON.parse(JSON.stringify(value));
  const uid = () => `element-${nextId++}`;
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const textHtml = value => escapeHtml(value).replace(/\r?\n/g, '<br>');
  const titleFor = type => ({heading:'หัวข้อ',text:'ข้อความ',image:'รูปภาพ',quote:'คำพูด',split:'รูป + เนื้อหา',divider:'เส้นคั่น'}[type] || 'องค์ประกอบ');
  const iconFor = type => ({heading:'T',text:'¶',image:'▧',quote:'“',split:'▤',divider:'—'}[type] || '•');

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
  }

  function setActiveMode(mode) {
    $$('#studioModes [data-view]').forEach(button => button.classList.toggle('active',button.dataset.view===mode));
  }

  function showMode(mode) {
    galleryView.hidden = mode !== 'gallery';
    editorView.hidden = mode !== 'editor';
    $('#patternsView').hidden = mode !== 'patterns';
    $('#audioView').hidden = mode !== 'audio';
    $('#topExport').hidden = mode !== 'editor';
    if (mode !== 'editor') setActiveMode(mode);
    window.scrollTo(0,0);
  }

  function makeElement(type, overrides = {}) {
    const defaults = {
      heading:{text:'หัวข้อเรื่องราวของคุณ'},
      text:{text:'คลิกเพื่อเพิ่มข้อความ เล่าเรื่องราวและรายละเอียดที่ต้องการสื่อสารกับผู้อ่าน'},
      image:{src:'',alt:'คำอธิบายรูปภาพ',width:100},
      quote:{text:'“เพิ่มประโยคสำคัญที่อยากให้ผู้อ่านจดจำ”'},
      split:{imageSide:'left',src:'',alt:'คำอธิบายรูปภาพ',title:'หัวข้อย่อย',text:'เพิ่มข้อความประกอบรูปภาพที่นี่'},
      divider:{}
    };
    return {id:uid(),type,...clone(defaults[type] || {}),...overrides};
  }

  function renderCategories() {
    $('#categoryFilters').innerHTML = categories.map(category => `<button class="filter-chip${activeCategory===category?' active':''}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
  }

  function renderThumb(template) {
    const isQuote = template.id === 'quote';
    const isSplit = template.id === 'split';
    const hasImage = template.blocks.some(block => block.type === 'image' || block.type === 'split');
    const mainTitle = template.blocks.find(block => block.type === 'heading')?.text.split('\n')[0] || template.title;
    return `<div class="template-thumb ${template.tone}" aria-hidden="true"><span class="thumb-tag">${template.tag}</span><div class="thumb-visual">${isQuote?'<div class="thumb-quote">“</div>':''}<div class="thumb-title">${escapeHtml(mainTitle)}</div>${isSplit?'<div class="thumb-split"><div class="thumb-photo"></div><div class="thumb-copy"></div></div>':hasImage?'<div class="thumb-photo"></div>':'<div class="thumb-copy"></div>'}${!isQuote?'<div class="thumb-copy"></div>':''}</div><span class="thumb-label">REFLECTION / 0${templates.indexOf(template)+1}</span></div>`;
  }

  function renderGallery() {
    renderCategories();
    $('#resumeDraft').hidden = !localStorage.getItem(DRAFT_KEY);
    const query = $('#templateSearch').value.trim().toLocaleLowerCase('th');
    const filtered = templates.filter(template => (activeCategory === 'ทั้งหมด' || template.category === activeCategory) && (!query || `${template.title} ${template.category} ${template.description}`.toLocaleLowerCase('th').includes(query)));
    $('#templateCount').textContent = String(filtered.length).padStart(2,'0');
    templateGrid.innerHTML = filtered.length ? filtered.map(template => `<article class="template-card" role="button" tabindex="0" data-template="${template.id}" aria-label="เลือกเทมเพลต ${escapeHtml(template.title)}">${renderThumb(template)}<div class="template-card-info"><div class="template-meta"><span class="template-category">${escapeHtml(template.category.toUpperCase())}</span><span class="template-time">${template.blocks.length} ส่วนประกอบ</span></div><h3>${escapeHtml(template.title)}</h3><p>${escapeHtml(template.description)}</p><div class="card-use">ใช้เทมเพลตนี้ <span>→</span></div></div></article>`).join('') : '<div class="no-results">ไม่พบเทมเพลตที่ตรงกับคำค้น</div>';
    renderCmsPatterns();
  }

  function renderCmsPatterns() {
    const api = structureFrame?.contentWindow?.ReflectionBuilderAPI;
    if (!api) return;
    const query = ($('#cmsPatternSearch')?.value || '').trim().toLocaleLowerCase('th');
    const blocks = api.getBlocks().filter(block => `${block.name} ${block.note} ${block.group}`.toLocaleLowerCase('th').includes(query));
    cmsPatternGrid.innerHTML = blocks.map((block, index) => `<button class="cms-pattern-card" type="button" data-cms-pattern="${escapeHtml(block.id)}"><span class="cms-pattern-preview">${api.getMiniHtml(block.id)}</span><span class="cms-pattern-card-copy"><small>${String(index + 1).padStart(2, '0')} · ${escapeHtml(block.group.toUpperCase())}</small><b>${escapeHtml(block.name)}</b><span>${escapeHtml(block.note)}</span></span><span class="cms-pattern-arrow" aria-hidden="true">↗</span></button>`).join('') || '<div class="no-results">ไม่พบรูปแบบที่ตรงกับคำค้น</div>';
  }

  function enterEditor(title, blocks) {
    elements = blocks.map(block => makeElement(block.type, block));
    selectedId = elements[0]?.id || null;
    nextId = elements.length + 1;
    undoStack = [];
    redoStack = [];
    $('#documentTitle').textContent = title;
    $('#saveStatus').textContent = 'ยังไม่บันทึก';
    showMode('editor');
    if (title === 'งาน Reflection ใหม่') setActiveMode('new');
    renderAll();
    fitCanvasToView();
    window.scrollTo(0,0);
  }

  function renderBlock(element) {
    const selected = element.id === selectedId ? ' selected' : '';
    const draggable = ' draggable="true"';
    if (element.type === 'heading') return `<div class="canvas-block heading-block${selected}" data-id="${element.id}"${draggable}><h2 style="text-align:${element.align||'left'}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</h2></div>`;
    if (element.type === 'text') return `<div class="canvas-block text-block${selected}" data-id="${element.id}"${draggable}><p style="text-align:${element.align||'left'}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</p></div>`;
    if (element.type === 'quote') return `<div class="canvas-block quote-block${selected}" data-id="${element.id}"${draggable}><blockquote style="text-align:${element.align||'left'}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</blockquote></div>`;
    if (element.type === 'image') return `<div class="canvas-block image-block${selected}" data-id="${element.id}" style="width:${Number(element.width)||100}%"${draggable}><div class="image-placeholder">${element.src?`<img src="${escapeHtml(element.src)}" alt="${escapeHtml(element.alt)}">`:`<span>▧ &nbsp; ${escapeHtml(element.alt || 'เพิ่มรูปภาพจากแถบปรับแต่ง')}</span>`}</div></div>`;
    if (element.type === 'split') return `<div class="canvas-block split-block${selected}" data-id="${element.id}"${draggable}>${element.imageSide==='right'?`<div class="split-copy"><strong contenteditable="true" data-part="title">${textHtml(element.title)}</strong><span contenteditable="true" data-part="text">${textHtml(element.text)}</span></div>`:''}<div class="image-placeholder" style="width:${element.width||100}%;${element.imageSide==='right'?'margin-left:auto':''}">${element.src?`<img src="${escapeHtml(element.src)}" alt="${escapeHtml(element.alt)}">`:`<span>▧ &nbsp; ${escapeHtml(element.alt || 'เพิ่มรูปภาพ')}</span>`}</div>${element.imageSide!=='right'?`<div class="split-copy"><strong contenteditable="true" data-part="title">${textHtml(element.title)}</strong><span contenteditable="true" data-part="text">${textHtml(element.text)}</span></div>`:''}</div>`;
    return `<div class="canvas-block divider-block${selected}" data-id="${element.id}"${draggable}><hr></div>`;
  }

  function renderArtboard() {
    artboard.innerHTML = elements.length ? elements.map(renderBlock).join('') : '<div class="editor-empty"><span>✳</span><b>เริ่มสร้างเรื่องราวของคุณ</b><p>เลือกองค์ประกอบจากแถบซ้าย หรือเพิ่มรูปแบบจากเทมเพลต</p></div>';
    artboard.style.transform = `scale(${zoom})`;
    $('#zoomLabel').textContent = `${Math.round(zoom*100)}%`;
    $('#canvasDimensions').textContent = `DESKTOP · 960 PX`;
  }

  function renderLayers() {
    $('#layerCount').textContent = elements.length;
    layerList.innerHTML = elements.map((element,index) => `<div class="layer-row${element.id===selectedId?' selected':''}" draggable="true" data-layer-id="${element.id}"><span class="layer-icon">${iconFor(element.type)}</span><span class="layer-name">${escapeHtml(element.text?.split('\n')[0] || element.title || titleFor(element.type))}</span><span class="layer-grip">⠿</span></div>`).join('');
  }

  function field(label, content, hint='') {
    return `<div class="inspector-field"><label class="field-label">${label}</label>${content}${hint?`<small class="field-hint">${hint}</small>`:''}</div>`;
  }

  function renderInspector() {
    const element = elements.find(item => item.id === selectedId);
    if (!element) {
      inspector.innerHTML = '<div class="inspector-empty"><span>✳</span><b>เลือกองค์ประกอบ</b><p>คลิกข้อความหรือรูปบนแคนวาส เพื่อปรับแต่งรายละเอียด</p></div>';
      return;
    }
    let fields = '';
    if (['heading','text','quote'].includes(element.type)) {
      fields += `<div class="inspector-group"><h3>เนื้อหา</h3>${field(element.type==='heading'?'ข้อความหัวข้อ':element.type==='quote'?'ข้อความคำพูด':'ข้อความ',`<textarea data-prop="text">${escapeHtml(element.text)}</textarea>`)}</div>`;
      fields += `<div class="inspector-group"><h3>การจัดวาง</h3><div class="align-group">${['left','center','right'].map((align,index)=>`<button type="button" class="${(element.align||'left')===align?'active':''}" data-align="${align}" aria-label="จัด${['ซ้าย','กลาง','ขวา'][index]}">${['≡','☰','≡'][index]}</button>`).join('')}</div></div>`;
    } else if (element.type === 'image' || element.type === 'split') {
      fields += `<div class="inspector-group"><h3>รูปภาพ</h3>${field('ไฟล์รูปภาพ',`<button type="button" class="file-pick" data-pick-image="true">${element.src?'เปลี่ยนรูปภาพ':'เลือกจากอุปกรณ์'} <span>↗</span></button>`)}${field('คำอธิบายรูปภาพ',`<input type="text" data-prop="alt" value="${escapeHtml(element.alt||'')}">`)}${field('ขนาดภาพ',`<div class="range-line"><span>ความกว้าง</span><b data-width-value>${element.width||100}%</b></div><input type="range" min="35" max="100" step="1" data-prop="width" value="${element.width||100}">`)}</div>`;
      if (element.type === 'split') fields += `<div class="inspector-group"><h3>ข้อความคู่ภาพ</h3>${field('หัวข้อ',`<input type="text" data-prop="title" value="${escapeHtml(element.title||'')}">`)}${field('เนื้อหา',`<textarea data-prop="text">${escapeHtml(element.text||'')}</textarea>`)}${field('ตำแหน่งรูปภาพ',`<select data-prop="imageSide"><option value="left" ${element.imageSide!=='right'?'selected':''}>ด้านซ้าย</option><option value="right" ${element.imageSide==='right'?'selected':''}>ด้านขวา</option></select>`)}</div>`;
    } else {
      fields = '<div class="inspector-group"><p class="field-hint">เส้นคั่นใช้แบ่งช่วงเนื้อหา</p></div>';
    }
    inspector.innerHTML = `<div class="selected-label"><span>${iconFor(element.type)}</span><b>${titleFor(element.type)}</b><small>เลือกอยู่</small></div>${fields}<div class="inspector-group"><button class="delete-element" type="button" data-delete="${element.id}">ลบองค์ประกอบ</button></div>`;
  }

  function renderAll() {
    renderArtboard();
    renderLayers();
    renderInspector();
    $('#undoBtn').disabled = !undoStack.length;
    $('#redoBtn').disabled = !redoStack.length;
  }

  function setElements(next, selected = selectedId) {
    undoStack.push(clone(elements));
    if (undoStack.length > 80) undoStack.shift();
    redoStack = [];
    elements = next;
    selectedId = selected;
    renderAll();
    scheduleSave();
  }

  function insertBlock(type,index) {
    const next = clone(elements);
    const item = makeElement(type);
    const selectedIndex = next.findIndex(element => element.id === selectedId);
    const insertAt = Number.isInteger(index) ? Math.max(0,Math.min(index,next.length)) : selectedIndex >= 0 ? selectedIndex+1 : next.length;
    next.splice(insertAt, 0, item);
    setElements(next,item.id);
  }

  function addBlock(type) { insertBlock(type); }

  function selectElement(id) {
    if (!elements.some(element => element.id === id)) return;
    if (selectedId === id) {
      renderLayers();
      renderInspector();
      return;
    }
    selectedId = id;
    renderArtboard();
    renderLayers();
    renderInspector();
  }

  function moveElement(sourceId, targetId, after = false) {
    if (!sourceId || sourceId === targetId) return;
    const next = clone(elements);
    const from = next.findIndex(element => element.id === sourceId);
    const [moving] = next.splice(from,1);
    let to = targetId ? next.findIndex(element => element.id === targetId) : next.length;
    if (to < 0) to = next.length;
    if (after && targetId) to++;
    if (moving) next.splice(to,0,moving);
    setElements(next,sourceId);
  }

  function setProperty(id, key, value, render = true) {
    const element = elements.find(item => item.id === id);
    if (!element) return;
    element[key] = value;
    if (render) {
      renderArtboard();
      renderLayers();
      renderInspector();
    }
    scheduleSave();
  }

  function onInlineEdit(event) {
    const target = event.target.closest('[contenteditable="true"]');
    if (!target) return;
    const block = target.closest('[data-id]');
    const element = elements.find(item => item.id === block?.dataset.id);
    if (!element) return;
    const part = target.dataset.part || 'text';
    element[part] = target.innerText.replace(/\u00a0/g,' ').trimEnd();
    const layer = $(`.layer-row[data-layer-id="${element.id}"] .layer-name`);
    if (layer) layer.textContent = element.text?.split('\n')[0] || element.title || titleFor(element.type);
    $('#saveStatus').textContent = 'มีการแก้ไข';
    scheduleSave();
  }

  let saveTimer;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY,JSON.stringify({title:$('#documentTitle').textContent,elements,nextId}));
        $('#saveStatus').textContent = 'บันทึกอัตโนมัติแล้ว';
      } catch {
        $('#saveStatus').textContent = 'รูปมีขนาดใหญ่เกินบันทึก';
      }
    }, 600);
  }

  function saveDraft() {
    const payload = {title:$('#documentTitle').textContent,elements,nextId};
    try {
      localStorage.setItem(DRAFT_KEY,JSON.stringify(payload));
      $('#saveStatus').textContent = 'บันทึกล่าสุดแล้ว';
      showToast('บันทึกร่างไว้ในเบราว์เซอร์แล้ว');
    } catch {
      showToast('บันทึกไม่สำเร็จ ลองลดขนาดรูปภาพแล้วบันทึกอีกครั้ง');
    }
  }

  function elementToHtml(element) {
    const align = ['left','center','right'].includes(element.align) ? element.align : 'left';
    const imageSource = element.src || '/storage/newsroom/refaction/#####/#####/#####/image.webp';
    const imgWidth = Math.max(35,Math.min(100,Number(element.width)||100));
    const img = `<img class="img-fluid" src="${escapeHtml(imageSource)}" alt="${escapeHtml(element.alt || '')}" style="width:${imgWidth}%;height:auto">`;
    if (element.type === 'heading') return `    <h2 class="news__subtitle mb-4" style="text-align:${align}">${textHtml(element.text)}</h2>`;
    if (element.type === 'text') return `    <p class="mb-4" style="text-align:${align}">${textHtml(element.text)}</p>`;
    if (element.type === 'quote') return `    <blockquote class="my-md-5 my-4" style="text-align:${align}">${textHtml(element.text)}</blockquote>`;
    if (element.type === 'image') return `    <figure class="text-center my-5">${img}</figure>`;
    if (element.type === 'split') {
      const imageCol = `            <div class="col-md-6">\n                <figure class="text-center">${img}</figure>\n            </div>`;
      const textCol = `            <div class="col-md-6">\n                <h4>${textHtml(element.title)}</h4>\n                <p>${textHtml(element.text)}</p>\n            </div>`;
      return `    <div class="row align-items-center my-5">\n${element.imageSide === 'right' ? `${textCol}\n${imageCol}` : `${imageCol}\n${textCol}`}\n    </div>`;
    }
    if (element.type === 'divider') return '    <hr class="my-5">';
    return '';
  }

  function buildExport() {
    const content = elements.map(elementToHtml).filter(Boolean).join('\n\n');
    return `<!-- Reflection Studio · HTML export -->\n<div class="container reflection-content">\n    <div class="row justify-content-center">\n        <div class="col-md-10 col-xl-8">\n${content}\n        </div>\n    </div>\n</div>`;
  }

  function openExport() {
    exportCode.value = buildExport();
    exportDialog.showModal();
  }

  function undo() {
    if (!undoStack.length) return;
    redoStack.push(clone(elements));
    elements = undoStack.pop();
    selectedId = elements[0]?.id || null;
    renderAll();
    scheduleSave();
  }

  function redo() {
    if (!redoStack.length) return;
    undoStack.push(clone(elements));
    elements = redoStack.pop();
    selectedId = elements[0]?.id || null;
    renderAll();
    scheduleSave();
  }

  function fitCanvasToView() {
    const available = Math.max(320,$('#canvasViewport').clientWidth - 56);
    zoom = Math.max(.38,Math.min(1,available / 960));
    renderArtboard();
  }

  function applyFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const element = elements.find(item => item.id === selectedId);
      if (!element || !['image','split'].includes(element.type)) {
        addBlock('image');
        const added = elements.find(item => item.id === selectedId);
        if (added) { added.src = reader.result; added.alt = file.name.replace(/\.[^.]+$/,''); renderAll(); scheduleSave(); }
      } else {
        const next = clone(elements);
        const target = next.find(item => item.id === selectedId);
        target.src = reader.result;
        target.alt = file.name.replace(/\.[^.]+$/,'');
        setElements(next,selectedId);
      }
      showToast('เพิ่มรูปภาพลงในงานแล้ว');
    };
    reader.readAsDataURL(file);
  }

  function setAudioFile(file) {
    if (!file) return;
    if (!file.type.startsWith('audio/') && !/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(file.name)) {
      showToast('เลือกไฟล์เสียง MP3, WAV, M4A, AAC, OGG หรือ FLAC');
      return;
    }
    audioFileObject = file;
    if (audioFileUrl) URL.revokeObjectURL(audioFileUrl);
    audioFileUrl = URL.createObjectURL(file);
    $('#audioFileName').textContent = file.name;
    $('#audioFileSize').textContent = `${(file.size/1024/1024).toFixed(2)} MB`;
    $('#audioFileInfo').hidden = false;
    $('#sourceAudioPreview').hidden = false;
    $('#sourceAudio').src = audioFileUrl;
    $('#audioOutputName').value = file.name.replace(/\.[^.]+$/,'').replace(/[\\/:*?"<>|]/g,'-');
    $('#audioResult').hidden = true;
    if (audioResultUrl) {URL.revokeObjectURL(audioResultUrl);audioResultUrl=null;}
    $('#convertAudio').disabled = !audioEngine?.loaded || audioBusy;
  }

  async function loadAudioEngine() {
    if (audioEngine?.loaded || audioEngineBusy) return;
    if (!window.FFmpegWASM?.FFmpeg) {
      showToast('โหลดตัวแปลงหลักไม่สำเร็จ ลองรีเฟรชหน้าแล้วเปิดอีกครั้ง');
      return;
    }
    audioEngineBusy = true;
    $('#loadEngine').disabled = true;
    $('#loadEngine').textContent = 'กำลังโหลด…';
    $('#engineStatus').textContent = 'กำลังดาวน์โหลดตัวแปลง';
    try {
      const base = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';
      const [coreResponse,wasmResponse] = await Promise.all([fetch(`${base}/ffmpeg-core.js`),fetch(`${base}/ffmpeg-core.wasm`)]);
      if (!coreResponse.ok || !wasmResponse.ok) throw new Error('โหลดไฟล์ตัวแปลงจาก CDN ไม่สำเร็จ');
      const coreBlob = new Blob([await coreResponse.arrayBuffer()],{type:'text/javascript'});
      const wasmBlob = new Blob([await wasmResponse.arrayBuffer()],{type:'application/wasm'});
      audioCoreObjectUrl = URL.createObjectURL(coreBlob);
      audioWasmObjectUrl = URL.createObjectURL(wasmBlob);
      audioEngine = new window.FFmpegWASM.FFmpeg();
      audioEngine.on('log',({message}) => {
        if (/error|failed/i.test(message)) $('#audioProgressLabel').textContent = message.slice(0,100);
      });
      await audioEngine.load({coreURL:audioCoreObjectUrl,wasmURL:audioWasmObjectUrl});
      URL.revokeObjectURL(audioCoreObjectUrl);
      URL.revokeObjectURL(audioWasmObjectUrl);
      audioCoreObjectUrl = null;
      audioWasmObjectUrl = null;
      $('#engineStatus').textContent = 'ตัวแปลงพร้อมใช้งาน';
      $('#loadEngine').textContent = 'พร้อมแล้ว ✓';
      $('#loadEngine').classList.add('engine-ready');
      $('#convertAudio').disabled = !audioFileObject;
      showToast('ตัวแปลงเสียงพร้อมใช้งาน');
    } catch (error) {
      if (audioCoreObjectUrl) URL.revokeObjectURL(audioCoreObjectUrl);
      if (audioWasmObjectUrl) URL.revokeObjectURL(audioWasmObjectUrl);
      audioCoreObjectUrl = null;
      audioWasmObjectUrl = null;
      audioEngine = null;
      $('#engineStatus').textContent = 'โหลดไม่สำเร็จ';
      $('#loadEngine').disabled = false;
      $('#loadEngine').textContent = 'ลองอีกครั้ง';
      showToast(error?.message || 'โหลดตัวแปลงไม่สำเร็จ ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
    } finally {
      audioEngineBusy = false;
    }
  }

  async function convertAudioFile() {
    if (!audioEngine?.loaded || !audioFileObject || audioBusy) return;
    audioBusy = true;
    $('#convertAudio').disabled = true;
    $('#loadEngine').disabled = true;
    $('#audioProgressWrap').hidden = false;
    $('#audioResult').hidden = true;
    $('#audioProgressLabel').textContent = 'กำลังเตรียมไฟล์';
    $('#audioProgressPercent').textContent = '8%';
    $('#audioProgressBar').style.width = '8%';
    try {
      const originalExtension = (audioFileObject.name.match(/\.([^.]+)$/)?.[1] || 'mp3').toLowerCase().replace(/[^a-z0-9]/g,'');
      const inputName = `reflection-input.${originalExtension}`;
      const outputName = 'reflection-output.mp4';
      $('#audioProgressLabel').textContent = 'กำลังแปลงเสียงเป็น MP4';
      $('#audioProgressPercent').textContent = '25%';
      $('#audioProgressBar').style.width = '25%';
      await audioEngine.writeFile(inputName,new Uint8Array(await audioFileObject.arrayBuffer()));
      await audioEngine.exec(['-i',inputName,'-vn','-c:a','aac','-b:a',$('#audioBitrate').value,'-movflags','+faststart',outputName]);
      $('#audioProgressPercent').textContent = '88%';
      $('#audioProgressBar').style.width = '88%';
      const data = await audioEngine.readFile(outputName);
      const blob = new Blob([data],{type:'video/mp4'});
      if (audioResultUrl) URL.revokeObjectURL(audioResultUrl);
      audioResultUrl = URL.createObjectURL(blob);
      const baseName = ($('#audioOutputName').value.trim() || 'reflection-audio').replace(/[\\/:*?"<>|]/g,'-');
      $('#downloadMp4').href = audioResultUrl;
      $('#downloadMp4').download = `${baseName}.mp4`;
      $('#resultAudio').src = audioResultUrl;
      $('#resultDetails').textContent = `${(blob.size/1024/1024).toFixed(2)} MB · AAC ${$('#audioBitrate').value}`;
      $('#audioProgressPercent').textContent = '100%';
      $('#audioProgressBar').style.width = '100%';
      $('#audioProgressLabel').textContent = 'แปลงไฟล์เรียบร้อย';
      $('#audioResult').hidden = false;
      showToast('แปลงไฟล์เสียงเสร็จแล้ว');
      try {await audioEngine.deleteFile(inputName);await audioEngine.deleteFile(outputName);} catch {}
    } catch (error) {
      $('#audioProgressLabel').textContent = 'แปลงไฟล์ไม่สำเร็จ';
      showToast(error?.message || 'แปลงไฟล์ไม่สำเร็จ ลองใช้ไฟล์เสียงอื่น');
    } finally {
      audioBusy = false;
      $('#convertAudio').disabled = !audioFileObject || !audioEngine?.loaded;
      $('#loadEngine').disabled = false;
    }
  }

  $('#categoryFilters').addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;
    renderGallery();
  });
  $('#templateSearch').addEventListener('input',renderGallery);
  $('#cmsPatternSearch').addEventListener('input',renderCmsPatterns);
  structureFrame.addEventListener('load',renderCmsPatterns);
  cmsPatternGrid.addEventListener('click',event => {
    const card = event.target.closest('[data-cms-pattern]');
    if (!card) return;
    const api = structureFrame.contentWindow?.ReflectionBuilderAPI;
    if (!api?.startWith(card.dataset.cmsPattern)) return;
    showMode('patterns');
  });
  $('#studioModes').addEventListener('click',event => {
    const button = event.target.closest('[data-view]');
    if (!button) return;
    const mode = button.dataset.view;
    if (mode === 'new') {
      enterEditor('งาน Reflection ใหม่',[]);
      setActiveMode('new');
      return;
    }
    showMode(mode);
  });
  $$('[data-open-view]').forEach(button => button.addEventListener('click',() => showMode(button.dataset.openView)));
  templateGrid.addEventListener('click',event => {
    const card = event.target.closest('[data-template]');
    if (!card) return;
    const template = templates.find(item => item.id === card.dataset.template);
    enterEditor(template.title,template.blocks);
  });
  templateGrid.addEventListener('keydown',event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-template]')) {
      event.preventDefault();
      const template = templates.find(item => item.id === event.target.dataset.template);
      enterEditor(template.title,template.blocks);
    }
  });
  $('#blankStart').addEventListener('click',() => enterEditor('งาน Reflection ใหม่',[]));
  galleryView.addEventListener('click',event => {
    if (!event.target.closest('#resumeDraft')) return;
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
      if (!draft) return;
      enterEditor(draft.title || 'งาน Reflection',draft.elements || []);
      nextId = Math.max(Number(draft.nextId)||1,...elements.map(item => Number(String(item.id).split('-').pop())+1 || 1));
    } catch { showToast('เปิดร่างที่บันทึกไว้ไม่สำเร็จ'); }
  });
  $('#backToGallery').addEventListener('click',() => {
    showMode('gallery');
  });
  $('#topExport').addEventListener('click',openExport);
  $('#editorExport').addEventListener('click',openExport);
  $('#closeExport').addEventListener('click',() => exportDialog.close());
  $('#copyHtml').addEventListener('click',async () => {
    try { await navigator.clipboard.writeText(exportCode.value); showToast('คัดลอก HTML แล้ว'); }
    catch { exportCode.select(); document.execCommand('copy'); showToast('คัดลอก HTML แล้ว'); }
  });
  $('#downloadHtml').addEventListener('click',() => {
    const blob = new Blob([`<!doctype html><html lang="th"><meta charset="utf-8"><title>Reflection export</title><body>\n${buildExport()}\n</body></html>`],{type:'text/html;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'reflection-content.html'; link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  });
  $('#saveBtn').addEventListener('click',saveDraft);
  $('#undoBtn').addEventListener('click',undo);
  $('#redoBtn').addEventListener('click',redo);
  $$('.insert-grid [data-add]').forEach(button => button.addEventListener('click',() => addBlock(button.dataset.add)));
  $$('.insert-grid [data-add]').forEach(button => button.addEventListener('dragstart',event => {
    draggedType = button.dataset.add;
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('text/plain',`insert:${draggedType}`);
  }));
  $$('.insert-grid [data-add]').forEach(button => button.addEventListener('dragend',() => {draggedType=null}));
  $('#zoomIn').addEventListener('click',() => {zoom=Math.min(1.35,zoom+.1);renderArtboard()});
  $('#zoomOut').addEventListener('click',() => {zoom=Math.max(.55,zoom-.1);renderArtboard()});
  $('#fitCanvas').addEventListener('click',fitCanvasToView);

  artboard.addEventListener('click',event => {
    const block = event.target.closest('[data-id]');
    if (block) selectElement(block.dataset.id);
  });
  artboard.addEventListener('input',onInlineEdit);
  artboard.addEventListener('focusin',event => {
    if (event.target.closest('[contenteditable="true"]')) editBaseline = clone(elements);
  });
  artboard.addEventListener('focusout',event => {
    if (!event.target.closest('[contenteditable="true"]') || !editBaseline) return;
    if (JSON.stringify(editBaseline) !== JSON.stringify(elements)) { undoStack.push(editBaseline); redoStack=[]; }
    editBaseline = null;
    renderLayers();
    renderInspector();
    $('#undoBtn').disabled = !undoStack.length;
  });
  artboard.addEventListener('dragstart',event => {
    const block = event.target.closest('[data-id]');
    if (!block) return;
    draggedId = block.dataset.id;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain',draggedId);
    block.classList.add('dragging');
  });
  artboard.addEventListener('dragend',event => event.target.closest('[data-id]')?.classList.remove('dragging'));
  artboard.addEventListener('dragover',event => {if (draggedId || draggedType) {event.preventDefault();event.dataTransfer.dropEffect=draggedType?'copy':'move'}});
  artboard.addEventListener('drop',event => {
    event.preventDefault();
    const target = event.target.closest('[data-id]');
    const source = event.dataTransfer.getData('text/plain') || draggedId;
    const insertMatch = source?.match(/^insert:(heading|text|image|quote|split|divider)$/);
    if (insertMatch) {
      const targetIndex = elements.findIndex(item => item.id === target?.dataset.id);
      const after = target && event.clientY > target.getBoundingClientRect().top + target.getBoundingClientRect().height/2;
      insertBlock(insertMatch[1],targetIndex < 0 ? elements.length : targetIndex + (after ? 1 : 0));
      draggedType = null;
      return;
    }
    if (!source) return;
    let after = false;
    if (target) after = event.clientY > target.getBoundingClientRect().top + target.getBoundingClientRect().height/2;
    moveElement(source,target?.dataset.id || null,after);
    draggedId = null;
  });

  layerList.addEventListener('click',event => {
    const row = event.target.closest('[data-layer-id]');
    if (row) selectElement(row.dataset.layerId);
  });
  layerList.addEventListener('dragstart',event => {
    const row = event.target.closest('[data-layer-id]');
    if (!row) return;
    draggedId = row.dataset.layerId;
    row.classList.add('dragging');
    event.dataTransfer.setData('text/plain',draggedId);
  });
  layerList.addEventListener('dragend',event => event.target.closest('[data-layer-id]')?.classList.remove('dragging'));
  layerList.addEventListener('dragover',event => {if (draggedId) event.preventDefault()});
  layerList.addEventListener('drop',event => {
    event.preventDefault();
    const row = event.target.closest('[data-layer-id]');
    moveElement(event.dataTransfer.getData('text/plain') || draggedId,row?.dataset.layerId || null,false);
    draggedId = null;
  });

  inspector.addEventListener('input',event => {
    const prop = event.target.dataset.prop;
    if (!prop) return;
    const value = prop === 'width' ? Number(event.target.value) : event.target.value;
    setProperty(selectedId,prop,value,false);
    renderArtboard();
    renderLayers();
    if (prop === 'width') {
      const widthValue = $('[data-width-value]',inspector);
      if (widthValue) widthValue.textContent = `${value}%`;
    }
  });
  inspector.addEventListener('change',event => {
    const prop = event.target.dataset.prop;
    if (prop) setProperty(selectedId,prop,event.target.value,true);
  });
  inspector.addEventListener('click',event => {
    if (event.target.closest('[data-pick-image]')) {imageFile.value='';imageFile.click();return}
    const align = event.target.closest('[data-align]');
    if (align) {setProperty(selectedId,'align',align.dataset.align,true);return}
    const remove = event.target.closest('[data-delete]');
    if (remove) {
      setElements(elements.filter(element => element.id !== remove.dataset.delete),null);
      showToast('ลบองค์ประกอบแล้ว');
    }
  });
  imageFile.addEventListener('change',() => applyFile(imageFile.files?.[0]));
  $('#audioFile').addEventListener('change',() => setAudioFile($('#audioFile').files?.[0]));
  $('#removeAudio').addEventListener('click',() => {
    audioFileObject = null;
    if (audioFileUrl) URL.revokeObjectURL(audioFileUrl);
    audioFileUrl = null;
    $('#audioFile').value = '';
    $('#audioFileInfo').hidden = true;
    $('#sourceAudioPreview').hidden = true;
    $('#convertAudio').disabled = true;
  });
  $('#loadEngine').addEventListener('click',loadAudioEngine);
  $('#convertAudio').addEventListener('click',convertAudioFile);
  const audioDrop = $('#audioDrop');
  audioDrop.addEventListener('dragover',event => {event.preventDefault();audioDrop.classList.add('drag-over')});
  audioDrop.addEventListener('dragleave',() => audioDrop.classList.remove('drag-over'));
  audioDrop.addEventListener('drop',event => {
    event.preventDefault();
    audioDrop.classList.remove('drag-over');
    setAudioFile(event.dataTransfer.files?.[0]);
  });

  document.addEventListener('keydown',event => {
    if (editorView.hidden || exportDialog.open) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {event.preventDefault();event.shiftKey?redo():undo()}
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {event.preventDefault();saveDraft()}
    if ((event.key === 'Delete' || event.key === 'Backspace') && !event.target.closest('[contenteditable],textarea,input,select')) {
      if (selectedId) {setElements(elements.filter(element => element.id !== selectedId),null);showToast('ลบองค์ประกอบแล้ว')}
    }
  });

  renderGallery();
})();
