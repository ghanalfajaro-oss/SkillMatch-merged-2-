// Fills matches / skill-gaps pages from the analysis the server returned (kept in this tab only).
const RESULT = JSON.parse(sessionStorage.getItem('skillmatch.result') || 'null');
if (!RESULT && /matches|skill-gaps/.test(location.pathname)) location.replace('upload.html');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
if (RESULT && /matches/.test(location.pathname)) {
  const main = document.querySelector('main');
  if (!RESULT.techRelated) {
    main.querySelectorAll('.matches-grid').forEach(n => n.remove());
    main.querySelector('.section-heading p').textContent = 'This resume does not look technology-related, so there are no tech matches to show. Add your tech skills and try again.';
  } else {
    main.querySelector('.section-heading p').textContent = 'Your Top 5 Matches based on your qualifications.' + (RESULT.usedAi ? ' (Resume read with AI)' : ' (Resume read with keyword matching)');
    document.querySelectorAll('.result-card').forEach((card, i) => {
      const r = RESULT.results[i]; if (!r) { card.style.display = 'none'; return; }
      card.querySelector('h2').textContent = r.title;
      card.querySelector('.score-percent').textContent = r.score + '%';
      const b = card.querySelector('.status-badge'); b.textContent = r.level; b.className = 'status-badge ' + (r.score >= 80 ? 'strong' : 'good');
    });
  }
}
if (RESULT && /skill-gaps/.test(location.pathname)) {
  const g = RESULT.gaps; const list = document.querySelector('.gaps-list');
  list.innerHTML = g.items.length ? g.items.map((i, n) => `<div class="gap-item"><div class="gap-num">${n + 1}</div><div class="gap-body"><h3>${esc(i.skill)} <span class="freq">(Missing in ${i.missingIn} of ${i.outOf} matches)</span></h3><p>${esc(i.advice)}</p></div></div>`).join('') : '<p>No missing skills found across your top matches.</p>';
  document.querySelector('.summary-panel p').textContent = g.summary || '';
}
