
    (function(){
        const fallbackServices = [
            {
                title: 'Kundli / Birth Chart',
                category: 'astrology',
                desc: 'Complete Vedic birth chart analysis covering all 12 houses, planetary positions, dashas, and yogas to reveal your life blueprint.',
                image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f0?auto=format&fit=crop&w=800&q=80',
                newPrice: '1499',
                oldPrice: '2999',
                detailDesc: 'A full Janam Kundli reading gives clarity on your strengths, challenges, and life timing.\nOur astrologers analyze houses, yogas, dashas, and transits with practical guidance.',
                features: '12-house analysis\nPlanetary dasha and transit timing\nCareer, marriage, and finance guidance\nHealth and wellbeing indicators\nPersonalized remedies'
            },
            {
                title: 'Kundli Milan / Match Making',
                category: 'astrology',
                desc: 'Comprehensive Ashtakoota guna matching, Mangal dosha check, and Nadi analysis for marriage compatibility.',
                image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                newPrice: '1999',
                oldPrice: '2999',
                detailDesc: 'Compatibility is checked across all major factors of Vedic matching.\nYou receive practical insights about emotional harmony, family life, and long-term stability.',
                features: 'Ashtakoota guna matching\nMangal dosha analysis\nNadi, Bhakoot and Yoni checks\nStrength-risk summary\nMarriage remedy guidance'
            },
            {
                title: 'Muhurta (Auspicious Time)',
                category: 'astrology',
                desc: 'Find the right timing for marriage, griha pravesh, business launch, and other important events based on Panchang.',
                image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80',
                newPrice: '999',
                oldPrice: '1499',
                detailDesc: 'Choosing the right muhurta improves outcomes and reduces avoidable delays.\nWe align your event with tithi, nakshatra, yoga, and lagna.',
                features: 'Event-specific muhurta selection\nPanchang-based timing\nLagna suitability checks\nAvoidance of inauspicious windows\nDate and time options'
            },
            {
                title: 'Career & Financial Astrology',
                category: 'astrology',
                desc: 'Detailed analysis of 10th and 2nd houses to guide career direction, job timing, and wealth growth.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
                newPrice: '1499',
                oldPrice: '2499',
                detailDesc: 'Understand your strongest professional path and financial timing cycles.\nThis service helps with career changes, promotions, and money planning windows.',
                features: 'Career path analysis\nPromotion and switch timing\nJob vs business suitability\nIncome and savings trends\nRemedial recommendations'
            },
            {
                title: 'Love & Relationship Reading',
                category: 'astrology',
                desc: 'Understand relationship patterns, marriage timing, and remedies for delays or conflicts.',
                image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
                newPrice: '1499',
                oldPrice: '2499',
                detailDesc: 'This reading focuses on emotional compatibility, commitment patterns, and future relationship trends.\nUseful for singles, couples, and marriage planning.',
                features: 'Relationship pattern analysis\nMarriage timing insights\nPartner compatibility markers\nConflict and healing guidance\nVedic remedies'
            },
            {
                title: 'Health Astrology',
                category: 'astrology',
                desc: 'Medical astrology insights highlighting vulnerable periods and supportive remedies for wellbeing.',
                image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80',
                newPrice: '1499',
                oldPrice: '2499',
                detailDesc: 'Health astrology can indicate stress-prone phases and preventive focus areas.\nGuidance includes practical spiritual remedies and lifestyle-aware timing.',
                features: 'House and planet health indicators\nSensitive timing windows\nStress and vitality trends\nPreventive guidance\nSupportive remedies'
            },
            {
                title: 'Residential Vastu',
                category: 'vastu',
                desc: 'Complete audit of your home with practical non-demolition remedies for harmony and prosperity.',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                newPrice: '2999',
                oldPrice: '4999',
                detailDesc: 'Residential Vastu improves energy flow for peace and stability.\nRecommendations are practical and tailored to your current layout.',
                features: 'Entrance and room energy check\nDirection-wise corrections\nNon-demolition remedies\nFamily harmony focus\nProsperity activation points'
            },
            {
                title: 'Commercial Vastu',
                category: 'vastu',
                desc: 'Strategic Vastu consultation for offices, shops, and factories to support growth and productivity.',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
                newPrice: '4999',
                oldPrice: '6999',
                detailDesc: 'Commercial Vastu aligns workspaces for better decisions and smoother operations.\nIt is useful for offices, retail spaces, and industrial setups.',
                features: 'Office layout and seating guidance\nCashflow and sales zones\nDecision and leadership direction\nStaff productivity alignment\nBusiness growth remedies'
            },
            {
                title: 'Plot & Construction',
                category: 'vastu',
                desc: 'Vastu-compliant guidance for plot selection, building design, room placement, and directional planning.',
                image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
                newPrice: '3999',
                oldPrice: '5999',
                detailDesc: 'Early planning with Vastu helps avoid costly mistakes later.\nYou get direction-wise recommendations before construction begins.',
                features: 'Plot suitability analysis\nSite orientation planning\nRoom and staircase direction\nKitchen and bedroom placement\nConstruction stage guidance'
            },
            {
                title: 'Gemstone Recommendation',
                category: 'remedies',
                desc: 'Get certified gemstone recommendations based on your birth chart for specific planetary support.',
                image: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?auto=format&fit=crop&w=800&q=80',
                newPrice: '999',
                oldPrice: '1499',
                detailDesc: 'Gemstones are recommended only after proper chart analysis.\nYou receive metal, finger, day, and mantra guidance for wearing.',
                features: 'Planet-strength analysis\nStone suitability screening\nWeight and quality guidance\nWearing method instructions\nActivation mantra guidance'
            },
            {
                title: 'Rudraksha Therapy',
                category: 'remedies',
                desc: 'Authentic Rudraksha selection based on planetary needs for spiritual and emotional wellbeing.',
                image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=800&q=80',
                newPrice: '999',
                oldPrice: '1499',
                detailDesc: 'Rudraksha therapy is personalized based on your chart and intention.\nGuidance includes mukhi type, energization, and wearing protocol.',
                features: 'Mukhi selection by chart\nAuthenticity guidance\nWearing and maintenance rules\nMantra and activation support\nDaily usage recommendations'
            },
            {
                title: 'Yantra Siddhi',
                category: 'remedies',
                desc: 'Energized yantras for wealth, protection, and spiritual growth based on your specific goals.',
                image: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?auto=format&fit=crop&w=800&q=80',
                newPrice: '2100',
                oldPrice: '3100',
                detailDesc: 'Yantras are selected and energized as per your need and chart indications.\nYou receive placement direction and daily worship guidance.',
                features: 'Purpose-based yantra selection\nEnergization support\nCorrect placement direction\nDaily worship method\nFollow-up guidance'
            }
        ];

        function getId() {
            const h = location.hash.replace('#','');
            const hp = new URLSearchParams(h);
            if (hp.get('id') !== null) return parseInt(hp.get('id')) || 0;
            const qp = new URLSearchParams(location.search);
            if (qp.get('id') !== null) return parseInt(qp.get('id')) || 0;
            return 0;
        }
        const id = getId();
        let service = null, waNum = '919876543210';
        try {
            const d = JSON.parse(localStorage.getItem('bs_admin_data'));
            if (d && d.services && d.services[id]) service = d.services[id];
            if (d && d.site && d.site.whatsapp) waNum = d.site.whatsapp;
        } catch(e){}
        if (!service) service = fallbackServices[id] || fallbackServices[0];
        if (!service) { document.getElementById('sdTitle').innerHTML = 'Service <span>Not Found</span>'; return; }

        const wa = 'https://wa.me/' + waNum + '?text=' + encodeURIComponent('I want to book ' + service.title + ' service');
        const $ = s => document.getElementById(s);
        const cat = service.category || 'astrology';
        const catLabels = {astrology:'Astrology Service',vastu:'Vastu Service',remedies:'Spiritual Remedy'};
        const catIcons = {astrology:'fa-star',vastu:'fa-compass',remedies:'fa-gem'};

        document.title = service.title + ' - Bhartiya Sidhant';
        $('sdBadge').textContent = catLabels[cat] || 'Service';
        $('sdBadgeIcon').className = 'fa-solid ' + (catIcons[cat] || service.icon || 'fa-star');
        const words = service.title.split(' ');
        const last = words.pop();
        $('sdTitle').innerHTML = words.join(' ') + ' <span>' + last + '</span>';
        $('sdSubtitle').textContent = service.desc || '';
        $('sdImage').src = service.image || '';
        $('sdImage').alt = service.title;
        if (service.newPrice) {
            $('sdPriceBox').style.display = '';
            $('sdPrice').textContent = '₹' + service.newPrice;
            if (service.oldPrice) $('sdOldPrice').textContent = '₹' + service.oldPrice;
        }
        if ($('sdWaBtn')) $('sdWaBtn').href = wa;
        $('sdCtaWhatsapp').href = wa;
        $('sdAboutHeading').innerHTML = 'About <span>' + service.title + '</span>';

        // About content
        const detailDesc = service.detailDesc || service.desc || '';
        const paragraphs = detailDesc.split('\n').filter(p => p.trim());
        $('sdAboutContent').innerHTML = paragraphs.map(p => '<p>' + p.trim() + '</p>').join('');

        // Features
        const features = service.features ? service.features.split('\n').filter(f => f.trim()) : service.desc.split(',').filter(f => f.trim()).slice(0,7);
        $('sdFeaturesList').innerHTML = features.map(f => '<li><i class="fa-solid fa-check-circle"></i> ' + f.trim() + '</li>').join('');
        
        // Checkout Features
        $('checkoutFeatures').innerHTML = features.slice(0, 4).map(f => '<div class="feature-tile"><strong><i class="fa-solid fa-check"></i> ' + f.trim() + '</strong><span>Included in this service.</span></div>').join('');
        
        $('sdNoteText').textContent = cat === 'vastu'
            ? 'This service is meant to improve spatial harmony, reduce friction, and guide your decisions with practical Vastu-based clarity.'
            : cat === 'remedies'
                ? 'This service focuses on the right remedy or energized support so you are not guessing what to choose.'
                : 'This service is built to give you a practical astrology-based roadmap, not just a generic reading.';
        const noteItems = cat === 'vastu'
            ? ['Direction-wise corrections and practical fixes', 'Support for home, office, or plot planning', 'Non-demolition guidance wherever possible']
            : cat === 'remedies'
                ? ['Authentic recommendation and activation support', 'Simple wearing or placement instructions', 'Planet-focused energetic assistance']
                : ['Chart-based consultation or reading', 'Clear next steps and remedies', 'Follow-up support when applicable'];
        $('sdNoteList').innerHTML = noteItems.map(item => `<div class="sd-note-item"><i class="fa-solid fa-check-circle"></i><span>${item}</span></div>`).join('');

        const serviceReveal = cat === 'vastu'
            ? [
                ['fa-house','Space Harmony','Improve energy flow for home, office, or property planning.'],
                ['fa-compass','Direction Clarity','Know which placements and directions need attention.'],
                ['fa-shield-halved','Practical Remedies','Get non-demolition and easy-to-follow corrections.']
            ]
            : cat === 'remedies'
                ? [
                    ['fa-gem','Right Remedy Selection','Choose the proper gemstone, Rudraksha, or yantra support.'],
                    ['fa-om','Energization Support','Many items need proper ritual activation before use.'],
                    ['fa-headset','Usage Guidance','Receive simple instructions for wearing or placing it correctly.']
                ]
                : [
                    ['fa-scroll','Detailed Reading','Go deeper into the factors that matter most in your chart.'],
                    ['fa-chart-line','Timing & Trends','Understand what to do now and what to do later.'],
                    ['fa-lightbulb','Actionable Advice','Leave with practical steps instead of vague predictions.']
                ];
        $('sdRevealGrid').innerHTML = serviceReveal.map(r => `<div class="sd-reveal-card"><div class="sd-reveal-icon"><i class="fa-solid ${r[0]}"></i></div><h4>${r[1]}</h4><p>${r[2]}</p></div>`).join('');

        // Includes
        if (service.includes) {
            const includes = service.includes.split('\n').filter(i => i.trim());
            if (includes.length) {
                $('sdIncludesSection').style.display = '';
                const icons = ['fa-file-lines','fa-headset','fa-gem','fa-certificate','fa-book','fa-video','fa-shield-halved','fa-hand-holding-heart'];
                $('sdIncludesGrid').innerHTML = includes.map((inc, i) => `
                    <div class="sd-include"><i class="fa-solid ${icons[i % icons.length]}"></i><h4>${inc.trim()}</h4><p>Included with this service</p></div>
                `).join('');
            }
        }

        const related = fallbackServices.map((item, index) => ({ item, index })).filter(entry => entry.index !== id).slice(0, 3);
        $('sdRelatedGrid').innerHTML = related.map(entry => `
            <article class="sd-related-card">
                <img src="${entry.item.image}" alt="${entry.item.title}">
                <div class="sd-related-body">
                    <h4>${entry.item.title}</h4>
                    <p>${entry.item.desc}</p>
                    <div class="sd-related-meta">
                        <a class="sd-related-btn" href="service-detail.html#id=${entry.index}"><i class="fa-solid fa-arrow-right"></i> View</a>
                    </div>
                </div>
            </article>
        `).join('');

        window.openBuyRazorpay = function() {
            const priceNum = String(service.newPrice || '1499').replace(/[^0-9.]/g, '') || '1499';
            const pricePaise = Math.round(parseFloat(priceNum) * 100);
            openRazorpayModal({
                name: service.title,
                price: pricePaise,
                priceLabel: '₹' + service.newPrice,
                description: service.category === 'astrology' ? 'Vedic Astrology Service' : (service.category === 'vastu' ? 'Vastu Service' : 'Spiritual Remedy'),
                image: service.image || 'assets/images/astrologer.png',
                type: 'service',
                reqShipping: service.reqShipping,
                reqBirth: service.reqBirth,
                reqNotes: service.reqNotes
            });
        };

        // Update hero buttons to go to checkout
        if (service.newPrice) {
            if ($('sdPayBtn')) {
                $('sdPayBtn').innerHTML = '<i class="fa-solid fa-lock"></i> Buy & Book';
            }
            if ($('sdCtaWhatsapp')) {
                $('sdCtaWhatsapp').innerHTML = '<i class="fa-solid fa-lock"></i> Buy & Book';
                $('sdCtaWhatsapp').href = 'javascript:void(0)';
                $('sdCtaWhatsapp').removeAttribute('target');
                $('sdCtaWhatsapp').onclick = window.openBuyRazorpay;
            }
        }

        window.addEventListener('hashchange', () => location.reload());
    })();
    