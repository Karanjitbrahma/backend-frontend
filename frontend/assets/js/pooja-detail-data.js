// Pooja Detail Page Data & Renderer
(function(){
const poojas = [
  {
    title:'Navagraha Shanti Pooja', badge:'Planetary Remedy', duration:'4-5 Hours', mode:'Live Streaming', location:'Sacred Temple',
    price:'5,100', oldPrice:'', image:'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=700&q=80',
    about:'<p>The Navagraha Shanti Pooja is a powerful Vedic ritual dedicated to pacifying all nine celestial planets — Surya, Chandra, Mangal, Budh, Brihaspati, Shukra, Shani, Rahu, and Ketu.</p><p>When planets are malefic in your birth chart, they create obstacles in career, relationships, health, and finances. This pooja neutralizes their negative effects and strengthens positive influence.</p>',
    info:[{icon:'fa-sun',label:'Deity',val:'All 9 Planetary Deities'},{icon:'fa-clock',label:'Duration',val:'4-5 Hours'},{icon:'fa-video',label:'Mode',val:'Online Live Streaming'},{icon:'fa-users',label:'Pandits',val:'3-4 Learned Brahmins'},{icon:'fa-truck-fast',label:'Prasad',val:'Delivered to Doorstep'}],
    benefits:[{icon:'fa-shield-halved',t:'Removes Planetary Doshas',d:'Neutralizes malefic effects of weak or afflicted planets in your birth chart.'},{icon:'fa-briefcase',t:'Career & Financial Growth',d:'Clears obstacles in professional life and opens new avenues for wealth.'},{icon:'fa-heart',t:'Relationship Harmony',d:'Resolves conflicts and brings peace in marriage and family life.'},{icon:'fa-leaf',t:'Health & Wellbeing',d:'Protects from health issues caused by planetary afflictions.'},{icon:'fa-brain',t:'Mental Peace & Clarity',d:'Reduces anxiety, confusion, and brings mental stability.'},{icon:'fa-star',t:'Spiritual Protection',d:'Creates a divine shield against negative energies and evil eye.'}],
    process:[{t:'Sankalp (Sacred Pledge)',d:'The ritual begins with taking a sacred pledge in your name, gotra, and birth details.'},{t:'Ganesh Puja & Invocation',d:'Lord Ganesha is invoked first to remove all obstacles from the ritual.'},{t:'Individual Planet Mantras',d:'Each of the 9 planets is worshipped with their specific mantras — 108 chants each.'},{t:'Havan (Sacred Fire)',d:'Offerings are made into the sacred fire with specific samagri for each planet.'},{t:'Aarti & Prasad Distribution',d:'The ritual concludes with Aarti and sacred Prasad is prepared for delivery.'}],
    includes:[{icon:'fa-fire',t:'Full Havan',d:'With authentic Samagri'},{icon:'fa-video',t:'Live Streaming',d:'Watch on Zoom/Meet'},{icon:'fa-box',t:'Prasad Delivery',d:'Sacred items couriered'},{icon:'fa-file-video',t:'Video Recording',d:'Complete pooja video'},{icon:'fa-headset',t:'Post-Pooja Guidance',d:'Mantras & instructions'},{icon:'fa-om',t:'Energized Yantra',d:'Navagraha Yantra included'},{icon:'fa-leaf',t:'Pure Samagri',d:'Authentic pooja materials'},{icon:'fa-certificate',t:'Completion Certificate',d:'Digital certificate'}],
    faq:[{q:'How does the live streaming work?',a:'We send you a Zoom/Google Meet link before the pooja. You can watch the entire ritual live and participate in the Sankalp.'},{q:'What birth details do you need?',a:'We need your full name, gotra (if known), date of birth, time of birth, and place of birth for the Sankalp.'},{q:'When will I receive the Prasad?',a:'Prasad is carefully packed and couriered within 3-5 business days after the pooja completion.'},{q:'Can I book for a family member?',a:'Yes! Many people book poojas for family members. Just provide the beneficiary\'s details during booking.'}]
  },
  {
    title:'Maha Mrityunjaya Jaap', badge:'Health & Protection', duration:'11 Days', mode:'1.25 Lakh Chants', location:'Sacred Temple',
    price:'21,000', oldPrice:'', image:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80',
    about:'<p>The Maha Mrityunjaya Jaap is one of the most powerful mantras in Vedic tradition, dedicated to Lord Shiva. It is known as the "Death-Conquering Mantra" and is chanted for health, longevity, and protection.</p><p>Over 11 days, 1,25,000 (1.25 Lakh) mantras are chanted by learned Brahmins with daily Havan, creating an immense spiritual shield around the beneficiary.</p>',
    info:[{icon:'fa-om',label:'Deity',val:'Lord Shiva (Mahadev)'},{icon:'fa-clock',label:'Duration',val:'11 Days Continuous'},{icon:'fa-hashtag',label:'Chants',val:'1,25,000 Mantras'},{icon:'fa-users',label:'Pandits',val:'5-7 Learned Brahmins'},{icon:'fa-truck-fast',label:'Prasad',val:'Energized Rudraksha + Prasad'}],
    benefits:[{icon:'fa-heart-pulse',t:'Health & Longevity',d:'Powerful protection against diseases and promotes faster recovery.'},{icon:'fa-shield-halved',t:'Protection from Accidents',d:'Creates a divine shield against untimely events and accidents.'},{icon:'fa-brain',t:'Mental Strength',d:'Overcomes fear, anxiety, and depression with spiritual fortitude.'},{icon:'fa-sun',t:'Karmic Cleansing',d:'Helps reduce the effects of past negative karma on current life.'},{icon:'fa-hand-holding-heart',t:'Family Protection',d:'Extends protective blessings to the entire family.'},{icon:'fa-dove',t:'Spiritual Upliftment',d:'Deepens meditation practice and spiritual awareness.'}],
    process:[{t:'Sankalp & Ganesh Puja',d:'Sacred pledge taken with your birth details, followed by Lord Ganesha invocation.'},{t:'Daily Mantra Jaap (11 Days)',d:'11,364 mantras chanted each day by 5-7 Brahmins with complete focus and devotion.'},{t:'Daily Havan',d:'Sacred fire ritual performed each day with specific offerings for Lord Shiva.'},{t:'Rudrabhishek',d:'Sacred abhishek of Shiva Lingam with milk, honey, curd, and holy water.'},{t:'Final Purnahuti & Aarti',d:'Grand completion ceremony with final offerings and Aarti on the 11th day.'}],
    includes:[{icon:'fa-fire',t:'11 Daily Havans',d:'Sacred fire each day'},{icon:'fa-video',t:'Daily Updates',d:'Photos & videos daily'},{icon:'fa-box',t:'Prasad Kit',d:'Rudraksha + sacred items'},{icon:'fa-file-video',t:'Full Recording',d:'Complete video of ritual'},{icon:'fa-headset',t:'Post-Jaap Guidance',d:'Mantras for daily use'},{icon:'fa-om',t:'Energized Rudraksha',d:'5 Mukhi blessed bead'},{icon:'fa-leaf',t:'Pure Samagri',d:'Premium quality materials'},{icon:'fa-certificate',t:'Completion Report',d:'Detailed pooja report'}],
    faq:[{q:'Can I watch the jaap daily?',a:'Yes, we provide daily live streaming links and also share photos/videos of each day\'s progress via WhatsApp.'},{q:'Is 11 days continuous without break?',a:'Yes, the jaap is performed continuously for 11 days without any break, maintaining the spiritual energy chain.'},{q:'What Rudraksha will I receive?',a:'You will receive an energized 5 Mukhi Rudraksha that has been present during all 11 days of the Jaap.'},{q:'Can this be done for someone who is ill?',a:'Absolutely. This jaap is especially powerful for those facing health challenges. Many families book it for ailing members.'}]
  },
  {
    title:'Kaal Sarp Dosh Nivaran', badge:'Dosh Nivaran', duration:'3-4 Hours', mode:'Live Streaming', location:'Trimbakeshwar Temple',
    price:'7,500', oldPrice:'', image:'https://images.unsplash.com/photo-1604608672516-f1b9b1d79072?auto=format&fit=crop&w=700&q=80',
    about:'<p>Kaal Sarp Dosh occurs when all seven planets are hemmed between Rahu and Ketu in a birth chart. This dosh can cause recurring obstacles, delayed success, and persistent struggles in life.</p><p>The Kaal Sarp Dosh Nivaran Pooja is performed at sacred temples to neutralize these effects and restore balance to your planetary energies.</p>',
    info:[{icon:'fa-dragon',label:'Dosh Type',val:'Kaal Sarp Yoga'},{icon:'fa-clock',label:'Duration',val:'3-4 Hours'},{icon:'fa-video',label:'Mode',val:'Online Live Streaming'},{icon:'fa-gopuram',label:'Location',val:'Trimbakeshwar / Sacred Temple'},{icon:'fa-truck-fast',label:'Prasad',val:'Nag Idol + Prasad'}],
    benefits:[{icon:'fa-unlock',t:'Removes Life Blockages',d:'Clears persistent obstacles in career, marriage, and financial growth.'},{icon:'fa-chart-line',t:'Career Acceleration',d:'Unblocks stalled promotions and business opportunities.'},{icon:'fa-ring',t:'Marriage & Relationships',d:'Resolves delays in marriage and relationship conflicts.'},{icon:'fa-coins',t:'Financial Stability',d:'Stops unexpected losses and brings financial consistency.'},{icon:'fa-bed',t:'Better Sleep & Peace',d:'Reduces nightmares, anxiety, and restlessness caused by the dosh.'},{icon:'fa-child',t:'Progeny Blessings',d:'Helps couples facing difficulties in conception.'}],
    process:[{t:'Nag Panchami Vidhi',d:'Special serpent deity worship to appease Rahu and Ketu energies.'},{t:'Sarp Suktam Recitation',d:'Chanting of sacred Sarp Suktam mantras for dosh neutralization.'},{t:'Havan & Tarpan',d:'Fire ritual with specific offerings and water libations for planetary peace.'},{t:'Nag Pratima Sthapana',d:'Installation and energization of a sacred Nag (serpent) idol.'},{t:'Aarti & Prasad',d:'Concluding ceremony with Aarti and preparation of sacred Prasad.'}],
    includes:[{icon:'fa-fire',t:'Complete Havan',d:'With Sarp dosh samagri'},{icon:'fa-video',t:'Live Streaming',d:'Full ritual on Zoom'},{icon:'fa-box',t:'Prasad + Nag Idol',d:'Energized items sent'},{icon:'fa-file-video',t:'Video Recording',d:'Complete pooja video'},{icon:'fa-headset',t:'Post-Pooja Guidance',d:'Remedies & mantras'},{icon:'fa-om',t:'Energized Thread',d:'Protection thread included'},{icon:'fa-leaf',t:'Pure Samagri',d:'Authentic ritual materials'},{icon:'fa-certificate',t:'Dosh Report',d:'Before & after analysis'}],
    faq:[{q:'How do I know if I have Kaal Sarp Dosh?',a:'Our astrologers can check your birth chart for free. Share your birth details via WhatsApp and we\'ll confirm.'},{q:'Is this pooja done at Trimbakeshwar?',a:'We perform at Trimbakeshwar or equivalent sacred temples. The location is confirmed at booking.'},{q:'How soon will I see results?',a:'Many devotees report positive changes within 30-45 days. Full effects manifest over 3-6 months.'},{q:'Do I need to be present physically?',a:'No, the pooja is performed on your behalf. You participate via live streaming for the Sankalp.'}]
  },
  {
    title:'Lakshmi Narayan Pooja', badge:'Wealth & Prosperity', duration:'2-3 Hours', mode:'Live Streaming', location:'Sacred Temple',
    price:'3,100', oldPrice:'', image:'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=700&q=80',
    about:'<p>The Lakshmi Narayan Pooja invokes the combined blessings of Goddess Lakshmi (wealth) and Lord Narayan (Vishnu - sustenance). This divine couple represents the ultimate source of material and spiritual prosperity.</p><p>This pooja is ideal for those seeking financial growth, business success, family harmony, and overall abundance in life.</p>',
    info:[{icon:'fa-coins',label:'Deity',val:'Lakshmi & Narayan'},{icon:'fa-clock',label:'Duration',val:'2-3 Hours'},{icon:'fa-video',label:'Mode',val:'Online Live Streaming'},{icon:'fa-users',label:'Pandits',val:'2-3 Learned Brahmins'},{icon:'fa-truck-fast',label:'Prasad',val:'Delivered to Doorstep'}],
    benefits:[{icon:'fa-coins',t:'Wealth Attraction',d:'Invokes Lakshmi\'s blessings for continuous flow of wealth and prosperity.'},{icon:'fa-store',t:'Business Growth',d:'Removes financial obstacles and brings new business opportunities.'},{icon:'fa-home',t:'Family Harmony',d:'Blesses the household with peace, love, and mutual understanding.'},{icon:'fa-hand-holding-heart',t:'Debt Relief',d:'Helps in clearing debts and financial burdens.'},{icon:'fa-star',t:'Good Fortune',d:'Attracts positive luck and auspicious opportunities.'},{icon:'fa-dove',t:'Spiritual Prosperity',d:'Balances material success with inner peace and contentment.'}],
    process:[{t:'Sankalp & Invocation',d:'Sacred pledge and invitation of Lakshmi-Narayan energies.'},{t:'Shri Suktam Recitation',d:'Powerful hymns praising Goddess Lakshmi for wealth and fortune.'},{t:'Vishnu Sahasranama',d:'Chanting of 1000 names of Lord Vishnu for divine protection.'},{t:'Havan & Aarti',d:'Sacred fire ritual with ghee, flowers, and special offerings.'},{t:'Prasad Preparation',d:'Sacred prasad blessed by the divine energies is packed for delivery.'}],
    includes:[{icon:'fa-fire',t:'Havan Ritual',d:'With ghee & flowers'},{icon:'fa-video',t:'Live Streaming',d:'Watch on Zoom/Meet'},{icon:'fa-box',t:'Prasad Delivery',d:'Blessed items couriered'},{icon:'fa-file-video',t:'Video Recording',d:'Full pooja recording'},{icon:'fa-headset',t:'Guidance',d:'Post-pooja mantras'},{icon:'fa-om',t:'Shri Yantra',d:'Energized mini yantra'},{icon:'fa-leaf',t:'Pure Samagri',d:'Premium materials'},{icon:'fa-certificate',t:'Certificate',d:'Digital completion cert'}],
    faq:[{q:'When is the best time for this pooja?',a:'Fridays and Thursdays are most auspicious. Our team selects the best Muhurat based on your chart.'},{q:'Can I do this for my business?',a:'Absolutely! Many business owners book this pooja for shop/office blessings and financial growth.'},{q:'Is this suitable for new home?',a:'Yes, this is an excellent pooja to perform when moving into a new home for prosperity blessings.'},{q:'What should I do after the pooja?',a:'We provide daily Lakshmi mantras and simple rituals to maintain the positive energy at home.'}]
  },
  {
    title:'Vastu Shanti Pooja', badge:'Home & Space', duration:'5-6 Hours', mode:'At Your Location', location:'Your Home/Office',
    price:'11,000', oldPrice:'', image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80',
    about:'<p>Vastu Shanti Pooja harmonizes the five elements (Panch Tatva) within your living or working space. It corrects Vastu doshas without any demolition or structural changes.</p><p>This comprehensive ritual purifies the space, removes negative energies, and invites positive vibrations for health, wealth, and happiness of all occupants.</p>',
    info:[{icon:'fa-house',label:'Type',val:'Space Purification'},{icon:'fa-clock',label:'Duration',val:'5-6 Hours'},{icon:'fa-location-dot',label:'Location',val:'At Your Premises'},{icon:'fa-users',label:'Pandits',val:'3-4 Learned Brahmins'},{icon:'fa-leaf',label:'Samagri',val:'All Materials Included'}],
    benefits:[{icon:'fa-house',t:'Space Purification',d:'Removes all negative energies and Vastu doshas from your premises.'},{icon:'fa-heart',t:'Family Harmony',d:'Reduces conflicts and brings peace among family members.'},{icon:'fa-coins',t:'Financial Growth',d:'Activates wealth zones and removes financial blockages.'},{icon:'fa-heart-pulse',t:'Health Improvement',d:'Corrects health-affecting Vastu issues for better wellbeing.'},{icon:'fa-bed',t:'Better Sleep',d:'Creates a peaceful environment conducive to restful sleep.'},{icon:'fa-briefcase',t:'Career Success',d:'Enhances professional growth for all occupants.'}],
    process:[{t:'Vastu Purush Puja',d:'Worship of Vastu Purush — the deity governing spatial energies.'},{t:'Directional Shanti',d:'Rituals to harmonize all 8 directions and the center (Brahmasthan).'},{t:'Panch Tatva Balancing',d:'Balancing of Earth, Water, Fire, Air, and Space elements.'},{t:'Havan & Purification',d:'Sacred fire ritual to purify the entire premises with Vedic mantras.'},{t:'Griha Pravesh Vidhi',d:'Re-energizing the space with fresh positive vibrations.'}],
    includes:[{icon:'fa-fire',t:'Complete Havan',d:'At your premises'},{icon:'fa-compass',t:'Direction Analysis',d:'All 8 directions'},{icon:'fa-box',t:'Full Samagri',d:'All materials provided'},{icon:'fa-file-lines',t:'Vastu Report',d:'Written recommendations'},{icon:'fa-headset',t:'Follow-up Support',d:'Post-pooja guidance'},{icon:'fa-om',t:'Vastu Yantra',d:'Energized for placement'},{icon:'fa-leaf',t:'Space Cleansing',d:'With sacred herbs'},{icon:'fa-certificate',t:'Certificate',d:'Completion certificate'}],
    faq:[{q:'Do you travel to my location?',a:'Yes, our Pandit Ji and team travel to your home/office. Travel charges may apply for locations outside the city.'},{q:'Will there be any demolition?',a:'Absolutely not. We provide non-demolition Vastu remedies that work through mantras, yantras, and energy correction.'},{q:'How long do the effects last?',a:'The effects are permanent as long as you follow the simple maintenance guidelines we provide after the pooja.'},{q:'Can this be done for rented property?',a:'Yes! Vastu Shanti is equally effective for rented homes and offices.'}]
  },
  {
    title:'Mangal Dosh Nivaran', badge:'Marriage Remedy', duration:'3-4 Hours', mode:'Live Streaming', location:'Sacred Temple',
    price:'5,500', oldPrice:'', image:'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=700&q=80',
    about:'<p>Mangal Dosh (Manglik Dosh) occurs when Mars is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house of a birth chart. It can cause delays in marriage, conflicts between partners, and instability in married life.</p><p>This Nivaran Pooja neutralizes the aggressive energy of Mars and brings harmony, compatibility, and happiness in relationships.</p>',
    info:[{icon:'fa-ring',label:'Purpose',val:'Marriage & Relationships'},{icon:'fa-clock',label:'Duration',val:'3-4 Hours'},{icon:'fa-video',label:'Mode',val:'Online Live Streaming'},{icon:'fa-users',label:'Pandits',val:'2-3 Learned Brahmins'},{icon:'fa-truck-fast',label:'Prasad',val:'Delivered to Doorstep'}],
    benefits:[{icon:'fa-ring',t:'Marriage Unblocking',d:'Removes delays and obstacles in finding a suitable life partner.'},{icon:'fa-heart',t:'Marital Harmony',d:'Resolves conflicts and brings understanding between spouses.'},{icon:'fa-shield-halved',t:'Dosh Neutralization',d:'Completely neutralizes the negative effects of Mangal placement.'},{icon:'fa-hand-holding-heart',t:'Emotional Stability',d:'Reduces anger issues and emotional volatility caused by Mars.'},{icon:'fa-child',t:'Progeny Blessings',d:'Supports healthy conception and childbirth for couples.'},{icon:'fa-star',t:'Overall Life Balance',d:'Brings stability in career and finances alongside relationship harmony.'}],
    process:[{t:'Mangal Graha Shanti',d:'Specific mantras to pacify the aggressive energy of planet Mars.'},{t:'Hanuman Puja',d:'Lord Hanuman worship — the most powerful remedy for Mangal Dosh.'},{t:'Mangal Kavach Recitation',d:'Chanting of protective Mangal Kavach mantras for lasting protection.'},{t:'Havan & Offerings',d:'Sacred fire ritual with red flowers, red sandalwood, and specific samagri.'},{t:'Aarti & Blessing',d:'Concluding ceremony with Aarti and distribution of blessed Prasad.'}],
    includes:[{icon:'fa-fire',t:'Mangal Havan',d:'With red sandalwood'},{icon:'fa-video',t:'Live Streaming',d:'Full ritual on Zoom'},{icon:'fa-box',t:'Prasad Delivery',d:'Sacred items couriered'},{icon:'fa-file-video',t:'Video Recording',d:'Complete pooja video'},{icon:'fa-headset',t:'Remedies Guide',d:'Daily mantras & tips'},{icon:'fa-om',t:'Mangal Yantra',d:'Energized protection'},{icon:'fa-leaf',t:'Pure Samagri',d:'Authentic materials'},{icon:'fa-certificate',t:'Dosh Report',d:'Analysis certificate'}],
    faq:[{q:'How do I know if I have Mangal Dosh?',a:'Share your birth details via WhatsApp and our astrologers will check your chart for free and confirm.'},{q:'Should both partners do this pooja?',a:'If both partners are Manglik, we recommend individual poojas for each. If only one is Manglik, one pooja is sufficient.'},{q:'Can this be done after marriage?',a:'Yes! This pooja is effective both before and after marriage for resolving Mangal-related issues.'},{q:'What daily remedy should I follow?',a:'We recommend chanting Hanuman Chalisa every Tuesday and Saturday, and we provide a full remedies guide.'}]
  }
];

// Render page - read id from hash (#id=3) first, then query param as fallback
function getPoojaId() {
    const h = location.hash.replace('#','');
    const hp = new URLSearchParams(h);
    if (hp.get('id') !== null) return parseInt(hp.get('id')) || 0;
    const qp = new URLSearchParams(location.search);
    if (qp.get('id') !== null) return parseInt(qp.get('id')) || 0;
    return 0;
}
const params = new URLSearchParams(location.search);
const id = getPoojaId();
const p = poojas[id] || poojas[0];

// Read whatsapp number and pooja data from CMS
let waNum = '911253354445';
const raw = localStorage.getItem('bs_admin_data');
let adminPooja = null;
if (raw) {
    try {
        const d = JSON.parse(raw);
        if (d.pooja && d.pooja[id]) adminPooja = d.pooja[id];
        if (d.site && d.site.whatsapp) waNum = d.site.whatsapp;
    } catch(e){}
}

const wa = 'https://wa.me/' + waNum + '?text=' + encodeURIComponent('I want to book ' + (adminPooja ? adminPooja.title : p.title) + ' pooja');

document.title = (adminPooja ? adminPooja.title : p.title) + ' - Bhartiya Sidhant';

// Hero
const $ = s => document.getElementById(s);
if ($('pdBadge')) $('pdBadge').textContent = p.badge;
if ($('pdTitle')) $('pdTitle').textContent = adminPooja ? adminPooja.title : p.title;
if ($('pdSubtitle')) $('pdSubtitle').textContent = adminPooja ? (adminPooja.desc || '').split('.')[0] : p.about.replace(/<[^>]+>/g,'').substring(0,120)+'...';
if ($('pdDuration')) $('pdDuration').textContent = p.duration;
if ($('pdMode')) $('pdMode').textContent = p.mode;
if ($('pdLocation')) $('pdLocation').textContent = p.location;
if ($('pdPrice')) $('pdPrice').textContent = '₹' + (adminPooja ? adminPooja.newPrice : p.price);
if ($('pdOldPrice') && (adminPooja?.oldPrice || p.oldPrice)) $('pdOldPrice').textContent = '₹' + (adminPooja?.oldPrice || p.oldPrice);
if ($('pdImage')) $('pdImage').src = adminPooja ? adminPooja.image : p.image;
if ($('pdImage')) $('pdImage').alt = adminPooja ? adminPooja.title : p.title;
if ($('pdBookBtn')) $('pdBookBtn').href = wa;
if ($('pdCtaWhatsapp')) $('pdCtaWhatsapp').href = wa;
if ($('pdAboutHeading')) $('pdAboutHeading').innerHTML = 'What is <span>' + (adminPooja ? adminPooja.title : p.title) + '?</span>';
if ($('pdAboutContent')) $('pdAboutContent').innerHTML = p.about;
if ($('pdProcessTitle')) $('pdProcessTitle').textContent = adminPooja ? adminPooja.title : p.title;

// Info card
const il = $('pdInfoList');
if (il) il.innerHTML = p.info.map(i => `<li><i class="fa-solid ${i.icon}"></i><div><strong>${i.label}</strong><span>${i.val}</span></div></li>`).join('');

// Benefits
const bg = $('pdBenefitsGrid');
if (bg) bg.innerHTML = p.benefits.map(b => `<div class="pd-benefit"><div class="pd-b-icon"><i class="fa-solid ${b.icon}"></i></div><h4>${b.t}</h4><p>${b.d}</p></div>`).join('');

// Process
const pt = $('pdProcessTimeline');
if (pt) pt.innerHTML = p.process.map((s,i) => `<div class="pd-process-step"><div class="pd-ps-dot">${i+1}</div><h4>${s.t}</h4><p>${s.d}</p></div>`).join('');

// Includes
const ig = $('pdIncludesGrid');
if (ig) ig.innerHTML = p.includes.map(i => `<div class="pd-include-item"><div class="pd-inc-icon"><i class="fa-solid ${i.icon}"></i></div><h4>${i.t}</h4><p>${i.d}</p></div>`).join('');

// FAQ
const fl = $('pdFaqList');
if (fl) {
    fl.innerHTML = p.faq.map(f => `<div class="pd-faq-item"><button class="pd-faq-q"><span>${f.q}</span><i class="fa-solid fa-chevron-down"></i></button><div class="pd-faq-a"><p>${f.a}</p></div></div>`).join('');
    fl.querySelectorAll('.pd-faq-q').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isOpen = item.classList.contains('open');
            fl.querySelectorAll('.pd-faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
}

// Re-render when hash changes (e.g. navigating between poojas)
window.currentPooja = {
    ...p,
    title: adminPooja ? adminPooja.title : p.title,
    price: adminPooja ? adminPooja.newPrice : p.price,
    oldPrice: adminPooja ? adminPooja.oldPrice : p.oldPrice,
    image: adminPooja ? adminPooja.image : p.image,
    reqShipping: adminPooja ? adminPooja.reqShipping : p.reqShipping,
    reqBirth: adminPooja ? adminPooja.reqBirth : p.reqBirth,
    reqNotes: adminPooja ? adminPooja.reqNotes : p.reqNotes,
    checkoutFields: adminPooja ? adminPooja.checkoutFields : p.checkoutFields
};
window.addEventListener('hashchange', () => location.reload());
})();
