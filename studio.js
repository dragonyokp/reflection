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
  let draggedNested = null;
  let nestedDragGrip = null;
  let sourceImageSelection = null;
  let activeImage = null;
  let selectedFreeBox = null;
  const freeMulti = new Set();
  let freeGesture = null;
  let freeDrawKind = null;
  let freeDraw = null;
  let freeMarquee = null;
  let freeUpload = null;
  let imageMove = null;
  let suppressImageClick = false;
  let sourceTextSelection = null;
  let activeTextField = null;
  const boardTextTools = $('#boardTextTools');
  const boardSettings = $('#boardSettings');
  const inlineRemove = document.createElement('button');
  inlineRemove.type = 'button';
  inlineRemove.className = 'inline-text-remove';
  inlineRemove.setAttribute('aria-label','ลบข้อความส่วนนี้');
  inlineRemove.title = 'ลบข้อความส่วนนี้';
  inlineRemove.textContent = '×';
  inlineRemove.hidden = true;
  let inlineRemoveTarget = null;
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
    contentHeading:'หัวข้อ H4', contentText:'ข้อความ', contentBlockquote:'คำพูดอ้างอิง',
    contentSplitQuoteLeft:'Quote รูปซ้าย', contentSplitQuoteRight:'Quote รูปขวา',
    contentSplitImageLeft:'รูปซ้าย ครึ่งเขียว', contentSplitImageRight:'รูปขวา ครึ่งเขียว',
    contentPortraitQuote:'รูปคู่คำพูด', contentModal:'ปุ่ม Popup', contentSpeakers:'คำพูดหลายคน'
  };
  const cmsLayouts = {
    body:{label:'เนื้อหาปกติ',columns:['col-md-10 col-xl-8 col-xxl-6']},
    wide:{label:'เนื้อหากว้าง',columns:['col-md-12 col-xl-10 col-xxl-8']},
    two:{label:'2 คอลัมน์',columns:['col-md-6','col-md-6']},
    three:{label:'3 คอลัมน์',columns:Array(3).fill('col-md-4')},
    four:{label:'4 คอลัมน์',columns:Array(4).fill('col-md-3')},
    left:{label:'ซ้ายแคบ ขวากว้าง',columns:['col-lg-5','col-lg-7']},
    right:{label:'ซ้ายกว้าง ขวาแคบ',columns:['col-lg-7','col-lg-5']}
  };
  const cmsBackgrounds = {
    plain:{label:'ปกติ',className:''},
    grey:{label:'เทาอ่อน',className:'container-fluid px-0 my-5 bg-light-grey'},
    green:{label:'เขียว',className:'bg-green-gradient-vertical mb-md-6 mb-5 pb-md-6 pb-5 text-white'}
  };
  const cmsInlineTools = ['contentHeading','contentText','contentQuoteImage','contentBlockquote','subtitle','audio'];
  let cmsColumnSelection;

  function renderCmsComposer() {
    const tools = (ids,key) => ids.map(id => {
      const block = legacyBlockMap.get(id);
      if (!block) return '';
      return `<button type="button" class="legacy-tool-card" draggable="true" data-${key}="${id}">${block.group === 'content' ? toolPreviewMarkup(id) : legacyMiniMarkup(block.mini)}<b>${escapeHtml(shelfLabels[id] || block.name)}</b></button>`;
    }).join('');
    const layouts = Object.entries(cmsLayouts).map(([key,{label,columns}]) =>
      `<button type="button" class="legacy-tool-card" draggable="true" data-cms-add-layout="${key}"><span class="cms-layout-mini cms-mini-${key}" aria-hidden="true">${columns.map(() => '<i></i>').join('')}</span><b>${label}</b></button>`
    ).join('');
    $('#cmsComposer').innerHTML = `
      <div id="cmsSectionControls" class="cms-section-controls" hidden></div>
      <section class="tool-category"><h3 class="tool-category-title">เพิ่มโครงหน้า</h3><div class="insert-grid cms-layout-grid">${layouts}</div></section>
      <section class="tool-category"><h3 class="tool-category-title">เพิ่มในคอลัมน์</h3><div class="insert-grid">${tools(cmsInlineTools,'cms-add-content')}</div></section>
      <section class="tool-category"><h3 class="tool-category-title">เพิ่มเต็มส่วน</h3><div class="insert-grid">${tools(['highlightImage','highlightGreenText','highlightGreenEmpty','contentSplitImageLeft','contentSplitImageRight','contentSplitQuoteLeft','contentSplitQuoteRight'],'cms-add-section')}</div></section>`;
  }

  function cmsSection() {
    const item = elements.find(element => element.id === selectedId && element.cmsLayout);
    if (!item) return {};
    const block = $(`.board-section[data-id="${CSS.escape(item.id)}"]`,artboard);
    const root = block?.querySelector('[data-source-render]');
    const columns = root ? $$('[data-cms-column]',root) : [];
    const index = cmsColumnSelection?.id === item.id ? Math.min(cmsColumnSelection.index,columns.length-1) : 0;
    return {item,block,root,columns,index};
  }

  function renderCmsControls() {
    const controls = $('#cmsSectionControls');
    if (!controls) return;
    const {item,columns,index} = cmsSection();
    $('[data-cms-active]',artboard)?.removeAttribute('data-cms-active');
    const freeShelfOpen = !$('#freeShelf').hidden;
    if (freeShelfOpen) columns?.[index]?.setAttribute('data-cms-active','');
    const graphics = $('#graphicTools');
    const showGraphics = elements.some(element => element.id === selectedId && element.type === 'freeLayout');
    if (showGraphics && graphics.hidden) graphics.open = true;
    if (!showGraphics && !graphics.hidden) setFreeDrawTool(null);
    graphics.hidden = !showGraphics;
    controls.hidden = !item;
    if (!item || !columns.length || !freeShelfOpen) return;
    const choices = (options,value) => Object.entries(options).map(([key,option]) =>
      `<option value="${key}"${String(value) === key ? ' selected' : ''}>${option.label}</option>`).join('');
    const audios = $$('audio',columns[index]);
    controls.innerHTML = `
      <label>คอลัมน์ที่จะเพิ่ม<select data-cms-target>${choices(columns.map((_,i) => ({label:`คอลัมน์ ${i+1}`})),index)}</select></label>
      <label>โครงที่เลือก<select data-cms-layout>${choices(cmsLayouts,item.cmsLayout)}</select></label>
      <label>พื้นหลัง<select data-cms-background>${choices(cmsBackgrounds,item.cmsBackground)}</select></label>
      ${audios.map((audio,i) => `<label>พาธเสียง MP4${audios.length>1 ? ' '+(i+1) : ''}<input type="text" data-cms-audio="${i}" value="${escapeHtml((audio.getAttribute('src') || '').replace('https://www.bangchak.co.th/','/'))}"></label>`).join('')}`;
  }

  function makeCmsLayout(key) {
    const layout = cmsLayouts[key];
    const columns = layout.columns.map(className => `<div class="${className}" data-cms-column></div>`).join('');
    const markup = `<div data-cms-surface><div class="container"><div class="row justify-content-center" data-cms-row>${columns}</div></div></div>`;
    return {cmsLayout:key,cmsBackground:'plain',title:layout.label,sourceKind:'composite',sourcePath:[],visualTemplate:true,markup};
  }

  function addCmsContent(type,insertAt) {
    const definition = nestedTool(`legacy:${type}`);
    if (!definition) return;
    const {item,block,root,columns,index} = cmsSection();
    const zone = columns?.[index];
    if (zone && insertAt === undefined) {
      const rect = zone.getBoundingClientRect();
      insertNestedTool({item,block,root,column:zone,zone,x:rect.left+rect.width/2,y:rect.bottom+1},definition);
      return;
    }
    const layout = makeElement('sourcePage',makeCmsLayout('body'));
    const snapshot = snapshotNestedSource(layout);
    const tool = makeElement('legacy',definition);
    const wrapper = makeNestedWrapper(tool,snapshot);
    $('[data-cms-column]',snapshot.root).append(wrapper);
    insertBlock('sourcePage',insertAt,sourceBlockFromSnapshot(layout,snapshot,layout.title));
    focusNewText($(`[data-studio-nest="${tool.id}"] [contenteditable="true"]`,artboard));
  }

  function updateCmsSection(target) {
    const {item,root,columns,index} = cmsSection();
    if (!item || !columns.length) return;
    if (target.hasAttribute('data-cms-target')) {
      cmsColumnSelection = {id:item.id,index:Number(target.value)};
      renderCmsControls();
      $('[data-cms-target]').focus();
      return;
    }
    const snapshot = snapshotNestedSource(item,root);
    const updated = {...item};
    if (target.hasAttribute('data-cms-audio')) {
      const path = target.value.trim();
      if (path && (!/^(?:https?:\/\/|\/(?!\/))/i.test(path) || /[\u0000-\u001f]/.test(path))) {
        showToast('ใส่พาธที่ขึ้นต้นด้วย / หรือ URL ของไฟล์เสียง');
        target.value = $$('audio',columns[index])[Number(target.dataset.cmsAudio)].getAttribute('src') || '';
        return;
      }
      $$('audio', $$('[data-cms-column]',snapshot.root)[index])[Number(target.dataset.cmsAudio)].setAttribute('src',path || '#');
    } else if (target.hasAttribute('data-cms-layout')) {
      const layout = cmsLayouts[target.value];
      const cells = $$('[data-cms-column]',snapshot.root);
      const row = $('[data-cms-row]',snapshot.root);
      const count = layout.columns.length;
      for (const extra of cells.slice(count)) {
        cells[count-1].append(...extra.childNodes);
        extra.remove();
      }
      layout.columns.forEach((className,i) => {
        const cell = cells[i] || row.appendChild(document.createElement('div'));
        cell.className = className;
        cell.setAttribute('data-cms-column','');
      });
      updated.cmsLayout = target.value;
      updated.title = layout.label;
    } else if (target.hasAttribute('data-cms-background')) {
      $('[data-cms-surface]',snapshot.root).className = cmsBackgrounds[target.value].className;
      updated.cmsBackground = target.value;
    } else return;
    const replacement = sourceBlockFromSnapshot(updated,snapshot,updated.title);
    setElements(elements.map(element => element.id === item.id ? replacement : element),item.id);
    const control = [...target.attributes].find(attr => attr.name.startsWith('data-cms-'));
    if (control && !target.hasAttribute('data-cms-audio')) $(`[${control.name}]`,$('#cmsSectionControls'))?.focus();
  }
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
      freeLayout:{boxes:[]},
      spacer:{height:48}
    };
    return {id:uid(),type,...clone(defaults[type] || {}),...overrides};
  }

  const safeColor = value => /^#[0-9a-f]{6}$/i.test(String(value||'')) ? value : '#20271e';
  const safeHref = value => /^(https?:|mailto:|tel:|#|\/)/i.test(String(value||'')) ? String(value) : '#';
  const imageWidthBase = element => element.type === 'split' ? Math.round((CONTENT_WIDTH - 48 - 15) / 2) : element.type === 'legacy' ? ARTBOARD_WIDTH : CONTENT_WIDTH;
  const imageMaxPercent = element => ['split','legacy','sourcePage'].includes(element.type) ? 100 : 120;
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
      const compact = !editing && isCompactPreviewImage(shape,nativeWidth);
      const fullWidth=/\bw-100\b/.test(tag);
      const frameWidth=width?`width:${Math.max(10,Math.min(120,width))}%`:nativeWidth&&!fullWidth?`width:${nativeWidth}px;max-width:100%`:'';
      const isSelected = editing && index === sourceImageSelection?.index && sourceImageSelection?.elementId === element?.id;
      let imageControl = '';
      if (editing && visualTemplate) {
        const action = hasUserImage ? 'เปลี่ยนรูปภาพ' : 'เพิ่มรูปภาพ';
        imageControl = `<button class="source-image-pick${hasUserImage ? ' source-image-replace' : ''}" data-source-pick type="button" aria-label="${action} ตำแหน่งที่ ${index + 1}"><span aria-hidden="true">${hasUserImage ? '↻' : '+'}</span> ${action}</button>`;
      } else if (visualTemplate && !hasUserImage && !compact) {
        imageControl = '<span class="source-template-green-label" aria-hidden="true">IMAGE</span>';
      }
      return `<span class="source-image-frame${visualTemplate?' source-template-green-frame shape-'+escapeHtml(shape)+(hasUserImage?' has-user-image':''):''}${compact?' compact-preview-image':''}${isSelected?' source-image-selected':''}" data-source-frame="${index}" style="${frameWidth}">${marked}${imageControl}${editing?renderResizeHandles(element,true):''}</span>`;
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
    $$('[data-studio-nest]',fragment.content).forEach(node => {
      const bar = document.createElement('div');
      bar.className = 'nested-tool-bar';
      bar.draggable = true;
      bar.setAttribute('data-template-preview-only','');
      const grip = document.createElement('span');
      grip.className = 'nested-tool-grip';
      grip.draggable = true;
      grip.title = 'ลากเพื่อย้าย';
      grip.setAttribute('aria-hidden','true');
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.dataset.removeNested = node.dataset.studioNest;
      remove.setAttribute('aria-label',`ลบ ${node.dataset.studioName || 'องค์ประกอบ'}`);
      remove.textContent = '×';
      bar.append(grip,remove);
      node.prepend(bar);
    });
    return fragment.innerHTML;
  }
  function sourceHtmlFromPreview(root, keepHints) {
    const copy=root.cloneNode(true);
    const current=elements.find(item=>item.id===root.closest('[data-id]')?.dataset.id);
    copy.querySelectorAll('[data-template-preview-only]').forEach(node=>node.remove());
    copy.querySelectorAll('[data-source-text-selected]').forEach(node=>node.removeAttribute('data-source-text-selected'));
    copy.querySelectorAll('[data-nested-drop]').forEach(node=>node.removeAttribute('data-nested-drop'));
    $('[data-cms-active]',copy)?.removeAttribute('data-cms-active');
    copy.classList.remove('nested-drop-root');
    copy.querySelectorAll('[data-source-edit]').forEach(node=>node.removeAttribute('spellcheck'));
    copy.querySelectorAll('.source-image-frame').forEach(frame => {
      const image = frame.querySelector('img');
      if (image) frame.replaceWith(image);
      else frame.remove();
    });
    return cleanSourceMarkup(copy.innerHTML,keepHints ?? Boolean(current?.visualTemplate)).replace(/https:\/\/www\.bangchak\.co\.th\//gi,'/');
  }
  function isCompactPreviewImage(shape,width) {
    return width > 0 && width <= 150 && ['wide','square'].includes(shape);
  }

  function sourceThumbMarkup(markup) {
    return cleanSourceMarkup(markup,true)
      .replace(/<audio\b[^>]*>[\s\S]*?<\/audio\s*>|<audio\b[^>]*\/?\s*>/gi,'<span class="source-thumb-audio"><b>▶</b><span>00:00</span><i></i></span>')
      .replace(/<img\b([^>]*)>/gi,(_,attrs)=>{
        const width=Number((attrs.match(/\bwidth="(\d+)"/i)||[])[1]||0);
        const fullWidth=/\bw-100\b/.test(attrs);
        const sizing=width&&!fullWidth?` style="width:${width}px;max-width:100%"`:'';
        const shape = (attrs.match(/data-template-placeholder="([^"]+)"/i)||[])[1] || 'wide';
        const compact = isCompactPreviewImage(shape,width) ? ' compact-preview-image' : '';
        return `<span class="source-thumb-image shape-${escapeHtml(shape)}${compact} ${escapeHtml((attrs.match(/class="([^"]+)"/i)||[])[1]||'')}"${sizing}></span>`;
      });
  }
  function renderResizeHandles(element, always = false) {
    if (!always && element.id !== selectedId) return '';
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
    canvas.scrollTop = 0;
    canvas.scrollLeft = 0;
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
          imageWidths:localImageSettings('imageWidths'), imageCropRatios:localImageSettings('imageCropRatios'),
          imageOffsets:localImageSettings('imageOffsets'),imageOffsetsY:localImageSettings('imageOffsetsY')
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
    cmsColumnSelection = null;
    activeTextField = null;
    activeImage = null;
    selectOnlyFreeBox(null);
    freeDrawKind = null;
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
    setFreeDrawTool(null);
    fitCanvasToView();
    window.scrollTo(0,0);
  }

  function renderBlock(element) {
    const selected = element.id === selectedId ? ' selected' : '';
    const sourceClass = element.type === 'sourcePage' ? ' source-page-block' : '';
    const legacy = element.type === 'legacy' ? ' data-legacy-type="'+escapeHtml(element.legacyType)+'"' : '';
    const name = element.type === 'legacy' ? (shelfLabels[element.legacyType] || legacyElementName(element)) :
      element.type === 'sourcePage' ? (element.title || 'องค์ประกอบจากเทมเพลต') :
      element.type === 'freeLayout' ? 'พื้นที่ออกแบบอิสระ' :
      element.type === 'image' ? imageStyleName(element.imageStyle) : titleFor(element.type);
    return `<div class="canvas-block board-section${sourceClass}${selected}" data-id="${element.id}"${legacy} draggable="true">
      <div class="board-section-header" tabindex="0"><b>${escapeHtml(name)}</b><button class="canvas-remove-block" data-canvas-remove="${element.id}" type="button" title="ลบ ${escapeHtml(name)}" aria-label="ลบ ${escapeHtml(name)}">×</button></div>
      ${renderBlockBody(element)}
    </div>`;
  }

  function renderBlockBody(element) {
    if (element.type === 'freeLayout') return renderFreeLayout(element);
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

  const boardImageFrame = '.image-placeholder,.preview-image-placeholder,.source-image-frame,.free-image-frame';

  const freeTools = {
    rect:{label:'สี่เหลี่ยม',width:240,height:170,background:'#a6d965'},
    ellipse:{label:'วงรี',width:200,height:150,background:'#a6d965'},
    line:{label:'เส้น',width:200,height:44,background:'#315a38',stroke:4,flat:true},
    triangle:{label:'สามเหลี่ยม',width:170,height:155,background:'#a6d965'},
    diamond:{label:'สี่เหลี่ยมข้าวหลามตัด',width:175,height:155,background:'#a6d965'},
    arrow:{label:'ลูกศร',width:210,height:88,background:'#315a38'},
    image:{label:'กล่องรูปภาพ',width:300,height:220,background:'#d1e7bf'},
    text:{label:'กล่องข้อความ',width:270,height:120,background:'#f0f5e8',text:'พิมพ์ข้อความของคุณ',color:'#203524',fontSize:24}
  };
  const freeMinSize = 44;
  const freeStageHeight = layout => Math.max(540,...layout.boxes.map(box => box.y+box.height+24));
  const bound = (n,min,max) => Math.min(Math.max(n,min),Math.max(min,max));

  function freeBoxStyle(box) {
    return `left:${box.x}px;top:${box.y}px;width:${box.width}px;height:${box.height}px;--free-rotation:${box.rotation||0}deg;--free-opacity:${freeOpacity(box)}`;
  }

  const freeOpacity = box => bound(box.opacity ?? 100,0,100)/100;
  const freeFont = box => ({arial:'Arial, sans-serif',georgia:'Georgia, Tahoma, sans-serif',tahoma:'Tahoma, Arial, sans-serif'}[box.font] || 'Tahoma, Arial, sans-serif');
  const freeShapePoints = {
    triangle:[[.5,0],[1,1],[0,1]],
    diamond:[[.5,0],[1,.5],[.5,1],[0,.5]],
    arrow:[[0,.3],[.66,.3],[.66,0],[1,.5],[.66,1],[.66,.7],[0,.7]]
  };

  function freeLineEnds(box) {
    if (box.vertical) return [.5,0,.5,1];
    if (box.flat) return [0,.5,1,.5];
    return box.invert ? [0,1,1,0] : [0,0,1,1];
  }

  function renderFreeLayout(layout) {
    return `<div class="free-stage${freeDrawKind?' free-stage-draw':''}${selectedId===layout.id && editableFreeSelection(layout).length>1?' free-multiple':''}" data-free-stage style="height:${freeStageHeight(layout)}px">${layout.boxes.filter(box => !box.hidden).map(box => {
      const selected = selectedId === layout.id && isFreeSelected(box.id);
      const info = freeTools[box.kind];
      const locked = Boolean(box.locked);
      return `<div class="free-box${selected?' selected':''}${locked?' free-locked':''}" data-free-box="${box.id}" data-kind="${box.kind}" aria-label="${escapeHtml(box.name || info.label)}" tabindex="0" style="${freeBoxStyle(box)}">${renderFreeArtwork(box)}
        <button type="button" class="free-box-remove" data-free-remove aria-label="ลบ${info.label}">×</button>
        ${box.kind==='image' && box.src ? '<button type="button" class="free-box-replace" data-free-upload>เปลี่ยนรูป</button>' : ''}
        ${['nw','ne','sw','se'].map(handle => `<span class="free-size free-size-${handle}" data-free-size="${handle}" aria-hidden="true"></span>`).join('')}
        </div>`;
    }).join('')}</div>`;
  }

  function renderFreeArtwork(box) {
    const local = {...box,x:0,y:0,rotation:0,opacity:100};
    const round = bound(box.radius||0,0,Math.min(80,box.width/2,box.height/2));
    if (box.kind === 'image') {
      const media = box.src ? `<img src="${escapeHtml(box.src)}" alt="${escapeHtml(box.alt || '')}" draggable="false">` :
        '<button type="button" class="free-image-pick" data-free-upload>＋ เพิ่มรูปภาพ</button>';
      return `<div class="free-artwork free-image-frame" style="border-radius:${round}px;background:${safeColor(box.background)}">${media}</div>`;
    }
    const art = `<svg class="free-vector" width="100%" height="100%" viewBox="0 0 ${box.width} ${box.height}" aria-hidden="true">${freeVectorMarkup(local,`board-${box.id}`)}</svg>`;
    const text = box.kind === 'text' ? `<div class="free-copy" style="background:${safeColor(box.background)};color:${safeColor(box.color)};font:${box.italic?'italic ':''}${box.bold?'700 ':''}${box.fontSize}px/1.4 ${freeFont(box)};text-align:${box.textAlign || 'left'}">${textHtml(box.text)}</div>` : '';
    return `<div class="free-artwork">${art}${text}</div>`;
  }

  function freeSelection(node) {
    const root = node?.closest('.board-section[data-id]');
    const layout = elements.find(item => item.id === root?.dataset.id && item.type === 'freeLayout');
    const tile = node?.closest('[data-free-box]');
    const box = layout?.boxes.find(item => item.id === tile?.dataset.freeBox);
    return {layout,box,tile};
  }

  function currentFreeBox() {
    const layout = elements.find(item => item.id === selectedId && item.type === 'freeLayout');
    return {layout,box:layout?.boxes.find(item => item.id === selectedFreeBox)};
  }

  function selectOnlyFreeBox(id) {
    freeMulti.clear();
    selectedFreeBox = id;
  }

  function setFreeSelectionIds(ids) {
    freeMulti.clear();
    for (const id of ids) freeMulti.add(id);
    selectedFreeBox = [...freeMulti].at(-1) || null;
  }

  function isFreeSelected(id) {
    return id === selectedFreeBox || freeMulti.has(id);
  }

  function editableFreeSelection(layout) {
    return layout?.boxes.filter(box => isFreeSelected(box.id) && !box.hidden && !box.locked) || [];
  }

  const horizontalAlign = {left:0,center:.5,right:1};

  function renderFreeProperties() {
    const {layout,box} = currentFreeBox();
    const root = $('#freeProperties');
    if (!layout) { root.innerHTML = ''; return; }
    const selection = editableFreeSelection(layout);
    const layers = layout.boxes.length ? `<section class="free-properties free-layers"><h3>เลเยอร์</h3>
      ${layout.boxes.slice().reverse().map(item => {
        const name = item.name || (item.kind==='text' ? item.text.trim().slice(0,42) : item.alt) || freeTools[item.kind].label;
        return `<div class="free-layer-row">
          <button type="button" data-free-layer="${item.id}" aria-pressed="${isFreeSelected(item.id)}"><i style="background:${safeColor(item.background)}" aria-hidden="true"></i><span>${escapeHtml(name)}</span></button>
          <button type="button" data-free-layer-toggle="hidden" data-free-layer-id="${item.id}" aria-label="${item.hidden?'แสดง':'ซ่อน'}เลเยอร์" title="${item.hidden?'แสดง':'ซ่อน'}เลเยอร์">${item.hidden?'◌':'◉'}</button>
          <button type="button" data-free-layer-toggle="locked" data-free-layer-id="${item.id}" aria-label="${item.locked?'ปลดล็อก':'ล็อก'}เลเยอร์" title="${item.locked?'ปลดล็อก':'ล็อก'}เลเยอร์">${item.locked?'🔒':'🔓'}</button>
        </div>`;
      }).join('')}
      </section>` : '';
    const arrangements = `<div class="free-property-actions">
      <button type="button" data-free-arrange="top">ชิดบน</button><button type="button" data-free-arrange="middle">กึ่งกลางแนวตั้ง</button>
      <button type="button" data-free-arrange="bottom">ชิดล่าง</button>
      ${selection.length>=3?'<button type="button" data-free-arrange="spread-x">เว้นระยะซ้าย–ขวา</button><button type="button" data-free-arrange="spread-y">เว้นระยะบน–ล่าง</button>':''}
      <button type="button" data-free-duplicate>ทำสำเนา</button></div>`;
    if (selection.length > 1) {
      root.innerHTML = `<section class="free-properties"><h3>เลือก ${selection.length} ชิ้น</h3>${arrangements}</section>${layers}`;
      return;
    }
    if (!box) { root.innerHTML = layers; return; }
    const number = (key,label,min,max) => `<label>${label}<input type="number" min="${min}" max="${max}" data-free-prop="${key}" value="${Math.round(box[key] ?? (key==='opacity'?100:0))}"></label>`;
    const color = (key,label) => `<label>${label}<input type="color" data-free-prop="${key}" value="${safeColor(box[key])}"></label>`;
    root.innerHTML = `<section class="free-properties"><h3>${freeTools[box.kind].label}</h3>
      <label class="free-layer-name">ชื่อเลเยอร์<input type="text" data-free-prop="name" value="${escapeHtml(box.name || '')}" placeholder="${freeTools[box.kind].label}"></label>
      ${box.locked || box.hidden ? '' : `
      <div class="free-property-grid">${color('background',box.kind==='line'?'สีเส้น':'สีพื้น')}${box.kind==='line'?number('stroke','ความหนา',1,32):['rect','text','image'].includes(box.kind)?number('radius','มุมโค้ง',0,80):''}
      ${box.kind==='text' ? color('color','สีข้อความ')+number('fontSize','ขนาดตัวอักษร',14,96) : ''}
      ${number('opacity','ความทึบ %',0,100)}${number('rotation','หมุน °',-180,180)}
      ${number('x','ซ้าย',0,ARTBOARD_WIDTH-box.width)}${number('y','บน',0,1400)}
      ${number('width','กว้าง',freeMinSize,ARTBOARD_WIDTH-box.x)}${number('height','สูง',freeMinSize,1000)}</div>
      ${box.kind==='text' ? `<div class="free-property-grid free-type-controls">
        <label>ฟอนต์<select data-free-prop="font">${[['tahoma','Tahoma'],['arial','Arial'],['georgia','Georgia']].map(([k,v]) => `<option value="${k}"${k===(box.font||'tahoma')?' selected':''}>${v}</option>`).join('')}</select></label>
        <label>แนวข้อความ<select data-free-prop="textAlign">${[['left','ซ้าย'],['center','กลาง'],['right','ขวา']].map(([k,v]) => `<option value="${k}"${k===(box.textAlign||'left')?' selected':''}>${v}</option>`).join('')}</select></label>
        <label><input type="checkbox" data-free-prop="bold"${box.bold?' checked':''}> ตัวหนา</label><label><input type="checkbox" data-free-prop="italic"${box.italic?' checked':''}> ตัวเอียง</label>
      </div>` : ''}
      <div class="free-property-actions"><button type="button" data-free-order="back">ส่งไปหลัง</button><button type="button" data-free-order="front">นำมาหน้า</button></div>${arrangements}`}</section>${layers}`;
  }

  function switchShelf(free) {
    for (const [tab,panel,active] of [['freeTab','freeShelf',free],['componentsTab','componentsShelf',!free]]) {
      const button = $('#'+tab);
      button.setAttribute('aria-selected',String(active));
      button.tabIndex = active ? 0 : -1;
      $('#'+panel).hidden = !active;
    }
    if (free) renderFreeProperties();
    else setFreeDrawTool(null);
    renderCmsControls();
  }

  function setFreeDrawTool(kind) {
    freeDrawKind = Object.hasOwn(freeTools,kind) ? kind : null;
    $('[data-free-select-tool]').setAttribute('aria-pressed',String(!freeDrawKind));
    $$('[data-free-tool]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.freeTool === freeDrawKind)));
    if (freeDrawKind && !currentFreeBox().layout) {
      selectOnlyFreeBox(null);
      insertBlock('freeLayout');
    }
    const stage = currentFreeBox().layout && $(`[data-id="${CSS.escape(selectedId)}"] [data-free-stage]`,artboard);
    $$('[data-free-stage]',artboard).forEach(canvas => canvas.classList.toggle('free-stage-draw',Boolean(freeDrawKind)));
    if (freeDrawKind && stage) stage.scrollIntoView({block:'nearest'});
  }

  function addFreeBox(kind,event) {
    const tool = freeTools[kind];
    if (!tool) return;
    const surface = event?.target.closest('[data-free-stage]');
    const fromDrop = surface && freeSelection(surface).layout;
    const active = !event && elements.find(item => item.id === selectedId && item.type === 'freeLayout');
    const original = fromDrop || active;
    const next = clone(elements);
    let layout = original && next.find(item => item.id === original.id);
    if (!layout) {
      layout = makeElement('freeLayout');
      const placement = event ? boardDropPlacement(event,event.target.closest('.board-section[data-id]')) : {target:null,after:true};
      const index = next.findIndex(item => item.id === (event ? placement.target?.dataset.id : selectedId));
      const row = photoRowAt(next,index);
      next.splice(index<0 ? next.length : placement.after ? row.end : row.start,0,layout);
    }
    const box = {id:uid(),kind,...tool,radius:0};
    if (event) {
      const bounds = (surface || artboard).getBoundingClientRect();
      const center = (event.clientX-bounds.left)/zoom;
      box.x = Math.abs(center-ARTBOARD_WIDTH/2)<10 ? (ARTBOARD_WIDTH-box.width)/2 :
        bound(center-box.width/2,0,ARTBOARD_WIDTH-box.width);
      box.y = surface ? bound((event.clientY-bounds.top)/zoom-box.height/2,0,freeStageHeight(layout)-box.height) : 36;
    } else {
      const prev = layout.boxes.at(-1);
      box.x = prev ? bound(prev.x+24,0,ARTBOARD_WIDTH-box.width) : (ARTBOARD_WIDTH-box.width)/2;
      box.y = prev ? bound(prev.y+24,0,freeStageHeight(layout)-box.height) : 44;
    }
    layout.boxes.push(box);
    selectOnlyFreeBox(box.id);
    activeImage = null;
    activeTextField = null;
    setElements(next,layout.id);
    switchShelf(true);
    setFreeDrawTool(null);
  }

  function changeFreeBox(layout,box,update) {
    const next = clone(elements);
    const stage = next.find(item => item.id === layout.id);
    const item = stage.boxes.find(value => value.id === box.id);
    if (!item) return;
    update(item,stage);
    setElements(next,layout.id);
  }

  function selectFreeBox(layout,box,tile,toggle = false,keep = false) {
    const sameStage = selectedId === layout.id;
    selectedId = layout.id;
    if (toggle && sameStage && !box.locked && !box.hidden) {
      const ids = new Set(layout.boxes.filter(item => isFreeSelected(item.id)).map(item => item.id));
      if (ids.has(box.id)) ids.delete(box.id);
      else ids.add(box.id);
      setFreeSelectionIds(ids);
    } else if (!(keep && sameStage && isFreeSelected(box.id))) selectOnlyFreeBox(box.id);
    refreshFreeSelection(layout);
  }

  function refreshFreeSelection(layout) {
    activeTextField = null;
    activeImage = null;
    $$('.board-section.selected,.free-box.selected',artboard).forEach(node => node.classList.remove('selected'));
    const host = $(`.board-section[data-id="${CSS.escape(layout.id)}"]`,artboard);
    host?.classList.add('selected');
    host?.querySelector('[data-free-stage]')?.classList.toggle('free-multiple',editableFreeSelection(layout).length > 1);
    if (host) $$('[data-free-box]',host).forEach(node => node.classList.toggle('selected',isFreeSelected(node.dataset.freeBox)));
    updateBoardTextTools();
    switchShelf(true);
  }

  function startFreeMarquee(event,surface,layout) {
    event.preventDefault();
    const keep = event.shiftKey && selectedId === layout.id ? editableFreeSelection(layout).map(box => box.id) : [];
    const draft = document.createElement('div');
    draft.className = 'free-marquee';
    surface.append(draft);
    freeMarquee = {layout,surface,draft,keep,pointer:event.pointerId,x:event.clientX,y:event.clientY};
    surface.setPointerCapture?.(event.pointerId);
  }

  function moveFreeMarquee(event) {
    const s = freeMarquee;
    if (event.pointerId !== s.pointer) return;
    event.preventDefault();
    if (!s.moved && Math.hypot(event.clientX-s.x,event.clientY-s.y)<5) return;
    s.moved = true;
    const bounds = s.surface.getBoundingClientRect();
    const left = Math.max(bounds.left,Math.min(s.x,event.clientX));
    const top = Math.max(bounds.top,Math.min(s.y,event.clientY));
    const right = Math.min(bounds.right,Math.max(s.x,event.clientX));
    const bottom = Math.min(bounds.bottom,Math.max(s.y,event.clientY));
    s.draft.style.cssText = `left:${(left-bounds.left)/zoom}px;top:${(top-bounds.top)/zoom}px;width:${(right-left)/zoom}px;height:${(bottom-top)/zoom}px`;
    s.ids = new Set(s.keep);
    $$('.free-box:not(.free-locked)',s.surface).forEach(node => {
      const rect = node.getBoundingClientRect();
      if (rect.left<right && rect.right>left && rect.top<bottom && rect.bottom>top) s.ids.add(node.dataset.freeBox);
    });
  }

  function finishFreeMarquee(event) {
    const s = freeMarquee;
    if (event.pointerId !== s.pointer) return;
    freeMarquee = null;
    s.draft.remove();
    if (event.type === 'pointercancel') return;
    selectedId = s.layout.id;
    setFreeSelectionIds(s.ids || s.keep);
    refreshFreeSelection(s.layout);
    suppressImageClick = true;
    setTimeout(() => { suppressImageClick = false; },0);
  }

  function editFreeCopy(tile) {
    if (tile.classList.contains('free-locked')) return;
    const text = $('.free-copy',tile);
    if (!text) return;
    text.setAttribute('contenteditable','plaintext-only');
    text.focus();
  }

  function startFreeDraw(event,stage) {
    const {layout} = freeSelection(stage);
    if (!layout) return;
    event.preventDefault();
    const bounds = stage.getBoundingClientRect();
    const draft = document.createElement('div');
    draft.className = `free-draw-preview is-${freeDrawKind}`;
    stage.append(draft);
    freeDraw = {layout,stage,bounds,draft,kind:freeDrawKind,pointer:event.pointerId,
      x:bound((event.clientX-bounds.left)/zoom,0,ARTBOARD_WIDTH),
      y:bound((event.clientY-bounds.top)/zoom,0,bounds.height/zoom)};
    stage.setPointerCapture?.(event.pointerId);
  }

  function moveFreeDraw(event) {
    const s = freeDraw;
    if (event.pointerId !== s.pointer) return;
    event.preventDefault();
    const stageHeight = s.bounds.height/zoom;
    const rawX = bound((event.clientX-s.bounds.left)/zoom,0,ARTBOARD_WIDTH);
    const rawY = bound((event.clientY-s.bounds.top)/zoom,0,stageHeight);
    if (!s.moved && Math.hypot(rawX-s.x,rawY-s.y)*zoom<5) return;
    s.moved = true;
    const snap = (value,limit) => [0,limit/2,limit].find(edge => Math.abs(edge-value)*zoom<8) ?? value;
    let x = snap(rawX,ARTBOARD_WIDTH), y = snap(rawY,stageHeight);
    if (event.shiftKey && ['rect','ellipse'].includes(s.kind)) {
      const signX = Math.sign(x-s.x) || 1, signY = Math.sign(y-s.y) || 1;
      const size = Math.min(Math.max(Math.abs(x-s.x),Math.abs(y-s.y)),
        signX < 0 ? s.x : ARTBOARD_WIDTH-s.x,signY < 0 ? s.y : stageHeight-s.y);
      x = s.x+signX*size;
      y = s.y+signY*size;
    }
    const width = Math.min(ARTBOARD_WIDTH,Math.max(freeMinSize,Math.abs(x-s.x)));
    const height = Math.min(stageHeight,Math.max(freeMinSize,Math.abs(y-s.y)));
    const flat = s.kind === 'line' && Math.abs(y-s.y)*zoom < 5;
    const vertical = s.kind === 'line' && Math.abs(x-s.x)*zoom < 5 && !flat;
    s.geometry = {
      x:bound(Math.min(s.x,x)-(vertical?width/2:0),0,ARTBOARD_WIDTH-width),
      y:bound(Math.min(s.y,y)-(flat?height/2:0),0,stageHeight-height),
      width,height,flat,vertical,invert:(x-s.x)*(y-s.y)<0
    };
    const g = s.geometry;
    s.draft.style.cssText = `left:${g.x}px;top:${g.y}px;width:${g.width}px;height:${g.height}px`;
    if (s.kind === 'line') {
      const [x1,y1,x2,y2] = freeLineEnds(g);
      s.draft.innerHTML = `<svg width="100%" height="100%"><line x1="${100*x1}%" y1="${100*y1}%" x2="${100*x2}%" y2="${100*y2}%"/></svg>`;
    }
    imageGuides.replaceChildren();
    if ([0,ARTBOARD_WIDTH/2,ARTBOARD_WIDTH].includes(x)) {
      paintImageGuide('x',s.bounds.left+x*zoom,x===0?'ซ้าย':x===ARTBOARD_WIDTH?'ขวา':'กึ่งกลาง',s.bounds);
    }
    if ([0,stageHeight/2,stageHeight].includes(y)) {
      paintImageGuide('y',s.bounds.top+y*zoom,y===0?'บน':y===stageHeight?'ล่าง':'กึ่งกลาง',s.bounds);
    }
  }

  function finishFreeDraw(event) {
    const s = freeDraw;
    if (s.pointer !== event.pointerId) return;
    freeDraw = null;
    s.draft.remove();
    imageGuides.replaceChildren();
    if (event.type === 'pointercancel') return;
    const next = clone(elements);
    const layout = next.find(item => item.id === s.layout.id);
    if (!layout) return;
    const tool = freeTools[s.kind];
    const geometry = s.geometry || {
      x:bound(s.x,0,ARTBOARD_WIDTH-tool.width),
      y:bound(s.y,0,s.bounds.height/zoom-tool.height)
    };
    const box = {id:uid(),kind:s.kind,...tool,radius:0,...geometry};
    layout.boxes.push(box);
    selectOnlyFreeBox(box.id);
    activeImage = activeTextField = null;
    suppressImageClick = true;
    setTimeout(() => { suppressImageClick = false; },0);
    setFreeDrawTool(null);
    setElements(next,layout.id);
  }

  function duplicateFreeBox() {
    const {layout} = currentFreeBox();
    const boxes = editableFreeSelection(layout);
    if (!boxes.length) return;
    const next = clone(elements);
    const stage = next.find(item => item.id === layout.id);
    const dx = Math.max(0,Math.min(18,ARTBOARD_WIDTH-Math.max(...boxes.map(box => box.x+box.width))));
    const dy = Math.max(0,Math.min(18,freeStageHeight(layout)-Math.max(...boxes.map(box => box.y+box.height))));
    const duplicates = boxes.map(box => ({...box,id:uid(),x:box.x+dx,y:box.y+dy}));
    stage.boxes.push(...duplicates);
    setFreeSelectionIds(duplicates.map(box => box.id));
    setElements(next,layout.id);
  }

  function arrangeFreeBoxes(command) {
    const {layout} = currentFreeBox();
    const selection = editableFreeSelection(layout);
    if (!selection.length) return;
    const ids = new Set(selection.map(box => box.id));
    const next = clone(elements);
    const boxes = next.find(item => item.id === layout.id).boxes.filter(box => ids.has(box.id));
    const vertical = ['top','middle','bottom','spread-y'].includes(command);
    const axis = vertical ? 'y' : 'x';
    const size = vertical ? 'height' : 'width';
    const start = boxes.length>1 ? Math.min(...boxes.map(box => box[axis])) : 0;
    const end = boxes.length>1 ? Math.max(...boxes.map(box => box[axis]+box[size])) : vertical ? freeStageHeight(layout) : ARTBOARD_WIDTH;
    if (command.startsWith('spread-')) {
      if (boxes.length<3) return;
      boxes.sort((a,b) => a[axis]-b[axis]);
      const gap = (end-start-boxes.reduce((sum,box)=>sum+box[size],0))/(boxes.length-1);
      let position = start;
      for (const box of boxes) { box[axis] = position; position += box[size]+gap; }
    } else {
      const ratio = {...horizontalAlign,top:0,middle:.5,bottom:1}[command];
      if (ratio === undefined) return;
      for (const box of boxes) box[axis] = start+(end-start-box[size])*ratio;
    }
    setElements(next,layout.id);
  }

  function nudgeFreeBoxes(dx,dy) {
    const {layout} = currentFreeBox();
    const boxes = editableFreeSelection(layout);
    if (!boxes.length) return;
    const ids = new Set(boxes.map(box => box.id));
    const x = bound(dx,-Math.min(...boxes.map(box => box.x)),ARTBOARD_WIDTH-Math.max(...boxes.map(box => box.x+box.width)));
    const y = bound(dy,-Math.min(...boxes.map(box => box.y)),freeStageHeight(layout)-Math.max(...boxes.map(box => box.y+box.height)));
    if (!x && !y) return;
    const next = clone(elements);
    for (const box of next.find(item => item.id === layout.id).boxes) {
      if (ids.has(box.id)) { box.x += x; box.y += y; }
    }
    setElements(next,layout.id);
  }

  function startFreeGesture(event) {
    const surface = event.target.closest('[data-free-stage]');
    if (event.button === 0 && surface && freeDrawKind) { startFreeDraw(event,surface); return; }
    if (event.button !== 0 || event.target.closest('button,[contenteditable]')) return;
    const {layout,box,tile} = freeSelection(event.target);
    if (!box) {
      if (layout && surface) startFreeMarquee(event,surface,layout);
      return;
    }
    if (event.shiftKey) return;
    selectFreeBox(layout,box,tile,false,true);
    if (box.locked || box.hidden) return;
    const stage = tile.parentElement.getBoundingClientRect();
    const boxes = editableFreeSelection(layout);
    const targets = $$('.free-box.selected',tile.parentElement).filter(node => boxes.some(item => item.id === node.dataset.freeBox));
    const rects = targets.map(node => node.getBoundingClientRect());
    const left = Math.min(...rects.map(rect => rect.left)), right = Math.max(...rects.map(rect => rect.right));
    const top = Math.min(...rects.map(rect => rect.top)), bottom = Math.max(...rects.map(rect => rect.bottom));
    const rect = {left,right,top,bottom,width:right-left,height:bottom-top};
    const neighbors = $$('.free-box',tile.parentElement).filter(node => !targets.includes(node)).map(node => node.getBoundingClientRect());
    freeGesture = {layout,box,boxes,targets,tile,stage,rect,neighbors,handle:boxes.length === 1 ? event.target.dataset.freeSize : null,
      pointer:event.pointerId,startX:event.clientX,startY:event.clientY};
  }

  function moveFreeGesture(event) {
    if (freeDraw) { moveFreeDraw(event); return; }
    if (freeMarquee) { moveFreeMarquee(event); return; }
    const s = freeGesture;
    if (!s || s.pointer !== event.pointerId) return;
    const dx = event.clientX-s.startX, dy = event.clientY-s.startY;
    if (!s.moved && Math.hypot(dx,dy)<5) return;
    if (!s.moved) {
      s.moved = true;
      s.tile.setPointerCapture?.(event.pointerId);
    }
    event.preventDefault();
    const box = {...s.box};
    imageGuides.replaceChildren();
    if (s.handle) {
      const right = box.x+box.width, bottom = box.y+box.height;
      if (s.handle.includes('w')) {
        box.x = bound(box.x+dx/zoom,0,right-freeMinSize);
        box.width = right-box.x;
      } else box.width = bound(box.width+dx/zoom,freeMinSize,ARTBOARD_WIDTH-box.x);
      if (s.handle.includes('n')) {
        box.y = bound(box.y+dy/zoom,0,bottom-freeMinSize);
        box.height = bottom-box.y;
      } else box.height = bound(box.height+dy/zoom,freeMinSize,s.stage.height/zoom-box.y);
    } else {
      const guides = [s.stage,...s.neighbors];
      const x = snapImageAxis(s.rect.left,s.rect.width,dx,s.stage.left-s.rect.left,s.stage.right-s.rect.right,
        guides.map(r => [r.left,r.right]),['ซ้าย','กึ่งกลาง','ขวา']);
      const y = snapImageAxis(s.rect.top,s.rect.height,dy,s.stage.top-s.rect.top,s.stage.bottom-s.rect.bottom,
        guides.map(r => [r.top,r.bottom]),['บน','กึ่งกลาง','ล่าง']);
      s.positions = new Map(s.boxes.map(item => [item.id,{x:item.x+x.delta/zoom,y:item.y+y.delta/zoom}]));
      for (const node of s.targets) {
        const pos = s.positions.get(node.dataset.freeBox);
        node.style.left = `${pos.x}px`;
        node.style.top = `${pos.y}px`;
      }
      if (x.line !== undefined) paintImageGuide('x',x.line,x.label,s.stage);
      if (y.line !== undefined) paintImageGuide('y',y.line,y.label,s.stage);
      return;
    }
    s.next = box;
    s.tile.style.cssText = freeBoxStyle(box);
    if (s.handle && box.kind !== 'image') $('.free-artwork',s.tile).outerHTML = renderFreeArtwork(box);
    if (s.handle) showResizeGuides(s.tile,{handle:s.handle,parent:{left:s.stage.left,width:ARTBOARD_WIDTH},parentBounds:s.stage});
  }

  function finishFreeGesture(event) {
    if (freeDraw) { finishFreeDraw(event); return; }
    if (freeMarquee) { finishFreeMarquee(event); return; }
    const s = freeGesture;
    if (!s || s.pointer !== event.pointerId) return;
    freeGesture = null;
    if (!s.moved) return;
    imageGuides.replaceChildren();
    suppressImageClick = true;
    setTimeout(() => { suppressImageClick = false; },0);
    if (event.type === 'pointercancel') {
      renderArtboard();
      return;
    }
    if (s.positions) {
      const next = clone(elements);
      for (const box of next.find(item => item.id === s.layout.id).boxes) {
        if (s.positions.has(box.id)) Object.assign(box,s.positions.get(box.id));
      }
      setElements(next,s.layout.id);
      return;
    }
    changeFreeBox(s.layout,s.box,item => Object.assign(item,s.next));
  }

  async function addImageToFreeBox(file,layoutId,boxId,version) {
    if (!file?.type.startsWith('image/')) return;
    try {
      const asset = await prepareImageAsset(file);
      if (version !== editorDocumentVersion) return;
      const layout = elements.find(item => item.id === layoutId && item.type === 'freeLayout');
      const box = layout?.boxes.find(item => item.id === boxId && item.kind === 'image');
      if (!box || box.locked) return;
      selectOnlyFreeBox(box.id);
      changeFreeBox(layout,box,item => {
        item.src = asset.src;
        item.alt = file.name.replace(/\.[^.]+$/,'');
      });
    } catch {
      showToast('อ่านรูปภาพไม่สำเร็จ');
    }
  }

  function wrapFreeText(box,width) {
    const context = document.createElement('canvas').getContext('2d');
    context.font = `${box.italic?'italic ':''}${box.bold?'700 ':''}${box.fontSize}px ${freeFont(box)}`;
    const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('th',{granularity:'word'}) : null;
    return String(box.text || '').split('\n').flatMap(paragraph => {
      const lines = [];
      let line = '';
      const segments = segmenter ? segmenter.segment(paragraph) : Array.from(paragraph,segment => ({segment}));
      for (const {segment} of segments) {
        if (line && context.measureText(line+segment).width > width) {
          lines.push(line.trimEnd());
          line = '';
        }
        if (context.measureText(segment).width > width) {
          for (const char of segment) {
            if (line && context.measureText(line+char).width > width) { lines.push(line); line = ''; }
            line += char;
          }
        } else if (line || segment.trim()) line += segment;
      }
      return [...lines,line.trimEnd()];
    });
  }

  function freeVectorMarkup(box,id) {
      const round = bound(box.radius || 0,0,Math.min(80,box.width/2,box.height/2));
      const geometry = `x="${box.x}" y="${box.y}" width="${box.width}" height="${box.height}"`;
      const rectangle = `<rect ${geometry} rx="${round}" fill="${safeColor(box.background)}"/>`;
      if (box.kind === 'rect') return rectangle;
      if (box.kind === 'ellipse') return `<ellipse cx="${box.x+box.width/2}" cy="${box.y+box.height/2}" rx="${box.width/2}" ry="${box.height/2}" fill="${safeColor(box.background)}"/>`;
      if (freeShapePoints[box.kind]) {
        const points = freeShapePoints[box.kind].map(([x,y]) => `${box.x+x*box.width},${box.y+y*box.height}`).join(' ');
        return `<polygon points="${points}" fill="${safeColor(box.background)}"/>`;
      }
      if (box.kind === 'line') {
        const [x1,y1,x2,y2] = freeLineEnds(box);
        return `<line x1="${box.x+x1*box.width}" x2="${box.x+x2*box.width}" y1="${box.y+y1*box.height}" y2="${box.y+y2*box.height}" stroke="${safeColor(box.background)}" stroke-width="${box.stroke}" stroke-linecap="round"/>`;
      }
      const clipId = escapeHtml(id);
      const clip = `<defs><clipPath id="${clipId}"><rect ${geometry} rx="${round}"/></clipPath></defs>`;
      if (box.kind === 'image') {
        const source = /^(?:\/[^/]|https?:\/\/|data:image\/[\w.+-]+;base64,)/i.test(box.src || '') ? box.src : '';
        if (!source) return rectangle;
        return rectangle + clip + `<image ${geometry} href="${escapeHtml(source)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clipId})"><title>${escapeHtml(box.alt || 'รูปภาพ')}</title></image>`;
      }
      const align = ({left:'start',center:'middle',right:'end'})[box.textAlign] || 'start';
      const x = align === 'middle' ? box.x+box.width/2 : align === 'end' ? box.x+box.width-14 : box.x+14;
      const lineHeight = box.fontSize*1.4;
      const text = wrapFreeText(box,Math.max(1,box.width-28)).map((line,index) =>
        `<tspan x="${x}" y="${box.y+14+box.fontSize+lineHeight*index}">${escapeHtml(line)}</tspan>`).join('');
      return rectangle + clip + `<text font-family="${freeFont(box)}" font-size="${box.fontSize}" font-weight="${box.bold?700:400}" font-style="${box.italic?'italic':'normal'}" text-anchor="${align}" fill="${safeColor(box.color)}" clip-path="url(#${clipId})">${text}</text>`;
  }

  function exportFreeLayout(layout) {
    const height = Math.ceil(freeStageHeight(layout));
    const parts = layout.boxes.filter(box => !box.hidden).map(box => {
      const content = freeVectorMarkup(box,`free-${layout.id}-${box.id}`);
      return `<g opacity="${freeOpacity(box)}"${box.rotation?` transform="rotate(${box.rotation} ${box.x+box.width/2} ${box.y+box.height/2})"`:''}>${content}</g>`;
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 ${ARTBOARD_WIDTH} ${height}" role="img"><title>พื้นที่ออกแบบอิสระ</title>\n<rect width="${ARTBOARD_WIDTH}" height="${height}" fill="#ffffff"/>\n${parts.join('\n')}\n</svg>`;
  }

  const freeWebpName = layout => `reflection-${layout.id}.webp`;

  function applyCropFrame(frame, ratio) {
    frame.classList.add('board-crop-frame');
    frame.style.setProperty('--board-crop-ratio',ratio);
  }

  function applyImageCrops(block, element) {
    for (const frame of block.querySelectorAll(boardImageFrame)) {
      const source = frame.hasAttribute('data-source-frame');
      const index = frame.dataset.sourceFrame;
      const ratio = source ? element.imageCropRatios?.[index] : element.cropRatio;
      if (Number.isFinite(ratio) && ratio > 0) applyCropFrame(frame,ratio);
      const offset = source ? element.imageOffsets?.[index] : element.imageOffset;
      if (Number.isFinite(offset) && offset) frame.style.setProperty('--board-image-offset',`${offset}%`);
      const offsetY = source ? element.imageOffsetsY?.[index] : element.imageOffsetY;
      if (Number.isFinite(offsetY) && offsetY) frame.style.setProperty('--board-image-offset-y',`${offsetY}px`);
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
    artboard.append(inlineRemove,imageGuides);
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
    renderCmsControls();
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
      const audioTags = element.markup.match(/<audio\b[^>]*>/gi) || [];
      if (audioTags.length) {
        fields += '<div class="inspector-group"><h3>เสียง</h3>' + audioTags.map((tag,index) => {
          const src = tag.match(/\bsrc=(["'])(.*?)\1/i)?.[2] || '';
          return field(`ที่อยู่ไฟล์เสียง ${index+1}`,`<input type="text" data-prop="templateAudioSrc" data-audio-index="${index}" value="${escapeHtml(src)}" placeholder="/storage/newsroom/.../Reflection.mp4">`);
        }).join('') + '</div>';
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
    renderFreeProperties();
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

  function legacyBlockDefaults(legacyType) {
    return {
      legacyType,
      text:['subtitle','subtitleAudio'].includes(legacyType)?'Lorem....':'',
      variant:legacyType==='contentMedia'?'1':legacyType==='contentSpeakers'?'2':'left',
      audioSrc:'',src:'',alt:'',width:legacyDefaultWidth(legacyType),title:'หัวข้อเรื่องราว',text2:'เพิ่มรายละเอียดของเรื่องราวในย่อหน้าที่สอง',caption:legacyType.startsWith('highlight')?'เขียนข้อความประกอบรูปภาพที่นี่':'คำบรรยายรูปภาพที่หนึ่ง\nคำบรรยายรูปภาพที่สอง',label:'อ่านข้อมูลเพิ่มเติม',quote:'เพิ่มคำพูดสำคัญที่ต้องการเน้น',author:'ชื่อผู้พูด',media1Title:'หัวข้อประกอบไอคอน',media1Text:'เพิ่มข้อความอธิบายรายละเอียด',media2Title:'อีกหนึ่งประเด็นสำคัญ',media2Text:'เพิ่มข้อความอธิบายรายละเอียด',text:legacyType==='subtitle'||legacyType==='subtitleAudio'?'หัวข้อเรื่องราวของคุณ':legacyType==='contentText'?'เขียนรายละเอียดเรื่องราวของคุณที่นี่':legacyType==='contentBlockquote'?'เพิ่มข้อความอ้างอิงที่ต้องการเน้น':legacyType==='contentModal'?'เพิ่มรายละเอียดเพิ่มเติมสำหรับหน้าต่าง Popup':'ข้อความประกอบเรื่องราวของคุณ',speakers:[{quote:'เพิ่มคำพูดของผู้พูดคนที่หนึ่ง',name:'ชื่อผู้พูดคนที่หนึ่ง'},{quote:'เพิ่มคำพูดของผู้พูดคนที่สอง',name:'ชื่อผู้พูดคนที่สอง'},{quote:'เพิ่มคำพูดของผู้พูดคนที่สาม',name:'ชื่อผู้พูดคนที่สาม'}]
    };
  }

  function addLegacyBlock(legacyType,index) {
    if (!legacyBlockMap.has(legacyType)) return;
    insertBlock('legacy',index,legacyBlockDefaults(legacyType));
  }

  function dropPhotoKind(key) {
    if (/^(?:legacy|cms-content):(?:contentQuoteImage|highlightImage)$/.test(key || '')) return {type:'legacy',legacyType:key.split(':')[1]};
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
      renderCmsControls();
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
    if (element.type === 'sourcePage') {
      selectedId = element.id;
      sourceImageSelection = {elementId:element.id,index:sourceIndex};
    }
    activeImage = {elementId:element.id,sourceIndex};
    activeTextField = null;
    const rect = imageBox.getBoundingClientRect();
    const width = rect.width / zoom;
    const startingPercent = element.type === 'sourcePage' ? sourceFrameWidthPercent(imageBox) : Number(element.width) || (element.type === 'legacy' ? legacyDefaultWidth(element.legacyType) : 100);
    const widthPercent = Math.max(10,Math.min(imageMaxPercent(element),startingPercent));
    const height = Math.max(1,rect.height / zoom);
    const side = handle.dataset.resizeHandle;
    const parent = imageFrameContainer(imageBox);
    resizeState = {
      id:element.id,handle:side,sourceIndex,startX:event.clientX,startY:event.clientY,
      startWidth:widthPercent,baseWidth:width/(widthPercent/100),frameWidth:width,frameHeight:height,
      aspect:width/height,fixedEdge:side === 'w' ? rect.right : rect.left,parent,
      parentBounds:imageBox.parentElement.getBoundingClientRect(),before:clone(elements),block
    };
    block.setAttribute('draggable','false');
    try { handle.setPointerCapture?.(event.pointerId); } catch {}
    document.addEventListener('pointermove',resizeImageMove);
    document.addEventListener('pointerup',finishImageResize,{once:true});
    document.addEventListener('pointercancel',finishImageResize,{once:true});
    document.addEventListener('mousemove',resizeImageMove);
    document.addEventListener('mouseup',finishImageResize,{once:true});
  }

  function imageFrameContainer(frame) {
    const parent = frame.parentElement;
    const style = getComputedStyle(parent);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    return {
      left:parent.getBoundingClientRect().left + (parent.clientLeft+paddingLeft)*zoom,
      width:Math.max(1,parent.clientWidth-paddingLeft-paddingRight)
    };
  }

  const imageGuides = document.createElement('div');
  imageGuides.className = 'board-image-guides';
  imageGuides.setAttribute('aria-hidden','true');

  function selectedBoardImage() {
    if (activeImage?.elementId !== selectedId) return null;
    const block = $(`.board-section[data-id="${CSS.escape(selectedId)}"]`,artboard);
    const selector = activeImage.sourceIndex === null ? boardImageFrame : `[data-source-frame="${activeImage.sourceIndex}"]`;
    return block?.querySelector(selector) || null;
  }

  function imagePosition(frame) {
    const block = frame.closest('.board-section');
    const item = elements.find(element => element.id === block?.dataset.id);
    if (!item) return null;
    const sourceIndex = frame.hasAttribute('data-source-frame') ? Number(frame.dataset.sourceFrame) : null;
    const offset = sourceIndex === null ? item.imageOffset : item.imageOffsets?.[sourceIndex];
    const offsetY = sourceIndex === null ? item.imageOffsetY : item.imageOffsetsY?.[sourceIndex];
    return {item,block,sourceIndex,offset:offset || 0,offsetY:offsetY || 0};
  }

  function setImagePosition(item,index,x,y) {
    if (index === null) {
      item.imageOffset = x;
      item.imageOffsetY = y;
    } else {
      item.imageOffsets ||= {};
      item.imageOffsetsY ||= {};
      item.imageOffsets[index] = x;
      item.imageOffsetsY[index] = y;
    }
  }

  function selectBoardImage(frame) {
    const pos = imagePosition(frame);
    if (!pos) return;
    activeImage = {elementId:pos.item.id,sourceIndex:pos.sourceIndex};
    activeTextField = null;
    if (pos.sourceIndex !== null) sourceImageSelection = {elementId:pos.item.id,index:pos.sourceIndex};
  }

  function alignBoardImage(align) {
    const frame = selectedBoardImage();
    if (!frame) return;
    const pos = imagePosition(frame);
    const area = imageFrameContainer(frame);
    const rect = frame.getBoundingClientRect();
    const remaining = Math.max(0,area.width*zoom-rect.width);
    const wanted = area.left + remaining * horizontalAlign[align];
    const offset = pos.offset+(wanted-rect.left)/zoom/area.width*100;
    if (Math.abs(offset-pos.offset)<.02) return;
    const next = clone(elements);
    setImagePosition(next.find(item => item.id === pos.item.id),pos.sourceIndex,offset,pos.offsetY);
    setElements(next,pos.item.id);
  }

  function paintImageGuide(axis, position, label, bounds) {
    const board = artboard.getBoundingClientRect();
    const line = document.createElement('div');
    line.className = `image-guide image-guide-${axis}`;
    line.style.setProperty('--guide-position',`${(position-(axis==='x'?board.left:board.top))/zoom}px`);
    if (bounds) {
      line.classList.add('image-guide-local');
      const start = axis === 'x' ? bounds.top-board.top : bounds.left-board.left;
      const length = axis === 'x' ? bounds.height : bounds.width;
      line.style.setProperty('--guide-start',`${start/zoom}px`);
      line.style.setProperty('--guide-length',`${length/zoom}px`);
    }
    if (label) {
      const chip = document.createElement('span');
      chip.textContent = label;
      line.append(chip);
    }
    imageGuides.append(line);
  }

  function showResizeGuides(frame,state) {
    imageGuides.replaceChildren();
    const rect = frame.getBoundingClientRect();
    const board = artboard.getBoundingClientRect();
    const {handle,parent,parentBounds} = state;
    const show = (axis,edge,references,labels) => {
      const anchors = references.flatMap(([start,end]) => [start,(start+end)/2,end].map((line,index) => ({line,label:labels[index]})));
      const nearest = anchors.sort((a,b) => Math.abs(edge-a.line)-Math.abs(edge-b.line))[0];
      if (nearest && Math.abs(edge-nearest.line)<=8) paintImageGuide(axis,nearest.line,nearest.label);
    };
    if (handle.includes('w') || handle.includes('e')) {
      show('x',handle.includes('w')?rect.left:rect.right,
        [[parent.left,parent.left+parent.width*zoom],[board.left,board.right]],['ซ้าย','กึ่งกลาง','ขวา']);
    }
    if (handle.includes('n') || handle.includes('s')) {
      show('y',handle.includes('n')?rect.top:rect.bottom,
        [[parentBounds.top,parentBounds.bottom],[board.top,board.bottom]],['บน','กึ่งกลาง','ล่าง']);
    }
  }

  function snapImageAxis(start,length,delta,min,max,references,labels) {
    const bounded = Math.max(min,Math.min(max,delta));
    let closest;
    for (const [edge,end] of references) {
      for (const fraction of [0,.5,1]) {
        const line = edge+(end-edge)*fraction;
        const aligned = line-start-length*fraction;
        if (aligned < min-.5 || aligned > max+.5) continue;
        const gap = Math.abs(aligned-bounded);
        if (gap <= 8 && (!closest || gap < closest.gap)) {
          closest = {delta:aligned,line,label:labels[fraction*2],gap};
        }
      }
    }
    return closest || {delta:bounded};
  }

  function startImageMove(event) {
    const frame = event.target.closest(boardImageFrame);
    if (event.button !== 0 || !frame || frame.matches('.free-image-frame') || resizeState || event.target.closest('[data-resize-handle],.source-image-replace,.image-replace-trigger')) return;
    const pos = imagePosition(frame);
    if (!pos) return;
    const rect = frame.getBoundingClientRect();
    const area = imageFrameContainer(frame);
    const board = artboard.getBoundingClientRect();
    const parent = frame.parentElement.getBoundingClientRect();
    const body = pos.block.lastElementChild.getBoundingClientRect();
    const minY = Math.min(0,body.top-rect.top);
    const maxY = Math.max(0,body.bottom-rect.bottom);
    imageMove = {frame,pos,rect,area,board,parent,body,minY,maxY,pointer:event.pointerId,startX:event.clientX,startY:event.clientY};
  }

  document.addEventListener('pointermove',event => {
    if (!imageMove || event.pointerId !== imageMove.pointer) return;
    const m = imageMove;
    const dx = event.clientX-m.startX, dy = event.clientY-m.startY;
    if (!m.started && Math.hypot(dx,dy)<5) return;
    if (!m.started) {
      m.started = true;
      m.frame.setPointerCapture?.(event.pointerId);
      m.frame.classList.add('image-moving');
      inlineRemove.hidden = true;
    }
    event.preventDefault();
    const right = m.area.left+m.area.width*zoom;
    const x = snapImageAxis(m.rect.left,m.rect.width,dx,Math.min(0,m.area.left-m.rect.left),Math.max(0,right-m.rect.right),
      [[m.area.left,right],[m.board.left,m.board.right]],['ซ้าย','กึ่งกลาง','ขวา']);
    const y = snapImageAxis(m.rect.top,m.rect.height,dy,m.minY,m.maxY,
      [[m.parent.top,m.parent.bottom],[m.body.top,m.body.bottom],[m.board.top,m.board.bottom]],['บน','กึ่งกลาง','ล่าง']);
    m.x = m.pos.offset+x.delta/zoom/m.area.width*100;
    m.y = m.pos.offsetY+y.delta/zoom;
    m.frame.style.setProperty('--board-image-offset',`${m.x}%`);
    m.frame.style.setProperty('--board-image-offset-y',`${m.y}px`);
    imageGuides.replaceChildren();
    if (x.line !== undefined) paintImageGuide('x',x.line,x.label);
    if (y.line !== undefined) paintImageGuide('y',y.line,y.label);
  },{passive:false});

  function finishImageMove(event) {
    if (!imageMove || event.pointerId !== imageMove.pointer) return;
    const m = imageMove;
    imageMove = null;
    if (!m.started) return;
    imageGuides.replaceChildren();
    m.frame.classList.remove('image-moving');
    suppressImageClick = true;
    setTimeout(() => { suppressImageClick = false; },0);
    selectBoardImage(m.frame);
    if (event.type === 'pointercancel') {
      selectedId = m.pos.item.id;
      renderAll();
      return;
    }
    const next = clone(elements);
    setImagePosition(next.find(item => item.id === m.pos.item.id),m.pos.sourceIndex,m.x,m.y);
    setElements(next,m.pos.item.id);
  }
  document.addEventListener('pointerup',finishImageMove);
  document.addEventListener('pointercancel',finishImageMove);

  function sourceFrameWidthPercent(frame) {
    return frame.getBoundingClientRect().width / zoom / imageFrameContainer(frame).width * 100;
  }

  function setFrameCrop(element,frame,ratio) {
    if (element.type === 'sourcePage') {
      element.imageCropRatios ||= {};
      element.imageCropRatios[frame.dataset.sourceFrame] = ratio;
    } else element.cropRatio = ratio;
    applyCropFrame(frame,ratio);
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
    if (hasY && !hasX && imageBox) {
      if (Math.abs(dy) < 1 && !resizeState.cropping) return;
      resizeState.cropping = true;
      const ratio = Math.max(.25,Math.min(5,resizeState.aspect / Math.max(.01,1 + dy / resizeState.frameWidth)));
      setFrameCrop(el,imageBox,ratio);
      showResizeGuides(imageBox,resizeState);
      return;
    }
    const delta = hasX && hasY ? (Math.abs(dx)>=Math.abs(dy)?dx:dy) : hasX ? dx : dy;
    const sideOnly = hasX && !hasY;
    const {baseWidth,fixedEdge,parent,startWidth} = resizeState;
    const sideSpace = handle === 'w' ? (fixedEdge-parent.left)/zoom : parent.width-(fixedEdge-parent.left)/zoom;
    const maxWidth = sideOnly ? Math.min(imageMaxPercent(el),Math.max(startWidth,sideSpace/baseWidth*100)) : imageMaxPercent(el);
    const width = Math.max(10,Math.min(maxWidth,startWidth + delta / baseWidth * 100));
    if(el.type==='sourcePage') {el.imageWidths ||= {};el.imageWidths[resizeState.sourceIndex]=width;}
    else el.width = width;
    if (el.type === 'image') {
      imageBox?.parentElement.style.setProperty('--image-width',`${imageSlotPercent(el)}%`);
    } else if (imageBox) {
      const baseline = el.type === 'legacy' ? legacyDefaultWidth(el.legacyType) : 100;
      imageBox.style.width = `${Math.max(10,Math.min(100,width/baseline*100))}%`;
    }
    if (sideOnly && imageBox) {
      imageBox.style.removeProperty('--board-image-offset');
      const resized = imageBox.getBoundingClientRect();
      setFrameCrop(el,imageBox,resized.width/zoom/resizeState.frameHeight);
      // Body layout can center images. Pin the opposite edge of the frame during the drag.
      const neutral = imageBox.getBoundingClientRect();
      const offset = (fixedEdge-(handle === 'w' ? neutral.right : neutral.left))/zoom/parent.width*100;
      imageBox.style.setProperty('--board-image-offset',`${offset}%`);
      if (el.type === 'sourcePage') {
        el.imageOffsets ||= {};
        el.imageOffsets[resizeState.sourceIndex] = offset;
      } else el.imageOffset = offset;
    }
    if (imageBox) showResizeGuides(imageBox,resizeState);
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
    imageGuides.replaceChildren();
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
    const image = !node && selectedBoardImage();
    const free = !node && !image && currentFreeBox().box;
    const item = elements.find(element => element.id === selectedId);
    placeInlineRemove(node);
    const source = node?.hasAttribute('data-source-edit');
    const format = source ? {
      bold:Boolean(wholeTextMark(node,'strong')), italic:Boolean(wholeTextMark(node,'em')),
      align:textAlignClasses.find(name => node.classList.contains(name))?.slice(5)
    } : item?.textFormats?.[activeTextField?.key];
    $$('[data-text-format]',boardTextTools).forEach(button => {
      const key = button.dataset.textFormat;
      const isAlignment = ['left','center','right'].includes(key);
      button.disabled = !node && !((image || free) && isAlignment);
      if (isAlignment) {
        const label = `${{left:'ชิดซ้าย',center:'กึ่งกลาง',right:'ชิดขวา'}[key]}${image ? 'รูปภาพ' : free ? 'กล่อง' : ''}`;
        button.setAttribute('aria-label',label);
        button.title = label;
      }
      const isPressed = key === 'bold' || key === 'italic' ? Boolean(format?.[key]) : (format?.align || 'left') === key;
      let imageAligned = false;
      if (image && isAlignment) {
        const area = imageFrameContainer(image);
        const rect = image.getBoundingClientRect();
        const spare = Math.max(0,area.width*zoom-rect.width);
        imageAligned = Math.abs(rect.left-area.left-spare*horizontalAlign[key]) < 2 && (spare > 2 || key === 'center');
      }
      const freeAligned = free && isAlignment && Math.abs(free.x-(ARTBOARD_WIDTH-free.width)*horizontalAlign[key]) < 1;
      button.setAttribute('aria-pressed',String(Boolean(node && isPressed || imageAligned || freeAligned)));
    });
  }

  function placeInlineRemove(target) {
    inlineRemoveTarget = target?.isConnected ? target : null;
    const rect = inlineRemoveTarget?.getBoundingClientRect();
    const board = artboard.getBoundingClientRect();
    if (!rect?.width || !board.width) {
      inlineRemove.hidden = true;
      return;
    }
    const scale = board.width / artboard.offsetWidth;
    const text = inlineRemoveTarget.matches('[contenteditable="true"]');
    const label = inlineRemoveTarget.matches('audio,.mock-player') ? 'ลบเสียงส่วนนี้' :
      text ? 'ลบข้อความส่วนนี้' : 'ลบรูปส่วนนี้';
    inlineRemove.setAttribute('aria-label',label);
    inlineRemove.title = label;
    inlineRemove.style.left = `${Math.min(artboard.clientWidth-14,(rect.right-board.left)/scale)}px`;
    inlineRemove.style.top = `${(rect.top-board.top)/scale - (text ? 0 : 8)}px`;
    inlineRemove.hidden = false;
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

  function removeCompositeText(item, anchor) {
    const block = anchor.closest('[data-id]');
    if (document.activeElement === anchor) anchor.blur();
    const marked = clone(item);
    const part = anchor.dataset.part;
    const speaker = anchor.dataset.boardSpeaker;
    const fields = speaker === undefined ? marked : marked.speakers?.[speaker];
    if (!fields || !part) return;
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
    unit.remove();
    const originals = $$('img',doc.content).map(img => img.outerHTML);
    const uploads = $$(boardImageFrame,block).map(frame => frame.querySelector('img')).filter(Boolean);
    $$('img',doc.content).forEach((img,index) => {
      img.dataset.templatePlaceholder = Number(img.getAttribute('width')) <= 60 && img.hasAttribute('width') ? 'square' : 'wide';
      if (!uploads[index]) return;
      img.setAttribute('src',uploads[index].getAttribute('src'));
      img.setAttribute('alt',uploads[index].alt);
    });
    const replacement = {
      ...item,type:'sourcePage',sourcePath:[],sourceKind:'composite',visualTemplate:true,
      title:$('.board-section-header b',block).textContent,markup:doc.innerHTML,originalImages:originals,
      imageCount:originals.length,imageCropRatios:item.cropRatio?{0:item.cropRatio}:{},
      imageOffsets:item.imageOffset?{0:item.imageOffset}:{},imageOffsetsY:item.imageOffsetY?{0:item.imageOffsetY}:{}
    };
    activeTextField = null;
    sourceTextSelection = null;
    sourceImageSelection = null;
    setElements(elements.map(value => value.id === item.id ? replacement : value),item.id);
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

  function removeBoardText(anchor) {
    const id = anchor?.closest('[data-id]')?.dataset.id;
    const item = elements.find(element => element.id === id);
    if (!item) return;
    const nested = anchor.parentElement?.closest('[data-studio-nest]');
    if (nested === anchor.parentElement && anchor.matches(':nth-child(2):last-child')) {
      removeNestedTool(nested.querySelector(':scope > .nested-tool-bar [data-remove-nested]'));
      return;
    }
    const root = anchor.closest('[data-source-render]');
    if (root) {
      if (!allowsNestedText(item) && sourceTextNodes(root).length === 1 && !root.querySelector('img,audio,video')) {
        removeBoardElement(item.id);
      } else changeSourceText(root,anchor,'remove');
    } else if (!allowsNestedText(item)) removeBoardElement(item.id);
    else removeCompositeText(item,anchor);
    updateBoardTextTools();
  }

  const nestedColumn = ':is(div,section,article)[class*="col-"]';
  const legacyColumn = '.split-quote-preview-copy,.split-quote-preview-image,.split-copy,.split-image,.columns-block > div,.example-media-column,.example-quote-body,.example-portrait';
  const singleColumnTools = new Set(['subtitle','subtitleAudio','audio','contentHeading','contentText','contentBlockquote','contentQuoteImage']);

  function nestedTool(key) {
    const template = key?.match(/^template-tool:(\w+)$/);
    if (template) return templateToolRecipes.has(template[1]) ? {recipe:templateToolRecipes.get(template[1])} : null;
    const legacy = key?.match(/^(?:legacy|cms-content):(\w+)$/);
    if (legacy) return legacyBlockMap.has(legacy[1]) ? {type:'legacy',...legacyBlockDefaults(legacy[1])} : null;
    const free = key?.match(/^(?:insert:)?(heading|text|image|quote|split|divider|banner|button|columns|spacer)(?:\|(normal|highlight|green|greenText))?$/);
    return free ? {type:free[1],...imageInsertOptions(free[2])} : null;
  }

  function nestedDropPoint(event) {
    const block = event.target.closest('.board-section[data-id]');
    if (!block || event.target.closest('.board-section-header,[data-remove-nested]')) return null;
    const root = block.querySelector('[data-source-render]');
    const item = elements.find(record => record.id === block.dataset.id);
    if (!item || item.type === 'freeLayout' || elements.some(el => el.id === draggedId && el.type === 'freeLayout')) return null;
    const closestColumn = event.target.closest(root ? nestedColumn : legacyColumn);
    const column = closestColumn && (root || block).contains(closestColumn) ? closestColumn : null;
    const wrapper = event.target.closest('[data-studio-nest]');
    const bar = event.target.closest('.nested-tool-bar');
    const anchor = event.target.closest('[contenteditable="true"]') || (bar ? wrapper : null);
    const zone = (bar && wrapper?.parentElement) || column || wrapper || root || block.lastElementChild;
    const rect = zone.getBoundingClientRect();
    if (!column && !anchor && !wrapper && (event.clientY < rect.top+10 || event.clientY > rect.bottom-10)) return null;
    return {block,item,root,column,zone,anchor,wrapper,x:event.clientX,y:event.clientY};
  }

  function originalImageTags(item) {
    return item.originalImages || templates.find(template => template.id === item.sourceId)?.markup?.match(/<img\b[^>]*>/gi) || [];
  }

  function snapshotNestedSource(item, liveRoot) {
    const root = liveRoot ? liveRoot.cloneNode(true) : document.createElement('div');
    const images = new Map();
    if (!liveRoot) {
      const greenStyle = item.type === 'image' && ['green','greenText'].includes(item.imageStyle);
      root.innerHTML = item.type === 'sourcePage' ? wrapTemplateFragment(item.markup,item.sourcePath || []) :
        greenStyle ? legacyPatterns.generateHtml([{...item,type:item.imageStyle === 'greenText'?'highlightGreenText':'highlightGreenEmpty',src:''}]) :
          buildExport([item]);
    }
    const originals = originalImageTags(item);
    $$('img',root).forEach((img,index) => {
      if (!liveRoot && item.type !== 'sourcePage') {
        const width = Number(img.getAttribute('width'));
        img.dataset.templatePlaceholder = width && width <= 60 ? 'square' : 'wide';
        const path = img.getAttribute('src')?.replace(/\/quote-\d+\.webp$/,`/quote-${item.id}-${index+1}.webp`);
        if (path) img.setAttribute('src',path);
      }
      const original = item.type === 'sourcePage' ? originals[index] : img.outerHTML;
      images.set(img,{original,width:item.imageWidths?.[index],crop:item.imageCropRatios?.[index] ?? (index === 0 ? item.cropRatio : undefined),
        offset:item.imageOffsets?.[index] ?? (index === 0 ? item.imageOffset : undefined),
        offsetY:item.imageOffsetsY?.[index] ?? (index === 0 ? item.imageOffsetY : undefined)});
      if (!liveRoot && index === 0 && item.src && item.type !== 'sourcePage') {
        img.setAttribute('src',item.src);
        img.setAttribute('alt',item.alt || '');
      }
    });
    return {root,images};
  }

  function sourceBlockFromSnapshot(item,snapshot,title) {
    $$('[data-studio-photo-row]',snapshot.root).forEach(row => {
      for (const cell of [...row.children]) if (!cell.children.length) cell.remove();
      const count = row.children.length;
      if (count < 2) row.replaceWith(...(row.firstElementChild?.childNodes || []));
      else for (const cell of row.children) cell.className = {2:'col-md-6',3:'col-md-4',4:'col-md-3'}[count];
    });
    const records = $$('img',snapshot.root).map(img => snapshot.images.get(img) || {});
    const settings = key => Object.fromEntries(records.flatMap((record,index) => record[key] === undefined ? [] : [[index,record[key]]]));
    return {
      ...item,type:'sourcePage',sourceKind:'composite',visualTemplate:true,title,
      sourcePath:item.type === 'sourcePage' ? item.sourcePath || [] : [],studioRowId:undefined,
      markup:sourceHtmlFromPreview(snapshot.root,true),
      originalImages:records.map(record => record.original || null),imageCount:records.length,
      imageWidths:settings('width'),imageCropRatios:settings('crop'),imageOffsets:settings('offset'),imageOffsetsY:settings('offsetY')
    };
  }

  function counterpart(node,liveRoot,copyRoot) {
    const steps = [];
    while (node && node !== liveRoot) {
      const parent = node.parentElement;
      if (!parent) return null;
      steps.unshift([...parent.children].indexOf(node));
      node = parent;
    }
    return node === liveRoot ? steps.reduce((parent,index) => parent?.children[index],copyRoot) : null;
  }

  function convertedDropColumn(point,root) {
    const rows = $$('.row',root).map(row => [...row.children].filter(child => child.matches(nestedColumn)));
    const columns = rows.find(items => items.length > 1) || rows.find(items => items.length);
    if (!columns) return root;
    const media = columns.filter(col => col.querySelector('img'));
    if (media.length === 1 && point.column) {
      if (point.column.matches('.split-quote-preview-image,.split-image,.example-portrait')) return media[0];
      if (point.column.matches('.split-quote-preview-copy,.split-copy,.example-quote-body')) return columns.find(col => col !== media[0]) || columns[0];
    }
    const rect = point.block.getBoundingClientRect();
    const index = Math.max(0,Math.min(columns.length-1,Math.floor((point.x-rect.left)/Math.max(1,rect.width)*columns.length)));
    return columns[index];
  }

  function nestedInsertionAnchor(point,zone) {
    const liveZone = point.zone;
    if (!liveZone) return null;
    let live = point.anchor;
    if (!liveZone.contains(live)) live = null;
    while (live && live !== liveZone && live.parentElement !== liveZone) live = live.parentElement;
    if (point.root && live && live !== liveZone) return {node:counterpart(live,liveZone,zone),before:point.y < live.getBoundingClientRect().top+live.getBoundingClientRect().height/2};
    const candidates = [...liveZone.children].filter(node => !node.matches('[data-template-preview-only]'));
    const index = candidates.findIndex(node => {
      const rect = node.getBoundingClientRect();
      return point.y < rect.top + rect.height/2;
    });
    if (index < 0) return null;
    const node = point.root ? counterpart(candidates[index],liveZone,zone) : zone.children[index];
    return {node,before:true};
  }

  function materializeNestedTool(item) {
    const snapshot = snapshotNestedSource(item);
    if (item.type === 'legacy' && singleColumnTools.has(item.legacyType)) {
      let column = snapshot.root;
      while (column.children.length === 1 && column.firstElementChild.matches(`.container,.row,${nestedColumn}`)) column = column.firstElementChild;
      return {snapshot,content:column};
    }
    return {snapshot,content:snapshot.root};
  }

  function isNestedPhoto(wrapper) {
    return wrapper && $$('img',wrapper).length === 1 && !wrapper.querySelector('[data-studio-nest],audio,video') &&
      ![...wrapper.childNodes].some(node => node.nodeType === Node.TEXT_NODE
        ? node.textContent.trim()
        : node.nodeType === Node.ELEMENT_NODE && !node.matches('[data-template-preview-only],.source-image-frame') &&
          node.textContent.trim() && !node.querySelector('.source-image-frame'));
  }

  function nestedPhotoDrop(event,key,movingId) {
    const frame = event.target.closest('.source-image-frame');
    const wrapper = frame?.closest('[data-studio-nest]');
    if (!isNestedPhoto(wrapper)) return null;
    const moving = draggedNested && $(`[data-studio-nest="${CSS.escape(draggedNested.id)}"]`,artboard);
    if (moving === wrapper || (!dropPhotoKind(key) && !isRowPhoto(elements.find(item => item.id === movingId)) && !isNestedPhoto(moving))) return null;
    const row = wrapper.parentElement.closest('[data-studio-photo-row]');
    const rect = frame.getBoundingClientRect();
    return {wrapper,full:row?.children.length >= photoRowLimit && !row.contains(moving),after:event.clientX >= rect.left+rect.width/2};
  }

  function putNestedPhotoBeside(target,wrapper,after) {
    let row = target.parentElement.closest('[data-studio-photo-row]');
    let cell = target.parentElement;
    if (!row) {
      row = document.createElement('div');
      row.className = 'row';
      row.setAttribute('data-studio-photo-row','');
      cell = document.createElement('div');
      target.before(row);
      cell.append(target);
      row.append(cell);
    }
    const added = document.createElement('div');
    added.append(wrapper);
    if (after) cell.after(added);
    else cell.before(added);
  }

  function makeNestedWrapper(item,snapshot) {
    const {snapshot:material,content} = materializeNestedTool(item);
    const wrapper = document.createElement('div');
    wrapper.dataset.studioNest = item.id;
    wrapper.dataset.studioName = item.type === 'legacy' ? shelfLabels[item.legacyType] || legacyElementName(item) : item.title && item.type === 'sourcePage' ? item.title : item.type === 'image' ? imageStyleName(item.imageStyle) : titleFor(item.type);
    wrapper.append(...content.childNodes);
    for (const [img,record] of material.images) snapshot.images.set(img,record);
    return wrapper;
  }

  function insertNestedTool(point,definition,movingId,photo) {
    const moving = elements.find(item => item.id === movingId);
    if (!definition && !moving || moving?.id === point.item.id) return;
    if (photo?.full) { showToast('หนึ่งแถวใส่ได้สูงสุด 4 รูป'); return; }
    if (point.block.contains(document.activeElement)) document.activeElement.blur();
    const recipe = definition?.recipe;
    const item = moving || (recipe
      ? makeElement('sourcePage',{...clone(recipe),sourcePath:[],markup:wrapTemplateFragment(recipe.markup,recipe.sourcePath)})
      : makeElement(definition.type,definition));
    const snapshot = snapshotNestedSource(point.item,point.root);
    const zone = point.root ? counterpart(point.zone,point.root,snapshot.root) || snapshot.root : convertedDropColumn(point,snapshot.root);
    const anchor = nestedInsertionAnchor(point,zone);
    const wrapper = makeNestedWrapper(item,snapshot);
    if (photo) {
      putNestedPhotoBeside(counterpart(photo.wrapper,point.root,snapshot.root),wrapper,photo.after);
    } else if (anchor?.node?.parentElement === zone) {
      if (anchor.before) anchor.node.before(wrapper);
      else anchor.node.after(wrapper);
    } else zone.append(wrapper);
    const replacement = sourceBlockFromSnapshot(point.item,snapshot,$('.board-section-header b',point.block).textContent);
    activeTextField = null;
    sourceTextSelection = null;
    sourceImageSelection = null;
    setElements(elements.filter(value => value.id !== moving?.id).map(value => value.id === point.item.id ? replacement : value),point.item.id);
    focusNewText($(`[data-studio-nest="${CSS.escape(item.id)}"] [contenteditable="true"]`,artboard));
  }

  function removeNestedTool(button) {
    const wrapper = button.closest('[data-studio-nest]');
    const block = wrapper?.closest('[data-id]');
    const root = wrapper?.closest('[data-source-render]');
    const item = elements.find(value => value.id === block?.dataset.id);
    if (!root || !item) return;
    if (root.contains(document.activeElement)) document.activeElement.blur();
    const snapshot = snapshotNestedSource(item,root);
    counterpart(wrapper,root,snapshot.root)?.remove();
    const replacement = sourceBlockFromSnapshot(item,snapshot,item.title);
    activeTextField = null;
    sourceTextSelection = null;
    sourceImageSelection = null;
    setElements(elements.map(value => value.id === item.id ? replacement : value),item.id);
  }

  function removeBoardMedia(target) {
    const block = target.closest('.board-section[data-id]');
    const item = elements.find(value => value.id === block?.dataset.id);
    if (!item) return;
    const audio = target.matches('audio,.mock-player');
    const nested = target.closest('[data-studio-nest]');
    if (!audio && isNestedPhoto(nested)) {
      removeNestedTool(nested.querySelector(':scope > .nested-tool-bar [data-remove-nested]'));
      return;
    }
    if (isRowPhoto(item) || item.type === 'image' && item.imageStyle !== 'greenText' ||
      item.type === 'legacy' && item.legacyType === 'audio' ||
      item.type === 'sourcePage' && item.sourceKind === 'audio' && !target.closest('[data-studio-nest]') &&
        !target.closest('[data-source-render]')?.querySelector('[data-source-edit]')) {
      removeBoardElement(item.id);
      return;
    }
    const live = block.querySelector('[data-source-render]');
    const snapshot = snapshotNestedSource(item,live);
    const candidates = audio ? 'audio,.mock-player' : boardImageFrame;
    const index = $$(candidates,block).indexOf(target);
    const asset = audio ? $$('audio',snapshot.root)[index] :
      live ? counterpart(target,live,snapshot.root) : $$('img',snapshot.root)[index];
    if (!asset) return;
    const figure = asset.closest('figure');
    asset.remove();
    if (figure && !figure.textContent.trim() && !figure.querySelector('img,audio,video')) figure.remove();
    const replacement = sourceBlockFromSnapshot(item,snapshot,$('.board-section-header b',block).textContent);
    activeTextField = null;
    sourceTextSelection = null;
    sourceImageSelection = null;
    setElements(elements.map(value => value.id === item.id ? replacement : value),item.id);
  }

  function moveNestedTool(point, index, photo) {
    const host = elements.find(item => item.id === draggedNested?.hostId);
    const live = host && $(`.board-section[data-id="${CSS.escape(host.id)}"] [data-source-render]`,artboard);
    const picked = live && $(`[data-studio-nest="${CSS.escape(draggedNested.id)}"]`,live);
    if (!picked || (point && (picked.contains(point.zone) || point.anchor === picked))) return;
    if (photo?.full) { showToast('หนึ่งแถวใส่ได้สูงสุด 4 รูป'); return; }
    const source = snapshotNestedSource(host,live);
    const wrapper = counterpart(picked,live,source.root);
    const sameHost = point?.item.id === host.id;
    const destination = point ? sameHost ? source : snapshotNestedSource(point.item,point.root) : null;
    const zone = point && (point.root
      ? counterpart(point.zone,point.root,destination.root)
      : convertedDropColumn(point,destination.root));
    if (point && !zone) return;
    const anchor = point && nestedInsertionAnchor(point,zone);
    const photoTarget = photo && counterpart(photo.wrapper,point.root,destination.root);
    wrapper.remove();
    const next = elements.slice();
    let selected = host.id;
    if (point) {
      if (photoTarget) {
        putNestedPhotoBeside(photoTarget,wrapper,photo.after);
      } else if (anchor?.node?.parentElement === zone) {
        if (anchor.before) anchor.node.before(wrapper);
        else anchor.node.after(wrapper);
      } else zone.append(wrapper);
      for (const [img,record] of source.images) destination.images.set(img,record);
      const targetIndex = next.findIndex(item => item.id === point.item.id);
      next[targetIndex] = sourceBlockFromSnapshot(point.item,destination,$('.board-section-header b',point.block).textContent);
      selected = point.item.id;
    } else {
      const title = wrapper.dataset.studioName || 'องค์ประกอบ';
      const promoted = sourceBlockFromSnapshot({id:draggedNested.id,type:'sourcePage'},{root:wrapper,images:source.images},title);
      next.splice(index,0,promoted);
      selected = promoted.id;
    }
    if (!sameHost) next[next.findIndex(item => item.id === host.id)] = sourceBlockFromSnapshot(host,source,host.title);
    activeTextField = null;
    sourceTextSelection = null;
    sourceImageSelection = null;
    setElements(next,selected);
  }

  function stripNestedWrappers(markup) {
    const hasCmsLayout = markup.includes('data-cms-surface');
    if (!hasCmsLayout && !markup.includes('data-studio-nest') && !markup.includes('data-studio-photo-row')) return markup;
    const fragment = document.createElement('template');
    fragment.innerHTML = markup;
    $$('[data-studio-nest]',fragment.content).forEach(node => node.replaceWith(...node.childNodes));
    $$('[data-studio-photo-row]',fragment.content).forEach(node => node.removeAttribute('data-studio-photo-row'));
    if (hasCmsLayout) {
      $$('[data-cms-surface]',fragment.content).forEach(surface => {
        if (!surface.querySelector('[data-cms-column]:not(:empty)')) surface.remove();
        else if (!surface.className) surface.replaceWith(...surface.childNodes);
        else surface.removeAttribute('data-cms-surface');
      });
      $$('[data-cms-column],[data-cms-row]',fragment.content).forEach(node => {
        node.removeAttribute('data-cms-column');
        node.removeAttribute('data-cms-row');
      });
    }
    return fragment.innerHTML;
  }

  let blockDropTarget = null;
  function clearBlockDropHint() {
    blockDropTarget?.removeAttribute('data-block-drop');
    blockDropTarget?.removeAttribute('data-nested-drop');
    blockDropTarget?.classList.remove('drop-target');
    blockDropTarget = null;
    imageGuides.replaceChildren();
  }

  function isAfterBlock(event, block) {
    const rect = block.getBoundingClientRect();
    return event.clientY > rect.top + rect.height / 2;
  }

  function boardDropPlacement(event,target) {
    if (target) return {target,after:isAfterBlock(event,target)};
    const rows = $$(':scope > .board-section,:scope > .board-photo-row',artboard);
    const next = rows.find(row => !isAfterBlock(event,row));
    const row = next || rows.at(-1);
    const block = row?.matches('.board-section') ? row :
      next ? row?.firstElementChild : row?.lastElementChild;
    return {target:block || null,after:!next};
  }

  function showBlockDropGuide(target,after) {
    if (target) {
      const bounds = (target.closest('.board-photo-row') || target).getBoundingClientRect();
      paintImageGuide('y',after ? bounds.bottom : bounds.top,after ? 'แทรกหลัง' : 'แทรกก่อน',bounds);
      return;
    }
    const blocks = $$('.board-section[data-id]',artboard);
    const last = blocks.at(-1);
    const region = last ? last.closest('.board-photo-row') || last : $('.editor-empty',artboard) || artboard;
    const bounds = region.getBoundingClientRect();
    paintImageGuide('y',last ? bounds.bottom : bounds.top+8,last ? 'เพิ่มท้ายบอร์ด' : 'เริ่มวางบนบอร์ด',bounds);
  }

  function showNestedDropGuides(point) {
    const bounds = point.zone.getBoundingClientRect();
    const anchor = nestedInsertionAnchor(point,point.zone);
    const target = anchor?.node?.getBoundingClientRect();
    const y = target ? anchor.before ? target.top : target.bottom :
      point.zone.querySelector(':scope > :not([data-template-preview-only])') ? bounds.bottom : bounds.top+6;
    paintImageGuide('x',bounds.left+bounds.width/2,'กึ่งกลาง',bounds);
    paintImageGuide('y',y,point.column ? 'วางในคอลัมน์' : 'วางในบล็อก',bounds);
  }

  function showPhotoDropGuide(frame,photo) {
    const bounds = frame.getBoundingClientRect();
    if (photo.full) {
      paintImageGuide('y',bounds.top,'ครบ 4 รูปแล้ว',bounds);
      return;
    }
    paintImageGuide('x',photo.after ? bounds.right : bounds.left,photo.after ? 'วางรูปด้านขวา' : 'วางรูปด้านซ้าย',bounds);
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
    if (element.type === 'freeLayout') {
      if (!element.boxes.some(box => !box.hidden)) return '';
      return `<figure class="text-center"><img class="img-fluid" src="${freeWebpName(element)}" alt="พื้นที่ออกแบบ Reflection"></figure>`;
    }
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
        const markup = stripNestedWrappers(cleanSourceMarkup(element.markup).replace(/<img\b[^>]*>/gi,tag => {
          const original = originalImages[imageIndex++];
          const localImage = /\bsrc=(["'])(?:data:image\/|blob:)[^"']*\1/i;
          if (!localImage.test(tag)) return tag;
          return original ? cleanSourceMarkup(original) : tag.replace(localImage,'src="#"');
        }));
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

  function measureExportImage(image) {
    const frame = image.closest(boardImageFrame);
    const boxWidth = frame?.clientWidth;
    const boxHeight = frame?.clientHeight;
    if (!boxWidth || !boxHeight) return null;
    const style = getComputedStyle(image);
    return {
      boxWidth,boxHeight,fit:style.objectFit,
      radii:['borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius']
        .map(property => parseFloat(style[property]) || 0)
    };
  }

  async function createCroppedWebp(image, measurement) {
    await image.decode();
    const crop = measurement || measureExportImage(image);
    if (!crop) throw new Error('ไม่พบกรอบรูปบนบอร์ด');
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = Math.max(1,Math.round(canvas.width * crop.boxHeight / crop.boxWidth));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('เบราว์เซอร์นี้สร้างไฟล์ภาพไม่ได้');
    const scale = (crop.fit === 'contain' ? Math.min : Math.max)(canvas.width/image.naturalWidth,canvas.height/image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const radii = crop.radii.map(radius => radius*canvas.width/crop.boxWidth);
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

  let exportMeasurements = new Map();
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
          const {blob} = await createCroppedWebp(image,exportMeasurements.get(image));
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

  const freeLayoutsForExport = () => elements.filter(item => item.type === 'freeLayout' && item.boxes.some(box => !box.hidden));

  function setFreeExportPreview(show) {
    const view = $('#freeExportPreview');
    view.hidden = !show;
    exportCode.hidden = show;
    $('#toggleFreePreview').setAttribute('aria-pressed',String(show));
    $('#toggleFreePreview').textContent = show ? 'ดูโค้ด' : 'ดูตัวอย่างงานกราฟิกเดิม';
    view.srcdoc = show ? '<!doctype html><meta charset="utf-8"><body marginwidth="0" marginheight="0">' +
      freeLayoutsForExport().map(exportFreeLayout).join('\n') : '';
  }

  function updateExportCode() {
      const freeLayouts = freeLayoutsForExport();
      $('#freeExportOptions').hidden = !freeLayouts.length;
      exportCode.value = buildExport(elements);
      $('#exportFeedback').textContent = '';
      const fragment = document.createElement('template');
      fragment.innerHTML = exportCode.value;
      const assets = [...fragment.content.querySelectorAll('img,audio,video,source')];
      const missing = assets.filter(node => {
        const path = node.getAttribute('src') || node.getAttribute('href');
        if (node.matches('audio,video') && !path && node.querySelector('source')) return false;
        return !path || path === '#' || path.includes('#####');
      }).length;
      const embedded = assets.filter(node => (node.getAttribute('src') || node.getAttribute('href'))?.startsWith('data:')).length;
      const notes = [];
      if (freeLayouts.length) notes.push('ดาวน์โหลด WebP ของงานกราฟิกเดิม แล้วอัปโหลดใน CMS โดยใช้ชื่อไฟล์ตามโค้ด');
      if (missing) notes.push(`มีไฟล์สื่อ ${missing} รายการที่ต้องใส่พาธจริงหลังอัปโหลดเข้า CMS`);
      if (embedded) notes.push(`มีไฟล์ฝังในโค้ด ${embedded} รายการ หาก CMS ตัดออก ให้อัปโหลดไฟล์ใน CMS แล้วใช้พาธของไฟล์`);
      const status = $('#exportAssetStatus');
      status.textContent = notes.join(' · ');
      status.hidden = !notes.length;
  }

  function openExport() {
    try {
      setFreeExportPreview(false);
      updateExportCode();
      exportDialog.showModal();
    } catch {
      showToast('เตรียม HTML ไม่สำเร็จ กรุณาลองอีกครั้ง');
    }
  }

  async function downloadFreeLayouts(button) {
    button.disabled = true;
    let count = 0;
    try {
      for (const layout of freeLayoutsForExport()) {
        const height = Math.ceil(freeStageHeight(layout));
        const markup = exportFreeLayout(layout).replace('width="100%"',`width="${ARTBOARD_WIDTH}" height="${height}"`);
        const url = URL.createObjectURL(new Blob([markup],{type:'image/svg+xml;charset=utf-8'}));
        try {
          const image = new Image();
          image.src = url;
          await image.decode();
          const canvas = document.createElement('canvas');
          canvas.width = ARTBOARD_WIDTH;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image,0,0);
          const blob = await canvasToBlob(canvas,'image/webp',.94);
          if (blob?.type !== 'image/webp') throw new Error('WebP encode failed');
          downloadWebp(blob,freeWebpName(layout));
          count++;
        } finally { URL.revokeObjectURL(url); }
      }
      $('#exportFeedback').textContent = `สร้าง WebP แล้ว ${count} ไฟล์`;
    } catch {
      $('#exportFeedback').textContent = count ? `สร้างได้ ${count} ไฟล์ · ยังส่งออกไม่ครบ` : 'สร้าง WebP ของพื้นที่ออกแบบไม่สำเร็จ';
    } finally {
      button.disabled = false;
    }
  }

  function undo() {
    if (!undoStack.length) return;
    redoStack.push(clone(elements));
    elements = undoStack.pop();
    if (!elements.some(item => item.id === selectedId)) selectedId = elements[0]?.id || null;
    renderAll();
    scheduleSave();
  }

  function redo() {
    if (!redoStack.length) return;
    undoStack.push(clone(elements));
    elements = redoStack.pop();
    if (!elements.some(item => item.id === selectedId)) selectedId = elements[0]?.id || null;
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

  async function applyFile(file, insertAt) {
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
      if (Number.isInteger(insertAt)) {
        insertBlock('image',insertAt,{src:asset.src,alt,...(asset.aspectRatio?{aspectRatio:asset.aspectRatio}:{})});
      } else if (current?.type==='sourcePage' && sourceSlot?.elementId===current.id) {
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
  $('#editorExport').addEventListener('click',() => {
    exportMeasurements = new Map($$('img[src]',artboard).map(image => [image,measureExportImage(image)]));
    showMode('export');
  });
  $('#backToEditor').addEventListener('click',() => showMode('editor'));
  $('#openImageExport').addEventListener('click',exportDesignImage);
  $('#openHtmlExport').addEventListener('click',openExport);
  $('#toggleFreePreview').addEventListener('click',() => setFreeExportPreview($('#freeExportPreview').hidden));
  $('#downloadFreeWebps').addEventListener('click',event => downloadFreeLayouts(event.currentTarget));
  $('#closeExport').addEventListener('click',() => exportDialog.close());
  exportDialog.addEventListener('close',() => setFreeExportPreview(false));
  $('#copyHtml').addEventListener('click', async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(exportCode.value);
      copied = true;
    } catch {
      setFreeExportPreview(false);
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
  function openBlockDetails(header) {
    selectElement(header.closest('[data-id]').dataset.id);
    renderInspector();
    if (!boardSettings.open) boardSettings.showModal();
  }
  artboard.addEventListener('contextmenu',event => {
    const header = event.target.closest('.board-section-header');
    if (!header || event.target.closest('button')) return;
    event.preventDefault();
    openBlockDetails(header);
  });
  artboard.addEventListener('keydown',event => {
    if (!event.target.matches('.board-section-header')) return;
    if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
      event.preventDefault();
      openBlockDetails(event.target);
    }
  });
  $('#closeBoardSettings').addEventListener('click',() => boardSettings.close());
  boardSettings.addEventListener('click',event => {
    if (event.target === boardSettings) boardSettings.close();
  });
  boardTextTools.addEventListener('mousedown',event => {
    if (event.target.closest('[data-text-format]')) event.preventDefault();
  });
  boardTextTools.addEventListener('click',event => {
    const button = event.target.closest('[data-text-format]');
    if (!button) return;
    const command = button.dataset.textFormat;
    const {box} = currentFreeBox();
    if (box && Object.hasOwn(horizontalAlign,command)) {
      arrangeFreeBoxes(command);
      return;
    }
    if (!currentBoardText() && ['left','center','right'].includes(command)) alignBoardImage(command);
    else applyBoardTextFormat(command);
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

  $('#componentsTab').addEventListener('click',() => switchShelf(false));
  $('#freeTab').addEventListener('click',() => switchShelf(true));
  $('#cmsComposer').addEventListener('click',event => {
    const card = event.target.closest('button');
    if (!card) return;
    const {cmsAddLayout,cmsAddContent,cmsAddSection} = card.dataset;
    if (cmsAddLayout) insertBlock('sourcePage',undefined,makeCmsLayout(cmsAddLayout));
    else if (cmsAddContent) addCmsContent(cmsAddContent);
    else if (cmsAddSection) addLegacyBlock(cmsAddSection);
  });
  $('#cmsComposer').addEventListener('dragstart',event => {
    const card = event.target.closest('button');
    if (!card) return;
    const {cmsAddLayout,cmsAddContent,cmsAddSection} = card.dataset;
    draggedType = cmsAddLayout ? `cms-layout:${cmsAddLayout}` : cmsAddSection ? `cms-section:${cmsAddSection}` : `cms-content:${cmsAddContent}`;
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('text/plain',draggedType);
  });
  $('#cmsComposer').addEventListener('change',event => updateCmsSection(event.target));
  $('.shelf-tabs').addEventListener('keydown',event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const free = event.key === 'End' || event.key !== 'Home' && event.target.id === 'componentsTab';
    switchShelf(free);
    $(free ? '#freeTab' : '#componentsTab').focus();
  });
  $$('[data-free-tool]').forEach(button => {
    button.addEventListener('click',() => setFreeDrawTool(button.dataset.freeTool));
    button.addEventListener('dragstart',event => {
      setFreeDrawTool(null);
      draggedType = `free:${button.dataset.freeTool}`;
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData('text/plain',draggedType);
    });
  });
  $('[data-free-select-tool]').addEventListener('click',() => setFreeDrawTool(null));
  document.addEventListener('keydown',event => {
    if (editorView.hidden || $('#freeShelf').hidden || exportDialog.open || boardSettings.open ||
      event.target.closest?.('input,textarea,select,[contenteditable]')) return;
    const key = event.key.toLowerCase();
    const {layout} = currentFreeBox();
    if (!layout) return;
    const selected = editableFreeSelection(layout);
    if ((event.ctrlKey || event.metaKey) && key === 'd' && selected.length) {
      event.preventDefault();
      duplicateFreeBox();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const direction = {arrowleft:[-1,0],arrowright:[1,0],arrowup:[0,-1],arrowdown:[0,1]}[key];
    if (direction && selected.length && (event.target === document.body || artboard.contains(event.target))) {
      event.preventDefault();
      const step = event.shiftKey ? 10 : 1;
      nudgeFreeBoxes(direction[0]*step,direction[1]*step);
      return;
    }
    if (['delete','backspace'].includes(key) && layout && (event.target === document.body || artboard.contains(event.target))) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (selected.length) {
        const ids = new Set(selected.map(box => box.id));
        const next = clone(elements);
        const stage = next.find(item => item.id === layout.id);
        stage.boxes = stage.boxes.filter(box => !ids.has(box.id));
        selectOnlyFreeBox(null);
        setElements(next,layout.id);
      }
      return;
    }
    const shortcuts = {r:'rect',o:'ellipse',l:'line',i:'image',t:'text',v:null,escape:null};
    if (!Object.hasOwn(shortcuts,key)) return;
    event.preventDefault();
    if (key === 'escape' && freeDraw) {
      freeDraw.draft.remove();
      if (freeDraw.stage.hasPointerCapture?.(freeDraw.pointer)) freeDraw.stage.releasePointerCapture(freeDraw.pointer);
      freeDraw = null;
      imageGuides.replaceChildren();
    }
    setFreeDrawTool(shortcuts[key]);
  });
  $('#freeProperties').addEventListener('change',event => {
    const key = event.target.dataset.freeProp;
    const layout = elements.find(item => item.id === selectedId && item.type === 'freeLayout');
    const box = layout?.boxes.find(item => item.id === selectedFreeBox);
    if (!key || !box || (box.locked || box.hidden) && key !== 'name') return;
    const input = event.target;
    const value = key === 'name' ? input.value.trim().slice(0,80) :
      input.type === 'checkbox' ? input.checked : input.matches('select') ? input.value :
      input.type === 'color' ? safeColor(input.value) :
      bound(Number(event.target.value) || 0,Number(event.target.min),Number(event.target.max));
    changeFreeBox(layout,box,item => { item[key] = value; });
  });
  $('#freeProperties').addEventListener('click',event => {
    if (event.target.closest('[data-free-duplicate]')) { duplicateFreeBox(); return; }
    const arrange = event.target.closest('[data-free-arrange]')?.dataset.freeArrange;
    if (arrange) { arrangeFreeBoxes(arrange); return; }
    const toggle = event.target.closest('[data-free-layer-toggle]');
    if (toggle) {
      const {layout} = currentFreeBox();
      const box = layout?.boxes.find(item => item.id === toggle.dataset.freeLayerId);
      const prop = toggle.dataset.freeLayerToggle;
      if (box && ['hidden','locked'].includes(prop)) changeFreeBox(layout,box,item => { item[prop] = !item[prop]; });
      return;
    }
    const layer = event.target.closest('[data-free-layer]')?.dataset.freeLayer;
    if (layer) {
      const tile = $(`[data-free-box="${CSS.escape(layer)}"]`,artboard);
      const {layout} = currentFreeBox();
      const box = layout?.boxes.find(item => item.id === layer);
      if (box) {
        setFreeDrawTool(null);
        selectFreeBox(layout,box,tile,event.shiftKey);
        tile?.scrollIntoView({block:'nearest'});
        $(`[data-free-layer="${CSS.escape(layer)}"]`,$('#freeProperties'))?.focus({preventScroll:true});
      }
      return;
    }
    const action = event.target.closest('[data-free-order]')?.dataset.freeOrder;
    const layout = elements.find(item => item.id === selectedId && item.type === 'freeLayout');
    const box = layout?.boxes.find(item => item.id === selectedFreeBox);
    if (!action || !box || box.locked || box.hidden) return;
    changeFreeBox(layout,box,(item,stage) => {
      stage.boxes.splice(stage.boxes.indexOf(item),1);
      if (action === 'front') stage.boxes.push(item);
      else stage.boxes.unshift(item);
    });
  });
  artboard.addEventListener('pointerdown',startFreeGesture);
  document.addEventListener('pointermove',moveFreeGesture,{passive:false});
  document.addEventListener('pointerup',finishFreeGesture);
  document.addEventListener('pointercancel',finishFreeGesture);
  $('#freeImageFile').addEventListener('change',event => {
    const target = freeUpload;
    freeUpload = null;
    if (target) addImageToFreeBox(event.target.files?.[0],target.layout,target.box,target.version);
  });
  artboard.addEventListener('keydown',event => {
    if (event.target.matches('[contenteditable],button')) return;
    const {layout,box,tile} = freeSelection(event.target);
    if (!box) return;
    if (event.key === 'Enter' && box.kind === 'text') {
      event.preventDefault();
      selectFreeBox(layout,box,tile);
      editFreeCopy(tile);
    }
  });
  artboard.addEventListener('focusout',event => {
    if (!event.target.matches('.free-copy[contenteditable]')) return;
    const {box,tile} = freeSelection(event.target);
    const value = event.target.innerText;
    event.target.removeAttribute('contenteditable');
    if (!box || box.text === value) return;
    undoStack.push(clone(elements));
    redoStack = [];
    box.text = value;
    $('.free-artwork',tile).outerHTML = renderFreeArtwork(box);
    renderFreeProperties();
    $('#undoBtn').disabled = false;
    $('#redoBtn').disabled = true;
    scheduleSave();
  });

  inlineRemove.addEventListener('mousedown',event => event.preventDefault());
  inlineRemove.addEventListener('click',event => {
    event.stopPropagation();
    const target = inlineRemoveTarget;
    if (target?.matches('[contenteditable="true"]')) removeBoardText(target);
    else if (target) removeBoardMedia(target);
  });
  artboard.addEventListener('pointerover',event => {
    if (event.target === inlineRemove || imageMove?.started) return;
    if (event.target.closest('[data-free-stage]')) { inlineRemove.hidden = true; return; }
    placeInlineRemove(event.target.closest(`[contenteditable="true"],${boardImageFrame},audio,.mock-player`) || currentBoardText());
  });
  artboard.addEventListener('pointerleave',() => placeInlineRemove(currentBoardText()));
  artboard.addEventListener('input',() => placeInlineRemove(currentBoardText()));
  window.addEventListener('resize',() => placeInlineRemove(inlineRemoveTarget));

  artboard.addEventListener('click',event => {
    const free = freeSelection(event.target);
    if (free.box) {
      const {layout,box,tile} = free;
      if (event.target.closest('[data-free-remove]')) {
        if (box.locked) return;
        selectOnlyFreeBox(null);
        changeFreeBox(layout,box,(item,stage) => { stage.boxes.splice(stage.boxes.indexOf(item),1); });
      } else {
        if (event.target.closest('[contenteditable]')) return;
        selectFreeBox(layout,box,tile,event.shiftKey);
        if (!box.locked && event.target.closest('[data-free-upload]')) {
          freeUpload = {layout:layout.id,box:box.id,version:editorDocumentVersion};
          $('#freeImageFile').value = '';
          $('#freeImageFile').click();
        }
      }
      return;
    }
    if (!suppressImageClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  },true);
  artboard.addEventListener('click',event => {
    const nestedRemove = event.target.closest('[data-remove-nested]');
    if (nestedRemove) { removeNestedTool(nestedRemove); return; }
    const remove = event.target.closest('[data-canvas-remove]');
    if (remove) {
      removeBoardElement(remove.dataset.canvasRemove);
      return;
    }
    const emptyAction=event.target.closest('[data-empty-add]');
    if(emptyAction) {event.preventDefault();addLegacyBlock(emptyAction.dataset.emptyAdd);return;}
    const cmsColumn = event.target.closest('[data-cms-column]');
    if (cmsColumn) {
      const columns = $$('[data-cms-column]',cmsColumn.closest('[data-source-render]'));
      cmsColumnSelection = {id:cmsColumn.closest('[data-id]').dataset.id,index:columns.indexOf(cmsColumn)};
      renderCmsControls();
    }
    if (event.target.closest('.button-block a,.source-page-render a')) event.preventDefault();
    if (event.target.closest('[contenteditable="true"],audio,video')) return;
    if (event.target.closest('[data-resize-handle]')) return;
    const frame = event.target.closest(boardImageFrame);
    if (frame) selectBoardImage(frame);
    else activeImage = null;
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
        if (alreadySelected) renderArtboard();
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
    const free = freeSelection(event.target);
    if (free.box?.kind === 'text') { editFreeCopy(free.tile); return; }
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
  artboard.addEventListener('pointerdown',startImageMove);
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
    const delta = ['ArrowRight','ArrowDown'].includes(event.key) ? step : -step;
    const clamp = width => Math.max(10,Math.min(imageMaxPercent(element),width));
    const sourceIndex = Number(handle.parentElement.dataset.sourceFrame);
    if (element.type === 'sourcePage' && Number.isInteger(sourceIndex)) {
      selectedId = element.id;
      sourceImageSelection = {elementId:element.id,index:sourceIndex};
      element.imageWidths ||= {};
      element.imageWidths[sourceIndex] = clamp(sourceFrameWidthPercent(handle.parentElement)+delta);
    } else element.width = clamp(Number(element.width || 100)+delta);
    undoStack.push(before); redoStack=[]; renderAll(); scheduleSave();
    if (element.type === 'sourcePage') $(`.source-image-selected [data-resize-handle="${handle.dataset.resizeHandle}"]`,artboard)?.focus({preventScroll:true});
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
    activeImage = null;
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
      });
      $('[data-source-text-selected]',artboard)?.removeAttribute('data-source-text-selected');
      sourceText.setAttribute('data-source-text-selected','');
    }
    if (selectionChanged || sourceText) {
      $$('.canvas-block.selected',artboard).forEach(node => node.classList.remove('selected'));
      block.classList.add('selected');
      renderLayers();
      renderInspector();
      const column = editable.closest('[data-cms-column]');
      if (column) cmsColumnSelection = {id:selectedId,index:$$('[data-cms-column]',block).indexOf(column)};
      renderCmsControls();
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
  artboard.addEventListener('pointerdown',event => {
    nestedDragGrip = event.target.closest('.nested-tool-grip');
  });
  document.addEventListener('pointerup',() => { nestedDragGrip = null; });
  artboard.addEventListener('dragstart',event => {
    if (imageMove || freeGesture || freeDraw || freeMarquee || event.target.closest('[data-free-box]')) { event.preventDefault(); return; }
    if (event.target.closest('[data-resize-handle],[data-canvas-remove],[data-remove-nested],[contenteditable="true"]')) {event.preventDefault();return}
    const bar = event.target.closest('.nested-tool-bar') || nestedDragGrip?.closest('.nested-tool-bar');
    const block = (bar || event.target).closest('[data-id]');
    if (!block) return;
    if (bar) {
      draggedNested = {hostId:block.dataset.id,id:bar.closest('[data-studio-nest]').dataset.studioNest};
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain',`nested:${draggedNested.id}`);
      return;
    }
    draggedId = block.dataset.id;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain',draggedId);
    block.classList.add('dragging');
  });
  document.addEventListener('dragend',() => {
    clearBlockDropHint();
    draggedId = null;
    draggedType = null;
    draggedNested = null;
    nestedDragGrip = null;
  });
  artboard.addEventListener('dragend',event => event.target.closest('[data-id]')?.classList.remove('dragging'));
  artboard.addEventListener('dragover',event => {
    if (event.dataTransfer?.types?.includes('Files')) {
      const imageBox = event.target.closest(boardImageFrame);
      event.preventDefault();
      clearBlockDropHint();
      if (imageBox) {
        blockDropTarget = imageBox;
        imageBox.classList.add('drop-target');
        const bounds = imageBox.getBoundingClientRect();
        paintImageGuide('x',bounds.left+bounds.width/2,'วางไฟล์รูป',bounds);
        paintImageGuide('y',bounds.top+bounds.height/2,'',bounds);
      } else {
        const block = event.target.closest('.board-section[data-id]');
        const placement = block ? {target:block,after:true} : boardDropPlacement(event,null);
        showBlockDropGuide(placement.target,placement.after);
      }
      event.dataTransfer.dropEffect='copy';
      return;
    }
    if (!draggedId && !draggedType && !draggedNested) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = draggedType ? 'copy' : 'move';
    clearBlockDropHint();
    const target = event.target.closest('.canvas-block[data-id]');
    if (/^cms-(?:layout|section):/.test(draggedType || '')) {
      const placement = boardDropPlacement(event,target);
      showBlockDropGuide(placement.target,placement.after);
      return;
    }
    if (draggedType?.startsWith('free:')) {
      const stage = event.target.closest('[data-free-stage]');
      if (stage) {
        const rect = stage.getBoundingClientRect();
        const center = (rect.left+rect.right)/2;
        if (Math.abs(event.clientX-center)<10) paintImageGuide('x',center,'กึ่งกลาง',rect);
        paintImageGuide('y',event.clientY,'วางกล่อง',rect);
      } else {
        const placement = boardDropPlacement(event,target);
        showBlockDropGuide(placement.target,placement.after);
      }
      return;
    }
    const photo = photoDrop(event,draggedType,draggedId);
    if (photo && target) {
      blockDropTarget = target;
      target.dataset.blockDrop = photo.full ? 'full' : photo.after ? 'photo-after' : 'photo-before';
      showPhotoDropGuide(event.target.closest(boardImageFrame),photo);
      return;
    }
    const point = target?.dataset.id !== draggedId && nestedDropPoint(event);
    if (point) {
      const photoSlot = nestedPhotoDrop(event,draggedType,draggedId);
      blockDropTarget = photoSlot?.wrapper || point.zone;
      if (photoSlot) {
        blockDropTarget.setAttribute('data-block-drop',photoSlot.full ? 'full' : photoSlot.after ? 'photo-after' : 'photo-before');
        showPhotoDropGuide(event.target.closest(boardImageFrame),photoSlot);
      } else {
        blockDropTarget.setAttribute('data-nested-drop','');
        showNestedDropGuides(point);
      }
      return;
    }
    const placement = boardDropPlacement(event,target);
    if (placement.target?.dataset.id !== draggedId) {
      blockDropTarget = placement.target;
      if (blockDropTarget) blockDropTarget.dataset.blockDrop = placement.after ? 'after' : 'before';
      showBlockDropGuide(placement.target,placement.after);
    }
  });
  artboard.addEventListener('dragleave',event => {
    const imageBox = event.target.closest('.image-placeholder,.preview-image-placeholder,.source-image-frame');
    if (imageBox && !imageBox.contains(event.relatedTarget)) imageBox.classList.remove('drop-target');
    if (!artboard.contains(event.relatedTarget)) {
      clearBlockDropHint();
    }
  });
  artboard.addEventListener('drop',async event => {
    event.preventDefault();
    clearBlockDropHint();
    artboard.querySelectorAll('.drop-target').forEach(node => node.classList.remove('drop-target'));
    const target = event.target.closest('[data-id]');
    const placement = boardDropPlacement(event,target);
    const targetIndex = elements.findIndex(item => item.id === placement.target?.dataset.id);
    const after = placement.after;
    const row = photoRowAt(elements,targetIndex);
    const insertAt = targetIndex < 0 ? elements.length : after ? row.end : row.start;
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile?.type.startsWith('image/')) {
      const free = freeSelection(event.target);
      if (free.box?.kind === 'image') {
        await addImageToFreeBox(droppedFile,free.layout.id,free.box.id,editorDocumentVersion);
        return;
      }
      const frame = event.target.closest('[data-source-frame]');
      sourceImageSelection = frame && target ? {elementId:target.dataset.id,index:Number(frame.dataset.sourceFrame)} : null;
      if (target) selectElement(target.dataset.id);
      else selectedId = null;
      await applyFile(droppedFile,target ? undefined : insertAt);
      return;
    }
    const source = event.dataTransfer.getData('text/plain') || draggedId;
    const cmsLayout = source?.match(/^cms-layout:(\w+)$/);
    if (cmsLayout && Object.hasOwn(cmsLayouts,cmsLayout[1])) {
      insertBlock('sourcePage',insertAt,makeCmsLayout(cmsLayout[1]));
      return;
    }
    const cmsSection = source?.match(/^cms-section:(\w+)$/);
    if (cmsSection) {
      addLegacyBlock(cmsSection[1],insertAt);
      return;
    }
    const freeKind = source?.startsWith('free:') ? source.slice(5) : null;
    if (Object.hasOwn(freeTools,freeKind)) {
      addFreeBox(freeKind,event);
      return;
    }
    const nested = nestedDropPoint(event);
    if (draggedNested) {
      moveNestedTool(nested,insertAt,nested && nestedPhotoDrop(event,source,draggedId));
      draggedNested = null;
      return;
    }
    const photo = photoDrop(event,source,draggedId);
    if (photo) { joinPhotoRow(photo); return; }
    const definition = nestedTool(source);
    if (nested && nested.item.id !== draggedId && (definition || draggedId)) {
      const cell = nested.zone.closest('[data-cms-column]');
      if (cell) cmsColumnSelection = {id:nested.item.id,index:$$('[data-cms-column]',nested.block).indexOf(cell)};
      insertNestedTool(nested,definition,draggedId,nestedPhotoDrop(event,source,draggedId));
      draggedType = null;
      draggedId = null;
      return;
    }
    const cmsContent = source?.match(/^cms-content:(\w+)$/);
    if (cmsContent) {
      addCmsContent(cmsContent[1],insertAt);
      return;
    }
    const templateTool = source?.match(/^template-tool:([A-Za-z0-9]+)$/);
    if (templateTool) {
      insertTemplateTool(templateTool[1],insertAt);
      draggedType = null;
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
    moveElement(source,placement.target?.dataset.id || null,after);
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
      const audioIndex = Number(event.target.dataset.audioIndex);
      let index = 0;
      element.markup = element.markup.replace(/<audio\b[^>]*>/gi,tag => {
        if (index++ !== audioIndex) return tag;
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
  renderCmsComposer();
  decorateIndependentTools();
  renderGallery();
})();
