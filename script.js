document.addEventListener('DOMContentLoaded', () => {
  /**
   * Smooth scrolling for navigation links
   */
  document.querySelectorAll('.navlinks a').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.classList.contains('resume-btn')) return;
      e.preventDefault();
      const id = el.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  loadSiteData()
    .then((data) => {
      if (data) applyContent(data);
      initInteractions();
    })
    .catch(() => initInteractions());
});

async function loadSiteData() {
  try {
    const supabase = window.supabase?.createClient(
      window.SUPABASE_URL,
      window.SUPABASE_ANON_KEY
    );
    if (!supabase) throw new Error('Supabase client missing');

    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('id', 1)
      .single();

    if (error) throw error;
    return data?.data || null;
  } catch (err) {
    return loadFallbackData();
  }
}

async function loadFallbackData() {
  try {
    const res = await fetch(`content/site.json?v=${Date.now()}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

function applyContent(data) {
  const profileName = document.getElementById('profile-name');
  const profileDegree = document.getElementById('profile-degree');
  const aboutText = document.getElementById('about-text');
  const quickFacts = document.getElementById('quick-facts');
  const skillsGrid = document.getElementById('skills-grid');
  const projectsGrid = document.getElementById('projects-grid');
  const contactCards = document.getElementById('contact-cards');
  const main = document.querySelector('main.container');
  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroHeadline = document.getElementById('hero-headline');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroMetrics = document.getElementById('hero-metrics');
  const experienceList = document.getElementById('experience-list');

  if (profileName && data.profile?.name) profileName.textContent = data.profile.name;
  if (profileDegree && data.profile?.degree) profileDegree.textContent = data.profile.degree;
  if (aboutText && data.aboutText) aboutText.textContent = data.aboutText;

  if (heroEyebrow && data.hero?.eyebrow) heroEyebrow.textContent = data.hero.eyebrow;
  if (heroHeadline && data.hero?.headline) heroHeadline.textContent = data.hero.headline;
  if (heroSubtitle && data.hero?.subtitle) heroSubtitle.textContent = data.hero.subtitle;

  if (heroMetrics && Array.isArray(data.metrics)) {
    heroMetrics.innerHTML = '';
    data.metrics.forEach((metric) => {
      const item = document.createElement('div');
      item.className = 'metric';
      item.innerHTML = `
        <div class="metric-value">${escapeHtml(metric.value)}</div>
        <div class="metric-label">${escapeHtml(metric.label)}</div>
      `;
      heroMetrics.appendChild(item);
    });
  }

  if (data.hero?.primaryCtaLabel || data.hero?.secondaryCtaLabel) {
    const actions = document.querySelector('.hero-actions');
    if (actions) {
      actions.innerHTML = '';
      if (data.hero?.primaryCtaLabel) {
        const primary = document.createElement('a');
        primary.className = 'resume-btn';
        primary.href = data.hero.primaryCtaHref || '#projects';
        primary.textContent = data.hero.primaryCtaLabel;
        actions.appendChild(primary);
      }
      if (data.hero?.secondaryCtaLabel) {
        const secondary = document.createElement('a');
        secondary.className = 'ghost-btn';
        secondary.href = data.hero.secondaryCtaHref || 'resume.pdf';
        secondary.textContent = data.hero.secondaryCtaLabel;
        secondary.setAttribute('download', '');
        actions.appendChild(secondary);
      }
    }
  }

  if (quickFacts && Array.isArray(data.quickFacts)) {
    quickFacts.innerHTML = '';
    data.quickFacts.forEach((fact) => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid ${fact.icon}"></i> ${escapeHtml(fact.text)}`;
      quickFacts.appendChild(li);
    });
  }

  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl && data.profile?.role) {
    typewriterEl.dataset.text = data.profile.role;
  }

  if (skillsGrid && Array.isArray(data.skills)) {
    skillsGrid.innerHTML = '';
    data.skills.forEach((skill) => {
      const item = document.createElement('div');
      item.className = 'skill glass reveal';
      item.innerHTML = `<div class="skill-header"><span><i class="${skill.icon}"></i> ${escapeHtml(skill.label)}</span></div>`;
      skillsGrid.appendChild(item);
    });
  }

  if (projectsGrid && Array.isArray(data.projects)) {
    projectsGrid.innerHTML = '';
    data.projects.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'flip-card project-card reveal';
      card.tabIndex = 0;
      const imageStyle = project.image
        ? ` style="background-image:url('${escapeAttr(project.image)}')"`
        : '';
      const tags = Array.isArray(project.tags)
        ? `<div class="tag-row">${project.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>`
        : '';
      const roleLine = project.role ? `<span><strong>Role:</strong> ${escapeHtml(project.role)}</span>` : '';
      const resultsLine = project.results ? `<span><strong>Results:</strong> ${escapeHtml(project.results)}</span>` : '';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="project-image" aria-hidden="true"${imageStyle}></div>
            <h4>${escapeHtml(project.title)}</h4>
            <p>${escapeHtml(project.summary)}</p>
            ${tags}
          </div>
          <div class="flip-card-back">
            <h4>${escapeHtml(project.title)}</h4>
            <p>${escapeHtml(project.details)}</p>
            <div class="project-meta">
              ${roleLine}
              ${resultsLine}
            </div>
            <div class="card-links">
              <a href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  }

  if (contactCards && Array.isArray(data.contacts)) {
    contactCards.innerHTML = '';
    data.contacts.forEach((contact, index) => {
      const card = document.createElement('div');
      card.className = 'contact-card glass reveal slide-right';
      card.style.setProperty('--delay', `${index * 0.2}s`);
      card.innerHTML = `
        <i class="${contact.icon}"></i>
        <h4>${escapeHtml(contact.label)}</h4>
        <p><a href="${contact.href}" ${contact.targetBlank ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(contact.value)}</a></p>
      `;
      contactCards.appendChild(card);
    });
  }

  if (experienceList && Array.isArray(data.experience)) {
    experienceList.innerHTML = '';
    data.experience.forEach((item) => {
      const entry = document.createElement('div');
      entry.className = 'timeline-item glass reveal timeline-card';
      entry.innerHTML = `
        <div class="t-left">
          <div class="timeline-role">${escapeHtml(item.role)}</div>
          <div class="timeline-company">${escapeHtml(item.company || '')}</div>
          <div class="timeline-period">${escapeHtml(item.period || '')}</div>
        </div>
        <div class="t-right timeline-details">${escapeHtml(item.summary || '')}</div>
      `;
      experienceList.appendChild(entry);
    });
  }

  if (main && Array.isArray(data.customSections)) {
    document.querySelectorAll('[data-custom-section="true"]').forEach(el => el.remove());
    data.customSections.forEach((section) => {
      const block = document.createElement('section');
      block.className = 'section reveal';
      block.setAttribute('data-custom-section', 'true');
      block.innerHTML = `
        <h3>${escapeHtml(section.title)}</h3>
        <div class="glass custom-section">
          <p>${escapeHtml(section.body)}</p>
        </div>
      `;
      main.appendChild(block);
    });
  }
}

function initInteractions() {
  initTypewriter();
  initReveal();
  initFlipCards();
}

function initTypewriter() {
  const typewriterEl = document.querySelector('.typewriter');
  if (!typewriterEl) return;
  const text = typewriterEl.dataset.text || '';
  typewriterEl.textContent = '';
  let i = 0;
  function step() {
    if (i < text.length) {
      typewriterEl.textContent += text.charAt(i);
      i++;
      setTimeout(step, 40);
    }
  }
  step();
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

function initFlipCards() {
  document.querySelectorAll('.flip-card').forEach(card => {
    const flipAction = () => card.classList.toggle('flipped');
    card.addEventListener('click', flipAction);
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipAction();
      }
    });
  });
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#039;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
