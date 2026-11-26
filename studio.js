(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const galleryView = $('#galleryView');
  const editorView = $('#editorView');
  const templateGrid = $('#templateGrid');
  const artboard = $('#artboard');
  const layerList = null;
  const inspector = $('#inspector');
  const imageFile = $('#imageFile');
  const exportDialog = $('#exportDialog');
  const exportView = $('#exportView');
  const exportCode = $('#exportCode');
  const templatePreviewDialog = $('#templatePreviewDialog');
  const DRAFT_KEY = 'reflectionStudioDraftV1';
  const DRAFT_DB_NAME = 'reflectionStudioDrafts';
  const DRAFT_STORE = 'drafts';
  const ARTBOARD_WIDTH = 1000;
  const ARTBOARD_PADDING = 96;
  const CONTENT_WIDTH = ARTBOARD_WIDTH - ARTBOARD_PADDING * 2;
  // Three rows on wide screens, four on tablets, and six on phones.
  const TEMPLATES_PER_PAGE = 12;
  let templatePage = 1;

  const starterTemplates = [
    { id:'saf-journey', title:'From Biodiesel to SAF', category:'พลังงาน', tag:'LONGFORM / ENERGY', layout:'energy', date:'10 JUL 2026', source:'From Biodiesel to SAF', description:'บทความยาวแบบเส้นทางพลังงาน: เกริ่นเรื่อง ภาพเปิด ลำดับเหตุการณ์ ประเด็นสำคัญ และบทสรุป', blocks:[
      {type:'heading',text:'From Biodiesel to SAF'}, {type:'text',text:'จากจุดเริ่มต้นของพลังงานหมุนเวียน สู่ระบบนิเวศพลังงานคาร์บอนต่ำ'}, {type:'image',alt:'ภาพเปิดเรื่องพลังงาน',width:100}, {type:'text',text:'เปิดเรื่องด้วยบริบทและความสำคัญของการเปลี่ยนผ่านพลังงาน'}, {type:'heading',text:'จุดเริ่มต้นของการเดินทาง'}, {type:'text',text:'เล่าความเป็นมา เหตุการณ์สำคัญ และสิ่งที่ทำให้เกิดการเปลี่ยนแปลง'}, {type:'image',alt:'ภาพประวัติศาสตร์และการเริ่มต้น',width:82}, {type:'text',text:'เชื่อมโยงประสบการณ์ในอดีตกับโอกาสใหม่ในปัจจุบัน'}, {type:'quote',text:'“การเปลี่ยนผ่านที่ยั่งยืน เกิดจากการพัฒนาต่อเนื่องและความร่วมมือ”'}, {type:'split',imageSide:'left',alt:'ภาพระบบนิเวศพลังงาน',title:'สร้างระบบนิเวศใหม่',text:'อธิบายผู้คน เทคโนโลยี และพันธมิตรที่ร่วมขับเคลื่อน'}, {type:'heading',text:'คุณค่าที่ส่งต่อไปข้างหน้า'}, {type:'text',text:'สรุปผลลัพธ์และทิศทางในอนาคต พร้อมปิดเรื่องด้วยข้อความชวนติดตาม'}
    ]},
    { id:'game-changer', title:'Game Changer', category:'สัมภาษณ์', tag:'LEADERSHIP / INTERVIEW', layout:'interview', date:'24 JUL 2026', source:'Game Changer', description:'บทสัมภาษณ์ผู้บริหารแบบเล่าเป็นเรื่อง มีภาพบุคคล ประโยคเด่น และช่วงคำถามสลับเนื้อหา', blocks:[
      {type:'heading',text:'Game Changer'}, {type:'text',text:'เส้นทางผู้นำและการเปลี่ยนแปลงขององค์กร'}, {type:'split',imageSide:'right',alt:'ภาพผู้ให้สัมภาษณ์',title:'บทสนทนากับผู้นำ',text:'แนะนำผู้ให้สัมภาษณ์ ตำแหน่ง และบริบทของบทสนทนา'}, {type:'text',text:'ปูพื้นหลังของเรื่องด้วยเหตุการณ์สำคัญและความท้าทายในช่วงเริ่มต้น'}, {type:'quote',text:'“การเปลี่ยนแปลงคือการเดินทางที่ต้องเรียนรู้และตัดสินใจต่อเนื่อง”'}, {type:'heading',text:'จากจุดเปลี่ยนสู่การเติบโต'}, {type:'text',text:'คำถาม: อะไรคือสิ่งสำคัญที่สุดในการพาองค์กรก้าวต่อไป?\nคำตอบ: เล่ามุมมองและประสบการณ์ของผู้ให้สัมภาษณ์'}, {type:'image',alt:'ภาพระหว่างบทสัมภาษณ์',width:86}, {type:'heading',text:'บทเรียนจากการตัดสินใจ'}, {type:'text',text:'คำถาม: บทเรียนใดที่ยังใช้ได้ในวันนี้?\nคำตอบ: เติมคำตอบพร้อมรายละเอียดและตัวอย่างจริง'}, {type:'quote',text:'“ทุกคนเรียนรู้จากสิ่งที่ทำ และนำบทเรียนนั้นไปสู่ก้าวต่อไป”'}, {type:'text',text:'ปิดบทสนทนาด้วยความคิดที่อยากฝากถึงผู้อ่าน'}
    ]},
    { id:'together-strong', title:'Together, We Stand Strong', category:'ชุมชน', tag:'COMMUNITY / MANY VOICES', layout:'voices', date:'23 AUG 2024', source:'Together, We Stand Strong', description:'เรื่องราวชุมชนหลายเสียง: ภาพนำ บทสัมภาษณ์คนหลายคน และแกลเลอรีปิดท้าย', blocks:[
      {type:'heading',text:'Together, We Stand Strong'}, {type:'text',text:'เรื่องราวของความร่วมมือที่เดินทางมาด้วยกัน'}, {type:'image',alt:'ภาพเปิดเรื่องชุมชน',width:100}, {type:'text',text:'แนะนำชุมชน จุดเริ่มต้น และความสัมพันธ์ที่เติบโตต่อเนื่อง'}, {type:'quote',text:'“เมื่อเราเดินไปด้วยกัน ทุกคนก็ไปได้ไกลขึ้น”'}, {type:'heading',text:'เติบโตและสร้างโอกาสร่วมกัน'}, {type:'split',imageSide:'left',alt:'ภาพกิจกรรมร่วมกัน',title:'พัฒนาศักยภาพ',text:'เล่ากิจกรรมและโอกาสที่เกิดจากการสนับสนุน'}, {type:'image',alt:'ภาพกิจกรรมชุมชน',width:74}, {type:'heading',text:'เสียงจากผู้คนในเรื่องราว'}, {type:'quote',text:'“ขอบคุณที่อยู่เคียงข้างกันมาตลอดเส้นทาง”'}, {type:'text',text:'เสียงที่หนึ่ง: เล่าประสบการณ์จากผู้ร่วมโครงการคนแรก'}, {type:'quote',text:'“ความสำเร็จเกิดจากการลงมือทำร่วมกัน”'}, {type:'text',text:'เสียงที่สอง: เติมมุมมองจากผู้ร่วมโครงการอีกคน'}, {type:'image',alt:'ภาพรวมผู้คนและบรรยากาศ',width:100}, {type:'text',text:'สรุปความหมายของการเติบโตไปด้วยกัน'}
    ]},
    { id:'fry-to-fly', title:'Fry to Fly × No Refry', category:'แคมเปญ', tag:'CAMPAIGN / EXPLAINER', layout:'campaign', date:'12 APR 2024', source:'Call to Action: Fry to Fly and No Refry', description:'หน้าแคมเปญแบบอธิบายสองโครงการ เชื่อมที่มา ประโยชน์ วิธีเข้าร่วม และคำชวนลงมือทำ', blocks:[
      {type:'heading',text:'Fry to Fly × No Refry'}, {type:'text',text:'สองแนวคิดที่เชื่อมสุขภาพ สิ่งแวดล้อม และพลังงานสะอาด'}, {type:'image',alt:'ภาพหลักของแคมเปญ',width:100}, {type:'text',text:'เกริ่นปัญหาและที่มาของแคมเปญ เพื่อพาผู้อ่านเข้าสู่แนวทางแก้ไข'}, {type:'heading',text:'สองแคมเปญ หนึ่งเป้าหมาย'}, {type:'split',imageSide:'left',alt:'ภาพการรวบรวมน้ำมันใช้แล้ว',title:'Fry to Fly',text:'อธิบายการรวบรวมน้ำมันใช้แล้วและการนำไปสร้างคุณค่าใหม่'}, {type:'split',imageSide:'right',alt:'ภาพการเลือกอาหารปลอดภัย',title:'No Refry',text:'อธิบายแนวทางบริโภคอย่างปลอดภัยและการรับรองร้านค้า'}, {type:'quote',text:'“การเปลี่ยนแปลงเริ่มได้จากการตัดสินใจในทุกวัน”'}, {type:'heading',text:'เข้าร่วมได้อย่างไร'}, {type:'text',text:'ขั้นตอนที่ 1: เตรียมน้ำมันใช้แล้วอย่างถูกวิธี\nขั้นตอนที่ 2: เลือกจุดรับหรือช่องทางที่ร่วมรายการ\nขั้นตอนที่ 3: ส่งต่อวัตถุดิบเพื่อสร้างประโยชน์'}, {type:'image',alt:'ภาพขั้นตอนหรือจุดบริการ',width:90}, {type:'heading',text:'ร่วมสร้างโลกที่ยั่งยืน'}, {type:'text',text:'ปิดท้ายด้วยช่องทางติดต่อ จุดรับ หรือคำเชิญชวนให้เริ่มลงมือทำ'}
    ]},
    { id:'best-employer', title:'A Committed Space for Happiness', category:'คนทำงาน', tag:'PEOPLE / CULTURE', layout:'people', date:'05 JUL 2024', source:'Bangchak - A Committed Space for Employee’s Happiness', description:'เรื่องราววัฒนธรรมองค์กร: เปิดภาพใหญ่ เล่าคนและค่านิยม คั่นด้วยภาพกิจกรรม และปิดด้วยเสียงจากผู้นำ', blocks:[
      {type:'heading',text:'A Committed Space for Happiness'}, {type:'text',text:'พื้นที่ที่ผู้คนเติบโตและทำงานร่วมกันอย่างมีความหมาย'}, {type:'image',alt:'ภาพทีมงานหรือองค์กร',width:100}, {type:'text',text:'เล่าบริบทขององค์กรและความตั้งใจที่มีต่อผู้คน'}, {type:'heading',text:'ดูแลความสุขและศักยภาพ'}, {type:'text',text:'อธิบายแนวคิดหรือโครงการที่ช่วยให้สมาชิกเติบโตในหลายมิติ'}, {type:'image',alt:'ภาพกิจกรรมพนักงาน',width:72}, {type:'image',alt:'ภาพบรรยากาศการทำงาน',width:72}, {type:'heading',text:'ค่านิยมที่ขับเคลื่อนวัฒนธรรม'}, {type:'split',imageSide:'right',alt:'ภาพทีมทำงานร่วมกัน',title:'เติบโตไปด้วยกัน',text:'เชื่อมค่านิยม การทำงาน และเป้าหมายขององค์กร'}, {type:'heading',text:'ความสำเร็จที่เกิดจากทุกคน'}, {type:'text',text:'เล่าการยอมรับหรือผลลัพธ์ที่สะท้อนการดูแลบุคลากร'}, {type:'quote',text:'“องค์กรที่แข็งแรงเริ่มจากคนที่มีความสุขและได้เติบโต”'}, {type:'text',text:'ปิดท้ายด้วยทิศทางและคำขอบคุณถึงผู้คนในองค์กร'}
    ]},
    { id:'grow-together', title:'เติบโตไปด้วยกัน', category:'สังคม', tag:'SOCIAL IMPACT / TESTIMONIAL', layout:'impact', date:'13 FEB 2026', source:'เพราะการเติบโตที่แท้จริงคือการเติบโตไปด้วยกัน', description:'บทความผลลัพธ์ทางสังคมที่ให้คนในชุมชนเล่าเอง มีภาพหลัก คำบอกเล่า และสรุปผลกระทบ', blocks:[
      {type:'heading',text:'เติบโตไปด้วยกัน'}, {type:'text',text:'เรื่องเล่าของโอกาสที่ส่งต่อจากรุ่นหนึ่งไปสู่อีกรุ่นหนึ่ง'}, {type:'image',alt:'ภาพคนหรือชุมชนในเรื่อง',width:100}, {type:'text',text:'เกริ่นถึงความต้องการของชุมชนและจุดเริ่มต้นของการสนับสนุน'}, {type:'quote',text:'“โอกาสที่ได้รับ เปลี่ยนเส้นทางชีวิตของคนคนหนึ่งได้”'}, {type:'heading',text:'เมื่อโอกาสกลายเป็นความเปลี่ยนแปลง'}, {type:'text',text:'เล่าผลลัพธ์ผ่านเหตุการณ์จริงและช่วงเวลาสำคัญ'}, {type:'split',imageSide:'right',alt:'ภาพผู้เล่าเรื่อง',title:'เสียงจากคนในชุมชน',text:'พื้นที่สำหรับคำบอกเล่าจากผู้ได้รับโอกาสหรือครอบครัว'}, {type:'image',alt:'ภาพบรรยากาศชุมชน',width:82}, {type:'heading',text:'ความหมายของการส่งต่อ'}, {type:'text',text:'สรุปผลต่อผู้คน ชุมชน และการทำงานร่วมกันในระยะยาว'}, {type:'quote',text:'“ความสำเร็จมีความหมาย เมื่อเราแบ่งปันให้คนอื่นเติบโตด้วย”'}
    ]},
    { id:'financial-pillars', title:'Strength, Confidence, Development', category:'การเงิน', tag:'BUSINESS / THREE PILLARS', layout:'pillars', date:'16 AUG 2024', source:'Strength, Confidence, Development: Three Pillars of Financial Management', description:'บทสัมภาษณ์เชิงธุรกิจที่แบ่งเป็นสามเสาหลัก พร้อมคำพูดผู้บริหารและบทสรุป', blocks:[
      {type:'heading',text:'Strength, Confidence, Development'}, {type:'text',text:'สามเสาหลักทางการเงินเพื่อการเติบโตที่มั่นคง'}, {type:'image',alt:'ภาพผู้ให้สัมภาษณ์',width:100}, {type:'text',text:'แนะนำผู้บริหารและมุมมองต่อการเปลี่ยนแปลงขององค์กร'}, {type:'quote',text:'“รากฐานทางการเงินที่แข็งแรงช่วยสนับสนุนการเติบโต”'}, {type:'heading',text:'Protecting the Balance Sheet'}, {type:'text',text:'เสาหลักที่หนึ่ง: ดูแลความแข็งแรงของงบดุลและใช้เงินลงทุนอย่างมีประสิทธิภาพ'}, {type:'image',alt:'ภาพประกอบเสาหลักที่หนึ่ง',width:78}, {type:'heading',text:'Communicating Value'}, {type:'text',text:'เสาหลักที่สอง: สื่อสารคุณค่าของธุรกิจและสร้างความเชื่อมั่น'}, {type:'split',imageSide:'left',alt:'ภาพธุรกิจและการเติบโต',title:'Transform People & Process',text:'เสาหลักที่สาม: พัฒนาคนและกระบวนการให้พร้อมต่อการเปลี่ยนแปลง'}, {type:'quote',text:'“พร้อมปรับตัวและพัฒนาต่อไป เพื่อสร้างคุณค่าให้ทุกฝ่าย”'}, {type:'text',text:'ปิดท้ายด้วยเป้าหมายและสิ่งที่อยากให้ผู้มีส่วนเกี่ยวข้องจดจำ'}
    ]}
  ];
  const templates = window.ReflectionArticleTemplates?.length ? window.ReflectionArticleTemplates : starterTemplates;
  let elements = [];
  let selectedId = null;
  let nextId = 1;
  let zoom = 1;
  let undoStack = [];
  let redoStack = [];
  let draggedId = null;
  let draggedType = null;
  let sourceImageSelection = null;
  let sourceTextSelection = null;
  let activeTextField = null;
  const boardTextTools = $('#boardTextTools');
  const boardSettings = $('#boardSettings');
  const textAlignClasses = ['text-left','text-center','text-right'];
  let resizeState = null;
  let inspectorBaseline = null;
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
  let draftDbPromise = null;
  let draftSaveQueue = Promise.resolve();
  let draftSaveRevision = 0;
  let resumeCheckRevision = 0;

  const clone = value => JSON.parse(JSON.stringify(value));
  const uid = () => `element-${nextId++}`;
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const textHtml = value => escapeHtml(value).replace(/\r?\n/g, '<br>');
  const titleFor = type => ({heading:'หัวข้อ',text:'ข้อความ',image:'รูปปกติ',quote:'คำพูด',split:'รูป + เนื้อหา',divider:'เส้นคั่น',banner:'แถบเน้น',button:'ปุ่มลิงก์',columns:'สองคอลัมน์',spacer:'ช่องว่าง',sourcePage:'หน้าเต็มจาก Template'}[type] || 'องค์ประกอบ');
  const imageStyleName = style => ({normal:'รูปปกติ',highlight:'รูป Highlight',green:'Highlight พื้นเขียว',greenText:'Highlight พื้นเขียว + ข้อความ'}[style] || 'รูปปกติ');
  const iconFor = type => ({heading:'T',text:'¶',image:'▧',quote:'“',split:'▤',divider:'—'}[type] || '•');
  const legacyPatterns = window.ReflectionLegacyPatterns;
  const legacyBlocks = legacyPatterns?.blocks || [];
  const legacyBlockMap = new Map(legacyBlocks.map(block => [block.id,block]));
  const legacyImageTypes = new Set(legacyPatterns?.imageTypes || []);
  if(legacyPatterns?.generateHtml) {
    for(const template of templates) {
      let imageIndex=0;
      if(template.patterns) template.markup=legacyPatterns.generateHtml(template.patterns);
      if(!template.markup) continue;
      template.markup=template.markup.replace(/<img\b[^>]*>/gi,tag=>{
        const index=++imageIndex;
        const width=Number((tag.match(/\bwidth="(\d+)"/i)||[])[1]||0);
        const shape=(tag.match(/data-template-placeholder="([^"]+)"/i)||[])[1]||(width===450?'portrait':width>0&&width<=60?'square':'wide');
        const src=`/storage/newsroom/refaction/#####/#####/#####/template-image-${String(index).padStart(2,'0')}.webp`;
        const clean=tag.replace(/\s+data-template-placeholder=("[^"]*"|'[^']*')/gi,'').replace(/\s+src=("[^"]*"|'[^']*')/i,` src="${src}"`);
        return clean.replace(/\s*\/?\s*>$/,` data-template-placeholder="${shape}">`);
      });
      template.markup=template.markup.replace(/<audio\b[^>]*>/gi,tag=>tag.replace(/\s+src=("[^"]*"|'[^']*')/i,' src="/storage/newsroom/refaction/#####/#####/#####/Reflection-#####.mp4"'));
      template.imageCount=imageIndex;
      template.audioCount=(template.markup.match(/<audio\b/gi)||[]).length;
    }
  }

  function normalizeTemplateLorem(markup) {
    if (!markup || !window.DOMParser) return markup;
    const parsed = new DOMParser().parseFromString(`<div id="template-root">${markup}</div>`, 'text/html');
    const root = parsed.querySelector('#template-root');
    const walker = parsed.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    for (const node of textNodes) {
      const value = node.nodeValue || '';
      if (!value.trim()) continue;
      const leading = value.match(/^\s*/)?.[0] || '';
      const trailing = value.match(/\s*$/)?.[0] || '';
      const targetLength = Math.max(24, value.trim().length);
      let lorem = '';
      while (lorem.length < targetLength) lorem += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
      node.nodeValue = (leading || ' ') + lorem.trimEnd() + (trailing || ' ');
    }
    return root.innerHTML;
  }
  for (const template of templates) {
    if (template.markup) template.markup = normalizeTemplateLorem(template.markup);
  }

  function legacyElementName(element) { return legacyBlockMap.get(element.legacyType)?.name || 'รูปแบบ Reflection'; }
  const shelfLabels = {
    contentHeading:'หัวข้อ H4', contentText:'ย่อหน้า', contentBlockquote:'คำพูดอ้างอิง',
    contentSplitQuoteLeft:'Quote รูปซ้าย', contentSplitQuoteRight:'Quote รูปขวา',
    contentSplitImageLeft:'รูปซ้าย ครึ่งเขียว', contentSplitImageRight:'รูปขวา ครึ่งเขียว',
    contentPortraitQuote:'รูปคู่คำพูด', contentModal:'ปุ่ม Popup', contentSpeakers:'คำพูดหลายคน'
  };
  function legacyHasImage(element) { return element?.type === 'legacy' && legacyImageTypes.has(element.legacyType); }
  function legacyDefaultWidth(type) {
    return ({highlightImage:100,highlightGreenText:82,highlightGreenEmpty:82,contentQuoteImage:62,contentSplitQuoteRight:100,contentSplitQuoteLeft:100,contentSplitImageLeft:100,contentSplitImageRight:100,contentPortraitQuote:100,contentModal:72}[type] || 100);
  }

  function renderLegacyTools() {
    const root = $('#legacyToolGroups');
    if (!root || !legacyPatterns) return;
    root.innerHTML = legacyPatterns.groups.map(group => `<section class="tool-category legacy-tool-category" aria-labelledby="legacyGroup-${group.id}"><h3 class="tool-category-title" id="legacyGroup-${group.id}">${escapeHtml(group.title)}</h3><div class="insert-grid">${legacyBlocks.filter(block=>block.group===group.id).map(block=>`<button class="legacy-tool-card" data-legacy-add="${escapeHtml(block.id)}" draggable="true" type="button" aria-label="เพิ่ม ${escapeHtml(shelfLabels[block.id] || block.name)}">${group.id === 'content' ? toolPreviewMarkup(block.id) : legacyMiniMarkup(block.mini)}<b>${escapeHtml(shelfLabels[block.id] || block.name)}</b></button>`).join('')}</div></section>`).join('');
    root.querySelectorAll('[data-legacy-add]').forEach(button => {
      button.addEventListener('click',() => addLegacyBlock(button.dataset.legacyAdd));
      button.addEventListener('dragstart',event => {
        draggedType = `legacy:${button.dataset.legacyAdd}`;
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.setData('text/plain',draggedType);
      });
      button.addEventListener('dragend',() => {draggedType=null});
    });
    const recipes = extraTemplateTools();
    if (!recipes.size) return;
    const group = document.createElement('section');
    group.className = 'tool-category legacy-tool-category';
    group.innerHTML = '<h3 class="tool-category-title">รูปแบบจากเทมเพลต</h3><div class="insert-grid"></div>';
    const grid = $('.insert-grid',group);
    for (const [key, recipe] of recipes) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'legacy-tool-card';
      button.draggable = true;
      button.innerHTML = `<span class="source-template-preview template-tool-preview" aria-hidden="true">${sourceThumbMarkup(wrapTemplateFragment(recipe.markup,recipe.sourcePath))}</span><b>${escapeHtml(recipe.title)}</b>`;
      button.addEventListener('click',() => insertTemplateTool(key));
      button.addEventListener('dragstart',event => {
        draggedType = `template-tool:${key}`;
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.setData('text/plain',draggedType);
      });
      button.addEventListener('dragend',() => {draggedType=null});
      grid.append(button);
    }
    root.append(group);
  }

  function legacyMiniMarkup(type) {
    const parts = {
      subtitle:['title-line','short-line'], audio:['play-dot','control-line','control-dot'], subtitleAudio:['title-line','audio-line'],
      highlightImage:['highlight-mini-image'], highlightGreenText:['green-highlight-image','green-highlight-band'], highlightGreenEmpty:['green-highlight-image','green-highlight-band'],
      contentQuoteImage:['quote-image'], contentHeading:['title-line'], contentText:['text-line','text-line','short-line'], contentBlockquote:['quote-mark','quote-line'],
      contentSplitQuoteRight:['split-quote-image','split-quote-copy'], contentSplitQuoteLeft:['split-quote-image','split-quote-copy'],
      contentSplitImageLeft:['split-quote-image','split-quote-copy'], contentSplitImageRight:['split-quote-image','split-quote-copy'],
      contentMedia:['pattern-mini-icon','pattern-mini-lines'], contentQuoteCard:['pattern-mini-quote','pattern-mini-lines'],
      contentPortraitQuote:['pattern-mini-image','pattern-mini-quote'], contentModal:['pattern-mini-window','pattern-mini-button'],
      contentSpeakers:['pattern-mini-speakers']
    }[type] || ['text-line','short-line'];
    return `<span class="mini mini-${escapeHtml(type)}" aria-hidden="true">${parts.map(part=>`<i class="${part}"></i>`).join('')}</span>`;
  }

  function toolPreviewMarkup(type) {
    const photo = '<i class="tool-preview-photo"></i>';
    const title = '<i class="tool-preview-title"></i>';
    const lines = '<i class="tool-preview-lines"></i>';
    const copy = '<span class="tool-preview-copy">' + title + lines + '</span>';
    const split = side => `<span class="tool-preview-split picture-${side}">${photo}${copy}</span>`;
    const quote = '<span class="tool-preview-quote"><b>“</b>' + lines + '</span>';
    const link = '<i class="tool-preview-link">↗</i>';
    const previews = {
      contentQuoteImage:photo,
      contentHeading:title,
      contentText:lines,
      contentBlockquote:quote,
      contentSplitQuoteLeft:split('left'),
      contentSplitQuoteRight:split('right'),
      contentSplitImageLeft:split('left'),
      contentSplitImageRight:split('right'),
      contentMedia:'<span class="tool-preview-media"><i>✦</i>' + copy + '</span>',
      contentQuoteCard:'<span class="tool-preview-quote-card">' + quote + '<i class="tool-preview-byline"></i></span>',
      contentPortraitQuote:'<span class="tool-preview-media">' + photo + quote + '</span>',
      contentModal:'<span class="tool-preview-window">' + copy + '<i>×</i></span>',
      contentSpeakers:'<span class="tool-preview-speakers">' + quote + quote + '</span>',
      heading:title,
      text:lines,
      quote,
      banner:'<span class="tool-preview-banner">' + title + '</span>',
      normal:photo,
      highlight:photo,
      green:photo,
      greenText:photo + '<i class="tool-preview-caption"></i>',
      split:split('left'),
      divider:'<span class="tool-preview-divider">' + lines + '<i></i>' + lines + '</span>',
      button:link,
      columns:'<span class="tool-preview-columns">' + copy + copy + '</span>',
      spacer:'<span class="tool-preview-spacer"><i></i><span>↕</span><i></i></span>'
    };
    return `<span class="tool-preview tool-preview--${type}" aria-hidden="true">${previews[type] || lines}</span>`;
  }

  function decorateIndependentTools() {
    $$('.insert-grid [data-add]').forEach(button => {
      const icon = button.querySelector('.insert-glyph');
      const type = button.dataset.imageStyle || button.dataset.add;
      icon?.insertAdjacentHTML('afterend',toolPreviewMarkup(type));
      icon?.remove();
    });
  }

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
    $('#audioView').hidden = mode !== 'audio';
    exportView.hidden = mode !== 'export';
    if (mode !== 'editor') setActiveMode(mode);
    window.scrollTo(0,0);
  }

  function makeElement(type, overrides = {}) {
    const defaults = {
      heading:{text:'หัวข้อเรื่องราวของคุณ',fontSize:36,color:'#20271e',align:'left',background:'#f5f5f1',padding:0},
      text:{text:'คลิกเพื่อเพิ่มข้อความ เล่าเรื่องราวและรายละเอียดที่ต้องการสื่อสารกับผู้อ่าน',fontSize:18,color:'#41483f',align:'left',background:'#f5f5f1',padding:0},
      image:{src:'',alt:'คำอธิบายรูปภาพ',width:100,aspectRatio:9/16,align:'center',fit:'cover',radius:0,imageStyle:'normal',caption:'เขียนข้อความประกอบรูปภาพที่นี่',fontSize:18},
      quote:{text:'“เพิ่มประโยคสำคัญที่อยากให้ผู้อ่านจดจำ”',fontSize:24,color:'#384532',align:'left',background:'#e9eee3',padding:24},
      split:{imageSide:'left',src:'',alt:'คำอธิบายรูปภาพ',title:'หัวข้อย่อย',text:'เพิ่มข้อความประกอบรูปภาพที่นี่',width:100,aspectRatio:9/16,fit:'cover',background:'#e8ece3'},
      divider:{},
      banner:{title:'ข้อความสำคัญของเรื่อง',text:'ใช้แถบสีเพื่อเน้นประเด็นหรือคำชวนให้ลงมือทำ',fontSize:24,color:'#ffffff',background:'#397e22',align:'center',padding:36},
      button:{text:'ดูรายละเอียดเพิ่มเติม',url:'#',fontSize:18,color:'#ffffff',background:'#397e22',align:'left',padding:14},
      columns:{leftTitle:'หัวข้อฝั่งซ้าย',leftText:'เขียนรายละเอียดหรือข้อมูลประกอบฝั่งซ้าย',rightTitle:'หัวข้อฝั่งขวา',rightText:'เขียนรายละเอียดหรือข้อมูลประกอบฝั่งขวา',fontSize:18,color:'#41483f',background:'#eef2e9',padding:24},
      legacy:{legacyType:'subtitle',text:'Lorem....',audioSrc:'',src:'',variant:'1',title:'',text2:'',caption:'',label:'',speakers:[]},
      sourcePage:{markup:'',sourceId:'',imageCount:0},
      spacer:{height:48}
    };
    return {id:uid(),type,...clone(defaults[type] || {}),...overrides};
  }

  const safeColor = value => /^#[0-9a-f]{6}$/i.test(String(value||'')) ? value : '#20271e';
  const safeHref = value => /^(https?:|mailto:|tel:|#|\/)/i.test(String(value||'')) ? String(value) : '#';
  const imageWidthBase = element => element.type === 'split' ? Math.round((CONTENT_WIDTH - 48 - 15) / 2) : element.type === 'legacy' ? ARTBOARD_WIDTH : CONTENT_WIDTH;
  const imageMaxPercent = element => ['split','legacy'].includes(element.type) ? 100 : 120;
  function imageWidthPx(element) {
    const block = element.id && artboard.querySelector(`[data-id="${CSS.escape(element.id)}"]`);
    const frame = block?.querySelector('.image-placeholder,.preview-image-placeholder');
    return frame?.offsetWidth || Math.max(1,Math.round(imageWidthBase(element) * Math.max(10,Math.min(imageMaxPercent(element),Number(element.width)||100)) / 100));
  }
  const imageAspectRatio = element => Number.isFinite(Number(element.aspectRatio)) && Number(element.aspectRatio)>0.02 && Number(element.aspectRatio)<20 ? Number(element.aspectRatio) : 9/16;
  const textStyle = element => `font-size:${Math.max(18,Math.min(72,Number(element.fontSize)||18))}px;color:${safeColor(element.color)};text-align:${['left','center','right'].includes(element.align)?element.align:'left'}`;
  function cleanSourceMarkup(markup, keepTemplateHints = false) {
    let clean=String(markup||'').replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'').replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,'').replace(/\s+contenteditable=("[^"]*"|'[^']*')/gi,'').replace(/\s+data-source-edit=("[^"]*"|'[^']*')/gi,'').replace(/\s+data-source-image=("[^"]*"|'[^']*')/gi,'').replace(/\s+data-source-frame=("[^"]*"|'[^']*')/gi,'').replace(/\s+draggable=("[^"]*"|'[^']*')/gi,'');
    if(!keepTemplateHints) clean=clean.replace(/\s+data-template-placeholder=("[^"]*"|'[^']*'|[^\s>]+)/gi,'');
    return clean;
  }
  const sourceTextTags = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,td,th';
  const sourceTextContainers = `${sourceTextTags},div,section,article`;
  const sourceMedia = 'img,audio,video,iframe,svg,button,[data-source-frame]';

  function sourceTextNodes(root) {
    return $$(`${sourceTextTags},div`,root).filter(node => {
      if (node.querySelector(`${sourceTextContainers},${sourceMedia},ul,ol,table`)) return false;
      if (node.closest('script,style,audio,video,[data-source-frame]')) return false;
      return node.matches(sourceTextTags) || Boolean(node.textContent.trim());
    });
  }

  function sourcePreviewMarkup(markup, visualTemplate = false, editing = false, element = null) {
    let imageIndex=0;
    const clean=cleanSourceMarkup(markup,true).replace(/<img\b[^>]*>/gi,tag=>{
      const index=imageIndex++;
      const width=Number(element?.imageWidths?.[index]);
      const imageSource=(tag.match(/\bsrc=(['"])(.*?)\1/i)||[])[2]||'';
      const hasUserImage=/^(?:data:image\/|blob:)/i.test(imageSource);
      const marked=tag.replace(/\s*\/?\s*>$/,' data-source-image="'+index+'">');
      const shape=(tag.match(/data-template-placeholder="([^"]+)"/i)||[])[1]||'wide';
      const nativeWidth=Number((tag.match(/\bwidth="(\d+)"/i)||[])[1]||0);
      const fullWidth=/\bw-100\b/.test(tag);
      const frameWidth=width?`width:${Math.max(10,Math.min(120,width))}%`:nativeWidth&&!fullWidth?`width:${nativeWidth}px;max-width:100%`:'';
      const isSelected = editing && index === sourceImageSelection?.index && sourceImageSelection?.elementId === element?.id;
      let imageControl = '';
      if (editing && visualTemplate) {
        const action = hasUserImage ? 'เปลี่ยนรูปภาพ' : 'เพิ่มรูปภาพ';
        imageControl = `<button class="source-image-pick${hasUserImage ? ' source-image-replace' : ''}" data-source-pick type="button" aria-label="${action} ตำแหน่งที่ ${index + 1}"><span aria-hidden="true">${hasUserImage ? '↻' : '+'}</span> ${action}</button>`;
      } else if (visualTemplate && !hasUserImage) {
        imageControl = '<span class="source-template-green-label" aria-hidden="true">IMAGE</span>';
      }
      return `<span class="source-image-frame${visualTemplate?' source-template-green-frame shape-'+escapeHtml(shape)+(hasUserImage?' has-user-image':''):''}${isSelected?' source-image-selected':''}" data-source-frame="${index}" style="${frameWidth}">${marked}${imageControl}${isSelected?renderResizeHandles({id:selectedId}):''}</span>`;
    });
    const preview = clean.replace(/(src|poster)="\/(storage\/[^\"]+)"/gi,'$1="https://www.bangchak.co.th/$2"');
    if (!editing) return preview;
    const fragment = document.createElement('template');
    fragment.innerHTML = preview;
    sourceTextNodes(fragment.content).forEach((node,index) => {
      node.dataset.sourceEdit = index;
      node.setAttribute('contenteditable','true');
      node.setAttribute('spellcheck','false');
    });
    return fragment.innerHTML;
  }
  function sourceHtmlFromPreview(root) {
    const copy=root.cloneNode(true);
    const current=elements.find(item=>item.id===root.closest('[data-id]')?.dataset.id);
    copy.querySelectorAll('[data-template-preview-only]').forEach(node=>node.remove());
    copy.querySelectorAll('[data-source-text-selected]').forEach(node=>node.removeAttribute('data-source-text-selected'));
    copy.querySelectorAll('[data-source-edit]').forEach(node=>node.removeAttribute('spellcheck'));
    copy.querySelectorAll('.source-image-frame').forEach(frame => {
      const image = frame.querySelector('img');
      if (image) frame.replaceWith(image);
      else frame.remove();
    });
    return cleanSourceMarkup(copy.innerHTML,Boolean(current?.visualTemplate)).replace(/https:\/\/www\.bangchak\.co\.th\//gi,'/');
  }
  function sourceThumbMarkup(markup) {
    return cleanSourceMarkup(markup,true)
      .replace(/<audio\b[^>]*>[\s\S]*?<\/audio\s*>|<audio\b[^>]*\/?\s*>/gi,'<span class="source-thumb-audio"><b>▶</b><span>00:00</span><i></i></span>')
      .replace(/<img\b([^>]*)>/gi,(_,attrs)=>{
        const width=Number((attrs.match(/\bwidth="(\d+)"/i)||[])[1]||0);
        const fullWidth=/\bw-100\b/.test(attrs);
        const sizing=width&&!fullWidth?` style="width:${width}px;max-width:100%"`:'';
        return `<span class="source-thumb-image shape-${escapeHtml((attrs.match(/data-template-placeholder="([^"]+)"/i)||[])[1]||'wide')} ${escapeHtml((attrs.match(/class="([^"]+)"/i)||[])[1]||'')}"${sizing}></span>`;
      });
  }
  function renderResizeHandles(element) {
    if (element.id !== selectedId) return '';
    return `<span class="resize-handle handle-nw" data-resize-handle="nw" role="button" tabindex="0" aria-label="ปรับขนาดรูปภาพ"></span><span class="resize-handle handle-n" data-resize-handle="n" title="ลากเพื่อครอปความสูงของรูป" aria-hidden="true"></span><span class="resize-handle handle-ne" data-resize-handle="ne" aria-hidden="true"></span><span class="resize-handle handle-e" data-resize-handle="e" aria-hidden="true"></span><span class="resize-handle handle-se" data-resize-handle="se" role="button" tabindex="0" aria-label="ปรับขนาดรูปภาพ"></span><span class="resize-handle handle-s" data-resize-handle="s" title="ลากเพื่อครอปความสูงของรูป" aria-hidden="true"></span><span class="resize-handle handle-sw" data-resize-handle="sw" aria-hidden="true"></span><span class="resize-handle handle-w" data-resize-handle="w" aria-hidden="true"></span>`;
  }

  function renderImagePlaceholder(element) {
    const hasImage = Boolean(element.src);
    const image = hasImage ? `<img src="${escapeHtml(element.src)}" alt="${escapeHtml(element.alt)}" style="object-fit:${element.fit==='contain'?'contain':'cover'};border-radius:${Math.max(0,Math.min(48,Number(element.radius)||0))}px">` : '';
    const uploadButton = `<button class="image-upload-trigger" type="button" data-image-upload aria-label="เลือกรูปภาพ"><b>＋ เพิ่มรูปภาพ</b></button>`;
    const replaceButton = hasImage ? `<button class="image-replace-trigger" type="button" data-image-upload>เปลี่ยนรูป</button>` : '';
    return `${image || uploadButton}${replaceButton}${renderResizeHandles(element)}`;
  }

  function renderThumb(template) {
    if (template.markup) {
      const preview=sourceThumbMarkup(template.markup);
      return `<div class="template-thumb source-template-thumb${template.visualTemplate?' visual-template-thumb':''}" aria-hidden="true"><div class="source-template-preview">${template.visualTemplate?`<div class="source-template-page">${preview}</div>`:preview}</div></div>`;
    }
    const lines = (count = 3, extra = '') => `<div class="page-lines ${extra}">${Array.from({length:count},(_,i)=>`<i class="line-${i+1}"></i>`).join('')}</div>`;
    const photo = (extra = '') => `<div class="page-photo ${extra}"><span>IMAGE</span></div>`;
    const heading = (width = '70%') => `<i class="page-section-heading" style="--line-width:${width}"></i>`;
    const quote = () => '<div class="page-quote"><i>“</i><span></span><span></span></div>';
    const split = (side = 'left') => `<div class="page-split ${side}">${photo('split-photo')}<div>${heading('85%')}${lines(4)}</div></div>`;
    const patterns = {
      energy: `${photo('hero-photo')}${lines(5,'lead-lines')}${heading('56%')}${lines(5)}<div class="page-timeline"><i></i><i></i><i></i></div>${photo('wide-photo')}${quote()}${split('left')}${heading('64%')}${lines(5)}`,
      interview: `<div class="page-profile">${photo('portrait-photo')}<div>${heading('82%')}${lines(4)}</div></div>${lines(5,'lead-lines')}${quote()}${heading('54%')}${lines(4)}${split('right')}${heading('72%')}${lines(5)}${quote()}${lines(3)}`,
      voices: `${photo('hero-photo')}${lines(4,'lead-lines')}${quote()}${heading('60%')}${lines(4)}${split('left')}<div class="page-voices"><i></i><i></i><i></i></div>${heading('70%')}${quote()}${lines(4)}${photo('wide-photo')}`,
      campaign: `<div class="page-campaign-banner"><b>REFLECTION / CAMPAIGN</b><i></i><i></i><i></i></div>${lines(4,'lead-lines')}<div class="page-campaign-pair"><i></i><i></i></div>${heading('60%')}${split('left')}${split('right')}${quote()}<div class="page-steps"><i>01</i><i>02</i><i>03</i></div>${photo('wide-photo')}${lines(3)}`,
      people: `<div class="page-people-hero">${heading('78%')}${lines(4)}${photo('hero-photo')}</div><div class="page-metrics"><i></i><i></i><i></i></div>${heading('60%')}${lines(5)}<div class="page-gallery"><i></i><i></i></div>${split('right')}${heading('68%')}${lines(4)}${quote()}`,
      impact: `${photo('hero-photo')}${lines(5,'lead-lines')}${quote()}<div class="page-impact-stats"><i></i><i></i><i></i></div>${heading('58%')}${lines(4)}${split('right')}${photo('wide-photo')}${heading('68%')}${lines(4)}${quote()}`,
      leadership: `<div class="page-leader-hero">${photo('portrait-photo')}<div>${heading('88%')}${lines(4)}</div></div>${lines(5,'lead-lines')}${quote()}${heading('58%')}<div class="page-principles"><i><b>01</b></i><i><b>02</b></i><i><b>03</b></i><i><b>04</b></i><i><b>05</b></i></div>${lines(4)}${photo('wide-photo')}${heading('68%')}${lines(4)}`,
      pillars: `<div class="page-leader-hero">${photo('portrait-photo')}<div>${heading('82%')}${lines(4)}</div></div>${lines(4,'lead-lines')}${quote()}<div class="page-pillars"><i><b>01</b><span></span></i><i><b>02</b><span></span></i><i><b>03</b><span></span></i></div>${heading('66%')}${lines(5)}${photo('wide-photo')}${quote()}`
    };
    const title = template.blocks.find(block => block.type === 'heading')?.text.split('\n')[0] || template.title;
    return `<div class="template-thumb template-page-${template.layout}" aria-hidden="true"><article class="page-mini"><div class="page-site-nav"><b>bangchak</b><span>ABOUT　 BUSINESS　 SUSTAINABILITY　 NEWS　 CONTACT</span></div><div class="page-breadcrumb">⌂　/　NEWS　/　BANGCHAK REFLECTIONS</div><div class="page-article-body"><div class="page-brand-reflection"><b>บางจาก</b><span>REFLECTIONS</span></div><div class="page-date">${escapeHtml(template.date || '')}</div><h3>${escapeHtml(title)}</h3><div class="page-audio"><i>▶</i><span>0:00</span><b></b><span>◖))</span></div><div class="page-body-layout">${patterns[template.layout] || patterns.energy}</div><div class="page-share">SHARE　 ●　 ●　 ●　 ↗</div><div class="page-related">ALL BANGCHAK REFLECTIONS <b>→</b></div></div><footer><b>CAN WE HELP?</b><span>CONTACT　 ·　 QUICK LINKS　 ·　 CAREER</span></footer></article></div>`;
  }

  function fitFullTemplatePreviews() {
    $$('.visual-template-thumb .source-template-preview',templateGrid).forEach(view=>{
      const page=$('.source-template-page',view);
      if(!page)return;
      page.style.transform='none';
      page.style.width='1000px';
      if (!view.clientWidth) return;
      const scale=Math.min(view.clientWidth/1000,1);
      page.style.transform=`scale(${scale})`;
      const split = page.querySelector('.bg-split-news-left,.bg-split-news-right')?.parentElement;
      if (!split) return;
      const bounds = view.getBoundingClientRect();
      const panel = split.getBoundingClientRect();
      if (panel.top >= bounds.bottom) {
        const offset = Math.min(panel.top-bounds.top,panel.bottom-bounds.bottom+12);
        page.style.transform = `translateY(-${offset}px) scale(${scale})`;
      }
    });
  }
  function renderGallery() {
    refreshResumeButton();
    const pageCount = Math.max(1,Math.ceil(templates.length/TEMPLATES_PER_PAGE));
    templatePage = Math.min(Math.max(1,templatePage),pageCount);
    const start = (templatePage-1)*TEMPLATES_PER_PAGE;
    const visibleTemplates = templates.slice(start,start+TEMPLATES_PER_PAGE);
    $('#templateCount').textContent = String(templates.length);
    templateGrid.innerHTML = visibleTemplates.map((template,index) => `
      <article class="template-card" data-template="${escapeHtml(template.id)}">
        <button class="template-card-preview" type="button" data-preview-template="${escapeHtml(template.id)}" aria-haspopup="dialog" aria-label="เปิดภาพตัวอย่างแบบที่ ${start+index+1}">
          ${renderThumb(template)}
          <span class="template-open-icon" aria-hidden="true">↗</span>
        </button>
      </article>`).join('');
    const pagination=$('#templatePagination');
    pagination.hidden=pageCount<=1;
    $('#templatePageLabel').textContent=`แสดง ${start+1}–${start+visibleTemplates.length} จาก ${templates.length} แบบ`;
    $('#templatePageNumbers').innerHTML = Array.from({length:pageCount},(_,index) => {
      const page = index + 1;
      const current = page === templatePage ? ' aria-current="page"' : '';
      return `<button type="button" data-template-page="${page}" aria-label="หน้า ${page}"${current}>${page}</button>`;
    }).join('');
    $('#templatePrev').disabled=templatePage===1;
    $('#templateNext').disabled=templatePage===pageCount;
    fitFullTemplatePreviews();
  }

  function openTemplatePreview(template) {
    if (!template || !templatePreviewDialog) return;
    const reference = $('#templateReferenceLink');
    reference.href = template.referenceUrl || 'https://www.bangchak.co.th/en/newsroom/reflections';
    $('#useTemplate').dataset.templateId = template.id;
    const canvas = $('#templatePreviewCanvas');
    canvas.classList.toggle('visual-template-thumb',Boolean(template.visualTemplate));
    canvas.innerHTML = `<div class="source-template-site-header"><b>bangchak</b><span>ABOUT　 BUSINESS　 SUSTAINABILITY　 NEWS</span></div><div class="source-template-preview"><div class="source-template-page">${sourcePreviewMarkup(template.markup||'',Boolean(template.visualTemplate))}</div></div><div class="source-template-site-footer">CAN WE HELP?　 CONTACT · QUICK LINKS · CAREER</div>`;
    templatePreviewDialog.showModal();
    requestAnimationFrame(fitTemplateDetailPreview);
  }

  function fitTemplateDetailPreview() {
    const view=$('#templatePreviewCanvas .source-template-preview');
    const page=$('#templatePreviewCanvas .source-template-page');
    if(!view||!page)return;
    if (window.matchMedia('(max-width: 680px)').matches) {
      page.style.width = '100%';
      page.style.transform = 'none';
      view.style.height = 'auto';
      return;
    }
    const scale=Math.min(view.clientWidth/1000,1);
    page.style.width='1000px';
    page.style.transform=`scale(${scale})`;
    view.style.height=`${Math.ceil(page.scrollHeight*scale)+12}px`;
  }

  function templateFragmentKind(nodes, path) {
    const [node, next] = nodes;
    const contains = selector => node.matches(selector) || Boolean(node.querySelector(selector));
    if (next) return ['greenHighlight','Highlight พื้นเขียว + ข้อความ'];
    if (contains('.bg-split-news-left')) return ['halfLeft','รูปซ้าย · พื้นเขียวครึ่ง'];
    if (contains('.bg-split-news-right')) return ['halfRight','รูปขวา · พื้นเขียวครึ่ง'];
    if (contains('.bg-split-news-big-image')) return ['greenImage','Highlight พื้นเขียว'];
    if (contains('.card__icon') && !contains('.media')) return ['iconCards','ชุดการ์ดไอคอน'];
    const columns = [...(node.matches('.row') ? [node] : []),...node.querySelectorAll('.row')]
      .map(row => [...row.children].filter(child => [...child.classList].some(name => name.startsWith('col-'))))
      .find(items => items.length > 1);
    if (columns) {
      const imageColumns = columns.filter(col => col.querySelector('img'));
      if (contains('.card--quote') && imageColumns.length === 1) return ['portraitQuote','รูปคู่การ์ดคำพูด'];
      if (contains('.card--quote')) return ['quoteGrid','ชุดการ์ดคำพูด'];
      if (contains('.media')) return columns.length > 2 ? ['mediaGrid','ชุดหัวข้อพร้อมไอคอน'] : ['media','หัวข้อพร้อมไอคอน'];
      if (imageColumns.length === columns.length) return [`imageGrid${columns.length}`,`รูปเรียง ${columns.length} คอลัมน์`];
      if (imageColumns.length === 1 && columns.length === 2) {
        const imageColumn = imageColumns[0];
        const order = [...imageColumn.classList].filter(name => /^order-(?:[a-z]+-)?\d+$/.test(name)).pop();
        const right = order ? /-(?:2|12)$/.test(order) : imageColumn === columns[1];
        const green = contains('.bg-green-gradient-vertical');
        return [`split${green?'Green':''}${right?'Right':'Left'}`,`รูป${right?'ขวา':'ซ้าย'}คู่ข้อความ${green?' · พื้นเขียวเต็ม':''}`];
      }
      return ['textGrid','ข้อความหลายคอลัมน์'];
    }
    if (contains('.bg-green-gradient-vertical')) return ['greenBand','แถบข้อความพื้นเขียว'];
    if (contains('.media')) return ['media','หัวข้อพร้อมไอคอน'];
    if (contains('.card--quote')) return ['quoteCard','การ์ดคำพูด'];
    if (contains('ol')) return ['orderedList','รายการลำดับเลข'];
    if (contains('ul')) return ['bulletList','รายการหัวข้อย่อย'];
    if (contains('audio')) return ['audio','เสียงประกอบ'];
    if (contains('img')) {
      const wide = path.some(wrapper => /\bcol-(?:xxl-8|xl-10)\b/.test(wrapper.open));
      return wide ? ['highlight','รูป Highlight'] : ['image','รูปในเนื้อหา'];
    }
    if (contains('blockquote')) return ['quote','ข้อความอ้างอิง'];
    if (node.matches('h1,h2,.news__subtitle')) return ['subtitle','Subtitle'];
    if (node.matches('h3,h4,h5,h6')) return ['heading','หัวข้อเนื้อหา'];
    return ['text','ข้อความ'];
  }

  function splitTemplateMarkup(source, originalMarkup = source.markup) {
    const fragment = document.createElement('template');
    fragment.innerHTML = cleanSourceMarkup(source.markup,true);
    const originalImages = String(originalMarkup || '').match(/<img\b[^>]*>/gi) || [];
    const sections = [];
    let wrapperId = 0;
    let imageOffset = 0;

    function visit(parent, path) {
      const children = [...parent.childNodes];
      for (let index = 0; index < children.length; index++) {
        const node = children[index];
        if (node.nodeType !== Node.ELEMENT_NODE) {
          if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
          const paragraph = document.createElement('p');
          paragraph.textContent = node.textContent;
          sections.push({type:'sourcePage',markup:paragraph.outerHTML,sourcePath:path,sourceKind:'text',title:'ข้อความ',imageCount:0});
          continue;
        }
        if (node.matches('div:is(.container,.container-fluid,.row,[class*="col-"])') &&
          node.children.length && !node.matches('[id],.bg-green-gradient-vertical') &&
          ![...node.childNodes].some(child => child.nodeType === Node.TEXT_NODE && child.textContent.trim()) &&
          !(node.matches('.row') && node.children.length > 1 && [...node.children].some(child => /(?:^|\s)col-/.test(child.className)))) {
          const shell = node.cloneNode(false);
          const close = `</${node.localName}>`;
          visit(node,[...path,{id:`${source.id || source.sourceId}:${++wrapperId}`,open:shell.outerHTML.slice(0,-close.length),close}]);
          continue;
        }
        const nodes = [node];
        if (node.matches('.bg-split-news-big-image') && node.nextElementSibling?.matches('.bg-green-gradient-vertical')) {
          nodes.push(node.nextElementSibling);
          index = children.indexOf(nodes[1]);
        }
        const [sourceKind,title] = templateFragmentKind(nodes,path);
        const imageCount = nodes.reduce((count,item) => count + item.querySelectorAll('img').length + Number(item.matches('img')),0);
        const localImageSettings = key => Object.fromEntries(Array.from({length:imageCount},(_,i) => i)
          .filter(i => source[key]?.[imageOffset+i] !== undefined).map(i => [i,source[key][imageOffset+i]]));
        sections.push({
          type:'sourcePage', title, sourceKind, sourceId:source.sourceId, sourcePath:path,
          markup:nodes.map(item => item.outerHTML).join('\n'), visualTemplate:source.visualTemplate,
          imageCount, originalImages:originalImages.slice(imageOffset,imageOffset+imageCount),
          imageWidths:localImageSettings('imageWidths'), imageCropRatios:localImageSettings('imageCropRatios')
        });
        imageOffset += imageCount;
      }
    }
    visit(fragment.content,[]);
    return sections;
  }

  function wrapTemplateFragment(markup, path, render = false) {
    if (!path.length) return render ? `<div data-source-render>${markup}</div>` : markup;
    const opening = path.map(({open},i) => render && i === path.length-1 ? open.slice(0,-1)+' data-source-render>' : open).join('');
    return opening + markup + path.slice().reverse().map(wrapper => wrapper.close).join('');
  }

  const templateToolRecipes = new Map();
  function extraTemplateTools() {
    const existing = new Set(['greenHighlight','halfLeft','halfRight','greenImage','portraitQuote','splitGreenLeft',
      'splitGreenRight','media','quoteCard','audio','highlight','image','quote','subtitle','heading','text']);
    for (const template of templates) {
      if (!template.markup || template.patterns) continue;
      for (const part of splitTemplateMarkup({markup:template.markup,sourceId:template.id,visualTemplate:true})) {
        if (!existing.has(part.sourceKind) && !templateToolRecipes.has(part.sourceKind)) {
          templateToolRecipes.set(part.sourceKind,part);
        }
      }
    }
    return templateToolRecipes;
  }

  function insertTemplateTool(key,index) {
    const recipe = templateToolRecipes.get(key);
    if (!recipe) return;
    insertBlock('sourcePage',index,{...clone(recipe),sourcePath:[],markup:wrapTemplateFragment(recipe.markup,recipe.sourcePath)});
  }

  function useTemplate(template) {
    if (!template) return;
    if (templatePreviewDialog?.open) templatePreviewDialog.close();
    const blocks = template.patterns
      ? template.patterns.map(({type,...fields}) => ({...fields,type:'legacy',legacyType:type,width:legacyDefaultWidth(type)}))
      : template.markup
        ? splitTemplateMarkup({markup:template.markup,sourceId:template.id,visualTemplate:Boolean(template.visualTemplate)})
        : template.blocks;
    enterEditor(template.markup ? 'งาน Reflection ใหม่' : template.title,blocks);
  }

  let editorDocumentVersion = 0;
  function enterEditor(title, blocks) {
    editorDocumentVersion += 1;
    activeTextField = null;
    sourceTextSelection = null;
    sourceImageSelection = null;
    nextId = Math.max(1,...blocks.map(block => (Number(String(block.id).split('-').pop()) || 0) + 1));
    const editableBlocks = blocks.flatMap(block => {
      if (block.type !== 'sourcePage' || block.sourcePath) return [block];
      const original = templates.find(template => template.id === block.sourceId);
      const sections = splitTemplateMarkup(block,original?.markup);
      return sections.length ? sections : [block];
    });
    elements = editableBlocks.map(block => makeElement(block.type,block));
    selectedId = elements[0]?.id || null;
    undoStack = [];
    redoStack = [];
    $('#documentTitle').textContent = title;
    $('#saveStatus').textContent = 'ยังไม่บันทึก';
    const canvasViewport=$('#canvasViewport');
    if(canvasViewport) {canvasViewport.scrollTop=0;canvasViewport.scrollLeft=0;}
    showMode('editor');
    setActiveMode('create');
    renderAll();
    fitCanvasToView();
    window.scrollTo(0,0);
  }

  function renderBlock(element) {
    const selected = element.id === selectedId ? ' selected' : '';
    const sourceClass = element.type === 'sourcePage' ? ' source-page-block' : '';
    const legacy = element.type === 'legacy' ? ' data-legacy-type="'+escapeHtml(element.legacyType)+'"' : '';
    const name = element.type === 'legacy' ? (shelfLabels[element.legacyType] || legacyElementName(element)) :
      element.type === 'sourcePage' ? (element.title || 'องค์ประกอบจากเทมเพลต') :
      element.type === 'image' ? imageStyleName(element.imageStyle) : titleFor(element.type);
    return `<div class="canvas-block board-section${sourceClass}${selected}" data-id="${element.id}"${legacy} draggable="true">
      <div class="board-section-header"><b>${escapeHtml(name)}</b><button class="canvas-remove-block" data-canvas-remove="${element.id}" type="button" title="ลบ ${escapeHtml(name)}" aria-label="ลบ ${escapeHtml(name)}">×</button></div>
      ${renderBlockBody(element)}
    </div>`;
  }

  function renderBlockBody(element) {
    const background = safeColor(element.background || '#f5f5f1');
    const padding = Math.max(0,Math.min(96,Number(element.padding)||0));
    if (element.type === 'sourcePage') {
      const markup = sourcePreviewMarkup(element.markup,Boolean(element.visualTemplate),true,element);
      return `<div class="source-page-render">${wrapTemplateFragment(markup,element.sourcePath || [],true)}</div>`;
    }
    if (element.type === 'heading') return `<div class="board-block-content heading-block" style="background:${background};padding-block:${padding}px"><h4 style="${textStyle(element)}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</h4></div>`;
    if (element.type === 'text') return `<div class="board-block-content text-block" style="background:${background};padding-block:${padding}px"><p style="${textStyle(element)}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</p></div>`;
    if (element.type === 'quote') return `<div class="board-block-content quote-block" style="background:${background};padding:${Math.max(14,padding)}px"><blockquote style="${textStyle(element)}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</blockquote></div>`;
    if (element.type === 'legacy') return '<div class="legacy-pattern-slot"></div>';
    if (element.type === 'image') {
      const style = ['normal','highlight','green','greenText'].includes(element.imageStyle) ? element.imageStyle : 'normal';
      const fullBleed = style === 'green' || style === 'greenText' ? ' highlight-full-bleed' : '';
      const greenBand = style === 'green' ? '<div class="highlight-green-band highlight-green-empty" aria-hidden="true"></div>' : style === 'greenText' ? `<div class="highlight-green-band"><p style="${textStyle({...element,color:'#ffffff'})}" contenteditable="true" data-part="caption" spellcheck="false">${textHtml(element.caption || '')}</p></div>` : '';
      return `<div class="board-block-content image-block image-style-${style}${fullBleed}" style="--image-width:${imageSlotPercent(element)}%;justify-content:${element.align==='right'?'flex-end':element.align==='center'?'center':'flex-start'}"><div class="image-placeholder" style="width:var(--image-width);height:auto;min-height:0;aspect-ratio:${1/imageAspectRatio(element)}">${renderImagePlaceholder(element)}</div>${greenBand}</div>`;
    }
    if (element.type === 'split') return `<div class="board-block-content split-block" style="background:${background}">${element.imageSide==='right'?`<div class="split-copy"><strong style="${textStyle({...element,fontSize:Math.max(22,Number(element.fontSize)||24)})}" contenteditable="true" data-part="title">${textHtml(element.title)}</strong><span style="${textStyle(element)}" contenteditable="true" data-part="text">${textHtml(element.text)}</span></div>`:''}<div class="image-placeholder split-image" style="width:${Math.max(10,Math.min(100,Number(element.width)||100))}%;aspect-ratio:${1/imageAspectRatio(element)}">${renderImagePlaceholder(element)}</div>${element.imageSide!=='right'?`<div class="split-copy"><strong style="${textStyle({...element,fontSize:Math.max(22,Number(element.fontSize)||24)})}" contenteditable="true" data-part="title">${textHtml(element.title)}</strong><span style="${textStyle(element)}" contenteditable="true" data-part="text">${textHtml(element.text)}</span></div>`:''}</div>`;
    if (element.type === 'banner') return `<section class="board-block-content banner-block" style="background:${background};color:${safeColor(element.color||'#ffffff')};text-align:${element.align||'center'};padding:${padding||36}px"><h2 style="${textStyle({...element,fontSize:Math.max(22,Number(element.fontSize)||24)})}" contenteditable="true" data-part="title">${textHtml(element.title)}</h2><p style="${textStyle(element)}" contenteditable="true" data-part="text">${textHtml(element.text)}</p></section>`;
    if (element.type === 'button') return `<div class="board-block-content button-block" style="text-align:${element.align||'left'}"><a href="${escapeHtml(safeHref(element.url))}" style="display:inline-block;padding:${padding||14}px 24px;background:${background};color:${safeColor(element.color||'#ffffff')};font-size:${Math.max(18,Number(element.fontSize)||18)}px;border-radius:6px;text-decoration:none" contenteditable="true" data-part="text">${textHtml(element.text)}</a></div>`;
    if (element.type === 'columns') return `<div class="board-block-content columns-block" style="background:${background};padding:${padding||24}px;--column-text-size:${Math.max(18,Number(element.fontSize)||18)}px;color:${safeColor(element.color)}"><div><h3 contenteditable="true" data-part="leftTitle">${textHtml(element.leftTitle)}</h3><p contenteditable="true" data-part="leftText">${textHtml(element.leftText)}</p></div><div><h3 contenteditable="true" data-part="rightTitle">${textHtml(element.rightTitle)}</h3><p contenteditable="true" data-part="rightText">${textHtml(element.rightText)}</p></div></div>`;
    if (element.type === 'spacer') return `<div class="board-block-content spacer-block" style="height:${Math.max(18,Math.min(320,Number(element.height)||48))}px"><span>ช่องว่าง · ${Math.max(18,Number(element.height)||48)} px</span></div>`;
    return `<div class="board-block-content divider-block"><hr></div>`;
  }

  function bindLegacyBoardText(preview, element) {
    const bind = (node, part, label, speakerIndex = null) => {
      if (!node) return;
      const data = speakerIndex === null ? element : element.speakers?.[speakerIndex];
      node.textContent = data?.[part] ?? '';
      node.setAttribute('contenteditable','true');
      node.setAttribute('spellcheck','false');
      node.setAttribute('role','textbox');
      node.setAttribute('aria-label',label);
      node.setAttribute('aria-multiline','true');
      node.dataset.part = part;
      node.dataset.emptyText = label;
      if (speakerIndex !== null) node.dataset.boardSpeaker = speakerIndex;
    };
    const part = (selector, key, label) => bind($(selector,preview),key,label);
    const type = element.legacyType;
    if (['subtitle','subtitleAudio','contentHeading'].includes(type)) {
      part('.preview-narrow h2,.preview-narrow h4','text','หัวข้อ');
    } else if (type === 'contentText') {
      part('.preview-lorem','text','ข้อความ');
    } else if (type === 'contentBlockquote') {
      part('blockquote','text','ข้อความอ้างอิง');
    } else if (type === 'highlightGreenText') {
      part('.green-highlight-preview-copy .preview-lorem','caption','ข้อความบนพื้นเขียว');
    } else if (type.startsWith('contentSplit')) {
      part('.split-quote-preview-copy h4','title','หัวข้อคู่รูป');
      const paragraphs = $$('.split-quote-preview-copy .preview-lorem',preview);
      bind(paragraphs[0],'text','ข้อความคู่รูป');
      bind(paragraphs[1],'text2','ย่อหน้าที่สอง');
      part('.split-quote-preview-caption','caption','คำบรรยายรูป');
    } else if (type === 'contentMedia') {
      $$('.example-media-column',preview).forEach((column,index) => {
        const number = index + 1;
        bind($('h4',column),`media${number}Title`,`หัวข้อคอลัมน์ ${number}`);
        bind($('p',column),`media${number}Text`,`ข้อความคอลัมน์ ${number}`);
      });
    } else if (type === 'contentQuoteCard' || type === 'contentPortraitQuote') {
      part('.example-quote-body strong','quote','คำพูด');
      part('.example-author','author','ชื่อผู้พูด');
    } else if (type === 'contentSpeakers') {
      $$('.example-speakers > div',preview).forEach((speaker,index) => {
        bind($('strong',speaker),'quote',`คำพูดคนที่ ${index + 1}`,index);
        bind($('.example-speaker-name',speaker),'name',`ชื่อผู้พูดคนที่ ${index + 1}`,index);
      });
    } else if (type === 'contentModal') {
      const image = $('.example-modal-image',preview);
      const note = $('.example-modal-note',preview);
      const previewButton = $('.example-modal-button',preview);
      const buttonLabel = document.createElement('span');
      buttonLabel.className = 'example-modal-button';
      previewButton.replaceWith(buttonLabel);
      const title = document.createElement('h4');
      const copy = document.createElement('p');
      note.textContent = 'เนื้อหาใน Popup';
      note.before(buttonLabel);
      note.after(title);
      image.after(copy);
      bind(buttonLabel,'label','ข้อความบนปุ่ม');
      bind(title,'title','หัวข้อ Popup');
      bind(copy,'text','รายละเอียด Popup');
    }
  }

  const boardImageFrame = '.image-placeholder,.preview-image-placeholder,.source-image-frame';

  function applyCropFrame(frame, ratio) {
    frame.classList.add('board-crop-frame');
    frame.style.setProperty('--board-crop-ratio',ratio);
  }

  function applyImageCrops(block, element) {
    for (const frame of block.querySelectorAll(boardImageFrame)) {
      const image = frame.querySelector('img');
      if (!image) continue;
      const source = frame.hasAttribute('data-source-frame');
      const index = frame.dataset.sourceFrame;
      const ratio = source ? element.imageCropRatios?.[index] : element.cropRatio;
      if (Number.isFinite(ratio) && ratio > 0) applyCropFrame(frame,ratio);
    }
  }

  const photoRowLimit = 4;
  function isRowPhoto(element) {
    if (element?.type === 'image') return !['green','greenText'].includes(element.imageStyle);
    if (element?.type === 'legacy') return ['contentQuoteImage','highlightImage'].includes(element.legacyType);
    if (element?.type !== 'sourcePage' || !['image','highlight'].includes(element.sourceKind) || element.imageCount !== 1) return false;
    const fragment = document.createElement('template');
    fragment.innerHTML = element.markup;
    return !fragment.content.textContent.trim();
  }

  function photoRowAt(items, index) {
    const key = items[index]?.studioRowId;
    let start = index;
    let end = index + 1;
    if (key) {
      while (start > 0 && items[start-1].studioRowId === key) start--;
      while (end < items.length && items[end].studioRowId === key) end++;
    }
    return {start,end};
  }

  function renderBoardBlocks() {
    const markup = [];
    for (let index = 0; index < elements.length;) {
      const {end} = photoRowAt(elements,index);
      const blocks = elements.slice(index,end).map(renderBlock).join('');
      markup.push(end-index > 1 ? `<div class="board-photo-row" style="--photo-count:${end-index}">${blocks}</div>` : blocks);
      index = end;
    }
    return markup.join('');
  }

  function renderArtboard() {
    artboard.innerHTML = elements.length ? renderBoardBlocks() : '<div class="editor-empty"><span class="editor-empty-icon" aria-hidden="true">✳</span><b>เริ่มออกแบบ Reflection ของคุณ</b><div class="editor-empty-actions"><button type="button" data-empty-add="subtitle">+ หัวข้อ</button><button type="button" data-empty-add="highlightImage">+ รูป Highlight</button><button type="button" data-empty-add="contentText">+ ข้อความ</button></div></div>';
    if (legacyPatterns) {
      for (const element of elements.filter(item=>item.type==='legacy')) {
        const slot = artboard.querySelector(`.legacy-pattern-slot[data-for="${element.id}"]`) || [...artboard.querySelectorAll('.legacy-pattern-slot')].find(node=>node.closest('[data-id]')?.dataset.id===element.id);
        if (!slot) continue;
        const preview = legacyPatterns.makePreview(element.legacyType,element);
        preview.classList.add('legacy-pattern-preview');
        bindLegacyBoardText(preview,element);
        const placeholders = [...preview.querySelectorAll('.preview-image-placeholder')];
        placeholders.forEach((placeholder,index)=>{
          placeholder.setAttribute('data-image-upload','');
          placeholder.setAttribute('role','button');
          placeholder.setAttribute('tabindex','0');
          placeholder.setAttribute('aria-label',`เพิ่มหรือเปลี่ยนรูปสำหรับ ${legacyElementName(element)}`);
          if (index===0) {
            const defaultWidth = legacyDefaultWidth(element.legacyType);
            const width = Number(element.width) || defaultWidth;
            if (width !== defaultWidth) placeholder.style.width = `${Math.max(10,Math.min(100,width/defaultWidth*100))}%`;
            placeholder.style.maxWidth = '100%';
            if (element.aspectRatio) {
              placeholder.style.aspectRatio = String(1/element.aspectRatio);
              placeholder.style.minHeight = '0';
            }
          }
          if (element.src && index===0) {
            const image = document.createElement('img');
            image.src = element.src;
            image.alt = element.alt || legacyElementName(element);
            image.style.cssText = 'display:block;width:100%;height:auto;min-height:0;object-fit:contain';
            placeholder.replaceChildren(image);
            placeholder.classList.add('has-selected-image');
          } else if (!element.src && index===0) {
            const label = placeholder.querySelector('span:not(.placeholder-icon)');
            if (label) label.textContent = 'เพิ่มรูปภาพ';
          }
          if (index===0) placeholder.insertAdjacentHTML('beforeend',renderResizeHandles(element));
        });
        slot.append(preview);
      }
    }
    for (const block of $$('.board-section[data-id]',artboard)) {
      const element = elements.find(item => item.id === block.dataset.id);
      if (!element) continue;
      applyImageCrops(block,element);
      $$('[contenteditable="true"][data-part]',block).forEach(node => {
        const format = element.textFormats?.[boardTextKey(node)];
        if (!format) return;
        if (format.bold) node.style.fontWeight = '700';
        if (format.italic) node.style.fontStyle = 'italic';
        if (format.align) {
          const alignBox = node.closest('.button-block') || node;
          alignBox.style.textAlign = format.align;
          if (alignBox === node && ['STRONG','SPAN'].includes(node.tagName)) node.style.display = 'block';
        }
      });
    }
    artboard.style.width = `${ARTBOARD_WIDTH}px`;
    artboard.style.minHeight = '1400px';
    artboard.style.transform = `scale(${zoom})`;
    $('#zoomLabel').textContent = `${Math.round(zoom*100)}%`;
    const viewport=$('#canvasViewport');
    const viewportStyle=getComputedStyle(viewport);
    const available=viewport.clientWidth-parseFloat(viewportStyle.paddingLeft||0)-parseFloat(viewportStyle.paddingRight||0);
    viewport.classList.toggle('canvas-fit',ARTBOARD_WIDTH*zoom<=available+1);
    updateBoardTextTools();
  }

  function renderLayers() {
    if (!layerList) return;
    $('#layerCount').textContent = elements.length;
    layerList.innerHTML = elements.map(element => {
      const name = element.type === 'sourcePage' ? element.title || 'องค์ประกอบจากเทมเพลต' :
        element.type === 'legacy' && !['subtitle','subtitleAudio','contentHeading','contentText'].includes(element.legacyType) ? (shelfLabels[element.legacyType] || legacyElementName(element)) :
        element.text?.split('\n')[0] || element.title || (element.type === 'image' ? imageStyleName(element.imageStyle) : titleFor(element.type));
      const selected = element.id === selectedId;
      return `<button type="button" class="layer-row${selected?' selected':''}" draggable="true" aria-pressed="${selected}" data-layer-id="${element.id}" title="${escapeHtml(name)}"><span class="layer-icon" aria-hidden="true">${iconFor(element.type)}</span><span class="layer-name">${escapeHtml(name)}</span><span class="layer-grip" aria-hidden="true">⠿</span></button>`;
    }).join('');
  }

  function field(label, content, hint='') {
    return `<div class="inspector-field"><label class="field-label">${label}</label>${content}${hint?`<small class="field-hint">${hint}</small>`:''}</div>`;
  }

  function alignmentFields(element) {
    return `<div class="align-group">${['left','center','right'].map((align,index)=>`<button type="button" class="${(element.align||'left')===align?'active':''}" data-align="${align}" aria-label="จัด${['ซ้าย','กลาง','ขวา'][index]}">${['≡','☰','≡'][index]}</button>`).join('')}</div>`;
  }

  function designFields(element,{background=true,align=true,padding=true}={}) {
    let fields = `<div class="inspector-group"><h3>ตัวอักษรและสี</h3>${field('สีตัวอักษร',`<input type="color" data-prop="color" value="${safeColor(element.color||'#20271e')}">`)}${field('ขนาดตัวอักษร',`<div class="range-line"><span>ขนาด</span><b data-size-value>${Math.max(18,Number(element.fontSize)||18)} px</b></div><input type="range" min="18" max="72" step="1" data-prop="fontSize" value="${Math.max(18,Number(element.fontSize)||18)}">`)}`;
    if (background) fields += field('สีพื้นหลัง',`<input type="color" data-prop="background" value="${safeColor(element.background||'#f5f5f1')}">`);
    if (align) fields += field('แนววาง',alignmentFields(element));
    if (padding) fields += field('ระยะหายใจ',`<div class="range-line"><span>รอบเนื้อหา</span><b data-padding-value>${Math.max(0,Number(element.padding)||0)} px</b></div><input type="range" min="0" max="96" step="4" data-prop="padding" value="${Math.max(0,Number(element.padding)||0)}">`);
    return fields + '</div>';
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
      fields += designFields(element,{background:element.type!=='heading'});
    } else if (element.type === 'sourcePage') {
      const hasTextSelection = sourceTextSelection?.elementId === element.id;
      fields += `<div class="inspector-group"><h3>ข้อความในเทมเพลต</h3>
        <p class="field-hint">${hasTextSelection ? 'พิมพ์แก้บนหน้าได้เลย หรือเพิ่มข้อความต่อจากส่วนที่เลือก' : 'คลิกข้อความบนหน้าเพื่อแก้ไข หรือลงข้อความใหม่ท้ายหน้า'}</p>
        <div class="source-text-actions">
          <button type="button" class="file-pick" data-source-text-action="add">＋ เพิ่มข้อความ</button>
          <button type="button" class="delete-element" data-source-text-action="remove"${hasTextSelection?'':' disabled'}>ลบข้อความที่เลือก</button>
        </div>
      </div>`;
      fields += `<div class="inspector-group"><details class="source-code-details"><summary>ดูหรือแก้ HTML ต้นฉบับ</summary><textarea class="source-html-input" data-prop="markup" spellcheck="false">${escapeHtml(element.markup||'')}</textarea></details></div>`;
      const audio = element.markup.match(/<audio\b[^>]*>/i);
      if (audio) {
        const src = audio[0].match(/\bsrc="([^"]*)"/i)?.[1] || '';
        fields += `<div class="inspector-group"><h3>เสียง</h3>${field('ที่อยู่ไฟล์เสียง',`<input type="text" data-prop="templateAudioSrc" value="${escapeHtml(src)}" placeholder="/storage/newsroom/.../Reflection.mp4">`)}</div>`;
      }
      if (sourceImageSelection?.elementId===element.id) {
        const index=sourceImageSelection.index;
        fields += `<div class="inspector-group"><h3>รูปที่เลือก · ${index+1}</h3>${field('เปลี่ยนไฟล์รูปภาพ',`<button type="button" class="file-pick" data-pick-image="true">เลือกรูปจากเครื่อง <span>↗</span></button>`)}${field('ความกว้างในหน้า',`<div class="range-line"><span>ลากจุดมุมภาพ หรือปรับสัดส่วน</span><b data-source-width-value>${Math.round(Number(element.imageWidths?.[index])||100)}%</b></div><input type="range" min="10" max="120" step="1" data-prop="sourceImageWidth" value="${Math.max(10,Math.min(120,Number(element.imageWidths?.[index])||100))}">`)}</div>`;
      }
    } else if (element.type === 'legacy') {
      const legacyType = element.legacyType;
      const textTypes = ['subtitle','subtitleAudio','contentHeading','contentText','contentBlockquote'];
      if (textTypes.includes(legacyType)) fields += `<div class="inspector-group"><h3>ข้อความ</h3>${field('ข้อความ',`<textarea data-prop="text">${escapeHtml(element.text||'')}</textarea>`)}</div>`;
      if (legacyType==='contentSplitQuoteLeft' || legacyType==='contentSplitQuoteRight' || legacyType==='contentSplitImageLeft' || legacyType==='contentSplitImageRight') {
        fields += `<div class="inspector-group"><h3>เนื้อหาประกอบรูป</h3>${field('หัวข้อ',`<input type="text" data-prop="title" value="${escapeHtml(element.title||'')}">`)}${field('ข้อความ',`<textarea data-prop="text">${escapeHtml(element.text||'')}</textarea>`)}${legacyType.startsWith('contentSplitQuote')?field('คำบรรยายใต้รูป',`<textarea data-prop="caption">${escapeHtml(element.caption||'')}</textarea>`):field('ย่อหน้าที่สอง',`<textarea data-prop="text2">${escapeHtml(element.text2||'')}</textarea>`)}</div>`;
      }
      if (legacyType==='highlightGreenText') fields += `<div class="inspector-group"><h3>ข้อความบนพื้นเขียว</h3>${field('ข้อความ',`<textarea data-prop="caption">${escapeHtml(element.caption||'')}</textarea>`)}</div>`;
      if (legacyType==='audio' || legacyType==='subtitleAudio') fields += `<div class="inspector-group"><h3>เสียง</h3>${field('ที่อยู่ไฟล์เสียง',`<input type="text" data-prop="audioSrc" value="${escapeHtml(element.audioSrc||'')}" placeholder="/storage/newsroom/.../Reflection.mp4">`,'ระบุ path ของไฟล์เสียงสำหรับ HTML') }</div>`;
      if (legacyType==='contentMedia') {
        fields += `<div class="inspector-group"><h3>รูปแบบคอลัมน์</h3>${field('จำนวนคอลัมน์',`<select data-prop="variant"><option value="1" ${element.variant!=='2'?'selected':''}>1 คอลัมน์</option><option value="2" ${element.variant==='2'?'selected':''}>2 คอลัมน์</option></select>`)}`;
        for (let i=1;i<=(element.variant==='2'?2:1);i++) fields += `${field(`คอลัมน์ ${i} · หัวข้อ`, `<input type="text" data-prop="media${i}Title" value="${escapeHtml(element[`media${i}Title`]||'')}">`)}${field(`คอลัมน์ ${i} · ข้อความ`, `<textarea data-prop="media${i}Text">${escapeHtml(element[`media${i}Text`]||'')}</textarea>`)}`;
        fields += '</div>';
      }
      if (legacyType==='contentQuoteCard' || legacyType==='contentPortraitQuote') fields += `<div class="inspector-group"><h3>คำพูดและผู้พูด</h3>${field('คำพูด',`<textarea data-prop="quote">${escapeHtml(element.quote||'')}</textarea>`)}${legacyType==='contentPortraitQuote'?field('ชื่อผู้พูด',`<input type="text" data-prop="author" value="${escapeHtml(element.author||'')}">`):''}</div>`;
      if (legacyType==='contentPortraitQuote') fields += `<div class="inspector-group"><h3>ตำแหน่งรูปบุคคล</h3>${field('จัดวางรูป',`<select data-prop="variant"><option value="left" ${element.variant!=='right'?'selected':''}>รูปอยู่ซ้าย</option><option value="right" ${element.variant==='right'?'selected':''}>รูปอยู่ขวา</option></select>`)}</div>`;
      if (legacyType==='contentSpeakers') {
        fields += `<div class="inspector-group"><h3>เสียงจากผู้คน</h3>${field('จำนวนผู้พูด',`<select data-prop="variant"><option value="2" ${element.variant!=='3'?'selected':''}>ผู้พูด 2 คน</option><option value="3" ${element.variant==='3'?'selected':''}>ผู้พูด 3 คน</option></select>`)}`;
        for (let i=0;i<(element.variant==='3'?3:2);i++) { const speaker=element.speakers?.[i]||{}; fields += `${field(`ผู้พูด ${i+1} · คำพูด`, `<textarea data-speaker-index="${i}" data-speaker-prop="quote">${escapeHtml(speaker.quote||'')}</textarea>`)}${field(`ผู้พูด ${i+1} · ชื่อ`, `<input type="text" data-speaker-index="${i}" data-speaker-prop="name" value="${escapeHtml(speaker.name||'')}">`)}`; }
        fields += '</div>';
      }
      if (legacyType==='contentModal') fields += `<div class="inspector-group"><h3>Popup</h3>${field('ข้อความปุ่ม',`<input type="text" data-prop="label" value="${escapeHtml(element.label||'อ่านข้อมูลเพิ่มเติม')}">`)}${field('หัวข้อ Popup',`<input type="text" data-prop="title" value="${escapeHtml(element.title||'')}">`)}${field('ข้อความรายละเอียด',`<textarea data-prop="text">${escapeHtml(element.text||'')}</textarea>`)}</div>`;
      if (legacyHasImage(element)) fields += `<div class="inspector-group"><h3>รูปภาพของรูปแบบเดิม</h3>${field('เลือกรูป',`<button type="button" class="file-pick" data-pick-image="true">${element.src?'เปลี่ยนรูปภาพ':'เลือกรูปจากเครื่อง'} <span>↗</span></button>`)}${field('คำอธิบายรูปภาพ',`<input type="text" data-prop="alt" value="${escapeHtml(element.alt||'')}">`)}${field('ขนาดรูปภาพ',`<div class="range-line"><span>ลากจุดรอบรูป หรือปรับความกว้าง</span><b data-width-value>${imageWidthPx(element)} px</b></div><input type="range" min="10" max="100" step="1" data-prop="width" value="${Math.max(10,Math.min(100,Number(element.width)||legacyDefaultWidth(legacyType)))}">`)}</div>`;
    } else if (element.type === 'image' || element.type === 'split') {
      fields += `<div class="inspector-group"><h3>รูปภาพ</h3>${field('ไฟล์รูปภาพ',`<button type="button" class="file-pick" data-pick-image="true">${element.src?'เปลี่ยนรูปภาพ':'เลือกรูปจากอุปกรณ์'} <span>↗</span></button>`)}${field('คำอธิบายรูปภาพ',`<input type="text" data-prop="alt" value="${escapeHtml(element.alt||'')}">`)}${field('ขนาดรูปภาพ',`<div class="range-line"><span>ลากจุดที่มุมรูป หรือปรับความกว้าง</span><b data-width-value>${imageWidthPx(element)} px</b></div><input type="range" min="10" max="${imageMaxPercent(element)}" step="1" data-prop="width" value="${Math.max(10,Math.min(imageMaxPercent(element),Number(element.width)||100))}">`)}${field('การแสดงภาพ',`<select data-prop="fit"><option value="cover" ${element.fit!=='contain'?'selected':''}>เต็มกรอบ</option><option value="contain" ${element.fit==='contain'?'selected':''}>เห็นภาพครบ</option></select>`)}`;
      if (element.type === 'image') {
        fields += `${field('รูปแบบภาพ',`<select data-prop="imageStyle"><option value="normal" ${(element.imageStyle||'normal')==='normal'?'selected':''}>รูปปกติ</option><option value="highlight" ${element.imageStyle==='highlight'?'selected':''}>รูป Highlight</option><option value="green" ${element.imageStyle==='green'?'selected':''}>Highlight พื้นเขียว</option><option value="greenText" ${element.imageStyle==='greenText'?'selected':''}>พื้นเขียวและมีข้อความ</option></select>`)}`;
        if (element.imageStyle === 'greenText') fields += field('ข้อความบนพื้นเขียว',`<textarea data-prop="caption">${escapeHtml(element.caption||'')}</textarea>`);
        fields += `${field('มุมภาพ',`<input type="range" min="0" max="48" step="2" data-prop="radius" value="${Number(element.radius)||0}">`)}${field('ตำแหน่งภาพ',alignmentFields(element))}`;
      }
      if (element.type === 'split') fields += `${field('หัวข้อคู่ภาพ',`<input type="text" data-prop="title" value="${escapeHtml(element.title||'')}">`)}${field('เนื้อหาคู่ภาพ',`<textarea data-prop="text">${escapeHtml(element.text||'')}</textarea>`)}${field('ตำแหน่งรูปภาพ',`<select data-prop="imageSide"><option value="left" ${element.imageSide!=='right'?'selected':''}>ด้านซ้าย</option><option value="right" ${element.imageSide==='right'?'selected':''}>ด้านขวา</option></select>`)}`;
      fields += '</div>';
      if (element.type === 'split') fields += designFields(element,{background:true,align:false,padding:false});
    } else if (element.type === 'banner') {
      fields += `<div class="inspector-group"><h3>เนื้อหาแถบเน้น</h3>${field('หัวข้อ',`<input type="text" data-prop="title" value="${escapeHtml(element.title||'')}">`)}${field('ข้อความ',`<textarea data-prop="text">${escapeHtml(element.text||'')}</textarea>`)}</div>${designFields(element)}`;
    } else if (element.type === 'button') {
      fields += `<div class="inspector-group"><h3>ปุ่มลิงก์</h3>${field('ข้อความบนปุ่ม',`<input type="text" data-prop="text" value="${escapeHtml(element.text||'')}">`)}${field('ลิงก์ปลายทาง',`<input type="text" data-prop="url" value="${escapeHtml(element.url||'#')}">`)}</div>${designFields(element,{background:true,align:true,padding:true})}`;
    } else if (element.type === 'columns') {
      fields += `<div class="inspector-group"><h3>คอลัมน์ซ้าย</h3>${field('หัวข้อ',`<input type="text" data-prop="leftTitle" value="${escapeHtml(element.leftTitle||'')}">`)}${field('เนื้อหา',`<textarea data-prop="leftText">${escapeHtml(element.leftText||'')}</textarea>`)}</div><div class="inspector-group"><h3>คอลัมน์ขวา</h3>${field('หัวข้อ',`<input type="text" data-prop="rightTitle" value="${escapeHtml(element.rightTitle||'')}">`)}${field('เนื้อหา',`<textarea data-prop="rightText">${escapeHtml(element.rightText||'')}</textarea>`)}</div>${designFields(element,{background:true,align:false,padding:true})}`;
    } else if (element.type === 'spacer') {
      fields = `<div class="inspector-group"><h3>ระยะห่าง</h3>${field('ความสูง',`<div class="range-line"><span>ปรับช่องว่างแนวตั้ง</span><b data-height-value>${Number(element.height)||48} px</b></div><input type="range" min="18" max="320" step="6" data-prop="height" value="${Number(element.height)||48}">`)}</div>`;
    } else {
      fields = '<div class="inspector-group"><p class="field-hint">เส้นคั่นใช้แบ่งช่วงเนื้อหา</p></div>';
    }
    inspector.innerHTML = `<div class="selected-label"><span>${iconFor(element.type)}</span><b>${element.type==='legacy'?legacyElementName(element):element.type==='image'?imageStyleName(element.imageStyle):titleFor(element.type)}</b><small>เลือกอยู่</small></div>${fields}<div class="inspector-group"><button class="delete-element" type="button" data-delete="${element.id}">ลบองค์ประกอบ</button></div>`;
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
    for (let index = 0; index < elements.length;) {
      const {end} = photoRowAt(elements,index);
      if (end-index === 1) delete elements[index].studioRowId;
      index = end;
    }
    selectedId = selected;
    renderAll();
    scheduleSave();
  }

  function removeBoardElement(id) {
    const element = elements.find(item => item.id === id);
    if (!element) return;
    if (sourceTextSelection?.elementId === id) sourceTextSelection = null;
    if (sourceImageSelection?.elementId === id) sourceImageSelection = null;
    if (activeTextField?.elementId === id) activeTextField = null;
    setElements(elements.filter(item => item.id !== id),selectedId === id ? null : selectedId);
    showToast('ลบองค์ประกอบแล้ว');
  }

  function insertBlock(type,index,overrides = {}) {
    const next = clone(elements);
    const item = makeElement(type,overrides);
    const selectedIndex = next.findIndex(element => element.id === selectedId);
    const insertAt = Number.isInteger(index) ? Math.max(0,Math.min(index,next.length)) : selectedIndex >= 0 ? photoRowAt(next,selectedIndex).end : next.length;
    next.splice(insertAt, 0, item);
    setElements(next,item.id);
  }

  function addLegacyBlock(legacyType,index) {
    if (!legacyBlockMap.has(legacyType)) return;
    const defaults = {
      legacyType,
      text:['subtitle','subtitleAudio'].includes(legacyType)?'Lorem....':'',
      variant:legacyType==='contentMedia'?'1':legacyType==='contentSpeakers'?'2':'left',
      audioSrc:'',src:'',alt:'',width:legacyDefaultWidth(legacyType),title:'หัวข้อเรื่องราว',text2:'เพิ่มรายละเอียดของเรื่องราวในย่อหน้าที่สอง',caption:legacyType.startsWith('highlight')?'เขียนข้อความประกอบรูปภาพที่นี่':'คำบรรยายรูปภาพที่หนึ่ง\nคำบรรยายรูปภาพที่สอง',label:'อ่านข้อมูลเพิ่มเติม',quote:'เพิ่มคำพูดสำคัญที่ต้องการเน้น',author:'ชื่อผู้พูด',media1Title:'หัวข้อประกอบไอคอน',media1Text:'เพิ่มข้อความอธิบายรายละเอียด',media2Title:'อีกหนึ่งประเด็นสำคัญ',media2Text:'เพิ่มข้อความอธิบายรายละเอียด',text:legacyType==='subtitle'||legacyType==='subtitleAudio'?'หัวข้อเรื่องราวของคุณ':legacyType==='contentText'?'เขียนรายละเอียดเรื่องราวของคุณที่นี่':legacyType==='contentBlockquote'?'เพิ่มข้อความอ้างอิงที่ต้องการเน้น':legacyType==='contentModal'?'เพิ่มรายละเอียดเพิ่มเติมสำหรับหน้าต่าง Popup':'ข้อความประกอบเรื่องราวของคุณ',speakers:[{quote:'เพิ่มคำพูดของผู้พูดคนที่หนึ่ง',name:'ชื่อผู้พูดคนที่หนึ่ง'},{quote:'เพิ่มคำพูดของผู้พูดคนที่สอง',name:'ชื่อผู้พูดคนที่สอง'},{quote:'เพิ่มคำพูดของผู้พูดคนที่สาม',name:'ชื่อผู้พูดคนที่สาม'}]
    };
    insertBlock('legacy',index,defaults);
  }

  function dropPhotoKind(key) {
    if (key === 'legacy:contentQuoteImage' || key === 'legacy:highlightImage') return {type:'legacy',legacyType:key.split(':')[1]};
    const style = key?.match(/^(?:insert:)?image(?:\|(normal|highlight))?$/);
    return style ? {type:'image',...imageInsertOptions(style[1])} : null;
  }

  function photoDrop(event, key, movingId) {
    const frame = event.target.closest(boardImageFrame);
    const targetId = frame?.closest('[data-id]')?.dataset.id;
    const targetIndex = elements.findIndex(item => item.id === targetId);
    const tool = dropPhotoKind(key);
    const moving = elements.find(item => item.id === movingId);
    if (!frame || movingId === targetId || !isRowPhoto(elements[targetIndex]) || (!tool && !isRowPhoto(moving))) return null;
    const {start,end} = photoRowAt(elements,targetIndex);
    const sameRow = elements.slice(start,end).includes(moving);
    const rect = frame.getBoundingClientRect();
    return {targetId,tool,movingId,full:end-start >= photoRowLimit && !sameRow,after:event.clientX >= rect.left+rect.width/2};
  }

  function joinPhotoRow(drop) {
    if (drop.full) { showToast('หนึ่งแถวใส่ได้สูงสุด 4 รูป'); return; }
    const next = clone(elements);
    const movingIndex = next.findIndex(item => item.id === drop.movingId);
    const photo = movingIndex >= 0 ? next.splice(movingIndex,1)[0] :
      makeElement(drop.tool.type,{...drop.tool,...(drop.tool.type==='legacy'?{width:legacyDefaultWidth(drop.tool.legacyType)}:{})});
    const targetIndex = next.findIndex(item => item.id === drop.targetId);
    const {start,end} = photoRowAt(next,targetIndex);
    const key = next[targetIndex].studioRowId || `photo-row-${uid()}`;
    next.slice(start,end).forEach(item => { item.studioRowId = key; });
    photo.studioRowId = key;
    next.splice(targetIndex + Number(drop.after),0,photo);
    setElements(next,photo.id);
  }

  function imageInsertOptions(style) {
    if (!style) return {};
    return {imageStyle:style,width:style==='normal'?82:100,radius:style==='normal'?6:0};
  }

  function imageSlotPercent(element) {
    const width = Math.max(10,Math.min(imageMaxPercent(element),Number(element.width) || 100));
    return element.studioRowId && element.imageStyle === 'normal' ? Math.min(100,width / .82) : width;
  }

  function addBlock(type,overrides = {}) { insertBlock(type,undefined,overrides); }

  function selectElement(id) {
    if (!elements.some(element => element.id === id)) return;
    activeTextField = null;
    updateBoardTextTools();
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
    if (from < 0) return;
    const [moving] = next.splice(from,1);
    delete moving.studioRowId;
    let to = targetId ? next.findIndex(element => element.id === targetId) : next.length;
    if (to < 0) to = next.length;
    if (targetId && to < next.length) {
      const row = photoRowAt(next,to);
      to = after ? row.end : row.start;
    }
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

  function commitInspectorEdit() {
    if (inspectorBaseline && JSON.stringify(inspectorBaseline) !== JSON.stringify(elements)) {
      undoStack.push(inspectorBaseline);
      redoStack = [];
    }
    inspectorBaseline = null;
    renderAll();
  }

  function startImageResize(event) {
    const handle = event.target.closest('[data-resize-handle]');
    if (!handle || resizeState) return;
    const block = handle.closest('[data-id]');
    const element = elements.find(item => item.id === block?.dataset.id);
    const imageBox = handle.parentElement;
    const sourceIndex=element?.type==='sourcePage'?Number(imageBox?.dataset.sourceFrame):null;
    if (!element || (!['image','split'].includes(element.type) && !legacyHasImage(element) && element.type!=='sourcePage') || !imageBox || (element.type==='sourcePage'&&!Number.isInteger(sourceIndex))) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = imageBox.getBoundingClientRect();
    const width = rect.width / zoom;
    const parent = imageBox.parentElement;
    const style = getComputedStyle(parent);
    const parentWidth = parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const startingPercent = element.type === 'sourcePage' ? width / Math.max(1,parentWidth) * 100 : Number(element.width) || (element.type === 'legacy' ? legacyDefaultWidth(element.legacyType) : 100);
    const widthPercent = Math.max(10,Math.min(imageMaxPercent(element),startingPercent));
    const height = Math.max(1,rect.height / zoom);
    resizeState = {id:element.id,handle:handle.dataset.resizeHandle,sourceIndex,startX:event.clientX,startY:event.clientY,startWidth:widthPercent,baseWidth:width/(widthPercent/100),frameWidth:width,aspect:width/height,before:clone(elements),block};
    block.setAttribute('draggable','false');
    try { handle.setPointerCapture?.(event.pointerId); } catch {}
    document.addEventListener('pointermove',resizeImageMove);
    document.addEventListener('pointerup',finishImageResize,{once:true});
    document.addEventListener('pointercancel',finishImageResize,{once:true});
    document.addEventListener('mousemove',resizeImageMove);
    document.addEventListener('mouseup',finishImageResize,{once:true});
  }

  function resizeImageMove(event) {
    if (!resizeState) return;
    const el = elements.find(item => item.id === resizeState.id);
    if (!el) return;
    const handle = resizeState.handle;
    const hasX = handle.includes('e') || handle.includes('w');
    const hasY = handle.includes('n') || handle.includes('s');
    const dx = (event.clientX-resizeState.startX) / zoom * (handle.includes('w') ? -1 : 1);
    const dy = (event.clientY-resizeState.startY) / zoom * (handle.includes('n') ? -1 : 1) * resizeState.aspect;
    const block = artboard.querySelector(`[data-id="${el.id}"]`);
    const imageBox = el.type==='sourcePage' ? block?.querySelector(`[data-source-frame="${resizeState.sourceIndex}"]`) : block?.querySelector(boardImageFrame);
    if (hasY && !hasX && imageBox?.querySelector('img')) {
      if (Math.abs(dy) < 1 && !resizeState.cropping) return;
      resizeState.cropping = true;
      const ratio = Math.max(.25,Math.min(5,resizeState.aspect / Math.max(.01,1 + dy / resizeState.frameWidth)));
      if (el.type === 'sourcePage') {
        el.imageCropRatios ||= {};
        el.imageCropRatios[resizeState.sourceIndex] = ratio;
      } else {
        el.cropRatio = ratio;
      }
      applyCropFrame(imageBox,ratio);
      return;
    }
    const delta = hasX && hasY ? (Math.abs(dx)>=Math.abs(dy)?dx:dy) : hasX ? dx : dy;
    const width = Math.max(10,Math.min(imageMaxPercent(el),resizeState.startWidth + delta / resizeState.baseWidth * 100));
    if(el.type==='sourcePage') {el.imageWidths ||= {};el.imageWidths[resizeState.sourceIndex]=width;}
    else el.width = width;
    if (el.type === 'image') {
      imageBox?.parentElement.style.setProperty('--image-width',`${imageSlotPercent(el)}%`);
    } else if (imageBox) {
      const baseline = el.type === 'legacy' ? legacyDefaultWidth(el.legacyType) : 100;
      imageBox.style.width = `${Math.max(10,Math.min(100,width/baseline*100))}%`;
    }
    const slider = $('[data-prop="width"]',inspector);
    if (slider) slider.value = String(Math.round(width));
    const sourceSlider=$('[data-prop="sourceImageWidth"]',inspector);
    if(sourceSlider) sourceSlider.value=String(Math.round(width));
    const label = $('[data-width-value]',inspector);
    if (label) label.textContent = `${imageWidthPx(el)} px`;
    const sourceLabel=$('[data-source-width-value]',inspector);
    if(sourceLabel) sourceLabel.textContent=`${Math.round(width)}%`;
    $('#saveStatus').textContent = 'มีการแก้ไข';
    scheduleSave();
  }

  function finishImageResize() {
    document.removeEventListener('pointermove',resizeImageMove);
    document.removeEventListener('pointerup',finishImageResize);
    document.removeEventListener('pointercancel',finishImageResize);
    document.removeEventListener('mousemove',resizeImageMove);
    document.removeEventListener('mouseup',finishImageResize);
    if (!resizeState) return;
    resizeState.block.setAttribute('draggable','true');
    if (JSON.stringify(resizeState.before) !== JSON.stringify(elements)) {
      undoStack.push(resizeState.before);
      redoStack = [];
      $('#saveStatus').textContent = 'มีการแก้ไข';
      scheduleSave();
    }
    resizeState = null;
    renderAll();
  }

  function onInlineEdit(event) {
    const target = event.target.closest('[contenteditable="true"]');
    if (!target) return;
    const block = target.closest('[data-id]');
    const element = elements.find(item => item.id === block?.dataset.id);
    if (!element) return;
    if (element.type==='sourcePage') {
      const sourceRoot=block.querySelector('[data-source-render]');
      if (sourceRoot) element.markup=sourceHtmlFromPreview(sourceRoot);
      const layer=$(`.layer-row[data-layer-id="${element.id}"] .layer-name`);
      if (layer) layer.textContent=element.title || 'องค์ประกอบจากเทมเพลต';
      $('#saveStatus').textContent='มีการแก้ไข';
      scheduleSave();
      return;
    }
    const part = target.dataset.part || 'text';
    const value = target.innerText.replace(/\u00a0/g,' ').trimEnd();
    const speakerIndex = target.dataset.boardSpeaker;
    if (speakerIndex !== undefined) {
      element.speakers ||= [];
      element.speakers[speakerIndex] ||= {};
      element.speakers[speakerIndex][part] = value;
    } else {
      element[part] = value;
    }
    const inspectorField = speakerIndex === undefined
      ? $(`[data-prop="${part}"]`,inspector)
      : $(`[data-speaker-index="${speakerIndex}"][data-speaker-prop="${part}"]`,inspector);
    if (inspectorField && selectedId === element.id) inspectorField.value = value;
    const layer = $(`.layer-row[data-layer-id="${element.id}"] .layer-name`);
    if (layer) layer.textContent = element.text?.split('\n')[0] || element.title || (element.type === 'legacy' ? legacyElementName(element) : titleFor(element.type));
    $('#saveStatus').textContent = 'มีการแก้ไข';
    scheduleSave();
  }

  function focusNewText(node) {
    if (!node) return;
    node.focus();
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function boardTextKey(node) {
    return node.dataset.boardSpeaker === undefined ? node.dataset.part : `speaker:${node.dataset.boardSpeaker}:${node.dataset.part}`;
  }

  function currentBoardText() {
    if (!activeTextField || activeTextField.elementId !== selectedId) return null;
    const block = $(`.canvas-block[data-id="${selectedId}"]`,artboard);
    if (!block) return null;
    if (activeTextField.sourceIndex !== undefined) {
      return $(`[data-source-edit="${activeTextField.sourceIndex}"]`,block);
    }
    return $$('[contenteditable="true"][data-part]',block).find(node => boardTextKey(node) === activeTextField.key);
  }

  function wholeTextMark(node,tag) {
    let current = node;
    while (current.children.length === 1 && current.childNodes.length === 1) {
      current = current.firstElementChild;
      if (current.localName === tag) return current;
      if (!['strong','em'].includes(current.localName)) break;
    }
    return null;
  }

  function updateBoardTextTools() {
    const node = currentBoardText();
    const item = elements.find(element => element.id === selectedId);
    $('#openBoardSettings').disabled = !item;
    $('#removeBoardText').disabled = !node;
    const source = node?.hasAttribute('data-source-edit');
    const format = source ? {
      bold:Boolean(wholeTextMark(node,'strong')), italic:Boolean(wholeTextMark(node,'em')),
      align:textAlignClasses.find(name => node.classList.contains(name))?.slice(5)
    } : item?.textFormats?.[activeTextField?.key];
    $$('[data-text-format]',boardTextTools).forEach(button => {
      button.disabled = !node;
      const key = button.dataset.textFormat;
      const isPressed = key === 'bold' || key === 'italic' ? Boolean(format?.[key]) : (format?.align || 'left') === key;
      button.setAttribute('aria-pressed',String(Boolean(node && isPressed)));
    });
  }

  function applyBoardTextFormat(command) {
    const node = currentBoardText();
    if (!node) return;
    const id = selectedId;
    const isMark = command === 'bold' || command === 'italic';
    const sourceRoot = node.closest('[data-source-render]');
    if (document.activeElement === node) node.blur();
    const next = clone(elements);
    const element = next.find(item => item.id === id);
    if (sourceRoot) {
      if (isMark) {
        const tag = command === 'bold' ? 'strong' : 'em';
        const existing = wholeTextMark(node,tag);
        if (existing) existing.replaceWith(...existing.childNodes);
        else {
          const wrapper = document.createElement(tag);
          wrapper.append(...node.childNodes);
          node.append(wrapper);
        }
      } else {
        node.classList.remove(...textAlignClasses);
        node.classList.add(`text-${command}`);
      }
      element.markup = sourceHtmlFromPreview(sourceRoot);
    } else {
      element.textFormats ||= {};
      const key = boardTextKey(node);
      const format = element.textFormats[key] ||= {};
      if (isMark) format[command] = !format[command];
      else format.align = command;
    }
    setElements(next,id);
    focusNewText(currentBoardText());
  }

  const sourceTextTools = {
    text:'p', heading:'h4', quote:'blockquote',
    'legacy:contentText':'p', 'legacy:contentHeading':'h4', 'legacy:subtitle':'h3',
    'legacy:contentBlockquote':'blockquote'
  };

  function editCompositeText(item, anchor, action, tag, before) {
    const block = anchor.closest('[data-id]');
    if (document.activeElement === anchor) anchor.blur();
    const marked = clone(item);
    const part = anchor.dataset.part;
    const speaker = anchor.dataset.boardSpeaker;
    const fields = speaker === undefined ? marked : marked.speakers?.[speaker];
    if (!fields || !part) return;
    const oldText = fields[part] || '';
    const marker = 'REFLECTION_EDIT_' + Date.now().toString(36);
    fields[part] = marker;
    const doc = document.createElement('template');
    doc.innerHTML = buildExport([marked]);
    const walker = document.createTreeWalker(doc.content,NodeFilter.SHOW_TEXT);
    let token;
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue === marker) { token = walker.currentNode; break; }
    }
    if (!token) return;
    const unit = token.parentElement.closest('a,.font-italic,h1,h2,h3,h4,h5,h6,p,blockquote,figcaption');
    if (!unit) return;
    let inserted;
    if (action === 'remove') {
      unit.remove();
    } else {
      const copy = document.createElement('template');
      copy.innerHTML = textHtml(oldText);
      token.replaceWith(copy.content);
      inserted = makeDroppedText(tag);
      if (before) unit.before(inserted);
      else unit.after(inserted);
    }
    const originals = $$('img',doc.content).map(img => img.outerHTML);
    const uploads = $$(boardImageFrame,block).map(frame => frame.querySelector('img')).filter(Boolean);
    $$('img',doc.content).forEach((img,index) => {
      img.dataset.templatePlaceholder = Number(img.getAttribute('width')) <= 60 && img.hasAttribute('width') ? 'square' : 'wide';
      if (!uploads[index]) return;
      img.setAttribute('src',uploads[index].getAttribute('src'));
      img.setAttribute('alt',uploads[index].alt);
    });
    const textIndex = inserted ? sourceTextNodes(doc.content).indexOf(inserted) : -1;
    const replacement = {
      ...item,type:'sourcePage',sourcePath:[],sourceKind:'composite',visualTemplate:true,
      title:$('.board-section-header b',block).textContent,markup:doc.innerHTML,originalImages:originals,
      imageCount:originals.length,imageCropRatios:item.cropRatio?{0:item.cropRatio}:{}
    };
    activeTextField = null;
    sourceTextSelection = null;
    sourceImageSelection = null;
    setElements(elements.map(value => value.id === item.id ? replacement : value),item.id);
    if (textIndex >= 0) focusNewText($(`.board-section[data-id="${item.id}"] [data-source-edit="${textIndex}"]`,artboard));
  }

  function makeDroppedText(tag) {
    const inserted = document.createElement(tag);
    inserted.textContent = tag === 'p' ? 'พิมพ์ข้อความที่นี่' : tag === 'blockquote' ? 'พิมพ์คำพูดที่นี่' : 'พิมพ์หัวข้อที่นี่';
    if (tag === 'h3') inserted.className = 'news__subtitle';
    return inserted;
  }

  function allowsNestedText(item) {
    if (item.type === 'sourcePage') return !['text','heading','subtitle','quote','audio','image','highlight'].includes(item.sourceKind);
    if (item.type === 'legacy') return !['subtitle','contentHeading','contentText','contentBlockquote'].includes(item.legacyType);
    return ['split','columns','banner'].includes(item.type) || item.type === 'image' && item.imageStyle === 'greenText';
  }

  function removeSelectedText() {
    const anchor = currentBoardText();
    if (!anchor) return;
    const item = elements.find(element => element.id === selectedId);
    const root = anchor.closest('[data-source-render]');
    if (root) {
      if (!allowsNestedText(item) && sourceTextNodes(root).length === 1 && !root.querySelector('img,audio,video')) {
        removeBoardElement(item.id);
      } else changeSourceText(root,anchor,'remove');
    } else if (!allowsNestedText(item)) removeBoardElement(item.id);
    else editCompositeText(item,anchor,'remove');
    updateBoardTextTools();
  }

  function sourceDropPoint(event) {
    const anchor = event.target.closest('[contenteditable="true"]');
    const element = elements.find(item => item.id === anchor?.closest('[data-id]')?.dataset.id);
    if (!element || !allowsNestedText(element)) return null;
    return {element,root:anchor.closest('[data-source-render]'),anchor,before:!isAfterBlock(event,anchor)};
  }

  function clearSourceDropHint() {
    $$('.source-text-drop-before,.source-text-drop-after',artboard).forEach(node => {
      node.classList.remove('source-text-drop-before','source-text-drop-after');
    });
  }

  let blockDropTarget = null;
  function clearBlockDropHint() {
    blockDropTarget?.removeAttribute('data-block-drop');
    blockDropTarget = null;
  }

  function isAfterBlock(event, block) {
    const rect = block.getBoundingClientRect();
    return event.clientY > rect.top + rect.height / 2;
  }

  function changeSourceText(root, anchor, action, tag = 'p', before = false) {
    const id = root.closest('[data-id]')?.dataset.id;
    const element = elements.find(item => item.id === id && item.type === 'sourcePage');
    if (!element || (action === 'remove' && !anchor)) return;
    if (root.contains(document.activeElement)) document.activeElement.blur();
    let inserted = null;
    if (action === 'remove') {
      if (anchor.matches('td,th')) anchor.replaceChildren();
      else anchor.remove();
    } else {
      const listItem = anchor?.closest('li');
      if (listItem) anchor = tag === 'p' ? listItem : listItem.closest('ul,ol');
      else anchor = anchor?.closest('figure,table,blockquote') || anchor;
      const newTag = anchor?.matches('li') ? 'li' : tag;
      inserted = makeDroppedText(newTag);
      if (anchor) {
        if (before) anchor.before(inserted);
        else anchor.after(inserted);
      } else if (element.sourcePath?.length) {
        root.append(inserted);
      } else {
        const section = document.createElement('div');
        section.className = 'container';
        section.innerHTML = '<div class="row justify-content-center"><div class="col-md-10 col-xl-8 col-xxl-6"></div></div>';
        section.firstElementChild.firstElementChild.append(inserted);
        root.append(section);
      }
    }
    const textIndex = inserted ? sourceTextNodes(root).indexOf(inserted) : -1;
    const markup = sourceHtmlFromPreview(root);
    sourceTextSelection = null;
    sourceImageSelection = null;
    activeTextField = null;
    setElements(elements.map(item => item.id === id ? {...item,markup} : item),id);
    const block = $(`.source-page-block[data-id="${id}"]`,artboard);
    if (textIndex >= 0) focusNewText($(`[data-source-edit="${textIndex}"]`,block));
    else if (action === 'remove') showToast('ลบข้อความที่เลือกแล้ว');
  }

  function replaceSourceImage(markup,index,src,alt) {
    let imageIndex=0;
    return String(markup||'').replace(/<img\b[^>]*>/gi,tag=>{
      const current=imageIndex++;
      if(current!==index) return tag;
      let next=tag.replace(/\s+src=("[^"]*"|'[^']*')/i,` src="${escapeHtml(src)}"`);
      if(!/\s+src=/i.test(next)) next=next.replace(/<img\b/i,`<img src="${escapeHtml(src)}"`);
      if(/\s+alt=("[^"]*"|'[^']*')/i.test(next)) next=next.replace(/\s+alt=("[^"]*"|'[^']*')/i,` alt="${escapeHtml(alt)}"`);
      else next=next.replace(/<img\b/i,`<img alt="${escapeHtml(alt)}"`);
      return next;
    });
  }

  let saveTimer;
  function scheduleSave() {
    const revision = ++draftSaveRevision;
    const payload = {title:$('#documentTitle').textContent,elements:clone(elements),nextId};
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      try {
        await persistDraft(payload);
        if (!galleryView.hidden) refreshResumeButton();
        if (revision === draftSaveRevision) $('#saveStatus').textContent = 'บันทึกอัตโนมัติแล้ว';
      } catch {
        if (revision === draftSaveRevision) {
          $('#saveStatus').textContent = 'บันทึกร่างไม่สำเร็จ';
          showToast('บันทึกไม่สำเร็จ ตรวจสอบพื้นที่จัดเก็บของเบราว์เซอร์');
        }
      }
    }, 600);
  }

  function openDraftDatabase() {
    if (!('indexedDB' in window)) return Promise.reject(new Error('IndexedDB is unavailable'));
    if (!draftDbPromise) {
      draftDbPromise = new Promise((resolve,reject) => {
        const request = indexedDB.open(DRAFT_DB_NAME,1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains(DRAFT_STORE)) request.result.createObjectStore(DRAFT_STORE);
        };
        request.onsuccess = () => {
          request.result.onversionchange = () => request.result.close();
          resolve(request.result);
        };
        request.onerror = () => reject(request.error || new Error('Could not open draft storage'));
        request.onblocked = () => reject(new Error('Draft storage is blocked'));
      }).catch(error => {draftDbPromise=null;throw error});
    }
    return draftDbPromise;
  }

  async function readDraftRecord() {
    const db = await openDraftDatabase();
    return new Promise((resolve,reject) => {
      const transaction = db.transaction(DRAFT_STORE,'readonly');
      const request = transaction.objectStore(DRAFT_STORE).get('current');
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('Could not read draft'));
    });
  }

  async function readSavedDraft() {
    try {
      const draft = await readDraftRecord();
      if (draft) return draft;
    } catch {}
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      return stored && stored !== 'indexeddb' ? JSON.parse(stored) : null;
    } catch {return null;}
  }

  async function hasSavedDraft() {
    try {if (localStorage.getItem(DRAFT_KEY)) return true;} catch {}
    try {return Boolean(await readDraftRecord());} catch {return false;}
  }

  async function refreshResumeButton() {
    const revision = ++resumeCheckRevision;
    const available = await hasSavedDraft();
    if (revision === resumeCheckRevision) $('#resumeDraft').hidden = !available;
  }

  async function persistDraft(payload) {
    const operation = draftSaveQueue.then(async () => {
      try {
        const db = await openDraftDatabase();
        await new Promise((resolve,reject) => {
          const transaction = db.transaction(DRAFT_STORE,'readwrite');
          transaction.objectStore(DRAFT_STORE).put(payload,'current');
          transaction.oncomplete = resolve;
          transaction.onerror = () => reject(transaction.error || new Error('Could not save draft'));
          transaction.onabort = () => reject(transaction.error || new Error('Draft save was interrupted'));
        });
        try {localStorage.setItem(DRAFT_KEY,'indexeddb');} catch {}
      } catch (databaseError) {
        try {localStorage.setItem(DRAFT_KEY,JSON.stringify(payload));}
        catch {throw databaseError;}
      }
    });
    draftSaveQueue = operation.catch(() => {});
    return operation;
  }

  async function saveDraft() {
    $('#saveStatus').textContent = 'กำลังบันทึกร่าง…';
    const revision = ++draftSaveRevision;
    clearTimeout(saveTimer);
    const payload = {title:$('#documentTitle').textContent,elements:clone(elements),nextId};
    try {
      await persistDraft(payload);
      if (!galleryView.hidden) refreshResumeButton();
      if (revision === draftSaveRevision) $('#saveStatus').textContent = 'บันทึกล่าสุดแล้ว';
      showToast('บันทึกร่างไว้ในเบราว์เซอร์แล้ว');
    } catch {
      if (revision === draftSaveRevision) $('#saveStatus').textContent = 'บันทึกร่างไม่สำเร็จ';
      showToast('บันทึกไม่สำเร็จ ตรวจสอบพื้นที่จัดเก็บของเบราว์เซอร์');
    }
  }

  function elementToLegacyMarkup(element) {
    const heading = textHtml(element.title || '');
    const text = textHtml(element.text || '');
    const image = `<figure class="text-center"><img class="img-fluid" src="#" alt="${escapeHtml(element.alt || '')}"></figure>`;
    if (element.type === 'heading') return `<h4>${text}</h4>`;
    if (element.type === 'text') return `<p>${text}</p>`;
    if (element.type === 'quote') return `<blockquote><p>${text}</p></blockquote>`;
    if (element.type === 'image') return image + (element.imageStyle === 'greenText' && element.caption ? `
<p>${textHtml(element.caption)}</p>` : '');
    if (element.type === 'split') {
      const media = `<div class="col-md-6">${image}</div>`;
      const copy = `<div class="col-md-6"><h4>${heading}</h4><p>${text}</p></div>`;
      return `<div class="container">\n<div class="row align-items-center">\n${element.imageSide==='right' ? copy+'\n'+media : media+'\n'+copy}\n</div>\n</div>`;
    }
    if (element.type === 'banner') return `<div class="bg-green-gradient-vertical mb-md-6 mb-5 pb-md-6 pb-5">\n    <div class="container">\n        <div class="row justify-content-center">\n            <div class="col-md-10 col-xl-8 col-xxl-6">\n                ${element.title ? `<h2 class="news__subtitle mb-4">${heading}</h2>\n                ` : ''}<p class="text-white">${text}</p>\n            </div>\n        </div>\n    </div>\n</div>`;
    if (element.type === 'button') return `<p class="my-5"><a href="${escapeHtml(safeHref(element.url))}" class="btn btn--primary"><span class="btn__text btn__text--sm">${textHtml(element.text)}</span></a></p>`;
    if (element.type === 'columns') return `<div class="container">\n    <div class="row my-5">\n        <div class="col-md-6">\n            <h4>${textHtml(element.leftTitle)}</h4>\n            <p class="mb-0">${textHtml(element.leftText)}</p>\n        </div>\n        <div class="col-md-6">\n            <h4>${textHtml(element.rightTitle)}</h4>\n            <p class="mb-0">${textHtml(element.rightText)}</p>\n        </div>\n    </div>\n</div>`;
    if (element.type === 'spacer') return '<div class="py-5"></div>';
    if (element.type === 'divider') return '<hr class="hr-lg-dark-green my-4">';
    return '';
  }

  function exportPhotoRow(photos) {
    const column = {2:'col-md-6',3:'col-md-4',4:'col-md-3'}[photos.length];
    const cells = photos.map(photo => {
      const original = photo.type === 'sourcePage' && photo.originalImages?.[0];
      const image = original ? cleanSourceMarkup(original) : `<img class="img-fluid" src="#" alt="${escapeHtml(photo.alt || '')}">`;
      return `<div class="${column}"><figure class="text-center my-5">${image}</figure></div>`;
    });
    return `<div class="container">\n<div class="row justify-content-center">\n${cells.join('\n')}\n</div>\n</div>`;
  }

  function buildExport(items = elements) {
    const contentParts=[];
    const formattedFields = new Map();
    const tokenPrefix = `REFLECTION_FORMAT_${Date.now().toString(36)}_`;
    const mark = (value,format) => String(value ?? '').split('\n').map(line => {
      if (!line) return '';
      const token = `${tokenPrefix}${formattedFields.size}_END`;
      formattedFields.set(token,{value:line,format});
      return token;
    }).join('\n');
    let legacyRun=[];
    let sourceRun = '';
    let sourcePath = [];
    const flushSource = () => {
      if (sourceRun) contentParts.push(sourceRun + sourcePath.slice().reverse().map(wrapper => wrapper.close).join(''));
      sourceRun = '';
      sourcePath = [];
    };
    const flushLegacy=()=>{
      if (!legacyRun.length) return;
      const html=legacyPatterns.generateHtml(legacyRun);
      if (html) contentParts.push(html);
      legacyRun=[];
    };
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      const {end} = photoRowAt(items,index);
      if (end-index > 1) {
        flushLegacy();
        flushSource();
        contentParts.push(exportPhotoRow(items.slice(index,end)));
        index = end-1;
        continue;
      }
      if (element.type==='sourcePage') {
        flushLegacy();
        const originalTemplate = templates.find(template => template.id === element.sourceId);
        const originalImages = element.originalImages || originalTemplate?.markup?.match(/<img\b[^>]*>/gi) || [];
        let imageIndex = 0;
        const markup = cleanSourceMarkup(element.markup).replace(/<img\b[^>]*>/gi,tag => {
          const original = originalImages[imageIndex++];
          const localImage = /\bsrc=(["'])(?:data:image\/|blob:)[^"']*\1/i;
          if (!localImage.test(tag)) return tag;
          return original ? cleanSourceMarkup(original) : tag.replace(localImage,'src="#"');
        });
        if (markup) {
          const nextPath = element.sourcePath || [];
          let shared = 0;
          while (sourcePath[shared] && sourcePath[shared].id === nextPath[shared]?.id) shared++;
          sourceRun += sourcePath.slice(shared).reverse().map(wrapper => wrapper.close).join('');
          sourceRun += '\n' + nextPath.slice(shared).map(wrapper => wrapper.open).join('') + markup;
          sourcePath = nextPath;
        }
        continue;
      }
      flushSource();
      let exportElement = element;
      if (element.textFormats) {
        exportElement = clone(element);
        for (const [key,format] of Object.entries(element.textFormats)) {
          if (!format.align && !format.bold && !format.italic) continue;
          const speaker = key.match(/^speaker:(\d+):(quote|name)$/);
          if (speaker) {
            const record = exportElement.speakers?.[speaker[1]];
            if (record) record[speaker[2]] = mark(record[speaker[2]],format);
          } else {
            exportElement[key] = mark(exportElement[key],format);
          }
        }
      }
      if (exportElement.type === 'legacy') legacyRun.push({...exportElement,type:exportElement.legacyType,src:''});
      else {
        flushLegacy();
        const markup=elementToLegacyMarkup(exportElement);
        if (markup) contentParts.push(markup);
      }
    }
    flushLegacy();
    flushSource();
    const markup = contentParts.join('\n\n');
    if (!formattedFields.size) return markup;
    const fragment = document.createElement('template');
    fragment.innerHTML = markup;
    const walker = document.createTreeWalker(fragment.content,NodeFilter.SHOW_TEXT);
    const tokens = [];
    while (walker.nextNode()) {
      if (formattedFields.has(walker.currentNode.nodeValue)) tokens.push(walker.currentNode);
    }
    for (const token of tokens) {
      const {value,format} = formattedFields.get(token.nodeValue);
      if (format.align) {
        const parent = token.parentElement.closest('p,h1,h2,h3,h4,h5,h6,blockquote,.font-italic');
        if (parent) {
          parent.classList.remove(...textAlignClasses);
          parent.classList.add(`text-${format.align}`);
        }
      }
      let replacement = document.createTextNode(value);
      for (const [enabled,tag] of [[format.bold,'strong'],[format.italic,'em']]) {
        if (!enabled) continue;
        const wrapper = document.createElement(tag);
        wrapper.append(replacement);
        replacement = wrapper;
      }
      token.replaceWith(replacement);
    }
    return fragment.innerHTML;
  }

  async function createCroppedWebp(image) {
    await image.decode();
    const frame = image.closest(boardImageFrame);
    const boxWidth = image.clientWidth;
    const boxHeight = image.clientHeight;
    if (!frame || !boxWidth || !boxHeight) throw new Error('ไม่พบกรอบรูปบนบอร์ด');
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1000,boxWidth);
    canvas.height = Math.round(canvas.width * boxHeight / boxWidth);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('เบราว์เซอร์นี้สร้างไฟล์ภาพไม่ได้');
    const style = getComputedStyle(image);
    const scale = (style.objectFit === 'contain' ? Math.min : Math.max)(canvas.width/image.naturalWidth,canvas.height/image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const radii = ['borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius']
      .map(property => (parseFloat(style[property]) || 0)*canvas.width/boxWidth);
    if (radii.some(Boolean) && context.roundRect) {
      context.beginPath();
      context.roundRect(0,0,canvas.width,canvas.height,radii);
      context.clip();
    }
    context.drawImage(image,(canvas.width-width)/2,(canvas.height-height)/2,width,height);
    const blob = await canvasToBlob(canvas,'image/webp',.92);
    if (blob?.type !== 'image/webp') throw new Error('เบราว์เซอร์นี้ส่งออก WebP ไม่สำเร็จ');
    return {blob,width:canvas.width,height:canvas.height};
  }

  function downloadWebp(blob,filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url),5000);
  }

  async function exportDesignImage() {
    const button = $('#openImageExport');
    const images = [...artboard.querySelectorAll('img[src]')].filter(image => {
      const frame = image.closest(boardImageFrame);
      const src = image.getAttribute('src').trim();
      return frame && src && src !== '#' &&
        !frame.matches('.source-template-green-frame:not(.has-user-image)');
    });
    if (!images.length) {showToast('ไม่มีรูปภาพให้ส่งออก');return;}
    const buttonMarkup = button.innerHTML;
    button.disabled = true;
    const editorWasHidden = editorView.hidden;
    const editorStyle = editorView.getAttribute('style');
    try {
      editorView.hidden = false;
      Object.assign(editorView.style,{position:'fixed',left:'-100000px',top:'0',visibility:'hidden',pointerEvents:'none',zIndex:'-1',width:'1280px',height:'100vh'});
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const fileTitle = ($('#documentTitle').textContent.trim() || 'reflection-design').replace(/[\\/:*?"<>|]+/g,'-');
      const usedNames = new Set();
      let exported = 0;
      let failed = 0;
      let firstError = null;
      for (const [index,image] of images.entries()) {
        button.textContent = `กำลังส่งออกรูป ${index+1}/${images.length}…`;
        try {
          const {blob} = await createCroppedWebp(image);
          const label = (image.alt || 'image').replace(/[\\/:*?"<>|]+/g,'-').trim() || 'image';
          let filename = `${fileTitle}-${String(index+1).padStart(2,'0')}-${label}`;
          let unique = filename;
          let suffix = 2;
          while (usedNames.has(unique)) unique = `${filename}-${suffix++}`;
          usedNames.add(unique);
          downloadWebp(blob,unique + '.webp');
          exported++;
          await new Promise(resolve => setTimeout(resolve,350));
        } catch (error) {
          failed++;
          firstError ||= error;
        }
      }
      if (!exported) throw firstError || new Error('ไม่มีรูปภาพให้ส่งออก');
      showToast(failed ? `ส่งออก ${exported} รูปเป็น WebP แล้ว · ข้าม ${failed} รูปที่อ่านไม่ได้` : `ส่งออกรูปแยก ${exported} รูปเป็น WebP แล้ว`);
    } catch (error) {
      showToast(error?.message || 'ส่งออก WebP ไม่สำเร็จ');
    } finally {
      editorView.hidden = editorWasHidden;
      if (editorStyle === null) editorView.removeAttribute('style');
      else editorView.setAttribute('style',editorStyle);
      button.disabled = false;
      button.innerHTML = buttonMarkup;
    }
  }

  function openExport() {
    try {
      exportCode.value = buildExport();
      $('#exportFeedback').textContent = '';
      const fragment = document.createElement('template');
      fragment.innerHTML = exportCode.value;
      const assets = [...fragment.content.querySelectorAll('img,audio,video,source')];
      const missing = assets.filter(node => {
        const path = node.getAttribute('src');
        if (node.matches('audio,video') && !path && node.querySelector('source')) return false;
        return !path || path === '#' || path.includes('#####');
      }).length;
      const embedded = assets.filter(node => node.getAttribute('src')?.startsWith('data:')).length;
      const notes = [];
      if (missing) notes.push(`มีไฟล์สื่อ ${missing} รายการที่ต้องใส่พาธจริงหลังอัปโหลดเข้า CMS`);
      if (embedded) notes.push(`มีไฟล์ฝังในโค้ด ${embedded} รายการ หาก CMS ตัดออก ให้อัปโหลดไฟล์ใน CMS แล้วใช้พาธของไฟล์`);
      const status = $('#exportAssetStatus');
      status.textContent = notes.join(' · ');
      status.hidden = !notes.length;
      exportDialog.showModal();
    } catch {
      showToast('เตรียม HTML ไม่สำเร็จ กรุณาลองอีกครั้ง');
    }
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
    const viewport=$('#canvasViewport');
    const viewportStyle=getComputedStyle(viewport);
    const horizontalPadding=parseFloat(viewportStyle.paddingLeft||0)+parseFloat(viewportStyle.paddingRight||0);
    const available = Math.max(320,viewport.clientWidth-horizontalPadding-8);
    zoom = Math.max(.38,Math.min(1,available / ARTBOARD_WIDTH));
    renderArtboard();
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error('Could not read image'));
      reader.readAsDataURL(blob);
    });
  }

  function canvasToBlob(canvas,type,quality) {
    return new Promise(resolve => canvas.toBlob(resolve,type,quality));
  }

  async function prepareImageAsset(file) {
    if (!window.createImageBitmap) return {src:await blobToDataUrl(file),optimized:false,bytes:file.size,aspectRatio:null};
    let bitmap;
    let aspectRatio = null;
    try {
      const sourceBitmap = await createImageBitmap(file);
      aspectRatio = sourceBitmap.height/sourceBitmap.width;
      const keepOriginal = file.type === 'image/svg+xml' || file.type === 'image/gif';
      const needsOptimization = !keepOriginal && (file.size > 350 * 1024 || sourceBitmap.width*sourceBitmap.height > 8_000_000 || Math.max(sourceBitmap.width,sourceBitmap.height) > 4800);
      if (!needsOptimization) {
        sourceBitmap.close?.();
        return {src:await blobToDataUrl(file),optimized:false,bytes:file.size,aspectRatio};
      }
      const scale = Math.min(1,4800/Math.max(sourceBitmap.width,sourceBitmap.height),1800/sourceBitmap.width,Math.sqrt(8_000_000/(sourceBitmap.width*sourceBitmap.height)));
      const width = Math.max(1,Math.round(sourceBitmap.width*scale));
      const height = Math.max(1,Math.round(sourceBitmap.height*scale));
      if (scale < .999) {
        try {bitmap = await createImageBitmap(file,{resizeWidth:width,resizeHeight:height,resizeQuality:'high'});}
        catch {bitmap = sourceBitmap;}
      } else bitmap = sourceBitmap;
      if (bitmap !== sourceBitmap) sourceBitmap.close?.();
    } catch {return {src:await blobToDataUrl(file),optimized:false,bytes:file.size,aspectRatio:null};}
    try {
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext('2d',{alpha:true});
      if (!context) return {src:await blobToDataUrl(file),optimized:false,bytes:file.size,aspectRatio};
      context.drawImage(bitmap,0,0,canvas.width,canvas.height);
      let blob = await canvasToBlob(canvas,'image/webp',.84);
      if (!blob || blob.type !== 'image/webp') return {src:await blobToDataUrl(file),optimized:false,bytes:file.size,aspectRatio};
      if (blob.size > 1_500_000) {
        blob = await canvasToBlob(canvas,'image/webp',.72) || blob;
      }
      if (blob.size > file.size) return {src:await blobToDataUrl(file),optimized:false,bytes:file.size,aspectRatio};
      return {src:await blobToDataUrl(blob),optimized:blob.size<file.size,bytes:blob.size,aspectRatio};
    } finally {bitmap.close?.();}
  }

  async function applyFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const targetId = selectedId;
    const sourceSlot = sourceImageSelection;
    const documentVersion = editorDocumentVersion;
    showToast('กำลังเตรียมรูปภาพ…');
    try {
      const asset = await prepareImageAsset(file);
      if (documentVersion !== editorDocumentVersion) return;
      const alt = file.name.replace(/\.[^.]+$/,'');
      const current = elements.find(item => item.id === targetId);
      if (current?.type==='sourcePage' && sourceSlot?.elementId===current.id) {
        const next=clone(elements);
        const target=next.find(item=>item.id===targetId);
        target.markup=replaceSourceImage(target.markup,sourceSlot.index,asset.src,alt);
        setElements(next,targetId);
      } else if (current && (['image','split'].includes(current.type) || legacyHasImage(current))) {
        const next = clone(elements);
        const target = next.find(item => item.id === targetId);
        target.src = asset.src;
        target.alt = alt;
        if (asset.aspectRatio) target.aspectRatio = asset.aspectRatio;
        setElements(next,targetId);
      } else if (!targetId || current) {
        const next = clone(elements);
        const image = makeElement('image',{src:asset.src,alt,...(asset.aspectRatio?{aspectRatio:asset.aspectRatio}:{})});
        const selectedIndex = next.findIndex(item => item.id === targetId);
        next.splice(selectedIndex < 0 ? next.length : selectedIndex + 1,0,image);
        setElements(next,image.id);
      }
      const size = `${(file.size/1024/1024).toFixed(1)} → ${(asset.bytes/1024/1024).toFixed(1)} MB`;
      showToast(asset.optimized ? `เพิ่มรูปภาพแล้ว · ปรับขนาดไฟล์ ${size}` : 'เพิ่มรูปภาพลงในงานแล้ว');
    } catch {
      showToast('อ่านรูปภาพไม่สำเร็จ ลองใช้ไฟล์ PNG, JPG หรือ WebP');
    }
  }

  function updateAudioOutputUI() {
    const format = $('#audioOutputFormat').value === 'mp3' ? 'mp3' : 'mp4';
    const label = format.toUpperCase();
    $('#outputExtension').textContent = `.${format}`;
    $('#convertAudioLabel').textContent = `แปลงเป็น ${label}`;
    $('#downloadAudioLabel').textContent = `ดาวน์โหลดไฟล์ ${label}`;
  }

  function setAudioFile(file) {
    if (!file || audioBusy) return;
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
    const outputControls = ['#audioFile','#audioOutputFormat','#audioBitrate','#audioOutputName','#removeAudio'];
    outputControls.forEach(selector => { $(selector).disabled = true; });
    $('#convertAudio').disabled = true;
    $('#loadEngine').disabled = true;
    $('#audioProgressWrap').hidden = false;
    $('#audioResult').hidden = true;
    $('#audioProgressLabel').textContent = 'กำลังเตรียมไฟล์';
    $('#audioProgressPercent').textContent = '8%';
    $('#audioProgressBar').style.width = '8%';
    let inputName = '';
    let outputName = '';
    try {
      const originalExtension = (audioFileObject.name.match(/\.([^.]+)$/)?.[1] || 'mp3').toLowerCase().replace(/[^a-z0-9]/g,'');
      const format = $('#audioOutputFormat').value === 'mp3' ? 'mp3' : 'mp4';
      const codec = format === 'mp3' ? 'libmp3lame' : 'aac';
      inputName = `reflection-input.${originalExtension}`;
      outputName = `reflection-output.${format}`;
      $('#audioProgressLabel').textContent = `กำลังแปลงเสียงเป็น ${format.toUpperCase()} · Stereo`;
      $('#audioProgressPercent').textContent = '25%';
      $('#audioProgressBar').style.width = '25%';
      await audioEngine.writeFile(inputName,new Uint8Array(await audioFileObject.arrayBuffer()));
      const encodeArgs = ['-i',inputName,'-vn','-af','aformat=channel_layouts=mono,pan=stereo|c0=c0|c1=c0','-c:a',codec,'-b:a',$('#audioBitrate').value];
      if (format === 'mp4') encodeArgs.push('-movflags','+faststart');
      encodeArgs.push(outputName);
      const status = await audioEngine.exec(encodeArgs);
      if (status !== 0) throw new Error('แปลงไฟล์ไม่สำเร็จ กรุณาตรวจสอบไฟล์ต้นฉบับ');
      $('#audioProgressPercent').textContent = '88%';
      $('#audioProgressBar').style.width = '88%';
      const data = await audioEngine.readFile(outputName);
      const blob = new Blob([data],{type:format === 'mp3' ? 'audio/mpeg' : 'audio/mp4'});
      if (audioResultUrl) URL.revokeObjectURL(audioResultUrl);
      audioResultUrl = URL.createObjectURL(blob);
      const baseName = ($('#audioOutputName').value.trim() || 'reflection-audio').replace(/[\\/:*?"<>|]/g,'-');
      $('#downloadAudio').href = audioResultUrl;
      $('#downloadAudio').download = `${baseName}.${format}`;
      $('#resultAudio').src = audioResultUrl;
      $('#resultDetails').textContent = `${(blob.size/1024/1024).toFixed(2)} MB · ${format === 'mp3' ? 'MP3' : 'AAC'} · Stereo · ${$('#audioBitrate').value}`;
      $('#audioProgressPercent').textContent = '100%';
      $('#audioProgressBar').style.width = '100%';
      $('#audioProgressLabel').textContent = 'แปลงไฟล์เรียบร้อย';
      $('#audioResult').hidden = false;
      showToast('แปลงไฟล์เสียงเสร็จแล้ว');
    } catch (error) {
      $('#audioProgressLabel').textContent = 'แปลงไฟล์ไม่สำเร็จ';
      showToast(error?.message || 'แปลงไฟล์ไม่สำเร็จ ลองใช้ไฟล์เสียงอื่น');
    } finally {
      try {if (inputName) await audioEngine.deleteFile(inputName);if (outputName) await audioEngine.deleteFile(outputName);} catch {}
      audioBusy = false;
      outputControls.forEach(selector => { $(selector).disabled = false; });
      $('#convertAudio').disabled = !audioFileObject || !audioEngine?.loaded;
      $('#loadEngine').disabled = false;
    }
  }

  function goToTemplatePage(page) {
    if (page === templatePage || page < 1 || page > Math.ceil(templates.length / TEMPLATES_PER_PAGE)) return;
    templatePage = page;
    renderGallery();
    const section = $('#templates');
    section.focus({preventScroll:true});
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({behavior:reduceMotion ? 'instant' : 'smooth',block:'start'});
  }
  $('#templatePrev').addEventListener('click', () => goToTemplatePage(templatePage - 1));
  $('#templateNext').addEventListener('click', () => goToTemplatePage(templatePage + 1));
  $('#templatePageNumbers').addEventListener('click', event => {
    const button = event.target.closest('[data-template-page]');
    if (button) goToTemplatePage(Number(button.dataset.templatePage));
  });
  $('#studioModes').addEventListener('click',event => {
    const button = event.target.closest('[data-view]');
    if (!button) return;
    const mode = button.dataset.view;
    if (mode === 'create') {
      enterEditor('งาน Reflection ใหม่',[]);
      return;
    }
    showMode(mode);
  });
  templateGrid.addEventListener('click',event => {
    const trigger = event.target.closest('[data-preview-template]');
    const card = event.target.closest('[data-template]');
    const templateId=trigger?.dataset.previewTemplate||card?.dataset.template;
    if (!templateId) return;
    openTemplatePreview(templates.find(item => item.id === templateId));
  });
  $('#closeTemplatePreview')?.addEventListener('click',()=>templatePreviewDialog.close());
  $('#useTemplate')?.addEventListener('click',event=>useTemplate(templates.find(item=>item.id===event.currentTarget.dataset.templateId)));
  templatePreviewDialog?.addEventListener('click',event=>{if(event.target===templatePreviewDialog)templatePreviewDialog.close();});
  window.addEventListener('resize', () => {
    if (!galleryView.hidden) fitFullTemplatePreviews();
    if (templatePreviewDialog.open) fitTemplateDetailPreview();
  });
  $('#blankStart').addEventListener('click',() => enterEditor('งาน Reflection ใหม่',[]));
  galleryView.addEventListener('click',async event => {
    if (!event.target.closest('#resumeDraft')) return;
    const resumeButton = $('#resumeDraft');
    resumeButton.disabled = true;
    try {
      const draft = await readSavedDraft();
      if (!draft) {resumeButton.hidden = true;return;}
      enterEditor(draft.title || 'งาน Reflection',draft.elements || []);
      nextId = Math.max(nextId,Number(draft.nextId)||1);
    } catch { showToast('เปิดร่างที่บันทึกไว้ไม่สำเร็จ'); }
    finally {resumeButton.disabled = false;}
  });
  $('#backToGallery').addEventListener('click',() => {
    showMode('gallery');
  });
  $('#editorExport').addEventListener('click',() => showMode('export'));
  $('#backToEditor').addEventListener('click',() => showMode('editor'));
  $('#openImageExport').addEventListener('click',exportDesignImage);
  $('#openHtmlExport').addEventListener('click',openExport);
  $('#closeExport').addEventListener('click',() => exportDialog.close());
  $('#copyHtml').addEventListener('click', async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(exportCode.value);
      copied = true;
    } catch {
      exportCode.focus();
      exportCode.select();
      try { copied = document.execCommand('copy'); } catch {}
    }
    $('#exportFeedback').textContent = copied ? 'คัดลอก HTML แล้ว' : 'เลือกโค้ดให้แล้ว กด Ctrl+C เพื่อคัดลอก';
  });
  $('#downloadHtml').addEventListener('click',() => {
    const downloadButton = $('#downloadHtml');
    downloadButton.disabled = true;
    try {
      const blob = new Blob([exportCode.value],{type:'text/html;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'reflection-content.html'; link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
      $('#exportFeedback').textContent = 'เริ่มดาวน์โหลด HTML แล้ว';
    } catch {$('#exportFeedback').textContent = 'ดาวน์โหลดไม่สำเร็จ กรุณาลองอีกครั้ง';}
    finally {downloadButton.disabled = false;}
  });
  $('#saveBtn').addEventListener('click',saveDraft);
  $('#undoBtn').addEventListener('click',undo);
  $('#redoBtn').addEventListener('click',redo);
  $('#openBoardSettings').addEventListener('click',() => {
    renderInspector();
    if (!boardSettings.open) boardSettings.showModal();
  });
  $('#closeBoardSettings').addEventListener('click',() => boardSettings.close());
  boardSettings.addEventListener('click',event => {
    if (event.target === boardSettings) boardSettings.close();
  });
  boardTextTools.addEventListener('mousedown',event => {
    if (event.target.closest('[data-text-format],#removeBoardText')) event.preventDefault();
  });
  boardTextTools.addEventListener('click',event => {
    if (event.target.closest('#removeBoardText')) { removeSelectedText(); return; }
    const button = event.target.closest('[data-text-format]');
    if (button) applyBoardTextFormat(button.dataset.textFormat);
  });
  $$('.insert-grid [data-add]').forEach(button => button.addEventListener('click',() => addBlock(button.dataset.add,imageInsertOptions(button.dataset.imageStyle))));
  $$('.insert-grid [data-add]').forEach(button => button.addEventListener('dragstart',event => {
    draggedType = `${button.dataset.add}${button.dataset.imageStyle?`|${button.dataset.imageStyle}`:''}`;
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('text/plain',`insert:${draggedType}`);
  }));
  $$('.insert-grid [data-add]').forEach(button => button.addEventListener('dragend',() => {draggedType=null}));
  $('#zoomIn').addEventListener('click',() => {zoom=Math.min(1.35,zoom+.1);renderArtboard()});
  $('#zoomOut').addEventListener('click',() => {zoom=Math.max(.55,zoom-.1);renderArtboard()});
  $('#fitCanvas').addEventListener('click',fitCanvasToView);

  artboard.addEventListener('click',event => {
    const remove = event.target.closest('[data-canvas-remove]');
    if (remove) {
      removeBoardElement(remove.dataset.canvasRemove);
      return;
    }
    const emptyAction=event.target.closest('[data-empty-add]');
    if(emptyAction) {event.preventDefault();addLegacyBlock(emptyAction.dataset.emptyAdd);return;}
    if (event.target.closest('.button-block a')) event.preventDefault();
    if (event.target.closest('[contenteditable="true"],audio,video')) return;
    const sourceFrame=event.target.closest('.source-image-frame[data-source-frame]');
    const sourceImage=sourceFrame?.querySelector('[data-source-image]');
    if(sourceImage) {
      if (event.target.closest('[data-resize-handle]')) return;
      sourceTextSelection = null;
      $('[data-source-text-selected]',artboard)?.removeAttribute('data-source-text-selected');
      const openPicker = Boolean(event.target.closest('[data-source-pick]'));
      const sourceBlock=sourceImage.closest('[data-id]');
      sourceImageSelection={elementId:sourceBlock?.dataset.id,index:Number(sourceImage.dataset.sourceImage)};
      if (sourceBlock?.dataset.id) {
        const alreadySelected = selectedId === sourceBlock.dataset.id;
        selectElement(sourceBlock.dataset.id);
        if (alreadySelected && !openPicker) renderArtboard();
      }
      if (openPicker) {
        imageFile.value = '';
        imageFile.click();
      }
      return;
    }
    const imageUploadButton = event.target.closest('[data-image-upload]');
    if (imageUploadButton) {
      event.preventDefault();
      const imageBlock = imageUploadButton.closest('[data-id]');
      if (imageBlock) selectElement(imageBlock.dataset.id);
      imageFile.value = '';
      imageFile.click();
      return;
    }
    const block = event.target.closest('[data-id]');
    if (block) selectElement(block.dataset.id);
  });
  artboard.addEventListener('dblclick',event => {
    const sourceFrame=event.target.closest('.source-image-frame[data-source-frame]');
    const sourceImage=sourceFrame?.querySelector('[data-source-image]');
    if(sourceImage) sourceImageSelection={elementId:sourceImage.closest('[data-id]')?.dataset.id,index:Number(sourceImage.dataset.sourceImage)};
    if (!sourceImage && !event.target.closest('.image-placeholder img')) return;
    const block = event.target.closest('[data-id]');
    if (block) selectElement(block.dataset.id);
    imageFile.value = '';
    imageFile.click();
  });
  artboard.addEventListener('pointerdown',startImageResize);
  artboard.addEventListener('mousedown',startImageResize);
  artboard.addEventListener('keydown',event => {
    if (event.key === 'Enter' && !event.isComposing && event.target.closest('[contenteditable="true"]')) {
      event.preventDefault();
      document.execCommand('insertLineBreak');
      return;
    }
    if (event.target.closest('[data-image-upload]') && ['Enter',' '].includes(event.key)) {
      event.preventDefault();
      const imageBlock=event.target.closest('[data-id]');
      if(imageBlock)selectElement(imageBlock.dataset.id);
      imageFile.value='';
      imageFile.click();
      return;
    }
    const handle = event.target.closest('[data-resize-handle]');
    if (!handle || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const element = elements.find(item=>item.id===handle.closest('[data-id]')?.dataset.id);
    if (!element) return;
    const before = clone(elements);
    const step = event.shiftKey ? 5 : 1;
    element.width = Math.max(10,Math.min(imageMaxPercent(element),Number(element.width||100) + (['ArrowRight','ArrowDown'].includes(event.key)?step:-step)));
    undoStack.push(before); redoStack=[]; renderAll(); scheduleSave();
  });
  artboard.addEventListener('input',onInlineEdit);
  artboard.addEventListener('paste',event => {
    if (!event.target.closest('[contenteditable="true"]')) return;
    event.preventDefault();
    document.execCommand('insertText',false,event.clipboardData.getData('text/plain'));
  });
  artboard.addEventListener('focusin',event => {
    const editable = event.target.closest('[contenteditable="true"]');
    const block = editable?.closest('.canvas-block[data-id]');
    if (!block) return;
    const sourceText = editable.matches('[data-source-edit]') ? editable : null;
    const selectionChanged = selectedId !== block.dataset.id;
    selectedId = block.dataset.id;
    activeTextField = sourceText
      ? {elementId:selectedId,sourceIndex:sourceText.dataset.sourceEdit}
      : {elementId:selectedId,key:boardTextKey(editable)};
    updateBoardTextTools();
    if (sourceText) {
      sourceTextSelection = {elementId:selectedId,index:Number(sourceText.dataset.sourceEdit)};
      sourceImageSelection = null;
      $$('.source-image-selected',block).forEach(frame => {
        frame.classList.remove('source-image-selected');
        $$('.resize-handle',frame).forEach(handle => handle.remove());
      });
      $('[data-source-text-selected]',artboard)?.removeAttribute('data-source-text-selected');
      sourceText.setAttribute('data-source-text-selected','');
    }
    if (selectionChanged || sourceText) {
      $$('.canvas-block.selected',artboard).forEach(node => node.classList.remove('selected'));
      block.classList.add('selected');
      renderLayers();
      renderInspector();
    }
    editBaseline = clone(elements);
  });
  artboard.addEventListener('focusout',event => {
    if (!event.target.closest('[contenteditable="true"]') || !editBaseline) return;
    if (JSON.stringify(editBaseline) !== JSON.stringify(elements)) { undoStack.push(editBaseline); redoStack=[]; }
    editBaseline = null;
    renderLayers();
    $('#undoBtn').disabled = !undoStack.length;
    $('#redoBtn').disabled = !redoStack.length;
  });
  artboard.addEventListener('dragstart',event => {
    if (event.target.closest('[data-resize-handle],[data-canvas-remove],[contenteditable="true"]')) {event.preventDefault();return}
    const block = event.target.closest('[data-id]');
    if (!block) return;
    draggedId = block.dataset.id;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain',draggedId);
    block.classList.add('dragging');
  });
  document.addEventListener('dragend',() => {
    clearBlockDropHint();
    clearSourceDropHint();
    draggedId = null;
    draggedType = null;
  });
  artboard.addEventListener('dragend',event => event.target.closest('[data-id]')?.classList.remove('dragging'));
  artboard.addEventListener('dragover',event => {
    if (event.dataTransfer?.types?.includes('Files')) {
      const imageBox = event.target.closest('.image-placeholder,.preview-image-placeholder,.source-image-frame');
      event.preventDefault();
      imageBox?.classList.add('drop-target');
      event.dataTransfer.dropEffect='copy';
      return;
    }
    if (!draggedId && !draggedType) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = draggedType ? 'copy' : 'move';
    clearBlockDropHint();
    clearSourceDropHint();
    const target = event.target.closest('.canvas-block[data-id]');
    const photo = photoDrop(event,draggedType,draggedId);
    if (photo && target) {
      blockDropTarget = target;
      target.dataset.blockDrop = photo.full ? 'full' : photo.after ? 'photo-after' : 'photo-before';
      return;
    }
    if (sourceTextTools[draggedType]) {
      clearSourceDropHint();
      const point = sourceDropPoint(event);
      if (point?.anchor) {
        point.anchor.classList.add(point.before?'source-text-drop-before':'source-text-drop-after');
        return;
      }
    }
    if (target && target.dataset.id !== draggedId) {
      blockDropTarget = target;
      target.dataset.blockDrop = isAfterBlock(event,target) ? 'after' : 'before';
    }
  });
  artboard.addEventListener('dragleave',event => {
    const imageBox = event.target.closest('.image-placeholder,.preview-image-placeholder,.source-image-frame');
    if (imageBox && !imageBox.contains(event.relatedTarget)) imageBox.classList.remove('drop-target');
    if (!artboard.contains(event.relatedTarget)) {
      clearSourceDropHint();
      clearBlockDropHint();
    }
  });
  artboard.addEventListener('drop',async event => {
    event.preventDefault();
    clearSourceDropHint();
    clearBlockDropHint();
    artboard.querySelectorAll('.drop-target').forEach(node => node.classList.remove('drop-target'));
    const target = event.target.closest('[data-id]');
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile?.type.startsWith('image/')) {
      const frame = event.target.closest('[data-source-frame]');
      sourceImageSelection = frame && target ? {elementId:target.dataset.id,index:Number(frame.dataset.sourceFrame)} : null;
      if (target) selectElement(target.dataset.id);
      else selectedId = null;
      await applyFile(droppedFile);
      return;
    }
    const source = event.dataTransfer.getData('text/plain') || draggedId;
    const photo = photoDrop(event,source,draggedId);
    if (photo) { joinPhotoRow(photo); return; }
    const targetIndex = elements.findIndex(item => item.id === target?.dataset.id);
    const after = target ? isAfterBlock(event,target) : false;
    const row = photoRowAt(elements,targetIndex);
    const insertAt = targetIndex < 0 ? elements.length : after ? row.end : row.start;
    const templateTool = source?.match(/^template-tool:([A-Za-z0-9]+)$/);
    if (templateTool) {
      insertTemplateTool(templateTool[1],insertAt);
      draggedType = null;
      return;
    }
    const toolKey = source?.replace(/^insert:/,'');
    const textTool = Object.hasOwn(sourceTextTools,toolKey) ? sourceTextTools[toolKey] : null;
    const point = textTool && sourceDropPoint(event);
    if (point) {
      draggedType = null;
      if (point.root) changeSourceText(point.root,point.anchor,'add',textTool,point.before);
      else editCompositeText(point.element,point.anchor,'add',textTool,point.before);
      return;
    }
    const legacyInsertMatch = source?.match(/^legacy:([A-Za-z0-9]+)$/);
    if (legacyInsertMatch) {
      addLegacyBlock(legacyInsertMatch[1],insertAt);
      focusNewText($('.canvas-block.selected [contenteditable="true"]',artboard));
      draggedType=null;
      return;
    }
    const insertMatch = source?.match(/^insert:(heading|text|image|quote|split|divider|banner|button|columns|spacer)(?:\|(normal|highlight|green|greenText))?$/);
    if (insertMatch) {
      insertBlock(insertMatch[1],insertAt,imageInsertOptions(insertMatch[2]));
      focusNewText($('.canvas-block.selected [contenteditable="true"]',artboard));
      draggedType = null;
      return;
    }
    if (!source) return;
    moveElement(source,target?.dataset.id || null,after);
    draggedId = null;
  });

  inspector.addEventListener('pointerdown',event => {
    if (event.target.matches('[data-prop],[data-speaker-prop]') && !inspectorBaseline) inspectorBaseline = clone(elements);
  });
  inspector.addEventListener('input',event => {
    const speakerProp = event.target.dataset.speakerProp;
    if (speakerProp) {
      if (!inspectorBaseline) inspectorBaseline=clone(elements);
      const element=elements.find(item=>item.id===selectedId);
      const speakerIndex=Number(event.target.dataset.speakerIndex);
      if(element && Number.isInteger(speakerIndex)) {
        element.speakers ||= [];
        element.speakers[speakerIndex] ||= {};
        element.speakers[speakerIndex][speakerProp]=event.target.value;
        renderArtboard(); renderLayers(); scheduleSave();
      }
      return;
    }
    const prop = event.target.dataset.prop;
    if (!prop) return;
    if (!inspectorBaseline) inspectorBaseline = clone(elements);
    if (prop === 'templateAudioSrc') {
      const element = elements.find(item => item.id === selectedId && item.type === 'sourcePage');
      if (!element) return;
      const value = event.target.value.trim();
      const src = value ? safeHref(value) : '';
      element.markup = element.markup.replace(/<audio\b[^>]*>/i,tag => {
        const clean = tag.replace(/\s+src=(?:"[^"]*"|'[^']*')/i,'');
        return clean.slice(0,-1) + (src ? ` src="${escapeHtml(src)}"` : '') + '>';
      });
      renderArtboard();
      scheduleSave();
      return;
    }
    if(prop==='sourceImageWidth') {
      const imageElement=elements.find(item=>item.id===selectedId);
      const index=sourceImageSelection?.elementId===selectedId?sourceImageSelection.index:-1;
      if(imageElement?.type==='sourcePage'&&index>=0) {
        imageElement.imageWidths ||= {};
        imageElement.imageWidths[index]=Number(event.target.value);
        const label=$('[data-source-width-value]',inspector);if(label)label.textContent=`${Math.round(Number(event.target.value))}%`;
        renderArtboard();scheduleSave();
      }
      return;
    }
    const numericProps = ['width','fontSize','padding','radius','height'];
    const value = numericProps.includes(prop) ? Number(event.target.value) : event.target.value;
    if (prop === 'imageStyle') {
      const imageElement = elements.find(item => item.id === selectedId);
      if (imageElement?.type === 'image') {
        const oldStyle = imageElement.imageStyle || 'normal';
        const oldWidth = oldStyle === 'normal' ? 82 : 100;
        const oldRadius = oldStyle === 'normal' ? 6 : 0;
        if (Math.round(Number(imageElement.width)||100) === oldWidth) imageElement.width = value === 'normal' ? 82 : 100;
        if (Number(imageElement.radius||0) === oldRadius) imageElement.radius = value === 'normal' ? 6 : 0;
      }
    }
    setProperty(selectedId,prop,value,false);
    renderArtboard();
    renderLayers();
    if (prop === 'width') {
      const widthValue = $('[data-width-value]',inspector);
      if (widthValue) widthValue.textContent = `${imageWidthPx(elements.find(item=>item.id===selectedId)||{})} px`;
    }
    if (prop === 'fontSize') $('[data-size-value]',inspector)?.replaceChildren(`${value} px`);
    if (prop === 'padding') $('[data-padding-value]',inspector)?.replaceChildren(`${value} px`);
    if (prop === 'height') $('[data-height-value]',inspector)?.replaceChildren(`${value} px`);
  });
  inspector.addEventListener('change',event => {
    if (event.target.matches('[data-speaker-prop]')) { if(!inspectorBaseline)inspectorBaseline=clone(elements); commitInspectorEdit(); return; }
    const prop = event.target.dataset.prop;
    if (!prop) return;
    if (!inspectorBaseline) inspectorBaseline = clone(elements);
    if(prop==='sourceImageWidth') {commitInspectorEdit();return;}
    const numericProps = ['width','fontSize','padding','radius','height'];
    setProperty(selectedId,prop,numericProps.includes(prop)?Number(event.target.value):event.target.value,false);
    commitInspectorEdit();
  });
  inspector.addEventListener('click',event => {
    const textAction = event.target.closest('[data-source-text-action]');
    if (textAction) {
      const root = $(`.source-page-block[data-id="${selectedId}"] [data-source-render]`,artboard);
      if (!root) return;
      const anchor = sourceTextSelection?.elementId === selectedId
        ? $(`[data-source-edit="${sourceTextSelection.index}"]`,root) : null;
      changeSourceText(root,anchor,textAction.dataset.sourceTextAction);
      return;
    }
    if (event.target.closest('[data-pick-image]')) {imageFile.value='';imageFile.click();return}
    const align = event.target.closest('[data-align]');
    if (align) {inspectorBaseline=clone(elements);setProperty(selectedId,'align',align.dataset.align,false);commitInspectorEdit();return}
    const remove = event.target.closest('[data-delete]');
    if (remove) removeBoardElement(remove.dataset.delete);
  });
  imageFile.addEventListener('change',() => applyFile(imageFile.files?.[0]));
  $('#audioFile').addEventListener('change',() => setAudioFile($('#audioFile').files?.[0]));
  $('#audioOutputFormat').addEventListener('change',() => {
    updateAudioOutputUI();
    $('#audioResult').hidden = true;
    if (audioResultUrl) {URL.revokeObjectURL(audioResultUrl);audioResultUrl=null;}
  });
  $('#removeAudio').addEventListener('click',() => {
    audioFileObject = null;
    if (audioFileUrl) URL.revokeObjectURL(audioFileUrl);
    audioFileUrl = null;
    $('#audioFile').value = '';
    $('#audioFileInfo').hidden = true;
    $('#sourceAudioPreview').hidden = true;
    $('#sourceAudio').removeAttribute('src');
    $('#audioResult').hidden = true;
    $('#resultAudio').removeAttribute('src');
    if (audioResultUrl) {URL.revokeObjectURL(audioResultUrl);audioResultUrl=null;}
    $('#convertAudio').disabled = true;
  });
  $('#loadEngine').addEventListener('click',loadAudioEngine);
  $('#convertAudio').addEventListener('click',convertAudioFile);
  updateAudioOutputUI();
  const audioDrop = $('#audioDrop');
  audioDrop.addEventListener('dragover',event => {event.preventDefault();audioDrop.classList.add('drag-over')});
  audioDrop.addEventListener('dragleave',() => audioDrop.classList.remove('drag-over'));
  audioDrop.addEventListener('drop',event => {
    event.preventDefault();
    audioDrop.classList.remove('drag-over');
    setAudioFile(event.dataTransfer.files?.[0]);
  });

  document.addEventListener('keydown',event => {
    if (editorView.hidden || exportDialog.open || boardSettings.open) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.target.closest('[contenteditable="true"]')) {event.preventDefault();event.shiftKey?redo():undo()}
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {event.preventDefault();saveDraft()}
    if ((event.key === 'Delete' || event.key === 'Backspace') && !event.target.closest('[contenteditable],textarea,input,select,button')) {
      if (selectedId) {event.preventDefault();removeBoardElement(selectedId);}
    }
  });

  renderLegacyTools();
  decorateIndependentTools();
  renderGallery();
})();
