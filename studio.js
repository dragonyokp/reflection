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
  const DRAFT_KEY = 'reflectionStudioDraftV1';
  const DRAFT_DB_NAME = 'reflectionStudioDrafts';
  const DRAFT_STORE = 'drafts';
  const ARTBOARD_WIDTH = 1000;
  const ARTBOARD_PADDING = 96;
  const CONTENT_WIDTH = ARTBOARD_WIDTH - ARTBOARD_PADDING * 2;

  const templates = [
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
  let elements = [];
  let selectedId = null;
  let nextId = 1;
  let zoom = 1;
  let undoStack = [];
  let redoStack = [];
  let draggedId = null;
  let draggedType = null;
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
  const titleFor = type => ({heading:'หัวข้อ',text:'ข้อความ',image:'รูปภาพ',quote:'คำพูด',split:'รูป + เนื้อหา',divider:'เส้นคั่น',banner:'แถบเน้น',button:'ปุ่มลิงก์',columns:'สองคอลัมน์',spacer:'ช่องว่าง'}[type] || 'องค์ประกอบ');
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
    $('#audioView').hidden = mode !== 'audio';
    if (mode !== 'editor') setActiveMode(mode);
    window.scrollTo(0,0);
  }

  function makeElement(type, overrides = {}) {
    const defaults = {
      heading:{text:'หัวข้อเรื่องราวของคุณ',fontSize:36,color:'#20271e',align:'left',background:'#f5f5f1',padding:0},
      text:{text:'คลิกเพื่อเพิ่มข้อความ เล่าเรื่องราวและรายละเอียดที่ต้องการสื่อสารกับผู้อ่าน',fontSize:18,color:'#41483f',align:'left',background:'#f5f5f1',padding:0},
      image:{src:'',alt:'คำอธิบายรูปภาพ',width:100,aspectRatio:9/16,align:'center',fit:'cover',radius:0},
      quote:{text:'“เพิ่มประโยคสำคัญที่อยากให้ผู้อ่านจดจำ”',fontSize:24,color:'#384532',align:'left',background:'#e9eee3',padding:24},
      split:{imageSide:'left',src:'',alt:'คำอธิบายรูปภาพ',title:'หัวข้อย่อย',text:'เพิ่มข้อความประกอบรูปภาพที่นี่',width:100,aspectRatio:9/16,fit:'cover',background:'#e8ece3'},
      divider:{},
      banner:{title:'ข้อความสำคัญของเรื่อง',text:'ใช้แถบสีเพื่อเน้นประเด็นหรือคำชวนให้ลงมือทำ',fontSize:24,color:'#ffffff',background:'#397e22',align:'center',padding:36},
      button:{text:'ดูรายละเอียดเพิ่มเติม',url:'#',fontSize:18,color:'#ffffff',background:'#397e22',align:'left',padding:14},
      columns:{leftTitle:'หัวข้อฝั่งซ้าย',leftText:'เขียนรายละเอียดหรือข้อมูลประกอบฝั่งซ้าย',rightTitle:'หัวข้อฝั่งขวา',rightText:'เขียนรายละเอียดหรือข้อมูลประกอบฝั่งขวา',fontSize:18,color:'#41483f',background:'#eef2e9',padding:24},
      spacer:{height:48}
    };
    return {id:uid(),type,...clone(defaults[type] || {}),...overrides};
  }

  const safeColor = value => /^#[0-9a-f]{6}$/i.test(String(value||'')) ? value : '#20271e';
  const safeHref = value => /^(https?:|mailto:|tel:|#|\/)/i.test(String(value||'')) ? String(value) : '#';
  const imageWidthBase = element => element.type === 'split' ? Math.round((CONTENT_WIDTH - 48 - 15) / 2) : CONTENT_WIDTH;
  const imageMaxPercent = element => element.type === 'split' ? 100 : 120;
  const imageWidthPx = element => Math.max(1,Math.round(imageWidthBase(element) * Math.max(10,Math.min(imageMaxPercent(element),Number(element.width)||100)) / 100));
  const imageAspectRatio = element => Number.isFinite(Number(element.aspectRatio)) && Number(element.aspectRatio)>0.02 && Number(element.aspectRatio)<20 ? Number(element.aspectRatio) : 9/16;
  const textStyle = element => `font-size:${Math.max(18,Math.min(72,Number(element.fontSize)||18))}px;color:${safeColor(element.color)};text-align:${['left','center','right'].includes(element.align)?element.align:'left'}`;
  function renderResizeHandles(element) {
    if (element.id !== selectedId) return '';
    return `<span class="resize-handle handle-nw" data-resize-handle="nw" role="button" tabindex="0" aria-label="ปรับขนาดรูปภาพ"></span><span class="resize-handle handle-n" data-resize-handle="n" aria-hidden="true"></span><span class="resize-handle handle-ne" data-resize-handle="ne" aria-hidden="true"></span><span class="resize-handle handle-e" data-resize-handle="e" aria-hidden="true"></span><span class="resize-handle handle-se" data-resize-handle="se" role="button" tabindex="0" aria-label="ปรับขนาดรูปภาพ"></span><span class="resize-handle handle-s" data-resize-handle="s" aria-hidden="true"></span><span class="resize-handle handle-sw" data-resize-handle="sw" aria-hidden="true"></span><span class="resize-handle handle-w" data-resize-handle="w" aria-hidden="true"></span>`;
  }

  function renderThumb(template) {
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

  function renderGallery() {
    refreshResumeButton();
    const query = $('#templateSearch').value.trim().toLocaleLowerCase('th');
    const filtered = templates.filter(template => !query || `${template.title} ${template.description} ${template.source || ''}`.toLocaleLowerCase('th').includes(query));
    $('#templateCount').textContent = String(filtered.length).padStart(2,'0');
    templateGrid.innerHTML = filtered.length ? filtered.map(template => `<article class="template-card" role="button" tabindex="0" data-template="${template.id}" aria-label="เลือกเทมเพลต ${escapeHtml(template.title)}">${renderThumb(template)}<div class="template-card-info"><h3>${escapeHtml(template.title)}</h3></div></article>`).join('') : '<div class="no-results">ไม่พบเทมเพลตที่ตรงกับคำค้น</div>';
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
    if (element.type === 'heading') return `<div class="canvas-block heading-block${selected}" data-id="${element.id}" style="background:${background};padding-block:${padding}px"${draggable}><h2 style="${textStyle(element)}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</h2></div>`;
    if (element.type === 'text') return `<div class="canvas-block text-block${selected}" data-id="${element.id}" style="background:${background};padding-block:${padding}px"${draggable}><p style="${textStyle(element)}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</p></div>`;
    if (element.type === 'quote') return `<div class="canvas-block quote-block${selected}" data-id="${element.id}" style="background:${background};padding:${Math.max(14,padding)}px"${draggable}><blockquote style="${textStyle(element)}" contenteditable="true" data-part="text" spellcheck="false">${textHtml(element.text)}</blockquote></div>`;
    if (element.type === 'image') return `<div class="canvas-block image-block${selected}" data-id="${element.id}" style="--image-width:${Math.max(10,Math.min(imageMaxPercent(element),Number(element.width)||100))}%;justify-content:${element.align==='right'?'flex-end':element.align==='center'?'center':'flex-start'}"${draggable}><div class="image-placeholder" style="width:var(--image-width);aspect-ratio:${1/imageAspectRatio(element)}">${element.src?`<img src="${escapeHtml(element.src)}" alt="${escapeHtml(element.alt)}" style="object-fit:${element.fit==='contain'?'contain':'cover'};border-radius:${Math.max(0,Math.min(48,Number(element.radius)||0))}px">`:`<span>▧ &nbsp; ${escapeHtml(element.alt || 'เพิ่มรูปภาพจากแถบปรับแต่ง')}</span>`}${renderResizeHandles(element)}</div></div>`;
    if (element.type === 'split') return `<div class="canvas-block split-block${selected}" data-id="${element.id}" style="background:${background}"${draggable}>${element.imageSide==='right'?`<div class="split-copy"><strong style="${textStyle({...element,fontSize:Math.max(22,Number(element.fontSize)||24)})}" contenteditable="true" data-part="title">${textHtml(element.title)}</strong><span style="${textStyle(element)}" contenteditable="true" data-part="text">${textHtml(element.text)}</span></div>`:''}<div class="image-placeholder split-image" style="width:${Math.max(10,Math.min(100,Number(element.width)||100))}%;aspect-ratio:${1/imageAspectRatio(element)}">${element.src?`<img src="${escapeHtml(element.src)}" alt="${escapeHtml(element.alt)}" style="object-fit:${element.fit==='contain'?'contain':'cover'}">`:`<span>▧ &nbsp; ${escapeHtml(element.alt || 'เพิ่มรูปภาพ')}</span>`}${renderResizeHandles(element)}</div>${element.imageSide!=='right'?`<div class="split-copy"><strong style="${textStyle({...element,fontSize:Math.max(22,Number(element.fontSize)||24)})}" contenteditable="true" data-part="title">${textHtml(element.title)}</strong><span style="${textStyle(element)}" contenteditable="true" data-part="text">${textHtml(element.text)}</span></div>`:''}</div>`;
    if (element.type === 'banner') return `<section class="canvas-block banner-block${selected}" data-id="${element.id}" style="background:${background};color:${safeColor(element.color||'#ffffff')};text-align:${element.align||'center'};padding:${padding||36}px"${draggable}><h2 style="${textStyle({...element,fontSize:Math.max(22,Number(element.fontSize)||24)})}" contenteditable="true" data-part="title">${textHtml(element.title)}</h2><p style="${textStyle(element)}" contenteditable="true" data-part="text">${textHtml(element.text)}</p></section>`;
    if (element.type === 'button') return `<div class="canvas-block button-block${selected}" data-id="${element.id}" style="text-align:${element.align||'left'}"${draggable}><a href="${escapeHtml(safeHref(element.url))}" style="display:inline-block;padding:${padding||14}px 24px;background:${background};color:${safeColor(element.color||'#ffffff')};font-size:${Math.max(18,Number(element.fontSize)||18)}px;border-radius:6px;text-decoration:none" contenteditable="true" data-part="text">${textHtml(element.text)}</a></div>`;
    if (element.type === 'columns') return `<div class="canvas-block columns-block${selected}" data-id="${element.id}" style="background:${background};padding:${padding||24}px;--column-text-size:${Math.max(18,Number(element.fontSize)||18)}px;color:${safeColor(element.color)}"${draggable}><div><h3 contenteditable="true" data-part="leftTitle">${textHtml(element.leftTitle)}</h3><p contenteditable="true" data-part="leftText">${textHtml(element.leftText)}</p></div><div><h3 contenteditable="true" data-part="rightTitle">${textHtml(element.rightTitle)}</h3><p contenteditable="true" data-part="rightText">${textHtml(element.rightText)}</p></div></div>`;
    if (element.type === 'spacer') return `<div class="canvas-block spacer-block${selected}" data-id="${element.id}" style="height:${Math.max(18,Math.min(320,Number(element.height)||48))}px"${draggable}><span>ช่องว่าง · ${Math.max(18,Number(element.height)||48)} px</span></div>`;
    return `<div class="canvas-block divider-block${selected}" data-id="${element.id}"${draggable}><hr></div>`;
  }

  function renderArtboard() {
    artboard.innerHTML = elements.length ? elements.map(renderBlock).join('') : '<div class="editor-empty"><span>✳</span><b>เริ่มสร้างเรื่องราวของคุณ</b><p>เพิ่มหัวข้อ รูปภาพ แถบเน้น หรือจัดวางสองคอลัมน์</p></div>';
    artboard.style.width = `${ARTBOARD_WIDTH}px`;
    artboard.style.minHeight = '1400px';
    artboard.style.transform = `scale(${zoom})`;
    $('#zoomLabel').textContent = `${Math.round(zoom*100)}%`;
    $('#canvasDimensions').textContent = `ส่งออกกว้างอย่างน้อย ${ARTBOARD_WIDTH} px`;
  }

  function renderLayers() {
    $('#layerCount').textContent = elements.length;
    layerList.innerHTML = elements.map((element,index) => `<div class="layer-row${element.id===selectedId?' selected':''}" draggable="true" data-layer-id="${element.id}"><span class="layer-icon">${iconFor(element.type)}</span><span class="layer-name">${escapeHtml(element.text?.split('\n')[0] || element.title || titleFor(element.type))}</span><span class="layer-grip">⠿</span></div>`).join('');
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
    } else if (element.type === 'image' || element.type === 'split') {
      fields += `<div class="inspector-group"><h3>รูปภาพ</h3>${field('ไฟล์รูปภาพ',`<button type="button" class="file-pick" data-pick-image="true">${element.src?'เปลี่ยนรูปภาพ':'เลือกรูปจากอุปกรณ์'} <span>↗</span></button>`)}${field('คำอธิบายรูปภาพ',`<input type="text" data-prop="alt" value="${escapeHtml(element.alt||'')}">`)}${field('ขนาดรูปภาพ',`<div class="range-line"><span>ลากจุดที่มุมรูป หรือปรับความกว้าง</span><b data-width-value>${imageWidthPx(element)} px</b></div><input type="range" min="10" max="${imageMaxPercent(element)}" step="1" data-prop="width" value="${Math.max(10,Math.min(imageMaxPercent(element),Number(element.width)||100))}">`)}${field('การแสดงภาพ',`<select data-prop="fit"><option value="cover" ${element.fit!=='contain'?'selected':''}>เต็มกรอบ</option><option value="contain" ${element.fit==='contain'?'selected':''}>เห็นภาพครบ</option></select>`)}`;
      if (element.type === 'image') fields += `${field('มุมภาพ',`<input type="range" min="0" max="48" step="2" data-prop="radius" value="${Number(element.radius)||0}">`)}${field('ตำแหน่งภาพ',alignmentFields(element))}`;
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
    if (!element || !['image','split'].includes(element.type) || !imageBox) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = imageBox.getBoundingClientRect();
    const widthPercent = Math.max(10,Math.min(imageMaxPercent(element),Number(element.width)||100));
    const width = rect.width / zoom;
    const height = Math.max(1,rect.height / zoom);
    resizeState = {id:element.id,handle:handle.dataset.resizeHandle,startX:event.clientX,startY:event.clientY,startWidth:widthPercent,baseWidth:width/(widthPercent/100),aspect:width/height,before:clone(elements),block};
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
    el.width = width;
    const block = artboard.querySelector(`[data-id="${el.id}"]`);
    const imageBox = block?.querySelector('.image-placeholder');
    if (el.type === 'image') {
      block?.style.setProperty('--image-width',`${width}%`);
      if (imageBox) imageBox.style.width = `${width}%`;
    } else if (imageBox) imageBox.style.width = `${width}%`;
    const slider = $('[data-prop="width"]',inspector);
    if (slider) slider.value = String(Math.round(width));
    const label = $('[data-width-value]',inspector);
    if (label) label.textContent = `${imageWidthPx(el)} px`;
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
    const part = target.dataset.part || 'text';
    element[part] = target.innerText.replace(/\u00a0/g,' ').trimEnd();
    const layer = $(`.layer-row[data-layer-id="${element.id}"] .layer-name`);
    if (layer) layer.textContent = element.text?.split('\n')[0] || element.title || titleFor(element.type);
    $('#saveStatus').textContent = 'มีการแก้ไข';
    scheduleSave();
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

  function elementToHtml(element) {
    const align = ['left','center','right'].includes(element.align) ? element.align : 'left';
    const imageSource = element.src || '/storage/newsroom/refaction/#####/#####/#####/image.webp';
    const imageWidth = imageWidthPx(element);
    const imageHeight = Math.round(imageWidth * imageAspectRatio(element));
    const img = `<img src="${escapeHtml(imageSource)}" alt="${escapeHtml(element.alt || '')}" style="display:block;width:${imageWidth}px;max-width:none;height:${imageHeight}px;object-fit:${element.fit==='contain'?'contain':'cover'};border-radius:${Math.max(0,Math.min(48,Number(element.radius)||0))}px">`;
    const background = safeColor(element.background||'#f5f5f1');
    const padding = Math.max(0,Math.min(96,Number(element.padding)||0));
    if (element.type === 'heading') return `    <h2 class="news__subtitle mb-4" style="${textStyle(element)};background:${background};padding-block:${padding}px">${textHtml(element.text)}</h2>`;
    if (element.type === 'text') return `    <p class="mb-4" style="${textStyle(element)};background:${background};padding-block:${padding}px">${textHtml(element.text)}</p>`;
    if (element.type === 'quote') return `    <blockquote class="my-md-5 my-4" style="${textStyle(element)};background:${background};padding:${Math.max(14,padding)}px;border-left:4px solid #84be3d">${textHtml(element.text)}</blockquote>`;
    if (element.type === 'image') {
      const flexAlign = align==='right'?'flex-end':align==='center'?'center':'flex-start';
      return `    <div style="display:flex;justify-content:${flexAlign};margin:20px 0"><figure style="width:${imageWidth}px;max-width:none;margin:0">${img}</figure></div>`;
    }
    if (element.type === 'split') {
      const imageCol = `<div style="min-width:0"><figure style="width:${imageWidth}px;max-width:none;margin:0">${img}</figure></div>`;
      const textCol = `<div style="min-width:0"><h3 style="font-size:24px;color:${safeColor(element.color||'#20271e')};margin:0 0 12px">${textHtml(element.title)}</h3><p style="font-size:18px;line-height:1.8;color:${safeColor(element.color||'#41483f')};margin:0">${textHtml(element.text)}</p></div>`;
      return `    <section style="display:grid;grid-template-columns:1fr 1fr;gap:15px;align-items:center;padding:24px;background:${background};margin:24px 0">\n        ${element.imageSide === 'right' ? `${textCol}\n        ${imageCol}` : `${imageCol}\n        ${textCol}`}\n    </section>`;
    }
    if (element.type === 'banner') return `    <section style="padding:${padding||36}px;background:${background};text-align:${align};color:${safeColor(element.color||'#ffffff')};margin:24px 0"><h2 style="font-size:${Math.max(22,Number(element.fontSize)||24)}px;color:${safeColor(element.color||'#ffffff')};margin:0 0 12px">${textHtml(element.title)}</h2><p style="${textStyle(element)};margin:0">${textHtml(element.text)}</p></section>`;
    if (element.type === 'button') return `    <div style="text-align:${align};margin:20px 0"><a href="${escapeHtml(safeHref(element.url))}" style="display:inline-block;padding:${padding||14}px 24px;background:${background};color:${safeColor(element.color||'#ffffff')};font-size:${Math.max(18,Number(element.fontSize)||18)}px;border-radius:6px;text-decoration:none">${textHtml(element.text)}</a></div>`;
    if (element.type === 'columns') return `    <section style="display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:${padding||24}px;background:${background};color:${safeColor(element.color||'#41483f')};margin:24px 0"><div><h3 style="font-size:22px;color:${safeColor(element.color||'#20271e')}">${textHtml(element.leftTitle)}</h3><p style="font-size:${Math.max(18,Number(element.fontSize)||18)}px;line-height:1.8">${textHtml(element.leftText)}</p></div><div><h3 style="font-size:22px;color:${safeColor(element.color||'#20271e')}">${textHtml(element.rightTitle)}</h3><p style="font-size:${Math.max(18,Number(element.fontSize)||18)}px;line-height:1.8">${textHtml(element.rightText)}</p></div></section>`;
    if (element.type === 'spacer') return `    <div aria-hidden="true" style="height:${Math.max(18,Math.min(320,Number(element.height)||48))}px"></div>`;
    if (element.type === 'divider') return '    <hr style="border:0;border-top:1px solid #cbd1c5;margin:24px 0">';
    return '';
  }

  function buildExport() {
    const content = elements.map(elementToHtml).filter(Boolean).join('\n\n');
    return `<!-- Reflection Studio · 1000px design width -->\n<div class="reflection-content" style="box-sizing:border-box;width:1000px;min-width:1000px;max-width:none;margin:0 auto;padding:90px 96px;background:#f5f5f1;color:#252b25">\n${content}\n</div>`;
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
    const available = Math.max(320,$('#canvasViewport').clientWidth - 56);
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
      if (current && ['image','split'].includes(current.type)) {
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

  $('#templateSearch').addEventListener('input',renderGallery);
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
    if (event.target.closest('.button-block a')) event.preventDefault();
    const block = event.target.closest('[data-id]');
    if (block) selectElement(block.dataset.id);
  });
  artboard.addEventListener('pointerdown',startImageResize);
  artboard.addEventListener('mousedown',startImageResize);
  artboard.addEventListener('keydown',event => {
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
  artboard.addEventListener('dragover',event => {if (draggedId || draggedType) {event.preventDefault();event.dataTransfer.dropEffect=draggedType?'copy':'move'}});
  artboard.addEventListener('drop',event => {
    event.preventDefault();
    const target = event.target.closest('[data-id]');
    const source = event.dataTransfer.getData('text/plain') || draggedId;
    const insertMatch = source?.match(/^insert:(heading|text|image|quote|split|divider|banner|button|columns|spacer)$/);
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

  inspector.addEventListener('pointerdown',event => {
    if (event.target.matches('[data-prop]') && !inspectorBaseline) inspectorBaseline = clone(elements);
  });
  inspector.addEventListener('input',event => {
    const prop = event.target.dataset.prop;
    if (!prop) return;
    if (!inspectorBaseline) inspectorBaseline = clone(elements);
    const numericProps = ['width','fontSize','padding','radius','height'];
    const value = numericProps.includes(prop) ? Number(event.target.value) : event.target.value;
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
    const prop = event.target.dataset.prop;
    if (!prop) return;
    if (!inspectorBaseline) inspectorBaseline = clone(elements);
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
