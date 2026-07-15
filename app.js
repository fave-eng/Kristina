(() => {
  'use strict';

  const config = window.APP_CONFIG || {};
  const student = config.student || {};
  const HOMEWORK_DATA = Array.isArray(window.HOMEWORK_DATA) ? window.HOMEWORK_DATA : [];
  const RAW_VOCABULARY_DATA = Array.isArray(window.VOCABULARY_DATA) ? window.VOCABULARY_DATA : [];
  const GRAMMAR_DATA = Array.isArray(window.GRAMMAR_DATA) ? window.GRAMMAR_DATA : [];

  const safeText = (value, fallback = '') => value === undefined || value === null ? fallback : String(value);
  const escapeHtml = (value) => safeText(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const byId = (id) => document.getElementById(id);
  const queryParam = (name) => new URLSearchParams(window.location.search).get(name) || '';
  const unique = (items) => [...new Set(Array.isArray(items) ? items : [])];
  const safePercent = (value, total) => {
    const numerator = Number(value) || 0;
    const denominator = Number(total) || 0;
    if (denominator <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round((numerator / denominator) * 100)));
  };
  const shuffled = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const dateMs = (value) => {
    const time = Date.parse(value || '');
    return Number.isFinite(time) ? time : 0;
  };

  function normalizeWordKey(value) {
    return safeText(value)
      .normalize('NFKC')
      .toLocaleLowerCase('en')
      .replace(/[’‘`]/g, "'")
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/^[\s.,!?;:()[\]{}"“”]+|[\s.,!?;:()[\]{}"“”]+$/g, '');
  }

  function buildVocabularyCatalog(topics) {
    const seen = new Map();
    const byKey = new Map();
    const idToKey = new Map();
    const duplicates = [];
    const preparedTopics = topics.map((topic) => {
      const words = [];
      (Array.isArray(topic.words) ? topic.words : []).forEach((sourceWord) => {
        const wordKey = normalizeWordKey(sourceWord.uniqueKey || sourceWord.en);
        if (!wordKey) return;
        idToKey.set(safeText(sourceWord.id), wordKey);
        if (seen.has(wordKey)) {
          duplicates.push({ wordKey, skippedTopicId: topic.id, firstTopicId: seen.get(wordKey).topicId });
          return;
        }
        const word = { ...sourceWord, __wordKey: wordKey };
        const record = { word, topicId: topic.id };
        seen.set(wordKey, record);
        byKey.set(wordKey, record);
        words.push(word);
      });
      return { ...topic, words };
    });
    if (duplicates.length) {
      console.info('Повторяющиеся слова исключены из словаря:', duplicates);
    }
    return {
      topics: preparedTopics.filter((topic) => topic.words.length > 0),
      allTopics: preparedTopics,
      allWords: [...byKey.values()].map((item) => item.word),
      byKey,
      idToKey,
      duplicates
    };
  }

  const VOCABULARY_CATALOG = buildVocabularyCatalog(RAW_VOCABULARY_DATA);
  const VOCABULARY_DATA = VOCABULARY_CATALOG.topics;

  function showToast(message) {
    const toast = byId('app-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3000);
  }

  const storage = {
    read(key, fallback) {
      try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (error) {
        console.warn('Не удалось прочитать локальный прогресс:', error);
        return fallback;
      }
    },
    write(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.warn('Не удалось сохранить локальный прогресс:', error);
        return false;
      }
    }
  };

  const studentId = safeText(student.id, 'student').toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'student';
  const key = (section) => `english_space_${studentId}_${section}`;
  const tables = {
    homework: config.supabase?.tables?.homework || 'homework_progress',
    vocabulary: config.supabase?.tables?.vocabulary || 'vocabulary_progress',
    vocabularyTopics: config.supabase?.tables?.vocabularyTopics || 'vocabulary_topic_progress',
    grammar: config.supabase?.tables?.grammar || 'grammar_progress'
  };

  const CloudService = {
    client: null,
    user: null,
    syncing: false,
    timers: {},
    isConfigured() {
      return Boolean(
        config.features?.cloudSync &&
        safeText(config.supabase?.url).trim() &&
        safeText(config.supabase?.anonKey).trim() &&
        window.supabase?.createClient
      );
    },
    async init() {
      if (!this.isConfigured()) return null;
      if (!this.client) {
        this.client = window.supabase.createClient(config.supabase.url, config.supabase.anonKey, {
          auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
        });
        this.client.auth.onAuthStateChange((_event, session) => {
          this.user = session?.user || null;
          renderCloudPanel();
        });
      }
      const { data, error } = await this.client.auth.getSession();
      if (error) throw error;
      this.user = data.session?.user || null;
      return this.user;
    },
    async signIn(email, password) {
      if (!this.client) await this.init();
      const { data, error } = await this.client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      this.user = data.user || data.session?.user || null;
      return this.user;
    },
    async signOut() {
      if (!this.client) return;
      const { error } = await this.client.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
    queue(section) {
      if (!this.isConfigured() || !this.user || this.syncing) return;
      window.clearTimeout(this.timers[section]);
      this.timers[section] = window.setTimeout(() => {
        window.ProgressService.syncToCloud(section).catch((error) => {
          console.error('Ошибка облачного сохранения:', error);
          renderCloudPanel('Не удалось сохранить в облако');
        });
      }, 450);
    }
  };

  function normalizeVocabularyProgress(value) {
    const words = value?.words && typeof value.words === 'object' ? { ...value.words } : {};
    const topics = {};
    Object.entries(value?.topics && typeof value.topics === 'object' ? value.topics : {}).forEach(([topicId, topic]) => {
      topics[topicId] = { tests: Array.isArray(topic?.tests) ? topic.tests : [] };
      unique(topic?.known).forEach((legacyId) => {
        const wordKey = VOCABULARY_CATALOG.idToKey.get(safeText(legacyId));
        if (wordKey) words[wordKey] = { status: 'known', topicId, learnedAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      });
      unique(topic?.difficult).forEach((legacyId) => {
        const wordKey = VOCABULARY_CATALOG.idToKey.get(safeText(legacyId));
        if (wordKey && words[wordKey]?.status !== 'known') words[wordKey] = { status: 'difficult', topicId, updatedAt: new Date().toISOString() };
      });
    });
    Object.entries(words).forEach(([wordKey, item]) => {
      if (!['known', 'difficult'].includes(item?.status)) delete words[wordKey];
    });
    return { words, topics };
  }

  window.ProgressService = {
    loadHomeworkProgress() {
      const value = storage.read(key('homework'), {});
      return {
        completedIds: unique(value.completedIds),
        results: value.results && typeof value.results === 'object' ? value.results : {},
        submissions: value.submissions && typeof value.submissions === 'object' ? value.submissions : {}
      };
    },
    saveHomeworkProgress(progress) {
      const ok = storage.write(key('homework'), progress || {});
      CloudService.queue('homework');
      return ok;
    },
    loadVocabularyProgress() {
      return normalizeVocabularyProgress(storage.read(key('vocabulary'), {}));
    },
    saveVocabularyProgress(progress) {
      const normalized = normalizeVocabularyProgress(progress || {});
      const ok = storage.write(key('vocabulary'), normalized);
      const difficult = Object.entries(normalized.words)
        .filter(([, item]) => item.status === 'difficult')
        .map(([wordKey]) => wordKey);
      storage.write(key('difficult_words'), difficult);
      CloudService.queue('vocabulary');
      return ok;
    },
    loadGrammarProgress() {
      const value = storage.read(key('grammar'), {});
      return { topics: value.topics && typeof value.topics === 'object' ? value.topics : {} };
    },
    saveGrammarProgress(progress) {
      const ok = storage.write(key('grammar'), progress || {});
      CloudService.queue('grammar');
      return ok;
    },
    async syncFromCloud() {
      if (!CloudService.isConfigured() || !CloudService.user) return false;
      CloudService.syncing = true;
      renderCloudPanel('Загрузка прогресса…');
      try {
        const client = CloudService.client;
        const [homeworkResponse, vocabularyResponse, vocabularyTopicsResponse, grammarResponse] = await Promise.all([
          client.from(tables.homework).select('*').eq('student_id', studentId),
          client.from(tables.vocabulary).select('*').eq('student_id', studentId),
          client.from(tables.vocabularyTopics).select('*').eq('student_id', studentId),
          client.from(tables.grammar).select('*').eq('student_id', studentId)
        ]);
        [homeworkResponse, vocabularyResponse, vocabularyTopicsResponse, grammarResponse].forEach((response) => {
          if (response.error) throw response.error;
        });

        const homework = this.loadHomeworkProgress();
        (homeworkResponse.data || []).forEach((row) => {
          const localResult = homework.results[row.lesson_id];
          if (!localResult || dateMs(row.updated_at) >= dateMs(localResult.checkedAt)) {
            homework.results[row.lesson_id] = {
              correct: Number(row.score_correct || 0),
              total: Number(row.score_total || 0),
              percent: Number(row.score_percent || 0),
              answers: row.answers && typeof row.answers === 'object' ? row.answers : {},
              checkedAt: row.checked_at || row.updated_at
            };
          }
          if (row.status === 'submitted') {
            homework.submissions[row.lesson_id] = { savedAt: row.submitted_at || row.updated_at, status: 'cloud' };
          }
          if (Number(row.score_total) > 0 && Number(row.score_correct) === Number(row.score_total)) {
            homework.completedIds.push(row.lesson_id);
          }
        });
        homework.completedIds = unique(homework.completedIds);
        storage.write(key('homework'), homework);

        const vocabulary = this.loadVocabularyProgress();
        (vocabularyResponse.data || []).forEach((row) => {
          const local = vocabulary.words[row.word_key];
          if (!local || dateMs(row.updated_at) >= dateMs(local.updatedAt)) {
            vocabulary.words[row.word_key] = {
              status: row.status,
              topicId: row.source_topic_id || '',
              learnedAt: row.learned_at || null,
              updatedAt: row.updated_at
            };
          }
        });
        (vocabularyTopicsResponse.data || []).forEach((row) => {
          const localTests = vocabulary.topics[row.topic_id]?.tests || [];
          const cloudTests = Array.isArray(row.tests) ? row.tests : [];
          const merged = new Map();
          [...localTests, ...cloudTests].forEach((test) => merged.set(test.completedAt || JSON.stringify(test), test));
          vocabulary.topics[row.topic_id] = { tests: [...merged.values()] };
        });
        storage.write(key('vocabulary'), normalizeVocabularyProgress(vocabulary));

        const grammar = this.loadGrammarProgress();
        (grammarResponse.data || []).forEach((row) => {
          const local = grammar.topics[row.topic_id] || {};
          grammar.topics[row.topic_id] = {
            passed: Boolean(local.passed || row.passed),
            attempts: Math.max(Number(local.attempts || 0), Number(row.attempts || 0)),
            bestScore: Math.max(Number(local.bestScore || 0), Number(row.best_score || 0)),
            updatedAt: dateMs(row.updated_at) >= dateMs(local.updatedAt) ? row.updated_at : local.updatedAt
          };
        });
        storage.write(key('grammar'), grammar);
        await this.syncToCloud();
        renderCloudPanel('Синхронизировано');
        return true;
      } finally {
        CloudService.syncing = false;
      }
    },
    async syncToCloud(section = 'all') {
      if (!CloudService.isConfigured() || !CloudService.user) return false;
      const client = CloudService.client;
      const userId = CloudService.user.id;
      const sections = section === 'all' ? ['homework', 'vocabulary', 'grammar'] : [section];
      renderCloudPanel('Сохранение…');

      if (sections.includes('homework')) {
        const progress = this.loadHomeworkProgress();
        const lessonIds = unique([...Object.keys(progress.results), ...Object.keys(progress.submissions)]);
        const rows = lessonIds.map((lessonId) => {
          const result = progress.results[lessonId] || {};
          const submission = progress.submissions[lessonId];
          const lesson = HOMEWORK_DATA.find((item) => item.id === lessonId) || {};
          const total = Number(result.total || 0);
          const correct = Number(result.correct || 0);
          return {
            user_id: userId,
            student_id: studentId,
            student_name: safeText(student.nameRu || student.nameEn),
            lesson_id: lessonId,
            lesson_title: safeText(lesson.title, lessonId),
            status: submission ? 'submitted' : 'checked',
            answers: result.answers && typeof result.answers === 'object' ? result.answers : {},
            score_correct: total > 0 ? correct : null,
            score_total: total > 0 ? total : null,
            score_percent: total > 0 ? safePercent(correct, total) : null,
            checked_at: result.checkedAt || null,
            submitted_at: submission?.savedAt || null
          };
        });
        if (rows.length) {
          const { error } = await client.from(tables.homework).upsert(rows, { onConflict: 'user_id,student_id,lesson_id' });
          if (error) throw error;
        }
      }

      if (sections.includes('vocabulary')) {
        const progress = this.loadVocabularyProgress();
        const wordRows = Object.entries(progress.words).filter(([wordKey]) => VOCABULARY_CATALOG.byKey.has(wordKey)).map(([wordKey, state]) => {
          const record = VOCABULARY_CATALOG.byKey.get(wordKey);
          return {
            user_id: userId,
            student_id: studentId,
            word_key: wordKey,
            word_id: safeText(record?.word?.id, wordKey),
            en: safeText(record?.word?.en, wordKey),
            ru: safeText(record?.word?.ru),
            source_topic_id: state.topicId || record?.topicId || null,
            status: state.status,
            learned_at: state.status === 'known' ? (state.learnedAt || new Date().toISOString()) : null
          };
        });
        if (wordRows.length) {
          const { error } = await client.from(tables.vocabulary).upsert(wordRows, { onConflict: 'user_id,student_id,word_key' });
          if (error) throw error;
        }
        const topicRows = Object.entries(progress.topics)
          .filter(([, topic]) => Array.isArray(topic.tests) && topic.tests.length)
          .map(([topicId, topic]) => ({ user_id: userId, student_id: studentId, topic_id: topicId, tests: topic.tests }));
        if (topicRows.length) {
          const { error } = await client.from(tables.vocabularyTopics).upsert(topicRows, { onConflict: 'user_id,student_id,topic_id' });
          if (error) throw error;
        }
      }

      if (sections.includes('grammar')) {
        const progress = this.loadGrammarProgress();
        const rows = Object.entries(progress.topics).map(([topicId, state]) => ({
          user_id: userId,
          student_id: studentId,
          topic_id: topicId,
          passed: Boolean(state.passed),
          attempts: Number(state.attempts || 0),
          best_score: Number(state.bestScore || 0)
        }));
        if (rows.length) {
          const { error } = await client.from(tables.grammar).upsert(rows, { onConflict: 'user_id,student_id,topic_id' });
          if (error) throw error;
        }
      }
      renderCloudPanel('Сохранено в облаке');
      return true;
    }
  };

  function renderCloudPanel(message = '') {
    if (!CloudService.isConfigured()) return;
    const main = document.querySelector('main');
    if (!main) return;
    let panel = byId('cloud-sync-panel');
    if (!panel) {
      panel = document.createElement('section');
      panel.id = 'cloud-sync-panel';
      panel.className = 'cloud-sync-panel reveal';
      main.prepend(panel);
    }
    if (CloudService.user) {
      panel.innerHTML = `<div><strong>☁️ Облачный прогресс включён</strong><p>${escapeHtml(message || 'Данные сохраняются локально и в Supabase.')}</p></div><button class="btn btn-ghost btn-small" id="cloud-sign-out" type="button">Выйти</button>`;
      byId('cloud-sign-out').onclick = async () => {
        try {
          await CloudService.signOut();
          renderCloudPanel('Выход выполнен');
        } catch (error) {
          showToast(`Ошибка выхода: ${error.message}`);
        }
      };
      return;
    }
    panel.innerHTML = `<div class="cloud-login-copy"><strong>☁️ Вход для сохранения прогресса</strong><p>${escapeHtml(message || 'Без входа данные остаются только на этом устройстве.')}</p></div><form id="cloud-login-form" class="cloud-login-form"><label><span>Email</span><input class="text-field" id="cloud-email" type="email" autocomplete="username" required></label><label><span>Пароль</span><input class="text-field" id="cloud-password" type="password" autocomplete="current-password" required></label><button class="btn btn-primary" id="cloud-login-button" type="submit">Войти</button></form>`;
    byId('cloud-login-form').onsubmit = async (event) => {
      event.preventDefault();
      const button = byId('cloud-login-button');
      button.disabled = true;
      try {
        await CloudService.signIn(byId('cloud-email').value.trim(), byId('cloud-password').value);
        await window.ProgressService.syncFromCloud();
        refreshCurrentView();
        showToast('Прогресс синхронизирован с Supabase');
      } catch (error) {
        renderCloudPanel('Проверьте email и пароль.');
        showToast(`Не удалось войти: ${error.message}`);
      } finally {
        if (byId('cloud-login-button')) byId('cloud-login-button').disabled = false;
      }
    };
  }

  function fillConfig() {
    const values = {
      nameRu: student.nameRu,
      nameEn: student.nameEn,
      level: student.level,
      textbook: student.textbook,
      textbookEdition: student.textbookEdition
    };
    document.querySelectorAll('[data-config]').forEach((node) => {
      node.textContent = safeText(values[node.dataset.config]);
    });
    if (student.nameEn) document.title = `${document.title} · ${student.nameEn}`;
  }

  function markNavigation() {
    const page = document.body.dataset.page;
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const active = link.dataset.nav === page;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
    });
  }

  function progressMarkup(label, value, total, tone = '') {
    const percent = safePercent(value, total);
    return `<div class="progress-row">
      <div class="progress-row-head"><strong>${escapeHtml(label)}</strong><span>${Number(value) || 0} из ${Number(total) || 0}</span></div>
      <div class="progress-track" role="progressbar" aria-label="${escapeHtml(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}">
        <div class="progress-fill ${tone}" style="width:${percent}%"></div>
      </div>
    </div>`;
  }

  function totals() {
    const hwProgress = window.ProgressService.loadHomeworkProgress();
    const vocabProgress = window.ProgressService.loadVocabularyProgress();
    const grammarProgress = window.ProgressService.loadGrammarProgress();
    const publishedHomework = HOMEWORK_DATA.filter((item) => ['available', 'completed', 'locked'].includes(item.status));
    const completedHomework = publishedHomework.filter((item) => hwProgress.completedIds.includes(item.id) || item.status === 'completed').length;
    const knownWordKeys = Object.entries(vocabProgress.words).filter(([wordKey, item]) => VOCABULARY_CATALOG.byKey.has(wordKey) && item.status === 'known').map(([wordKey]) => wordKey);
    const passedGrammar = GRAMMAR_DATA.filter((topic) => grammarProgress.topics[topic.id]?.passed === true || topic.passed === true).length;
    return {
      homeworkTotal: publishedHomework.length,
      homeworkCompleted: completedHomework,
      vocabularyTotal: VOCABULARY_CATALOG.allWords.length,
      vocabularyKnown: knownWordKeys.length,
      vocabularyTopics: VOCABULARY_DATA.length,
      grammarTotal: GRAMMAR_DATA.filter((topic) => topic.status !== 'draft').length,
      grammarPassed: passedGrammar
    };
  }

  function emptyState(icon, title, text) {
    return `<div class="card empty-state"><div class="empty-state-icon">${icon}</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div>`;
  }

  function renderHome() {
    const t = totals();
    if (byId('home-stat-completed')) byId('home-stat-completed').textContent = t.homeworkCompleted;
    if (byId('vocab-stat-known')) byId('vocab-stat-known').textContent = t.vocabularyKnown;
    if (byId('grammar-stat-passed')) byId('grammar-stat-passed').textContent = t.grammarPassed;
    const list = byId('home-progress-list');
    if (list) list.innerHTML = [
      progressMarkup('Домашние задания', t.homeworkCompleted, t.homeworkTotal),
      progressMarkup('Словарный запас', t.vocabularyKnown, t.vocabularyTotal, 'rose'),
      progressMarkup('Грамматика', t.grammarPassed, t.grammarTotal, 'green')
    ].join('');
    const current = byId('current-material');
    if (current) {
      const homeworkProgress = window.ProgressService.loadHomeworkProgress();
      const currentHomework = HOMEWORK_DATA
        .filter((item) => item.status === 'available' && !homeworkProgress.completedIds.includes(item.id))
        .sort((a, b) => dateMs(b.publishedAt) - dateMs(a.publishedAt) || Number(b.number || 0) - Number(a.number || 0))[0];

      if (currentHomework) {
        const href = currentHomework.page || `lesson.html?id=${encodeURIComponent(currentHomework.id)}`;
        current.innerHTML = `<a class="card interactive item-card current-material-card" href="${escapeHtml(href)}">
          <div class="item-icon">✨</div>
          <div class="item-main"><h3>${escapeHtml(safeText(currentHomework.title, 'Текущее задание'))}</h3><p>${escapeHtml(safeText(currentHomework.subtitle, 'Продолжить работу с опубликованным материалом.'))}</p></div>
          <span class="status-badge status-available">Продолжить</span>
        </a>`;
      } else {
        const publishedHomework = HOMEWORK_DATA.filter((item) => ['available', 'completed'].includes(item.status));
        const everythingCompleted = publishedHomework.length > 0 && publishedHomework.every((item) => item.status === 'completed' || homeworkProgress.completedIds.includes(item.id));
        current.innerHTML = everythingCompleted
          ? '<a class="card interactive item-card current-material-card" href="homework.html"><div class="item-icon">✅</div><div class="item-main"><h3>Все опубликованные материалы выполнены</h3><p>Новый материал появится после следующей публикации преподавателя.</p></div><span class="arrow" aria-hidden="true">→</span></a>'
          : '<div class="card disabled empty-state"><div class="empty-state-icon">✨</div><h3>Текущий материал пока не опубликован</h3><p>Здесь автоматически появится последнее доступное домашнее задание.</p></div>';
      }
    }
  }

  function renderHomework() {
    const progress = window.ProgressService.loadHomeworkProgress();
    const published = HOMEWORK_DATA.filter((item) => item.status !== 'draft');
    const completed = published.filter((item) => progress.completedIds.includes(item.id) || item.status === 'completed').length;
    const percent = safePercent(completed, published.length);
    byId('hw-completed').textContent = completed;
    byId('hw-total').textContent = published.length;
    byId('hw-percent').textContent = `${percent}%`;
    byId('hw-overall-progress').innerHTML = progressMarkup('Общий прогресс', completed, published.length);
    const root = byId('homework-list');
    if (!published.length) {
      root.innerHTML = emptyState('📝', 'Домашних заданий пока нет', 'После первого урока преподаватель добавит сюда интерактивное задание.');
      return;
    }
    root.innerHTML = [...published].sort((a,b) => (a.number || 0) - (b.number || 0)).map((item) => {
      const locked = item.status === 'locked';
      const complete = progress.completedIds.includes(item.id) || item.status === 'completed';
      const title = locked ? '🔒 Coming soon' : safeText(item.title, 'Задание');
      const subtitle = locked ? 'Материал откроется после публикации преподавателем.' : safeText(item.subtitle, 'Интерактивное задание');
      const status = complete ? 'completed' : safeText(item.status, 'available');
      const label = complete ? 'Выполнено' : status === 'available' ? 'Доступно' : status === 'locked' ? 'Закрыто' : 'Черновик';
      const tag = locked ? 'div' : 'a';
      const href = locked ? '' : ` href="${escapeHtml(item.page || `lesson.html?id=${encodeURIComponent(item.id)}`)}"`;
      return `<${tag} class="card item-card ${locked ? 'disabled' : 'interactive'}"${href}>
        <div class="item-icon">${complete ? '✅' : locked ? '🔒' : '📝'}</div>
        <div class="item-main"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(subtitle)}</p></div>
        <span class="status-badge status-${escapeHtml(status)}">${escapeHtml(label)}</span>
      </${tag}>`;
    }).join('');
  }

  function renderGrammar() {
    const progress = window.ProgressService.loadGrammarProgress();
    const published = GRAMMAR_DATA.filter((topic) => topic.status !== 'draft');
    const passed = published.filter((topic) => progress.topics[topic.id]?.passed || topic.passed).length;
    byId('grammar-passed').textContent = passed;
    byId('grammar-total').textContent = published.length;
    byId('grammar-overall-progress').innerHTML = progressMarkup('Общий прогресс', passed, published.length, 'green');
    const root = byId('grammar-list');
    if (!published.length) {
      root.innerHTML = emptyState('📐', 'Грамматические темы пока не опубликованы', `Материалы будут добавляться в соответствии с уроками и учебником «${safeText(student.textbook)}».`);
      return;
    }
    root.innerHTML = [...published].sort((a,b) => (a.order || 0) - (b.order || 0)).map((topic) => {
      const locked = topic.status === 'locked';
      const isPassed = progress.topics[topic.id]?.passed || topic.passed;
      const title = locked ? '🔒 Coming soon' : safeText(topic.title, 'Грамматическая тема');
      const tag = locked ? 'div' : 'a';
      const href = locked ? '' : ` href="${escapeHtml(topic.page || `grammar-topic.html?id=${encodeURIComponent(topic.id)}`)}"`;
      return `<${tag} class="card item-card ${locked ? 'disabled' : 'interactive'}"${href}>
        <div class="item-icon">${isPassed ? '✅' : locked ? '🔒' : '📐'}</div>
        <div class="item-main"><h3>${escapeHtml(title)}</h3><p>${locked ? 'Материал ещё не опубликован.' : `${escapeHtml(topic.level || student.level)} · ${Number(progress.topics[topic.id]?.attempts || topic.attempts || 0)} попыток`}</p></div>
        <span class="status-badge status-${isPassed ? 'completed' : locked ? 'locked' : 'available'}">${isPassed ? 'Пройдено' : locked ? 'Закрыто' : 'Открыть'}</span>
      </${tag}>`;
    }).join('');
  }

  function renderVocabularyHub() {
    const progress = window.ProgressService.loadVocabularyProgress();
    const totalWords = VOCABULARY_CATALOG.allWords.length;
    const knownCount = Object.entries(progress.words).filter(([wordKey, item]) => VOCABULARY_CATALOG.byKey.has(wordKey) && item.status === 'known').length;
    byId('vocab-known').textContent = knownCount;
    byId('vocab-total').textContent = totalWords;
    byId('vocab-topics').textContent = VOCABULARY_DATA.length;
    byId('vocab-percent').textContent = `${safePercent(knownCount, totalWords)}%`;
    byId('vocab-overall-progress').innerHTML = progressMarkup('Общий прогресс', knownCount, totalWords, 'rose');
    const root = byId('vocabulary-list');
    const filters = byId('vocab-filters');

    const draw = (filter = 'all') => {
      const filtered = VOCABULARY_DATA.filter((topic) => {
        const topicKnown = topic.words.filter((word) => progress.words[word.__wordKey]?.status === 'known').length;
        const complete = topic.words.length > 0 && topicKnown >= topic.words.length;
        if (filter === 'completed') return complete;
        if (filter === 'lesson') return topic.type === 'lesson';
        if (filter === 'extra') return topic.type === 'extra';
        return true;
      });
      if (!filtered.length) {
        root.innerHTML = emptyState('💥', 'Словарных тренажёров пока нет', 'Новые темы появятся после уроков. Повторяющиеся слова автоматически исключаются.');
        return;
      }
      root.innerHTML = filtered.map((topic) => {
        const wordCount = topic.words.length;
        const topicKnown = topic.words.filter((word) => progress.words[word.__wordKey]?.status === 'known').length;
        const complete = wordCount > 0 && topicKnown >= wordCount;
        return `<a class="card item-card interactive" href="${escapeHtml(topic.page || `vocabulary.html?id=${encodeURIComponent(topic.id)}`)}">
          <div class="item-icon">${escapeHtml(topic.icon || '💬')}</div>
          <div class="item-main"><h3>${escapeHtml(topic.title || 'Словарная тема')}</h3><p>${escapeHtml(topic.label || '')} · ${topicKnown} из ${wordCount} слов</p></div>
          <span class="status-badge status-${complete ? 'completed' : 'available'}">${complete ? 'Завершено' : 'Открыть'}</span>
        </a>`;
      }).join('');
    };
    if (filters) {
      filters.onclick = (event) => {
        const button = event.target.closest('[data-filter]');
        if (!button) return;
        filters.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
        draw(button.dataset.filter);
      };
    }
    draw();
  }

  function renderLessonBlock(block, index) {
    const id = safeText(block.id, `task-${index}`);
    const title = escapeHtml(block.title || block.prompt || `Задание ${index + 1}`);
    const text = escapeHtml(block.text || '').replaceAll('\n', '<br>');
    if (block.type === 'info') return `<article class="card info-card lesson-block"><h3>${title}</h3><p>${text}</p></article>`;
    if (block.type === 'tip') return `<article class="card tip-card lesson-block"><h3>${title}</h3><p>${text}</p></article>`;
    if (block.type === 'text' || block.type === 'translate') return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="${escapeHtml(block.type)}"><label class="field-label" for="${escapeHtml(id)}">${title}</label>${block.source ? `<p class="muted">${escapeHtml(block.source)}</p>` : ''}<input class="text-field" id="${escapeHtml(id)}" name="${escapeHtml(id)}" autocomplete="off"><div class="feedback"></div></article>`;
    if (block.type === 'textarea') return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="textarea"><label class="field-label" for="${escapeHtml(id)}">${title}</label><textarea id="${escapeHtml(id)}" name="${escapeHtml(id)}"></textarea><div class="feedback"></div></article>`;
    if (block.type === 'single' || block.type === 'multiple') {
      const inputType = block.type === 'single' ? 'radio' : 'checkbox';
      const options = (block.options || []).map((option, optionIndex) => `<label class="option"><input type="${inputType}" name="${escapeHtml(id)}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join('');
      return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="${escapeHtml(block.type)}"><h3>${title}</h3><div class="option-list">${options}</div><div class="feedback"></div></article>`;
    }
    if (block.type === 'select') {
      const options = (block.options || []).map((option, optionIndex) => `<option value="${optionIndex}">${escapeHtml(option)}</option>`).join('');
      return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="select"><label class="field-label" for="${escapeHtml(id)}">${title}</label><select id="${escapeHtml(id)}"><option value="">Выберите ответ</option>${options}</select><div class="feedback"></div></article>`;
    }
    if (block.type === 'match') {
      const rights = (block.pairs || []).map((pair) => pair.right);
      const rows = (block.pairs || []).map((pair, pairIndex) => `<div>${escapeHtml(pair.left)}</div><select data-match-index="${pairIndex}"><option value="">Выберите пару</option>${rights.map((right, rightIndex) => `<option value="${rightIndex}">${escapeHtml(right)}</option>`).join('')}</select>`).join('');
      return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="match"><h3>${title}</h3><div class="match-grid">${rows}</div><div class="feedback"></div></article>`;
    }
    if (block.type === 'reorder') {
      const chips = shuffled(block.words || []).map((word) => `<button class="word-chip" type="button" data-word="${escapeHtml(word)}">${escapeHtml(word)}</button>`).join('');
      return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="reorder"><h3>${title}</h3><div class="word-chips" data-reorder-source>${chips}</div><label class="field-label" for="${escapeHtml(id)}">Собранный ответ</label><input class="text-field" id="${escapeHtml(id)}" readonly><div class="feedback"></div></article>`;
    }
    if (block.type === 'audio') {
      const player = block.audio ? `<audio class="audio-player" controls preload="none" src="${escapeHtml(block.audio)}"></audio>` : '<p class="muted">Аудиофайл ещё не прикреплён.</p>';
      return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="audio"><h3>${title}</h3>${player}<input class="text-field" id="${escapeHtml(id)}" aria-label="Ответ на аудиозадание"><div class="feedback"></div></article>`;
    }
    if (block.type === 'reading') {
      return `<article class="card lesson-block"><h3>${title}</h3><p>${text}</p></article>`;
    }
    return '';
  }

  function normalizeAnswer(value) {
    return safeText(value).trim().toLocaleLowerCase('en').replace(/\s+/g, ' ');
  }

  function checkLessonTask(block, node) {
    let actual;
    let correct = false;
    if (block.type === 'single') {
      actual = node.querySelector('input:checked')?.value;
      correct = Number(actual) === Number(block.answer);
    } else if (block.type === 'multiple') {
      actual = [...node.querySelectorAll('input:checked')].map((input) => Number(input.value)).sort((a,b) => a-b);
      const expected = [...(block.answer || [])].map(Number).sort((a,b) => a-b);
      correct = JSON.stringify(actual) === JSON.stringify(expected);
    } else if (block.type === 'select') {
      actual = node.querySelector('select')?.value;
      correct = Number(actual) === Number(block.answer);
    } else if (block.type === 'match') {
      actual = [...node.querySelectorAll('[data-match-index]')].map((select) => Number(select.value));
      correct = actual.length > 0 && actual.every((value, index) => value === index);
    } else {
      actual = node.querySelector('input, textarea')?.value || '';
      if (Array.isArray(block.answer)) correct = block.answer.some((answer) => normalizeAnswer(answer) === normalizeAnswer(actual));
      else correct = normalizeAnswer(block.answer) !== '' && normalizeAnswer(block.answer) === normalizeAnswer(actual);
    }
    return { correct, actual };
  }

  function renderLesson() {
    const id = queryParam('id');
    const lesson = HOMEWORK_DATA.find((item) => item.id === id && item.status !== 'draft');
    const root = byId('lesson-root');
    if (!lesson || lesson.status === 'locked') {
      root.innerHTML = emptyState('📝', 'Задание ещё не опубликовано', 'Преподаватель добавит материал после урока.');
      return;
    }
    byId('lesson-hero-title').textContent = safeText(lesson.title, 'Задание');
    byId('lesson-hero-subtitle').textContent = safeText(lesson.subtitle, 'Интерактивная практика');
    const blocks = Array.isArray(lesson.blocks) ? lesson.blocks : [];
    if (!blocks.length) {
      root.innerHTML = emptyState('📝', 'Задание ещё не опубликовано', 'Содержание появится после подготовки преподавателем.');
      return;
    }
    root.innerHTML = `<div class="card"><span class="eyebrow">Домашнее задание</span><h2>${escapeHtml(lesson.title)}</h2><p class="muted">${escapeHtml(lesson.subtitle || '')}</p></div>
      <div id="lesson-blocks">${blocks.map(renderLessonBlock).join('')}</div>
      <div class="card section"><div id="lesson-result" aria-live="polite"></div><div class="button-row"><button class="btn btn-primary" id="check-lesson" type="button">Проверить ответы</button><button class="btn btn-secondary" id="submit-lesson" type="button" disabled>Отправить преподавателю</button></div></div>`;

    root.querySelectorAll('[data-reorder-source]').forEach((source) => {
      source.addEventListener('click', (event) => {
        const chip = event.target.closest('[data-word]');
        if (!chip) return;
        chip.classList.toggle('selected');
        const parent = source.closest('[data-task]');
        const input = parent.querySelector('input');
        const selected = [...source.querySelectorAll('.selected')].map((item) => item.dataset.word);
        input.value = selected.join(' ');
      });
    });

    byId('check-lesson').addEventListener('click', () => {
      const checkable = blocks.filter((block) => ['text','textarea','single','multiple','select','match','reorder','translate','audio'].includes(block.type));
      let correct = 0;
      const answers = {};
      checkable.forEach((block, index) => {
        const taskId = safeText(block.id, `task-${index}`);
        const node = root.querySelector(`[data-task="${CSS.escape(taskId)}"]`);
        if (!node) return;
        const result = checkLessonTask(block, node);
        answers[taskId] = result.actual;
        if (result.correct) correct += 1;
        const feedback = node.querySelector('.feedback');
        feedback.className = `feedback show ${result.correct ? 'good' : 'bad'}`;
        feedback.textContent = result.correct ? 'Верно!' : safeText(block.explanation, 'Проверь ответ и попробуй ещё раз.');
      });
      const percent = safePercent(correct, checkable.length);
      byId('lesson-result').innerHTML = `<h3>Результат: ${correct} из ${checkable.length}</h3><p class="muted">${percent}% правильных ответов</p>`;
      const progress = window.ProgressService.loadHomeworkProgress();
      progress.results[lesson.id] = { correct, total: checkable.length, percent, answers, checkedAt: new Date().toISOString() };
      if (checkable.length > 0 && correct === checkable.length && !progress.completedIds.includes(lesson.id)) progress.completedIds.push(lesson.id);
      window.ProgressService.saveHomeworkProgress(progress);
      byId('submit-lesson').disabled = false;
    });
    byId('submit-lesson').addEventListener('click', () => {
      const progress = window.ProgressService.loadHomeworkProgress();
      progress.submissions[lesson.id] = { savedAt: new Date().toISOString(), status: CloudService.user ? 'pending-cloud' : 'local' };
      window.ProgressService.saveHomeworkProgress(progress);
      showToast(CloudService.user ? 'Ответы сохранены и отправляются в Supabase.' : 'Ответы сохранены на устройстве. Войдите, чтобы отправить их в Supabase.');
    });
  }

  function grammarTable(table) {
    if (!table || !Array.isArray(table.headers) || !Array.isArray(table.rows)) return '';
    return `<div class="table-wrap"><table><thead><tr>${table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead><tbody>${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function renderGrammarTopic() {
    const id = queryParam('id');
    const topic = GRAMMAR_DATA.find((item) => item.id === id && item.status !== 'draft');
    const root = byId('grammar-topic-root');
    if (!topic || topic.status === 'locked') {
      root.innerHTML = emptyState('📐', 'Грамматическая тема ещё не опубликована', 'Материал появится после публикации преподавателем.');
      return;
    }
    byId('grammar-hero-title').textContent = safeText(topic.title, 'Грамматика');
    byId('grammar-hero-subtitle').textContent = `${safeText(topic.level, student.level)} Level · теория и практика`;
    const examples = Array.isArray(topic.examples) ? topic.examples : [];
    const mistakes = Array.isArray(topic.commonMistakes) ? topic.commonMistakes : [];
    const quiz = Array.isArray(topic.quiz) ? topic.quiz : [];
    root.innerHTML = `
      <article class="card"><span class="eyebrow">Объяснение</span><h2>${escapeHtml(topic.title)}</h2><p class="muted">${escapeHtml(topic.explanation || '')}</p></article>
      ${topic.formula ? `<article class="card lesson-block tip-card"><h3>Формула</h3><p>${escapeHtml(topic.formula)}</p></article>` : ''}
      ${topic.affirmative ? `<article class="card lesson-block"><h3>Утвердительная форма</h3><p>${escapeHtml(topic.affirmative)}</p></article>` : ''}
      ${topic.negative ? `<article class="card lesson-block"><h3>Отрицательная форма</h3><p>${escapeHtml(topic.negative)}</p></article>` : ''}
      ${topic.question ? `<article class="card lesson-block"><h3>Вопросительная форма</h3><p>${escapeHtml(topic.question)}</p></article>` : ''}
      ${topic.table ? `<article class="card lesson-block"><h3>Таблица</h3>${grammarTable(topic.table)}</article>` : ''}
      ${examples.length ? `<article class="card lesson-block"><h3>Примеры</h3><div class="list">${examples.map((example) => `<p>• ${escapeHtml(example)}</p>`).join('')}</div></article>` : ''}
      ${mistakes.length ? `<article class="card lesson-block info-card"><h3>Частые ошибки русскоговорящих</h3><div class="list">${mistakes.map((mistake) => `<p>• ${escapeHtml(mistake)}</p>`).join('')}</div></article>` : ''}
      <section class="section" aria-labelledby="mini-test-title"><div class="section-heading"><div><span class="eyebrow">Практика</span><h2 id="mini-test-title">Мини-тест</h2></div></div><div id="grammar-quiz"></div></section>`;
    const quizRoot = byId('grammar-quiz');
    if (!quiz.length) {
      quizRoot.innerHTML = emptyState('🧩', 'Мини-тест ещё не добавлен', 'Вопросы появятся вместе с материалом преподавателя.');
      return;
    }
    const renderQuiz = () => {
      quizRoot.innerHTML = `${quiz.map((question, index) => `<article class="card lesson-block" data-grammar-question="${index}"><h3>${index + 1}. ${escapeHtml(question.prompt)}</h3><div class="option-list">${(question.options || []).map((option, optionIndex) => `<label class="option"><input type="radio" name="grammar-${index}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join('')}</div><div class="feedback"></div></article>`).join('')}<div class="card section"><div id="grammar-result"></div><div class="button-row"><button class="btn btn-primary" type="button" id="check-grammar">Проверить</button><button class="btn btn-secondary" type="button" id="retry-grammar">Повторить</button></div></div>`;
      byId('check-grammar').addEventListener('click', () => {
        let correct = 0;
        quiz.forEach((question, index) => {
          const node = quizRoot.querySelector(`[data-grammar-question="${index}"]`);
          const selected = node.querySelector('input:checked');
          const isCorrect = selected && Number(selected.value) === Number(question.answer);
          if (isCorrect) correct += 1;
          const feedback = node.querySelector('.feedback');
          feedback.className = `feedback show ${isCorrect ? 'good' : 'bad'}`;
          feedback.textContent = isCorrect ? 'Верно!' : safeText(question.explanation, 'Проверь правило и попробуй ещё раз.');
        });
        const percent = safePercent(correct, quiz.length);
        byId('grammar-result').innerHTML = `<h3>Результат: ${correct} из ${quiz.length}</h3><p class="muted">${percent}% правильных ответов</p>`;
        const progress = window.ProgressService.loadGrammarProgress();
        const previous = progress.topics[topic.id] || {};
        progress.topics[topic.id] = { passed: percent === 100, attempts: Number(previous.attempts || 0) + 1, bestScore: Math.max(Number(previous.bestScore || 0), percent), updatedAt: new Date().toISOString() };
        window.ProgressService.saveGrammarProgress(progress);
      });
      byId('retry-grammar').addEventListener('click', renderQuiz);
    };
    renderQuiz();
  }

  function getTopicProgress(progress, topicId) {
    if (!progress.topics[topicId]) progress.topics[topicId] = { tests: [] };
    if (!Array.isArray(progress.topics[topicId].tests)) progress.topics[topicId].tests = [];
    return progress.topics[topicId];
  }

  function setWordStatus(progress, word, topicId, status) {
    const now = new Date().toISOString();
    const previous = progress.words[word.__wordKey] || {};
    progress.words[word.__wordKey] = {
      status,
      topicId: previous.topicId || topicId,
      learnedAt: status === 'known' ? (previous.learnedAt || now) : null,
      updatedAt: now
    };
  }

  function renderVocabulary() {
    const id = queryParam('id');
    const topic = VOCABULARY_CATALOG.allTopics.find((item) => item.id === id);
    const root = byId('vocabulary-root');
    if (!topic || !Array.isArray(topic.words) || !topic.words.length) {
      root.innerHTML = emptyState('💥', 'Слова для этой темы ещё не добавлены', 'Преподаватель добавит список слов после урока. Повторы из предыдущих тем здесь не показываются.');
      return;
    }
    byId('vocab-hero-title').textContent = safeText(topic.title, 'Vocabulary');
    byId('vocab-hero-subtitle').textContent = `${safeText(topic.label, 'Словарная тема')} · ${topic.words.length} уникальных слов`;
    const progress = window.ProgressService.loadVocabularyProgress();
    const topicProgress = getTopicProgress(progress, topic.id);
    let mode = 'cards';
    let cardQueue = [];
    let testState = null;

    root.innerHTML = `<div class="mode-tabs" id="vocab-modes" aria-label="Режим тренировки">
      <button class="mode-btn active" type="button" data-mode="cards">Новые слова</button>
      <button class="mode-btn" type="button" data-mode="test">Тест</button>
      <button class="mode-btn" type="button" data-mode="all">Все слова</button>
      <button class="mode-btn" type="button" data-mode="difficult">Сложные слова</button>
    </div><div id="vocab-mode-root" class="section"></div>`;
    const modeRoot = byId('vocab-mode-root');

    const save = () => window.ProgressService.saveVocabularyProgress(progress);
    const resetCardQueue = () => {
      cardQueue = shuffled(topic.words.filter((word) => {
        const status = progress.words[word.__wordKey]?.status;
        return mode === 'difficult' ? status === 'difficult' : status !== 'known';
      }));
    };

    const drawCard = () => {
      if (!cardQueue.length) {
        const isDifficult = mode === 'difficult';
        modeRoot.innerHTML = emptyState(
          isDifficult ? '🌟' : '🎉',
          isDifficult ? 'Сложных слов пока нет' : 'Новые слова в этой теме закончились',
          isDifficult ? 'Отметьте слово кнопкой «Трудно», и оно появится здесь.' : 'Выученные слова остаются в разделе «Все слова» и не повторяются в режиме новых слов.'
        );
        return;
      }
      const word = cardQueue[0];
      const remaining = cardQueue.length;
      modeRoot.innerHTML = `<div class="flash-counter">Осталось: ${remaining}</div><div class="flashcard-stage"><div class="flashcard" id="flashcard" tabindex="0" role="button" aria-label="Перевернуть карточку">
        <div class="flash-face flash-front"><div class="flash-word">${escapeHtml(word.en)}</div>${word.transcription ? `<div class="flash-transcription">${escapeHtml(word.transcription)}</div>` : ''}<p class="muted">Нажми, чтобы увидеть перевод</p></div>
        <div class="flash-face flash-back"><div class="flash-word">${escapeHtml(word.ru)}</div>${word.exampleEn ? `<p class="flash-example">${escapeHtml(word.exampleEn)}${word.exampleRu ? `<br>${escapeHtml(word.exampleRu)}` : ''}</p>` : ''}${word.audio ? `<audio class="audio-player" controls preload="none" src="${escapeHtml(word.audio)}"></audio>` : ''}</div>
      </div></div><div class="trainer-actions"><button class="btn btn-danger" id="word-difficult" type="button">Трудно</button><button class="btn btn-success" id="word-known" type="button">Знаю</button></div>`;
      const flashcard = byId('flashcard');
      const flip = () => flashcard.classList.toggle('flipped');
      flashcard.addEventListener('click', flip);
      flashcard.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); flip(); } });
      byId('word-known').addEventListener('click', () => {
        setWordStatus(progress, word, topic.id, 'known');
        cardQueue.shift();
        save();
        drawCard();
      });
      byId('word-difficult').addEventListener('click', () => {
        setWordStatus(progress, word, topic.id, 'difficult');
        cardQueue.shift();
        save();
        drawCard();
      });
    };

    const startTest = () => {
      if (topic.words.length < 4) {
        modeRoot.innerHTML = emptyState('🧩', 'Для теста нужно минимум 4 слова', 'Добавьте ещё уникальные слова в тему, чтобы сформировать четыре варианта ответа без выдуманных данных.');
        return;
      }
      testState = { words: shuffled(topic.words), index: 0, firstTryCorrect: 0, answered: false, firstAnswers: {} };
      drawQuestion();
    };

    const finishTest = () => {
      const result = {
        score: testState.firstTryCorrect,
        total: testState.words.length,
        percent: safePercent(testState.firstTryCorrect, testState.words.length),
        answers: testState.firstAnswers,
        completedAt: new Date().toISOString()
      };
      topicProgress.tests.push(result);
      save();
      modeRoot.innerHTML = `<div class="card empty-state"><div class="empty-state-icon">🏁</div><h3>Тест завершён</h3><p>С первого раза: ${result.score} из ${result.total}</p><div class="button-row" style="justify-content:center"><button class="btn btn-primary" id="restart-vocab-test" type="button">Пройти ещё раз</button></div></div>`;
      byId('restart-vocab-test').addEventListener('click', startTest);
    };

    const drawQuestion = () => {
      if (testState.index >= testState.words.length) { finishTest(); return; }
      const word = testState.words[testState.index];
      const distractors = shuffled(topic.words.filter((item) => item.__wordKey !== word.__wordKey)).slice(0, 3);
      const options = shuffled([word, ...distractors]);
      testState.answered = false;
      modeRoot.innerHTML = `<div class="flash-counter">Вопрос ${testState.index + 1} из ${testState.words.length}</div><article class="card"><span class="eyebrow">Выбери перевод</span><h2 class="flash-word">${escapeHtml(word.en)}</h2>${word.transcription ? `<p class="muted">${escapeHtml(word.transcription)}</p>` : ''}<div class="option-list section">${options.map((option) => `<button class="quiz-option" type="button" data-answer-key="${escapeHtml(option.__wordKey)}">${escapeHtml(option.ru)}</button>`).join('')}</div><div id="vocab-test-feedback" class="feedback"></div><div class="button-row"><button class="btn btn-primary" id="next-vocab-question" type="button" disabled>Следующее слово</button></div></article>`;
      modeRoot.querySelectorAll('[data-answer-key]').forEach((button) => {
        button.addEventListener('click', () => {
          if (testState.answered) return;
          testState.answered = true;
          const correct = button.dataset.answerKey === word.__wordKey;
          testState.firstAnswers[word.__wordKey] = { correct, selected: button.dataset.answerKey };
          if (correct) {
            testState.firstTryCorrect += 1;
            setWordStatus(progress, word, topic.id, 'known');
          } else {
            setWordStatus(progress, word, topic.id, 'difficult');
          }
          save();
          modeRoot.querySelectorAll('[data-answer-key]').forEach((optionButton) => {
            optionButton.disabled = true;
            if (optionButton.dataset.answerKey === word.__wordKey) optionButton.classList.add('correct');
          });
          if (!correct) button.classList.add('wrong');
          const feedback = byId('vocab-test-feedback');
          feedback.className = `feedback show ${correct ? 'good' : 'bad'}`;
          feedback.textContent = correct ? 'Верно с первого раза!' : `Правильный ответ: ${word.ru}`;
          byId('next-vocab-question').disabled = false;
        });
      });
      byId('next-vocab-question').addEventListener('click', () => { testState.index += 1; drawQuestion(); });
    };

    const drawAllWords = () => {
      modeRoot.innerHTML = `<div class="words-grid">${topic.words.map((word) => {
        const status = progress.words[word.__wordKey]?.status;
        return `<article class="card word-card ${status === 'known' ? 'known' : ''} ${status === 'difficult' ? 'difficult' : ''}"><strong>${escapeHtml(word.en)}</strong><span>${escapeHtml(word.ru)}</span>${word.transcription ? `<span>${escapeHtml(word.transcription)}</span>` : ''}</article>`;
      }).join('')}</div>`;
    };

    const drawMode = () => {
      if (mode === 'cards' || mode === 'difficult') {
        resetCardQueue();
        drawCard();
      } else if (mode === 'test') startTest();
      else drawAllWords();
    };
    byId('vocab-modes').addEventListener('click', (event) => {
      const button = event.target.closest('[data-mode]');
      if (!button) return;
      mode = button.dataset.mode;
      byId('vocab-modes').querySelectorAll('[data-mode]').forEach((item) => item.classList.toggle('active', item === button));
      drawMode();
    });
    drawMode();
  }

  function refreshCurrentView() {
    const view = document.body.dataset.view;
    const renderers = {
      home: renderHome,
      homework: renderHomework,
      grammar: renderGrammar,
      'vocabulary-hub': renderVocabularyHub,
      lesson: renderLesson,
      'grammar-topic': renderGrammarTopic,
      vocabulary: renderVocabulary
    };
    try {
      renderers[view]?.();
    } catch (error) {
      console.error('Ошибка отображения страницы:', error);
      const main = document.querySelector('main');
      if (main) main.innerHTML = emptyState('⚠️', 'Не удалось открыть страницу', 'Проверьте структуру данных и попробуйте обновить страницу.');
    }
  }
  async function init() {
    fillConfig();
    markNavigation();
    refreshCurrentView();
    if (!CloudService.isConfigured()) return;
    try {
      await CloudService.init();
      renderCloudPanel();
      if (CloudService.user) {
        await window.ProgressService.syncFromCloud();
        refreshCurrentView();
      }
    } catch (error) {
      console.error('Ошибка подключения к Supabase:', error);
      renderCloudPanel('Облако временно недоступно. Локальный прогресс продолжает работать.');
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
