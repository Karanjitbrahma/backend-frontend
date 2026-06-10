

// Bhartiya Sidhant - Main JavaScript (deployed copy)

// ─────────────────────────────────────────────────────────────────---------
// CMS Sync & Page Render
// ─────────────────────────────────────────────────────────────────---------
(async function CMS_Sync() {
    let data = null;
    try {
        const BACKEND_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? 'http://127.0.0.1:3001'
            : 'https://backend-frontend-1-bnjy.onrender.com';
        const resp = await fetch(`${BACKEND_URL}/api/cms-data`);
        if (resp.ok) {
            const parsed = await resp.json();
            if (parsed && Object.keys(parsed).length > 0) {
                data = parsed;
                localStorage.setItem('bs_admin_data', JSON.stringify(data));
            }
        }
    } catch (e) {
        console.warn('Failed to fetch live CMS data from server:', e);
    }

    if (!data) {
        const raw = localStorage.getItem('bs_admin_data');
        if (!raw) return; // No admin data yet — use original HTML
        try { data = JSON.parse(raw); } catch(e) { return; }
    }

    let page = location.pathname.split('/').pop() || 'index.html';
    if (page && !page.includes('.') && page !== '') page += '.html';
    if (!page || page === '.html') page = 'index.html';

    const trunc = (s, n) => s && s.length > n ? s.slice(0, n) + '...' : s;

    // GLOBAL: logo
    if (data.logoImage) {
        const logoEls = document.querySelectorAll('.logo');
        logoEls.forEach(el => {
            const existingImg = el.querySelector('img.cms-logo');
            if (!existingImg) {
                const img = document.createElement('img');
                img.src = data.logoImage;
                img.alt = data.site?.name || 'Logo';
                img.className = 'cms-logo';
                img.style.cssText = `height:45px;width:auto;max-width:${data.logoWidth || 186}px;object-fit:contain;`;
                el.innerHTML = '';
                el.appendChild(img);
            } else {
                existingImg.src = data.logoImage;
                existingImg.style.maxWidth = (data.logoWidth || 186) + 'px';
            }
        });
    }

    // INDEX PAGE: Hero Slides
    if (page === 'index.html' || page === '') {
        if (data.heroSlides && data.heroSlides.length > 0) {
            const track = document.getElementById('heroSlidesTrack');
            const dotsContainer = document.getElementById('heroSliderDots');
            if (track && dotsContainer) {
                track.innerHTML = data.heroSlides.map((slide, i) => `
                    <div class="hero-slide${i === 0 ? ' active' : ''}" data-slide="${i}">
                        <div class="container hero-content">
                            <div class="hero-text">
                                <div class="tag">${slide.tag || ''}</div>
                                <h1>${slide.heading || ''} <span>${slide.highlight || ''}</span></h1>
                                <p>${slide.desc || ''}</p>
                                <div class="hero-btns">
                                    <a href="${slide.ctaLink || '#'}" class="header-btn btn-gold"><i class="fa-solid ${slide.ctaIcon || 'fa-calendar-check'}"></i> ${slide.ctaText || 'Learn More'}</a>
                                </div>
                            </div>
                            <div class="hero-image">
                                <img src="${slide.image || 'assets/images/astrologer.png'}" alt="${slide.heading || 'Bhartiya Sidhant'}" ${slide.imgScale && slide.imgScale !== 1 ? 'style="transform:scale(' + slide.imgScale + ')"' : ''}>
                            </div>
                        </div>
                    </div>
                `).join('');

                dotsContainer.innerHTML = data.heroSlides.map((_, i) => `
                    <button class="hero-dot${i === 0 ? ' active' : ''}" data-dot="${i}" aria-label="Slide ${i + 1}"></button>
                `).join('');

                if (window._heroSliderRebuild) window._heroSliderRebuild();
            }
        }
    }

    // ... rest of CMS sync (omitted for brevity in this patch but preserved from deployed file)
})();


// ─────────────────────────────────────────────────────────────────---------
// Scroll To Top
// ─────────────────────────────────────────────────────────────────---------
(function ScrollToTop() {
    if (document.getElementById('scrollToTopBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.style.cssText = 'position:fixed;bottom:90px;right:28px;width:42px;height:42px;border-radius:50%;border:none;cursor:pointer;z-index:998;background:linear-gradient(135deg,#C8873E,#E8A84C);color:#fff;font-size:16px;display:none;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(200,135,62,0.4);transition:all .3s ease;';
    document.body.appendChild(btn);
    btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateY(-3px) scale(1.08)'; btn.style.boxShadow = '0 8px 30px rgba(200,135,62,0.6)'; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translateY(0) scale(1)'; btn.style.boxShadow = '0 4px 20px rgba(200,135,62,0.4)'; });
    btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    window.addEventListener('scroll', () => { btn.style.display = (window.scrollY > 400) ? 'flex' : 'none'; });
})();


// ─────────────────────────────────────────────────────────────────---------
// Main runtime: Hero slider initializer (exposed rebuild + autoplay)
// ─────────────────────────────────────────────────────────────────---------
function _initHeroSliderWrapper() {
    (function initHeroSlider() {
        const track = document.getElementById('heroSlidesTrack');
        const dotsContainer = document.getElementById('heroSliderDots');
        const prevBtn = document.getElementById('heroSliderPrev');
        const nextBtn = document.getElementById('heroSliderNext');
        const heroSection = document.querySelector('.hero');
        if (!track || !dotsContainer) return;

        let currentSlide = 0;
        let autoPlayTimer = null;
        const AUTO_PLAY_INTERVAL = 5000;
        let slides = track.querySelectorAll('.hero-slide');
        let dots = dotsContainer.querySelectorAll('.hero-dot');

        function goToSlide(index) {
            if (slides.length === 0) return;
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentSlide = index;
        }
        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }
        function startAutoPlay() { stopAutoPlay(); if (slides.length <= 1) return; autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_INTERVAL); }
        function stopAutoPlay() { if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; } }

        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });

        dotsContainer.addEventListener('click', (e) => {
            const dot = e.target.closest('.hero-dot');
            if (!dot) return;
            goToSlide(parseInt(dot.dataset.dot));
            startAutoPlay();
        });

        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopAutoPlay);
            heroSection.addEventListener('mouseleave', startAutoPlay);
        }

        let touchStartX = 0, touchEndX = 0;
        if (track) {
            track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
            track.addEventListener('touchend', (e) => { touchEndX = e.changedTouches[0].screenX; const diff = touchStartX - touchEndX; if (Math.abs(diff) > 50) { if (diff > 0) nextSlide(); else prevSlide(); startAutoPlay(); } }, { passive: true });
        }

        window._heroSliderRebuild = function() {
            slides = track.querySelectorAll('.hero-slide');
            dots = dotsContainer.querySelectorAll('.hero-dot');
            currentSlide = 0;
            goToSlide(0);
            startAutoPlay();
        };

        startAutoPlay();
    })();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _initHeroSliderWrapper);
} else {
    _initHeroSliderWrapper();
}

// Keep open pages in sync with the latest admin CMS data.
// When admin saves content, other tabs on the same origin receive a storage event
// and reload so they render the updated version instead of stale markup.
window.addEventListener('storage', (event) => {
    if (event.key !== 'bs_admin_data') return;
    if (document.visibilityState === 'hidden') {
        location.reload();
        return;
    }
    location.reload();
});

function initCounters() {
    const countersSection = document.querySelector('.counters');
    if (!countersSection || countersSection.dataset.counterInit === 'true') return;
    countersSection.dataset.counterInit = 'true';

    const animateCounters = () => {
        countersSection.querySelectorAll('.counter-num[data-target]').forEach(counter => {
            const target = Number(counter.dataset.target) || 0;
            if (counter.dataset.animated === 'true') return;
            counter.dataset.animated = 'true';

            let current = 0;
            const duration = 1800;
            const step = Math.max(1, target / (duration / 16));
            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                    requestAnimationFrame(update);
                    return;
                }
                counter.textContent = target.toLocaleString() + '+';
            };
            update();
        });
    };

    if (!('IntersectionObserver' in window)) {
        animateCounters();
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        if (!entries[0].isIntersecting) return;
        animateCounters();
        obs.disconnect();
    }, { threshold: 0.25 });
    observer.observe(countersSection);
}

function bindFaqAccordions(root = document) {
    const faqLists = root.matches && root.matches('.faq-list')
        ? [root]
        : Array.from(root.querySelectorAll('.faq-list'));

    faqLists.forEach(faqList => {
        if (faqList.dataset.faqBound === 'true') return;
        faqList.dataset.faqBound = 'true';

        faqList.addEventListener('click', event => {
            const question = event.target.closest('.faq-question');
            if (!question || !faqList.contains(question)) return;

            const item = question.closest('.faq-item');
            if (!item) return;
            const isOpen = item.classList.contains('open');
            faqList.querySelectorAll('.faq-item').forEach(faqItem => faqItem.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
}

(function CMS_PageSync() {
    const raw = localStorage.getItem('bs_admin_data');
    let data = {};
    if (raw) {
        try { data = JSON.parse(raw) || {}; } catch(e) { data = {}; }
    }

    let page = location.pathname.split('/').pop() || 'index.html';
    if (page && !page.includes('.') && page !== '') page += '.html';
    if (!page || page === '.html') page = 'index.html';

    const trunc = (s, n) => s && s.length > n ? s.slice(0, n) + '...' : s;

    if (page === 'index.html' || page === '') {
            // About Section
            if (data.about) {
                const a = data.about;
                const aboutLabel = document.querySelector('.about-text .label');
                if (aboutLabel && a.label) aboutLabel.textContent = a.label;

                const aboutH2 = document.querySelector('.about-text h2');
                if (aboutH2 && (a.heading || a.highlight)) {
                    aboutH2.innerHTML = (a.heading || '') + ' <span>' + (a.highlight || '') + '</span>';
                }

                const aboutPs = document.querySelectorAll('.about-text > p');
                if (aboutPs[0] && a.p1) aboutPs[0].innerHTML = a.p1;
                if (aboutPs[1] && a.p2) aboutPs[1].textContent = a.p2;

                const stats = document.querySelectorAll('.about-stats .stat-item');
                if (stats[0]) {
                    if (a.stat1Num) stats[0].querySelector('.stat-num').textContent = a.stat1Num;
                    if (a.stat1Label) stats[0].querySelector('.stat-label').textContent = a.stat1Label;
                }
                if (stats[1]) {
                    if (a.stat2Num) stats[1].querySelector('.stat-num').textContent = a.stat2Num;
                    if (a.stat2Label) stats[1].querySelector('.stat-label').textContent = a.stat2Label;
                }
                if (stats[2]) {
                    if (a.stat3Num) stats[2].querySelector('.stat-num').textContent = a.stat3Num;
                    if (a.stat3Label) stats[2].querySelector('.stat-label').textContent = a.stat3Label;
                }
            }

            // About Image
            if (data.aboutImage) {
                const aboutImg = document.querySelector('.about-img img');
                if (aboutImg) {
                    aboutImg.src = data.aboutImage;
                    if (data.aboutImageScale && data.aboutImageScale !== 1) {
                        aboutImg.style.transform = 'scale(' + data.aboutImageScale + ')';
                    }
                }
            }

            // Counters Section Sync
            if (data.counters && data.counters.length) {
                const counterGrid = document.querySelector('.counter-grid');
                if (counterGrid) {
                    const countersSection = counterGrid.closest('.counters');
                    if (countersSection) delete countersSection.dataset.counterInit;
                    counterGrid.innerHTML = data.counters.map(c => `
                        <div class="counter-item"><i class="fa-solid ${c.icon}"></i>
                            <div class="counter-num" data-target="${c.target}">0</div>
                            <div class="counter-label">${c.label}</div>
                        </div>
                    `).join('');
                }
            }

            // Testimonials
            if (data.testimonials && data.testimonials.length) {
                const tGrid = document.querySelector('#homeTestimonialsSection .grid-3');
                if (tGrid) {
                    tGrid.innerHTML = data.testimonials.map(t => {
                        const rating = t.rating || 5;
                        const stars = '<i class="fa-solid fa-star"></i>'.repeat(rating) + '<i class="fa-regular fa-star" style="opacity:.3;"></i>'.repeat(5 - rating);
                        return `
                        <div class="testimonial-card">
                            <div class="stars">${stars}</div>
                            <p>"${t.text}"</p>
                            <div class="testimonial-author">
                                <div>
                                    <h4>${t.name}</h4><span>${t.location}</span>
                                </div>
                            </div>
                        </div>
                    `;}).join('');
                }
            }

            // ─── VIDEO GALLERY HEADER SYNC ───
            if (data.videoGalleryHeader) {
                const vgh = data.videoGalleryHeader;
                const vgSection = document.getElementById('homeVideoGallery');
                if (vgSection) {
                    const vgLabel = vgSection.querySelector('.section-header .label');
                    if (vgLabel && vgh.label) vgLabel.textContent = vgh.label;
                    const vgH2 = vgSection.querySelector('.section-header h2');
                    if (vgH2 && (vgh.heading || vgh.highlight)) vgH2.innerHTML = (vgh.heading || '') + ' <span>' + (vgh.highlight || '') + '</span>';
                    const vgP = vgSection.querySelector('.section-header p');
                    if (vgP && vgh.subtitle) vgP.textContent = vgh.subtitle;
                }
            }

            // ─── VIDEO GALLERY SYNC ───
            if (data.videoGallery && data.videoGallery.length) {
                const vgGrid = document.querySelector('.video-gallery-grid');
                if (vgGrid) {
                    vgGrid.innerHTML = data.videoGallery.map(v => {
                        const embedUrl = v.youtubeUrl || '';
                        return `
                            <div class="video-card">
                                <div class="video-wrapper">
                                    <iframe src="${embedUrl}" title="${v.title || ''}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                                </div>
                                <div class="video-info">
                                    <h4>${v.title || ''}</h4>
                                    <p>${v.desc || ''}</p>
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            }

            // ─── AWARDS SYNC ───
            if (data.awards && data.awards.length) {
                const awardsGrid = document.querySelector('.awards-grid');
                if (awardsGrid) {
                    awardsGrid.innerHTML = data.awards.map(a => {
                        const hasImage = a.image && a.image.length > 10;
                        return `
                            <div class="award-card">
                                ${hasImage ? `<div class="award-img-wrap"><img src="${a.image}" alt="${a.title}" style="object-fit:${a.imgFit||'cover'};transform:scale(${a.imgScale||1})"></div>` : `<div class="award-icon"><i class="fa-solid ${a.icon || 'fa-trophy'}"></i></div>`}
                                <h3>${a.title || ''}</h3>
                                <p>${a.desc || ''}</p>
                                ${a.year ? `<span class="award-year">${a.year}</span>` : ''}
                            </div>
                        `;
                    }).join('');
                }
            }

            // ─── MARQUEE SYNC ───
            if (data.marqueeItems && data.marqueeItems.length) {
                const marqueeContent = document.querySelector('.marquee-content');
                if (marqueeContent) {
                    const items = data.marqueeItems;
                    const spans = items.map(t => `<span><i class="fa-solid fa-star"></i> ${t}</span>`).join('');
                    marqueeContent.innerHTML = spans + spans;
                }
            }

            // ─── HOMEPAGE COURSES PREVIEW SYNC ───
            if (data.courses && data.courses.length) {
                const courseGrid = document.querySelector('#homeCoursesSection .grid-3');
                if (courseGrid) {
                    courseGrid.innerHTML = data.courses.map((c, i) => {
                        const badge = i === 0 ? 'Beginner' : i === 1 ? 'Most Popular' : 'Specialized';
                        const badgeStyle = i === 1 ? ' style="background:var(--maroon-gradient);"' : '';
                        return `
                        <div class="home-course-card">
                            <div class="course-badge"${badgeStyle}>${badge}</div>
                            <img src="${c.image}" alt="${c.title}" class="card-img" style="object-fit:${c.imgFit||'cover'};transform:scale(${c.imgScale||1})">
                            <div class="card-body">
                                <h3>${c.title}</h3>
                                <div class="course-meta">
                                    <span><i class="fa-regular fa-clock"></i> Live Online</span>
                                    <span><i class="fa-solid fa-video"></i> Hindi + English</span>
                                </div>
                                <p>${trunc(c.desc, 100)}</p>
                                <div class="course-price-row">
                                    <span class="course-price">₹${c.newPrice}</span>
                                    <a href="courses.html" class="header-btn btn-gold" style="padding:8px 20px;font-size:12px;">View Details</a>
                                </div>
                            </div>
                        </div>`;
                    }).join('');
                }
            }

            // ─── HOMEPAGE BLOG PREVIEW SYNC ───
            if (data.blog && data.blog.length) {
                const blogGrid = document.querySelector('#homeBlogSection .grid-3');
                if (blogGrid) {
                    blogGrid.innerHTML = data.blog.slice(0, 3).map((b, i) => `
                        <article class="card">
                            <img src="${b.image}" alt="${b.title}" class="card-img" style="height:220px;object-fit:${b.imgFit||'cover'};transform:scale(${b.imgScale||1})">
                            <div class="card-body">
                                <div style="font-size:12px;color:var(--primary);font-weight:700;text-transform:uppercase;margin-bottom:8px;">${b.category || 'Article'}</div>
                                <h3 style="font-size:20px;">${b.title}</h3>
                                <p>${trunc(b.desc, 100)}</p>
                                <a href="blog-detail.html#id=${i}" style="color:var(--primary);font-weight:600;font-size:14px;">Read Article →</a>
                            </div>
                        </article>
                    `).join('');
                }
            }

            // ─── HOMEPAGE FAQ SYNC ───
            if (data.faq && data.faq.length) {
                const faqList = document.querySelector('#homeFaqSection .faq-list');
                if (faqList) {
                    faqList.innerHTML = data.faq.map((f, i) => `
                        <div class="faq-item" data-index="${i}">
                            <div class="faq-question">
                                <span>${f.question}</span>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            <div class="faq-answer">
                                <p>${f.answer}</p>
                            </div>
                        </div>
                    `).join('');
                    bindFaqAccordions(faqList);
                }
            }

            // ─── HOMEPAGE GEMSTONES SYNC ───
            if (data.store && data.store.length) {
                const gemGrid = document.querySelector('#homeGemstonesSection .gemstone-grid');
                if (gemGrid) {
                    gemGrid.innerHTML = data.store.map((s, si) => `
                        <div class="gemstone-card" style="cursor:pointer;" onclick="window.location.href='product-detail.html#id=${si}'">
                            <div class="gem-img-wrap">
                                <img src="${s.image || 'https://images.unsplash.com/photo-1599643478524-fb5244098795?auto=format&fit=crop&w=400&q=80'}" alt="${s.title}" style="object-fit:${s.imgFit||'cover'};transform:scale(${s.imgScale||1})" onerror="this.src='https://images.unsplash.com/photo-1599643478524-fb5244098795?auto=format&fit=crop&w=400&q=80'">
                            </div>
                            <div class="gem-body">
                                <h3>${s.title}</h3>
                                <p class="gem-subtitle">${s.desc}</p>
                                <div class="gem-price-row">
                                    <span class="gem-price">₹${s.newPrice}</span>
                                    <a href="product-detail.html#id=${si}" class="header-btn btn-maroon" style="padding:7px 16px;font-size:11px;">View Details</a>
                                </div>
                            </div>
                        </div>
                    `).join('');
                }
            }
        }

        // ─── GLOBAL: SITE SETTINGS SYNC (all pages) ───
        if (data.site) {
            const s = data.site;
            // Top bar contact info
            const topBar = document.querySelector('.top-bar .container > div:first-child');
            if (topBar && (s.email || s.phone)) {
                topBar.innerHTML = `<i class="fa-solid fa-envelope"></i> ${s.email || ''} &nbsp;&nbsp;|&nbsp;&nbsp; <i class="fa-solid fa-phone"></i> ${s.phone || ''}`;
            }
            // Top bar social links
            const topSocial = document.querySelector('.top-bar .container > div:last-child');
            if (topSocial) {
                topSocial.innerHTML = `
                    <a href="${s.facebook||'#'}"><i class="fa-brands fa-facebook-f"></i></a> &nbsp;
                    <a href="${s.instagram||'#'}"><i class="fa-brands fa-instagram"></i></a> &nbsp;
                    <a href="${s.youtube||'#'}"><i class="fa-brands fa-youtube"></i></a> &nbsp;
                    <a href="${s.twitter||'#'}"><i class="fa-brands fa-twitter"></i></a>`;
            }
            // Footer contact info
            const footerContact = document.querySelector('footer .footer-grid > div:last-child .footer-links');
            if (footerContact) {
                footerContact.innerHTML = `
                    <li><i class="fa-solid fa-envelope" style="color:var(--primary-light);margin-right:8px;"></i> ${s.email || ''}</li>
                    <li><i class="fa-solid fa-phone" style="color:var(--primary-light);margin-right:8px;"></i> ${s.phone || ''}</li>
                    <li><i class="fa-solid fa-location-dot" style="color:var(--primary-light);margin-right:8px;"></i> ${s.address || ''}</li>`;
            }
            // Footer social links
            const footerSocial = document.querySelector('.footer-social');
            if (footerSocial) {
                footerSocial.innerHTML = `
                    <a href="${s.facebook||'#'}"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="${s.instagram||'#'}"><i class="fa-brands fa-instagram"></i></a>
                    <a href="${s.youtube||'#'}"><i class="fa-brands fa-youtube"></i></a>
                    <a href="${s.twitter||'#'}"><i class="fa-brands fa-twitter"></i></a>
                    <a href="${s.telegram||'#'}"><i class="fa-brands fa-telegram"></i></a>`;
            }
            // WhatsApp float
            const waLink = document.querySelector('.whatsapp-float');
            if (waLink && s.whatsapp) waLink.href = 'https://wa.me/' + s.whatsapp;
        }

        // ─── REPORTS PAGE ───
        if (page === 'reports.html' && data.reports) {
            const grid = document.querySelector('.reports-grid');
            if (grid) {
                grid.innerHTML = data.reports.map((r, ri) => `
                    <div class="report-card report-card-${r.style || 'standard'}" style="cursor:pointer;position:relative;" onclick="window.location.href='report-detail.html#id=${ri}'">
                        ${r.badge ? `<div class="store-card-badge" style="position:absolute;top:14px;left:14px;background:var(--gold-gradient);color:#fff;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;z-index:2;">${r.badge}</div>` : ''}
                        <div class="report-card-img"><img src="${r.image}" alt="${r.title}" style="object-fit:${r.imgFit||'contain'};object-position:${r.imgPosX||50}% ${r.imgPosY||50}%;transform:scale(${r.imgScale||1})"></div>
                        <div class="report-card-body">
                            <h3>${r.title}</h3>
                            <p class="report-tagline">${r.desc}</p>
                            ${r.oldPrice || r.newPrice ? `<div class="report-pricing">${r.oldPrice ? `<del>₹${r.oldPrice}/-</del> ` : ''}<span class="price">₹${r.newPrice}/-</span></div>` : ''}
                            <a href="report-detail.html?id=${ri}" class="header-btn btn-outline report-detail-link" style="margin-top:10px; display:inline-flex;"><i class="fa-solid fa-eye"></i> View Details</a>
                        </div>
                        <button class="report-buy-btn" onclick="window.location.href='report-detail.html?id=${ri}'"><i class="fa-solid fa-lock"></i> Pay & Buy Now →</button>
                    </div>
                `).join('');
            }
        }

        // ─── STORE PAGE ───
        if (page === 'store.html' && data.store) {
            const grid = document.querySelector('.grid-4');
            if (grid) {
                grid.innerHTML = data.store.map((s, si) => `
                    <div class="card card-${s.style || 'standard'}" style="cursor:pointer;position:relative;" onclick="window.location.href='product-detail.html#id=${si}'">
                        ${s.badge ? `<div class="store-card-badge" style="position:absolute;top:14px;left:14px;background:var(--gold-gradient);color:#fff;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;z-index:2;">${s.badge}</div>` : ''}
                        <img src="${s.image || 'https://images.unsplash.com/photo-1599643478524-fb5244098795?auto=format&fit=crop&w=400&q=80'}" alt="${s.title}" class="card-img" style="height:200px;object-fit:${s.imgFit||'cover'};object-position:${s.imgPosX||50}% ${s.imgPosY||50}%;transform:scale(${s.imgScale||1})" onerror="this.src='https://images.unsplash.com/photo-1599643478524-fb5244098795?auto=format&fit=crop&w=400&q=80'">
                        <div class="card-body">
                            <h3 style="font-size:18px;">${s.title}</h3>
                            <p>${s.desc}</p>
                            <div class="card-footer">
                                <span class="card-price">₹${s.newPrice}</span>
                                <a href="product-detail.html#id=${si}" class="header-btn btn-maroon" style="padding:8px 18px;font-size:12px;">View Details</a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // ─── BLOG PAGE ───
        if (page === 'blog.html' && data.blog && data.blog.length) {
            const blogs = data.blog;
            const readTime = (b) => Math.max(3, Math.ceil((b.content || b.desc || '').length / 1000));

            // Featured article (first blog)
            const featured = blogs[0];
            const featuredEl = document.getElementById('blogFeatured');
            if (featuredEl) {
                featuredEl.innerHTML = `
                    <div class="blog-featured-img"><a href="blog-detail.html#id=0"><img src="${featured.image}" alt="${featured.title}"></a></div>
                    <div class="blog-featured-text">
                        <div class="blog-cat">${featured.category || 'Article'}</div>
                        <h2>${featured.title}</h2>
                        <p>${featured.desc}</p>
                        <div class="blog-meta" style="margin-bottom:20px;">
                            <span><i class="fa-regular fa-clock"></i> ${readTime(featured)} min read</span>
                            <span><i class="fa-solid fa-user-pen"></i> Acharya Ji</span>
                        </div>
                        <a href="blog-detail.html#id=0" class="blog-read-btn"><i class="fa-solid fa-book-open"></i> Read Full Article</a>
                    </div>
                `;
            }

            // Category filters
            const cats = [...new Set(blogs.map(b => b.category || 'Article').filter(c => c))];
            const filtersEl = document.getElementById('blogFilters');
            if (filtersEl && cats.length) {
                filtersEl.innerHTML = '<button class="blog-filter-btn active" data-filter="all">All Articles</button>' +
                    cats.map(c => `<button class="blog-filter-btn" data-filter="${c}">${c}</button>`).join('');

                filtersEl.querySelectorAll('.blog-filter-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        filtersEl.querySelectorAll('.blog-filter-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        const filter = btn.dataset.filter;
                        document.querySelectorAll('.blog-card').forEach(card => {
                            if (filter === 'all' || card.dataset.category === filter) {
                                card.style.display = '';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    });
                });
            }

            // Blog grid
            const grid = document.getElementById('blogGrid');
            if (grid) {
                grid.innerHTML = blogs.map((b, i) => `
                    <div class="blog-card blog-card-${b.style || 'standard'}" data-category="${b.category || 'Article'}">
                        <a href="blog-detail.html#id=${i}" style="position:relative;display:block;">
                            ${b.badge ? `<div class="store-card-badge" style="position:absolute;top:14px;left:14px;background:var(--maroon-gradient);color:#fff;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;z-index:2;">${b.badge}</div>` : ''}
                            <div class="blog-card-img">
                                <img src="${b.image}" alt="${b.title}" style="object-fit:${b.imgFit||'cover'};transform:scale(${b.imgScale||1})">
                                <div class="blog-card-cat">${b.category || 'Article'}</div>
                            </div>
                        </a>
                        <div class="blog-card-body">
                            <h3><a href="blog-detail.html#id=${i}" style="color:inherit;">${b.title}</a></h3>
                            <p>${trunc(b.desc, 120)}</p>
                            <div class="blog-card-footer">
                                <div class="blog-card-meta">
                                    <span><i class="fa-regular fa-clock"></i> ${readTime(b)} min</span>
                                    <span><i class="fa-solid fa-user-pen"></i> Acharya Ji</span>
                                </div>
                                <a href="blog-detail.html#id=${i}">Read <i class="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // ─── BLOG DETAIL PAGE ───
        if (page === 'blog-detail.html' && data.blog && data.blog.length) {
            // Read id from hash first, then query param
            const bh = location.hash.replace('#','');
            const bhp = new URLSearchParams(bh);
            let id = bhp.get('id') !== null ? parseInt(bhp.get('id')) : parseInt(new URLSearchParams(location.search).get('id'));
            if (isNaN(id)) id = 0;
            if (data.blog[id]) {
                const blog = data.blog[id];
                const readTime = Math.max(3, Math.ceil((blog.content || blog.desc || '').length / 1000));

                document.title = blog.title + ' - Bhartiya Sidhant Blog';
                const titleEl = document.getElementById('blogDetailTitle');
                if (titleEl) titleEl.textContent = blog.title;
                const descEl = document.getElementById('blogDetailDesc');
                if (descEl) descEl.textContent = blog.desc;
                const catEl = document.getElementById('blogDetailCat');
                if (catEl) catEl.textContent = blog.category || 'Article';
                const breadEl = document.getElementById('blogBreadcrumb');
                if (breadEl) breadEl.textContent = trunc(blog.title, 40);
                const dateEl = document.getElementById('blogDetailDate');
                if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' });
                const timeEl = document.getElementById('blogDetailReadTime');
                if (timeEl) timeEl.textContent = readTime;
                const imgEl = document.getElementById('blogDetailImg');
                if (imgEl) { imgEl.src = blog.image; imgEl.alt = blog.title; }

                // Article content
                const articleEl = document.getElementById('blogDetailArticle');
                if (articleEl) {
                    const content = blog.content || blog.desc || '';
                    const paragraphs = content.split('\n\n').filter(p => p.trim());
                    articleEl.innerHTML = paragraphs.map(p => {
                        p = p.trim();
                        if (p.match(/^\d+\./)) return '<h3>' + p + '</h3>';
                        if (p.startsWith('•') || p.startsWith('—')) return '<p style="padding-left:20px;">' + p.replace(/\n/g, '<br>') + '</p>';
                        return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
                    }).join('');
                }

                // Share links
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(blog.title);
                const waShare = document.getElementById('shareWa');
                if (waShare) waShare.href = 'https://api.whatsapp.com/send?text=' + title + '%20' + url;
                const fbShare = document.getElementById('shareFb');
                if (fbShare) fbShare.href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
                const twShare = document.getElementById('shareTw');
                if (twShare) twShare.href = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url;
                const copyShare = document.getElementById('shareCopy');
                if (copyShare) {
                    copyShare.addEventListener('click', (e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            copyShare.innerHTML = '<i class="fa-solid fa-check"></i>';
                            setTimeout(() => { copyShare.innerHTML = '<i class="fa-solid fa-link"></i>'; }, 2000);
                        });
                    });
                }

                // Related articles
                const relatedEl = document.getElementById('sidebarRelated');
                if (relatedEl) {
                    const related = data.blog.filter((_, i) => i !== id).slice(0, 4);
                    relatedEl.innerHTML = related.map(r => {
                        const ri = data.blog.indexOf(r);
                        return `
                        <div class="sidebar-related" onclick="window.location.href='blog-detail.html#id=${ri}'">
                            <img src="${r.image}" alt="${r.title}">
                            <div class="sidebar-related-text">
                                <h5>${trunc(r.title, 50)}</h5>
                                <span><i class="fa-regular fa-clock" style="margin-right:4px;"></i>${Math.max(3, Math.ceil((r.content || r.desc || '').length / 1000))} min read</span>
                            </div>
                        </div>`;
                    }).join('');
                }

                // Prev / Next
                const navEl = document.getElementById('blogNav');
                if (navEl) {
                    let html = '';
                    if (id > 0) html += `<a href="blog-detail.html#id=${id-1}"><i class="fa-solid fa-arrow-left"></i> ${trunc(data.blog[id-1].title, 30)}</a>`;
                    else html += '<span></span>';
                    if (id < data.blog.length - 1) html += `<a href="blog-detail.html#id=${id+1}">${trunc(data.blog[id+1].title, 30)} <i class="fa-solid fa-arrow-right"></i></a>`;
                    navEl.innerHTML = html;
                }
            }
        }

        // ─── SERVICES PAGE ───
        if (page === 'services.html' && data.services && data.services.length) {
            const services = data.services;
            const astrology = services.filter(s => s.category === 'astrology');
            const vastu = services.filter(s => s.category === 'vastu');
            const remedies = services.filter(s => s.category === 'remedies');

            const renderGrid = (items) => items.map(s => {
                const si = data.services.indexOf(s);
                return `
                    <div class="card card-${s.style || 'standard'}" style="cursor:pointer;position:relative;" onclick="window.location.href='service-detail.html?id=${si}'">
                    ${s.badge ? `<div class="store-card-badge" style="position:absolute;top:14px;left:14px;background:var(--gold-gradient);color:#fff;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;z-index:2;">${s.badge}</div>` : ''}
                    <img src="${s.image}" alt="${s.title}" class="card-img" style="object-fit:${s.imgFit||'cover'};object-position:${s.imgPosX||50}% ${s.imgPosY||50}%;transform:scale(${s.imgScale||1})">
                    <div class="card-body">
                        <h3>${s.title}</h3>
                        <p>${trunc(s.desc, 100)}</p>
                        <div style="display:flex;gap:8px;margin-top:10px;">
                            <a href="service-detail.html?id=${si}" class="header-btn btn-outline service-detail-link" style="display:inline-flex;"><i class="fa-solid fa-eye"></i> View Details</a>
                            <button onclick="event.stopPropagation();window.location.href='service-detail.html?id=${si}'" class="header-btn btn-gold" style="border:none;cursor:pointer;"><i class="fa-solid fa-lock"></i> Pay & Book</button>
                        </div>
                    </div>
                </div>
            `;}).join('');

            // Find the three grid-3 sections
            const grids = document.querySelectorAll('.grid-3');
            if (grids[0] && astrology.length) grids[0].innerHTML = renderGrid(astrology);
            if (grids[1] && vastu.length) grids[1].innerHTML = renderGrid(vastu);
            if (grids[2] && remedies.length) grids[2].innerHTML = renderGrid(remedies);
        }

        // ─── POOJA PAGE ───
        if (page === 'pooja.html' && data.pooja) {
            const grids = document.querySelectorAll('.cp-pricing-grid');
            if (grids.length) {
                // Combine all grids into the first one
                const mainGrid = grids[0];
                // Remove extra grids
                for (let i = 1; i < grids.length; i++) grids[i].remove();
                mainGrid.innerHTML = data.pooja.map((p, i) => `
                    <div class="cp-pricing-card ${p.style === 'popular' || p.style === 'premium' ? p.style : ''}" data-type="online offline">
                        ${p.badge ? `<div class="cp-popular-badge">${p.badge}</div>` : ''}
                        <div class="cp-card-img-wrap"><img src="${p.image || 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=600&q=80'}" alt="${p.title}"${p.imgFit ? ` style="object-fit:${p.imgFit}"` : ''}></div>
                        <div class="cp-pricing-header">
                            <div class="cp-course-level"><i class="fa-solid ${p.icon || 'fa-om'}"></i> ${p.title}</div>
                            <h3>${p.title}</h3>
                            <p class="cp-pricing-subtitle">${p.desc ? p.desc.split('.')[0] : ''}</p>
                        </div>
                        <div class="cp-pricing-body">
                            <div class="cp-pricing-amount"><span class="cp-price">₹${p.newPrice}</span><span class="cp-price-period">/ pooja</span></div>
                            <div class="cp-pricing-meta">
                                <span><i class="fa-regular fa-clock"></i> ${p.desc && p.desc.match(/\d+-?\d*\s*(?:Hours?|Days?)/i) ? p.desc.match(/\d+-?\d*\s*(?:Hours?|Days?)/i)[0] : 'Scheduled'}</span>
                                <span><i class="fa-solid fa-video"></i> Live Streaming</span>
                            </div>
                            <ul class="cp-pricing-features">
                                ${p.desc ? p.desc.split('.').filter(s => s.trim()).slice(0, 4).map(f => '<li><i class="fa-solid fa-check"></i> ' + f.trim() + '</li>').join('') : ''}
                            </ul>
                            <a href="pooja-detail.html#id=${i}" class="header-btn ${i === 1 ? 'btn-gold' : 'btn-outline'} cp-pricing-btn">View Details <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                `).join('');
            }
        }

        // ─── COURSES PAGE ───
        if (page === 'courses.html' && data.courses) {
            const grid = document.querySelector('.cp-pricing-grid');
            if (grid) {
                grid.innerHTML = data.courses.map((c, i) => `
                    <div class="cp-pricing-card ${c.style === 'popular' || c.style === 'premium' ? c.style : ''}">
                        ${c.badge ? `<div class="cp-popular-badge">${c.badge}</div>` : ''}
                        <div class="cp-card-img-wrap"><img src="${c.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'}" alt="${c.title}"${c.imgFit ? ` style="object-fit:${c.imgFit}"` : ''}></div>
                        <div class="cp-pricing-header">
                            <div class="cp-course-level"><i class="fa-solid ${c.icon || 'fa-book-open'}"></i> ${i === 0 ? 'Beginner' : i === 1 ? 'Advanced' : 'Specialized'}</div>
                            <h3>${c.title}</h3>
                            <p class="cp-pricing-subtitle">${c.desc ? c.desc.split('.')[0] : ''}</p>
                        </div>
                        <div class="cp-pricing-body">
                            <div class="cp-pricing-amount">
                                <span class="cp-price">₹${c.newPrice}</span>
                                <span class="cp-price-period">/ full course</span>
                            </div>
                            <div class="cp-pricing-meta">
                                <span><i class="fa-regular fa-clock"></i> ${c.desc && c.desc.match(/\d+\s*Weeks?/i) ? c.desc.match(/\d+\s*Weeks?/i)[0] : 'Self-paced'}</span>
                                <span><i class="fa-solid fa-video"></i> Live Online</span>
                                <span><i class="fa-solid fa-language"></i> Hindi + English</span>
                            </div>
                            <ul class="cp-pricing-features">
                                ${c.desc ? c.desc.split(',').filter(s => s.trim()).slice(0, 6).map(f => '<li><i class="fa-solid fa-check"></i> ' + f.trim().split('.')[0] + '</li>').join('') : ''}
                            </ul>
                            <a href="course-detail.html#id=${i}" class="header-btn ${i === 1 ? 'btn-gold' : 'btn-outline'} cp-pricing-btn">View Details <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                `).join('');
            }
        }

        // ─── CONSULTATION PAGE ───
        if (page === 'consultation.html' && data.consultation) {
            const grid = document.querySelector('.pricing-grid');
            if (grid) {
                grid.innerHTML = data.consultation.map((c, i) => {
                    const features = c.desc ? c.desc.split(',').filter(s => s.trim()).slice(0, 6) : [];
                    const duration = c.desc && c.desc.match(/\d+\s*Minutes?/i) ? c.desc.match(/\d+\s*Minutes?/i)[0] : '30 Minutes';
                    const callType = c.desc && c.desc.match(/Video Call|Audio.*Video|Zoom|Meet/i) ? c.desc.match(/Video Call|Audio.*Video|Zoom|Meet/i)[0] : 'Audio / Video Call';
                    return `
                    <div class="pricing-card ${c.style === 'popular' || c.style === 'premium' ? c.style : ''}">
                        ${c.badge ? (c.style === 'premium' ? `<div class="premium-badge"><i class="fa-solid fa-crown"></i> ${c.badge}</div>` : `<div class="popular-badge">${c.badge}</div>`) : ''}
                        ${c.image ? `<div class="pricing-card-img"><img src="${c.image}" alt="${c.title}" style="object-fit:${c.imgFit||'cover'};transform:scale(${c.imgScale||1})" onerror="this.parentElement.style.display='none'"></div>` : ''}
                        <div class="pricing-header">
                            <h3>${c.title}</h3>
                            <p class="pricing-subtitle">${c.desc ? c.desc.split('.')[0] : ''}</p>
                        </div>
                        <div class="pricing-body">
                            <div class="pricing-amount">
                                <span class="price normal-price">₹${c.newPrice}</span>
                                ${c.urgentPrice ? `<span class="price urgent-price" style="display:none;">₹${c.urgentPrice}</span>` : ''}
                                <span class="price-period">/ session</span>
                            </div>
                            <div class="pricing-meta">
                                <span><i class="fa-regular fa-clock"></i> ${duration}</span>
                                <span><i class="fa-solid fa-video"></i> ${callType}</span>
                            </div>
                            <ul class="pricing-features">
                                ${features.map(f => '<li><i class="fa-solid fa-check"></i> ' + f.trim().split('.')[0] + '</li>').join('')}
                            </ul>
                            <button onclick="if(window.bookConsult)bookConsult('${c.title}', '${duration}', this);else window.location.href='https://wa.me/${(data.site && data.site.whatsapp) || '919876543210'}?text=I%20want%20to%20book%20${encodeURIComponent(c.title)}%20consultation'" class="header-btn ${i === 1 ? 'btn-gold' : i === 2 ? 'btn-maroon' : 'btn-outline'} pricing-btn" style="border:none;cursor:pointer;width:100%;margin-top:15px;"><i class="fa-solid fa-lock"></i> Pay & Book <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                `;}).join('');

                // Re-bind urgency toggle after CMS render
                document.querySelectorAll('.toggle-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        const mode = btn.dataset.mode;
                        document.querySelectorAll('.normal-price').forEach(p => p.style.display = mode === 'normal' ? '' : 'none');
                        document.querySelectorAll('.urgent-price').forEach(p => p.style.display = mode === 'urgent' ? '' : 'none');
                    });
                });
            }
        }

        // ─── CONSULT ACHARYA PAGE ───
        if (page === 'consult-acharya.html') {
            // Sync pricing cards from consultAcharya data
            if (data.consultAcharya) {
                const grid = document.querySelector('.pricing-cards');
                if (grid) {
                    grid.innerHTML = data.consultAcharya.map((c, i) => `
                        <div class="pricing-card ${c.style === 'popular' || c.style === 'premium' ? c.style : ''}">
                            ${c.badge ? (c.style === 'premium' ? `<div class="premium-badge"><i class="fa-solid fa-crown"></i> ${c.badge}</div>` : `<div class="popular-badge">${c.badge}</div>`) : ''}
                            <h3>${c.title}</h3>
                            <div class="duration">${c.desc.split('.')[0]}</div>
                            <div class="price">${c.oldPrice ? `<del>₹${c.oldPrice}/-</del>` : ''}₹${c.newPrice}/-</div>
                            <ul>
                                ${c.desc.split(',').map(f => `<li><i class="fa-solid fa-check"></i> ${f.trim()}</li>`).join('')}
                            </ul>
                            <button class="book-btn" onclick="if(window.openBooking)openBooking('${c.title}','${c.desc.split('.')[0]}',${parseInt(String(c.newPrice||'0').replace(/[^0-9]/g,''))*100},'₹${c.newPrice||'0'}');else window.location.href='${c.link || '#'}'"><i class="fa-solid fa-lock"></i> Pay & Book Now</button>
                        </div>
                    `).join('');
                }
            }

            // Sync full page content from consultAcharyaPage data
            if (data.consultAcharyaPage) {
                const pg = data.consultAcharyaPage;

                // Banner
                const bannerTitle = document.getElementById('acharyaBannerTitle');
                if (bannerTitle && pg.bannerTitle) bannerTitle.textContent = pg.bannerTitle;
                const bannerSub = document.getElementById('acharyaBannerSubtitle');
                if (bannerSub && pg.bannerSubtitle) bannerSub.textContent = pg.bannerSubtitle;

                // Profile Image
                const profileImg = document.getElementById('acharyaProfileImg');
                if (profileImg && pg.profileImage) profileImg.src = pg.profileImage;

                // Name
                const nameEl = document.getElementById('acharyaName');
                if (nameEl && pg.name) nameEl.textContent = pg.name;

                // Title Tag
                const titleTag = document.getElementById('acharyaTitleTag');
                if (titleTag && pg.titleTag) titleTag.innerHTML = '<i class="fa-solid fa-crown"></i> ' + pg.titleTag;

                // Label
                const labelEl = document.getElementById('acharyaLabel');
                if (labelEl && pg.label) labelEl.textContent = pg.label;

                // Heading
                const headingEl = document.getElementById('acharyaHeading');
                if (headingEl && (pg.heading || pg.headingHighlight)) {
                    headingEl.innerHTML = (pg.heading || '') + ' <span style="color:var(--primary)">' + (pg.headingHighlight || '') + '</span>';
                }

                // Descriptions
                const desc1 = document.getElementById('acharyaDesc1');
                if (desc1 && pg.desc1) desc1.innerHTML = pg.desc1;
                const desc2 = document.getElementById('acharyaDesc2');
                if (desc2 && pg.desc2) desc2.textContent = pg.desc2;

                // Stats
                if (pg.stats && pg.stats.length) {
                    const statsGrid = document.getElementById('acharyaStatsGrid');
                    if (statsGrid) {
                        statsGrid.innerHTML = pg.stats.map(s => `
                            <div class="acharya-stat"><div class="num">${s.num}</div><div class="lbl">${s.label}</div></div>
                        `).join('');
                    }
                }

                // Pricing Section Header
                const pricingHeader = document.getElementById('acharyaPricingHeader');
                if (pricingHeader) {
                    const label = pricingHeader.querySelector('.label');
                    if (label && pg.pricingSectionLabel) label.textContent = pg.pricingSectionLabel;
                    const h2 = pricingHeader.querySelector('h2');
                    if (h2 && (pg.pricingSectionHeading || pg.pricingSectionHighlight)) {
                        h2.innerHTML = (pg.pricingSectionHeading || '') + ' <span>' + (pg.pricingSectionHighlight || '') + '</span>';
                    }
                    const p = pricingHeader.querySelector('p');
                    if (p && pg.pricingSectionSubtitle) p.textContent = pg.pricingSectionSubtitle;
                }

                // Why Section Header
                const whyHeader = document.getElementById('acharyaWhyHeader');
                if (whyHeader) {
                    const wLabel = whyHeader.querySelector('.label');
                    if (wLabel && pg.whySectionLabel) wLabel.textContent = pg.whySectionLabel;
                    const wH2 = whyHeader.querySelector('h2');
                    if (wH2 && (pg.whySectionHeading || pg.whySectionHighlight)) {
                        wH2.innerHTML = (pg.whySectionHeading || '') + ' <span>' + (pg.whySectionHighlight || '') + '</span>';
                    }
                }

                // Why Items
                if (pg.whyItems && pg.whyItems.length) {
                    const whyGrid = document.getElementById('acharyaWhyGrid');
                    if (whyGrid) {
                        whyGrid.innerHTML = pg.whyItems.map(w => `
                            <div class="why-item"><i class="fa-solid ${w.icon || 'fa-star'}"></i><h4>${w.title}</h4><p>${w.desc}</p></div>
                        `).join('');
                    }
                }
            }
        }

        // ─── COURSE DETAIL & COURSES PAGE: Student Reviews & FAQ ───
        // Always render on pages that have these sections, using admin data or defaults
        const reviewsSection = document.getElementById('courseReviewsSection');
        if (reviewsSection) {
            const defaultReviews = [
                { name: 'Rahul Verma', course: 'Vedic Astrology Foundations', rating: 5, location: 'Delhi, India', text: 'This course completely changed my understanding of astrology. The teachers are very knowledgeable and patient. Highly recommend!' },
                { name: 'Sneha Patel', course: 'Predictive Astrology Mastery', rating: 5, location: 'Mumbai, India', text: 'After completing this course, I started doing consultations professionally. The case studies and practical approach made all the difference.' },
                { name: 'Amit Kumar', course: 'Vedic Astrology Foundations', rating: 4, location: 'Jaipur, India', text: 'Well-structured curriculum with excellent study materials. The WhatsApp community support is incredibly helpful for clearing doubts.' },
                { name: 'Kavita Singh', course: 'Maha Vastu Shastra', rating: 5, location: 'Bangalore, India', text: 'Applied Vastu principles learned here to my home and office. Noticed a dramatic improvement in business within weeks!' }
            ];
            const reviews = (data.courseReviews && data.courseReviews.length) ? data.courseReviews : defaultReviews;
            const reviewsGrid = reviewsSection.querySelector('.reviews-grid');
            if (reviewsGrid) {
                reviewsGrid.innerHTML = reviews.map(r => {
                    const rating = r.rating || 5;
                    return `
                    <div class="testimonial-card" style="background:var(--bg-cream);border:1px solid rgba(200,135,62,0.1);border-radius:14px;padding:24px;">
                        <div class="stars" style="color:var(--primary);margin-bottom:12px;">
                            ${'<i class="fa-solid fa-star"></i>'.repeat(rating)}${'<i class="fa-regular fa-star" style="opacity:.3;"></i>'.repeat(5 - rating)}
                        </div>
                        <p style="color:var(--text-light);font-size:15px;line-height:1.7;margin-bottom:16px;">"${r.text}"</p>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-dark));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;">${(r.name || 'A')[0]}</div>
                            <div>
                                <h4 style="font-size:15px;color:var(--secondary);margin:0;">${r.name}</h4>
                                <span style="font-size:12px;color:var(--text-light);">${r.course || ''} ${r.location ? '· ' + r.location : ''}</span>
                            </div>
                        </div>
                    </div>`;
                }).join('');
            }
        }

        const courseFaqList = document.querySelector('#courseFaqSection .faq-list');
        if (courseFaqList) {
            const defaultFaq = [
                { question: 'Do I need any prior knowledge of astrology?', answer: 'No! Our Beginners course starts from absolute zero. You only need curiosity and willingness to learn.' },
                { question: 'What if I miss a live class?', answer: 'All sessions are recorded and shared within 24 hours. You get lifetime access to all recordings.' },
                { question: 'Is the certification recognized?', answer: 'Yes, our certificate is recognized by astrology institutions. Many graduates are now practicing professionally.' },
                { question: 'Can I pay in installments?', answer: 'Yes, we offer EMI options and installment plans. Contact us on WhatsApp to discuss a payment plan.' },
                { question: 'What language are the classes in?', answer: 'Classes are conducted in Hindi with English explanations for technical terms for comfortable learning.' }
            ];
            const faqItems = (data.courseFaq && data.courseFaq.length) ? data.courseFaq : defaultFaq;
            courseFaqList.innerHTML = faqItems.map(f => `
                <div class="faq-item">
                    <div class="faq-question"><span>${f.question}</span><i class="fa-solid fa-chevron-down"></i></div>
                    <div class="faq-answer"><p>${f.answer}</p></div>
                </div>
            `).join('');
            bindFaqAccordions(courseFaqList);
        }

        // ─── HERO MOTION SIDES ───
        (function HeroMotionSides() {
            return;
            const pageName = location.pathname.split('/').pop() || 'index.html';
            const motionStylesId = 'bs-motion-hero-styles';
            if (!document.getElementById(motionStylesId)) {
                const style = document.createElement('style');
                style.id = motionStylesId;
                style.textContent = `
                    .bs-motion-hero-side{position:relative;min-height:290px;padding:24px;border-radius:24px;overflow:hidden;isolation:isolate;background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.22);backdrop-filter:blur(14px)}
                    .bs-motion-hero-side::before{content:'';position:absolute;inset:-22%;background:radial-gradient(circle at 20% 20%,rgba(200,135,62,.36),transparent 34%),radial-gradient(circle at 80% 80%,rgba(255,255,255,.14),transparent 36%),radial-gradient(circle at 60% 35%,rgba(255,255,255,.08),transparent 28%);animation:bsMotionGlow 10s ease-in-out infinite alternate;pointer-events:none}
                    .bs-motion-hero-side::after{content:'';position:absolute;inset:14px;border-radius:20px;border:1px solid rgba(255,255,255,.08);animation:bsMotionSpin 16s linear infinite;pointer-events:none;opacity:.75}
                    .bs-motion-hero-shell{position:relative;z-index:1;display:flex;flex-direction:column;gap:16px;height:100%;justify-content:space-between}
                    .bs-motion-hero-kicker{display:inline-flex;align-items:center;gap:8px;width:max-content;padding:8px 14px;border-radius:999px;background:rgba(77,15,15,.55);border:1px solid rgba(200,135,62,.2);color:#fff;font-size:12px;font-weight:700;letter-spacing:.4px;text-transform:uppercase}
                    .bs-motion-hero-kicker i{color:var(--primary-light)}
                    .bs-motion-hero-shell h3{margin:0;color:#fff;font-size:24px;line-height:1.2}
                    .bs-motion-hero-shell p{margin:0;color:rgba(255,255,255,.74);font-size:14px;line-height:1.65;max-width:34ch}
                    .bs-motion-pill-row{display:flex;flex-wrap:wrap;gap:10px}
                    .bs-motion-pill{padding:9px 12px;border-radius:999px;background:rgba(77,15,15,.45);border:1px solid rgba(255,255,255,.12);color:#fff;font-size:12px;backdrop-filter:blur(8px);animation:bsMotionFloat 5.5s ease-in-out infinite}
                    .bs-motion-pill:nth-child(2){animation-delay:.7s}
                    .bs-motion-pill:nth-child(3){animation-delay:1.4s}
                    .bs-motion-scene{position:relative;display:flex;align-items:center;justify-content:center;min-height:122px;perspective:900px}
                    .bs-motion-cube-wrap{position:relative;width:112px;height:112px;transform-style:preserve-3d;animation:bsMotionOrbit 12s linear infinite}
                    .bs-motion-cube{position:absolute;inset:0;transform-style:preserve-3d;animation:bsMotionCube 8s ease-in-out infinite}
                    .bs-motion-cube span{position:absolute;inset:0;border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.18),rgba(200,135,62,.08));border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(4px);box-shadow:inset 0 0 24px rgba(255,255,255,.08)}
                    .bs-motion-cube .front{transform:translateZ(56px)}
                    .bs-motion-cube .back{transform:rotateY(180deg) translateZ(56px)}
                    .bs-motion-cube .right{transform:rotateY(90deg) translateZ(56px)}
                    .bs-motion-cube .left{transform:rotateY(-90deg) translateZ(56px)}
                    .bs-motion-cube .top{transform:rotateX(90deg) translateZ(56px)}
                    .bs-motion-cube .bottom{transform:rotateX(-90deg) translateZ(56px)}
                    .bs-motion-ring{position:absolute;width:152px;height:152px;border-radius:50%;border:1px dashed rgba(255,255,255,.24);transform:rotateX(70deg);animation:bsMotionRing 7s linear infinite;box-shadow:0 0 0 1px rgba(200,135,62,.08),inset 0 0 40px rgba(200,135,62,.08)}
                    .bs-motion-ring::before,.bs-motion-ring::after{content:'';position:absolute;inset:18px;border-radius:50%;border:1px solid rgba(200,135,62,.14)}
                    .bs-motion-ring::after{inset:34px;opacity:.7}
                    .bs-motion-orbit{position:absolute;width:12px;height:12px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,1),rgba(200,135,62,.9) 60%,rgba(200,135,62,.15) 100%);box-shadow:0 0 18px rgba(200,135,62,.6)}
                    .bs-motion-orbit.one{top:8px;left:50%;transform:translateX(-50%);animation:bsMotionOrbitDot 5.6s linear infinite}
                    .bs-motion-orbit.two{bottom:18px;right:24px;animation:bsMotionOrbitDot 6.8s linear infinite reverse}
                    .bs-motion-orbit.three{left:18px;bottom:36px;animation:bsMotionOrbitDot 4.8s linear infinite}
                    .bs-motion-orb{position:absolute;border-radius:50%;filter:blur(2px);opacity:.8;pointer-events:none}
                    .bs-motion-orb.one{width:120px;height:120px;right:-18px;top:-10px;background:radial-gradient(circle,rgba(255,255,255,.22),rgba(200,135,62,.06) 55%,transparent 70%);animation:bsMotionDrift 7s ease-in-out infinite}
                    .bs-motion-orb.two{width:78px;height:78px;left:18px;bottom:30px;background:radial-gradient(circle,rgba(200,135,62,.34),rgba(200,135,62,.04) 60%,transparent 72%);animation:bsMotionDrift 9s ease-in-out infinite reverse}
                    .bs-motion-orb.three{width:42px;height:42px;right:24px;bottom:24px;background:radial-gradient(circle,rgba(255,255,255,.22),transparent 70%);animation:bsMotionDrift 6s ease-in-out infinite}
                    .bs-motion-blog{display:grid !important;grid-template-columns:minmax(280px,500px) minmax(0,1fr) minmax(260px,340px);gap:24px;align-items:center;justify-content:stretch}
                    .bs-motion-blog .blog-featured-img{flex:none;width:100%}
                    .bs-motion-blog .blog-featured-text{flex:none}
                    .bs-motion-hero-layout{display:grid !important;grid-template-columns:minmax(0,1fr) minmax(280px,360px);gap:32px;align-items:center;justify-content:stretch}
                    .bs-motion-hero-layout .container{margin:0}
                    @keyframes bsMotionGlow{0%{transform:translate3d(0,0,0) scale(1)}100%{transform:translate3d(18px,-10px,0) scale(1.06)}}
                    @keyframes bsMotionSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                    @keyframes bsMotionFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
                    @keyframes bsMotionPulse{0%,100%{transform:scaleY(.9);opacity:.75}50%{transform:scaleY(1.1);opacity:1}}
                    @keyframes bsMotionDrift{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-8px) translateX(6px)}}
                    @keyframes bsMotionOrbit{from{transform:rotateX(72deg) rotateZ(0deg)}to{transform:rotateX(72deg) rotateZ(360deg)}}
                    @keyframes bsMotionCube{0%,100%{transform:rotateX(-22deg) rotateY(18deg) rotateZ(0deg)}50%{transform:rotateX(24deg) rotateY(210deg) rotateZ(16deg)}}
                    @keyframes bsMotionRing{from{transform:rotateX(70deg) rotateZ(0deg)}to{transform:rotateX(70deg) rotateZ(360deg)}}
                    @keyframes bsMotionOrbitDot{from{transform:rotate(0deg) translateX(54px) rotate(0deg)}to{transform:rotate(360deg) translateX(54px) rotate(-360deg)}}
                    @media (max-width: 1024px){
                        .bs-motion-hero-layout,.bs-motion-blog{grid-template-columns:1fr !important}
                        .bs-motion-hero-side{min-height:220px}
                        .bs-motion-hero-shell h3{font-size:22px}
                    }
                `;
                document.head.appendChild(style);
            }

            const buildSide = (kicker, heading, description, pills) => `
                <div class="bs-motion-hero-side" aria-hidden="true">
                    <div class="bs-motion-orb one"></div>
                    <div class="bs-motion-orb two"></div>
                    <div class="bs-motion-orb three"></div>
                    <div class="bs-motion-hero-shell">
                        <div>
                            <div class="bs-motion-hero-kicker"><i class="fa-solid fa-wand-magic-sparkles"></i> ${kicker}</div>
                            <h3>${heading}</h3>
                            <p>${description}</p>
                        </div>
                        <div class="bs-motion-pill-row">
                            ${pills.map(p => `<span class="bs-motion-pill">${p}</span>`).join('')}
                        </div>
                        <div class="bs-motion-scene" aria-hidden="true">
                            <div class="bs-motion-ring"></div>
                            <div class="bs-motion-orbit one"></div>
                            <div class="bs-motion-orbit two"></div>
                            <div class="bs-motion-orbit three"></div>
                            <div class="bs-motion-cube-wrap">
                                <div class="bs-motion-cube">
                                    <span class="front"></span>
                                    <span class="back"></span>
                                    <span class="right"></span>
                                    <span class="left"></span>
                                    <span class="top"></span>
                                    <span class="bottom"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

            const applySplitHero = (section, inner, opts) => {
                if (!section || section.querySelector('.bs-motion-hero-side')) return;
                if (inner) {
                    inner.style.textAlign = 'left';
                    inner.style.maxWidth = 'none';
                    inner.style.margin = '0';
                }
                section.classList.add('bs-motion-hero-layout');
                section.appendChild(document.createElement('div')).outerHTML = buildSide(opts.kicker, opts.heading, opts.description, opts.pills);
            };

            const pageBanner = document.querySelector('.page-banner');
            if ((pageName === 'services.html' || pageName === 'reports.html') && pageBanner && !pageBanner.querySelector('.bs-motion-hero-side')) {
                const bannerInner = pageBanner.querySelector('.container');
                if (bannerInner) bannerInner.style.textAlign = 'left';
                pageBanner.classList.add('bs-motion-hero-layout');
                pageBanner.appendChild(document.createElement('div')).outerHTML = buildSide('Guided Clarity', 'Read the Signs Faster', 'Find practical insights, clear remedies, and the next step for your journey.', ['Career', 'Marriage', 'Health']);
            }

            const storeHero = document.querySelector('.store-hero');
            if (pageName === 'store.html' && storeHero && !storeHero.querySelector('.bs-motion-hero-side')) {
                const content = storeHero.querySelector('.store-hero-content');
                if (content) {
                    content.style.textAlign = 'left';
                    content.style.maxWidth = 'none';
                    content.style.margin = '0';
                }
                storeHero.classList.add('bs-motion-hero-layout');
                storeHero.appendChild(document.createElement('div')).outerHTML = buildSide('Certified Store', 'Sacred Products in Motion', 'Browse gemstones, Rudraksha, and yantras selected for authenticity and energized for your use.', ['Certified', 'Energized', 'Fast Shipping']);
            }

            const courseHero = document.querySelector('.cp-hero');
            if ((pageName === 'courses.html' || pageName === 'pooja.html') && courseHero && !courseHero.querySelector('.bs-motion-hero-side')) {
                const content = courseHero.querySelector('.cp-hero-content');
                if (content) {
                    content.style.textAlign = 'left';
                    content.style.maxWidth = 'none';
                    content.style.margin = '0';
                }
                courseHero.classList.add('bs-motion-hero-layout');
                courseHero.appendChild(document.createElement('div')).outerHTML = buildSide(
                    pageName === 'courses.html' ? 'Live Learning' : 'Sacred Rituals',
                    pageName === 'courses.html' ? 'Learn with Momentum' : 'Bring the Ritual to Life',
                    pageName === 'courses.html' ? 'Structured lessons, real chart practice, and mentorship that move with you.' : 'Temple-style poojas, live streaming, and post-ritual guidance for peace and protection.',
                    pageName === 'courses.html' ? ['Live Classes', 'Mentorship', 'Certification'] : ['Temple Vidhi', 'Live Stream', 'Prasad']
                );
            }

            const consultHero = document.querySelector('.consult-hero');
            if (pageName === 'consultation.html' && consultHero && !consultHero.querySelector('.bs-motion-hero-side')) {
                const content = consultHero.querySelector('.consult-hero-content');
                if (content) {
                    content.style.textAlign = 'left';
                    content.style.maxWidth = 'none';
                    content.style.margin = '0';
                }
                consultHero.classList.add('bs-motion-hero-layout');
                consultHero.appendChild(document.createElement('div')).outerHTML = buildSide('Private Guidance', 'Motion Toward Clarity', 'Book a consultation and move through career, marriage, health, and prosperity questions with focus.', ['Private', 'Practical', 'Fast Booking']);
            }

            const blogFeatured = document.getElementById('blogFeatured');
            if (pageName === 'blog.html' && blogFeatured && !blogFeatured.querySelector('.bs-motion-hero-side')) {
                blogFeatured.classList.add('bs-motion-blog');
                blogFeatured.appendChild(document.createElement('div')).outerHTML = buildSide('Fresh Insights', 'Wisdom in Motion', 'A moving snapshot of articles, remedies, and spiritual guidance from the latest posts.', ['Insights', 'Remedies', 'Updates']);
            }
        })();

        initCounters();
        bindFaqAccordions();
    })();

    // ===================================================================
    //  SCROLL TO TOP BUTTON — Shows on all pages
    // ===================================================================
    (function ScrollToTop() {
        if (document.getElementById('scrollToTopBtn')) return;
        const btn = document.createElement('button');
        btn.id = 'scrollToTopBtn';
        btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        btn.setAttribute('aria-label', 'Scroll to top');
        btn.style.cssText = `
            position:fixed;bottom:90px;right:28px;width:42px;height:42px;
            border-radius:50%;border:none;cursor:pointer;z-index:998;
            background:linear-gradient(135deg,#C8873E,#E8A84C);
            color:#fff;font-size:16px;display:none;
            align-items:center;justify-content:center;
            box-shadow:0 4px 15px rgba(200,135,62,0.4);
            transition:all .3s ease;
        `;
        document.body.appendChild(btn);

        btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateY(-3px) scale(1.08)'; btn.style.boxShadow = '0 8px 30px rgba(200,135,62,0.6)'; });
        btn.addEventListener('mouseleave', () => { btn.style.transform = 'translateY(0) scale(1)'; btn.style.boxShadow = '0 4px 20px rgba(200,135,62,0.4)'; });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.style.display = 'flex';
            } else {
                btn.style.display = 'none';
            }
        });
    })();

    // ===================================================================
    //  PRODUCT DETAIL PAGE — Renders product detail from store data
    // ===================================================================
    (function ProductDetailPage() {
        const page = location.pathname.split('/').pop() || '';
        if (page !== 'product-detail.html') return;

        // Read id from hash (#id=1) first, then query param as fallback
        function getProductId() {
            const h = location.hash.replace('#','');
            const hp = new URLSearchParams(h);
            if (hp.get('id') !== null) return parseInt(hp.get('id'));
            const qp = new URLSearchParams(location.search);
            if (qp.get('id') !== null) return parseInt(qp.get('id'));
            return NaN;
        }
        const id = getProductId();
        if (isNaN(id)) return;

        const raw = localStorage.getItem('bs_admin_data');
        let store = null;
        let waNum = '919876543210';
        if (raw) {
            try {
                const data = JSON.parse(raw);
                store = data.store;
                if (data.site && data.site.whatsapp) waNum = data.site.whatsapp;
            } catch(e) {}
        }

        // Fallback default store
        if (!store) {
            store = [
                { title: 'Yellow Sapphire (Pukhraj)', desc: 'For Jupiter — Prosperity & Wisdom', image: 'https://images.unsplash.com/photo-1599643478524-fb5244098795?auto=format&fit=crop&w=400&q=80', newPrice: '15,000/Ratti', link: 'store.html' },
                { title: 'Blue Sapphire (Neelam)', desc: 'For Saturn — Discipline & Fortune', image: 'https://images.unsplash.com/photo-1588661608906-880026e79d1a?auto=format&fit=crop&w=400&q=80', newPrice: '20,000/Ratti', link: 'store.html' },
                { title: '5 Mukhi Rudraksha', desc: 'For Health & Peace of Mind', image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=400&q=80', newPrice: '1,500', link: 'store.html' },
                { title: 'Copper Sri Yantra', desc: 'For Wealth & Lakshmi Blessings', image: 'https://images.unsplash.com/photo-1516088235288-0d195ba2476d?auto=format&fit=crop&w=400&q=80', newPrice: '2,100', link: 'store.html' }
            ];
        }

        const product = store[id];
        if (!product) return;

        // Set page title
        document.title = product.title + ' - Bhartiya Sidhant Store';

        // Fill product detail
        const container = document.getElementById('productDetailContainer');
        if (!container) return;

        const defaultFeatures = [
            '100% Natural & Authentic',
            'Lab Certified with Certificate',
            'Energized with Vedic Mantras',
            'Expert Recommendation Based on Kundli',
            'Proper Wearing Guidance & Muhurta',
            'Secure Packaging & Fast Delivery',
            'Lifetime Authenticity Guarantee'
        ];
        const features = product.features ? product.features.split('\n').filter(f => f.trim()) : defaultFeatures;
        const detailDesc = product.detailDesc || 'This premium product is hand-selected by our expert astrologers and energized through traditional Vedic rituals. It comes with a certificate of authenticity and detailed wearing/usage instructions.';
        const detailParagraphs = detailDesc.split('\n').filter(p => p.trim());

        container.innerHTML = `
            <div class="service-detail">
                <div class="service-img">
                    <img src="${product.image}" alt="${product.title}" style="width:100%;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.12);">
                </div>
                <div class="service-info">
                    <div class="label">From Our Store</div>
                    <h2>${product.title}</h2>
                    <div class="price-tag">₹${product.newPrice}${product.oldPrice ? ' <del style="font-size:14px;opacity:.7;">₹' + product.oldPrice + '</del>' : ''}</div>
                    <p>${product.desc}</p>
                    ${detailParagraphs.map(p => '<p>' + p.trim() + '</p>').join('')}
                    <ul class="features-list">
                        ${features.map(f => '<li><i class="fa-solid fa-check-circle"></i> ' + f.trim() + '</li>').join('')}
                    </ul>
                    ${product.includes ? '<div style="margin-top:20px;padding:20px;background:#FDF5E6;border-radius:12px;border:1px solid rgba(200,135,62,.15)"><h4 style="color:var(--secondary);margin-bottom:10px;"><i class="fa-solid fa-clipboard-list"></i> What\'s Included</h4><ul style="padding:0;list-style:none;">' + product.includes.split('\n').filter(i=>i.trim()).map(i => '<li style="padding:6px 0;font-size:14px;display:flex;align-items:center;gap:8px;"><i class="fa-solid fa-check" style="color:var(--primary);font-size:12px;"></i> ' + i.trim() + '</li>').join('') + '</ul></div>' : ''}
                    <div>
                        <a href="https://wa.me/${waNum}?text=Hi, I want to buy ${encodeURIComponent(product.title)}" class="pay-btn"><i class="fa-brands fa-whatsapp"></i> Order via WhatsApp</a>
                        <a href="store.html" class="pay-btn pay-btn-secondary"><i class="fa-solid fa-arrow-left"></i> Back to Store</a>
                    </div>
                </div>
            </div>
            <div class="related-products">
                <div class="section-header" style="margin-top:60px;">
                    <div class="label">You May Also Like</div>
                    <h2>Related <span>Products</span></h2>
                </div>
                <div class="grid-4">
                    ${store.filter((_, i) => i !== id).slice(0, 4).map((s, i) => {
                        const realIdx = store.indexOf(s);
                        return `
                        <div class="card" style="cursor:pointer;" onclick="window.location.href='product-detail.html#id=${realIdx}'">
                            <img src="${s.image}" alt="${s.title}" class="card-img" style="height:200px;object-fit:cover;">
                            <div class="card-body">
                                <h3 style="font-size:18px;">${s.title}</h3>
                                <p>${s.desc}</p>
                                <div class="card-footer">
                                    <span class="card-price">₹${s.newPrice}</span>
                                    <a href="product-detail.html#id=${realIdx}" class="header-btn btn-maroon" style="padding:8px 18px;font-size:12px;">View Details</a>
                                </div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;

        // Update breadcrumb
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) breadcrumb.innerHTML = '<a href="index.html">Home</a> / <a href="store.html">Store</a> / ' + product.title;

        // Update banner
        const bannerH1 = document.querySelector('.page-banner h1');
        if (bannerH1) bannerH1.textContent = product.title;
        const bannerP = document.querySelector('.page-banner p');
        if (bannerP) bannerP.textContent = product.desc;

        // Re-render when hash changes (e.g. navigating between products)
        window.addEventListener('hashchange', () => location.reload());
    })();

// ─────────────────────────────────────────────────────────────────---------
// General UI Interactions (Tabs, Mobile Menu)
// ─────────────────────────────────────────────────────────────────---------
document.addEventListener('DOMContentLoaded', () => {
    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            if (!target) return;
            
            // Remove active from all siblings
            const parentNav = btn.closest('.tabs-nav');
            if (parentNav) {
                parentNav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            } else {
                tabBtns.forEach(b => b.classList.remove('active'));
            }
            btn.classList.add('active');

            // Hide all tab contents in the same container
            const container = btn.closest('.section') || document;
            container.querySelectorAll('.tab-content').forEach(tc => {
                tc.classList.remove('active');
            });
            
            // Show target
            const targetEl = document.getElementById(target);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // Mobile Menu Toggle Logic
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
});
