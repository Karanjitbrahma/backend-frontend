// Bhartiya Sidhant Admin Panel - Complete CMS
const AdminApp = {
    currentSection: 'dashboard',
    currentCmsKey: '',
    data: {},

    getBackendUrl() {
        const currentOrigin = window.location.origin;
        return (currentOrigin.includes('localhost') || currentOrigin.includes('127.0.0.1'))
            ? 'http://127.0.0.1:3001'
            : (currentOrigin === 'null' || currentOrigin.startsWith('file:'))
                ? 'http://127.0.0.1:3001'
                : 'https://bhartiya-backend.onrender.com';
    },

    SECTIONS: {
        reports: { label: 'Reports', icon: 'fa-file-lines' },
        store: { label: 'Store', icon: 'fa-gem' },
        services: { label: 'Services', icon: 'fa-concierge-bell' },
        pooja: { label: 'Pooja', icon: 'fa-hands-praying' },
        courses: { label: 'Courses', icon: 'fa-graduation-cap' },
        blog: { label: 'Blog', icon: 'fa-blog' },
        consultation: { label: 'Consultation', icon: 'fa-headset' },
        consultAcharya: { label: 'Consult Acharya', icon: 'fa-crown' }
    },

    getDefaultData() {
        const data = this.getDefaultDataRaw();
        if (!data.coupons) data.coupons = [];
        return data;
    },

    getDefaultDataRaw() {
        return {
            site: { name: 'Bhartiya Sidhant', email: 'info@bhartiyasidhant.com', phone: '+91 12533 54445', whatsapp: '911253354445', address: 'DDA Market, Pocket 1, Sector D, Vasant Kunj, New Delhi, 110070, Delhi', facebook: '#', instagram: '#', youtube: '#', twitter: '#', telegram: '#' },
            reports: [
                { title: 'Career Report', desc: 'Find Your True Career Direction', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80', icon: 'fa-briefcase', oldPrice: '1,899', newPrice: '999', link: 'reports/career-report.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Personalized Horoscope', desc: 'Get Clarity with Your Personal Report', image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f0?auto=format&fit=crop&w=400&q=80', icon: 'fa-scroll', oldPrice: '599', newPrice: '299', link: 'reports/personalized-horoscope.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Saturn In Your Birth Chart', desc: 'Clarity for the Next Phase of Your Life', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80', icon: 'fa-ring', oldPrice: '2,140', newPrice: '1,070', link: 'reports/saturn-report.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Lal Kitab Report', desc: 'Powerful Remedies for a Better Life', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80', icon: 'fa-book', oldPrice: '3,500', newPrice: '1,699', link: 'reports/lal-kitab-report.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Premium Personalized Kundli', desc: 'Detailed Insight into Your Life', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80', icon: 'fa-star', oldPrice: '1,100', newPrice: '499', link: 'reports/premium-kundli.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Couple Kundli Matching', desc: 'Find Your Perfect Partner Compatibility', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80', icon: 'fa-heart', oldPrice: '1,022', newPrice: '511', link: 'reports/couple-matching.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Fortune Report', desc: 'Insights into Your Future Wealth', image: 'https://images.unsplash.com/photo-1553729459-afe8f2f2d882?auto=format&fit=crop&w=400&q=80', icon: 'fa-coins', oldPrice: '1,800', newPrice: '499', link: 'reports/fortune-report.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Baby Report', desc: 'Your Child\'s Cosmic Blueprint', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80', icon: 'fa-baby', oldPrice: '1,599', newPrice: '699', link: 'reports/baby-report.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Rahu Ketu Transit Impact', desc: 'Navigate the Shadow Planets', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80', icon: 'fa-moon', oldPrice: '1,599', newPrice: '994', link: 'reports/rahu-ketu-transit.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Jupiter Transit', desc: 'Unlock Prosperity and Growth', image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=400&q=80', icon: 'fa-sun', oldPrice: '1,599', newPrice: '993', link: 'reports/jupiter-transit.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Love Report', desc: 'Find Your Soulmate Connection', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80', icon: 'fa-heart-pulse', oldPrice: '1,499', newPrice: '499', link: 'reports/love-report.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Sade Sati Basic', desc: 'Understand Saturn\'s 7.5 Year Influence', image: 'https://images.unsplash.com/photo-1515942661900-94b3d1972b72?auto=format&fit=crop&w=400&q=80', icon: 'fa-circle-half-stroke', oldPrice: '790', newPrice: '395', link: 'reports/sade-sati-basic.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Personalized Fortune Plus', desc: 'Comprehensive Financial Guidance', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80', icon: 'fa-chart-line', oldPrice: '2,600', newPrice: '1,300', link: 'reports/fortune-plus.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Finance Report', desc: 'Manage Your Wealth Better', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80', icon: 'fa-wallet', oldPrice: '920', newPrice: '460', link: 'reports/finance-report.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Name Analysis', desc: 'Unlock the Power of Your Name', image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80', icon: 'fa-signature', oldPrice: '7,500', newPrice: '1,100', link: 'reports/name-analysis.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Varshphal Report', desc: 'Your Yearly Progress Guide', image: 'https://images.unsplash.com/photo-1435527173128-983b87201f4d?auto=format&fit=crop&w=400&q=80', icon: 'fa-calendar', oldPrice: '500', newPrice: '349', link: 'reports/varshphal-report.html', imgFit: 'cover', imgScale: 1 }
            ],
            store: [
                { title: 'Yellow Sapphire (Pukhraj)', desc: 'For Jupiter — Prosperity & Wisdom', image: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=500', icon: 'fa-gem', oldPrice: '', newPrice: '15,000/Ratti', link: 'store.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Blue Sapphire (Neelam)', desc: 'For Saturn — Discipline & Fortune', image: 'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg?auto=compress&cs=tinysrgb&w=500', icon: 'fa-gem', oldPrice: '', newPrice: '20,000/Ratti', link: 'store.html', imgFit: 'cover', imgScale: 1 },
                { title: '5 Mukhi Rudraksha', desc: 'For Health & Peace of Mind', image: 'https://images.pexels.com/photos/6431096/pexels-photo-6431096.jpeg?auto=compress&cs=tinysrgb&w=500', icon: 'fa-circle-dot', oldPrice: '', newPrice: '1,500', link: 'store.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Copper Sri Yantra', desc: 'For Wealth & Lakshmi Blessings', image: 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=500', icon: 'fa-dharmachakra', oldPrice: '', newPrice: '2,100', link: 'store.html', imgFit: 'cover', imgScale: 1 }
            ],
            pooja: [
                { title: 'Navagraha Shanti Pooja', desc: 'Pacify malefic planets & remove obstacles. 4-5 Hours with Live Streaming.', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=400&q=80', icon: 'fa-sun', oldPrice: '', newPrice: '5,100', link: 'pooja.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Maha Mrityunjaya Jaap', desc: 'Powerful mantra for health & longevity. 11 Days, 1.25 Lakh Chants.', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&q=80', icon: 'fa-hands-praying', oldPrice: '', newPrice: '21,000', link: 'pooja.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Kaal Sarp Dosh Nivaran', desc: 'Neutralize Kaal Sarp Dosh effects. 3-4 Hours with Live Streaming.', image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d79072?auto=format&fit=crop&w=400&q=80', icon: 'fa-dragon', oldPrice: '', newPrice: '7,500', link: 'pooja.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Lakshmi Narayan Pooja', desc: 'Attract wealth & prosperity. 2-3 Hours with Live Streaming.', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=400&q=80', icon: 'fa-coins', oldPrice: '', newPrice: '3,100', link: 'pooja.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Vastu Shanti Pooja', desc: 'Harmonize your home or office. 5-6 Hours at Your Location.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80', icon: 'fa-house', oldPrice: '', newPrice: '11,000', link: 'pooja.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Mangal Dosh Nivaran', desc: 'Remove Manglik Dosh for marriage. 3-4 Hours with Live Streaming.', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=400&q=80', icon: 'fa-ring', oldPrice: '', newPrice: '5,500', link: 'pooja.html', imgFit: 'cover', imgScale: 1 }
            ],
            courses: [
                { title: 'Vedic Astrology Foundations', desc: 'Start your journey into Jyotish Shastra. 12 Weeks, Live Online, Hindi + English. Beginner level.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80', icon: 'fa-book-open', oldPrice: '', newPrice: '14,999', link: 'https://wa.me/911253354445?text=I%20want%20to%20enroll%20in%20Vedic%20Astrology%20Beginners%20course', imgFit: 'cover', imgScale: 1 },
                { title: 'Predictive Astrology Mastery', desc: 'Become a professional Vedic astrologer. 24 Weeks, Live Online. Advanced level with 50+ case studies.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80', icon: 'fa-graduation-cap', oldPrice: '', newPrice: '29,999', link: 'https://wa.me/911253354445?text=I%20want%20to%20enroll%20in%20Predictive%20Astrology%20Advanced%20course', imgFit: 'cover', imgScale: 1 },
                { title: 'Maha Vastu Shastra', desc: 'Master the science of spatial energy. 8 Weeks, Live Online. Specialized course.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80', icon: 'fa-compass', oldPrice: '', newPrice: '11,999', link: 'https://wa.me/911253354445?text=I%20want%20to%20enroll%20in%20Maha%20Vastu%20Shastra%20course', imgFit: 'cover', imgScale: 1 }
            ],
            services: [
                { title: 'Kundli / Birth Chart', desc: 'Complete Vedic birth chart analysis covering all 12 houses, planetary positions, dashas, and yogas to reveal your life\'s blueprint.', image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f0?auto=format&fit=crop&w=600&q=80', icon: 'fa-scroll', oldPrice: '', newPrice: '', link: 'services/kundli-reading.html', imgFit: 'cover', imgScale: 1, category: 'astrology' },
                { title: 'Kundli Milan / Match Making', desc: 'Comprehensive Ashtakoota Guna matching, Mangal Dosha check, and Nadi analysis for marriage compatibility.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80', icon: 'fa-heart', oldPrice: '', newPrice: '', link: 'services/match-making.html', imgFit: 'cover', imgScale: 1, category: 'astrology' },
                { title: 'Muhurta (Auspicious Time)', desc: 'Find the perfect timing for marriage, griha pravesh, business launch, or any important event based on Panchang.', image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=600&q=80', icon: 'fa-clock', oldPrice: '', newPrice: '', link: 'services/annual-predictions.html', imgFit: 'cover', imgScale: 1, category: 'astrology' },
                { title: 'Career & Financial Astrology', desc: 'Detailed analysis of your 10th & 2nd houses to guide career choices, job timing, and wealth accumulation strategies.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80', icon: 'fa-briefcase', oldPrice: '', newPrice: '', link: 'services/kundli-reading.html', imgFit: 'cover', imgScale: 1, category: 'astrology' },
                { title: 'Love & Relationship Reading', desc: 'Understand relationship patterns, timing of marriage, and remedies for delayed or troubled partnerships.', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80', icon: 'fa-heart-pulse', oldPrice: '', newPrice: '', link: 'services/match-making.html', imgFit: 'cover', imgScale: 1, category: 'astrology' },
                { title: 'Health Astrology', desc: 'Medical astrology analysis identifying vulnerable areas and planetary remedies for better health and longevity.', image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=600&q=80', icon: 'fa-heart-circle-check', oldPrice: '', newPrice: '', link: 'services/kundli-reading.html', imgFit: 'cover', imgScale: 1, category: 'astrology' },
                { title: 'Residential Vastu', desc: 'Complete audit of your home\'s energy flow with practical, non-demolition remedies for peace, harmony, and prosperity.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', icon: 'fa-house', oldPrice: '', newPrice: '', link: 'services/home-vastu.html', imgFit: 'cover', imgScale: 1, category: 'vastu' },
                { title: 'Commercial Vastu', desc: 'Strategic Vastu consultation for offices, shops, and factories to enhance business growth and employee productivity.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', icon: 'fa-building', oldPrice: '', newPrice: '', link: 'services/office-vastu.html', imgFit: 'cover', imgScale: 1, category: 'vastu' },
                { title: 'Plot & Construction', desc: 'Vastu-compliant guidance for plot selection, building design, room placement, and directional planning from scratch.', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80', icon: 'fa-drafting-compass', oldPrice: '', newPrice: '', link: 'services/plot-construction.html', imgFit: 'cover', imgScale: 1, category: 'vastu' },
                { title: 'Gemstone Recommendation', desc: 'Get the right certified gemstone prescribed based on your Kundli for specific planetary strengthening.', image: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?auto=format&fit=crop&w=600&q=80', icon: 'fa-gem', oldPrice: '', newPrice: '', link: 'services/gemstone-therapy.html', imgFit: 'cover', imgScale: 1, category: 'remedies' },
                { title: 'Rudraksha Therapy', desc: 'Authentic Nepali & Indonesian Rudraksha selection based on your planetary needs for spiritual & physical healing.', image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=600&q=80', icon: 'fa-circle-dot', oldPrice: '', newPrice: '', link: 'services/rudraksha.html', imgFit: 'cover', imgScale: 1, category: 'remedies' },
                { title: 'Yantra Siddhi', desc: 'Energized copper and silver yantras for wealth (Shree Yantra), protection (Sudarshan), and spiritual awakening.', image: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?auto=format&fit=crop&w=600&q=80', icon: 'fa-dharmachakra', oldPrice: '', newPrice: '', link: 'services/yantra-energization.html', imgFit: 'cover', imgScale: 1, category: 'remedies' }
            ],
            blog: [
                { title: 'Impact of Saturn Transit in Aquarius 2026', desc: 'How Saturn\'s transit will affect all 12 zodiac signs financially and emotionally.', image: 'https://images.unsplash.com/photo-1515943681423-731804f5b721?auto=format&fit=crop&w=600&q=80', icon: 'fa-pen-nib', oldPrice: '', newPrice: '', link: '', imgFit: 'cover', imgScale: 1, category: 'Planetary Transits', content: 'Saturn\'s transit into Aquarius in 2026 marks a significant celestial event that will affect every zodiac sign differently. As the great taskmaster of the zodiac, Saturn brings discipline, restructuring, and karmic lessons wherever it goes.\n\nFor Aries natives, this transit activates the 11th house of gains, bringing new friendships and financial opportunities through networking. Taurus will feel Saturn\'s influence in the 10th house, making career and reputation a major focus.\n\nGemini natives should prepare for transformation in their belief systems as Saturn transits their 9th house. Cancer signs will experience deep changes in shared resources and intimacy matters.\n\nLeo natives will see major developments in partnerships and marriage. Virgo will focus on health routines and daily work habits. Libra natives experience creativity boosts and romantic developments.\n\nScorpio faces home and family restructuring. Sagittarius focuses on communication and sibling relationships. Capricorn deals with financial restructuring. Aquarius experiences a complete personal transformation. Pisces focuses on solitude and spiritual growth.\n\nKey remedies during this transit include chanting the Shani mantra, wearing blue sapphire (after consultation), donating black items on Saturdays, and performing Hanuman Chalisa recitation.' },
                { title: 'Scientific & Spiritual Benefits of Rudraksha', desc: 'How different Mukhi Rudrakshas interact with the human aura for peace and prosperity.', image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=600&q=80', icon: 'fa-pen-nib', oldPrice: '', newPrice: '', link: '', imgFit: 'cover', imgScale: 1, category: 'Spiritual Healing', content: 'Rudraksha beads have been revered for thousands of years in Hindu and Buddhist traditions. Modern scientific research has now begun to validate what ancient sages knew all along — these sacred seeds possess remarkable electromagnetic properties that interact with the human body\'s bioelectric field.\n\nThe term "Rudraksha" comes from two Sanskrit words: "Rudra" (Lord Shiva) and "Aksha" (eyes/tears). Legend says these beads were formed from Lord Shiva\'s tears of compassion for humanity.\n\nDifferent Mukhi (faceted) Rudrakshas have distinct properties:\n\n1 Mukhi — Supreme consciousness, connection to Shiva. Extremely rare and powerful for spiritual awakening.\n\n5 Mukhi — Most common and versatile. Controls blood pressure, reduces stress, improves focus. Ruled by Jupiter.\n\n7 Mukhi — Ruled by Mahalakshmi. Attracts wealth and removes financial obstacles.\n\n9 Mukhi — Represents Goddess Durga. Provides courage, energy, and protection from negativity.\n\n11 Mukhi — Ruled by Hanuman. Grants fearlessness, physical strength, and adventurous spirit.\n\nScientific studies have shown that Rudraksha beads have a unique property called "piezoelectricity" — they generate a small electrical charge under pressure. When worn against the skin, they create a subtle bioelectric circuit that can regulate heart rate and blood pressure.\n\nAlways consult a qualified astrologer before selecting a Rudraksha based on your birth chart for maximum benefits.' },
                { title: '5 Vastu Tips for Attracting Wealth', desc: 'Easy Vastu remedies for home and office to unblock financial stagnation.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', icon: 'fa-pen-nib', oldPrice: '', newPrice: '', link: '', imgFit: 'cover', imgScale: 1, category: 'Vastu Shastra', content: 'Vastu Shastra, the ancient Indian science of architecture and spatial arrangement, teaches us that the flow of energy in our living and working spaces directly impacts our financial prosperity. Here are five powerful Vastu tips to attract wealth:\n\n1. North Direction — The Zone of Wealth\nThe north direction is governed by Kubera, the god of wealth. Keep this area clean, clutter-free, and well-lit. Place a money plant or a small water fountain here. Never store heavy furniture or junk in the north.\n\n2. Main Entrance — The Gateway of Prosperity\nYour main door should open inward (clockwise) and be well-lit with no obstructions. A clean, decorated entrance invites positive energy. Place fresh flowers or a Toran at the entrance.\n\n3. Cash Locker Placement\nPlace your locker or safe in the south or southwest wall of your home/office. The locker door should open towards the north. This ensures that wealth flows in and stays.\n\n4. Kitchen — The Fire Element\nThe kitchen should be in the southeast direction (Agni corner). Cook facing east for health and prosperity. Never place the stove directly opposite the water sink as fire and water are opposing elements.\n\n5. Remove Clutter & Broken Items\nBroken mirrors, stopped clocks, leaking taps, and unused items create negative energy that blocks financial growth. Regularly declutter your space. Donate items you haven\'t used in a year.\n\nBonus Tip: Place a Sri Yantra or Kuber Yantra in your puja room or north wall after proper energization for continuous wealth attraction.' },
                { title: 'Understanding Your Moon Sign in Vedic Astrology', desc: 'Why your Moon sign is more important than your Sun sign in Jyotish and how it shapes your emotional world.', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80', icon: 'fa-pen-nib', oldPrice: '', newPrice: '', link: '', imgFit: 'cover', imgScale: 1, category: 'Vedic Astrology', content: 'In Western astrology, the Sun sign takes center stage. However, in Vedic Astrology (Jyotish Shastra), the Moon sign (Rashi) is considered far more important for understanding an individual\'s personality, emotions, and life path.\n\nThe Moon represents the mind (Manas) in Vedic astrology. It governs our emotions, instincts, habits, and subconscious patterns. While the Sun shows our soul and external identity, the Moon reveals our inner world — how we feel, react, and process experiences.\n\nYour Moon sign is determined by the position of the Moon in a specific zodiac sign (Rashi) at the exact time of your birth. This is why accurate birth time is crucial for Vedic chart preparation.\n\nThe 12 Moon Signs and their core traits:\n• Mesha (Aries) — Bold, impulsive, pioneering spirit\n• Vrishabha (Taurus) — Stable, sensual, loves comfort\n• Mithuna (Gemini) — Curious, communicative, adaptable\n• Karka (Cancer) — Nurturing, emotional, home-loving\n• Simha (Leo) — Proud, generous, natural leader\n• Kanya (Virgo) — Analytical, service-oriented, detail-focused\n• Tula (Libra) — Harmonious, artistic, relationship-focused\n• Vrishchika (Scorpio) — Intense, transformative, secretive\n• Dhanu (Sagittarius) — Philosophical, optimistic, freedom-loving\n• Makara (Capricorn) — Disciplined, ambitious, practical\n• Kumbha (Aquarius) — Humanitarian, innovative, detached\n• Meena (Pisces) — Intuitive, compassionate, spiritual\n\nKnowing your Moon sign helps you understand your emotional needs, compatible relationships, and the best remedies for planetary afflictions in your chart.' },
                { title: 'The Power of Navagraha Pooja', desc: 'How the nine planetary deities influence your life and why Navagraha Shanti is essential for cosmic harmony.', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=600&q=80', icon: 'fa-pen-nib', oldPrice: '', newPrice: '', link: '', imgFit: 'cover', imgScale: 1, category: 'Spiritual Remedies', content: 'In Vedic cosmology, the Navagrahas (nine celestial bodies) are believed to have a profound influence on human life. These are Surya (Sun), Chandra (Moon), Mangal (Mars), Budh (Mercury), Brihaspati (Jupiter), Shukra (Venus), Shani (Saturn), Rahu, and Ketu.\n\nEach Graha governs specific aspects of life:\n• Surya — Soul, authority, father, government\n• Chandra — Mind, emotions, mother, water\n• Mangal — Energy, courage, siblings, property\n• Budh — Intelligence, communication, business\n• Brihaspati — Wisdom, children, fortune, spirituality\n• Shukra — Love, beauty, luxury, relationships\n• Shani — Discipline, karma, longevity, justice\n• Rahu — Obsession, foreign lands, technology\n• Ketu — Spirituality, detachment, past karma\n\nWhen one or more planets are afflicted in your birth chart, their negative influences can manifest as obstacles in career, health issues, relationship problems, or financial difficulties.\n\nNavagraha Shanti Pooja is a powerful Vedic ritual performed to pacify all nine planets simultaneously. During this ceremony, mantras specific to each planet are chanted while offerings are made into the sacred fire (Havan).\n\nBenefits of Navagraha Pooja:\n1. Removes planetary doshas from your chart\n2. Brings balance and harmony to all life areas\n3. Protects from unforeseen negative events\n4. Enhances the positive influence of benefic planets\n5. Creates a shield of cosmic protection\n\nIt is recommended to perform Navagraha Shanti Pooja at least once a year, especially during planetary transits or Dasha changes.' },
                { title: 'Gemstones: Myths vs. Reality in Astrology', desc: 'Separating fact from fiction about astrological gemstones and their real therapeutic benefits.', image: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?auto=format&fit=crop&w=600&q=80', icon: 'fa-pen-nib', oldPrice: '', newPrice: '', link: '', imgFit: 'cover', imgScale: 1, category: 'Gemstone Guide', content: 'Astrological gemstones have been used for millennia across cultures as tools for planetary remediation. However, the modern marketplace is filled with misinformation that can lead to wrong selections and even negative effects. Let\'s separate the myths from reality.\n\nMyth 1: "Any gemstone shop can prescribe the right stone"\nReality: Gemstone selection MUST be based on your birth chart analysis by a qualified astrologer. The wrong gemstone can amplify negative planetary effects. A Blue Sapphire (Neelam), for example, can be highly beneficial for one person but disastrous for another.\n\nMyth 2: "Bigger is always better"\nReality: Quality matters more than size. A smaller, high-clarity natural gemstone will be more effective than a larger, flawed one. The minimum recommended weight varies: Ruby and Emerald (3+ carats), Blue Sapphire (2+ carats), Yellow Sapphire (3+ carats).\n\nMyth 3: "Synthetic gems work just as well"\nReality: Lab-created gems lack the natural electromagnetic frequency that develops over millions of years. Only natural, untreated gemstones have astrological potency. Always insist on a lab certification.\n\nMyth 4: "You can wear multiple gemstones together"\nReality: Some planetary energies conflict with each other. For example, Ruby (Sun) and Blue Sapphire (Saturn) should never be worn together as Sun and Saturn are natural enemies. Always consult your astrologer for compatible combinations.\n\nMyth 5: "Gemstones work immediately"\nReality: It typically takes 30-45 days for a gemstone to show noticeable effects. The stone needs time to align with your body\'s bioelectric field. Some people may notice changes sooner.\n\nThe science behind gemstones: Natural crystals absorb and emit specific wavelengths of light and electromagnetic energy. When worn against the skin, these frequencies interact with the body\'s energy centers (chakras), potentially influencing hormonal and neural pathways.\n\nAlways purchase certified gemstones from trusted sources and have them energized with proper Vedic mantras before wearing.' }
            ],
            consultation: [
                { title: 'Team Astrologer', desc: 'Certified Vedic Expert. 30 Minutes Audio/Video Call. Birth Chart Analysis, Career & Finance, Marriage & Relationship, Practical Remedies.', image: 'assets/images/astrologer.png', icon: 'fa-headset', oldPrice: '', newPrice: '1,499', urgentPrice: '2,499', link: 'consultation.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Senior Astrologer', desc: '10+ Years Experience. 30 Minutes Audio/Video Call. Deep Kundli Analysis, Dasha & Transit Predictions, Advanced Remedies & Mantras.', image: 'assets/images/astrologer.png', icon: 'fa-user-tie', oldPrice: '', newPrice: '2,999', urgentPrice: '4,999', link: 'consultation.html', imgFit: 'cover', imgScale: 1 },
                { title: 'Acharya Ji (Premium)', desc: 'Head Astrologer — Direct Session. 45 Minutes Video Call. Comprehensive Chart Reading, Prashna Kundli, Complex Case Resolution, 7-Day Follow-Up.', image: 'assets/images/acharya.jpg', icon: 'fa-crown', oldPrice: '', newPrice: '5,999', urgentPrice: '8,999', link: 'consultation.html', imgFit: 'cover', imgScale: 1 }
            ],
            consultAcharya: [
                { title: 'Quick Guidance (15 Min)', desc: 'Single Topic Discussion, Quick Kundli Overview, Immediate Remedies, Audio/Video Call, Chat Summary After Call.', image: 'assets/images/acharya.jpg', icon: 'fa-bolt', oldPrice: '1,500', newPrice: '799', link: 'https://wa.me/911253354445?text=Hi,%20I%20want%20to%20book%20a%2015-min%20Quick%20Guidance%20session%20with%20Acharya%20Ji', imgFit: 'cover', imgScale: 1 },
                { title: 'Deep Analysis (30 Min)', desc: 'Up to 3 Topics Covered, Detailed Chart Analysis, Dasha & Transit Insights, Personalized Remedies, 7-Day Follow-up Support.', image: 'assets/images/acharya.jpg', icon: 'fa-magnifying-glass-chart', oldPrice: '2,500', newPrice: '1,499', link: 'https://wa.me/911253354445?text=Hi,%20I%20want%20to%20book%20a%2030-min%20Deep%20Analysis%20session%20with%20Acharya%20Ji', imgFit: 'cover', imgScale: 1 },
                { title: 'Complete Life Reading (60 Min)', desc: 'Unlimited Topics, Full Life Analysis — Career, Marriage, Health. Comprehensive Remedies, Video Call + PDF Report, 30-Day Priority Support.', image: 'assets/images/acharya.jpg', icon: 'fa-crown', oldPrice: '5,000', newPrice: '2,999', link: 'https://wa.me/911253354445?text=Hi,%20I%20want%20to%20book%20a%2060-min%20Complete%20Life%20Reading%20session%20with%20Acharya%20Ji', imgFit: 'cover', imgScale: 1 }
            ],
            leads: [],
            heroImage: 'assets/images/astrologer.png',
            heroScale: 1,
            aboutImage: 'assets/images/astrologer.png',
            aboutImageScale: 1,
            counters: [
                { icon: 'fa-users', target: 50000, label: 'Happy Clients' },
                { icon: 'fa-file-lines', target: 75000, label: 'Reports Delivered' },
                { icon: 'fa-hands-praying', target: 500, label: 'Poojas Performed' },
                { icon: 'fa-award', target: 10, label: 'Years of Experience' }
            ],
            logoImage: '',
            logoWidth: 186,
            hero: {
                tag: '🙏 Trusted by 50,000+ Devotees',
                heading: 'Illuminate Your Life with',
                highlight: 'Vedic Wisdom',
                desc: 'Unlock the secrets of your stars with India\'s most trusted Vedic astrologers. Personalized Kundli, remedies, and spiritual guidance for career, marriage, health & prosperity.',
                ctaText: 'Consult Now',
                ctaLink: 'consult-acharya.html'
            },
            heroSlides: [
                { tag: '🙏 Trusted by 50,000+ Devotees', heading: 'Illuminate Your Life with', highlight: 'Vedic Wisdom', desc: 'Unlock the secrets of your stars with India\'s most trusted Vedic astrologers. Personalized Kundli, remedies, and spiritual guidance for career, marriage, health & prosperity.', ctaText: 'Consult Now', ctaLink: 'consult-acharya.html', ctaIcon: 'fa-calendar-check', image: 'assets/images/astrologer.png', imgScale: 1 },
                { tag: '⭐ Certified Astrology Reports', heading: 'Your Stars, Your', highlight: 'Destiny', desc: 'Get personalized Kundli reports, career guidance, and marriage compatibility analysis from certified Vedic astrologers with 10+ years of experience.', ctaText: 'View Reports', ctaLink: 'reports.html', ctaIcon: 'fa-scroll', image: 'assets/images/astrologer.png', imgScale: 1 },
                { tag: '🔮 Powerful Vedic Remedies', heading: 'Gemstones &', highlight: 'Rudraksha', desc: 'Authentic, lab-certified gemstones and energized Rudrakshas prescribed by expert astrologers for planetary strengthening and spiritual healing.', ctaText: 'Visit Store', ctaLink: 'store.html', ctaIcon: 'fa-gem', image: 'assets/images/astrologer.png', imgScale: 1 },
                { tag: '🙏 Online & Offline Pooja', heading: 'Sacred', highlight: 'Pooja Services', desc: 'Book powerful Vedic poojas with live streaming. Navagraha Shanti, Maha Mrityunjaya Jaap, Kaal Sarp Dosh Nivaran and more performed by experienced Brahmins.', ctaText: 'Book Pooja', ctaLink: 'pooja.html', ctaIcon: 'fa-hands-praying', image: 'assets/images/astrologer.png', imgScale: 1 },
                { tag: '📚 Learn Jyotish Shastra', heading: 'Master', highlight: 'Vedic Astrology', desc: 'Enroll in our professional astrology courses. From beginner to advanced level — learn from authentic Guru-Shishya parampara with live online classes.', ctaText: 'Explore Courses', ctaLink: 'courses.html', ctaIcon: 'fa-graduation-cap', image: 'assets/images/astrologer.png', imgScale: 1 }
            ],
            about: {
                label: 'About Us',
                heading: 'Ancient Wisdom,',
                highlight: 'Modern Guidance',
                p1: 'At Bhartiya Sidhant, we are committed to preserving and promoting the authentic science of Vedic Astrology (Jyotish Shastra). Our team of experienced astrologers uses time-tested methods rooted in classical texts to provide precise and meaningful guidance.',
                p2: 'Whether you\'re seeking clarity about your career, relationships, health, or spiritual growth — we combine planetary analysis with practical remedies to help you navigate life with confidence.',
                stat1Num: '10+', stat1Label: 'Years Experience',
                stat2Num: '50K+', stat2Label: 'Happy Clients',
                stat3Num: '500+', stat3Label: 'Poojas Done'
            },
            testimonials: [
                { name: 'Priya Sharma', location: 'Delhi, India', text: 'The career report was incredibly accurate. The remedies suggested helped me get a promotion within 3 months. Truly blessed!' },
                { name: 'Rajesh Kumar', location: 'Mumbai, India', text: 'Got the Navagraha Shanti Pooja done online. The live streaming experience was wonderful and I could feel the positive energy.' },
                { name: 'Anita Verma', location: 'Jaipur, India', text: 'Enrolled in the beginner astrology course. The teaching method is clear and structured. Best decision I\'ve made for my spiritual journey!' }
            ],
            marqueeItems: [
                'Best Vedic Astrologer',
                'Expert Consultations',
                'Certified Gemstones',
                'Online & Offline Pooja',
                'Professional Courses',
                '10+ Years Experience'
            ],
            video: {
                url: '',
                title: 'Watch Our Latest Video',
                subtitle: 'Spiritual insights and guidance from our experts'
            },
            videoGallery: [
                { title: 'Introduction to Vedic Astrology', desc: 'Understanding the basics of Jyotish Shastra and how it guides your life.', youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { title: 'Navagraha Shanti Pooja Live', desc: 'Watch the powerful nine planets pacification ritual performed by our Acharyas.', youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { title: 'How to Choose the Right Gemstone', desc: 'Expert guide on selecting the perfect gemstone based on your birth chart.', youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
            ],
            videoGalleryHeader: {
                label: 'Watch & Learn',
                heading: 'Featured',
                highlight: 'Videos',
                subtitle: 'Explore our latest spiritual insights, astrology tutorials, and pooja ceremonies on YouTube.'
            },
            awards: [
                { title: 'Best Vedic Astrologer', desc: 'Awarded by the National Astrology Council for exceptional accuracy and authentic Vedic predictions.', year: '2024', icon: 'fa-trophy', image: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?auto=format&fit=crop&w=400&q=80' },
                { title: 'Jyotish Ratna Award', desc: 'Honored with the prestigious Jyotish Ratna title for outstanding contribution to Vedic sciences.', year: '2023', icon: 'fa-medal', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=400&q=80' },
                { title: 'Excellence in Education', desc: 'Recognized for innovative online teaching methodology and producing 500+ certified astrologers.', year: '2022', icon: 'fa-certificate', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80' },
                { title: 'Customer Trust Award', desc: 'Voted #1 in customer satisfaction by 50,000+ clients with a 4.9★ rating across all platforms.', year: '2025', icon: 'fa-star', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80' }
            ],
            faq: [
                { question: 'What is Vedic Astrology (Jyotish Shastra)?', answer: 'Vedic Astrology, also known as Jyotish Shastra, is an ancient Indian science of light that uses the positions of planets and stars at the time of your birth to provide insights into your life, personality, career, health, relationships, and spiritual growth.' },
                { question: 'How accurate are your astrology reports?', answer: 'Our reports are prepared by experienced astrologers using classical Vedic methods from authentic texts like Brihat Parashara Hora Shastra. With accurate birth details, our predictions are highly precise. We have a 4.9★ rating from over 50,000+ satisfied clients.' },
                { question: 'How can I book a consultation with an astrologer?', answer: 'You can book a consultation directly through our website by visiting the Consultation page, or you can message us on WhatsApp. We offer sessions with Team Astrologers, Senior Astrologers, and direct consultations with Acharya Ji.' },
                { question: 'Are your gemstones and Rudrakshas certified?', answer: 'Yes, all our gemstones are 100% natural, lab-certified, and come with a certificate of authenticity. Our Rudrakshas are sourced from authentic Nepali and Indonesian origins. Every product is energized through Vedic mantras before delivery.' },
                { question: 'Can I watch the Pooja being performed online?', answer: 'Absolutely! We provide live streaming for all major Poojas. You can participate from anywhere in the world and watch the entire ritual being performed by experienced Brahmins at sacred temples.' },
                { question: 'What information do I need to provide for a Kundli report?', answer: 'To prepare an accurate Kundli report, we need your exact date of birth, time of birth, and place of birth. The more precise the birth time, the more accurate your chart analysis will be.' }
            ],
            storeProducts: [
                { name:'Yellow Sapphire (Pukhraj)', cat:'gemstone', planet:'Jupiter', subtitle:'For Jupiter — Prosperity, wisdom & marital bliss', price:'₹15,000/Ratti', image:'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=500', badge:'Bestseller' },
                { name:'Blue Sapphire (Neelam)', cat:'gemstone', planet:'Saturn', subtitle:'For Saturn — Discipline, fortune & career growth', price:'₹20,000/Ratti', image:'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg?auto=compress&cs=tinysrgb&w=500', badge:'' },
                { name:'Ruby (Manik)', cat:'gemstone', planet:'Sun', subtitle:'For Sun — Authority, confidence & leadership', price:'₹12,000/Ratti', image:'https://images.pexels.com/photos/3641056/pexels-photo-3641056.jpeg?auto=compress&cs=tinysrgb&w=500', badge:'' },
                { name:'Emerald (Panna)', cat:'gemstone', planet:'Mercury', subtitle:'For Mercury — Intelligence, business & communication', price:'₹10,000/Ratti', image:'https://images.pexels.com/photos/1616793/pexels-photo-1616793.jpeg?auto=compress&cs=tinysrgb&w=500', badge:'' },
                { name:'5 Mukhi Rudraksha', cat:'rudraksha', planet:'Jupiter', subtitle:'For health, peace of mind & spiritual growth', price:'₹1,500', image:'https://images.pexels.com/photos/6431096/pexels-photo-6431096.jpeg?auto=compress&cs=tinysrgb&w=500', badge:'Popular' },
                { name:'1 Mukhi Rudraksha', cat:'rudraksha', planet:'Sun', subtitle:'Rarest bead — Supreme consciousness & moksha', price:'₹51,000', image:'https://images.pexels.com/photos/6431082/pexels-photo-6431082.jpeg?auto=compress&cs=tinysrgb&w=500', badge:'' },
                { name:'Copper Sri Yantra', cat:'yantra', planet:'Venus', subtitle:'For wealth, Lakshmi blessings & abundance', price:'₹2,100', image:'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=500', badge:'' },
                { name:'108 Bead Rudraksha Mala', cat:'mala', planet:'All', subtitle:'For meditation, mantra jaap & spiritual practice', price:'₹3,500', image:'https://images.pexels.com/photos/6431063/pexels-photo-6431063.jpeg?auto=compress&cs=tinysrgb&w=500', badge:'' }
            ],
            courseReviews: [
                { name: 'Rahul Verma', course: 'Vedic Astrology Foundations', rating: 5, location: 'Delhi, India', text: 'This course completely changed my understanding of astrology. The teachers are very knowledgeable and patient. Highly recommend!' },
                { name: 'Sneha Patel', course: 'Predictive Astrology Mastery', rating: 5, location: 'Mumbai, India', text: 'After completing this course, I started doing consultations professionally. The case studies and practical approach made all the difference.' },
                { name: 'Amit Kumar', course: 'Vedic Astrology Foundations', rating: 4, location: 'Jaipur, India', text: 'Well-structured curriculum with excellent study materials. The WhatsApp community support is incredibly helpful for clearing doubts.' },
                { name: 'Kavita Singh', course: 'Maha Vastu Shastra', rating: 5, location: 'Bangalore, India', text: 'Applied Vastu principles learned here to my home and office. Noticed a dramatic improvement in business within weeks!' }
            ],
            courseFaq: [
                { question: 'Do I need any prior knowledge of astrology?', answer: 'No! Our Beginners course starts from absolute zero. You only need curiosity and willingness to learn. The curriculum is designed to take you from basics to professional level step by step.' },
                { question: 'What if I miss a live class?', answer: 'All sessions are recorded and shared within 24 hours. You get lifetime access to all recordings. You can also ask questions in the dedicated WhatsApp group.' },
                { question: 'Is the certification recognized?', answer: 'Yes, our certificate is recognized by astrology institutions across India. Many graduates are now practicing professionally and earning well.' },
                { question: 'Can I pay in installments?', answer: 'Yes, we offer EMI options and installment plans. Contact us on WhatsApp to discuss a payment plan that suits you.' },
                { question: 'What language are the classes in?', answer: 'Classes are conducted in Hindi with English explanations for technical terms for comfortable learning. All study materials are bilingual.' }
            ],
            consultAcharyaPage: {
                bannerTitle: 'Consult Directly with Acharya Ji',
                bannerSubtitle: "Premium One-on-One Session with Bhartiya Sidhant's Head Acharya",
                profileImage: 'assets/images/acharya.jpg?v=1',
                name: 'Acharya Ji',
                titleTag: 'Founder & Head Astrologer',
                label: 'Direct Consultation',
                heading: 'Personal Guidance from the',
                headingHighlight: 'Master',
                desc1: 'Unlike regular consultations, this is a premium, one-on-one session directly with <strong>Acharya Ji</strong>, the founder and head astrologer of Bhartiya Sidhant. With over 10+ years of deep study in classical Vedic astrology, Acharya Ji has guided 50,000+ lives.',
                desc2: 'This session is ideal for complex life decisions, multiple-topic consultations, second opinions, and situations requiring the highest level of astrological expertise.',
                stats: [
                    { num: '10+', label: 'Years Practice' },
                    { num: '50K+', label: 'Lives Guided' },
                    { num: '4.9★', label: 'Avg Rating' },
                    { num: '100%', label: 'Confidential' }
                ],
                pricingSectionLabel: 'Choose Your Plan',
                pricingSectionHeading: 'Consultation',
                pricingSectionHighlight: 'Packages',
                pricingSectionSubtitle: 'Select the session duration that suits your needs',
                whySectionLabel: 'Why Acharya Ji?',
                whySectionHeading: 'What Makes This',
                whySectionHighlight: 'Different',
                whyItems: [
                    { icon: 'fa-user-graduate', title: 'Classical Training', desc: 'Trained in Parashari, Jaimini, and Nadi systems from authentic Guru-Shishya parampara.' },
                    { icon: 'fa-brain', title: 'Multi-System Approach', desc: 'Combines Vedic, KP, and Lal Kitab methods for maximum accuracy and practical remedies.' },
                    { icon: 'fa-handshake', title: 'No Generic Advice', desc: 'Every word is specific to YOUR chart. No templates, no copy-paste predictions.' },
                    { icon: 'fa-shield-halved', title: '100% Confidential', desc: 'Your personal data and consultation details are never shared with anyone.' },
                    { icon: 'fa-headset', title: 'Post-Session Support', desc: 'Get follow-up support via WhatsApp for clarifications on remedies and predictions.' },
                    { icon: 'fa-clock', title: 'Flexible Scheduling', desc: 'Book at your convenient time. Morning, evening, or weekend slots available.' }
                ]
            },
            coupons: []
        };
    },

    async init() {
        if (!this.checkLogin()) return;
        await this.loadData();
        this.renderSidebar();
        this.bindNav();
        this.bindModal();
        this.renderDashboard();
        this.startClock();
    },

    checkLogin() {
        const ok = sessionStorage.getItem('bs_admin_session');
        const el = document.getElementById('loginOverlay');
        if (ok) { if (el) el.style.display = 'none'; return true; }
        if (el) el.style.display = 'flex';
        return false;
    },

    tryLogin() {
        const u = document.getElementById('adminUser').value;
        const p = document.getElementById('adminPass').value;
        if (u === 'admin' && p === 'acharya108') {
            sessionStorage.setItem('bs_admin_session', 'true');
            document.getElementById('loginOverlay').style.display = 'none';
            this.init();
        } else { alert('Invalid credentials.'); }
    },

    logout() { sessionStorage.removeItem('bs_admin_session'); location.reload(); },

    async loadData() {
        // Load local and remote data and prefer the most recently modified.
        const s = localStorage.getItem('bs_admin_data');
        let local = null;
        if (s) {
            try { local = JSON.parse(s); } catch (e) { local = null; }
        }

        let remote = null;
        try { remote = this.fetchRemoteData(); } catch (e) { remote = null; }

        let serverData = null;
        try {
            const resp = await fetch(`${this.getBackendUrl()}/api/cms-data`);
            if (resp.ok) {
                const parsed = await resp.json();
                if (parsed && Object.keys(parsed).length > 0) {
                    serverData = parsed;
                }
            }
        } catch (e) {
            console.warn('Local server CMS data fetch failed:', e);
        }

        // Compare timestamps
        let candidates = [local, remote, serverData].filter(c => c !== null);
        if (candidates.length > 0) {
            candidates.sort((a, b) => Number(b._lastModified || 0) - Number(a._lastModified || 0));
            this.data = candidates[0];
            try { localStorage.setItem('bs_admin_data', JSON.stringify(this.data)); } catch(e) {}
        } else {
            this.data = this.getDefaultData();
        }

        // ensure all keys exist
        const def = this.getDefaultData();
        Object.keys(def).forEach(k => { if (!(k in this.data)) this.data[k] = def[k]; });
    },

    async saveData() {
        try { this.data._lastModified = Date.now(); } catch (e) {}
        try { localStorage.setItem('bs_admin_data', JSON.stringify(this.data)); } catch (e) {}
        
        // Overwrite leads list to local server db
        try {
            await fetch(`${this.getBackendUrl()}/api/save-leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.data.leads || [])
            });
        } catch (e) {
            console.warn('Local server leads sync failed:', e);
        }

        // Overwrite CMS data to local server db
        let serverSyncOk = false;
        try {
            const resp = await fetch(`${this.getBackendUrl()}/api/save-cms-data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.data)
            });
            serverSyncOk = resp.ok;
        } catch (e) {
            console.warn('Local server CMS sync failed:', e);
        }

        try {
            const pushed = await this.pushRemoteData();
            if (pushed || serverSyncOk) this.showToast('Changes saved and synced.', 'success');
            else this.showToast('Saved locally. Remote sync pending.', 'success');
        } catch (e) {
            this.showToast('Saved locally. Remote sync failed.', 'error');
        }
    },

    getCmsConfig() {
        try {
            const raw = localStorage.getItem('bs_cms_config');
            return raw ? JSON.parse(raw) : { provider: 'firebase', databaseURL: '', apiKey: '', email: '' };
        } catch (e) {
            return { provider: 'firebase', databaseURL: '', apiKey: '', email: '' };
        }
    },

    getFirebaseAuth() {
        try {
            const raw = sessionStorage.getItem('bs_firebase_auth');
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    setFirebaseAuth(auth) {
        if (!auth) {
            sessionStorage.removeItem('bs_firebase_auth');
            return;
        }
        sessionStorage.setItem('bs_firebase_auth', JSON.stringify(auth));
    },

    async signInFirebase() {
        const config = this.getCmsConfig();
        if (!config.apiKey || !config.email || !config.password) return null;
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(config.apiKey)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: config.email,
                    password: config.password,
                    returnSecureToken: true
                })
            });
            if (!response.ok) return null;
            const auth = await response.json();
            const session = {
                idToken: auth.idToken,
                refreshToken: auth.refreshToken,
                email: auth.email,
                localId: auth.localId,
                expiresAt: Date.now() + (parseInt(auth.expiresIn, 10) || 3600) * 1000
            };
            this.setFirebaseAuth(session);
            return session;
        } catch (e) {
            return null;
        }
    },

    async ensureFirebaseAuth() {
        const auth = this.getFirebaseAuth();
        if (auth && auth.idToken && auth.expiresAt && auth.expiresAt > Date.now() + 60000) return auth;
        return await this.signInFirebase();
    },

    fetchRemoteData() {
        const config = this.getCmsConfig();
        if (!config.databaseURL) return null;
        try {
            const auth = this.getFirebaseAuth();
            const token = auth?.idToken || '';
            const url = config.databaseURL.replace(/\/$/, '') + '/bs_admin_data.json' + (token ? '?auth=' + encodeURIComponent(token) : '');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send(null);
            if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText) {
                return JSON.parse(xhr.responseText);
            }
        } catch (e) {}
        return null;
    },

    async pushRemoteData() {
        const config = this.getCmsConfig();
        if (!config.databaseURL) return false;
        try {
            // Ensure auth if possible
            await this.ensureFirebaseAuth();
        } catch (e) {}
        try {
            const auth = this.getFirebaseAuth();
            const token = auth?.idToken || '';
            const url = config.databaseURL.replace(/\/$/, '') + '/bs_admin_data.json' + (token ? '?auth=' + encodeURIComponent(token) : '');
            const resp = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.data)
            });
            return resp.ok;
        } catch (e) {
            return false;
        }
    },

    // Sidebar
    renderSidebar() {
        const nav = document.getElementById('sidebarNav');
        if (!nav) return;
        nav.innerHTML = '';
        Object.keys(this.SECTIONS).forEach(key => {
            const s = this.SECTIONS[key];
            const a = document.createElement('a');
            a.href = '#';
            a.dataset.section = key;
            a.innerHTML = `<i class="fa-solid ${s.icon}"></i> ${s.label}`;
            nav.appendChild(a);
        });
    },

    bindNav() {
        document.querySelectorAll('.sidebar-nav a[data-section]').forEach(a => {
            a.addEventListener('click', e => { e.preventDefault(); this.switchSection(a.dataset.section); });
        });
    },

    switchSection(section) {
        this.currentSection = section;
        document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.sidebar-nav a[data-section="${section}"]`);
        if (active) active.classList.add('active');
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        // Map content sections to CMS view
        if (this.SECTIONS[section]) {
            document.getElementById('section-cms').classList.add('active');
            this.currentCmsKey = section;
            document.getElementById('listTitle').textContent = this.SECTIONS[section].label + ' Items';
            document.getElementById('topbarTitle').textContent = this.SECTIONS[section].label;
            this.renderItemList();
        } else {
            const el = document.getElementById('section-' + section);
            if (el) el.classList.add('active');
            document.getElementById('topbarTitle').textContent = section === 'dashboard' ? 'Dashboard' : section === 'leads' ? 'Customer Leads' : section === 'coupons' ? 'Coupon Codes' : 'Site Settings';
            if (section === 'leads') this.renderLeads();
            if (section === 'coupons') this.renderCoupons();
            if (section === 'settings') this.renderSettings();
            if (section === 'dashboard') this.renderDashboard();
        }
        document.querySelector('.admin-sidebar')?.classList.remove('open');
    },

    // Dashboard
    renderDashboard() {
        let total = 0;
        Object.keys(this.SECTIONS).forEach(k => { total += (this.data[k] || []).length; });
        const sv = document.getElementById('statViews'); if (sv) sv.textContent = Object.keys(this.SECTIONS).length;
        const st = document.getElementById('statTotal'); if (st) st.textContent = total;
        const sl = document.getElementById('statLeads'); if (sl) sl.textContent = (this.data.leads || []).length;
        const sn = document.getElementById('statViewsNote'); if (sn) sn.textContent = 'content sections';
        const badge = document.getElementById('sidebarLeadsBadge');
        const pending = (this.data.leads || []).filter(l => l.status === 'pending').length;
        if (badge) { badge.textContent = pending; badge.style.display = pending > 0 ? 'inline' : 'none'; }
        const dt = document.getElementById('dashLeadsTrend'); if (dt) dt.textContent = pending + ' Pending';
    },

    startClock() {
        const start = Date.now();
        setInterval(() => {
            const d = Math.floor((Date.now() - start) / 1000);
            const h = String(Math.floor(d / 3600)).padStart(2, '0');
            const m = String(Math.floor((d % 3600) / 60)).padStart(2, '0');
            const s = String(d % 60).padStart(2, '0');
            const el = document.getElementById('statStatusNote');
            if (el) el.textContent = 'uptime ' + h + ':' + m + ':' + s;
        }, 1000);
    },

    // CMS Item List
    renderItemList() {
        const list = document.getElementById('itemList');
        if (!list) return;
        const items = this.data[this.currentCmsKey] || [];
        if (!items.length) {
            list.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:30px;">No items yet. Click "Add New" to create one.</p>';
            return;
        }
        list.innerHTML = items.map((item, i) => `
            <div class="editable-item">
                <img src="${this.esc(item.image)}" class="editable-item-img" onerror="this.src='https://via.placeholder.com/60x60/1c1f2e/71717a?text=No+Img'">
                <div class="editable-item-info">
                    <h4><i class="fa-solid ${this.esc(item.icon || 'fa-cube')}" style="color:var(--admin-accent);margin-right:6px;"></i>${this.esc(item.title)}
                    ${item.newPrice ? `<span style="color:var(--admin-success);font-size:12px;margin-left:8px;">₹${this.esc(item.newPrice)}</span>` : ''}
                    ${item.oldPrice ? `<span style="color:var(--admin-text-dim);font-size:11px;text-decoration:line-through;margin-left:4px;">₹${this.esc(item.oldPrice)}</span>` : ''}
                    ${item.urgentPrice ? `<span style="color:var(--admin-warning);font-size:11px;margin-left:6px;">⚡₹${this.esc(item.urgentPrice)}</span>` : ''}
                    </h4>
                    <p>${this.esc(item.desc).substring(0, 90)}${item.desc.length > 90 ? '...' : ''}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.editItem(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveItem(${i},-1)" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveItem(${i},1)" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteItem(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    openAddModal() {
        document.getElementById('modalTitle').textContent = 'Add New ' + (this.SECTIONS[this.currentCmsKey]?.label || 'Item');
        document.getElementById('editIndex').value = '';
        document.getElementById('fmTitle').value = '';
        document.getElementById('fmDesc').value = '';
        document.getElementById('fmOldPrice').value = '';
        document.getElementById('fmNewPrice').value = '';
        if (document.getElementById('fmContent')) document.getElementById('fmContent').value = '';
        document.getElementById('fmIcon').value = 'fa-cube';
        document.getElementById('fmLink').value = '';
        document.getElementById('fmCategory').value = '';
        document.getElementById('fmBadge').value = '';
        document.getElementById('fmStyle').value = 'standard';
        document.getElementById('fmImg').value = '';
        document.getElementById('fmImgFit').value = 'cover';
        document.getElementById('fmImgScale').value = '1';
        document.getElementById('fmScaleVal').textContent = '1.0';
        const posX = document.getElementById('fmPosX');
        const posY = document.getElementById('fmPosY');
        if (posX) posX.value = 50;
        if (posY) posY.value = 50;
        const posXVal = document.getElementById('fmPosXVal');
        const posYVal = document.getElementById('fmPosYVal');
        if (posXVal) posXVal.textContent = '50%';
        if (posYVal) posYVal.textContent = '50%';
        const prev = document.getElementById('previewImg');
        prev.style.display = 'none';
        document.getElementById('previewText').style.display = 'block';
        document.getElementById('imgAdjustControls').style.display = 'none';
        // Show urgent price field only for consultation
        const urgentGroup = document.getElementById('urgentPriceGroup');
        const urgentInput = document.getElementById('fmUrgentPrice');
        if (urgentGroup) urgentGroup.style.display = this.currentCmsKey === 'consultation' ? '' : 'none';
        if (urgentInput) urgentInput.value = '';
        // Clear detail page content fields
        if (document.getElementById('fmAboutHeading')) document.getElementById('fmAboutHeading').value = '';
        if (document.getElementById('fmSpecsHeading')) document.getElementById('fmSpecsHeading').value = '';
        if (document.getElementById('fmNoteHeading')) document.getElementById('fmNoteHeading').value = '';
        const ddEl = document.getElementById('fmDetailDesc');
        const ffEl = document.getElementById('fmFeatures');
        const iiEl = document.getElementById('fmIncludes');
        const ssEl = document.getElementById('fmSigns');
        if (ddEl) ddEl.value = '';
        if (ffEl) ffEl.value = '';
        if (iiEl) iiEl.value = '';
        if (ssEl) ssEl.value = '';
        this.editingFields = JSON.parse(JSON.stringify(this.getItemCheckoutFields(null, this.currentCmsKey)));
        this.renderCheckoutFieldsBuilder('cms');
        this.openModal('cmsModal');
    },

    editItem(idx) {
        const items = this.data[this.currentCmsKey] || [];
        const item = items[idx];
        if (!item) return;
        document.getElementById('modalTitle').textContent = 'Edit ' + item.title;
        document.getElementById('editIndex').value = idx;
        document.getElementById('fmTitle').value = item.title || '';
        document.getElementById('fmDesc').value = item.desc || '';
        document.getElementById('fmOldPrice').value = item.oldPrice || '';
        document.getElementById('fmNewPrice').value = item.newPrice || '';
        if (document.getElementById('fmContent')) document.getElementById('fmContent').value = item.content || '';
        document.getElementById('fmIcon').value = item.icon || 'fa-cube';
        document.getElementById('fmLink').value = item.link || '';
        document.getElementById('fmCategory').value = item.category || '';
        document.getElementById('fmBadge').value = item.badge || item.styleLabel || '';
        document.getElementById('fmStyle').value = item.style || 'standard';
        document.getElementById('fmImg').value = item.image || '';
        document.getElementById('fmImgFit').value = item.imgFit || 'cover';
        document.getElementById('fmImgScale').value = item.imgScale || 1;
        document.getElementById('fmScaleVal').textContent = parseFloat(item.imgScale || 1).toFixed(1);
        const editPosX = document.getElementById('fmPosX');
        const editPosY = document.getElementById('fmPosY');
        if (editPosX) editPosX.value = item.imgPosX || 50;
        if (editPosY) editPosY.value = item.imgPosY || 50;
        const editPosXVal = document.getElementById('fmPosXVal');
        const editPosYVal = document.getElementById('fmPosYVal');
        if (editPosXVal) editPosXVal.textContent = (item.imgPosX || 50) + '%';
        if (editPosYVal) editPosYVal.textContent = (item.imgPosY || 50) + '%';
        this.updateIconPreview();
        const prev = document.getElementById('previewImg');
        // Show urgent price field only for consultation
        const urgentGroup = document.getElementById('urgentPriceGroup');
        const urgentInput = document.getElementById('fmUrgentPrice');
        if (urgentGroup) urgentGroup.style.display = this.currentCmsKey === 'consultation' ? '' : 'none';
        if (urgentInput) urgentInput.value = item.urgentPrice || '';
        // Populate detail page content fields
        if (document.getElementById('fmAboutHeading')) document.getElementById('fmAboutHeading').value = item.aboutHeading || '';
        if (document.getElementById('fmSpecsHeading')) document.getElementById('fmSpecsHeading').value = item.specsHeading || '';
        if (document.getElementById('fmNoteHeading')) document.getElementById('fmNoteHeading').value = item.noteHeading || '';
        const ddEl = document.getElementById('fmDetailDesc');
        const ffEl = document.getElementById('fmFeatures');
        const iiEl = document.getElementById('fmIncludes');
        const ssEl = document.getElementById('fmSigns');
        if (ddEl) ddEl.value = item.detailDesc || '';
        if (ffEl) ffEl.value = item.features || '';
        if (iiEl) iiEl.value = item.includes || '';
        if (ssEl) ssEl.value = item.signs || '';
        this.editingFields = JSON.parse(JSON.stringify(this.getItemCheckoutFields(item, this.currentCmsKey)));
        this.renderCheckoutFieldsBuilder('cms');
        if (item.image) {
            prev.src = item.image;
            prev.style.display = 'block';
            prev.style.objectFit = item.imgFit || 'cover';
            prev.style.transform = 'scale(' + (item.imgScale || 1) + ')';
            prev.style.objectPosition = (item.imgPosX || 50) + '% ' + (item.imgPosY || 50) + '%';
            document.getElementById('previewText').style.display = 'none';
            document.getElementById('imgAdjustControls').style.display = 'block';
        } else {
            prev.style.display = 'none';
            document.getElementById('previewText').style.display = 'block';
            document.getElementById('imgAdjustControls').style.display = 'none';
        }
        this.openModal('cmsModal');
    },

    saveItem(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('editIndex').value;
        const existing = (idx !== '' && !isNaN(parseInt(idx)) && this.data[this.currentCmsKey])
            ? (this.data[this.currentCmsKey][parseInt(idx)] || {})
            : {};
        const hasShipping = this.editingFields.some(f => {
            const l = (f.label || '').toLowerCase();
            return l.includes('address') || l.includes('city') || l.includes('pin') || l.includes('shipping');
        });
        const hasBirth = this.editingFields.some(f => {
            const l = (f.label || '').toLowerCase();
            return l.includes('birth') || l.includes('dob') || l.includes('time of birth') || l.includes('place of birth');
        });
        const hasNotes = this.editingFields.some(f => {
            const l = (f.label || '').toLowerCase();
            return l.includes('notes') || l.includes('instruction');
        });

        const item = {
            ...existing,
            title: document.getElementById('fmTitle').value,
            desc: document.getElementById('fmDesc').value,
            oldPrice: document.getElementById('fmOldPrice').value,
            newPrice: document.getElementById('fmNewPrice').value,
            icon: document.getElementById('fmIcon').value,
            link: document.getElementById('fmLink').value,
            category: document.getElementById('fmCategory').value,
            badge: document.getElementById('fmBadge').value,
            style: document.getElementById('fmStyle').value,
            image: document.getElementById('fmImg').value,
            imgFit: document.getElementById('fmImgFit').value,
            imgScale: parseFloat(document.getElementById('fmImgScale').value) || 1,
            imgPosX: parseInt(document.getElementById('fmPosX')?.value || 50, 10),
            imgPosY: parseInt(document.getElementById('fmPosY')?.value || 50, 10),
            reqShipping: hasShipping,
            reqBirth: hasBirth,
            reqNotes: hasNotes,
            checkoutFields: this.editingFields
        };
        // Include urgentPrice if the field exists (consultation items)
        const urgentEl = document.getElementById('fmUrgentPrice');
        if (urgentEl) item.urgentPrice = urgentEl.value;
        // Include detail page content fields
        if (document.getElementById('fmAboutHeading')) item.aboutHeading = document.getElementById('fmAboutHeading').value;
        if (document.getElementById('fmSpecsHeading')) item.specsHeading = document.getElementById('fmSpecsHeading').value;
        if (document.getElementById('fmNoteHeading')) item.noteHeading = document.getElementById('fmNoteHeading').value;
        const ddEl = document.getElementById('fmDetailDesc');
        const ffEl = document.getElementById('fmFeatures');
        const iiEl = document.getElementById('fmIncludes');
        const ssEl = document.getElementById('fmSigns');
        if (ddEl) item.detailDesc = ddEl.value;
        if (ffEl) item.features = ffEl.value;
        if (iiEl) item.includes = iiEl.value;
        if (ssEl) item.signs = ssEl.value;
        if (document.getElementById('fmContent')) item.content = document.getElementById('fmContent').value;
        if (!item.title) { alert('Title is required'); return; }
        if (!this.data[this.currentCmsKey]) this.data[this.currentCmsKey] = [];
        if (idx !== '' && idx !== undefined && idx !== null && !isNaN(parseInt(idx))) {
            this.data[this.currentCmsKey][parseInt(idx)] = item;
        } else {
            this.data[this.currentCmsKey].push(item);
        }
        this.saveData();
        this.renderItemList();
        this.renderDashboard();
        this.closeModal('cmsModal');
    },

    deleteItem(idx) {
        if (!confirm('Delete this item?')) return;
        this.data[this.currentCmsKey].splice(idx, 1);
        this.saveData();
        this.renderItemList();
        this.renderDashboard();
    },

    moveItem(idx, dir) {
        const arr = this.data[this.currentCmsKey];
        const newIdx = idx + dir;
        if (newIdx < 0 || newIdx >= arr.length) return;
        [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
        this.saveData();
        this.renderItemList();
    },

    // Image handling
    handleFileUpload(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) { alert('File too large. Max 3MB.'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('fmImg').value = e.target.result;
            const prev = document.getElementById('previewImg');
            prev.src = e.target.result;
            prev.style.display = 'block';
            prev.style.objectFit = document.getElementById('fmImgFit').value;
            prev.style.transform = 'scale(' + document.getElementById('fmImgScale').value + ')';
            prev.style.objectPosition = (document.getElementById('fmPosX')?.value || 50) + '% ' + (document.getElementById('fmPosY')?.value || 50) + '%';
            document.getElementById('previewText').style.display = 'none';
            document.getElementById('imgAdjustControls').style.display = 'block';
        };
        reader.readAsDataURL(file);
    },

    adjustImage(type, val) {
        const prev = document.getElementById('previewImg');
        if (type === 'fit') {
            prev.style.objectFit = val;
        } else if (type === 'scale') {
            prev.style.transform = 'scale(' + val + ')';
            document.getElementById('fmScaleVal').textContent = parseFloat(val).toFixed(1);
        } else if (type === 'posX') {
            prev.style.objectPosition = val + '% ' + (document.getElementById('fmPosY')?.value || 50) + '%';
            document.getElementById('fmPosXVal').textContent = val + '%';
        } else if (type === 'posY') {
            prev.style.objectPosition = (document.getElementById('fmPosX')?.value || 50) + '% ' + val + '%';
            document.getElementById('fmPosYVal').textContent = val + '%';
        }
    },

    updateIconPreview() {
        const icon = document.getElementById('fmIcon').value;
        const el = document.getElementById('iconPreviewI');
        if (el) el.className = 'fa-solid ' + icon;
    },

    previewUrlImage() {
        const url = document.getElementById('fmImg').value.trim();
        const prev = document.getElementById('previewImg');
        if (url && (url.startsWith('http') || url.startsWith('data:') || url.startsWith('assets/'))) {
            prev.src = url;
            prev.style.display = 'block';
            prev.style.objectFit = document.getElementById('fmImgFit').value;
            prev.style.transform = 'scale(' + document.getElementById('fmImgScale').value + ')';
            prev.style.objectPosition = (document.getElementById('fmPosX')?.value || 50) + '% ' + (document.getElementById('fmPosY')?.value || 50) + '%';
            document.getElementById('previewText').style.display = 'none';
            document.getElementById('imgAdjustControls').style.display = 'block';
        } else if (!url) {
            prev.style.display = 'none';
            document.getElementById('previewText').style.display = 'block';
            document.getElementById('imgAdjustControls').style.display = 'none';
        }
    },

    // Leads
    async renderLeads() {
        const c = document.getElementById('leadsList');
        if (!c) return;

        // Sync new leads from server first
        try {
            const resp = await fetch(`${this.getBackendUrl()}/api/leads`);
            const resData = await resp.json();
            if (resData && resData.success && resData.leads) {
                const localLeads = this.data.leads || [];
                const merged = [...localLeads];
                resData.leads.forEach(rl => {
                    const exists = merged.some(ll => ll.paymentId === rl.paymentId);
                    if (!exists) merged.push(rl);
                });
                merged.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
                this.data.leads = merged;
                localStorage.setItem('bs_admin_data', JSON.stringify(this.data));
            }
        } catch (err) {
            console.warn('Server leads sync failed:', err);
        }

        const leads = this.data.leads || [];
        if (!leads.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:30px;">No leads yet.</p>';
            return;
        }
        c.innerHTML = leads.map((l, i) => `
            <div class="editable-item" style="border-left:3px solid ${l.status === 'pending' ? 'var(--admin-warning)' : 'var(--admin-success)'};">
                <div style="width:44px;height:44px;border-radius:10px;background:${l.status === 'pending' ? 'rgba(245,158,11,0.15)' : 'rgba(34,197,94,0.15)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="fa-solid fa-user" style="color:${l.status === 'pending' ? 'var(--admin-warning)' : 'var(--admin-success)'};"></i>
                </div>
                <div class="editable-item-info">
                    <h4>${this.esc(l.name)} <span class="status-badge ${l.status === 'pending' ? 'draft' : 'published'}">${l.status}</span></h4>
                    <p><strong>Item:</strong> ${this.esc(l.service || l.product || l.source || 'N/A')} · <strong>Phone:</strong> ${this.esc(l.phone || '')} · <strong>Email:</strong> ${this.esc(l.email || '')} · <strong>Date:</strong> ${l.date ? new Date(l.date).toLocaleString('en-IN') : 'N/A'}</p>
                    ${l.details ? `<p style="font-size:11px;color:var(--admin-text-dim);margin-top:4px;"><i class="fa-solid fa-circle-info" style="color:var(--admin-accent);margin-right:4px;"></i> ${this.esc(l.details)}</p>` : ''}
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.toggleLead(${i})" title="Toggle Status"><i class="fa-solid fa-check"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteLead(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    toggleLead(i) {
        if (!this.data.leads[i]) return;
        this.data.leads[i].status = this.data.leads[i].status === 'pending' ? 'reviewed' : 'pending';
        this.saveData();
        this.renderLeads();
        this.renderDashboard();
    },

    deleteLead(i) {
        if (!confirm('Delete this lead?')) return;
        this.data.leads.splice(i, 1);
        this.saveData();
        this.renderLeads();
        this.renderDashboard();
    },

    clearLeads() {
        this.data.leads.forEach(l => l.status = 'reviewed');
        this.saveData();
        this.renderLeads();
        this.renderDashboard();
        this.showToast('All leads marked as reviewed.', 'success');
    },

    addTestLead() {
        this.data.leads.push({ name: 'Test User', phone: '+91 99999 00000', service: 'Career Report', date: new Date().toLocaleDateString(), status: 'pending' });
        this.saveData();
        this.renderLeads();
        this.renderDashboard();
    },

    exportLeadsCSV() {
        const leads = this.data.leads || [];
        if (!leads.length) {
            alert('No leads to export.');
            return;
        }

        const headers = ['Name', 'Phone', 'Email', 'Product/Service', 'Amount', 'Payment ID', 'Date', 'Status', 'Custom Field Details'];
        
        const rows = leads.map(l => [
            l.name || '',
            l.phone || '',
            l.email || '',
            l.service || l.product || l.source || '',
            l.amount || '',
            l.paymentId || '',
            l.date ? new Date(l.date).toLocaleString('en-IN') : '',
            l.status || '',
            l.details || ''
        ]);

        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
            + [headers.join(','), ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `bhartiya_sidhant_leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // Settings
    renderSettings() {
        const f = document.getElementById('settingsForm');
        if (!f) return;
        const s = this.data.site;
        const cms = this.getCmsConfig();
        f.innerHTML = `
        <div class="admin-panel" style="margin-bottom:24px;">
            <div class="panel-header"><h3><i class="fa-brands fa-google"></i> Firebase CMS Sync</h3></div>
            <div class="panel-body">
                <div class="form-grid">
                    <div class="form-group full-width">
                        <label>Firebase Realtime Database URL</label>
                        <input class="form-input" id="setCmsDatabaseUrl" value="${this.esc(cms.databaseURL || '')}" placeholder="https://your-project-id-default-rtdb.firebaseio.com">
                    </div>
                    <div class="form-group">
                        <label>Firebase API Key</label>
                        <input class="form-input" id="setCmsApiKey" value="${this.esc(cms.apiKey || '')}" placeholder="AIza...">
                    </div>
                    <div class="form-group">
                        <label>Admin Email</label>
                        <input class="form-input" id="setCmsEmail" value="${this.esc(cms.email || '')}" placeholder="admin@example.com">
                    </div>
                    <div class="form-group">
                        <label>Admin Password</label>
                        <input class="form-input" id="setCmsPassword" value="${this.esc(cms.password || '')}" type="password" placeholder="Firebase auth password">
                    </div>
                    <div class="form-group full-width">
                        <span class="form-hint">Save these credentials only if this browser is trusted. For production, use Firebase Auth and tighter database rules.</span>
                    </div>
                    <div class="form-group full-width" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
                        <button type="button" class="btn btn-secondary btn-sm" onclick="AdminApp.connectFirebaseCms()"><i class="fa-solid fa-plug"></i> Connect Firebase</button>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="AdminApp.syncFirebaseCmsNow()"><i class="fa-solid fa-arrows-rotate"></i> Sync Now</button>
                        <span class="form-hint" id="firebaseCmsStatus">${this.getFirebaseAuth()?.email ? 'Connected as ' + this.getFirebaseAuth().email : 'Not connected'}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-grid">
            <div class="form-group"><label>Site Name</label><input class="form-input" id="setSiteName" value="${this.esc(s.name)}"></div>
            <div class="form-group"><label>Email</label><input class="form-input" id="setEmail" value="${this.esc(s.email)}"></div>
            <div class="form-group"><label>Phone</label><input class="form-input" id="setPhone" value="${this.esc(s.phone)}"></div>
            <div class="form-group"><label>WhatsApp</label><input class="form-input" id="setWhatsapp" value="${this.esc(s.whatsapp)}"></div>
            <div class="form-group full-width"><label>Address</label><input class="form-input" id="setAddress" value="${this.esc(s.address)}"></div>
            <div class="form-group"><label>Facebook</label><input class="form-input" id="setFb" value="${this.esc(s.facebook)}"></div>
            <div class="form-group"><label>Instagram</label><input class="form-input" id="setIg" value="${this.esc(s.instagram)}"></div>
            <div class="form-group"><label>YouTube</label><input class="form-input" id="setYt" value="${this.esc(s.youtube)}"></div>
            <div class="form-group"><label>Twitter</label><input class="form-input" id="setTw" value="${this.esc(s.twitter)}"></div>
            <div class="form-group"><label>Telegram</label><input class="form-input" id="setTg" value="${this.esc(s.telegram)}"></div>
        </div>`;

        // Populate hero fields
        const h = this.data.hero || {};
        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
        setVal('setHeroTag', h.tag);
        setVal('setHeroHeading', h.heading);
        setVal('setHeroHighlight', h.highlight);
        setVal('setHeroDesc', h.desc);
        setVal('setHeroCta', h.ctaText);
        setVal('setHeroCtaLink', h.ctaLink);

        // Populate about fields
        const a = this.data.about || {};
        setVal('setAboutLabel', a.label);
        setVal('setAboutHeading', a.heading);
        setVal('setAboutHighlight', a.highlight);
        setVal('setAboutP1', a.p1);
        setVal('setAboutP2', a.p2);
        setVal('setAboutStat1Num', a.stat1Num);
        setVal('setAboutStat1Label', a.stat1Label);
        setVal('setAboutStat2Num', a.stat2Num);
        setVal('setAboutStat2Label', a.stat2Label);
        setVal('setAboutStat3Num', a.stat3Num);
        setVal('setAboutStat3Label', a.stat3Label);

        // Populate about image
        if (this.data.aboutImage) {
            const ap = document.getElementById('aboutImgPreview');
            if (ap) ap.src = this.data.aboutImage;
        }
        if (this.data.aboutImageScale) {
            const asr = document.getElementById('aboutImgScaleRange');
            const asv = document.getElementById('aboutImgScaleValue');
            if (asr) asr.value = this.data.aboutImageScale;
            if (asv) asv.textContent = parseFloat(this.data.aboutImageScale).toFixed(1);
        }
        const aboutUrl = document.getElementById('aboutImgUrl');
        if (aboutUrl && this.data.aboutImage && !this.data.aboutImage.startsWith('data:')) aboutUrl.value = this.data.aboutImage;

        // Populate counters
        const ctrs = this.data.counters || [];
        for (let ci = 0; ci < 4; ci++) {
            const c = ctrs[ci] || {};
            setVal('setCounter' + (ci + 1) + 'Icon', c.icon);
            const numEl = document.getElementById('setCounter' + (ci + 1) + 'Num');
            if (numEl) numEl.value = c.target || '';
            setVal('setCounter' + (ci + 1) + 'Label', c.label);
        }

        // Populate logo preview from saved data
        if (this.data.logoImage) {
            const lp = document.getElementById('logoPreview');
            if (lp) { lp.src = this.data.logoImage; lp.style.display = 'block'; }
        }
        if (this.data.logoWidth) {
            const lr = document.getElementById('logoWidthRange');
            const wv = document.getElementById('widthValue');
            const lp = document.getElementById('logoPreview');
            if (lr) lr.value = this.data.logoWidth;
            if (wv) wv.textContent = this.data.logoWidth;
            if (lp) lp.style.width = this.data.logoWidth + 'px';
        }

        // Render hero slides
        this.renderHeroSlides();

        // Render testimonials
        this.renderTestimonials();

        // Render marquee items
        this.renderMarqueeItems();

        // Populate video fields
        const v = this.data.video || {};
        setVal('setVideoUrl', v.url);
        setVal('setVideoTitle', v.title);
        setVal('setVideoSubtitle', v.subtitle);

        // Render video gallery
        this.renderVideoGallery();

        // Render FAQ
        this.renderFaq();

        // Render awards
        this.renderAwards();

        // Populate video gallery header fields
        const vgh = this.data.videoGalleryHeader || {};
        setVal('setVgLabel', vgh.label);
        setVal('setVgHeading', vgh.heading);
        setVal('setVgHighlight', vgh.highlight);
        setVal('setVgSubtitle', vgh.subtitle);

        // Render store products
        this.renderStoreProducts();

        // Render course reviews
        this.renderCourseReviews();

        // Render course FAQ
        this.renderCourseFaq();

        // Render Consult Acharya page content
        this.renderConsultAcharyaPage();
    },

    saveSettings() {
        const cmsConfig = {
            provider: 'firebase',
            databaseURL: document.getElementById('setCmsDatabaseUrl')?.value.trim() || '',
            apiKey: document.getElementById('setCmsApiKey')?.value.trim() || '',
            email: document.getElementById('setCmsEmail')?.value.trim() || '',
            password: document.getElementById('setCmsPassword')?.value || ''
        };
        localStorage.setItem('bs_cms_config', JSON.stringify(cmsConfig));
        this.data.site = {
            name: document.getElementById('setSiteName')?.value || '',
            email: document.getElementById('setEmail')?.value || '',
            phone: document.getElementById('setPhone')?.value || '',
            whatsapp: document.getElementById('setWhatsapp')?.value || '',
            address: document.getElementById('setAddress')?.value || '',
            facebook: document.getElementById('setFb')?.value || '',
            instagram: document.getElementById('setIg')?.value || '',
            youtube: document.getElementById('setYt')?.value || '',
            twitter: document.getElementById('setTw')?.value || '',
            telegram: document.getElementById('setTg')?.value || ''
        };
        // Save hero content
        this.data.hero = {
            tag: document.getElementById('setHeroTag')?.value || '',
            heading: document.getElementById('setHeroHeading')?.value || '',
            highlight: document.getElementById('setHeroHighlight')?.value || '',
            desc: document.getElementById('setHeroDesc')?.value || '',
            ctaText: document.getElementById('setHeroCta')?.value || '',
            ctaLink: document.getElementById('setHeroCtaLink')?.value || ''
        };
        // Save about content
        this.data.about = {
            label: document.getElementById('setAboutLabel')?.value || '',
            heading: document.getElementById('setAboutHeading')?.value || '',
            highlight: document.getElementById('setAboutHighlight')?.value || '',
            p1: document.getElementById('setAboutP1')?.value || '',
            p2: document.getElementById('setAboutP2')?.value || '',
            stat1Num: document.getElementById('setAboutStat1Num')?.value || '',
            stat1Label: document.getElementById('setAboutStat1Label')?.value || '',
            stat2Num: document.getElementById('setAboutStat2Num')?.value || '',
            stat2Label: document.getElementById('setAboutStat2Label')?.value || '',
            stat3Num: document.getElementById('setAboutStat3Num')?.value || '',
            stat3Label: document.getElementById('setAboutStat3Label')?.value || ''
        };
        // Save counters
        this.data.counters = [];
        for (let ci = 1; ci <= 4; ci++) {
            this.data.counters.push({
                icon: document.getElementById('setCounter' + ci + 'Icon')?.value || 'fa-star',
                target: parseInt(document.getElementById('setCounter' + ci + 'Num')?.value) || 0,
                label: document.getElementById('setCounter' + ci + 'Label')?.value || ''
            });
        }
        // Save video embed
        this.data.video = {
            url: document.getElementById('setVideoUrl')?.value || '',
            title: document.getElementById('setVideoTitle')?.value || '',
            subtitle: document.getElementById('setVideoSubtitle')?.value || ''
        };
        // Save video gallery header
        this.data.videoGalleryHeader = {
            label: document.getElementById('setVgLabel')?.value || '',
            heading: document.getElementById('setVgHeading')?.value || '',
            highlight: document.getElementById('setVgHighlight')?.value || '',
            subtitle: document.getElementById('setVgSubtitle')?.value || ''
        };
        // Save payment settings
        this.data.paymentConfig = {
            key: document.getElementById('setPayKey')?.value || 'rzp_test_YourTestKey',
            businessName: document.getElementById('setPayBusinessName')?.value || 'Bhartiya Sidhant',
            whatsapp: document.getElementById('setPayWhatsapp')?.value || '911253354445',
            currency: document.getElementById('setPayCurrency')?.value || 'INR',
            requireDob: document.getElementById('setPayReqDob')?.checked || false,
            requireTime: document.getElementById('setPayReqTime')?.checked || false,
            requirePlace: document.getElementById('setPayReqPlace')?.checked || false,
            requireGender: document.getElementById('setPayReqGender')?.checked || false,
            requireShipping: document.getElementById('setPayReqShipping')?.checked || false,
            requireNotes: document.getElementById('setPayReqNotes')?.checked || false,
            successMsg: document.getElementById('setPaySuccessMsg')?.value || '✅ Payment Successful! Redirecting to WhatsApp to confirm...',
            waPrefix: document.getElementById('setPayWaPrefix')?.value || 'Hello, I just made a payment for '
        };
        // Save Consult Acharya page content
        this.saveConsultAcharyaPageSettings();
        this.saveData();
    },

    async connectFirebaseCms() {
        const cmsConfig = {
            provider: 'firebase',
            databaseURL: document.getElementById('setCmsDatabaseUrl')?.value.trim() || '',
            apiKey: document.getElementById('setCmsApiKey')?.value.trim() || '',
            email: document.getElementById('setCmsEmail')?.value.trim() || '',
            password: document.getElementById('setCmsPassword')?.value || ''
        };
        localStorage.setItem('bs_cms_config', JSON.stringify(cmsConfig));
        const auth = await this.signInFirebase();
        const statusEl = document.getElementById('firebaseCmsStatus');
        if (auth) {
            if (statusEl) statusEl.textContent = 'Connected as ' + auth.email;
            this.showToast('Firebase CMS connected.', 'success');
        } else {
            if (statusEl) statusEl.textContent = 'Connection failed';
            this.showToast('Firebase connection failed. Check API key and credentials.', 'error');
        }
    },

    async syncFirebaseCmsNow() {
        const auth = await this.ensureFirebaseAuth();
        if (!auth) {
            this.showToast('Sign in to Firebase first.', 'error');
            return;
        }
        try {
            const ok = await this.pushRemoteData();
            if (ok) this.showToast('Firebase sync complete.', 'success');
            else this.showToast('Firebase sync failed.', 'error');
        } catch (e) {
            this.showToast('Firebase sync failed.', 'error');
        }
    },

    async testCmsConnection() {
        const statusEl = document.getElementById('firebaseCmsStatus');
        if (statusEl) statusEl.textContent = 'Testing...';
        // Try sign-in
        const auth = await this.signInFirebase();
        if (!auth) {
            if (statusEl) statusEl.textContent = 'Sign-in failed';
            this.showToast('Firebase sign-in failed. Check API key / credentials.', 'error');
            return false;
        }
        // Try fetch
        const remote = this.fetchRemoteData();
        if (!remote) {
            if (statusEl) statusEl.textContent = 'Fetch failed';
            this.showToast('Connected but failed to fetch `bs_admin_data` from database.', 'error');
            return false;
        }
        // Success
        if (statusEl) statusEl.textContent = 'OK — data fetched';
        this.showToast('Firebase test succeeded — data loaded.', 'success');
        return true;
    },

    resetDefaults() {
        if (!confirm('Reset ALL data to defaults? This cannot be undone.')) return;
        localStorage.removeItem('bs_admin_data');
        this.data = this.getDefaultData();
        this.renderDashboard();
        if (this.SECTIONS[this.currentCmsKey]) this.renderItemList();
        this.showToast('All data reset.', 'success');
    },

    // Hero
    handleHeroUpload(input) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            this.data.heroImage = e.target.result;
            document.getElementById('heroPreview').src = e.target.result;
            this.saveData();
        };
        reader.readAsDataURL(file);
    },

    handleHeroResize(val) {
        this.data.heroScale = val;
        document.getElementById('heroPreview').style.transform = 'scale(' + val + ')';
        document.getElementById('heroScaleValue').textContent = parseFloat(val).toFixed(1);
    },

    resetHero() {
        this.data.heroImage = 'assets/images/astrologer.png';
        this.data.heroScale = 1;
        document.getElementById('heroPreview').src = this.data.heroImage;
        document.getElementById('heroPreview').style.transform = 'scale(1)';
        document.getElementById('heroScaleRange').value = 1;
        document.getElementById('heroScaleValue').textContent = '1.0';
        this.saveData();
    },

    // Hero Slider Management
    renderHeroSlides() {
        const container = document.getElementById('heroSlidesList');
        if (!container) return;
        const slides = this.data.heroSlides || [];
        const addBtn = document.getElementById('addHeroSlideBtn');
        if (addBtn) addBtn.style.display = slides.length >= 5 ? 'none' : '';

        if (!slides.length) {
            container.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:20px;">No slides yet. Click "Add Slide" to create one.</p>';
            return;
        }

        container.innerHTML = slides.map((slide, i) => `
            <div class="editable-item" style="flex-direction:column;align-items:stretch;gap:12px;padding:16px;margin-bottom:12px;border:1px solid var(--admin-border);border-radius:10px;background:var(--admin-bg);">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <h4 style="margin:0;font-size:14px;color:var(--admin-accent);"><i class="fa-solid fa-image" style="margin-right:6px;"></i> Slide ${i + 1}: ${this.esc(slide.heading || '')} <span style="color:var(--admin-text-dim);">${this.esc(slide.highlight || '')}</span></h4>
                    <div style="display:flex;gap:6px;">
                        <button class="icon-btn" onclick="AdminApp.moveHeroSlide(${i},-1)" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                        <button class="icon-btn" onclick="AdminApp.moveHeroSlide(${i},1)" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                        <button class="icon-btn danger" onclick="AdminApp.deleteHeroSlide(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <div class="form-grid" style="grid-template-columns:1fr 1fr;gap:10px;">
                    <div class="form-group">
                        <label style="font-size:11px;">Tag Text</label>
                        <input class="form-input" value="${this.esc(slide.tag || '')}" onchange="AdminApp.updateHeroSlide(${i},'tag',this.value)" placeholder="e.g. 🙏 Trusted by 50,000+ Devotees">
                    </div>
                    <div class="form-group">
                        <label style="font-size:11px;">Heading</label>
                        <input class="form-input" value="${this.esc(slide.heading || '')}" onchange="AdminApp.updateHeroSlide(${i},'heading',this.value)" placeholder="e.g. Illuminate Your Life with">
                    </div>
                    <div class="form-group">
                        <label style="font-size:11px;">Highlight Text</label>
                        <input class="form-input" value="${this.esc(slide.highlight || '')}" onchange="AdminApp.updateHeroSlide(${i},'highlight',this.value)" placeholder="e.g. Vedic Wisdom">
                    </div>
                    <div class="form-group">
                        <label style="font-size:11px;">CTA Button Text</label>
                        <input class="form-input" value="${this.esc(slide.ctaText || '')}" onchange="AdminApp.updateHeroSlide(${i},'ctaText',this.value)" placeholder="e.g. Consult Now">
                    </div>
                    <div class="form-group">
                        <label style="font-size:11px;">CTA Button Link</label>
                        <input class="form-input" value="${this.esc(slide.ctaLink || '')}" onchange="AdminApp.updateHeroSlide(${i},'ctaLink',this.value)" placeholder="e.g. consult-acharya.html">
                    </div>
                    <div class="form-group">
                        <label style="font-size:11px;">CTA Icon (FA class)</label>
                        <input class="form-input" value="${this.esc(slide.ctaIcon || 'fa-calendar-check')}" onchange="AdminApp.updateHeroSlide(${i},'ctaIcon',this.value)" placeholder="e.g. fa-calendar-check">
                    </div>
                    <div class="form-group full-width">
                        <label style="font-size:11px;">Description</label>
                        <textarea class="form-input" rows="2" onchange="AdminApp.updateHeroSlide(${i},'desc',this.value)" placeholder="Slide description...">${this.esc(slide.desc || '')}</textarea>
                    </div>
                    <div class="form-group full-width">
                        <label style="font-size:11px;">Slide Image</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <div style="width:60px;height:60px;border-radius:8px;overflow:hidden;border:1px solid var(--admin-border);flex-shrink:0;background:var(--admin-surface);">
                                <img src="${slide.image || 'assets/images/astrologer.png'}" style="width:100%;height:100%;object-fit:cover;" id="heroSlideImg${i}" onerror="this.src='https://via.placeholder.com/60x60/1c1f2e/71717a?text=No+Img'">
                            </div>
                            <input class="form-input" value="${this.esc(slide.image || '')}" onchange="AdminApp.updateHeroSlide(${i},'image',this.value);document.getElementById('heroSlideImg${i}').src=this.value" placeholder="Image URL or upload" style="flex:1;">
                            <label class="btn btn-secondary btn-sm" style="cursor:pointer;white-space:nowrap;">
                                <i class="fa-solid fa-upload"></i> Upload
                                <input type="file" accept="image/*" style="display:none" onchange="AdminApp.handleHeroSlideUpload(${i},this)">
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    addHeroSlide() {
        if (!this.data.heroSlides) this.data.heroSlides = [];
        if (this.data.heroSlides.length >= 5) { alert('Maximum 5 slides allowed.'); return; }
        this.data.heroSlides.push({
            tag: '✨ New Slide',
            heading: 'Your Heading',
            highlight: 'Here',
            desc: 'Add your slide description here.',
            ctaText: 'Learn More',
            ctaLink: '#',
            ctaIcon: 'fa-arrow-right',
            image: 'assets/images/astrologer.png',
            imgScale: 1
        });
        this.saveData();
        this.renderHeroSlides();
    },

    deleteHeroSlide(idx) {
        if (!confirm('Delete this slide?')) return;
        this.data.heroSlides.splice(idx, 1);
        this.saveData();
        this.renderHeroSlides();
    },

    moveHeroSlide(idx, dir) {
        const arr = this.data.heroSlides;
        const newIdx = idx + dir;
        if (newIdx < 0 || newIdx >= arr.length) return;
        [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
        this.saveData();
        this.renderHeroSlides();
    },

    updateHeroSlide(idx, key, value) {
        if (!this.data.heroSlides || !this.data.heroSlides[idx]) return;
        this.data.heroSlides[idx][key] = value;
        this.saveData();
    },

    handleHeroSlideUpload(idx, input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) { alert('File too large. Max 3MB.'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            this.data.heroSlides[idx].image = e.target.result;
            const img = document.getElementById('heroSlideImg' + idx);
            if (img) img.src = e.target.result;
            this.saveData();
        };
        reader.readAsDataURL(file);
    },

    handleAboutImageUpload(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) { alert('File too large. Max 3MB.'); return; }
        const reader = new FileReader();
        reader.onload = e => {
            this.data.aboutImage = e.target.result;
            document.getElementById('aboutImgPreview').src = e.target.result;
            document.getElementById('aboutImgUrl').value = '';
            this.saveData();
        };
        reader.readAsDataURL(file);
    },

    previewAboutImageUrl() {
        const url = document.getElementById('aboutImgUrl').value.trim();
        if (url && (url.startsWith('http') || url.startsWith('assets/'))) {
            this.data.aboutImage = url;
            document.getElementById('aboutImgPreview').src = url;
            this.saveData();
        }
    },

    handleAboutImageResize(val) {
        this.data.aboutImageScale = val;
        document.getElementById('aboutImgPreview').style.transform = 'scale(' + val + ')';
        document.getElementById('aboutImgScaleValue').textContent = parseFloat(val).toFixed(1);
    },

    resetAboutImage() {
        this.data.aboutImage = 'assets/images/astrologer.png';
        this.data.aboutImageScale = 1;
        document.getElementById('aboutImgPreview').src = this.data.aboutImage;
        document.getElementById('aboutImgPreview').style.transform = 'scale(1)';
        document.getElementById('aboutImgScaleRange').value = 1;
        document.getElementById('aboutImgScaleValue').textContent = '1.0';
        document.getElementById('aboutImgUrl').value = '';
        this.saveData();
    },

    // Logo
    handleLogoUpload(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) { alert('File too large. Max 3MB.'); return; }
        const reader = new FileReader();
        reader.onload = e => {
            this.data.logoImage = e.target.result;
            const lp = document.getElementById('logoPreview');
            if (lp) { lp.src = e.target.result; lp.style.display = 'block'; }
            this.saveData();
        };
        reader.readAsDataURL(file);
    },

    handleLogoResize(val) {
        this.data.logoWidth = val;
        document.getElementById('logoPreview').style.width = val + 'px';
        document.getElementById('widthValue').textContent = val;
    },

    resetLogo() {
        this.data.logoImage = '';
        this.data.logoWidth = 186;
        document.getElementById('logoPreview').src = 'assets/images/logo.svg';
        document.getElementById('logoWidthRange').value = 186;
        this.handleLogoResize(186);
        this.saveData();
    },

    // Testimonials
    renderTestimonials() {
        const c = document.getElementById('testimonialsList');
        if (!c) return;
        const items = this.data.testimonials || [];
        if (!items.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:20px;">No testimonials. Click "Add Testimonial" to create one.</p>';
            return;
        }
        c.innerHTML = items.map((t, i) => `
            <div class="editable-item" style="margin-bottom:10px;">
                <div style="width:44px;height:44px;border-radius:10px;background:rgba(200,135,62,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="fa-solid fa-quote-left" style="color:var(--admin-accent);"></i>
                </div>
                <div class="editable-item-info" style="flex:1;">
                    <h4>${this.esc(t.name)} <span style="color:var(--admin-text-dim);font-size:11px;font-weight:400;">${this.esc(t.location)}</span> <span style="color:#f59e0b;font-size:11px;">${'★'.repeat(t.rating || 5)}</span></h4>
                    <p>${this.esc(t.text).substring(0, 100)}${t.text.length > 100 ? '...' : ''}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.openTestimonialModal(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveTestimonial(${i},-1)" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveTestimonial(${i},1)" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteTestimonial(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    openTestimonialModal(idx) {
        const isEdit = idx !== undefined && idx !== null;
        const t = isEdit ? (this.data.testimonials || [])[idx] : null;
        document.getElementById('testimonialModalTitle').textContent = isEdit ? 'Edit Testimonial' : 'Add Testimonial';
        document.getElementById('testimonialEditIndex').value = isEdit ? idx : '';
        document.getElementById('tmName').value = t?.name || '';
        document.getElementById('tmLocation').value = t?.location || '';
        document.getElementById('tmRating').value = t?.rating || 5;
        document.getElementById('tmText').value = t?.text || '';
        this.openModal('testimonialModal');
    },

    saveTestimonial(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('testimonialEditIndex').value;
        const testimonial = {
            name: document.getElementById('tmName').value,
            location: document.getElementById('tmLocation').value,
            rating: parseInt(document.getElementById('tmRating').value) || 5,
            text: document.getElementById('tmText').value
        };
        if (!testimonial.name) { alert('Name is required'); return; }
        if (!this.data.testimonials) this.data.testimonials = [];
        if (idx !== '' && !isNaN(parseInt(idx))) {
            this.data.testimonials[parseInt(idx)] = testimonial;
        } else {
            this.data.testimonials.push(testimonial);
        }
        this.saveData();
        this.renderTestimonials();
        this.closeModal('testimonialModal');
    },

    moveTestimonial(i, dir) {
        const arr = this.data.testimonials;
        const ni = i + dir;
        if (ni < 0 || ni >= arr.length) return;
        [arr[i], arr[ni]] = [arr[ni], arr[i]];
        this.saveData();
        this.renderTestimonials();
    },

    deleteTestimonial(i) {
        if (!confirm('Delete this testimonial?')) return;
        this.data.testimonials.splice(i, 1);
        this.saveData();
        this.renderTestimonials();
    },

    // Marquee Items
    renderMarqueeItems() {
        const c = document.getElementById('marqueeItemsList');
        if (!c) return;
        const items = this.data.marqueeItems || [];
        if (!items.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:20px;">No marquee items.</p>';
            return;
        }
        c.innerHTML = items.map((text, i) => `
            <div class="editable-item" style="margin-bottom:8px;padding:12px 16px;">
                <div style="width:34px;height:34px;border-radius:8px;background:rgba(200,135,62,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="fa-solid fa-star" style="color:var(--admin-accent);font-size:12px;"></i>
                </div>
                <div class="editable-item-info" style="flex:1;">
                    <h4 style="font-size:13px;">${this.esc(text)}</h4>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.editMarqueeItem(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteMarqueeItem(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    addMarqueeItem() {
        const input = document.getElementById('newMarqueeItem');
        const text = input?.value?.trim();
        if (!text) { alert('Enter marquee text first.'); return; }
        if (!this.data.marqueeItems) this.data.marqueeItems = [];
        this.data.marqueeItems.push(text);
        input.value = '';
        this.saveData();
        this.renderMarqueeItems();
    },

    editMarqueeItem(i) {
        const current = this.data.marqueeItems[i];
        // Create inline editing
        const items = document.querySelectorAll('#marqueeItemsList .editable-item');
        if (!items[i]) return;
        const infoH4 = items[i].querySelector('.editable-item-info h4');
        if (!infoH4) return;
        const input = document.createElement('input');
        input.className = 'form-input';
        input.value = current;
        input.style.cssText = 'font-size:13px;padding:6px 10px;';
        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn btn-primary btn-sm';
        saveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        saveBtn.style.cssText = 'margin-left:8px;padding:6px 12px;';
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display:flex;gap:6px;align-items:center;flex:1;';
        wrapper.appendChild(input);
        wrapper.appendChild(saveBtn);
        infoH4.replaceWith(wrapper);
        input.focus();
        const doSave = () => {
            if (input.value.trim()) {
                this.data.marqueeItems[i] = input.value.trim();
                this.saveData();
            }
            this.renderMarqueeItems();
        };
        saveBtn.addEventListener('click', doSave);
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSave(); if (e.key === 'Escape') this.renderMarqueeItems(); });
    },

    deleteMarqueeItem(i) {
        if (!confirm('Delete this marquee item?')) return;
        this.data.marqueeItems.splice(i, 1);
        this.saveData();
        this.renderMarqueeItems();
    },

    // ─── Video Gallery Management ───
    convertToEmbedUrl(url) {
        if (!url) return '';
        url = url.trim();
        // Already an embed URL
        if (url.includes('/embed/')) return url;
        // youtube.com/watch?v=ID
        let match = url.match(/[?&]v=([^&]+)/);
        if (match) return 'https://www.youtube.com/embed/' + match[1];
        // youtu.be/ID
        match = url.match(/youtu\.be\/([^?&]+)/);
        if (match) return 'https://www.youtube.com/embed/' + match[1];
        // youtube.com/shorts/ID
        match = url.match(/shorts\/([^?&]+)/);
        if (match) return 'https://www.youtube.com/embed/' + match[1];
        return url;
    },

    renderVideoGallery() {
        const c = document.getElementById('videoGalleryList');
        if (!c) return;
        const items = this.data.videoGallery || [];
        if (!items.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:20px;">No videos. Add YouTube videos below.</p>';
            return;
        }
        c.innerHTML = items.map((v, i) => `
            <div class="editable-item" style="margin-bottom:10px;">
                <div style="width:80px;height:46px;border-radius:6px;overflow:hidden;flex-shrink:0;background:#000;">
                    <iframe src="${this.esc(v.youtubeUrl)}" style="width:100%;height:100%;border:0;pointer-events:none;" loading="lazy"></iframe>
                </div>
                <div class="editable-item-info" style="flex:1;">
                    <h4><i class="fa-brands fa-youtube" style="color:#f00;margin-right:6px;"></i>${this.esc(v.title)}</h4>
                    <p style="font-size:11px;color:var(--admin-text-dim);word-break:break-all;">${this.esc(v.youtubeUrl)}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.editVideoGalleryItem(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveVideoGalleryItem(${i},-1)" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveVideoGalleryItem(${i},1)" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteVideoGalleryItem(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    addVideoGalleryItem() {
        const titleEl = document.getElementById('newVgTitle');
        const urlEl = document.getElementById('newVgUrl');
        const title = titleEl?.value?.trim();
        const rawUrl = urlEl?.value?.trim();
        if (!title || !rawUrl) {
            // Open modal if inline fields are empty
            this.openVideoGalleryModal();
            return;
        }
        const embedUrl = this.convertToEmbedUrl(rawUrl);
        if (!this.data.videoGallery) this.data.videoGallery = [];
        this.data.videoGallery.push({ title, desc: '', youtubeUrl: embedUrl });
        titleEl.value = ''; urlEl.value = '';
        this.saveData();
        this.renderVideoGallery();
    },

    openVideoGalleryModal(idx) {
        const isEdit = idx !== undefined && idx !== null;
        const v = isEdit ? (this.data.videoGallery || [])[idx] : null;
        document.getElementById('videoGalleryModalTitle').textContent = isEdit ? 'Edit Video' : 'Add Video';
        document.getElementById('vgEditIndex').value = isEdit ? idx : '';
        document.getElementById('vgFmTitle').value = v?.title || '';
        document.getElementById('vgFmUrl').value = v?.youtubeUrl || '';
        document.getElementById('vgFmDesc').value = v?.desc || '';
        this.openModal('videoGalleryModal');
    },

    saveVideoGalleryModalItem(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('vgEditIndex').value;
        const title = document.getElementById('vgFmTitle').value;
        const rawUrl = document.getElementById('vgFmUrl').value;
        const desc = document.getElementById('vgFmDesc').value;
        if (!title || !rawUrl) { alert('Title and URL are required'); return; }
        const embedUrl = this.convertToEmbedUrl(rawUrl);
        if (!this.data.videoGallery) this.data.videoGallery = [];
        if (idx !== '' && !isNaN(parseInt(idx))) {
            this.data.videoGallery[parseInt(idx)] = { title, desc, youtubeUrl: embedUrl };
        } else {
            this.data.videoGallery.push({ title, desc, youtubeUrl: embedUrl });
        }
        this.saveData();
        this.renderVideoGallery();
        this.closeModal('videoGalleryModal');
    },

    editVideoGalleryItem(i) {
        this.openVideoGalleryModal(i);
    },

    moveVideoGalleryItem(i, dir) {
        const arr = this.data.videoGallery;
        const ni = i + dir;
        if (ni < 0 || ni >= arr.length) return;
        [arr[i], arr[ni]] = [arr[ni], arr[i]];
        this.saveData();
        this.renderVideoGallery();
    },

    deleteVideoGalleryItem(i) {
        if (!confirm('Delete this video?')) return;
        this.data.videoGallery.splice(i, 1);
        this.saveData();
        this.renderVideoGallery();
    },

    // ─── FAQ Management ───
    renderFaq() {
        const c = document.getElementById('faqList');
        if (!c) return;
        const items = this.data.faq || [];
        if (!items.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:20px;">No FAQ items. Click "Add FAQ" to create one.</p>';
            return;
        }
        c.innerHTML = items.map((f, i) => `
            <div class="editable-item" style="margin-bottom:10px;">
                <div style="width:44px;height:44px;border-radius:10px;background:rgba(200,135,62,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="fa-solid fa-circle-question" style="color:var(--admin-accent);"></i>
                </div>
                <div class="editable-item-info" style="flex:1;">
                    <h4>${this.esc(f.question)}</h4>
                    <p>${this.esc(f.answer).substring(0, 80)}${(f.answer || '').length > 80 ? '...' : ''}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.editFaq(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveFaq(${i},-1)" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveFaq(${i},1)" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteFaq(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    addFaq() {
        this.openFaqModal();
    },

    openFaqModal(idx) {
        const isEdit = idx !== undefined && idx !== null;
        const f = isEdit ? (this.data.faq || [])[idx] : null;
        document.getElementById('faqModalTitle').textContent = isEdit ? 'Edit FAQ' : 'Add FAQ';
        document.getElementById('faqEditIndex').value = isEdit ? idx : '';
        document.getElementById('faqFmQuestion').value = f?.question || '';
        document.getElementById('faqFmAnswer').value = f?.answer || '';
        this.openModal('faqModal');
    },

    saveFaqItem(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('faqEditIndex').value;
        const faqItem = {
            question: document.getElementById('faqFmQuestion').value,
            answer: document.getElementById('faqFmAnswer').value
        };
        if (!faqItem.question) { alert('Question is required'); return; }
        if (!this.data.faq) this.data.faq = [];
        if (idx !== '' && !isNaN(parseInt(idx))) {
            this.data.faq[parseInt(idx)] = faqItem;
        } else {
            this.data.faq.push(faqItem);
        }
        this.saveData();
        this.renderFaq();
        this.closeModal('faqModal');
    },

    editFaq(i) {
        this.openFaqModal(i);
    },

    moveFaq(i, dir) {
        const arr = this.data.faq;
        const ni = i + dir;
        if (ni < 0 || ni >= arr.length) return;
        [arr[i], arr[ni]] = [arr[ni], arr[i]];
        this.saveData();
        this.renderFaq();
    },

    deleteFaq(i) {
        if (!confirm('Delete this FAQ item?')) return;
        this.data.faq.splice(i, 1);
        this.saveData();
        this.renderFaq();
    },

    // ─── Store Products Management ───
    renderStoreProducts() {
        const c = document.getElementById('storeProductsList');
        if (!c) return;
        const items = this.data.storeProducts || [];
        if (!items.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:20px;">No products. Click "Add Product" to create one.</p>';
            return;
        }
        c.innerHTML = items.map((p, i) => `
            <div class="editable-item" style="margin-bottom:10px;">
                ${p.image ? `<img src="${this.esc(p.image)}" style="width:50px;height:50px;border-radius:10px;object-fit:${this.esc(p.imgFit || 'cover')};object-position:${parseInt(p.imgPosX || 50, 10)}% ${parseInt(p.imgPosY || 50, 10)}%;transform:scale(${parseFloat(p.imgScale || 1)});flex-shrink:0;border:1px solid var(--admin-border);" onerror="this.style.display='none'">` : `<div style="width:50px;height:50px;border-radius:10px;background:rgba(200,135,62,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fa-solid ${this.esc(p.icon || 'fa-gem')}" style="color:var(--admin-accent);"></i></div>`}
                <div class="editable-item-info" style="flex:1;">
                    <h4>${this.esc(p.name)} <span style="color:var(--admin-text-dim);font-size:11px;font-weight:400;">${this.esc(p.cat||'')} · ${this.esc(p.price||'')}</span></h4>
                    <p>${this.esc(p.subtitle||'').substring(0,70)}${(p.subtitle||'').length>70?'...':''}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.editStoreProduct(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveStoreProduct(${i},-1)" title="Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveStoreProduct(${i},1)" title="Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteStoreProduct(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    addStoreProduct() {
        this.openStoreProductModal();
    },

    openStoreProductModal(idx) {
        const isEdit = idx !== undefined && idx !== null;
        const p = isEdit ? (this.data.storeProducts || [])[idx] : null;
        document.getElementById('storeProductModalTitle').textContent = isEdit ? 'Edit Product' : 'Add Product';
        document.getElementById('spEditIndex').value = isEdit ? idx : '';
        document.getElementById('spName').value = p?.name || '';
        document.getElementById('spCat').value = p?.cat || 'gemstone';
        document.getElementById('spPlanet').value = p?.planet || '';
        document.getElementById('spIcon').value = p?.icon || 'fa-gem';
        document.getElementById('spSubtitle').value = p?.subtitle || '';
        document.getElementById('spPrice').value = p?.price || '';
        document.getElementById('spBadge').value = p?.badge || '';
        const spStyle = document.getElementById('spStyle');
        if (spStyle) spStyle.value = p?.style || 'standard';
        document.getElementById('spImage').value = p?.image || '';
        const spImgFit = document.getElementById('spImgFit');
        if (spImgFit) spImgFit.value = p?.imgFit || 'cover';
        
        const spImgScale = document.getElementById('spImgScale');
        if (spImgScale) spImgScale.value = p?.imgScale || 1;
        
        const spScaleVal = document.getElementById('spScaleVal');
        if (spScaleVal) spScaleVal.textContent = parseFloat(p?.imgScale || 1).toFixed(1);
        
        const spPosX = document.getElementById('spPosX');
        if (spPosX) spPosX.value = p?.imgPosX || 50;
        
        const spPosY = document.getElementById('spPosY');
        if (spPosY) spPosY.value = p?.imgPosY || 50;
        
        const spPosXVal = document.getElementById('spPosXVal');
        if (spPosXVal) spPosXVal.textContent = (p?.imgPosX || 50) + '%';
        
        const spPosYVal = document.getElementById('spPosYVal');
        if (spPosYVal) spPosYVal.textContent = (p?.imgPosY || 50) + '%';
        
        if (document.getElementById('spAboutHeading')) document.getElementById('spAboutHeading').value = p?.aboutHeading || '';
        if (document.getElementById('spSpecsHeading')) document.getElementById('spSpecsHeading').value = p?.specsHeading || '';
        if (document.getElementById('spNoteHeading')) document.getElementById('spNoteHeading').value = p?.noteHeading || '';

        const spDetailDesc = document.getElementById('spDetailDesc');
        if (spDetailDesc) spDetailDesc.value = p?.detailDesc || '';
        
        const spFeatures = document.getElementById('spFeatures');
        if (spFeatures) spFeatures.value = p?.features || '';
        
        const spIncludes = document.getElementById('spIncludes');
        if (spIncludes) spIncludes.value = p?.includes || '';
        this.editingFields = JSON.parse(JSON.stringify(this.getItemCheckoutFields(p, 'storeProducts')));
        this.renderCheckoutFieldsBuilder('sp');
        this.updateSpIconPreview();
        const prev = document.getElementById('spPreviewImg');
        const prevText = document.getElementById('spPreviewText');
        const adjust = document.getElementById('spImgAdjustControls');
        if (p?.image) {
            prev.src = p.image; prev.style.display = 'block';
            prev.style.objectFit = p.imgFit || 'cover';
            prev.style.transform = 'scale(' + (p.imgScale || 1) + ')';
            prev.style.objectPosition = (p.imgPosX || 50) + '% ' + (p.imgPosY || 50) + '%';
            if (prevText) prevText.style.display = 'none';
            if (adjust) adjust.style.display = 'block';
        } else {
            prev.style.display = 'none';
            if (prevText) prevText.style.display = 'block';
            if (adjust) adjust.style.display = 'none';
        }
        this.openModal('storeProductModal');
    },

    saveStoreProductItem(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('spEditIndex').value;
        const hasShipping = this.editingFields.some(f => {
            const l = (f.label || '').toLowerCase();
            return l.includes('address') || l.includes('city') || l.includes('pin') || l.includes('shipping');
        });
        const hasBirth = this.editingFields.some(f => {
            const l = (f.label || '').toLowerCase();
            return l.includes('birth') || l.includes('dob') || l.includes('time of birth') || l.includes('place of birth');
        });
        const hasNotes = this.editingFields.some(f => {
            const l = (f.label || '').toLowerCase();
            return l.includes('notes') || l.includes('instruction');
        });

        const product = {
            name: document.getElementById('spName').value,
            cat: document.getElementById('spCat').value,
            planet: document.getElementById('spPlanet').value,
            icon: document.getElementById('spIcon').value,
            subtitle: document.getElementById('spSubtitle').value,
            price: document.getElementById('spPrice').value,
            badge: document.getElementById('spBadge').value,
            style: document.getElementById('spStyle') ? document.getElementById('spStyle').value : 'standard',
            image: document.getElementById('spImage').value,
            imgFit: document.getElementById('spImgFit') ? document.getElementById('spImgFit').value : 'cover',
            imgScale: parseFloat(document.getElementById('spImgScale') ? document.getElementById('spImgScale').value : 1) || 1,
            imgPosX: parseInt(document.getElementById('spPosX') ? document.getElementById('spPosX').value : 50, 10),
            imgPosY: parseInt(document.getElementById('spPosY') ? document.getElementById('spPosY').value : 50, 10),
            aboutHeading: document.getElementById('spAboutHeading') ? document.getElementById('spAboutHeading').value : '',
            specsHeading: document.getElementById('spSpecsHeading') ? document.getElementById('spSpecsHeading').value : '',
            noteHeading: document.getElementById('spNoteHeading') ? document.getElementById('spNoteHeading').value : '',
            detailDesc: document.getElementById('spDetailDesc') ? document.getElementById('spDetailDesc').value : '',
            features: document.getElementById('spFeatures') ? document.getElementById('spFeatures').value : '',
            includes: document.getElementById('spIncludes') ? document.getElementById('spIncludes').value : '',
            reqShipping: hasShipping,
            reqBirth: hasBirth,
            reqNotes: hasNotes,
            checkoutFields: this.editingFields
        };
        if (!product.name) { alert('Name is required'); return; }
        if (!this.data.storeProducts) this.data.storeProducts = [];
        if (idx !== '' && !isNaN(parseInt(idx))) {
            this.data.storeProducts[parseInt(idx)] = product;
        } else {
            this.data.storeProducts.push(product);
        }
        this.saveData();
        this.renderStoreProducts();
        this.closeModal('storeProductModal');
    },

    editStoreProduct(i) {
        this.openStoreProductModal(i);
    },

    updateSpIconPreview() {
        const icon = document.getElementById('spIcon')?.value || 'fa-gem';
        const el = document.getElementById('spIconPreviewI');
        if (el) el.className = 'fa-solid ' + icon;
    },

    adjustSpImage(type, val) {
        const prev = document.getElementById('spPreviewImg');
        if (!prev) return;
        if (type === 'fit') {
            prev.style.objectFit = val;
        } else if (type === 'scale') {
            prev.style.transform = 'scale(' + val + ')';
            const label = document.getElementById('spScaleVal');
            if (label) label.textContent = parseFloat(val).toFixed(1);
        } else if (type === 'posX') {
            prev.style.objectPosition = val + '% ' + (document.getElementById('spPosY')?.value || 50) + '%';
            const label = document.getElementById('spPosXVal');
            if (label) label.textContent = val + '%';
        } else if (type === 'posY') {
            prev.style.objectPosition = (document.getElementById('spPosX')?.value || 50) + '% ' + val + '%';
            const label = document.getElementById('spPosYVal');
            if (label) label.textContent = val + '%';
        }
    },

    previewSpImage() {
        const url = document.getElementById('spImage').value.trim();
        const prev = document.getElementById('spPreviewImg');
        const prevText = document.getElementById('spPreviewText');
        const adjust = document.getElementById('spImgAdjustControls');
        if (url && (url.startsWith('http') || url.startsWith('data:') || url.startsWith('assets/'))) {
            prev.src = url; prev.style.display = 'block';
            prev.style.objectFit = document.getElementById('spImgFit')?.value || 'cover';
            prev.style.transform = 'scale(' + (document.getElementById('spImgScale')?.value || 1) + ')';
            prev.style.objectPosition = (document.getElementById('spPosX')?.value || 50) + '% ' + (document.getElementById('spPosY')?.value || 50) + '%';
            if (prevText) prevText.style.display = 'none';
            if (adjust) adjust.style.display = 'block';
        } else if (!url) {
            prev.style.display = 'none';
            if (prevText) prevText.style.display = 'block';
            if (adjust) adjust.style.display = 'none';
        }
    },

    handleSpImageUpload(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) { alert('File too large. Max 3MB.'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('spImage').value = e.target.result;
            const prev = document.getElementById('spPreviewImg');
            prev.src = e.target.result; prev.style.display = 'block';
            prev.style.objectFit = document.getElementById('spImgFit')?.value || 'cover';
            prev.style.transform = 'scale(' + (document.getElementById('spImgScale')?.value || 1) + ')';
            prev.style.objectPosition = (document.getElementById('spPosX')?.value || 50) + '% ' + (document.getElementById('spPosY')?.value || 50) + '%';
            document.getElementById('spPreviewText').style.display = 'none';
            const adjust = document.getElementById('spImgAdjustControls');
            if (adjust) adjust.style.display = 'block';
        };
        reader.readAsDataURL(file);
    },

    moveStoreProduct(i, dir) {
        const arr = this.data.storeProducts;
        const ni = i + dir;
        if (ni < 0 || ni >= arr.length) return;
        [arr[i], arr[ni]] = [arr[ni], arr[i]];
        this.saveData();
        this.renderStoreProducts();
    },

    deleteStoreProduct(i) {
        if (!confirm('Delete this product?')) return;
        this.data.storeProducts.splice(i, 1);
        this.saveData();
        this.renderStoreProducts();
    },

    // ─── Awards Management ───
    renderAwards() {
        const c = document.getElementById('awardsList');
        if (!c) return;
        const items = this.data.awards || [];
        if (!items.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:20px;">No awards. Click "Add Award" to create one.</p>';
            return;
        }
        c.innerHTML = items.map((a, i) => `
            <div class="editable-item" style="margin-bottom:10px;">
                ${a.image ? `<img src="${this.esc(a.image)}" style="width:56px;height:56px;border-radius:10px;object-fit:cover;flex-shrink:0;border:1px solid var(--admin-border);" onerror="this.style.display='none'">` : `<div style="width:56px;height:56px;border-radius:10px;background:rgba(200,135,62,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fa-solid ${this.esc(a.icon || 'fa-trophy')}" style="color:var(--admin-accent);font-size:20px;"></i></div>`}
                <div class="editable-item-info" style="flex:1;">
                    <h4><i class="fa-solid ${this.esc(a.icon || 'fa-trophy')}" style="color:var(--admin-accent);margin-right:6px;"></i>${this.esc(a.title)} <span style="color:var(--admin-text-dim);font-size:11px;font-weight:400;">${this.esc(a.year || '')}</span></h4>
                    <p>${this.esc(a.desc).substring(0, 80)}${(a.desc || '').length > 80 ? '...' : ''}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.editAward(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveAward(${i},-1)" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveAward(${i},1)" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteAward(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    openAwardModal(idx) {
        const isEdit = idx !== undefined && idx !== null;
        const a = isEdit ? (this.data.awards || [])[idx] : null;
        document.getElementById('awardModalTitle').textContent = isEdit ? 'Edit Award' : 'Add New Award';
        document.getElementById('awardEditIndex').value = isEdit ? idx : '';
        document.getElementById('awardFmTitle').value = a?.title || '';
        document.getElementById('awardFmDesc').value = a?.desc || '';
        document.getElementById('awardFmYear').value = a?.year || new Date().getFullYear();
        document.getElementById('awardFmIcon').value = a?.icon || 'fa-trophy';
        document.getElementById('awardFmImg').value = a?.image || '';
        document.getElementById('awardFmImgFit').value = a?.imgFit || 'cover';
        document.getElementById('awardFmImgScale').value = a?.imgScale || 1;
        document.getElementById('awardFmScaleVal').textContent = parseFloat(a?.imgScale || 1).toFixed(1);
        const prev = document.getElementById('awardPreviewImg');
        const prevText = document.getElementById('awardPreviewText');
        const adjustControls = document.getElementById('awardImgAdjustControls');
        if (a?.image) {
            prev.src = a.image; prev.style.display = 'block';
            prev.style.objectFit = a?.imgFit || 'cover';
            prev.style.transform = 'scale(' + (a?.imgScale || 1) + ')';
            if (prevText) prevText.style.display = 'none';
            if (adjustControls) adjustControls.style.display = 'block';
        } else {
            prev.style.display = 'none';
            prev.style.transform = 'scale(1)';
            if (prevText) prevText.style.display = 'block';
            if (adjustControls) adjustControls.style.display = 'none';
        }
        // Update icon preview
        const iconPrev = document.getElementById('awardIconPreviewI');
        if (iconPrev) iconPrev.className = 'fa-solid ' + (a?.icon || 'fa-trophy');
        this.openModal('awardModal');
    },

    saveAward(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('awardEditIndex').value;
        const award = {
            title: document.getElementById('awardFmTitle').value,
            desc: document.getElementById('awardFmDesc').value,
            year: document.getElementById('awardFmYear').value,
            icon: document.getElementById('awardFmIcon').value || 'fa-trophy',
            image: document.getElementById('awardFmImg').value,
            imgFit: document.getElementById('awardFmImgFit').value || 'cover',
            imgScale: parseFloat(document.getElementById('awardFmImgScale').value) || 1
        };
        if (!award.title) { alert('Title is required'); return; }
        if (!this.data.awards) this.data.awards = [];
        if (idx !== '' && !isNaN(parseInt(idx))) {
            this.data.awards[parseInt(idx)] = award;
        } else {
            this.data.awards.push(award);
        }
        this.saveData();
        this.renderAwards();
        this.closeModal('awardModal');
    },

    editAward(i) { this.openAwardModal(i); },

    moveAward(i, dir) {
        const arr = this.data.awards;
        const ni = i + dir;
        if (ni < 0 || ni >= arr.length) return;
        [arr[i], arr[ni]] = [arr[ni], arr[i]];
        this.saveData();
        this.renderAwards();
    },

    deleteAward(i) {
        if (!confirm('Delete this award?')) return;
        this.data.awards.splice(i, 1);
        this.saveData();
        this.renderAwards();
    },

    handleAwardImageUpload(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) { alert('File too large. Max 3MB.'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('awardFmImg').value = e.target.result;
            const prev = document.getElementById('awardPreviewImg');
            prev.src = e.target.result; prev.style.display = 'block';
            prev.style.objectFit = document.getElementById('awardFmImgFit').value;
            prev.style.transform = 'scale(' + document.getElementById('awardFmImgScale').value + ')';
            document.getElementById('awardPreviewText').style.display = 'none';
            document.getElementById('awardImgAdjustControls').style.display = 'block';
        };
        reader.readAsDataURL(file);
    },

    previewAwardUrlImage() {
        const url = document.getElementById('awardFmImg').value.trim();
        const prev = document.getElementById('awardPreviewImg');
        if (url && (url.startsWith('http') || url.startsWith('data:') || url.startsWith('assets/'))) {
            prev.src = url;
            prev.style.display = 'block';
            prev.style.objectFit = document.getElementById('awardFmImgFit').value;
            prev.style.transform = 'scale(' + document.getElementById('awardFmImgScale').value + ')';
            document.getElementById('awardPreviewText').style.display = 'none';
            document.getElementById('awardImgAdjustControls').style.display = 'block';
        } else if (!url) {
            prev.style.display = 'none';
            document.getElementById('awardPreviewText').style.display = 'block';
            document.getElementById('awardImgAdjustControls').style.display = 'none';
        }
    },

    adjustAwardImage(type, val) {
        const prev = document.getElementById('awardPreviewImg');
        if (type === 'fit') {
            prev.style.objectFit = val;
        } else if (type === 'scale') {
            prev.style.transform = 'scale(' + val + ')';
            document.getElementById('awardFmScaleVal').textContent = parseFloat(val).toFixed(1);
        }
    },

    updateAwardIconPreview() {
        const icon = document.getElementById('awardFmIcon').value;
        const el = document.getElementById('awardIconPreviewI');
        if (el) el.className = 'fa-solid ' + icon;
    },

    // ─── Course Reviews Management ───
    renderCourseReviews() {
        const c = document.getElementById('courseReviewsList');
        if (!c) return;
        const items = this.data.courseReviews || [];
        if (!items.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:20px;">No student reviews. Click "Add Student Review" to create one.</p>';
            return;
        }
        c.innerHTML = items.map((r, i) => `
            <div class="editable-item" style="margin-bottom:10px;">
                <div style="width:44px;height:44px;border-radius:10px;background:rgba(200,135,62,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="fa-solid fa-user-graduate" style="color:var(--admin-accent);"></i>
                </div>
                <div class="editable-item-info" style="flex:1;">
                    <h4>${this.esc(r.name)} <span style="color:var(--admin-text-dim);font-size:11px;font-weight:400;">${this.esc(r.course || '')}</span> <span style="color:#f59e0b;font-size:11px;">${'★'.repeat(r.rating || 5)}</span></h4>
                    <p>${this.esc(r.text).substring(0, 100)}${(r.text || '').length > 100 ? '...' : ''}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.openCourseReviewModal(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveCourseReview(${i},-1)" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveCourseReview(${i},1)" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteCourseReview(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    openCourseReviewModal(idx) {
        const isEdit = idx !== undefined && idx !== null;
        const r = isEdit ? (this.data.courseReviews || [])[idx] : null;
        document.getElementById('courseReviewModalTitle').textContent = isEdit ? 'Edit Student Review' : 'Add Student Review';
        document.getElementById('crEditIndex').value = isEdit ? idx : '';
        document.getElementById('crName').value = r?.name || '';
        document.getElementById('crCourse').value = r?.course || '';
        document.getElementById('crRating').value = r?.rating || 5;
        document.getElementById('crLocation').value = r?.location || '';
        document.getElementById('crText').value = r?.text || '';
        this.openModal('courseReviewModal');
    },

    saveCourseReview(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('crEditIndex').value;
        const review = {
            name: document.getElementById('crName').value,
            course: document.getElementById('crCourse').value,
            rating: parseInt(document.getElementById('crRating').value) || 5,
            location: document.getElementById('crLocation').value,
            text: document.getElementById('crText').value
        };
        if (!review.name) { alert('Name is required'); return; }
        if (!this.data.courseReviews) this.data.courseReviews = [];
        if (idx !== '' && !isNaN(parseInt(idx))) {
            this.data.courseReviews[parseInt(idx)] = review;
        } else {
            this.data.courseReviews.push(review);
        }
        this.saveData();
        this.renderCourseReviews();
        this.closeModal('courseReviewModal');
    },

    moveCourseReview(i, dir) {
        const arr = this.data.courseReviews;
        const ni = i + dir;
        if (ni < 0 || ni >= arr.length) return;
        [arr[i], arr[ni]] = [arr[ni], arr[i]];
        this.saveData();
        this.renderCourseReviews();
    },

    deleteCourseReview(i) {
        if (!confirm('Delete this student review?')) return;
        this.data.courseReviews.splice(i, 1);
        this.saveData();
        this.renderCourseReviews();
    },

    // ─── Course FAQ Management ───
    renderCourseFaq() {
        const c = document.getElementById('courseFaqList');
        if (!c) return;
        const items = this.data.courseFaq || [];
        if (!items.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:20px;">No course FAQ items. Click "Add Course FAQ" to create one.</p>';
            return;
        }
        c.innerHTML = items.map((f, i) => `
            <div class="editable-item" style="margin-bottom:10px;">
                <div style="width:44px;height:44px;border-radius:10px;background:rgba(200,135,62,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="fa-solid fa-book-open" style="color:var(--admin-accent);"></i>
                </div>
                <div class="editable-item-info" style="flex:1;">
                    <h4>${this.esc(f.question)}</h4>
                    <p>${this.esc(f.answer).substring(0, 80)}${(f.answer || '').length > 80 ? '...' : ''}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.openCourseFaqModal(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveCourseFaq(${i},-1)" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveCourseFaq(${i},1)" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteCourseFaq(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    openCourseFaqModal(idx) {
        const isEdit = idx !== undefined && idx !== null;
        const f = isEdit ? (this.data.courseFaq || [])[idx] : null;
        document.getElementById('courseFaqModalTitle').textContent = isEdit ? 'Edit Course FAQ' : 'Add Course FAQ';
        document.getElementById('cfEditIndex').value = isEdit ? idx : '';
        document.getElementById('cfQuestion').value = f?.question || '';
        document.getElementById('cfAnswer').value = f?.answer || '';
        this.openModal('courseFaqModal');
    },

    saveCourseFaqItem(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('cfEditIndex').value;
        const faqItem = {
            question: document.getElementById('cfQuestion').value,
            answer: document.getElementById('cfAnswer').value
        };
        if (!faqItem.question) { alert('Question is required'); return; }
        if (!this.data.courseFaq) this.data.courseFaq = [];
        if (idx !== '' && !isNaN(parseInt(idx))) {
            this.data.courseFaq[parseInt(idx)] = faqItem;
        } else {
            this.data.courseFaq.push(faqItem);
        }
        this.saveData();
        this.renderCourseFaq();
        this.closeModal('courseFaqModal');
    },

    moveCourseFaq(i, dir) {
        const arr = this.data.courseFaq;
        const ni = i + dir;
        if (ni < 0 || ni >= arr.length) return;
        [arr[i], arr[ni]] = [arr[ni], arr[i]];
        this.saveData();
        this.renderCourseFaq();
    },

    deleteCourseFaq(i) {
        if (!confirm('Delete this course FAQ item?')) return;
        this.data.courseFaq.splice(i, 1);
        this.saveData();
        this.renderCourseFaq();
    },

    // ─── Consult Acharya Page Content Management ───
    renderConsultAcharyaPage() {
        const c = document.getElementById('consultAcharyaPageEditor');
        if (!c) return;
        const pg = this.data.consultAcharyaPage || {};
        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
        setVal('caPageBannerTitle', pg.bannerTitle);
        setVal('caPageBannerSubtitle', pg.bannerSubtitle);
        setVal('caPageProfileImage', pg.profileImage);
        setVal('caPageName', pg.name);
        setVal('caPageTitleTag', pg.titleTag);
        setVal('caPageLabel', pg.label);
        setVal('caPageHeading', pg.heading);
        setVal('caPageHighlight', pg.headingHighlight);
        setVal('caPageDesc1', pg.desc1);
        setVal('caPageDesc2', pg.desc2);
        setVal('caPagePricingLabel', pg.pricingSectionLabel);
        setVal('caPagePricingHeading', pg.pricingSectionHeading);
        setVal('caPagePricingHighlight', pg.pricingSectionHighlight);
        setVal('caPagePricingSubtitle', pg.pricingSectionSubtitle);
        setVal('caPageWhyLabel', pg.whySectionLabel);
        setVal('caPageWhyHeading', pg.whySectionHeading);
        setVal('caPageWhyHighlight', pg.whySectionHighlight);

        // Profile image preview
        const preview = document.getElementById('caPageImgPreview');
        if (preview && pg.profileImage) preview.src = pg.profileImage;

        // Render stats
        this.renderConsultAcharyaStats();

        // Render why items
        this.renderConsultAcharyaWhyItems();
    },

    renderConsultAcharyaStats() {
        const c = document.getElementById('caStatsList');
        if (!c) return;
        const stats = (this.data.consultAcharyaPage || {}).stats || [];
        if (!stats.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:12px;">No stats.</p>';
            return;
        }
        c.innerHTML = stats.map((s, i) => `
            <div class="editable-item" style="margin-bottom:8px;padding:12px 16px;">
                <div style="width:34px;height:34px;border-radius:8px;background:rgba(200,135,62,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <span style="font-weight:800;color:var(--admin-accent);font-size:13px;">${this.esc(s.num)}</span>
                </div>
                <div class="editable-item-info" style="flex:1;">
                    <h4 style="font-size:13px;">${this.esc(s.num)} — ${this.esc(s.label)}</h4>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.editCaPageStat(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteCaPageStat(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    addCaPageStat() {
        const num = prompt('Stat Number (e.g. 10+, 50K+, 4.9★):');
        if (!num) return;
        const label = prompt('Stat Label (e.g. Years Practice):');
        if (!label) return;
        if (!this.data.consultAcharyaPage) this.data.consultAcharyaPage = {};
        if (!this.data.consultAcharyaPage.stats) this.data.consultAcharyaPage.stats = [];
        this.data.consultAcharyaPage.stats.push({ num, label });
        this.saveData();
        this.renderConsultAcharyaStats();
    },

    editCaPageStat(i) {
        const stats = (this.data.consultAcharyaPage || {}).stats || [];
        const s = stats[i];
        if (!s) return;
        const num = prompt('Stat Number:', s.num);
        if (num === null) return;
        const label = prompt('Stat Label:', s.label);
        if (label === null) return;
        this.data.consultAcharyaPage.stats[i] = { num, label };
        this.saveData();
        this.renderConsultAcharyaStats();
    },

    deleteCaPageStat(i) {
        if (!confirm('Delete this stat?')) return;
        this.data.consultAcharyaPage.stats.splice(i, 1);
        this.saveData();
        this.renderConsultAcharyaStats();
    },

    renderConsultAcharyaWhyItems() {
        const c = document.getElementById('caWhyItemsList');
        if (!c) return;
        const items = (this.data.consultAcharyaPage || {}).whyItems || [];
        if (!items.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:12px;">No why items.</p>';
            return;
        }
        c.innerHTML = items.map((w, i) => `
            <div class="editable-item" style="margin-bottom:10px;">
                <div style="width:44px;height:44px;border-radius:10px;background:rgba(200,135,62,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="fa-solid ${this.esc(w.icon || 'fa-star')}" style="color:var(--admin-accent);"></i>
                </div>
                <div class="editable-item-info" style="flex:1;">
                    <h4>${this.esc(w.title)}</h4>
                    <p>${this.esc(w.desc).substring(0, 80)}${(w.desc || '').length > 80 ? '...' : ''}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.openCaWhyItemModal(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveCaWhyItem(${i},-1)" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="icon-btn" onclick="AdminApp.moveCaWhyItem(${i},1)" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteCaWhyItem(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    openCaWhyItemModal(idx) {
        const isEdit = idx !== undefined && idx !== null;
        const w = isEdit ? ((this.data.consultAcharyaPage || {}).whyItems || [])[idx] : null;
        document.getElementById('caWhyModalTitle').textContent = isEdit ? 'Edit Why Item' : 'Add Why Item';
        document.getElementById('caWhyEditIndex').value = isEdit ? idx : '';
        document.getElementById('caWhyIcon').value = w?.icon || 'fa-star';
        document.getElementById('caWhyTitle').value = w?.title || '';
        document.getElementById('caWhyDesc').value = w?.desc || '';
        const iconPrev = document.getElementById('caWhyIconPreviewI');
        if (iconPrev) iconPrev.className = 'fa-solid ' + (w?.icon || 'fa-star');
        this.openModal('caWhyItemModal');
    },

    saveCaWhyItem(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('caWhyEditIndex').value;
        const item = {
            icon: document.getElementById('caWhyIcon').value || 'fa-star',
            title: document.getElementById('caWhyTitle').value,
            desc: document.getElementById('caWhyDesc').value
        };
        if (!item.title) { alert('Title is required'); return; }
        if (!this.data.consultAcharyaPage) this.data.consultAcharyaPage = {};
        if (!this.data.consultAcharyaPage.whyItems) this.data.consultAcharyaPage.whyItems = [];
        if (idx !== '' && !isNaN(parseInt(idx))) {
            this.data.consultAcharyaPage.whyItems[parseInt(idx)] = item;
        } else {
            this.data.consultAcharyaPage.whyItems.push(item);
        }
        this.saveData();
        this.renderConsultAcharyaWhyItems();
        this.closeModal('caWhyItemModal');
    },

    moveCaWhyItem(i, dir) {
        const arr = this.data.consultAcharyaPage.whyItems;
        const ni = i + dir;
        if (ni < 0 || ni >= arr.length) return;
        [arr[i], arr[ni]] = [arr[ni], arr[i]];
        this.saveData();
        this.renderConsultAcharyaWhyItems();
    },

    deleteCaWhyItem(i) {
        if (!confirm('Delete this why item?')) return;
        this.data.consultAcharyaPage.whyItems.splice(i, 1);
        this.saveData();
        this.renderConsultAcharyaWhyItems();
    },

    updateCaWhyIconPreview() {
        const icon = document.getElementById('caWhyIcon').value;
        const el = document.getElementById('caWhyIconPreviewI');
        if (el) el.className = 'fa-solid ' + icon;
    },

    previewCaPageImage() {
        const url = document.getElementById('caPageProfileImage').value.trim();
        const prev = document.getElementById('caPageImgPreview');
        if (prev && url) prev.src = url;
    },

    handleCaPageImageUpload(input) {
        const file = input.files[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) { alert('File too large. Max 3MB.'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('caPageProfileImage').value = e.target.result;
            const prev = document.getElementById('caPageImgPreview');
            if (prev) prev.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },

    saveConsultAcharyaPageSettings() {
        if (!this.data.consultAcharyaPage) this.data.consultAcharyaPage = {};
        const pg = this.data.consultAcharyaPage;
        pg.bannerTitle = document.getElementById('caPageBannerTitle')?.value || '';
        pg.bannerSubtitle = document.getElementById('caPageBannerSubtitle')?.value || '';
        pg.profileImage = document.getElementById('caPageProfileImage')?.value || '';
        pg.name = document.getElementById('caPageName')?.value || '';
        pg.titleTag = document.getElementById('caPageTitleTag')?.value || '';
        pg.label = document.getElementById('caPageLabel')?.value || '';
        pg.heading = document.getElementById('caPageHeading')?.value || '';
        pg.headingHighlight = document.getElementById('caPageHighlight')?.value || '';
        pg.desc1 = document.getElementById('caPageDesc1')?.value || '';
        pg.desc2 = document.getElementById('caPageDesc2')?.value || '';
        pg.pricingSectionLabel = document.getElementById('caPagePricingLabel')?.value || '';
        pg.pricingSectionHeading = document.getElementById('caPagePricingHeading')?.value || '';
        pg.pricingSectionHighlight = document.getElementById('caPagePricingHighlight')?.value || '';
        pg.pricingSectionSubtitle = document.getElementById('caPagePricingSubtitle')?.value || '';
        pg.whySectionLabel = document.getElementById('caPageWhyLabel')?.value || '';
        pg.whySectionHeading = document.getElementById('caPageWhyHeading')?.value || '';
        pg.whySectionHighlight = document.getElementById('caPageWhyHighlight')?.value || '';
    },

    // Modal
    bindModal() {
        document.querySelectorAll('.modal-overlay').forEach(m => {
            m.addEventListener('click', e => { if (e.target === m) this.closeModal(m.id); });
        });
    },
    openModal(id) { document.getElementById(id)?.classList.add('active'); },
    closeModal(id) { document.getElementById(id)?.classList.remove('active'); },

    // Toast
    showToast(msg, type = 'success') {
        const c = document.getElementById('toastContainer');
        if (!c) return;
        const t = document.createElement('div');
        t.className = 'toast ' + type;
        t.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${msg}</span>`;
        c.appendChild(t);
        setTimeout(() => { t.classList.add('removing'); setTimeout(() => t.remove(), 300); }, 3000);
    },

    addListBullet() {
        const ta = document.getElementById('fmDesc');
        if (ta) ta.value += '\n• ';
    },

    getItemCheckoutFields(item, type) {
        if (item && item.checkoutFields && item.checkoutFields.length) {
            return item.checkoutFields;
        }

        const common = [
            { label: 'Full Name', type: 'text', required: true },
            { label: 'Phone (WhatsApp)', type: 'tel', required: true },
            { label: 'Email', type: 'email', required: true }
        ];

        // Determine flags based on existing item or defaults
        let reqShipping = false;
        let reqBirth = false;
        let reqNotes = false;

        if (item && item.reqShipping !== undefined) {
            reqShipping = item.reqShipping === true;
        } else {
            reqShipping = (type === 'product' || type === 'store' || type === 'storeProducts');
        }

        if (item && item.reqBirth !== undefined) {
            reqBirth = item.reqBirth === true;
        } else {
            reqBirth = (type !== 'product' && type !== 'store' && type !== 'storeProducts');
        }

        if (item && item.reqNotes !== undefined) {
            reqNotes = item.reqNotes === true;
        } else {
            reqNotes = true;
        }

        const fields = [...common];

        if (type === 'consultation' || type === 'consultAcharya') {
            fields.push({ label: 'Gender', type: 'select', required: true, options: 'Male, Female, Other' });
        }

        if (reqBirth) {
            fields.push({ label: 'Date of Birth', type: 'date', required: true });
            fields.push({ label: 'Birth Time', type: 'time', required: true });
            fields.push({ label: 'Birth Place', type: 'text', required: true });
            if (type === 'pooja') {
                fields.push({ label: 'Gotra', type: 'text', required: false });
            }
        }

        if (reqShipping) {
            fields.push({ label: 'Full Address', type: 'textarea', required: true });
            fields.push({ label: 'City', type: 'text', required: true });
            fields.push({ label: 'PIN Code', type: 'number', required: true });
        }

        if (reqNotes) {
            fields.push({ label: 'Special Notes', type: 'textarea', required: false });
        }

        return fields;
    },

    getDefaultCheckoutFields(type) {
        const common = [
            { label: 'Full Name', type: 'text', required: true },
            { label: 'Phone (WhatsApp)', type: 'tel', required: true },
            { label: 'Email', type: 'email', required: true }
        ];
        if (type === 'product' || type === 'store' || type === 'storeProducts') {
            return [
                ...common,
                { label: 'Full Address', type: 'textarea', required: true },
                { label: 'City', type: 'text', required: true },
                { label: 'PIN Code', type: 'number', required: true },
                { label: 'Special Notes', type: 'textarea', required: false }
            ];
        } else if (type === 'pooja') {
            return [
                ...common,
                { label: 'Date of Birth', type: 'date', required: true },
                { label: 'Birth Time', type: 'time', required: true },
                { label: 'Birth Place', type: 'text', required: true },
                { label: 'Gotra', type: 'text', required: false },
                { label: 'Special Notes', type: 'textarea', required: false }
            ];
        } else if (type === 'consultation' || type === 'consultAcharya') {
            return [
                ...common,
                { label: 'Gender', type: 'select', required: true, options: 'Male, Female, Other' },
                { label: 'Date of Birth', type: 'date', required: true },
                { label: 'Birth Time', type: 'time', required: true },
                { label: 'Birth Place', type: 'text', required: true },
                { label: 'Special Notes', type: 'textarea', required: false }
            ];
        } else {
            return [
                ...common,
                { label: 'Date of Birth', type: 'date', required: true },
                { label: 'Birth Time', type: 'time', required: true },
                { label: 'Birth Place', type: 'text', required: true },
                { label: 'Special Notes', type: 'textarea', required: false }
            ];
        }
    },

    renderCheckoutFieldsBuilder(prefix) {
        const container = document.getElementById(prefix + 'FieldsContainer');
        if (!container) return;
        const fields = this.editingFields || [];
        if (!fields.length) {
            container.innerHTML = '<p style="font-size:12px;color:var(--admin-text-dim);margin:0;">No checkout fields defined. Form will be empty or use fallback defaults.</p>';
            return;
        }
        container.innerHTML = fields.map((f, i) => `
            <div class="checkout-field-row" style="display:flex;gap:8px;align-items:center;background:var(--admin-border);padding:8px;border-radius:6px;border:1px solid var(--admin-border);margin-bottom:5px;">
                <div style="color:var(--admin-text-dim);cursor:default;font-size:12px;"><i class="fa-solid fa-bars"></i></div>
                <div style="flex:2;min-width:0;">
                    <input type="text" class="form-input" style="padding:6px;font-size:12px;width:100%;box-sizing:border-box;" placeholder="Field Label" value="${this.esc(f.label || '')}" oninput="AdminApp.updateCheckoutField(${i}, 'label', this.value, '${prefix}')">
                </div>
                <div style="flex:1.5;min-width:0;">
                    <select class="form-select" style="padding:6px;font-size:12px;height:auto;width:100%;box-sizing:border-box;" onchange="AdminApp.updateCheckoutField(${i}, 'type', this.value, '${prefix}'); AdminApp.toggleFieldOptions(${i}, this.value, '${prefix}')">
                        <option value="text" ${f.type === 'text' ? 'selected' : ''}>Text</option>
                        <option value="textarea" ${f.type === 'textarea' ? 'selected' : ''}>Textarea</option>
                        <option value="date" ${f.type === 'date' ? 'selected' : ''}>Date</option>
                        <option value="time" ${f.type === 'time' ? 'selected' : ''}>Time</option>
                        <option value="select" ${f.type === 'select' ? 'selected' : ''}>Select</option>
                        <option value="number" ${f.type === 'number' ? 'selected' : ''}>Number</option>
                        <option value="tel" ${f.type === 'tel' ? 'selected' : ''}>Phone</option>
                        <option value="email" ${f.type === 'email' ? 'selected' : ''}>Email</option>
                    </select>
                </div>
                <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
                    <label style="font-size:11px;color:var(--admin-text);cursor:pointer;display:flex;align-items:center;gap:4px;margin:0;">
                        <input type="checkbox" ${f.required ? 'checked' : ''} onchange="AdminApp.updateCheckoutField(${i}, 'required', this.checked, '${prefix}')"> Required
                    </label>
                </div>
                <div style="display:flex;gap:4px;flex-shrink:0;">
                    <button type="button" class="icon-btn" onclick="AdminApp.moveCheckoutField(${i}, -1, '${prefix}')" title="Move Up" style="padding:4px 8px;font-size:10px;border-radius:4px;cursor:pointer;"><i class="fa-solid fa-arrow-up"></i></button>
                    <button type="button" class="icon-btn" onclick="AdminApp.moveCheckoutField(${i}, 1, '${prefix}')" title="Move Down" style="padding:4px 8px;font-size:10px;border-radius:4px;cursor:pointer;"><i class="fa-solid fa-arrow-down"></i></button>
                    <button type="button" class="icon-btn danger" onclick="AdminApp.deleteCheckoutField(${i}, '${prefix}')" title="Delete" style="padding:4px 8px;font-size:10px;border-radius:4px;cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <div id="${prefix}_opts_${i}" class="checkout-field-options-row" style="display:${f.type === 'select' ? 'block' : 'none'};margin-top:-6px;padding-left:26px;margin-bottom:4px;width:100%;box-sizing:border-box;">
                <input type="text" class="form-input" style="padding:4px 8px;font-size:11px;width:100%;box-sizing:border-box;" placeholder="Options (comma separated, e.g. Male, Female, Other)" value="${this.esc(f.options || '')}" oninput="AdminApp.updateCheckoutField(${i}, 'options', this.value, '${prefix}')">
            </div>
        `).join('');
    },

    toggleFieldOptions(idx, type, prefix) {
        const el = document.getElementById(`${prefix}_opts_${idx}`);
        if (el) el.style.display = type === 'select' ? 'block' : 'none';
    },

    addCheckoutField() {
        if (!this.editingFields) this.editingFields = [];
        this.editingFields.push({ label: 'New Field', type: 'text', required: false });
        this.renderCheckoutFieldsBuilder('cms');
    },

    addStoreCheckoutField() {
        if (!this.editingFields) this.editingFields = [];
        this.editingFields.push({ label: 'New Field', type: 'text', required: false });
        this.renderCheckoutFieldsBuilder('sp');
    },

    deleteCheckoutField(idx, prefix) {
        if (!this.editingFields) return;
        this.editingFields.splice(idx, 1);
        this.renderCheckoutFieldsBuilder(prefix);
    },

    moveCheckoutField(idx, dir, prefix) {
        if (!this.editingFields) return;
        const newIdx = idx + dir;
        if (newIdx < 0 || newIdx >= this.editingFields.length) return;
        const temp = this.editingFields[idx];
        this.editingFields[idx] = this.editingFields[newIdx];
        this.editingFields[newIdx] = temp;
        this.renderCheckoutFieldsBuilder(prefix);
    },

    updateCheckoutField(idx, key, value, prefix) {
        if (!this.editingFields || !this.editingFields[idx]) return;
        this.editingFields[idx][key] = value;
    },

    renderCoupons() {
        const c = document.getElementById('couponsList');
        if (!c) return;
        const coupons = this.data.coupons || [];
        if (!coupons.length) {
            c.innerHTML = '<p style="text-align:center;color:var(--admin-text-dim);padding:30px;">No coupon codes created yet.</p>';
            return;
        }
        c.innerHTML = coupons.map((cp, i) => `
            <div class="editable-item" style="border-left:3px solid ${cp.status === 'active' ? 'var(--admin-success)' : 'var(--admin-text-dim)'}; align-items: center;">
                <div style="width:44px;height:44px;border-radius:10px;background:${cp.status === 'active' ? 'rgba(34,197,94,0.15)' : 'rgba(100,116,139,0.15)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i class="fa-solid fa-ticket" style="color:${cp.status === 'active' ? 'var(--admin-success)' : 'var(--admin-text-dim)'};"></i>
                </div>
                <div class="editable-item-info">
                    <h4><span style="font-family: monospace; background: var(--admin-border); padding: 2px 6px; border-radius: 4px; font-size: 15px; font-weight: 700; color: var(--admin-accent);">${this.esc(cp.code)}</span> <span class="status-badge ${cp.status === 'active' ? 'published' : 'draft'}">${cp.status}</span></h4>
                    <p style="margin-top: 4px;"><strong>Discount:</strong> ${cp.type === 'percentage' ? cp.value + '%' : '₹' + cp.value}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="icon-btn" onclick="AdminApp.editCoupon(${i})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn danger" onclick="AdminApp.deleteCoupon(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    openAddCouponModal() {
        document.getElementById('couponModalTitle').textContent = 'Add Coupon Code';
        document.getElementById('couponEditIndex').value = '';
        document.getElementById('couponForm').reset();
        this.openModal('couponModal');
    },

    editCoupon(idx) {
        const cp = (this.data.coupons || [])[idx];
        if (!cp) return;
        document.getElementById('couponModalTitle').textContent = 'Edit Coupon Code';
        document.getElementById('couponEditIndex').value = idx;
        document.getElementById('cpCode').value = cp.code || '';
        document.getElementById('cpType').value = cp.type || 'percentage';
        document.getElementById('cpValue').value = cp.value || '';
        document.getElementById('cpStatus').value = cp.status || 'active';
        this.openModal('couponModal');
    },

    saveCoupon(e) {
        if (e) e.preventDefault();
        const idx = document.getElementById('couponEditIndex').value;
        const code = document.getElementById('cpCode').value.trim().toUpperCase();
        const type = document.getElementById('cpType').value;
        const value = parseInt(document.getElementById('cpValue').value, 10);
        const status = document.getElementById('cpStatus').value;

        if (!code || isNaN(value) || value <= 0) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const coupon = { code, type, value, status };

        if (!this.data.coupons) this.data.coupons = [];

        // Check duplicates if adding or changing code name
        const dupIdx = this.data.coupons.findIndex(c => c.code.toUpperCase() === code);
        if (dupIdx !== -1 && dupIdx !== parseInt(idx, 10)) {
            alert('A coupon code with this name already exists.');
            return;
        }

        if (idx !== '' && !isNaN(parseInt(idx, 10))) {
            this.data.coupons[parseInt(idx, 10)] = coupon;
        } else {
            this.data.coupons.push(coupon);
        }

        this.saveData();
        this.closeModal('couponModal');
        this.renderCoupons();
    },

    deleteCoupon(idx) {
        if (!confirm('Delete this coupon code?')) return;
        if (!this.data.coupons) return;
        this.data.coupons.splice(idx, 1);
        this.saveData();
        this.renderCoupons();
    },

    generateRandomCoupon() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'BS-';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        document.getElementById('cpCode').value = code;
    },

    esc(str) { return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
};

document.addEventListener('DOMContentLoaded', () => AdminApp.init());
