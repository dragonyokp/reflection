(() => {
  // Full-page starters composed only from the original Reflection CMS patterns.
  // Every layout uses placeholder copy and empty green image frames in the editor.
  const lead = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at sapien facilisis varius.';
  const body = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  const h = (text = 'Lorem ipsum dolor sit amet') => ({type:'contentHeading',text});
  const p = (text = lead) => ({type:'contentText',text});
  const q = (text = lead) => ({type:'contentBlockquote',text});
  const img = (rowId = null) => ({type:'contentQuoteImage',rowId,alt:''});
  const split = (side = 'left') => ({type:side === 'left' ? 'contentSplitImageLeft' : 'contentSplitImageRight',title:'Lorem ipsum dolor sit amet',text:lead,text2:body,alt:''});
  const quoteSplit = (side = 'right') => ({type:side === 'left' ? 'contentSplitQuoteLeft' : 'contentSplitQuoteRight',title:'Lorem ipsum dolor sit amet',text:lead,caption:'Lorem ipsum\nLorem ipsum'});
  const speaker = (side = 'left') => ({type:'contentPortraitQuote',variant:side,quote:lead,author:'Lorem ipsum dolor sit amet'});
  const voices = (count = 2) => ({type:'contentSpeakers',variant:String(count),speakers:Array.from({length:count},(_,i)=>({quote:lead,name:`Lorem ipsum · 0${i+1}`}))});
  const twoPoints = {type:'contentMedia',variant:'2',media1Title:'Lorem ipsum dolor',media1Text:lead,media2Title:'Lorem ipsum dolor',media2Text:body};
  const base = (id,title,category,description,referenceTitle,referenceUrl,patterns) => ({id,title,category,description,referenceTitle,referenceUrl,patterns,visualTemplate:true});

  const templates = [
    base('game-changer','บทสัมภาษณ์พร้อมเสียง','Interview','หัวข้อและเครื่องเล่นเสียง · บทนำ · เนื้อหาบทสัมภาษณ์ยาว · คำพูดเด่น','Game Changer','https://www.bangchak.co.th/en/newsroom/reflection/1960/game-changer',[
      {type:'subtitleAudio',text:'Lorem ipsum dolor sit amet'},p(body),p(),p(body),h('Lorem ipsum · 01'),p(),p(body),q(),p(body),h('Lorem ipsum · 02'),p(),p(body),q(),p()
    ]),
    base('biodiesel-to-saf','บทความเล่าเรื่องยาว','Article','ภาพเปิดขนาดใหญ่ · เนื้อหาแบ่งบท · ภาพคั่นและคำพูด','From Biodiesel to SAF','https://www.bangchak.co.th/en/newsroom/bangchak-reflections/1953/from-biodiesel-to-saf',[
      {type:'subtitle',text:'Lorem ipsum dolor sit amet'},p(body),{type:'highlightImage'},h('Lorem ipsum · 01'),p(),p(body),img(),h('Lorem ipsum · 02'),p(body),quoteSplit('right'),h('Lorem ipsum · 03'),p(),q()
    ]),
    base('b24-profile','สัมภาษณ์ผู้บริหาร','Interview','ภาพนำ · ภาพบุคคลและคำแนะนำตัว · คำถามเป็นช่วง · คำพูดปิดท้าย','B24 Marine Biofuels by BSRC','https://www.bangchak.co.th/en/newsroom/reflections/1694/b24-marine-biofuels-by-bsrc',[
      {type:'subtitle',text:'Lorem ipsum dolor sit amet'},p(body),{type:'highlightImage'},img(),h('Lorem ipsum dolor sit amet'),p(),speaker('left'),h('Lorem ipsum · 01'),p(body),h('Lorem ipsum · 02'),p(),q(),h('Lorem ipsum · 03'),p(body),q()
    ]),
    base('high-performance','เรื่องเล่าจากลูกค้า','Interview','บทนำสั้น · บทสัมภาษณ์หลายช่วง · ภาพเดี่ยวและภาพคู่','High-Performance Demands High-Precision Fuel','https://www.bangchak.co.th/en/newsroom/bangchak-reflections/1661/high-performance-demands-high-precision-fuel',[
      {type:'subtitle',text:'Lorem ipsum dolor sit amet'},p(body),{type:'highlightImage'},h('Lorem ipsum · 01'),p(),q(),h('Lorem ipsum · 02'),split('left'),p(body),img('gallery-one'),img('gallery-one'),h('Lorem ipsum · 03'),p(),q()
    ]),
    base('bcpt-decade','เส้นทางองค์กรและบทสัมภาษณ์','Interview','บทนำและโปรไฟล์ผู้ให้สัมภาษณ์ · บทเนื้อหายาว · สรุปประเด็นท้ายเรื่อง','10 Years of BCPT','https://www.bangchak.co.th/en/newsroom/reflections/2045/10-years-of-bcpt-a-decade-of-trust-a-future-of-growth',[
      {type:'subtitle',text:'Lorem ipsum dolor sit amet'},p(body),speaker('right'),p(),h('Lorem ipsum · 01'),p(body),quoteSplit('left'),h('Lorem ipsum · 02'),p(),p(body),h('Lorem ipsum · 03'),twoPoints,q()
    ]),
    base('new-leaf','บทความพร้อมภาพไฮไลท์พื้นเขียว','Feature','ภาพเปิดบนพื้นเขียว · คำโปรย · เนื้อหาแบ่งหัวข้อและภาพ','Bangchak Group Turns Over a “New Leaf”','https://www.bangchak.co.th/en/newsroom/reflection/1021/bangchak-group-turns-over-a-new-leaf',[
      {type:'subtitle',text:'Lorem ipsum dolor sit amet'},{type:'highlightGreenText',text:'Lorem ipsum dolor sit amet',caption:lead},p(body),h('Lorem ipsum · 01'),split('right'),p(),h('Lorem ipsum · 02'),p(body),img(),q()
    ]),
    base('three-perspectives','เรื่องเล่าหลายมุมมอง','Feature','เปิดด้วยภาพ · เนื้อหา · การ์ดคำพูดหลายคนและภาพประกอบ','Together, We Stand Strong','https://www.bangchak.co.th/en/newsroom/reflections/1431/together-we-stand-strong-baan-bangchak-x-banthongyord',[
      {type:'subtitle',text:'Lorem ipsum dolor sit amet'},p(body),{type:'highlightImage'},h('Lorem ipsum · 01'),p(),voices(3),h('Lorem ipsum · 02'),p(body),split('left'),q()
    ]),
    base('chapter-photo-story','บทความสะท้อนแนวคิด','Photo story','ภาพเปิดพื้นเขียว · เนื้อหายาวแบ่งหัวข้อ · คำพูดสรุปท้ายเรื่อง','The Bangchak Way of Balanced Sustainability','https://www.bangchak.co.th/en/newsroom/reflection/1107/the-bangchak-way-of-balanced-sustainability',[
      {type:'subtitle',text:'Lorem ipsum dolor sit amet'},p(body),{type:'highlightGreenEmpty'},h('Lorem ipsum · 01'),p(),img('chapter-one'),img('chapter-one'),h('Lorem ipsum · 02'),p(body),img('chapter-two'),img('chapter-two'),img('chapter-two'),q()
    ])
  ];
  window.ReflectionArticleTemplates = templates;
})();
