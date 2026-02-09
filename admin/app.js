const supabaseClient = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_ANON_KEY
);

const adminEmail = 'amankumar110204@gmail.com';

const state = {
  data: null,
  siteId: 1
};

const ui = {
  authSection: document.getElementById('auth-section'),
  editorSection: document.getElementById('editor-section'),
  signOutBtn: document.getElementById('sign-out'),
  loginForm: document.getElementById('login-form'),
  loginEmail: document.getElementById('login-email'),
  loginPassword: document.getElementById('login-password'),
  loginStatus: document.getElementById('login-status'),
  saveBtn: document.getElementById('save-btn'),
  restoreBtn: document.getElementById('restore-btn'),
  saveStatus: document.getElementById('save-status'),
  profileName: document.getElementById('profile-name'),
  profileDegree: document.getElementById('profile-degree'),
  profileRole: document.getElementById('profile-role'),
  aboutText: document.getElementById('about-text'),
  heroEyebrow: document.getElementById('hero-eyebrow'),
  heroHeadline: document.getElementById('hero-headline'),
  heroSubtitle: document.getElementById('hero-subtitle'),
  heroCtaPrimaryLabel: document.getElementById('hero-cta-primary-label'),
  heroCtaPrimaryHref: document.getElementById('hero-cta-primary-href'),
  heroCtaSecondaryLabel: document.getElementById('hero-cta-secondary-label'),
  heroCtaSecondaryHref: document.getElementById('hero-cta-secondary-href'),
  metricsList: document.getElementById('metrics-list'),
  factsList: document.getElementById('facts-list'),
  skillsList: document.getElementById('skills-list'),
  projectsList: document.getElementById('projects-list'),
  experienceList: document.getElementById('experience-list'),
  contactsList: document.getElementById('contacts-list'),
  sectionsList: document.getElementById('sections-list'),
  addFact: document.getElementById('add-fact'),
  addMetric: document.getElementById('add-metric'),
  addSkill: document.getElementById('add-skill'),
  addProject: document.getElementById('add-project'),
  addExperience: document.getElementById('add-experience'),
  addContact: document.getElementById('add-contact'),
  addSection: document.getElementById('add-section')
};

init();

async function init() {
  const { data } = await supabaseClient.auth.getSession();
  handleSession(data.session);
  supabaseClient.auth.onAuthStateChange((_event, session) => {
    handleSession(session);
  });

  ui.loginForm.addEventListener('submit', onLogin);
  ui.signOutBtn.addEventListener('click', () => supabaseClient.auth.signOut());
  ui.saveBtn.addEventListener('click', saveContent);
  ui.restoreBtn.addEventListener('click', restoreLastVersion);
  ui.addMetric.addEventListener('click', () => addListItem('metrics'));
  ui.addFact.addEventListener('click', () => addListItem('facts'));
  ui.addSkill.addEventListener('click', () => addListItem('skills'));
  ui.addProject.addEventListener('click', () => addListItem('projects'));
  ui.addExperience.addEventListener('click', () => addListItem('experience'));
  ui.addContact.addEventListener('click', () => addListItem('contacts'));
  ui.addSection.addEventListener('click', () => addListItem('sections'));
}

function handleSession(session) {
  if (session?.user?.email === adminEmail) {
    ui.authSection.classList.add('hidden');
    ui.editorSection.classList.remove('hidden');
    ui.signOutBtn.classList.remove('hidden');
    loadContent();
  } else {
    ui.authSection.classList.remove('hidden');
    ui.editorSection.classList.add('hidden');
    ui.signOutBtn.classList.add('hidden');
  }
}

async function onLogin(event) {
  event.preventDefault();
  ui.loginStatus.textContent = 'Signing in...';
  const email = ui.loginEmail.value.trim();
  const password = ui.loginPassword.value;
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  ui.loginStatus.textContent = error ? error.message : 'Signed in.';
}

async function loadContent() {
  ui.saveStatus.textContent = 'Loading...';
  const { data, error } = await supabaseClient
    .from('site_content')
    .select('data')
    .eq('id', state.siteId)
    .single();

  if (error) {
    ui.saveStatus.textContent = 'Failed to load data.';
    return;
  }

  state.data = data?.data || defaultData();
  renderForm();
  ui.saveStatus.textContent = '';
}

function renderForm() {
  const data = state.data;
  ui.profileName.value = data.profile?.name || '';
  ui.profileDegree.value = data.profile?.degree || '';
  ui.profileRole.value = data.profile?.role || '';
  ui.aboutText.value = data.aboutText || '';
  ui.heroEyebrow.value = data.hero?.eyebrow || '';
  ui.heroHeadline.value = data.hero?.headline || '';
  ui.heroSubtitle.value = data.hero?.subtitle || '';
  ui.heroCtaPrimaryLabel.value = data.hero?.primaryCtaLabel || '';
  ui.heroCtaPrimaryHref.value = data.hero?.primaryCtaHref || '';
  ui.heroCtaSecondaryLabel.value = data.hero?.secondaryCtaLabel || '';
  ui.heroCtaSecondaryHref.value = data.hero?.secondaryCtaHref || '';

  renderList(ui.metricsList, data.metrics || [], 'metrics');
  renderList(ui.factsList, data.quickFacts || [], 'facts');
  renderList(ui.skillsList, data.skills || [], 'skills');
  renderList(ui.projectsList, data.projects || [], 'projects');
  renderList(ui.experienceList, data.experience || [], 'experience');
  renderList(ui.contactsList, data.contacts || [], 'contacts');
  renderList(ui.sectionsList, data.customSections || [], 'sections');
}

function renderList(container, items, type) {
  container.innerHTML = '';
  items.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'list-item';
    wrapper.appendChild(buildFields(type, item, index));

    const actions = document.createElement('div');
    actions.className = 'list-actions';
    actions.innerHTML = `
      <button class="btn secondary" data-action="up">Move up</button>
      <button class="btn secondary" data-action="down">Move down</button>
      <button class="btn danger" data-action="remove">Remove</button>
    `;
    actions.addEventListener('click', (event) => onListAction(event, type, index));

    wrapper.appendChild(actions);
    container.appendChild(wrapper);
  });
}

function buildFields(type, item, index) {
  const fields = document.createElement('div');
  fields.className = 'fields';
  const input = (label, value, key) => `
    <label>${label}
      <input type="text" value="${escapeAttr(value || '')}" data-type="${type}" data-index="${index}" data-key="${key}" />
    </label>
  `;
  const textarea = (label, value, key) => `
    <label>${label}
      <textarea rows="3" data-type="${type}" data-index="${index}" data-key="${key}">${escapeHtml(value || '')}</textarea>
    </label>
  `;

  if (type === 'facts') {
    fields.innerHTML = input('Icon class (fa-solid)', item.icon, 'icon') + input('Text', item.text, 'text');
  } else if (type === 'metrics') {
    fields.innerHTML = input('Value', item.value, 'value') + input('Label', item.label, 'label');
  } else if (type === 'skills') {
    fields.innerHTML = input('Icon class', item.icon, 'icon') + input('Label', item.label, 'label');
  } else if (type === 'projects') {
    fields.innerHTML =
      input('Title', item.title, 'title') +
      input('Image URL', item.image, 'image') +
      textarea('Summary', item.summary, 'summary') +
      textarea('Details', item.details, 'details') +
      input('Tags (comma separated)', (item.tags || []).join(', '), 'tags') +
      input('Role', item.role, 'role') +
      input('Results', item.results, 'results') +
      input('GitHub URL', item.github, 'github');
  } else if (type === 'experience') {
    fields.innerHTML =
      input('Role', item.role, 'role') +
      input('Company', item.company, 'company') +
      input('Period', item.period, 'period') +
      textarea('Summary', item.summary, 'summary');
  } else if (type === 'contacts') {
    fields.innerHTML =
      input('Icon class', item.icon, 'icon') +
      input('Label', item.label, 'label') +
      input('Value', item.value, 'value') +
      input('Href', item.href, 'href') +
      `<label>Open in new tab
        <select data-type="${type}" data-index="${index}" data-key="targetBlank">
          <option value="true" ${item.targetBlank ? 'selected' : ''}>Yes</option>
          <option value="false" ${!item.targetBlank ? 'selected' : ''}>No</option>
        </select>
      </label>`;
  } else if (type === 'sections') {
    fields.innerHTML = input('Title', item.title, 'title') + textarea('Body', item.body, 'body');
  }

  fields.addEventListener('input', onFieldChange);
  return fields;
}

function onFieldChange(event) {
  const target = event.target;
  const type = target.dataset.type;
  const index = Number(target.dataset.index);
  const key = target.dataset.key;
  if (!type || Number.isNaN(index)) return;

  const data = state.data;
  const list = getListByType(type, data);
  if (!list[index]) return;

  let value = target.value;
  if (key === 'targetBlank') value = value === 'true';
  if (key === 'tags') value = value.split(',').map(tag => tag.trim()).filter(Boolean);
  list[index][key] = value;
}

function onListAction(event, type, index) {
  const action = event.target.dataset.action;
  if (!action) return;
  const list = getListByType(type, state.data);

  if (action === 'remove') {
    list.splice(index, 1);
  }
  if (action === 'up' && index > 0) {
    [list[index - 1], list[index]] = [list[index], list[index - 1]];
  }
  if (action === 'down' && index < list.length - 1) {
    [list[index + 1], list[index]] = [list[index], list[index + 1]];
  }
  renderForm();
}

function addListItem(type) {
  const list = getListByType(type, state.data);
  if (type === 'facts') list.push({ icon: 'fa-graduation-cap', text: 'New fact' });
  if (type === 'metrics') list.push({ value: '0', label: 'New metric' });
  if (type === 'skills') list.push({ icon: 'fab fa-js', label: 'New skill' });
  if (type === 'projects') list.push({ title: 'New project', image: '', summary: '', details: '', tags: [], role: '', results: '', github: '' });
  if (type === 'experience') list.push({ role: 'New role', company: '', period: '', summary: '' });
  if (type === 'contacts') list.push({ icon: 'fa-solid fa-link', label: 'Link', value: '', href: '', targetBlank: true });
  if (type === 'sections') list.push({ title: 'New section', body: '' });
  renderForm();
}

function readForm() {
  state.data.profile = {
    name: ui.profileName.value.trim(),
    degree: ui.profileDegree.value.trim(),
    role: ui.profileRole.value.trim()
  };
  state.data.aboutText = ui.aboutText.value.trim();
  state.data.hero = {
    eyebrow: ui.heroEyebrow.value.trim(),
    headline: ui.heroHeadline.value.trim(),
    subtitle: ui.heroSubtitle.value.trim(),
    primaryCtaLabel: ui.heroCtaPrimaryLabel.value.trim(),
    primaryCtaHref: ui.heroCtaPrimaryHref.value.trim(),
    secondaryCtaLabel: ui.heroCtaSecondaryLabel.value.trim(),
    secondaryCtaHref: ui.heroCtaSecondaryHref.value.trim()
  };
}

async function saveContent() {
  readForm();
  ui.saveStatus.textContent = 'Saving...';

  const { data: current, error: currentError } = await supabaseClient
    .from('site_content')
    .select('data')
    .eq('id', state.siteId)
    .single();

  if (!currentError && current?.data) {
    await supabaseClient.from('site_revisions').insert({
      site_id: state.siteId,
      data: current.data
    });
  }

  const { error } = await supabaseClient
    .from('site_content')
    .upsert({ id: state.siteId, data: state.data }, { onConflict: 'id' });

  ui.saveStatus.textContent = error ? error.message : 'Saved.';
}

async function restoreLastVersion() {
  ui.saveStatus.textContent = 'Restoring...';
  const { data, error } = await supabaseClient
    .from('site_revisions')
    .select('id, data')
    .eq('site_id', state.siteId)
    .order('id', { ascending: false })
    .limit(1);

  if (error || !data?.length) {
    ui.saveStatus.textContent = 'No revision found.';
    return;
  }

  const latest = data[0];
  await supabaseClient
    .from('site_content')
    .upsert({ id: state.siteId, data: latest.data }, { onConflict: 'id' });

  state.data = latest.data;
  renderForm();
  ui.saveStatus.textContent = 'Restored.';
}

function getListByType(type, data) {
  if (type === 'facts') return data.quickFacts || (data.quickFacts = []);
  if (type === 'metrics') return data.metrics || (data.metrics = []);
  if (type === 'skills') return data.skills || (data.skills = []);
  if (type === 'projects') return data.projects || (data.projects = []);
  if (type === 'experience') return data.experience || (data.experience = []);
  if (type === 'contacts') return data.contacts || (data.contacts = []);
  if (type === 'sections') return data.customSections || (data.customSections = []);
  return [];
}

function defaultData() {
  return {
    profile: { name: '', degree: '', role: '' },
    hero: { eyebrow: '', headline: '', subtitle: '', primaryCtaLabel: '', primaryCtaHref: '', secondaryCtaLabel: '', secondaryCtaHref: '' },
    metrics: [],
    aboutText: '',
    quickFacts: [],
    skills: [],
    projects: [],
    experience: [],
    contacts: [],
    customSections: []
  };
}

function escapeAttr(value) {
  return String(value).replace(/"/g, '&quot;');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
