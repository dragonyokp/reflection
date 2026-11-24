(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const galleryView = $('#galleryView');
  const editorView = $('#editorView');
  const templateGrid = $('#templateGrid');
  const artboard = $('#artboard');
  const layerList = $('#layerList');
  const inspector = $('#inspector');
  const imageFile = $('#imageFile');
  const exportDialog = $('#exportDialog');
  const exportCode = $('#exportCode');
  const templatePreviewDialog = $('#templatePreviewDialog');
  const DRAFT_KEY = 'reflectionStudioDraftV1';
  const DRAFT_DB_NAME = 'reflectionStudioDrafts';
  const DRAFT_STORE = 'drafts';
  const ARTBOARD_WIDTH = 1000;
  const ARTBOARD_PADDING = 96;
  const CONTENT_WIDTH = ARTBOARD_WIDTH - ARTBOARD_PADDING * 2;
  let activeTemplateCategory = 'ทั้งหมด';

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
  function legacyElementNote(element) { return legacyBlockMap.get(element.legacyType)?.note || ''; }
  function legacyHasImage(element) { return element?.type === 'legacy' && legacyImageTypes.has(element.legacyType); }
  function legacyDefaultWidth(type) {
    return ({highlightImage:100,highlightGreenText:82,highlightGreenEmpty:82,contentQuoteImage:62,contentSplitQuoteRight:100,contentSplitQuoteLeft:100,contentSplitImageLeft:100,contentSplitImageRight:100,contentPortraitQuote:100,contentModal:72}[type] || 100);
  }

  function renderLegacyTools() {
    const root = $('#legacyToolGroups');
    if (!root || !legacyPatterns) return;
    const glyphs = {
      subtitle:'Tt', audio:'▶', subtitleAudio:'Tt♫', highlightImage:'▱', highlightGreenText:'▰', highlightGreenEmpty:'▰',
      contentQuoteImage:'▧', contentHeading:'H', contentText:'¶', contentBlockquote:'“', contentSplitQuoteRight:'↗', contentSplitQuoteLeft:'↙',
      contentSplitImageLeft:'▧↔', contentSplitImageRight:'↔▧', contentMedia:'✳', contentQuoteCard:'❝', contentPortraitQuote:'◉', contentModal:'↗', contentSpeakers:'≋'
    };
    const freeTools = [['heading','หัวข้อ','Tt'],['text','ข้อความ','¶'],['quote','คำพูด','“'],['banner','แถบเน้น','▰'],['image','รูปภาพ','▧'],['split','รูป + เนื้อหา','▤'],['divider','เส้นคั่น','—'],['button','ปุ่มลิงก์','↗'],['columns','สองคอลัมน์','▥'],['spacer','ช่องว่าง','↕']];
    root.innerHTML = legacyPatterns.groups.map(group => `<section class="tool-category legacy-tool-category" aria-labelledby="legacyGroup-${group.id}"><h3 class="tool-category-title" id="legacyGroup-${group.id}">${escapeHtml(group.title)}</h3><p class="legacy-tool-help">${escapeHtml(group.help)}</p><div class="insert-grid">${legacyBlocks.filter(block=>block.group===group.id).map(block=>`<button class="legacy-tool-card" data-legacy-add="${escapeHtml(block.id)}" title="${escapeHtml(block.note)}" draggable="true" type="button" aria-label="เพิ่ม ${escapeHtml(block.name)}"><span class="insert-glyph legacy-tool-glyph legacy-glyph-${group.id}">${escapeHtml(glyphs[block.id] || '▤')}</span><b>${escapeHtml(block.name)}</b></button>`).join('')}</div></section>`).join('') + `<section class="tool-category legacy-tool-category legacy-free-tools" aria-labelledby="legacyGroup-free"><h3 class="tool-category-title" id="legacyGroup-free">4. เครื่องมืออิสระ</h3><p class="legacy-tool-help">เพิ่มองค์ประกอบแล้วจัดวางต่อได้ตามต้องการ</p><div class="insert-grid">${freeTools.map(([type,name,glyph])=>`<button class="legacy-tool-card" data-tool-add="${type}" draggable="true" type="button" aria-label="เพิ่ม ${name}"><span class="insert-glyph legacy-tool-glyph">${glyph}</span><b>${name}</b></button>`).join('')}</div></section>`;
    root.querySelectorAll('[data-legacy-add]').forEach(button => {
      button.addEventListener('click',() => addLegacyBlock(button.dataset.legacyAdd));
      button.addEventListener('dragstart',event => {
        draggedType = `legacy:${button.dataset.legacyAdd}`;
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.setData('text/plain',draggedType);
      });
      button.addEventListener('dragend',() => {draggedType=null});
    });
    root.querySelectorAll('[data-tool-add]').forEach(button => {
      button.addEventListener('click',() => addBlock(button.dataset.toolAdd));
      button.addEventListener('dragstart',event => {draggedType=button.dataset.toolAdd;event.dataTransfer.effectAllowed='copy';event.dataTransfer.setData('text/plain',draggedType)});
      button.addEventListener('dragend',() => {draggedType=null});
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
  const imageWidthPx = element => Math.max(1,Math.round(imageWidthBase(element) * Math.max(10,Math.min(imageMaxPercent(element),Number(element.width)||100)) / 100));
  const imageAspectRatio = element => Number.isFinite(Number(element.aspectRatio)) && Number(element.aspectRatio)>0.02 && Number(element.aspectRatio)<20 ? Number(element.aspectRatio) : 9/16;
  const textStyle = element => `font-size:${Math.max(18,Math.min(72,Number(element.fontSize)||18))}px;color:${safeColor(element.color)};text-align:${['left','center','right'].includes(element.align)?element.align:'left'}`;
  function cleanSourceMarkup(markup, keepTemplateHints = false) {
    let clean=String(markup||'').replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'').replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,'').replace(/\s+contenteditable=("[^"]*"|'[^']*')/gi,'').replace(/\s+data-source-edit=("[^"]*"|'[^']*')/gi,'').replace(/\s+data-source-image=("[^"]*"|'[^']*')/gi,'').replace(/\s+data-source-frame=("[^"]*"|'[^']*')/gi,'').replace(/\s+draggable=("[^"]*"|'[^']*')/gi,'');
    if(!keepTemplateHints) clean=clean.replace(/\s+data-template-placeholder=("[^"]*"|'[^']*'|[^\s>]+)/gi,'');
    return clean;
  }
  function sourcePreviewMarkup(markup, visualTemplate = false) {
    let imageIndex=0;
    const clean=cleanSourceMarkup(markup,true).replace(/<img\b[^>]*>/gi,tag=>{
      const index=imageIndex++;
      const width=Number(elements.find(item=>item.id===selectedId)?.imageWidths?.[index]);
      const marked=tag.replace(/\s*\/?\s*>$/,' data-source-image="'+index+'">');
      const shape=(tag.match(/data-template-placeholder="([^"]+)"/i)||[])[1]||'wide';
      const nativeWidth=Number((tag.match(/\bwidth="(\d+)"/i)||[])[1]||0);
      const fullWidth=/\bw-100\b/.test(tag);
      const frameWidth=width?`width:${Math.max(10,Math.min(120,width))}%`:nativeWidth&&!fullWidth?`width:${nativeWidth}px;max-width:100%`:'';
      return `<span class="source-image-frame${visualTemplate?' source-template-green-frame shape-'+escapeHtml(shape):''}${index===Number(sourceImageSelection?.index)&&sourceImageSelection?.elementId===selectedId?' source-image-selected':''}" data-source-frame="${index}" style="${frameWidth}">${visualTemplate?'<span class="source-template-green-label" aria-hidden="true">IMAGE</span>':''}${marked}${index===Number(sourceImageSelection?.index)&&sourceImageSelection?.elementId===selectedId?renderResizeHandles({id:selectedId}):''}</span>`;
    });
    const editable=clean.replace(/<(h[1-6]|p|blockquote|li|figcaption)(\b[^>]*)>/gi,'<$1$2 contenteditable="true" data-source-edit="true" spellcheck="false">').replace(/(src|poster)="\/(storage\/[^\"]+)"/gi,'$1="https://www.bangchak.co.th/$2"');
    return (visualTemplate?templatePageHeading(): '')+editable;
  }
  function templatePageHeading(){return '<header class="source-template-article-heading" data-template-preview-only="true"><span>BCP REFLECTION · Lorem ipsum</span><h1>Lorem ipsum dolor sit amet</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></header>';}
  function sourceHtmlFromPreview(root) {
    const copy=root.cloneNode(true);
    const current=elements.find(item=>item.id===root.closest('[data-id]')?.dataset.id);
    copy.querySelectorAll('[data-template-preview-only]').forEach(node=>node.remove());
    copy.querySelectorAll('.source-image-frame').forEach((frame,index)=>{
      const image=frame.querySelector('img');
      if(image) {
        const imageIndex=Number(frame.dataset.sourceFrame);
        const percent=Number(current?.imageWidths?.[imageIndex]);
        if(percent) {
          const widthPx=Math.max(1000,Math.round(ARTBOARD_WIDTH*Math.max(10,Math.min(120,percent))/100));
          image.setAttribute('width',String(widthPx));
          image.className=String(image.className||'').split(/\s+/).filter(name=>name&&name!=='w-100').join(' ');
        }
        frame.replaceWith(image);
      } else frame.remove();
    });
    return cleanSourceMarkup(copy.innerHTML,Boolean(current?.visualTemplate)).replace(/https:\/\/www\.bangchak\.co\.th\//gi,'/');
  }
  function sourceThumbMarkup(markup) {
    return cleanSourceMarkup(markup,true)
      .replace(/<audio\b[^>]*>[\s\S]*?<\/audio\s*>/gi,'<div class="source-thumb-audio"><b>▶</b><span>00:00</span><i></i></div>')
      .replace(/<audio\b[^>]*\/?\s*>/gi,'<div class="source-thumb-audio"><b>▶</b><span>00:00</span><i></i></div>')
      .replace(/<img\b([^>]*)>/gi,(_,attrs)=>{
        const width=Number((attrs.match(/\bwidth="(\d+)"/i)||[])[1]||0);
        const fullWidth=/\bw-100\b/.test(attrs);
        const sizing=width&&!fullWidth?` style="width:${width}px;max-width:100%"`:'';
        return `<div class="source-thumb-image shape-${escapeHtml((attrs.match(/data-template-placeholder="([^"]+)"/i)||[])[1]||'wide')} ${escapeHtml((attrs.match(/class="([^"]+)"/i)||[])[1]||'')}"${sizing}></div>`;
      });
  }
  function renderResizeHandles(element) {
    if (element.id !== selectedId) return '';
    return `<span class="resize-handle handle-nw" data-resize-handle="nw" role="button" tabindex="0" aria-label="ปรับขนาดรูปภาพ"></span><span class="resize-handle handle-n" data-resize-handle="n" aria-hidden="true"></span><span class="resize-handle handle-ne" data-resize-handle="ne" aria-hidden="true"></span><span class="resize-handle handle-e" data-resize-handle="e" aria-hidden="true"></span><span class="resize-handle handle-se" data-resize-handle="se" role="button" tabindex="0" aria-label="ปรับขนาดรูปภาพ"></span><span class="resize-handle handle-s" data-resize-handle="s" aria-hidden="true"></span><span class="resize-handle handle-sw" data-resize-handle="sw" aria-hidden="true"></span><span class="resize-handle handle-w" data-resize-handle="w" aria-hidden="true"></span>`;
  }

  function renderImagePlaceholder(element) {
    const hasImage = Boolean(element.src);
    const image = hasImage ? `<img src="${escapeHtml(element.src)}" alt="${escapeHtml(element.alt)}" style="object-fit:${element.fit==='contain'?'contain':'cover'};border-radius:${Math.max(0,Math.min(48,Number(element.radius)||0))}px">` : '';
    const uploadButton = `<button class="image-upload-trigger" type="button" data-image-upload aria-label="เลือกภาพ ${escapeHtml(element.alt || '')}"><span>▧</span><b>เพิ่มรูปภาพ</b><small>คลิกเพื่อเลือกไฟล์</small></button>`;
    const replaceButton = hasImage ? `<button class="image-replace-trigger" type="button" data-image-upload>เปลี่ยนรูป</button>` : '';
    return `${image || uploadButton}${replaceButton}${renderResizeHandles(element)}`;
  }

  function renderThumb(template) {
    if (template.markup) {
      const preview=sourceThumbMarkup(template.markup);
      return `<div class="template-thumb source-template-thumb${template.visualTemplate?' visual-template-thumb':''}" aria-hidden="true"><div class="source-template-site-header"><b>bangchak</b><span>ABOUT　 BUSINESS　 SUSTAINABILITY　 NEWS</span></div><div class="source-template-preview">${template.visualTemplate?`<div class="source-template-page">${templatePageHeading()}${preview}</div>`:preview}</div><div class="source-template-site-footer">CAN WE HELP?　 CONTACT · QUICK LINKS · CAREER</div></div>`;
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
    $$('.visual-template-thumb .source-template-preview').forEach(view=>{
      const page=$('.source-template-page',view);
      if(!page)return;
      page.style.transform='none';
      page.style.width='1000px';
      const pageHeight=Math.max(page.scrollHeight,1);
      const scale=Math.min((view.clientWidth-24)/1000,(view.clientHeight-12)/pageHeight);
      page.style.transform=`scale(${scale})`;
    });
  }
  function renderGallery() {
    refreshResumeButton();
    const query = $('#templateSearch').value.trim().toLocaleLowerCase('th');
    const filterRoot=$('#templateFilters');
    const categories=['ทั้งหมด',...new Set(templates.map(template=>template.category).filter(Boolean))];
    const categoryLabels={ทั้งหมด:'ทั้งหมด',Article:'บทความ',Feature:'บทความพิเศษ',Interview:'สัมภาษณ์',Quote:'คำพูด','Photo story':'เรื่องเล่าภาพ',Audio:'เสียง',Energy:'พลังงาน',Community:'สังคม'};
    if(filterRoot) filterRoot.innerHTML=categories.map(category=>`<button class="filter-chip${activeTemplateCategory===category?' active':''}" data-template-category="${escapeHtml(category)}" type="button">${escapeHtml(categoryLabels[category]||category)}</button>`).join('');
    const filtered = templates.filter(template => (activeTemplateCategory==='ทั้งหมด'||template.category===activeTemplateCategory) && (!query || `${template.title} ${template.description} ${template.category || ''} ${template.referenceTitle || ''}`.toLocaleLowerCase('th').includes(query)));
    $('#templateCount').textContent = String(filtered.length).padStart(2,'0');
    templateGrid.innerHTML = filtered.length ? filtered.map(template => `<article class="template-card" data-template="${escapeHtml(template.id)}"><button class="template-card-preview" type="button" data-preview-template="${escapeHtml(template.id)}" aria-label="ดูตัวอย่าง ${escapeHtml(template.title)}">${renderThumb(template)}<span class="preview-hover-label">ดูหน้าเต็ม <b>↗</b></span></button><div class="template-card-info"><span class="template-category">${escapeHtml(categoryLabels[template.category]||template.category||'Reflection')}</span><h3>${escapeHtml(template.title.replace(/^\d+\s*·\s*/,''))}</h3><p class="template-patterns">${escapeHtml(template.description||`${template.imageCount||0} รูป · ${template.audioCount||0} ไฟล์เสียง`)}</p><span class="template-source-caption">อ้างอิง: ${escapeHtml(template.referenceTitle||'รูปแบบ Reflection')}</span><button class="card-use" type="button" data-preview-template="${escapeHtml(template.id)}">ดูตัวอย่างและเลือกใช้ <b>→</b></button></div></article>`).join('') : '<div class="no-results">ไม่พบเทมเพลตที่ตรงกับคำค้น</div>';
    fitFullTemplatePreviews();
  }

  function openTemplatePreview(template) {
    if (!template || !templatePreviewDialog) return;
    $('#templatePreviewTitle').textContent = template.title;
    $('#templatePreviewDescription').textContent = template.description || '';
    const reference = $('#templateReferenceLink');
    reference.textContent = template.referenceTitle || 'เปิดหน้าอ้างอิง';
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
    const scale=Math.min((view.clientWidth-32)/1000,1);
    page.style.width='1000px';
    page.style.transform=`scale(${scale})`;
    view.style.height=`${Math.ceil(page.scrollHeight*scale)+12}px`;
  }

  function useTemplate(template) {
    if(!template)return;
    if(templatePreviewDialog?.open)templatePreviewDialog.close();
    enterEditor(template.title,template.markup?[{type:'sourcePage',title:template.title,markup:template.markup,sourceId:template.id,imageCount:template.imageCount,imageWidths:{},visualTemplate:Boolean(template.visualTemplate)}]:template.blocks);
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
    setActiveMode('create');
    renderAll();
    fitCanvasToView();
    window.scrollTo(0,0);
  }

  function renderBlock(element) {
    const selected = element.id === selectedId ? ' selected' : '';
    const draggable = ' draggable="true"';
    const background = safeColor(element.background || '#f5f5f1');
    const padding = Math.max(0,Math.min(96,Number(element.padding)||0));
    if (element.type === 'sourcePage') return `<div class="canvas-block source-page-block${selected}" data-id="${element.id}"${draggable}><div class="source-page-toolbar"><b>หน้าออกแบบต้นแบบ</b><span>ข้อความแก้บนหน้าได้ · คลิกรูปเพื่อเลือกและปรับขนาด</span></div><div class="source-page-render" data-source-render>${sourcePreviewMarkup(element.markup,Boolean(element.visualTemplate))}</div></div>`;
    if (element.type === 'heading') return `<div class="canvas-block heading-block${selected}" data-id="${element.id}" style="background:${background};padding-block:${padding}px"${draggable}><h2 style="${textStyle(element)}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</h2></div>`;
    if (element.type === 'text') return `<div class="canvas-block text-block${selected}" data-id="${element.id}" style="background:${background};padding-block:${padding}px"${draggable}><p style="${textStyle(element)}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</p></div>`;
    if (element.type === 'quote') return `<div class="canvas-block quote-block${selected}" data-id="${element.id}" style="background:${background};padding:${Math.max(14,padding)}px"${draggable}><blockquote style="${textStyle(element)}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</blockquote></div>`;
    if (element.type === 'legacy') return `<div class="canvas-block legacy-pattern-block${selected}" data-id="${element.id}" data-legacy-type="${escapeHtml(element.legacyType)}"${draggable}><div class="legacy-pattern-heading">${escapeHtml(legacyElementName(element))}<span>${escapeHtml(legacyElementNote(element))}</span></div><div class="legacy-pattern-slot"></div></div>`;
    if (element.type === 'image') {
      const style = ['normal','highlight','green','greenText'].includes(element.imageStyle) ? element.imageStyle : 'normal';
      const fullBleed = style === 'green' || style === 'greenText' ? ' highlight-full-bleed' : '';
      const greenBand = style === 'green' ? '<div class="highlight-green-band highlight-green-empty" aria-hidden="true"></div>' : style === 'greenText' ? `<div class="highlight-green-band"><p style="${textStyle({...element,color:'#ffffff'})}" contenteditable="true" data-part="caption" spellcheck="false">${textHtml(element.caption || '')}</p></div>` : '';
      return `<div class="canvas-block image-block image-style-${style}${fullBleed}${selected}" data-id="${element.id}" style="--image-width:${Math.max(10,Math.min(imageMaxPercent(element),Number(element.width)||100))}%;justify-content:${element.align==='right'?'flex-end':element.align==='center'?'center':'flex-start'}"${draggable}><div class="image-placeholder" style="width:var(--image-width);height:auto;min-height:0;aspect-ratio:${1/imageAspectRatio(element)}">${renderImagePlaceholder(element)}</div>${greenBand}</div>`;
    }
    if (element.type === 'split') return `<div class="canvas-block split-block${selected}" data-id="${element.id}" style="background:${background}"${draggable}>${element.imageSide==='right'?`<div class="split-copy"><strong style="${textStyle({...element,fontSize:Math.max(22,Number(element.fontSize)||24)})}" contenteditable="true" data-part="title">${textHtml(element.title)}</strong><span style="${textStyle(element)}" contenteditable="true" data-part="text">${textHtml(element.text)}</span></div>`:''}<div class="image-placeholder split-image" style="width:${Math.max(10,Math.min(100,Number(element.width)||100))}%;aspect-ratio:${1/imageAspectRatio(element)}">${renderImagePlaceholder(element)}</div>${element.imageSide!=='right'?`<div class="split-copy"><strong style="${textStyle({...element,fontSize:Math.max(22,Number(element.fontSize)||24)})}" contenteditable="true" data-part="title">${textHtml(element.title)}</strong><span style="${textStyle(element)}" contenteditable="true" data-part="text">${textHtml(element.text)}</span></div>`:''}</div>`;
    if (element.type === 'banner') return `<section class="canvas-block banner-block${selected}" data-id="${element.id}" style="background:${background};color:${safeColor(element.color||'#ffffff')};text-align:${element.align||'center'};padding:${padding||36}px"${draggable}><h2 style="${textStyle({...element,fontSize:Math.max(22,Number(element.fontSize)||24)})}" contenteditable="true" data-part="title">${textHtml(element.title)}</h2><p style="${textStyle(element)}" contenteditable="true" data-part="text">${textHtml(element.text)}</p></section>`;
    if (element.type === 'button') return `<div class="canvas-block button-block${selected}" data-id="${element.id}" style="text-align:${element.align||'left'}"${draggable}><a href="${escapeHtml(safeHref(element.url))}" style="display:inline-block;padding:${padding||14}px 24px;background:${background};color:${safeColor(element.color||'#ffffff')};font-size:${Math.max(18,Number(element.fontSize)||18)}px;border-radius:6px;text-decoration:none" contenteditable="true" data-part="text">${textHtml(element.text)}</a></div>`;
    if (element.type === 'columns') return `<div class="canvas-block columns-block${selected}" data-id="${element.id}" style="background:${background};padding:${padding||24}px;--column-text-size:${Math.max(18,Number(element.fontSize)||18)}px;color:${safeColor(element.color)}"${draggable}><div><h3 contenteditable="true" data-part="leftTitle">${textHtml(element.leftTitle)}</h3><p contenteditable="true" data-part="leftText">${textHtml(element.leftText)}</p></div><div><h3 contenteditable="true" data-part="rightTitle">${textHtml(element.rightTitle)}</h3><p contenteditable="true" data-part="rightText">${textHtml(element.rightText)}</p></div></div>`;
    if (element.type === 'spacer') return `<div class="canvas-block spacer-block${selected}" data-id="${element.id}" style="height:${Math.max(18,Math.min(320,Number(element.height)||48))}px"${draggable}><span>ช่องว่าง · ${Math.max(18,Number(element.height)||48)} px</span></div>`;
    return `<div class="canvas-block divider-block${selected}" data-id="${element.id}"${draggable}><hr></div>`;
  }

  function renderArtboard() {
    artboard.innerHTML = elements.length ? elements.map(renderBlock).join('') : '<div class="editor-empty"><span>✳</span><b>เริ่มสร้างเรื่องราวของคุณ</b><p>เพิ่มหัวข้อ รูปภาพ แถบเน้น หรือจัดวางสองคอลัมน์</p></div>';
    if (legacyPatterns) {
      for (const element of elements.filter(item=>item.type==='legacy')) {
        const slot = artboard.querySelector(`.legacy-pattern-slot[data-for="${element.id}"]`) || [...artboard.querySelectorAll('.legacy-pattern-slot')].find(node=>node.closest('[data-id]')?.dataset.id===element.id);
        if (!slot) continue;
        const preview = legacyPatterns.makePreview(element.legacyType,element);
        preview.classList.add('legacy-pattern-preview');
        const previewHeading = preview.querySelector('.preview-narrow h3,.preview-narrow h4');
        if (previewHeading && element.text && ['subtitle','subtitleAudio','contentHeading'].includes(element.legacyType)) previewHeading.textContent = element.text;
        if (element.legacyType==='contentText' && element.text) {const p=preview.querySelector('.preview-lorem');if(p)p.textContent=element.text;}
        if (element.legacyType==='contentBlockquote' && element.text) {const quote=preview.querySelector('blockquote');if(quote)quote.textContent=element.text;}
        if (element.legacyType==='highlightGreenText' && element.caption) {const copy=preview.querySelector('.green-highlight-preview-copy .preview-lorem');if(copy)copy.textContent=element.caption;}
        if (['contentSplitQuoteLeft','contentSplitQuoteRight','contentSplitImageLeft','contentSplitImageRight'].includes(element.legacyType)) {
          const copy=preview.querySelector('.split-quote-preview-copy');
          const heading=copy?.querySelector('h4'); if(heading)heading.textContent=element.title||'';
          const paragraphs=copy?.querySelectorAll('.preview-lorem'); if(paragraphs?.[0])paragraphs[0].textContent=element.text||''; if(paragraphs?.[1])paragraphs[1].textContent=element.text2||'';
          const captions=preview.querySelectorAll('.split-quote-preview-caption span');
          String(element.caption||'').split(/\r?\n/).filter(Boolean).forEach((caption,index)=>{if(captions[index])captions[index].textContent=caption});
        }
        const placeholders = [...preview.querySelectorAll('.preview-image-placeholder')];
        placeholders.forEach((placeholder,index)=>{
          placeholder.setAttribute('data-image-upload','');
          placeholder.setAttribute('role','button');
          placeholder.setAttribute('tabindex','0');
          placeholder.setAttribute('aria-label',`เพิ่มหรือเปลี่ยนรูปสำหรับ ${legacyElementName(element)}`);
          if (index===0) {
            placeholder.style.width = `${Math.max(10,Math.min(100,Number(element.width)||legacyDefaultWidth(element.legacyType)))}%`;
            placeholder.style.maxWidth = '100%';
            if (element.aspectRatio) {
              placeholder.style.aspectRatio = String(element.aspectRatio);
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
            const hint = document.createElement('small');
            hint.className = 'legacy-image-hint';
            hint.textContent = 'คลิกเพื่อเพิ่มรูป';
            placeholder.append(hint);
          }
          if (index===0) placeholder.insertAdjacentHTML('beforeend',renderResizeHandles(element));
        });
        slot.append(preview);
      }
    }
    artboard.style.width = `${ARTBOARD_WIDTH}px`;
    artboard.style.minHeight = '1400px';
    artboard.style.transform = `scale(${zoom})`;
    $('#zoomLabel').textContent = `${Math.round(zoom*100)}%`;
    const viewport=$('#canvasViewport');
    const viewportStyle=getComputedStyle(viewport);
    const available=viewport.clientWidth-parseFloat(viewportStyle.paddingLeft||0)-parseFloat(viewportStyle.paddingRight||0);
    viewport.classList.toggle('canvas-fit',ARTBOARD_WIDTH*zoom<=available+1);
  }

  function renderLayers() {
    $('#layerCount').textContent = elements.length;
    layerList.innerHTML = elements.map((element,index) => `<div class="layer-row${element.id===selectedId?' selected':''}" draggable="true" data-layer-id="${element.id}"><span class="layer-icon">${iconFor(element.type)}</span><span class="layer-name">${escapeHtml(element.text?.split('\n')[0] || element.title || (element.type==='sourcePage'?'หน้าเต็ม · '+(element.sourceId||'ต้นแบบ').replace(/^old-/,''):element.type==='legacy'?legacyElementName(element):element.type==='image'?imageStyleName(element.imageStyle):titleFor(element.type)))}</span><span class="layer-grip">⠿</span></div>`).join('');
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
      fields += `<div class="inspector-group"><h3>หน้าเต็มจาก Template</h3><p class="field-hint">คลิกข้อความเพื่อแก้บนหน้า และคลิกรูปเพื่อเปลี่ยนหรือปรับขนาด โครงสร้างส่งออกเป็น HTML สำหรับ CMS</p><details class="source-code-details"><summary>ดูหรือแก้ HTML ต้นฉบับ</summary><textarea class="source-html-input" data-prop="markup" spellcheck="false">${escapeHtml(element.markup||'')}</textarea></details></div>`;
      if (sourceImageSelection?.elementId===element.id) {
        const index=sourceImageSelection.index;
        fields += `<div class="inspector-group"><h3>รูปที่เลือก · ${index+1}</h3>${field('เปลี่ยนไฟล์รูปภาพ',`<button type="button" class="file-pick" data-pick-image="true">เลือกรูปจากเครื่อง <span>↗</span></button>`)}${field('ความกว้างในหน้า',`<div class="range-line"><span>ลากจุดมุมภาพ หรือปรับสัดส่วน</span><b data-source-width-value>${Math.round(Number(element.imageWidths?.[index])||100)}%</b></div><input type="range" min="10" max="120" step="1" data-prop="sourceImageWidth" value="${Math.max(10,Math.min(120,Number(element.imageWidths?.[index])||100))}">`)}</div>`;
      }
    } else if (element.type === 'legacy') {
      const legacyType = element.legacyType;
      const textTypes = ['subtitle','subtitleAudio','contentHeading','contentText','contentBlockquote'];
      fields += `<div class="inspector-group"><h3>โครงสร้างเดิม · โค้ด Reflection</h3><p class="field-hint">${escapeHtml(legacyElementNote(element))} โค้ดต้นฉบับของรูปแบบนี้จะรวมในหน้าส่งออก HTML</p></div>`;
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
    selectedId = selected;
    renderAll();
    scheduleSave();
  }

  function insertBlock(type,index,overrides = {}) {
    const next = clone(elements);
    const item = makeElement(type,overrides);
    const selectedIndex = next.findIndex(element => element.id === selectedId);
    const insertAt = Number.isInteger(index) ? Math.max(0,Math.min(index,next.length)) : selectedIndex >= 0 ? selectedIndex+1 : next.length;
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
    const next = clone(elements);
    const item = makeElement('legacy',defaults);
    const selectedIndex = next.findIndex(element=>element.id===selectedId);
    const insertAt = Number.isInteger(index)?Math.max(0,Math.min(index,next.length)):selectedIndex>=0?selectedIndex+1:next.length;
    next.splice(insertAt,0,item);
    setElements(next,item.id);
  }

  function imageInsertOptions(style) {
    if (!style) return {};
    return {imageStyle:style,width:style==='normal'?82:100,radius:style==='normal'?6:0};
  }

  function addBlock(type,overrides = {}) { insertBlock(type,undefined,overrides); }

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
    const widthPercent = Math.max(10,Math.min(imageMaxPercent(element),element.type==='sourcePage'?Number(element.imageWidths?.[sourceIndex])||100:Number(element.width)||(element.type==='legacy'?legacyDefaultWidth(element.legacyType):100)));
    const width = rect.width / zoom;
    const height = Math.max(1,rect.height / zoom);
    resizeState = {id:element.id,handle:handle.dataset.resizeHandle,sourceIndex,startX:event.clientX,startY:event.clientY,startWidth:widthPercent,baseWidth:width/(widthPercent/100),aspect:width/height,before:clone(elements),block};
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
    const delta = hasX && hasY ? (Math.abs(dx)>=Math.abs(dy)?dx:dy) : hasX ? dx : dy;
    const width = Math.max(10,Math.min(imageMaxPercent(el),resizeState.startWidth + delta / resizeState.baseWidth * 100));
    if(el.type==='sourcePage') {el.imageWidths ||= {};el.imageWidths[resizeState.sourceIndex]=width;}
    else el.width = width;
    const block = artboard.querySelector(`[data-id="${el.id}"]`);
    const imageBox = el.type==='sourcePage'?block?.querySelector(`.source-image-frame[data-source-frame="${resizeState.sourceIndex}"]`):block?.querySelector('.image-placeholder, .preview-image-placeholder[data-image-upload]');
    if (el.type === 'image') {
      block?.style.setProperty('--image-width',`${width}%`);
      if (imageBox) imageBox.style.width = `${width}%`;
    } else if (imageBox) imageBox.style.width = `${width}%`;
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
      if (layer) layer.textContent='หน้าเต็ม · '+(element.title||'HTML Reflection');
      $('#saveStatus').textContent='มีการแก้ไข';
      scheduleSave();
      return;
    }
    const part = target.dataset.part || 'text';
    element[part] = target.innerText.replace(/\u00a0/g,' ').trimEnd();
    const layer = $(`.layer-row[data-layer-id="${element.id}"] .layer-name`);
    if (layer) layer.textContent = element.text?.split('\n')[0] || element.title || titleFor(element.type);
    $('#saveStatus').textContent = 'มีการแก้ไข';
    scheduleSave();
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
    const revision = ++draftSaveRevision;
    clearTimeout(saveTimer);
    const payload = {title:$('#documentTitle').textContent,elements:clone(elements),nextId};
    try {
      await persistDraft(payload);
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
    if (element.type === 'banner') return `<div class="bg-green-gradient-vertical mb-md-6 mb-5 pb-md-6 pb-5">\n    <div class="container">\n        <div class="row justify-content-center">\n            <div class="col-md-10 col-xl-8 col-xxl-6">\n                ${element.title ? `<h2 class="news__subtitle mb-4">${heading}</h2>\n                ` : ''}<p class="text-white">${text}</p>\n            </div>\n        </div>\n    </div>\n</div>`;
    if (element.type === 'button') return `<p class="my-5"><a href="${escapeHtml(safeHref(element.url))}" class="btn btn--primary"><span class="btn__text btn__text--sm">${textHtml(element.text)}</span></a></p>`;
    if (element.type === 'columns') return `<div class="container">\n    <div class="row my-5">\n        <div class="col-md-6">\n            <h4>${textHtml(element.leftTitle)}</h4>\n            <p class="mb-0">${textHtml(element.leftText)}</p>\n        </div>\n        <div class="col-md-6">\n            <h4>${textHtml(element.rightTitle)}</h4>\n            <p class="mb-0">${textHtml(element.rightText)}</p>\n        </div>\n    </div>\n</div>`;
    if (element.type === 'spacer') return '<div class="py-5"></div>';
    if (element.type === 'divider') return '<hr class="hr-lg-dark-green my-4">';
    return '';
  }

  function elementToLegacyItem(element) {
    if (element.type === 'legacy') return {...element,type:element.legacyType};
    if (element.type === 'heading') return {type:'subtitle',text:element.text};
    if (element.type === 'text') return {type:'contentText',text:element.text};
    if (element.type === 'quote') return {type:'contentBlockquote',text:element.text};
    if (element.type === 'image') {
      const imageStyle = ['normal','highlight','green','greenText'].includes(element.imageStyle) ? element.imageStyle : 'normal';
      const type = imageStyle === 'highlight' ? 'highlightImage' : imageStyle === 'green' ? 'highlightGreenEmpty' : imageStyle === 'greenText' ? 'highlightGreenText' : 'contentQuoteImage';
      return {type,src:element.src,alt:element.alt,width:element.width,caption:element.caption};
    }
    if (element.type === 'split') return {type:element.imageSide === 'right' ? 'contentSplitImageRight' : 'contentSplitImageLeft',src:element.src,alt:element.alt,width:element.width,title:element.title,text:element.text,text2:element.text2};
    return null;
  }

  function applyLegacyAssets(html, items) {
    const imageSlots=items.filter(item=>legacyPatterns.imageTypes.includes(item.type));
    const orderedImageSlots=imageSlots.filter(item=>item.type!=='contentModal').concat(imageSlots.filter(item=>item.type==='contentModal'));
    let imageIndex=0;
    html=html.replace(/<img\b[^>]*>/g,tag=>{
      const source=tag.match(/\bsrc="([^"]+)"/)?.[1]||'';
      if (!/highlight\.webp|quote-\d+\.webp|^data:image\//.test(source)) return tag;
      const image=orderedImageSlots[imageIndex++];
      if (!image) return tag;
      const imageSource=image.src?escapeHtml(image.src):source;
      const imageAlt=escapeHtml(image.alt||legacyElementName({legacyType:image.type}));
      const imageWidth=Math.max(10,Math.min(120,Number(image.width)||legacyDefaultWidth(image.type)));
      const widthPx=Math.round(ARTBOARD_WIDTH*imageWidth/100);
      let updatedTag=tag.replace(/\bsrc="[^"]+"/,`src="${imageSource}"`).replace(/\sstyle="[^"]*"/,'');
      updatedTag=updatedTag.replace(/\bw-100\b/g,'img-fluid');
      if (/\balt="[^"]*"/.test(updatedTag)) updatedTag=updatedTag.replace(/\balt="[^"]*"/,`alt="${imageAlt}"`);
      else updatedTag=updatedTag.replace(/\s*\/?\>$/,tail=>` alt="${imageAlt}"${tail}`);
      if (/\bwidth="\d+"/.test(updatedTag)) updatedTag=updatedTag.replace(/\bwidth="\d+"/,`width="${widthPx}"`);
      else updatedTag=updatedTag.replace(/\s*\/?\>$/,tail=>` width="${widthPx}"${tail}`);
      return updatedTag;
    });
    let audioIndex=0;
    const audioSlots=items.filter(item=>item.type==='audio'||item.type==='subtitleAudio');
    return html.replace(/(<audio\b[^>]*\bsrc=")([^"]*)(")/g,(match,prefix,source,suffix)=>{
      const audio=audioSlots[audioIndex++];
      return audio?.audioSrc?`${prefix}${escapeHtml(audio.audioSrc)}${suffix}`:match;
    });
  }

  function buildExport() {
    const contentParts=[];
    let legacyRun=[];
    const flushLegacy=()=>{
      if (!legacyRun.length) return;
      const html=applyLegacyAssets(legacyPatterns.generateHtml(legacyRun),legacyRun);
      if (html) contentParts.push(html);
      legacyRun=[];
    };
    for (const element of elements) {
      if (element.type==='sourcePage') {
        flushLegacy();
        let markup=cleanSourceMarkup(element.markup);
        let imageIndex=0;
        markup=markup.replace(/<img\b[^>]*>/gi,tag=>{
          const index=imageIndex++;
          const percent=Number(element.imageWidths?.[index]);
          const declared=Number((tag.match(/\bwidth=("|')?(\d+)/i)||[])[2]||0);
          const pixels=Math.max(1000,percent?Math.round(ARTBOARD_WIDTH*Math.max(10,Math.min(120,percent))/100):declared);
          let next=tag.replace(/\s+width=("[^"]*"|'[^']*')/i,'');
          next=next.replace(/\s+class=("[^"]*"|'[^']*')/i,(match,value)=>{
            const quote=value[0],classes=value.slice(1,-1).split(/\s+/).filter(name=>name && name!=='w-100');
            if(!classes.includes('img-fluid')) classes.push('img-fluid');
            return ` class=${quote}${classes.join(' ')}${quote}`;
          });
          if(!/\s+class=/i.test(next)) next=next.replace(/<img\b/i,'<img class="img-fluid"');
          return next.replace(/\s*\/?\s*>$/,` width="${pixels}">`);
        });
        if(markup) contentParts.push(markup);
        continue;
      }
      const item=elementToLegacyItem(element);
      if (item) legacyRun.push(item);
      else {
        flushLegacy();
        const markup=elementToLegacyMarkup(element);
        if (markup) contentParts.push(markup);
      }
    }
    flushLegacy();
    return contentParts.join('\n\n');
  }

  async function exportDesignPng() {
    const button = $('#exportPng');
    if (!elements.length) {showToast('เพิ่มองค์ประกอบก่อนส่งออกภาพ');return;}
    button.disabled = true;
    button.textContent = 'กำลังสร้าง PNG…';
    try {
      await optimizeLegacyEmbeddedImages();
      await document.fonts?.ready;
      await Promise.all([...artboard.querySelectorAll('img')].map(img => img.decode?.().catch(() => {})));
      const measurementCanvas = document.createElement('canvas');
      const measure = measurementCanvas.getContext('2d');
      if (!measure) throw new Error('เบราว์เซอร์ไม่รองรับการส่งออก PNG');
      const commands = [];
      const contentX = 96;
      const contentWidth = ARTBOARD_WIDTH - 192;
      let cursorY = 90;
      const segmenter = window.Intl?.Segmenter ? new Intl.Segmenter('th',{granularity:'word'}) : null;
      const textLayout = (value,width,size,weight='400',lineRatio=1.8) => {
        const font = `${weight} ${size}px "IBM Plex Sans Thai",Tahoma,sans-serif`;
        measure.font = font;
        const lines = [];
        for (const paragraph of String(value ?? '').split('\n')) {
          const parts = segmenter ? [...segmenter.segment(paragraph)].map(item => item.segment) : [...paragraph];
          let line = '';
          for (const part of parts) {
            const candidate = line + part;
            if (line && measure.measureText(candidate).width > width) {
              lines.push(line.trimEnd());
              line = part.trimStart();
            } else line = candidate;
            if (measure.measureText(line).width > width) {
              const chars = [...line];
              line = '';
              for (const char of chars) {
                if (line && measure.measureText(line + char).width > width) {
                  lines.push(line);
                  line = char;
                } else line += char;
              }
            }
          }
          lines.push(line);
        }
        const lineHeight = Math.ceil(size * lineRatio);
        return {font,size,lines,lineHeight,height:Math.max(1,lines.length)*lineHeight};
      };
      const addText = (layout,x,y,width,color,align='left') => commands.push({type:'text',layout,x,y,width,color,align});
      const addRect = (x,y,width,height,color,radius=0) => commands.push({type:'rect',x,y,width,height,color,radius});
      const addGradientRect = (x,y,width,height,top,bottom) => commands.push({type:'gradientRect',x,y,width,height,top,bottom});
      const addLine = (x1,y1,x2,y2,color) => commands.push({type:'line',x1,y1,x2,y2,color});
      const addImage = (element,x,y,width,height) => {
        const block = [...artboard.querySelectorAll('[data-id]')].find(node => node.dataset.id === element.id);
        const image = block?.querySelector('img');
        commands.push({type:'image',image,x,y,width,height,fit:element.fit,radius:Math.max(0,Math.min(48,Number(element.radius)||0)),placeholder:!image || !image.complete || !image.naturalWidth});
      };

      for (const element of elements) {
        const background = safeColor(element.background || '#f5f5f1');
        const align = ['left','center','right'].includes(element.align) ? element.align : 'left';
        const padding = Math.max(0,Math.min(96,Number(element.padding)||0));
        if (element.type === 'heading') {
          cursorY += 5;
          const size = Math.max(18,Math.min(72,Number(element.fontSize)||36));
          const layout = textLayout(element.text,contentWidth,size,'600',1.28);
          const boxHeight = layout.height + padding*2;
          addRect(contentX,cursorY,contentWidth,boxHeight,background);
          addText(layout,contentX,cursorY+padding,contentWidth,safeColor(element.color||'#20271e'),align);
          cursorY += boxHeight + 16;
        } else if (element.type === 'text') {
          const size = Math.max(18,Math.min(72,Number(element.fontSize)||18));
          const layout = textLayout(element.text,contentWidth,size,'400',1.8);
          const boxHeight = layout.height + padding*2;
          addRect(contentX,cursorY,contentWidth,boxHeight,background);
          addText(layout,contentX,cursorY+padding,contentWidth,safeColor(element.color||'#41483f'),align);
          cursorY += boxHeight + 16;
        } else if (element.type === 'quote') {
          cursorY += 14;
          const inset = Math.max(14,padding);
          const layout = textLayout(element.text,contentWidth-inset*2-6,Math.max(18,Math.min(72,Number(element.fontSize)||24)),'500',1.65);
          const boxHeight = layout.height + inset*2;
          addRect(contentX,cursorY,contentWidth,boxHeight,background);
          addRect(contentX,cursorY,4,boxHeight,'#84be3d');
          addText(layout,contentX+inset+4,cursorY+inset,contentWidth-inset*2-6,safeColor(element.color||'#384532'),align);
          cursorY += boxHeight + 18;
        } else if (element.type === 'image') {
          cursorY += 20;
          const width = Math.min(contentWidth,imageWidthPx(element));
          const height = Math.max(1,Math.round(width*imageAspectRatio(element)));
          const x = align === 'right' ? contentX+contentWidth-width : align === 'center' ? contentX+(contentWidth-width)/2 : contentX;
          addImage(element,x,cursorY,width,height);
          cursorY += height + 20;
          if (element.imageStyle === 'green' || element.imageStyle === 'greenText') {
            const caption = element.imageStyle === 'greenText' ? textLayout(element.caption||'',contentWidth,Math.max(18,Math.min(72,Number(element.fontSize)||18)),'400',1.8) : null;
            const bandHeight = caption ? Math.max(180,caption.height+92) : 180;
            addGradientRect(0,cursorY-20,ARTBOARD_WIDTH,bandHeight,'#77a84a','#397e22');
            if (caption) addText(caption,contentX,cursorY+24,contentWidth,'#ffffff','left');
            cursorY += bandHeight;
          }
        } else if (element.type === 'split') {
          cursorY += 24;
          const inset = Math.max(18,padding || 24);
          const gap = 15;
          const columnWidth = (contentWidth-inset*2-gap)/2;
          const imageWidth = Math.min(columnWidth,imageWidthPx(element));
          const imageHeight = Math.max(1,Math.round(imageWidth*imageAspectRatio(element)));
          const title = textLayout(element.title,columnWidth,Math.max(22,Number(element.fontSize)||24),'600',1.4);
          const body = textLayout(element.text,columnWidth,Math.max(18,Math.min(72,Number(element.fontSize)||18)),'400',1.8);
          const copyHeight = title.height + 12 + body.height;
          const rowHeight = Math.max(imageHeight,copyHeight);
          addRect(contentX,cursorY,contentWidth,rowHeight+inset*2,background);
          const imageX = contentX+inset+(element.imageSide==='right'?columnWidth+gap:0);
          addImage(element,imageX,cursorY+inset+(rowHeight-imageHeight)/2,imageWidth,imageHeight);
          const copyX = contentX+inset+(element.imageSide==='right'?0:columnWidth+gap);
          const copyY = cursorY+inset+(rowHeight-copyHeight)/2;
          addText(title,copyX,copyY,columnWidth,safeColor(element.color||'#20271e'),'left');
          addText(body,copyX,copyY+title.height+12,columnWidth,safeColor(element.color||'#41483f'),'left');
          cursorY += rowHeight + inset*2 + 24;
        } else if (element.type === 'banner') {
          cursorY += 24;
          const inset = padding || 36;
          const title = textLayout(element.title,contentWidth-inset*2,Math.max(22,Number(element.fontSize)||24),'600',1.4);
          const body = textLayout(element.text,contentWidth-inset*2,Math.max(18,Math.min(72,Number(element.fontSize)||18)),'400',1.8);
          const boxHeight = inset*2 + title.height + 12 + body.height;
          addRect(contentX,cursorY,contentWidth,boxHeight,background,4);
          addText(title,contentX+inset,cursorY+inset,contentWidth-inset*2,safeColor(element.color||'#ffffff'),align);
          addText(body,contentX+inset,cursorY+inset+title.height+12,contentWidth-inset*2,safeColor(element.color||'#ffffff'),align);
          cursorY += boxHeight + 24;
        } else if (element.type === 'button') {
          cursorY += 20;
          const insetY = padding || 14;
          const layout = textLayout(element.text,contentWidth-48,Math.max(18,Number(element.fontSize)||18),'700',1.35);
          measure.font = layout.font;
          const labelWidth = Math.min(contentWidth,Math.max(80,...layout.lines.map(line => measure.measureText(line).width))+48);
          const buttonWidth = Math.max(80,labelWidth);
          const buttonHeight = layout.height + insetY*2;
          const x = align==='right' ? contentX+contentWidth-buttonWidth : align==='center' ? contentX+(contentWidth-buttonWidth)/2 : contentX;
          addRect(x,cursorY,buttonWidth,buttonHeight,background,6);
          addText(layout,x+24,cursorY+insetY,buttonWidth-48,safeColor(element.color||'#ffffff'),'center');
          cursorY += buttonHeight + 20;
        } else if (element.type === 'columns') {
          cursorY += 24;
          const inset = padding || 24;
          const gap = 24;
          const columnWidth = (contentWidth-inset*2-gap)/2;
          const bodySize = Math.max(18,Number(element.fontSize)||18);
          const leftTitle = textLayout(element.leftTitle,columnWidth,22,'600',1.4);
          const rightTitle = textLayout(element.rightTitle,columnWidth,22,'600',1.4);
          const leftBody = textLayout(element.leftText,columnWidth,bodySize,'400',1.8);
          const rightBody = textLayout(element.rightText,columnWidth,bodySize,'400',1.8);
          const leftHeight = leftTitle.height + 10 + leftBody.height;
          const rightHeight = rightTitle.height + 10 + rightBody.height;
          const boxHeight = Math.max(leftHeight,rightHeight)+inset*2;
          addRect(contentX,cursorY,contentWidth,boxHeight,background,4);
          addText(leftTitle,contentX+inset,cursorY+inset,columnWidth,safeColor(element.color||'#20271e'),'left');
          addText(leftBody,contentX+inset,cursorY+inset+leftTitle.height+10,columnWidth,safeColor(element.color||'#41483f'),'left');
          addText(rightTitle,contentX+inset+columnWidth+gap,cursorY+inset,columnWidth,safeColor(element.color||'#20271e'),'left');
          addText(rightBody,contentX+inset+columnWidth+gap,cursorY+inset+rightTitle.height+10,columnWidth,safeColor(element.color||'#41483f'),'left');
          cursorY += boxHeight + 24;
        } else if (element.type === 'spacer') cursorY += Math.max(18,Math.min(320,Number(element.height)||48));
        else if (element.type === 'divider') {
          cursorY += 24;
          addLine(contentX,cursorY,contentX+contentWidth,cursorY,'#cbd1c5');
          cursorY += 25;
        }
      }

      const height = Math.max(1400,Math.ceil(cursorY+90));
      if (height > 16000) throw new Error('งานยาวเกินขนาดภาพที่เบราว์เซอร์สร้างได้');
      const canvas = document.createElement('canvas');
      canvas.width = ARTBOARD_WIDTH;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('เบราว์เซอร์ไม่รองรับการส่งออก PNG');
      context.fillStyle = '#f5f5f1';
      context.fillRect(0,0,canvas.width,canvas.height);
      const roundedPath = (x,y,width,height,radius=0) => {
        const r = Math.min(radius,width/2,height/2);
        context.beginPath();
        context.moveTo(x+r,y);
        context.lineTo(x+width-r,y);
        context.quadraticCurveTo(x+width,y,x+width,y+r);
        context.lineTo(x+width,y+height-r);
        context.quadraticCurveTo(x+width,y+height,x+width-r,y+height);
        context.lineTo(x+r,y+height);
        context.quadraticCurveTo(x,y+height,x,y+height-r);
        context.lineTo(x,y+r);
        context.quadraticCurveTo(x,y,x+r,y);
        context.closePath();
      };
      for (const command of commands) {
        if (command.type === 'rect') {
          roundedPath(command.x,command.y,command.width,command.height,command.radius);
          context.fillStyle = command.color;
          context.fill();
        } else if (command.type === 'gradientRect') {
          const gradient = context.createLinearGradient(command.x,command.y,command.x,command.y+command.height);
          gradient.addColorStop(0,command.top);
          gradient.addColorStop(1,command.bottom);
          context.fillStyle = gradient;
          context.fillRect(command.x,command.y,command.width,command.height);
        } else if (command.type === 'line') {
          context.beginPath();
          context.moveTo(command.x1,command.y1);
          context.lineTo(command.x2,command.y2);
          context.strokeStyle = command.color;
          context.lineWidth = 1;
          context.stroke();
        } else if (command.type === 'text') {
          context.font = command.layout.font;
          context.fillStyle = command.color;
          context.textAlign = command.align;
          context.textBaseline = 'top';
          const anchor = command.align === 'center' ? command.x+command.width/2 : command.align === 'right' ? command.x+command.width : command.x;
          command.layout.lines.forEach((line,index) => context.fillText(line,anchor,command.y+index*command.layout.lineHeight));
        } else if (command.type === 'image') {
          roundedPath(command.x,command.y,command.width,command.height,command.radius);
          context.save();
          context.clip();
          const image = command.image;
          if (image && !command.placeholder && (image.currentSrc.startsWith('data:') || new URL(image.currentSrc,location.href).origin === location.origin)) {
            const scale = command.fit === 'contain' ? Math.min(command.width/image.naturalWidth,command.height/image.naturalHeight) : Math.max(command.width/image.naturalWidth,command.height/image.naturalHeight);
            const drawWidth = image.naturalWidth*scale;
            const drawHeight = image.naturalHeight*scale;
            context.drawImage(image,command.x+(command.width-drawWidth)/2,command.y+(command.height-drawHeight)/2,drawWidth,drawHeight);
          } else {
            const gradient = context.createLinearGradient(command.x,command.y,command.x+command.width,command.y+command.height);
            gradient.addColorStop(0,'#dbe5cd');
            gradient.addColorStop(.52,'#a9c578');
            gradient.addColorStop(.53,'#708d50');
            gradient.addColorStop(1,'#4e653c');
            context.fillStyle = gradient;
            context.fillRect(command.x,command.y,command.width,command.height);
            context.fillStyle = '#eef5e8';
            context.font = '700 22px "IBM Plex Sans Thai",Tahoma,sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('เพิ่มรูปภาพ',command.x+command.width/2,command.y+command.height/2);
          }
          context.restore();
        }
      }
      const blob = await canvasToBlob(canvas,'image/png');
      if (!blob) throw new Error('บันทึกภาพ PNG ไม่สำเร็จ');
      const fileTitle = ($('#documentTitle').textContent.trim() || 'reflection-design').replace(/[\\/:*?"<>|]+/g,'-').replace(/\s+/g,'-');
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.download = `${fileTitle}.png`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl),1500);
      showToast(`ส่งออกภาพ PNG แล้ว · ${ARTBOARD_WIDTH} × ${height} px`);
    } catch (error) {
      showToast(error?.message || 'ส่งออก PNG ไม่สำเร็จ ลองส่งออก HTML แทน');
    } finally {
      button.disabled = false;
      button.textContent = 'ส่งออก PNG';
    }
  }

  async function optimizeLegacyEmbeddedImages() {
    const next = clone(elements);
    let updated = false;
    for (const element of next) {
      if (!['image','split'].includes(element.type) || !/^data:image\/(png|jpeg|webp);base64,/i.test(element.src||'') || element.src.length < 1_000_000) continue;
      const response = await fetch(element.src);
      if (!response.ok) continue;
      const blob = await response.blob();
      const file = new File([blob],`${(element.alt||'reflection-image').replace(/[^\wก-๙-]+/g,'-')}.${blob.type.split('/')[1]||'png'}`,{type:blob.type});
      const asset = await prepareImageAsset(file);
      if (asset.optimized && asset.bytes < blob.size) {
        element.src = asset.src;
        if (asset.aspectRatio) element.aspectRatio = asset.aspectRatio;
        updated = true;
      }
    }
    if (updated) {
      elements = next;
      renderAll();
      scheduleSave();
      showToast('ปรับรูปขนาดใหญ่ให้พร้อมส่งออกแล้ว');
    }
  }

  async function openExport() {
    const exportButton = $('#editorExport');
    exportButton.disabled = true;
    exportButton.textContent = 'เตรียมโค้ดส่งออก…';
    try {
      await optimizeLegacyEmbeddedImages();
      exportCode.value = buildExport();
      exportDialog.showModal();
    } catch {
      showToast('เตรียมรูปภาพไม่สำเร็จ ลองบันทึกงานแล้วเปิดส่งออกอีกครั้ง');
    } finally {
      exportButton.disabled = false;
      exportButton.innerHTML = 'ส่งออก HTML <span>↗</span>';
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
    showToast('กำลังเตรียมรูปภาพ…');
    try {
      const asset = await prepareImageAsset(file);
      const alt = file.name.replace(/\.[^.]+$/,'');
      const current = elements.find(item => item.id === selectedId);
      if (current?.type==='sourcePage' && sourceImageSelection?.elementId===current.id) {
        const next=clone(elements);
        const target=next.find(item=>item.id===selectedId);
        target.markup=replaceSourceImage(target.markup,sourceImageSelection.index,asset.src,alt);
        sourceImageSelection=null;
        setElements(next,selectedId);
      } else if (current && (['image','split'].includes(current.type) || legacyHasImage(current))) {
        const next = clone(elements);
        const target = next.find(item => item.id === selectedId);
        target.src = asset.src;
        target.alt = alt;
        if (asset.aspectRatio) target.aspectRatio = asset.aspectRatio;
        setElements(next,selectedId);
      } else {
        const next = clone(elements);
        const image = makeElement('image',{src:asset.src,alt,...(asset.aspectRatio?{aspectRatio:asset.aspectRatio}:{})});
        const selectedIndex = next.findIndex(item => item.id === selectedId);
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
      const encodeArgs = ['-i',inputName,'-vn','-ac','2','-c:a',codec,'-b:a',$('#audioBitrate').value];
      if (format === 'mp4') encodeArgs.push('-movflags','+faststart');
      encodeArgs.push(outputName);
      await audioEngine.exec(encodeArgs);
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
      $('#convertAudio').disabled = !audioFileObject || !audioEngine?.loaded;
      $('#loadEngine').disabled = false;
    }
  }

  $('#templateSearch').addEventListener('input',renderGallery);
  $('#templateFilters')?.addEventListener('click',event=>{
    const button=event.target.closest('[data-template-category]');
    if(!button)return;
    activeTemplateCategory=button.dataset.templateCategory;
    renderGallery();
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
  window.addEventListener('resize',fitTemplateDetailPreview);
  $('#blankStart').addEventListener('click',() => enterEditor('งาน Reflection ใหม่',[]));
  galleryView.addEventListener('click',async event => {
    if (!event.target.closest('#resumeDraft')) return;
    const resumeButton = $('#resumeDraft');
    resumeButton.disabled = true;
    try {
      const draft = await readSavedDraft();
      if (!draft) {resumeButton.hidden = true;return;}
      enterEditor(draft.title || 'งาน Reflection',draft.elements || []);
      nextId = Math.max(Number(draft.nextId)||1,...elements.map(item => Number(String(item.id).split('-').pop())+1 || 1));
    } catch { showToast('เปิดร่างที่บันทึกไว้ไม่สำเร็จ'); }
    finally {resumeButton.disabled = false;}
  });
  $('#backToGallery').addEventListener('click',() => {
    showMode('gallery');
  });
  $('#editorExport').addEventListener('click',openExport);
  $('#closeExport').addEventListener('click',() => exportDialog.close());
  $('#copyHtml').addEventListener('click',async () => {
    try { await navigator.clipboard.writeText(exportCode.value); showToast('คัดลอก HTML แล้ว'); }
    catch { exportCode.select(); document.execCommand('copy'); showToast('คัดลอก HTML แล้ว'); }
  });
  $('#downloadHtml').addEventListener('click',async () => {
    const downloadButton = $('#downloadHtml');
    downloadButton.disabled = true;
    try {
      await optimizeLegacyEmbeddedImages();
      exportCode.value = buildExport();
      const blob = new Blob([`<!doctype html><html lang="th"><meta charset="utf-8"><title>Reflection export</title><body>\n${exportCode.value}\n</body></html>`],{type:'text/html;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'reflection-content.html'; link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
    } catch {showToast('ดาวน์โหลดไม่สำเร็จ ลองเปิดส่งออก HTML อีกครั้ง');}
    finally {downloadButton.disabled = false;}
  });
  $('#saveBtn').addEventListener('click',saveDraft);
  $('#undoBtn').addEventListener('click',undo);
  $('#redoBtn').addEventListener('click',redo);
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
    if (event.target.closest('.button-block a')) event.preventDefault();
    const sourceFrame=event.target.closest('.source-image-frame[data-source-frame]');
    const sourceImage=sourceFrame?.querySelector('[data-source-image]');
    if(sourceImage) {
      const sourceBlock=sourceImage.closest('[data-id]');
      sourceImageSelection={elementId:sourceBlock?.dataset.id,index:Number(sourceImage.dataset.sourceImage)};
      if(sourceBlock?.dataset.id) {selectElement(sourceBlock.dataset.id);renderArtboard();}
      renderInspector();
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
    if (event.target.closest('[data-resize-handle]')) {event.preventDefault();return}
    const block = event.target.closest('[data-id]');
    if (!block) return;
    draggedId = block.dataset.id;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain',draggedId);
    block.classList.add('dragging');
  });
  artboard.addEventListener('dragend',event => event.target.closest('[data-id]')?.classList.remove('dragging'));
  artboard.addEventListener('dragover',event => {
    if (event.dataTransfer?.types?.includes('Files')) {
      const imageBox = event.target.closest('.image-placeholder');
      event.preventDefault();
      imageBox?.classList.add('drop-target');
      event.dataTransfer.dropEffect='copy';
      return;
    }
    if (draggedId || draggedType) {event.preventDefault();event.dataTransfer.dropEffect=draggedType?'copy':'move'}
  });
  artboard.addEventListener('dragleave',event => {
    const imageBox = event.target.closest('.image-placeholder');
    if (imageBox && !imageBox.contains(event.relatedTarget)) imageBox.classList.remove('drop-target');
  });
  artboard.addEventListener('drop',async event => {
    event.preventDefault();
    artboard.querySelectorAll('.image-placeholder.drop-target').forEach(node => node.classList.remove('drop-target'));
    const target = event.target.closest('[data-id]');
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile?.type.startsWith('image/')) {
      if (target) selectElement(target.dataset.id);
      else selectedId = null;
      await applyFile(droppedFile);
      return;
    }
    const source = event.dataTransfer.getData('text/plain') || draggedId;
    const legacyInsertMatch = source?.match(/^legacy:([A-Za-z0-9]+)$/);
    if (legacyInsertMatch) {
      const targetIndex = elements.findIndex(item=>item.id===target?.dataset.id);
      const after = target && event.clientY > target.getBoundingClientRect().top+target.getBoundingClientRect().height/2;
      addLegacyBlock(legacyInsertMatch[1],targetIndex<0?elements.length:targetIndex+(after?1:0));
      draggedType=null;
      return;
    }
    const insertMatch = source?.match(/^insert:(heading|text|image|quote|split|divider|banner|button|columns|spacer)(?:\|(normal|highlight|green|greenText))?$/);
    if (insertMatch) {
      const targetIndex = elements.findIndex(item => item.id === target?.dataset.id);
      const after = target && event.clientY > target.getBoundingClientRect().top + target.getBoundingClientRect().height/2;
      insertBlock(insertMatch[1],targetIndex < 0 ? elements.length : targetIndex + (after ? 1 : 0),imageInsertOptions(insertMatch[2]));
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
    if (event.target.closest('[data-pick-image]')) {imageFile.value='';imageFile.click();return}
    const align = event.target.closest('[data-align]');
    if (align) {inspectorBaseline=clone(elements);setProperty(selectedId,'align',align.dataset.align,false);commitInspectorEdit();return}
    const remove = event.target.closest('[data-delete]');
    if (remove) {
      setElements(elements.filter(element => element.id !== remove.dataset.delete),null);
      showToast('ลบองค์ประกอบแล้ว');
    }
  });
  imageFile.addEventListener('change',() => applyFile(imageFile.files?.[0]));
  $('#exportPng').addEventListener('click',exportDesignPng);
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
    if (editorView.hidden || exportDialog.open) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {event.preventDefault();event.shiftKey?redo():undo()}
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {event.preventDefault();saveDraft()}
    if ((event.key === 'Delete' || event.key === 'Backspace') && !event.target.closest('[contenteditable],textarea,input,select')) {
      if (selectedId) {setElements(elements.filter(element => element.id !== selectedId),null);showToast('ลบองค์ประกอบแล้ว')}
    }
  });

  renderLegacyTools();
  renderGallery();
})();
