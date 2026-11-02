/* SERENÉ — shared layout, animations, and page logic (vanilla JS) */
(() => {
  'use strict';
  const S = window.SERENE; if (!S) return;
  const d = document, $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.documentElement.classList.add('js');
  const money = n => '₱' + Number(n).toLocaleString('en-PH');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = p => `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICON = { therapist: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/>', personal: '<path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>', products: '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>', calm: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-5 6-8 10-10"/>', facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>', instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>' };
  const byId = id => S.services.find(s => s.id === id);
  const FB = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#E7DCCB"/><path d="M400 230c60 70 90 110 90 150a90 90 0 0 1-180 0c0-40 30-80 90-150z" fill="#A8B5A0"/></svg>');
  d.addEventListener('error', e => { const t = e.target; if (t.tagName === 'IMG' && t.src !== FB) t.src = FB }, true);
  const img = (k, alt, extra = '') => `<img src="${S.img[k] || FB}" alt="${esc(alt)}" width="800" height="600" ${extra}>`;

  /* ---------- header & footer ---------- */
  const NAV = [['index.html', 'Home'], ['about.html', 'About'], ['services.html', 'Services & Rates'], ['gallery.html', 'Gallery'], ['contact.html', 'Contact']];
  const file = location.pathname.split('/').pop() || 'index.html';
  const cur = h => h === file ? ' aria-current="page"' : '';
  $('#site-header').outerHTML = `<header class="site-header"><div class="container bar"><a class="brand" href="index.html" aria-label="SERENÉ Spa &amp; Wellness, home"><span>SERENÉ</span><small>Spa &amp; Wellness</small></a><button class="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="Toggle menu"><i></i><i></i><i></i></button><nav id="nav" class="nav" aria-label="Main">${NAV.map(n => `<a href="${n[0]}"${cur(n[0])}>${esc(n[1])}</a>`).join('')}<a class="btn btn--sm" href="booking.html"${cur('booking.html')}>Book an Appointment</a></nav></div></header>`;
  const cats = S.categories.map(c => `<li><a class="ulink" href="services.html#cat-${c.id}">${c.name}</a></li>`).join('');
  $('#site-footer').outerHTML = `<footer class="site-footer"><div class="container"><div class="fcols">
<div><a class="brand" href="index.html"><span>SERENÉ</span><small>Spa &amp; Wellness</small></a><p>A calm, considered space for restorative treatments and unhurried care.</p><div class="soc" data-social style="margin-top:1rem"></div></div>
<div><h2>Explore</h2><ul>${NAV.concat([['booking.html', 'Booking Inquiry']]).map(n => `<li><a class="ulink" href="${n[0]}">${esc(n[1])}</a></li>`).join('')}</ul></div>
<div><h2>Treatments</h2><ul>${cats}</ul></div>
<div><h2>Visit Us</h2><p data-bind="contact.address"></p><p data-bind="contact.phone"></p><p data-bind="contact.email"></p><table class="hours" data-hours></table></div>
<div><h2>Join Our Newsletter</h2><form class="news" id="newsletter" novalidate><div class="field"><label for="nl" style="color:#d8d3c6">Email address</label><input id="nl" type="email" required autocomplete="email"></div><button class="btn btn--light" type="submit">Subscribe</button></form><p class="site-note">Newsletter signup is not connected. Your email will not be sent or stored.</p><p id="nl-msg" role="status" style="margin-top:.7rem;font-size:.88rem"></p></div>
</div><div class="fbot"><span>© 2026 SERENÉ Spa &amp; Wellness.</span><span>Take time to restore and renew.</span></div></div></footer><button class="btt" type="button" aria-label="Back to top">↑</button>`;
  const hdr = $('.site-header'), burger = $('.burger'), navEl = $('#nav'), btt = $('.btt');
  const setMenu = o => { navEl.classList.toggle('open', o); hdr.classList.toggle('menu-open', o); burger.setAttribute('aria-expanded', o); d.body.classList.toggle('lock', o) };
  burger.addEventListener('click', () => setMenu(!navEl.classList.contains('open')));
  navEl.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false) });
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && navEl.classList.contains('open')) { setMenu(false); burger.focus() } });
  matchMedia('(min-width:960px)').addEventListener('change', e => { if (e.matches) setMenu(false) });
  btt.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------- binders ---------- */
  $$('[data-bind]').forEach(e => { const value = e.dataset.bind.split('.').reduce((o, k) => o?.[k], S); e.textContent = value || ''; if (!value) { const row = e.closest('.info > div'); if (row) row.hidden = true; else e.hidden = true } });
  $$('[data-hours]').forEach(t => { t.innerHTML = S.hours.map(h => `<tr><td>${esc(h[0])}</td><td>${esc(h[1])}</td></tr>`).join('') });
  $$('[data-social]').forEach(w => { const links = Object.entries(S.social).filter(([, url]) => url); w.innerHTML = links.map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${k[0].toUpperCase() + k.slice(1)}">${svg(ICON[k])}</a>`).join(''); if (!links.length) { w.hidden = true; w.closest('.info > div')?.setAttribute('hidden', '') } });
  $$('[data-map]').forEach(m => { m.innerHTML = S.contact.mapEmbed ? `<iframe src="${esc(S.contact.mapEmbed)}" title="Map of spa location" loading="lazy"></iframe>` : `<div class="map-empty"><div><strong>Location map not available yet</strong><p>Add a map embed URL in <code>js/data.js</code> to show your spa location.</p></div></div>` });
  $$('[data-icon]').forEach(e => { e.innerHTML = svg(ICON[e.dataset.icon]) });
  $$('img[data-img]').forEach(i => { i.src = S.img[i.dataset.img] || FB });
  $$('[data-alt]').forEach(w => {
    const c = S.contact; const items = [['Email inquiry', c.email && `mailto:${c.email}`], ['Call us', c.phone && `tel:${c.phone.replace(/\s/g, '')}`], ['WhatsApp', c.whatsapp && `https://wa.me/${c.whatsapp}`]].filter(([, url]) => url);
    w.innerHTML = items.map(i => `<a class="btn btn--outline btn--sm" href="${esc(i[1])}">${i[0]}</a>`).join(''); if (!items.length) w.hidden = true
  });

  /* ---------- shared components ---------- */
  const svcCard = s => `<article class="card${s.incl ? ' card--pkg' : ''}" id="svc-${s.id}"><figure class="zoom">${img(s.img, s.name + ' treatment', 'loading="lazy"')}</figure><div class="card__b"><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p>${s.incl ? `<ul class="incl">${s.incl.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}<p class="meta"><span>${s.dur} min</span><strong>${money(s.price)}</strong></p>${s.note ? `<p class="note">${esc(s.note)}</p>` : ''}<a class="btn btn--outline" href="booking.html?service=${s.id}">Inquire About This Treatment</a></div></article>`;
  const accordion = (el, list) => {
    if (!el) return; el.innerHTML = list.map((f, i) => `<div class="acc"><h3><button type="button" aria-expanded="false" aria-controls="${el.id}-${i}">${esc(f[0])}<span class="plus" aria-hidden="true"></span></button></h3><div class="acc__p" id="${el.id}-${i}"><div><p>${esc(f[1])}</p></div></div></div>`).join('');
    el.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const o = b.getAttribute('aria-expanded') === 'true'; b.setAttribute('aria-expanded', !o); b.closest('.acc').classList.toggle('open', !o) })
  };
  const MSG = { valueMissing: 'This field is required.', typeMismatch: 'Please enter a valid value.', patternMismatch: 'Please check the format.', rangeUnderflow: 'Please choose today or a later date.', tooShort: 'Please write a little more.' };
  const checkField = el => {
    if (el.type === 'radio') return true; let p = el.parentElement.querySelector('.err');
    if (el.checkValidity()) { p?.remove(); el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby'); return true }
    if (!p) { p = d.createElement('p'); p.className = 'err'; p.id = el.id + '-err'; el.parentElement.append(p) }
    const v = el.validity; p.textContent = v.patternMismatch && el.dataset.msg ? el.dataset.msg : v.typeMismatch && el.type === 'email' ? 'Please enter a valid email address.' : MSG[Object.keys(MSG).find(k => v[k])] || el.validationMessage;
    el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', p.id); return false
  };
  const checkForm = f => { let first = null; $$('input,select,textarea', f).forEach(el => { if (!checkField(el) && !first) first = el }); first?.focus(); return !first };
  const liveCheck = f => { f.addEventListener('input', e => { if (e.target.getAttribute?.('aria-invalid')) checkField(e.target) }); f.addEventListener('reset', () => setTimeout(() => { $$('.err', f).forEach(x => x.remove()); $$('[aria-invalid]', f).forEach(x => x.removeAttribute('aria-invalid')) })) };

  /* newsletter */
  const nl = $('#newsletter'); liveCheck(nl);
  nl.addEventListener('submit', e => { e.preventDefault(); const m = $('#nl-msg'); if (!checkForm(nl)) { m.textContent = ''; return } m.textContent = 'Newsletter signup is not connected. Your email was not sent or stored.'; nl.reset() });

  /* ---------- pages ---------- */
  const pages = {
    index() {
      $('#featured').innerHTML = ['swedish', 'deep', 'hotstone', 'aroma', 'facial', 'scrub'].map(id => { const s = byId(id); return `<article class="card"><figure class="zoom">${img(s.img, s.name + ' treatment', 'loading="lazy"')}</figure><div class="card__b"><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p><p class="meta"><span>${s.dur} min</span><span>From <strong>${money(s.price)}</strong></span></p><a class="ulink" href="services.html#svc-${s.id}">View on Services page →</a></div></article>` }).join('');
      $('#gprev').innerHTML = S.gallery.slice(0, 5).map(g => `<a class="zoom" href="gallery.html" aria-label="Open gallery: ${esc(g.cap)}">${img(g.img, g.cap, 'loading="lazy"')}</a>`).join('');
    },
    about() {
      $('#team').innerHTML = S.therapists.map(t => `<article class="person"><img src="${esc(t.photo)}" alt="Portrait of ${esc(t.name)}" width="400" height="400" loading="lazy"><h3>${esc(t.name)}</h3><small>${esc(t.role)}</small><p>${esc(t.bio)}</p></article>`).join('');
    },
    services() {
      $('#catnav').innerHTML = S.categories.map(c => `<a href="#cat-${c.id}">${c.name}</a>`).join('') + '<a href="#addons">Add-ons</a><a href="#faq">FAQ</a>';
      $('#cats').innerHTML = S.categories.map((c, i) => `<section class="section${i % 2 ? ' section--white' : ''}" id="cat-${c.id}"><div class="container"><header class="sec-h" data-reveal><h2>${c.name}</h2><p>${c.blurb}</p></header><div class="grid" data-stagger>${S.services.filter(s => s.cat === c.id).map(svcCard).join('')}</div></div></section>`).join('');
      $('#addlist').innerHTML = S.addons.map(a => `<li><span>${esc(a[0])}</span><strong>${money(a[1])}</strong></li>`).join('');
      accordion($('#faq-list'), S.faq);
    },
    booking() {
      const f = $('#bk'), box = { form: $('#bk-form'), sum: $('#bk-sum'), ok: $('#bk-ok') }, show = k => Object.keys(box).forEach(x => box[x].hidden = x !== k);
      $('#f-treatment').innerHTML = '<option value="">Select a treatment</option>' + S.categories.map(c => `<optgroup label="${c.name}">${S.services.filter(s => s.cat === c.id).map(s => `<option value="${s.id}">${esc(s.name)} · ${s.dur} min · ${money(s.price)}</option>`).join('')}</optgroup>`).join('');
      const pre = new URLSearchParams(location.search).get('service'); if (byId(pre)) $('#f-treatment').value = pre;
      $('#f-time').innerHTML = '<option value="">Select a time</option>' + S.times.map(t => `<option>${t}</option>`).join('');
      $('#f-therapist').innerHTML = '<option value="">No preference</option>' + S.therapists.map(t => `<option>${esc(t.name)}</option>`).join('');
      $('#f-date').min = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
      liveCheck(f);
      f.addEventListener('submit', e => {
        e.preventDefault(); if (!checkForm(f)) return;
        const t = x => { const el = $('#' + x); return el.tagName === 'SELECT' ? el.selectedOptions[0].text : el.value };
        const rows = [['Name', 'f-name'], ['Email', 'f-email'], ['Mobile', 'f-phone'], ['Treatment', 'f-treatment'], ['Date', 'f-date'], ['Time', 'f-time'], ['Guests', 'f-guests'], ['Therapist', 'f-therapist'], ['Notes', 'f-notes']].map(r => [r[0], t(r[1]) || '—']);
        rows.push(['Contact by', new FormData(f).get('contactMethod')]);
        $('#bk-rows').innerHTML = rows.map(r => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join(''); show('sum'); $('#bk-sum h2').focus()
      });
      $('#bk-edit').addEventListener('click', () => { show('form'); $('#f-name').focus() });
      $('#bk-confirm').addEventListener('click', e => { e.currentTarget.disabled = true; show('ok'); $('#bk-ok h2').focus() });
      $('#bk-new').addEventListener('click', () => { f.reset(); $('#bk-confirm').disabled = false; show('form'); $('#f-name').focus() });
    },
    gallery() {
      const grid = $('#masonry');
      grid.innerHTML = S.gallery.map((g, i) => `<button class="g-item" type="button" data-cat="${g.cat}" data-i="${i}" style="aspect-ratio:${g.r}" aria-label="Open image: ${esc(g.cap)}">${img(g.img, g.cap, 'loading="lazy"')}<span>${esc(g.cap)}</span></button>`).join('');
      const items = $$('.g-item', grid); let vis = items, idx = 0;
      $$('.filters button').forEach(b => b.addEventListener('click', () => {
        $$('.filters button').forEach(x => x.setAttribute('aria-pressed', x === b)); const c = b.dataset.f;
        items.forEach(it => { const on = c === 'all' || it.dataset.cat === c; if (on) { it.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => it.classList.remove('fade'))) } else { it.classList.add('fade'); setTimeout(() => { if (it.classList.contains('fade')) it.hidden = true }, reduce ? 0 : 320) } });
        vis = items.filter(it => c === 'all' || it.dataset.cat === c)
      }));
      const lb = $('#lb'), li = $('#lb-img'), lc = $('#lb-cap');
      const open = i => { idx = (i + vis.length) % vis.length; const g = S.gallery[vis[idx].dataset.i]; li.src = S.img[g.img] || FB; li.alt = g.cap; lc.innerHTML = `${esc(g.cap)}<small>${idx + 1} / ${vis.length}</small>`; if (!lb.open) lb.showModal() };
      grid.addEventListener('click', e => { const it = e.target.closest('.g-item'); if (it) open(vis.indexOf(it)) });
      $('#lb-prev').addEventListener('click', () => open(idx - 1)); $('#lb-next').addEventListener('click', () => open(idx + 1)); $('#lb-x').addEventListener('click', () => lb.close());
      lb.addEventListener('click', e => { if (e.target === lb) lb.close() });
      lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') open(idx - 1); if (e.key === 'ArrowRight') open(idx + 1) });
      let sx = 0; lb.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX }, { passive: true }); lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) open(idx + (dx < 0 ? 1 : -1)) });
    },
    contact() {
      accordion($('#faq-list'), S.faqContact);
      const f = $('#cf'); liveCheck(f);
      f.addEventListener('submit', e => { e.preventDefault(); if (!checkForm(f)) return; f.hidden = true; $('#cf-ok').hidden = false; $('#cf-ok h2').focus() });
      $('#cf-new').addEventListener('click', () => { f.reset(); f.hidden = false; $('#cf-ok').hidden = true; $('#c-name').focus() });
    }
  };
  pages[d.body.dataset.page]?.();

  /* ---------- reveal, parallax, scroll, transitions ---------- */
  $$('[data-stagger]').forEach(g => [...g.children].forEach((c, i) => { c.setAttribute('data-reveal', ''); c.style.setProperty('--i', i % 6) }));
  const rev = $$('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) rev.forEach(e => e.classList.add('in'));
  else { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' }); rev.forEach(e => io.observe(e)) }
  const par = $$('[data-parallax]'); let tick = false;
  const onScroll = () => {
    tick = false; const y = scrollY; hdr.classList.toggle('solid', !d.body.classList.contains('has-hero') || y > 40); btt.classList.toggle('show', y > 600);
    if (!reduce && innerWidth > 700 && y < innerHeight * 1.5) par.forEach(p => { p.style.transform = `translate3d(0,${y * .14}px,0)` })
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll) } }, { passive: true }); onScroll();
  d.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target || a.hasAttribute('download')) return;
    const u = new URL(a.href, location.href); if (u.origin !== location.origin || u.pathname === location.pathname || !/\.html$|\/$/.test(u.pathname)) return;
    e.preventDefault(); d.body.classList.add('leaving'); setTimeout(() => { location.href = a.href }, 250)
  });
  addEventListener('pageshow', () => d.body.classList.remove('leaving'));
})();
